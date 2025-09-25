import { useState } from "react";
import type { Duck, DuckColor, DuckSize } from "../../models/Duck";
import { useDucksContext } from "../../contexts/DucksService";
import { VALIDATION_MESSAGES } from "../../constants/messages";
import { DUCK_COLORS, DUCK_SIZES, DEFAULT_VALUES, VALIDATION_RULES } from "../../constants/options";
import "./EditAddModal.css";

function EditAddModal({
    selectedDuck,
    onClose
  }: {
    selectedDuck?: Duck | null; // if null, we are adding a new duck. Else, we are editing an existing duck.
    onClose: () => void;
  }) {
    const { createDuck, updateDuck } = useDucksContext()
    const [color, setColor] = useState<DuckColor>(selectedDuck?.color || DEFAULT_VALUES.COLOR);
    const [size, setSize] = useState<DuckSize>(selectedDuck?.size || DEFAULT_VALUES.SIZE);
    const [price, setPrice] = useState<number>(selectedDuck?.price || DEFAULT_VALUES.PRICE);
    const [quantity, setQuantity] = useState<number>(selectedDuck?.quantity || DEFAULT_VALUES.QUANTITY);

    const [errors, setErrors] = useState<{
      price?: string;
      quantity?: string;
      color?: string;
      size?: string;
      general?: string;
    }>({});

    const validateForm = () => {
      const newErrors: typeof errors = {};

      // Price validation
      if (!price || price === 0) {
        newErrors.price = VALIDATION_MESSAGES.PRICE_REQUIRED;
      } else if (price < VALIDATION_RULES.PRICE.MIN) {
        newErrors.price = VALIDATION_MESSAGES.PRICE_POSITIVE;
      } else if (price > VALIDATION_RULES.PRICE.MAX) {
        newErrors.price = VALIDATION_MESSAGES.PRICE_MAX;
      }

      // Quantity validation
      if (!quantity || quantity === 0) {
        newErrors.quantity = VALIDATION_MESSAGES.QUANTITY_REQUIRED;
      } else if (quantity < VALIDATION_RULES.QUANTITY.MIN) {
        newErrors.quantity = VALIDATION_MESSAGES.QUANTITY_POSITIVE;
      } else if (quantity > VALIDATION_RULES.QUANTITY.MAX) {
        newErrors.quantity = VALIDATION_MESSAGES.QUANTITY_MAX;
      }

      // Color validation (only for new ducks)
      if (!selectedDuck && !color) {
        newErrors.color = VALIDATION_MESSAGES.COLOR_REQUIRED;
      }

      // Size validation (only for new ducks)
      if (!selectedDuck && !size) {
        newErrors.size = VALIDATION_MESSAGES.SIZE_REQUIRED;
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!validateForm()) {
        return;
      }

      if (selectedDuck) { // if edit modal
        updateDuck(selectedDuck.id, { color, size, price, quantity } )
      } else {
        createDuck({ color, size, price, quantity });
      }

      onClose();
    };

    const clearError = (field: keyof typeof errors) => {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setPrice(value);
      if (errors.price) {
        clearError('price');
      }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setQuantity(value);
      if (errors.quantity) {
        clearError('quantity');
      }
    };

    const handleColorChange = (newColor: DuckColor) => {
      setColor(newColor);
      if (errors.color) {
        clearError('color');
      }
    };

    const handleSizeChange = (newSize: DuckSize) => {
      setSize(newSize);
      if (errors.size) {
        clearError('size');
      }
    };
  
    return (
      <div className="modal-backdrop">
      <div className="modal">
        <h2>{selectedDuck ? "Edit" : "Add"} Duck</h2>
        <form onSubmit={handleSubmit}>
          {/* Colors */}
          <fieldset className="modal-fieldset">
            <legend>Choose a Color</legend>
            <div className={`modal-options-grid ${selectedDuck ? 'disabled' : ''} ${errors.color ? 'error' : ''}`}>
              {DUCK_COLORS.map((c) => (
                <label key={c} className={`modal-option-label ${selectedDuck ? 'disabled' : ''}`}>
                  <input
                    type="radio"
                    name="color"
                    value={c}
                    checked={color === c}
                    onChange={() => handleColorChange(c)}
                    disabled={!!selectedDuck}
                    className={`modal-option-input ${selectedDuck ? 'disabled' : ''}`}
                  />
                  {c}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Sizes */}
          <fieldset className="modal-fieldset">
            <legend>Choose a Size</legend>
            <div className={`modal-options-grid ${selectedDuck ? 'disabled' : ''} ${errors.size ? 'error' : ''}`}>
              {DUCK_SIZES.map((s) => (
                <label key={s} className={`modal-option-label ${selectedDuck ? 'disabled' : ''}`}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => handleSizeChange(s)}
                    disabled={!!selectedDuck}
                    className={`modal-option-input ${selectedDuck ? 'disabled' : ''}`}
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="modal-form-label">
            Price ($):
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              className={`modal-number-input ${errors.price ? 'error' : ''}`}
              min={VALIDATION_RULES.PRICE.MIN}
              max={VALIDATION_RULES.PRICE.MAX}
              step="0.01"
            />
          </label>

          <label className="modal-form-label quantity-label">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className={`modal-number-input ${errors.quantity ? 'error' : ''}`}
              min={VALIDATION_RULES.QUANTITY.MIN}
              max={VALIDATION_RULES.QUANTITY.MAX}
            />
          </label>

          {/* Field-specific error messages */}
          {errors.price && (
            <div className="modal-error">
              {errors.price}
            </div>
          )}
          {errors.quantity && (
            <div className="modal-error">
              {errors.quantity}
            </div>
          )}
          {errors.color && (
            <div className="modal-error">
              {errors.color}
            </div>
          )}
          {errors.size && (
            <div className="modal-error">
              {errors.size}
            </div>
          )}
          {errors.general && (
            <div className="modal-error">
              {errors.general}
            </div>
          )}

          <div className="modal-button-container">
            <button type="submit" className="modal-button primary">{selectedDuck ? "Save" : "Add"}</button>
            <button type="button" className="modal-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
  
export default EditAddModal