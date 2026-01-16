// ============================================
// DONNÉES DE RÉFÉRENCE PHOTOGRAPHIQUE
// ============================================

// Valeurs ISO standard (suivant la progression par tiers)
const ISO_STANDARD = [
    25, 32, 40, 50, 64, 80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800,
    1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800,
    16000, 20000, 25600, 32000, 40000, 51200, 64000, 80000, 102400
];

// Valeurs d'ouverture standard (f-stops)
const APERTURES = [
    1.0, 1.1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8, 
    3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0, 
    10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36, 40, 45
];

// Valeurs de vitesse standard
const SHUTTERSPEEDS = [
    { label: '30"', value: 30 },
    { label: '25"', value: 25 },
    { label: '20"', value: 20 },
    { label: '15"', value: 15 },
    { label: '13"', value: 13 },
    { label: '10"', value: 10 },
    { label: '8"', value: 8 },
    { label: '6"', value: 6 },
    { label: '5"', value: 5 },
    { label: '4"', value: 4 },
    { label: '3"', value: 3 },
    { label: '2.5"', value: 2.5 },
    { label: '2"', value: 2 },
    { label: '1.6"', value: 1.6 },
    { label: '1.3"', value: 1.3 },
    { label: '1"', value: 1 },
    { label: '1/1.3', value: 1/1.3 },
    { label: '1/1.6', value: 1/1.6 },
    { label: '1/2', value: 1/2 },
    { label: '1/2.5', value: 1/2.5 },
    { label: '1/3', value: 1/3 },
    { label: '1/4', value: 1/4 },
    { label: '1/5', value: 1/5 },
    { label: '1/6', value: 1/6 },
    { label: '1/8', value: 1/8 },
    { label: '1/10', value: 1/10 },
    { label: '1/13', value: 1/13 },
    { label: '1/15', value: 1/15 },
    { label: '1/20', value: 1/20 },
    { label: '1/25', value: 1/25 },
    { label: '1/30', value: 1/30 },
    { label: '1/40', value: 1/40 },
    { label: '1/50', value: 1/50 },
    { label: '1/60', value: 1/60 },
    { label: '1/80', value: 1/80 },
    { label: '1/100', value: 1/100 },
    { label: '1/125', value: 1/125 },
    { label: '1/160', value: 1/160 },
    { label: '1/200', value: 1/200 },
    { label: '1/250', value: 1/250 },
    { label: '1/320', value: 1/320 },
    { label: '1/400', value: 1/400 },
    { label: '1/500', value: 1/500 },
    { label: '1/640', value: 1/640 },
    { label: '1/800', value: 1/800 },
    { label: '1/1000', value: 1/1000 },
    { label: '1/1250', value: 1/1250 },
    { label: '1/1600', value: 1/1600 },
    { label: '1/2000', value: 1/2000 },
    { label: '1/2500', value: 1/2500 },
    { label: '1/3200', value: 1/3200 },
    { label: '1/4000', value: 1/4000 },
    { label: '1/5000', value: 1/5000 },
    { label: '1/6400', value: 1/6400 },
    { label: '1/8000', value: 1/8000 }
];

