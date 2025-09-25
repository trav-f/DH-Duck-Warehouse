// Success Messages
export const SUCCESS_MESSAGES = {
  DUCK_CREATED: 'Duck created successfully',
  DUCK_UPDATED: 'Duck updated successfully',
  DUCK_DELETED: 'Duck deleted successfully',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  PRICE_QUANTITY_VALIDATION: 'Price and Quantity must be positive numbers.',
  APP_CONTEXT_ERROR: 'useAppContext must be used within an AppProvider',
  DUCKS_CONTEXT_ERROR: 'useDucksContext must be used inside DucksProvider',
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  PRICE_REQUIRED: 'Price is required',
  PRICE_POSITIVE: 'Price must be greater than 0',
  PRICE_MAX: 'Price cannot exceed $999.99',
  QUANTITY_REQUIRED: 'Quantity is required',
  QUANTITY_POSITIVE: 'Quantity must be greater than 0',
  QUANTITY_MAX: 'Quantity cannot exceed 999',
  COLOR_REQUIRED: 'Please select a color',
  SIZE_REQUIRED: 'Please select a size',
} as const;

// Operation Descriptions
export const OPERATION_DESCRIPTIONS = {
  FETCHING_DUCKS: 'fetching ducks',
  CREATING_DUCK: 'creating duck',
  UPDATING_DUCK: 'updating duck',
  DELETING_DUCK: 'deleting duck',
} as const;
