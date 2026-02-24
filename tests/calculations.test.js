// ============================================
// TESTS UNITAIRES — Fonctions de calcul photo
// ============================================

import { describe, it, expect } from 'vitest';
import {
    ilToApertureFactor,
    findClosestAperture,
    calculateAperture,
    apertureToIL,
    findClosestShutterSpeed,
    calculateShutterSpeed,
    getShutterLabel,
    validateISO,
    calculateISO,
    ilToPowerIL,
    ilToPowerFraction,
    calculateLightingRatio,
    calculateHSSPowerLoss,
    isHSSRequired
} from '../src/calculations.js';

// ============================================
// OUVERTURE
// ============================================

describe('ilToApertureFactor', () => {
    it('retourne 1 pour 0 IL', () => {
        expect(ilToApertureFactor(0)).toBeCloseTo(1, 5);
    });

    it('retourne sqrt(2) ~1.414 pour +1 IL (fermer d\'un stop)', () => {
        expect(ilToApertureFactor(1)).toBeCloseTo(Math.SQRT2, 3);
    });

    it('retourne 2 pour +2 IL', () => {
        expect(ilToApertureFactor(2)).toBeCloseTo(2, 5);
    });

    it('retourne 1/sqrt(2) pour -1 IL (ouvrir d\'un stop)', () => {
        expect(ilToApertureFactor(-1)).toBeCloseTo(1 / Math.SQRT2, 3);
    });
});

describe('findClosestAperture', () => {
    it('retourne f/5.6 pour 5.6 exact', () => {
        expect(findClosestAperture(5.6)).toBe(5.6);
    });

    it('retourne f/8 pour 7.9', () => {
        expect(findClosestAperture(7.9)).toBe(8);
    });

    it('retourne f/1.0 pour valeur tres petite', () => {
        expect(findClosestAperture(0.5)).toBe(1.0);
    });

    it('retourne f/45 pour valeur tres grande', () => {
        expect(findClosestAperture(100)).toBe(45);
    });
});

describe('calculateAperture', () => {
    it('f/5.6 + 0 IL = f/5.6', () => {
        expect(calculateAperture(5.6, 0)).toBe(5.6);
    });

    it('f/5.6 + 1 IL (fermer) = f/8', () => {
        expect(calculateAperture(5.6, 1)).toBe(8);
    });

    it('f/5.6 + 2 IL = f/11', () => {
        expect(calculateAperture(5.6, 2)).toBe(11);
    });

    it('f/5.6 - 1 IL (ouvrir) = f/4', () => {
        expect(calculateAperture(5.6, -1)).toBe(4);
    });

    it('f/8 - 2 IL = f/4', () => {
        expect(calculateAperture(8, -2)).toBe(4);
    });
});

describe('apertureToIL', () => {
    it('f/5.6 a f/5.6 = 0 IL', () => {
        expect(apertureToIL(5.6, 5.6)).toBeCloseTo(0, 5);
    });

    it('f/5.6 a f/8 = ~1 IL', () => {
        expect(apertureToIL(5.6, 8)).toBeCloseTo(1, 0);
    });

    it('f/5.6 a f/4 = ~-1 IL', () => {
        expect(apertureToIL(5.6, 4)).toBeCloseTo(-1, 0);
    });

    it('f/4 a f/11 = ~3 IL', () => {
        expect(apertureToIL(4, 11)).toBeCloseTo(3, 0);
    });
});

// ============================================
// VITESSE
// ============================================

describe('findClosestShutterSpeed', () => {
    it('retourne 1/125 pour 0.008 exact', () => {
        const result = findClosestShutterSpeed(1/125);
        expect(result.label).toBe('1/125');
    });

    it('retourne 1/60 pour 1/60 exact', () => {
        const result = findClosestShutterSpeed(1/60);
        expect(result.label).toBe('1/60');
    });
});

describe('calculateShutterSpeed', () => {
    it('1/125 + 0 IL = 1/125', () => {
        const result = calculateShutterSpeed(1/125, 0);
        expect(result).toBeCloseTo(1/125, 5);
    });

    it('1/125 + 1 IL = vitesse plus rapide (~1/250)', () => {
        const result = calculateShutterSpeed(1/125, 1);
        // 1/125 / 2 = 1/250
        expect(result).toBeCloseTo(1/250, 4);
    });

    it('1/125 - 1 IL = vitesse plus lente (~1/60)', () => {
        const result = calculateShutterSpeed(1/125, -1);
        expect(result).toBeCloseTo(1/60, 3);
    });
});

