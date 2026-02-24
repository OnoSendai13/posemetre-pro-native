// ============================================
// DONNEES DE REFERENCE PHOTOGRAPHIQUE
// ============================================

/**
 * @typedef {Object} ShutterSpeed
 * @property {string} label - Affichage (ex: '1/125')
 * @property {number} value - Valeur numerique en secondes
 */

/**
 * @typedef {Object} FlashPower
 * @property {string} label - Affichage (ex: '1/4')
 * @property {number} value - Ratio de puissance (0 a 1)
 * @property {number} ilValue - Equivalent en IL
 */

/** @type {number[]} Valeurs ISO standard (progression par tiers) */
export const ISO_STANDARD = [
    25, 32, 40, 50, 64, 80, 100, 125, 160, 200, 250, 320, 400, 500, 640, 800,
    1000, 1250, 1600, 2000, 2500, 3200, 4000, 5000, 6400, 8000, 10000, 12800,
    16000, 20000, 25600, 32000, 40000, 51200, 64000, 80000, 102400
];

/** @type {number[]} Valeurs d'ouverture standard (f-stops) */
export const APERTURES = [
    1.0, 1.1, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.5, 2.8,
    3.2, 3.5, 4.0, 4.5, 5.0, 5.6, 6.3, 7.1, 8.0, 9.0,
    10, 11, 13, 14, 16, 18, 20, 22, 25, 29, 32, 36, 40, 45
];

/** @type {ShutterSpeed[]} Valeurs de vitesse standard */
export const SHUTTERSPEEDS = [
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

/** @type {FlashPower[]} Puissances flash standard (mode Fractions) */
export const FLASH_POWERS_FRACTIONS = [
    { label: '1/1', value: 1, ilValue: 0 },
    { label: '1/2', value: 0.5, ilValue: -1 },
    { label: '1/4', value: 0.25, ilValue: -2 },
    { label: '1/8', value: 0.125, ilValue: -3 },
    { label: '1/16', value: 0.0625, ilValue: -4 },
    { label: '1/32', value: 0.03125, ilValue: -5 },
    { label: '1/64', value: 0.015625, ilValue: -6 },
    { label: '1/128', value: 0.0078125, ilValue: -7 },
    { label: '1/256', value: 0.00390625, ilValue: -8 },
    { label: '1/512', value: 0.001953125, ilValue: -9 }
];
