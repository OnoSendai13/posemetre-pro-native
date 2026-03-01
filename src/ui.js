// ============================================
// UI — Gestion de l'interface (DOM)
// ============================================

import { APERTURES, SHUTTERSPEEDS, FLASH_POWERS_FRACTIONS } from './constants.js';
import {
    calculateAperture, apertureToIL, calculateShutterSpeed,
    calculateISO, getShutterLabel, validateISO,
    ilToPowerIL, ilToPowerFraction, calculateLightingRatio,
    calculateHSSPowerLoss, isHSSRequired
} from './calculations.js';
import { state, dom } from './state.js';

// ============================================
// POPULATE SELECTS
// ============================================

/**
 * Remplit tous les selects avec les valeurs photographiques
 */
export function populateSelects() {
    const apertureSelects = [
        'pose-mesure', 'flash-mesure', 'flash-target',
        'ratio-key', 'estim-mesure'
    ];

    apertureSelects.forEach(id => {
        const select = dom(id);
        if (select) {
            select.innerHTML = APERTURES.map(f =>
                `<option value="${f}">f/${f}</option>`
            ).join('');

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

    const shutterSelects = [
        'pose-vitesse', 'flash-vitesse', 'ratio-vitesse', 'estim-vitesse'
    ];

    shutterSelects.forEach(id => {
        const select = dom(id);
        if (select) {
            select.innerHTML = SHUTTERSPEEDS.map(s =>
                `<option value="${s.value}">${s.label}</option>`
            ).join('');

            const default125 = SHUTTERSPEEDS.find(s => s.label === '1/125');
            if (default125) {
                select.value = default125.value;
            }

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
// TAB NAVIGATION
// ============================================

/**
 * Change d'onglet
 * @param {string} tabName
 */
export function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const tabContent = document.getElementById(`tab-${tabName}`);
    if (tabBtn) tabBtn.classList.add('active');
    if (tabContent) tabContent.classList.add('active');

    const powerModeSwitch = dom('powerModeSwitch');
    const tabNav = document.querySelector('.tab-nav');
    const content = document.querySelector('.content');
    const isExtendedHeader = (tabName === 'flashmetre' || tabName === 'ratios');
    
    if (powerModeSwitch) {
        powerModeSwitch.style.display = isExtendedHeader ? 'flex' : 'none';
    }
    
    // Adjust tab-nav and content positioning when power mode switch is visible
    if (tabNav) {
        tabNav.classList.toggle('header-extended', isExtendedHeader);
    }
    if (content) {
        content.classList.toggle('header-extended', isExtendedHeader);
    }
}

// ============================================
// POWER MODE TOGGLE (IL / FRACTIONS)
// ============================================

/**
 * Bascule entre mode IL et Fractions
 */
export function togglePowerMode() {
    const btn = dom('powerModeToggle');
    if (!btn) return;

    const options = btn.querySelectorAll('.toggle-option');
    const currentPowerGroup = dom('flash-current-power-group');

    if (state.powerMode === 'IL') {
        state.powerMode = 'FRACTIONS';
        options[0].classList.remove('active');
        options[1].classList.add('active');
        if (currentPowerGroup) currentPowerGroup.style.display = 'block';
    } else {
        state.powerMode = 'IL';
        options[0].classList.add('active');
        options[1].classList.remove('active');
        if (currentPowerGroup) currentPowerGroup.style.display = 'none';
    }

    calculateFlashmetre();
    calculateRatios();
}

// ============================================
// COMPENSATION
// ============================================

/**
 * Definit la compensation pour un mode et recalcule
 * @param {string} mode - 'posemetre' | 'flashmetre' | 'ratios' | 'estimation'
 * @param {number} value
 */
export function setCompensation(mode, value) {
    state.compensation[mode] = value;

    /** @type {{displayId: string, btnSelector: string}} */
    const config = {
        posemetre:  { displayId: 'pose-comp-value',  btnSelector: '.comp-btn:not(.flash-comp):not(.ratio-comp):not(.estim-comp)' },
        flashmetre: { displayId: 'flash-comp-value', btnSelector: '.comp-btn.flash-comp' },
        ratios:     { displayId: 'ratio-comp-value', btnSelector: '.comp-btn.ratio-comp' },
        estimation: { displayId: 'estim-comp-value', btnSelector: '.comp-btn.estim-comp' },
    }[mode];

    if (!config) return;

    const display = dom(config.displayId);
    if (display) {
        display.textContent = (value >= 0 ? '+' : '') + value.toFixed(1) + ' IL';
    }

    document.querySelectorAll(config.btnSelector).forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.value) === value);
    });

    // Recalcule le mode concerne
    const recalcMap = { posemetre: calculatePosemetre, flashmetre: calculateFlashmetre, ratios: calculateRatios, estimation: calculateEstimation };
    recalcMap[mode]?.();
}

// ============================================
// CALCULS PAR MODE
// ============================================

/**
 * Helper i18n — evite de planter si i18n pas encore charge
 * @param {string} key
 * @param {Object} [params]
 * @returns {string}
 */
function _t(key, params) {
    return window.i18n ? window.i18n.t(key, params) : key;
}

/**
 * Calcule les reglages en mode POSEMETRE (Continu)
 */
export function calculatePosemetre() {
    const baseFstop = parseFloat(dom('pose-mesure')?.value);
    const baseISO = validateISO(parseInt(dom('pose-iso')?.value));
    const baseShutter = parseFloat(dom('pose-vitesse')?.value);
    const comp = state.compensation.posemetre;

    const newFstop = calculateAperture(baseFstop, -comp);
    const newShutter = calculateShutterSpeed(baseShutter, -comp);
    const newISO = calculateISO(baseISO, comp);

    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">${_t('resultOption1')}</span>
            <span class="result-value">f/${newFstop}</span>
            <span class="result-detail">${_t('resultSpeed')}: ${getShutterLabel(baseShutter)} | ISO: ${baseISO}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultOption2')}</span>
            <span class="result-value">${getShutterLabel(newShutter)}</span>
            <span class="result-detail">${_t('resultAperture')}: f/${baseFstop} | ISO: ${baseISO}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultOption3')}</span>
            <span class="result-value">ISO ${newISO}</span>
            <span class="result-detail">${_t('resultAperture')}: f/${baseFstop} | ${_t('resultSpeed')}: ${getShutterLabel(baseShutter)}</span>
        </div>
    `;

    const results = dom('pose-results');
    if (results) results.innerHTML = resultsHTML;
}

/**
 * Calcule les reglages en mode FLASHMETRE
 */
export function calculateFlashmetre() {
    const currentFstop = parseFloat(dom('flash-mesure')?.value);
    const targetFstop = parseFloat(dom('flash-target')?.value);
    const shootingSpeed = parseFloat(dom('flash-vitesse')?.value);
    const iso = validateISO(parseInt(dom('flash-iso')?.value));
    const extraComp = state.compensation.flashmetre;

    const maxSyncSpeed = state.hssEnabled
        ? parseFloat(dom('hss-sync-max')?.value)
        : shootingSpeed;

    let hssLoss = 0;
    let hssActive = false;

    if (state.hssEnabled && isHSSRequired(shootingSpeed, maxSyncSpeed)) {
        hssLoss = calculateHSSPowerLoss(shootingSpeed, maxSyncSpeed);
        hssActive = true;
    }

    const ilDiff = apertureToIL(currentFstop, targetFstop) + extraComp;
    const finalFstop = calculateAperture(currentFstop, ilDiff);

    const evUnit = _t('evUnit');
    let powerDisplay;
    let powerExplanation;

    if (state.powerMode === 'IL') {
        powerDisplay = `${ilDiff >= 0 ? '+' : ''}${ilToPowerIL(ilDiff)} ${evUnit}`;
        powerExplanation = ilDiff >= 0
            ? _t('resultIncrease') + ` ${Math.abs(ilDiff).toFixed(1)} ${evUnit}`
            : _t('resultDecrease') + ` ${Math.abs(ilDiff).toFixed(1)} ${evUnit}`;
    } else {
        const currentPowerElement = dom('flash-current-power');
        const currentPower = currentPowerElement ? parseFloat(currentPowerElement.value) : 1.0;

        const currentPowerObj = FLASH_POWERS_FRACTIONS.find(f => Math.abs(f.value - currentPower) < 0.01);
        const currentPowerIL = currentPowerObj ? currentPowerObj.ilValue : 0;
        const targetPowerIL = currentPowerIL + ilDiff;

        const targetPowerObj = FLASH_POWERS_FRACTIONS.reduce((prev, curr) =>
            Math.abs(curr.ilValue - targetPowerIL) < Math.abs(prev.ilValue - targetPowerIL) ? curr : prev
        );

        const currentFractionLabel = currentPowerObj ? currentPowerObj.label : '1/1';
        powerDisplay = targetPowerObj.label;
        powerExplanation = `${_t('resultFrom')} ${currentFractionLabel} ${_t('resultTo')} ${targetPowerObj.label}`;
    }

    // HSS warning
    const hssWarning = dom('hss-warning');
    const hssWarningTextEl = dom('hss-warning-text');

    if (state.hssEnabled && hssWarning && hssWarningTextEl) {
        if (hssActive) {
            hssWarning.style.display = 'flex';
            hssWarningTextEl.innerHTML = `<strong>${_t('hssActive')}</strong> (${getShutterLabel(shootingSpeed)})<br>
                <small>~${hssLoss.toFixed(1)} ${evUnit}</small>`;
        } else {
            hssWarning.style.display = 'flex';
            hssWarningTextEl.innerHTML = `<strong>${_t('hssNotRequired')}</strong> (${getShutterLabel(shootingSpeed)})`;
        }
    } else if (hssWarning) {
        hssWarning.style.display = 'none';
    }

    let resultsHTML = `
        <div class="result-item">
            <span class="result-label">${_t('resultFlashTarget')}</span>
            <span class="result-value">f/${finalFstop}</span>
            <span class="result-detail">${_t('resultAtIsoSpeed', {iso: iso, speed: getShutterLabel(shootingSpeed)})}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultPowerAdjust')}</span>
            <span class="result-value">${powerDisplay}</span>
            <span class="result-detail">${powerExplanation}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultBaseDiff')}</span>
            <span class="result-value">${ilDiff >= 0 ? '+' : ''}${ilDiff.toFixed(1)} ${evUnit}</span>
            <span class="result-detail">${_t('resultCompApplied')}: ${extraComp >= 0 ? '+' : ''}${extraComp.toFixed(1)} ${evUnit}</span>
        </div>
    `;

    if (hssActive) {
        resultsHTML += `
        <div class="result-item" style="border-left-color: #64b5f6;">
            <span class="result-label">${_t('hssWarningTitle')}</span>
            <span class="result-value" style="color: #64b5f6; font-size: 16px;">~${hssLoss.toFixed(1)} ${evUnit}</span>
            <span class="result-detail">${_t('hssWarningText', {loss: hssLoss.toFixed(1), speed: getShutterLabel(maxSyncSpeed)})}</span>
        </div>
        `;
    }

    const results = dom('flash-results');
    if (results) results.innerHTML = resultsHTML;
}

/**
 * Calcule les ratios KEY/FILL LIGHT
 */
export function calculateRatios() {
    const keyFstop = parseFloat(dom('ratio-key')?.value);
    const ratioIL = state.compensation.ratios;
    const iso = validateISO(parseInt(dom('ratio-iso')?.value));
    const shutter = parseFloat(dom('ratio-vitesse')?.value);

    const fillFstop = calculateAperture(keyFstop, ratioIL);
    const evUnit = _t('evUnit');

    let powerDisplay;
    if (state.powerMode === 'IL') {
        powerDisplay = `${ratioIL >= 0 ? '+' : ''}${ilToPowerIL(ratioIL)} ${evUnit}`;
    } else {
        powerDisplay = ilToPowerFraction(ratioIL);
    }

    const lightingRatio = calculateLightingRatio(ratioIL);

    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">${_t('resultFillLight')}</span>
            <span class="result-value">f/${fillFstop}</span>
            <span class="result-detail">${_t('resultAtIsoSpeed', {iso: iso, speed: getShutterLabel(shutter)})}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultRatio')} Fill vs Key</span>
            <span class="result-value">${powerDisplay}</span>
            <span class="result-detail">${ratioIL.toFixed(1)} ${evUnit}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultLightingRatio')}</span>
            <span class="result-value">${lightingRatio}</span>
            <span class="result-detail">Key: f/${keyFstop} | Fill: f/${fillFstop}</span>
        </div>
    `;

    const results = dom('ratio-results');
    if (results) results.innerHTML = resultsHTML;
}

/**
 * Calcule l'estimation sans posemetre (Sans Cellule)
 */
export function calculateEstimation() {
    const zoneIL = parseFloat(dom('estim-zone')?.value);
    const measuredFstop = parseFloat(dom('estim-mesure')?.value);
    const iso = validateISO(parseInt(dom('estim-iso')?.value));
    const shutter = parseFloat(dom('estim-vitesse')?.value);
    const comp = state.compensation.estimation;

    const incidentFstop = calculateAperture(measuredFstop, -zoneIL);
    const finalFstop = calculateAperture(incidentFstop, -comp);
    const finalShutter = calculateShutterSpeed(shutter, -comp);
    const finalISO = calculateISO(iso, comp);

    const zoneSelect = dom('estim-zone');
    const zoneName = zoneSelect?.selectedOptions?.[0]?.text || 'Zone';
    const evUnit = _t('evUnit');

    const resultsHTML = `
        <div class="result-item">
            <span class="result-label">${_t('resultIncidentLight')}</span>
            <span class="result-value">f/${incidentFstop}</span>
            <span class="result-detail">${_t('resultBeforeComp')}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultMeasuredZone')}</span>
            <span class="result-value">${zoneName}</span>
            <span class="result-detail">${_t('resultSpotReading')}: f/${measuredFstop}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultZoneComp')}</span>
            <span class="result-value">${-zoneIL >= 0 ? '+' : ''}${(-zoneIL).toFixed(1)} ${evUnit}</span>
            <span class="result-detail">${_t('resultAccordingReflectance')}</span>
        </div>
        <hr style="border: 0; border-top: 2px solid rgba(255,255,255,0.1); margin: 20px 0;">
        <h4 style="text-align: center; color: #4caf50; margin-bottom: 16px; font-size: 15px;">${_t('resultFinalSettings', {comp: (comp >= 0 ? '+' : '') + comp.toFixed(1)})}</h4>
        <div class="result-item">
            <span class="result-label">${_t('resultOption1')}</span>
            <span class="result-value">f/${finalFstop}</span>
            <span class="result-detail">${_t('resultSpeed')}: ${getShutterLabel(shutter)} | ISO: ${iso}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultOption2')}</span>
            <span class="result-value">${getShutterLabel(finalShutter)}</span>
            <span class="result-detail">${_t('resultAperture')}: f/${incidentFstop} | ISO: ${iso}</span>
        </div>
        <div class="result-item">
            <span class="result-label">${_t('resultOption3')}</span>
            <span class="result-value">ISO ${finalISO}</span>
            <span class="result-detail">${_t('resultAperture')}: f/${incidentFstop} | ${_t('resultSpeed')}: ${getShutterLabel(shutter)}</span>
        </div>
    `;

    const results = dom('estim-results');
    if (results) results.innerHTML = resultsHTML;
}

// ============================================
// MODAL D'AIDE
// ============================================

export function openHelpModal() {
    const modal = dom('help-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        showHelpSection('help-general');
    }
}

export function closeHelpModal() {
    const modal = dom('help-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

/**
 * Affiche une section d'aide specifique
 * @param {string} sectionId
 */
export function showHelpSection(sectionId) {
    document.querySelectorAll('.help-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.modal-nav-btn').forEach(b => b.classList.remove('active'));

    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.classList.add('active');

    const targetBtn = document.querySelector(`.modal-nav-btn[data-section="${sectionId.replace('help-', '')}"]`);
    if (targetBtn) targetBtn.classList.add('active');
}