describe('getShutterLabel', () => {
    it('retourne "1/125" pour 1/125', () => {
        expect(getShutterLabel(1/125)).toBe('1/125');
    });

    it('retourne \'30"\' pour 30', () => {
        expect(getShutterLabel(30)).toBe('30"');
    });

    it('retourne un fallback pour valeur non standard', () => {
        const label = getShutterLabel(1/127);
        expect(typeof label).toBe('string');
    });
});

// ============================================
// ISO
// ============================================

describe('validateISO', () => {
    it('retourne 100 pour 100', () => {
        expect(validateISO(100)).toBe(100);
    });

    it('borne au minimum (25) pour valeur trop basse', () => {
        expect(validateISO(1)).toBe(25);
    });

    it('borne au maximum (102400) pour valeur trop haute', () => {
        expect(validateISO(999999)).toBe(102400);
    });

    it('retourne le minimum pour NaN', () => {
        expect(validateISO(NaN)).toBe(25);
    });
});

describe('calculateISO', () => {
    it('ISO 100 + 0 IL = ISO 100', () => {
        expect(calculateISO(100, 0)).toBe(100);
    });

    it('ISO 100 + 1 IL = ISO 200', () => {
        expect(calculateISO(100, 1)).toBe(200);
    });

    it('ISO 100 + 2 IL = ISO 400', () => {
        expect(calculateISO(100, 2)).toBe(400);
    });

    it('ISO 800 - 1 IL = ISO 400', () => {
        expect(calculateISO(800, -1)).toBe(400);
    });

    it('ISO 100 + 3 IL = ISO 800', () => {
        expect(calculateISO(100, 3)).toBe(800);
    });
});

// ============================================
// FLASH
// ============================================

describe('ilToPowerIL', () => {
    it('arrondi au dixieme: 1.33 -> "1.3"', () => {
        expect(ilToPowerIL(1.33)).toBe('1.3');
    });

    it('0 -> "0.0"', () => {
        expect(ilToPowerIL(0)).toBe('0.0');
    });

    it('-2.67 -> "-2.7"', () => {
        expect(ilToPowerIL(-2.67)).toBe('-2.7');
    });
});

describe('ilToPowerFraction', () => {
    it('0 IL = 1/1 (pleine puissance)', () => {
        expect(ilToPowerFraction(0)).toBe('1/1');
    });

    it('-1 IL = 1/2', () => {
        expect(ilToPowerFraction(-1)).toBe('1/2');
    });

    it('-2 IL = 1/4', () => {
        expect(ilToPowerFraction(-2)).toBe('1/4');
    });

    it('-3 IL = 1/8', () => {
        expect(ilToPowerFraction(-3)).toBe('1/8');
    });
});

describe('calculateLightingRatio', () => {
    it('0 IL = 1.0:1', () => {
        expect(calculateLightingRatio(0)).toBe('1.0:1');
    });

    it('-1 IL = 2.0:1', () => {
        expect(calculateLightingRatio(-1)).toBe('2.0:1');
    });

    it('-2 IL = 4.0:1', () => {
        expect(calculateLightingRatio(-2)).toBe('4.0:1');
    });

    it('-3 IL = 8.0:1', () => {
        expect(calculateLightingRatio(-3)).toBe('8.0:1');
    });
});

// ============================================
// HSS
// ============================================

describe('isHSSRequired', () => {
    it('1/1000 avec sync 1/250: HSS requis', () => {
        expect(isHSSRequired(1/1000, 1/250)).toBe(true);
    });

    it('1/125 avec sync 1/250: HSS pas requis', () => {
        expect(isHSSRequired(1/125, 1/250)).toBe(false);
    });

    it('1/250 avec sync 1/250: HSS pas requis (egal)', () => {
        expect(isHSSRequired(1/250, 1/250)).toBe(false);
    });
});

describe('calculateHSSPowerLoss', () => {
    it('pas de perte si en dessous de la sync', () => {
        expect(calculateHSSPowerLoss(1/125, 1/250)).toBe(0);
    });

    it('pas de perte si egal a la sync', () => {
        expect(calculateHSSPowerLoss(1/250, 1/250)).toBe(0);
    });

    it('perte positive au dessus de la sync', () => {
        const loss = calculateHSSPowerLoss(1/500, 1/250);
        expect(loss).toBeGreaterThan(0);
    });

    it('perte ~2 IL pour 1 stop au dessus de la sync (1/500 vs 1/250)', () => {
        const loss = calculateHSSPowerLoss(1/500, 1/250);
        // 1 stop au dessus => 2 + (1 - 1) = 2 IL
        expect(loss).toBeCloseTo(2, 0);
    });

    it('perte augmente avec la distance a la sync', () => {
        const loss500 = calculateHSSPowerLoss(1/500, 1/250);
        const loss1000 = calculateHSSPowerLoss(1/1000, 1/250);
        expect(loss1000).toBeGreaterThan(loss500);
    });
});
