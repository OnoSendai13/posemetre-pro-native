// ============================================
// FONCTIONS MATHEMATIQUES PHOTOGRAPHIQUES
// Fonctions pures - aucun acces DOM
// ============================================

import { APERTURES, SHUTTERSPEEDS, ISO_STANDARD, FLASH_POWERS_FRACTIONS } from './constants.js';

// ============================================
// OUVERTURE
// ============================================

/**
 * Convertit une difference d'IL en facteur multiplicateur d'ouverture
 * @param {number} ilDelta
 * @returns {number}
 */
export function ilToApertureFactor(ilDelta) {
    return Math.pow(2, ilDelta / 2);
}

/**
 * Trouve l'ouverture standard la plus proche
 * @param {number} value
 * @returns {number}
 */
export function findClosestAperture(value) {
    return APERTURES.reduce((prev, curr) =>
        Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
}

/**
 * Calcule la nouvelle ouverture avec compensation IL
 * @param {number} baseAperture
 * @param {number} ilDelta
 * @returns {number}
 */
export function calculateAperture(baseAperture, ilDelta) {
    const newValue = baseAperture * ilToApertureFactor(ilDelta);
    return findClosestAperture(newValue);
}

/**
 * Calcule la difference en IL entre deux ouvertures
 * @param {number} aperture1
 * @param {number} aperture2
 * @returns {number}
 */
export function apertureToIL(aperture1, aperture2) {
    return 2 * Math.log2(aperture2 / aperture1);
}

// ============================================
// VITESSE
// ============================================

/**
 * Trouve la vitesse standard la plus proche (comparaison logarithmique)
 * @param {number} value
 * @returns {import('./constants.js').ShutterSpeed}
 */
export function findClosestShutterSpeed(value) {
    return SHUTTERSPEEDS.reduce((prev, curr) => {
        const prevDiff = Math.abs(Math.log(prev.value / value));
        const currDiff = Math.abs(Math.log(curr.value / value));
        return currDiff < prevDiff ? curr : prev;
    });
}

/**
 * Calcule la nouvelle vitesse avec compensation IL
 * @param {number} baseSpeed - Valeur numerique de la vitesse
 * @param {number} ilDelta
 * @returns {number} Valeur numerique de la vitesse
 */
export function calculateShutterSpeed(baseSpeed, ilDelta) {
    const newValue = baseSpeed / Math.pow(2, ilDelta);
    const shutterObj = findClosestShutterSpeed(newValue);
    return shutterObj.value;
}

/**
 * Obtient le label d'une vitesse a partir de sa valeur
 * @param {number} value
 * @returns {string}
 */
export function getShutterLabel(value) {
    const shutter = SHUTTERSPEEDS.find(s => Math.abs(s.value - value) / s.value < 0.01);
    return shutter ? shutter.label : `1/${Math.round(1/value)}`;
}

// ============================================
// ISO
// ============================================

/**
 * Valide et borne une valeur ISO
 * @param {number} iso
 * @returns {number}
 */
export function validateISO(iso) {
    const minISO = ISO_STANDARD[0];
    const maxISO = ISO_STANDARD[ISO_STANDARD.length - 1];
    if (isNaN(iso) || iso < minISO) return minISO;
    if (iso > maxISO) return maxISO;
    return iso;
}

/**
 * Calcule le nouvel ISO avec compensation IL
 * @param {number} baseISO
 * @param {number} ilDelta
 * @returns {number}
 */
export function calculateISO(baseISO, ilDelta) {
    const newISO = Math.round(baseISO * Math.pow(2, ilDelta));
    return ISO_STANDARD.reduce((prev, curr) =>
        Math.abs(curr - newISO) < Math.abs(prev - newISO) ? curr : prev
    );
}

// ============================================
// FLASH
// ============================================

/**
 * Convertit IL en puissance flash (format Profoto: IL et dixiemes)
 * @param {number} ilDelta
 * @returns {string}
 */
export function ilToPowerIL(ilDelta) {
    return (Math.round(ilDelta * 10) / 10).toFixed(1);
}

/**
 * Convertit IL en puissance flash (format fractions)
 * @param {number} ilDelta
 * @returns {string}
 */
export function ilToPowerFraction(ilDelta) {
    const powerRatio = Math.pow(2, ilDelta);
    const closest = FLASH_POWERS_FRACTIONS.reduce((prev, curr) =>
        Math.abs(curr.value - powerRatio) < Math.abs(prev.value - powerRatio) ? curr : prev
    );
    return closest.label;
}

/**
 * Calcule le ratio d'eclairage (ex: 4:1)
 * @param {number} ilDifference
 * @returns {string}
 */
export function calculateLightingRatio(ilDifference) {
    const ratio = Math.pow(2, Math.abs(ilDifference));
    return `${ratio.toFixed(1)}:1`;
}

// ============================================
// HSS
// ============================================

/**
 * Calcule la perte de puissance en mode HSS
 * En HSS, on perd environ 2 IL de base puis ~1 IL par stop supplementaire
 * @param {number} shootingSpeed - Vitesse de prise de vue (ex: 1/1000 = 0.001)
 * @param {number} maxSyncSpeed - Vitesse sync max du flash (ex: 1/250 = 0.004)
 * @returns {number} Perte en IL (nombre positif)
 */
export function calculateHSSPowerLoss(shootingSpeed, maxSyncSpeed) {
    if (shootingSpeed >= maxSyncSpeed) {
        return 0;
    }
    const stopsAboveSync = Math.log2(maxSyncSpeed / shootingSpeed);
    const powerLoss = 2 + (stopsAboveSync - 1);
    return Math.max(0, powerLoss);
}

/**
 * Verifie si le HSS est necessaire
 * @param {number} shootingSpeed
 * @param {number} maxSyncSpeed
 * @returns {boolean}
 */
export function isHSSRequired(shootingSpeed, maxSyncSpeed) {
    return shootingSpeed < maxSyncSpeed;
}