// Puissances flash standard (pour mode Fractions)
const FLASH_POWERS_FRACTIONS = [
    { label: '1/1', value: 1, ilValue: 0 },           // Pleine puissance
    { label: '1/2', value: 0.5, ilValue: -1 },        // -1 IL
    { label: '1/4', value: 0.25, ilValue: -2 },       // -2 IL
    { label: '1/8', value: 0.125, ilValue: -3 },      // -3 IL
    { label: '1/16', value: 0.0625, ilValue: -4 },    // -4 IL
    { label: '1/32', value: 0.03125, ilValue: -5 },   // -5 IL
    { label: '1/64', value: 0.015625, ilValue: -6 },  // -6 IL
    { label: '1/128', value: 0.0078125, ilValue: -7 },// -7 IL
    { label: '1/256', value: 0.00390625, ilValue: -8 }// -8 IL
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let powerMode = 'IL'; // 'IL' ou 'FRACTIONS'
let deferredPrompt;

// Valeurs de compensation actuelles
let currentCompensation = {
    posemetre: 0,
    flashmetre: 0,
    ratios: -2,
    estimation: 0
};

// ============================================
// FONCTIONS MATHÉMATIQUES PHOTOGRAPHIQUES
// ============================================

/**
 * Convertit une différence d'IL en facteur multiplicateur d'ouverture
 */
function ilToApertureFactor(ilDelta) {
    return Math.pow(2, ilDelta / 2);
}

/**
 * Calcule la nouvelle ouverture avec compensation IL
 */
function calculateAperture(baseAperture, ilDelta) {
    const newValue = baseAperture * ilToApertureFactor(ilDelta);
    return findClosestAperture(newValue);
}

/**
 * Trouve l'ouverture standard la plus proche
 */
function findClosestAperture(value) {
    return APERTURES.reduce((prev, curr) => 
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
}

/**
 * Calcule la différence en IL entre deux ouvertures
 */
function apertureToIL(aperture1, aperture2) {
    return 2 * Math.log2(aperture2 / aperture1);
}

/**
 * Calcule la nouvelle vitesse avec compensation IL
 */
function calculateShutterSpeed(baseSpeed, ilDelta) {
    // IL positif = vitesse plus rapide (diviseur plus grand)
    const newValue = baseSpeed / Math.pow(2, ilDelta);
    return findClosestShutterSpeed(newValue);
}

/**
 * Trouve la vitesse standard la plus proche
 */
function findClosestShutterSpeed(value) {
    // Cherche la vitesse avec la plus petite différence relative (pas absolue)
    return SHUTTERSPEEDS.reduce((prev, curr) => {
        const prevDiff = Math.abs(Math.log(prev.value / value));
        const currDiff = Math.abs(Math.log(curr.value / value));
        return currDiff < prevDiff ? curr : prev;
    });
}

/**
 * Calcule le nouvel ISO avec compensation IL
 */
function calculateISO(baseISO, ilDelta) {
    const newISO = Math.round(baseISO * Math.pow(2, ilDelta));
    // Trouve l'ISO standard le plus proche
    return ISO_STANDARD.reduce((prev, curr) => 
        Math.abs(curr - newISO) < Math.abs(prev - newISO) ? curr : prev
    );
}

/**
 * Convertit IL en puissance flash (format Profoto: IL et dixièmes)
 */
function ilToPowerIL(ilDelta) {
    // Arrondi au dixième (pas de centièmes)
    return (Math.round(ilDelta * 10) / 10).toFixed(1);
}

/**
 * Convertit IL en puissance flash (format fractions)
 */
function ilToPowerFraction(ilDelta) {
    const powerRatio = Math.pow(2, ilDelta);
    
    // Trouve la fraction la plus proche
    const closest = FLASH_POWERS_FRACTIONS.reduce((prev, curr) => 
        Math.abs(curr.value - powerRatio) < Math.abs(prev.value - powerRatio) ? curr : prev
    );
    
    return closest.label;
}

/**
 * Calcule le ratio d'éclairage (ex: 4:1)
 */
function calculateLightingRatio(ilDifference) {
    const ratio = Math.pow(2, Math.abs(ilDifference));
    return `${ratio.toFixed(1)}:1`;
}

// ============================================
// INITIALISATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    populateSelects();
    
    // Calcul initial pour chaque onglet
    calculatePosemetre();
    calculateFlashmetre();
    calculateRatios();
    calculateEstimation();
});

/**
 * Initialise l'application
 */
