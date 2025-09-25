import type { DuckColor, DuckSize } from '../models/Duck';

// Duck Color Options
export const DUCK_COLORS: readonly DuckColor[] = ['Red', 'Green', 'Yellow', 'Black'] as const;

// Duck Size Options
export const DUCK_SIZES: readonly DuckSize[] = ['XLarge', 'Large', 'Medium', 'Small', 'XSmall'] as const;

// Default Values
export const DEFAULT_VALUES = {
  COLOR: 'Red' as DuckColor,
  SIZE: 'XLarge' as DuckSize,
  PRICE: 0,
  QUANTITY: 1,
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PRICE: {
    MIN: 0.01,
    MAX: 999.99,
    DECIMAL_PLACES: 2,
  },
  QUANTITY: {
    MIN: 1,
    MAX: 999,
  },
} as const;
