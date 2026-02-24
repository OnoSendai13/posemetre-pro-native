// ============================================
// STATE STORE — Etat global encapsule
// ============================================

/**
 * @typedef {'IL' | 'FRACTIONS'} PowerMode
 */

/**
 * @typedef {Object} CompensationState
 * @property {number} posemetre
 * @property {number} flashmetre
 * @property {number} ratios
 * @property {number} estimation
 */

/** @type {PowerMode} */
let _powerMode = 'IL';

/** @type {boolean} */
let _hssEnabled = false;

/** @type {CompensationState} */
const _compensation = {
    posemetre: 0,
    flashmetre: 0,
    ratios: -2,
    estimation: 0
};

/** @type {Event|null} */
let _deferredPrompt = null;

// ============================================
// ACCESSEURS
// ============================================

export const state = {
    /** @returns {PowerMode} */
    get powerMode() { return _powerMode; },
    /** @param {PowerMode} v */
    set powerMode(v) { _powerMode = v; },

    /** @returns {boolean} */
    get hssEnabled() { return _hssEnabled; },
    /** @param {boolean} v */
    set hssEnabled(v) { _hssEnabled = v; },

    /** @returns {CompensationState} */
    get compensation() { return _compensation; },

    /** @returns {Event|null} */
    get deferredPrompt() { return _deferredPrompt; },
    /** @param {Event|null} v */
    set deferredPrompt(v) { _deferredPrompt = v; },
};

// ============================================
// CACHE DOM — references aux elements frequents
// Peuple une seule fois au DOMContentLoaded
// ============================================

/** @type {Record<string, HTMLElement|null>} */
const _domCache = {};

/**
 * Initialise le cache DOM. A appeler une seule fois apres DOMContentLoaded.
 */
export function initDomCache() {
    const ids = [
        // Posemetre
        'pose-mesure', 'pose-iso', 'pose-vitesse', 'pose-comp-value', 'pose-results',
        // Flash
        'flash-vitesse', 'flash-iso', 'flash-mesure', 'flash-target',
        'flash-current-power', 'flash-current-power-group',
        'flash-comp-value', 'flash-results',
        'hss-enabled', 'hss-options', 'hss-sync-max', 'hss-warning', 'hss-warning-text',
        // Ratios
        'ratio-key', 'ratio-iso', 'ratio-vitesse', 'ratio-comp-value', 'ratio-results',
        // Estimation
        'estim-zone', 'estim-mesure', 'estim-iso', 'estim-vitesse',
        'estim-comp-value', 'estim-results',
        // UI
        'powerModeSwitch', 'powerModeToggle', 'installBtn',
        'help-modal', 'help-btn', 'help-close',
        'lang-btn', 'theme-toggle'
    ];
    ids.forEach(id => {
        _domCache[id] = document.getElementById(id);
    });
}

/**
 * Obtient un element depuis le cache DOM
 * @param {string} id
 * @returns {HTMLElement|null}
 */
export function dom(id) {
    // Fallback si pas encore cache (securite)
    if (!(id in _domCache)) {
        _domCache[id] = document.getElementById(id);
    }
    return _domCache[id];
}