function initializeApp() {
    // Gestion PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker enregistré:', reg))
            .catch(err => console.log('Erreur Service Worker:', err));
    }

    // Gestion installation PWA
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        document.getElementById('installBtn').style.display = 'block';
    });

    document.getElementById('installBtn')?.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Installation: ${outcome}`);
            deferredPrompt = null;
            document.getElementById('installBtn').style.display = 'none';
        }
    });
}

/**
 * Configure tous les écouteurs d'événements
 */
function setupEventListeners() {
    // Switch mode puissance IL/Fractions
    document.getElementById('powerModeToggle').addEventListener('click', togglePowerMode);

    // Navigation onglets
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => switchTab(e.target.dataset.tab));
    });

    // Boutons compensation POSEMETRE
    document.querySelectorAll('.comp-btn:not(.flash-comp):not(.ratio-comp)').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setCompensation('posemetre', parseFloat(e.target.dataset.value));
        });
    });

    // Boutons compensation FLASHMETRE
    document.querySelectorAll('.comp-btn.flash-comp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setCompensation('flashmetre', parseFloat(e.target.dataset.value));
        });
    });

    // Boutons compensation RATIOS
    document.querySelectorAll('.comp-btn.ratio-comp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setCompensation('ratios', parseFloat(e.target.dataset.value));
        });
    });

    // Boutons compensation ESTIMATION
    document.querySelectorAll('.comp-btn.estim-comp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            setCompensation('estimation', parseFloat(e.target.dataset.value));
        });
    });

    // Changements inputs POSEMETRE
    ['pose-mesure', 'pose-iso', 'pose-vitesse'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calculatePosemetre);
    });

    // Changements inputs FLASHMETRE
    ['flash-vitesse', 'flash-iso', 'flash-mesure', 'flash-target', 'flash-current-power'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calculateFlashmetre);
    });

    // Changements inputs RATIOS
    ['ratio-key', 'ratio-iso', 'ratio-vitesse'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calculateRatios);
    });

    // Changements inputs ESTIMATION
    ['estim-zone', 'estim-mesure', 'estim-iso', 'estim-vitesse'].forEach(id => {
        document.getElementById(id)?.addEventListener('change', calculateEstimation);
    });
}

/**
 * Remplit tous les selects avec les valeurs
 */
function populateSelects() {
    // Ouvertures
    const apertureSelects = [
        'pose-mesure', 'flash-mesure', 'flash-target', 
        'ratio-key', 'estim-mesure'
    ];
    
    apertureSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = APERTURES.map(f => 
                `<option value="${f}">f/${f}</option>`
            ).join('');
            
            // Valeurs par défaut
            if (id === 'pose-mesure' || id === 'flash-mesure') {
                select.value = '5.6';
            } else if (id === 'flash-target') {
                select.value = '8';
            } else if (id === 'ratio-key') {
                select.value = '8';
            } else if (id === 'estim-mesure') {
                select.value = '8';
            }
        }
    });

    // Vitesses
    const shutterSelects = [
        'pose-vitesse', 'flash-vitesse', 'ratio-vitesse', 'estim-vitesse'
    ];
    
    shutterSelects.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = SHUTTERSPEEDS.map(s => 
                `<option value="${s.value}">${s.label}</option>`
            ).join('');
            
            // Valeur par défaut 1/125
            const default125 = SHUTTERSPEEDS.find(s => s.label === '1/125');
            if (default125) {
                select.value = default125.value;
            }
            
            // Valeur 1/160 pour flash
            if (id === 'flash-vitesse') {
                const sync160 = SHUTTERSPEEDS.find(s => s.label === '1/160');
                if (sync160) {
                    select.value = sync160.value;
                }
            }
        }
    });
}

// ============================================
// GESTION INTERFACE
// ============================================

/**
 * Change d'onglet
 */
function switchTab(tabName) {
    // Désactive tous les onglets
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Active l'onglet sélectionné
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
    
    // Affiche le switch IL/Fractions uniquement pour Flash et Ratios
    const powerModeSwitch = document.getElementById('powerModeSwitch');
    if (tabName === 'flashmetre' || tabName === 'ratios') {
        powerModeSwitch.style.display = 'flex';
    } else {
        powerModeSwitch.style.display = 'none';
    }
}

/**
 * Bascule entre mode IL et Fractions
 */
function togglePowerMode() {
    const btn = document.getElementById('powerModeToggle');
    const options = btn.querySelectorAll('.toggle-option');
    const currentPowerGroup = document.getElementById('flash-current-power-group');
    
    if (powerMode === 'IL') {
        powerMode = 'FRACTIONS';
        options[0].classList.remove('active');
        options[1].classList.add('active');
        // Affiche le champ puissance actuelle en mode Fractions
        if (currentPowerGroup) {
            currentPowerGroup.style.display = 'block';
        }
    } else {
        powerMode = 'IL';
        options[0].classList.add('active');
        options[1].classList.remove('active');
        // Masque le champ puissance actuelle en mode IL
        if (currentPowerGroup) {
            currentPowerGroup.style.display = 'none';
        }
    }
    
    // Recalcule les résultats avec le nouveau format
    calculateFlashmetre();
    calculateRatios();
}

/**
 * Définit la compensation pour un mode
 */
function setCompensation(mode, value) {
    currentCompensation[mode] = value;
    
    // Met à jour l'affichage
    let displayId, btnSelector;
    
    if (mode === 'posemetre') {
        displayId = 'pose-comp-value';
        btnSelector = '.comp-btn:not(.flash-comp):not(.ratio-comp):not(.estim-comp)';
    } else if (mode === 'flashmetre') {
        displayId = 'flash-comp-value';
        btnSelector = '.comp-btn.flash-comp';
    } else if (mode === 'ratios') {
        displayId = 'ratio-comp-value';
        btnSelector = '.comp-btn.ratio-comp';
    } else if (mode === 'estimation') {
        displayId = 'estim-comp-value';
        btnSelector = '.comp-btn.estim-comp';
    }
    
    // Met à jour le texte
    document.getElementById(displayId).textContent = 
        (value >= 0 ? '+' : '') + value.toFixed(1) + ' IL';
    
    // Met à jour les boutons actifs
    document.querySelectorAll(btnSelector).forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.value) === value);
    });
    
    // Recalcule
    if (mode === 'posemetre') calculatePosemetre();
    if (mode === 'flashmetre') calculateFlashmetre();
    if (mode === 'ratios') calculateRatios();
    if (mode === 'estimation') calculateEstimation();
}

// ============================================
// CALCULS PAR MODE
// ============================================

/**
 * Calcule les réglages en mode POSEMÈTRE
 */
function calculatePosemetre() {
    const baseFstop = parseFloat(document.getElementById('pose-mesure').value);
    const baseISO = parseInt(document.getElementById('pose-iso').value);
    const baseShutter = parseFloat(document.getElementById('pose-vitesse').value);
    const comp = currentCompensation.posemetre;

    // LOGIQUE CORRECTE: Pour SUREXPOSER (+IL), il faut OUVRIR le diaph (valeur plus petite)
    // ou RALENTIR la vitesse, ou AUGMENTER l'ISO
    // La compensation va dans le sens INVERSE par rapport au flashmètre
    const newFstop = calculateAperture(baseFstop, -comp); // Inversé !
    const newShutter = calculateShutterSpeed(baseShutter, -comp); // Inversé !
    const newISO = calculateISO(baseISO, comp); // ISO reste dans le même sens

    // Affiche les résultats
    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">Option 1: Modifier l'ouverture</span>
            <span class="result-value">f/${newFstop}</span>
            <span class="result-detail">Vitesse: ${getShutterLabel(baseShutter)} | ISO: ${baseISO}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Option 2: Modifier la vitesse</span>
            <span class="result-value">${getShutterLabel(newShutter.value)}</span>
            <span class="result-detail">Ouverture: f/${baseFstop} | ISO: ${baseISO}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Option 3: Modifier l'ISO</span>
            <span class="result-value">ISO ${newISO}</span>
            <span class="result-detail">Ouverture: f/${baseFstop} | Vitesse: ${getShutterLabel(baseShutter)}</span>
        </div>
    `;

    document.getElementById('pose-results').innerHTML = resultsHTML;
}

