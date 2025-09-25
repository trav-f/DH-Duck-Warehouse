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
