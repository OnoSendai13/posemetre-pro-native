// ============================================
// MAIN — Point d'entree de l'application
// Orchestre l'initialisation et les evenements
// ============================================

import { state, initDomCache, dom } from './state.js';
import {
    populateSelects, switchTab, togglePowerMode, setCompensation,
    calculatePosemetre, calculateFlashmetre, calculateRatios, calculateEstimation,
    openHelpModal, closeHelpModal, showHelpSection
} from './ui.js';

// ============================================
// CONFIGURATION
// ============================================

/**
 * Base path pour le Service Worker et les assets.
 * Modifiable selon l'environnement de deploiement.
 * @type {string}
 */
const BASE_PATH = window.APP_CONFIG?.basePath ?? '/posemetre-pro';

// ============================================
// CAPACITOR NATIVE SETUP
// ============================================

async function initCapacitor() {
    // Check if running in Capacitor native environment
    if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
            // Import Capacitor plugins dynamically
            const { StatusBar, Style } = await import('@capacitor/status-bar');
            const { Keyboard } = await import('@capacitor/keyboard');
            
            // Configure StatusBar to not overlay content
            await StatusBar.setOverlaysWebView({ overlay: false });
            await StatusBar.setBackgroundColor({ color: '#1a1a1a' });
            await StatusBar.setStyle({ style: Style.Dark });
            
            console.log('Capacitor StatusBar configured');
        } catch (e) {
            console.log('Capacitor plugins not available:', e.message);
        }
    }
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', async () => {
    // 0. Capacitor native setup
    await initCapacitor();
    
    // 1. Cache DOM
    initDomCache();

    // 2. i18n
    if (window.i18n) {
        window.i18n.initI18n();
    }

    // 3. Selects & calculs initiaux
    populateSelects();
    calculatePosemetre();
    calculateFlashmetre();
    calculateRatios();
    calculateEstimation();

    // 4. Evenements
    setupEventListeners();

    // 5. PWA
    initPWA();

    console.log('App initialized (modular)');
});

// ============================================
// PWA
// ============================================

function initPWA() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${BASE_PATH}/sw.js`, { scope: `${BASE_PATH}/` })
            .then(reg => console.log('Service Worker enregistre:', reg))
            .catch(err => console.log('Erreur Service Worker:', err));
    }

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        state.deferredPrompt = e;
        const installBtn = dom('installBtn');
        if (installBtn) installBtn.style.display = 'block';
    });

    dom('installBtn')?.addEventListener('click', async () => {
        if (state.deferredPrompt) {
            state.deferredPrompt.prompt();
            const { outcome } = await state.deferredPrompt.userChoice;
            console.log(`Installation: ${outcome}`);
            state.deferredPrompt = null;
            const installBtn = dom('installBtn');
            if (installBtn) installBtn.style.display = 'none';
        }
    });
}

// ============================================
// EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Power mode toggle (IL / Fractions)
    dom('powerModeToggle')?.addEventListener('click', togglePowerMode);

    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
    });

    // Compensation buttons — POSEMETRE
    document.querySelectorAll('.comp-btn:not(.flash-comp):not(.ratio-comp):not(.estim-comp)').forEach(btn => {
        btn.addEventListener('click', (e) => setCompensation('posemetre', parseFloat(e.target.dataset.value)));
    });

    // Compensation buttons — FLASH
    document.querySelectorAll('.comp-btn.flash-comp').forEach(btn => {
        btn.addEventListener('click', (e) => setCompensation('flashmetre', parseFloat(e.target.dataset.value)));
    });

    // Compensation buttons — RATIOS
    document.querySelectorAll('.comp-btn.ratio-comp').forEach(btn => {
        btn.addEventListener('click', (e) => setCompensation('ratios', parseFloat(e.target.dataset.value)));
    });

    // Compensation buttons — ESTIMATION
    document.querySelectorAll('.comp-btn.estim-comp').forEach(btn => {
        btn.addEventListener('click', (e) => setCompensation('estimation', parseFloat(e.target.dataset.value)));
    });

    // Input changes — POSEMETRE
    ['pose-mesure', 'pose-iso', 'pose-vitesse'].forEach(id => {
        dom(id)?.addEventListener('change', calculatePosemetre);
    });

    // Input changes — FLASH
    ['flash-vitesse', 'flash-iso', 'flash-mesure', 'flash-target', 'flash-current-power', 'hss-sync-max'].forEach(id => {
        dom(id)?.addEventListener('change', calculateFlashmetre);
    });

    // HSS toggle
    const hssCheckbox = dom('hss-enabled');
    if (hssCheckbox) {
        hssCheckbox.addEventListener('change', (e) => {
            state.hssEnabled = e.target.checked;
            const hssOptions = dom('hss-options');
            if (hssOptions) {
                hssOptions.style.display = state.hssEnabled ? 'block' : 'none';
            }
            calculateFlashmetre();
        });
    }

    // Input changes — RATIOS
    ['ratio-key', 'ratio-iso', 'ratio-vitesse'].forEach(id => {
        dom(id)?.addEventListener('change', calculateRatios);
    });

    // Input changes — ESTIMATION
    ['estim-zone', 'estim-mesure', 'estim-iso', 'estim-vitesse'].forEach(id => {
        dom(id)?.addEventListener('change', calculateEstimation);
    });

    // Help modal
    initHelpModal();
}

// ============================================
// HELP MODAL
// ============================================

function initHelpModal() {
    dom('help-btn')?.addEventListener('click', openHelpModal);
    dom('help-close')?.addEventListener('click', closeHelpModal);

    const modal = dom('help-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeHelpModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeHelpModal();
    });

    document.querySelectorAll('.modal-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = 'help-' + btn.getAttribute('data-section');
            showHelpSection(sectionId);
        });
    });
}

// ============================================
// EXPORTS GLOBAUX (pour compatibilite i18n.js)
// i18n.js appelle calculatePosemetre() etc. via window
// ============================================

window.calculatePosemetre = calculatePosemetre;
window.calculateFlashmetre = calculateFlashmetre;
window.calculateRatios = calculateRatios;
window.calculateEstimation = calculateEstimation;