/**
 * Calcule les réglages en mode FLASHMÈTRE
 */
function calculateFlashmetre() {
    const currentFstop = parseFloat(document.getElementById('flash-mesure').value);
    const targetFstop = parseFloat(document.getElementById('flash-target').value);
    const syncSpeed = parseFloat(document.getElementById('flash-vitesse').value);
    const iso = parseInt(document.getElementById('flash-iso').value);
    const extraComp = currentCompensation.flashmetre;

    // Calcule la différence IL entre mesure actuelle et cible + compensation
    const ilDiff = apertureToIL(currentFstop, targetFstop) + extraComp;
    
    // Calcule l'ouverture finale nécessaire
    const finalFstop = calculateAperture(currentFstop, ilDiff);

    // Format selon le mode sélectionné
    let powerDisplay;
    let powerExplanation;
    
    if (powerMode === 'IL') {
        powerDisplay = `${ilDiff >= 0 ? '+' : ''}${ilToPowerIL(ilDiff)} IL`;
        powerExplanation = ilDiff >= 0 ? 'Augmenter la puissance du flash' : 'Diminuer la puissance du flash';
    } else {
        // Mode FRACTIONS : calcul depuis la puissance actuelle
        const currentPowerElement = document.getElementById('flash-current-power');
        const currentPower = currentPowerElement ? parseFloat(currentPowerElement.value) : 1.0;
        
        // Trouve la puissance actuelle en IL
        const currentPowerObj = FLASH_POWERS_FRACTIONS.find(f => Math.abs(f.value - currentPower) < 0.01);
        const currentPowerIL = currentPowerObj ? currentPowerObj.ilValue : 0;
        
        // Calcule la puissance cible en IL
        const targetPowerIL = currentPowerIL + ilDiff;
        
        // Trouve la fraction cible la plus proche
        const targetPowerObj = FLASH_POWERS_FRACTIONS.reduce((prev, curr) => 
            Math.abs(curr.ilValue - targetPowerIL) < Math.abs(prev.ilValue - targetPowerIL) ? curr : prev
        );
        
        const currentFractionLabel = currentPowerObj ? currentPowerObj.label : '1/1';
        const targetFraction = targetPowerObj.label;
        
        powerDisplay = targetFraction;
        powerExplanation = `Régler de ${currentFractionLabel} à ${targetFraction}`;
    }

    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">Régler le flash pour obtenir</span>
            <span class="result-value">f/${finalFstop}</span>
            <span class="result-detail">À ${iso} ISO, ${getShutterLabel(syncSpeed)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Ajustement de puissance</span>
            <span class="result-value">${powerDisplay}</span>
            <span class="result-detail">${powerExplanation}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Différence totale</span>
            <span class="result-value">${ilDiff >= 0 ? '+' : ''}${ilDiff.toFixed(1)} IL</span>
            <span class="result-detail">Compensation appliquée: ${extraComp >= 0 ? '+' : ''}${extraComp.toFixed(1)} IL</span>
        </div>
    `;

    document.getElementById('flash-results').innerHTML = resultsHTML;
}

/**
 * Calcule les ratios KEY/FILL LIGHT
 */
function calculateRatios() {
    const keyFstop = parseFloat(document.getElementById('ratio-key').value);
    const ratioIL = currentCompensation.ratios;
    const iso = parseInt(document.getElementById('ratio-iso').value);
    const shutter = parseFloat(document.getElementById('ratio-vitesse').value);

    // Calcule le fill light
    const fillFstop = calculateAperture(keyFstop, ratioIL);
    
    // Format puissance
    let powerDisplay;
    if (powerMode === 'IL') {
        powerDisplay = `${ratioIL >= 0 ? '+' : ''}${ilToPowerIL(ratioIL)} IL`;
    } else {
        powerDisplay = ilToPowerFraction(ratioIL);
    }

    const lightingRatio = calculateLightingRatio(ratioIL);

    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">Fill Light à régler</span>
            <span class="result-value">f/${fillFstop}</span>
            <span class="result-detail">À ${iso} ISO, ${getShutterLabel(shutter)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Puissance Fill vs Key</span>
            <span class="result-value">${powerDisplay}</span>
            <span class="result-detail">Différence: ${ratioIL.toFixed(1)} IL</span>
        </div>
        <div class="result-item">
            <span class="result-label">Ratio d'éclairage final</span>
            <span class="result-value">${lightingRatio}</span>
            <span class="result-detail">Key: f/${keyFstop} | Fill: f/${fillFstop}</span>
        </div>
    `;

    document.getElementById('ratio-results').innerHTML = resultsHTML;
}

/**
 * Calcule l'estimation sans posemètre
 */
function calculateEstimation() {
    const zoneIL = parseFloat(document.getElementById('estim-zone').value);
    const measuredFstop = parseFloat(document.getElementById('estim-mesure').value);
    const iso = parseInt(document.getElementById('estim-iso').value);
    const shutter = parseFloat(document.getElementById('estim-vitesse').value);
    const comp = currentCompensation.estimation;

    // La zone mesurée a une réflectance différente de 18% gris neutre
    // Il faut compenser pour trouver la lumière incidente réelle
    // Si posemètre lit f/8 sur zone sombre (-2 IL) :
    // Cette zone a "mangé" 2 IL (réfléchit 1/4)
    // Lumière incidente = f/8 - 2 IL = f/4
    const incidentFstop = calculateAperture(measuredFstop, zoneIL);  // SANS signe moins
    
    // Applique la compensation d'exposition souhaitée
    // Pour +IL (surexposer), il faut OUVRIR (f-stop plus petit)
    // Pour -IL (sous-exposer), il faut FERMER (f-stop plus grand)
    const finalFstop = calculateAperture(incidentFstop, -comp);  // AVEC signe moins
    const finalShutter = calculateShutterSpeed(shutter, -comp);   // AVEC signe moins
    const finalISO = calculateISO(iso, comp);                     // Dans le même sens

    const zoneName = document.getElementById('estim-zone').selectedOptions[0].text;

    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">Lumière incidente estimée (base)</span>
            <span class="result-value">f/${incidentFstop}</span>
            <span class="result-detail">Avant compensation d'exposition</span>
        </div>
        <div class="result-item">
            <span class="result-label">Zone mesurée</span>
            <span class="result-value">${zoneName}</span>
            <span class="result-detail">Lecture spot: f/${measuredFstop}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Compensation de zone</span>
            <span class="result-value">${-zoneIL >= 0 ? '+' : ''}${(-zoneIL).toFixed(1)} IL</span>
            <span class="result-detail">Selon la réflectance de la zone</span>
        </div>
        <hr style="border: 0; border-top: 2px solid rgba(255,255,255,0.1); margin: 20px 0;">
        <h4 style="text-align: center; color: #4caf50; margin-bottom: 16px; font-size: 15px;">✨ RÉGLAGES FINAUX (avec compensation ${comp >= 0 ? '+' : ''}${comp.toFixed(1)} IL)</h4>
        <div class="result-item">
            <span class="result-label">Option 1: Modifier l'ouverture</span>
            <span class="result-value">f/${finalFstop}</span>
            <span class="result-detail">Vitesse: ${getShutterLabel(shutter)} | ISO: ${iso}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Option 2: Modifier la vitesse</span>
            <span class="result-value">${getShutterLabel(finalShutter.value)}</span>
            <span class="result-detail">Ouverture: f/${incidentFstop} | ISO: ${iso}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Option 3: Modifier l'ISO</span>
            <span class="result-value">ISO ${finalISO}</span>
            <span class="result-detail">Ouverture: f/${incidentFstop} | Vitesse: ${getShutterLabel(shutter)}</span>
        </div>
    `;

    document.getElementById('estim-results').innerHTML = resultsHTML;
}

// ============================================
// UTILITAIRES
// ============================================

/**
 * Obtient le label d'une vitesse à partir de sa valeur
 */
function getShutterLabel(value) {
    const shutter = SHUTTERSPEEDS.find(s => Math.abs(s.value - value) < 0.001);
    return shutter ? shutter.label : `1/${Math.round(1/value)}`;
}
