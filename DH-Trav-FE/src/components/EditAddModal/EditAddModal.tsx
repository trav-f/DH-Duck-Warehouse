import { useEffect, useState } from "react";
import type { Duck, DuckColor, DuckSize } from "../../models/Duck";
import { useDucksContext } from "../../contexts/DucksService";
import "./EditAddModal.css";

function EditAddModal({
    selectedDuck,
    onClose
  }: {
    selectedDuck?: Duck | null; // if null, we are adding a new duck. Else, we are editing an existing duck.
    onClose: () => void;
  }) {
    const { createDuck, updateDuck } = useDucksContext()
    const [color, setColor] = useState<DuckColor>(selectedDuck?.color || 'Red');
    const [size, setSize] = useState<DuckSize>(selectedDuck?.size || 'XLarge');
    const [price, setPrice] = useState<number>(selectedDuck?.price || 0);
    const [quantity, setQuantity] = useState<number>(selectedDuck?.quantity || 1);

    const [error, setError] = useState<string | null>();

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (price <= 0 || quantity <= 0) {
        setError("Price and Quantity must be positive numbers.");
        return;
      }

      if (selectedDuck) { // if edit modal
        updateDuck(selectedDuck.id, { color, size, price, quantity } )
      } else {
        createDuck({ color, size, price, quantity });
      }

      onClose();
    };

    useEffect(() => {
      error && setTimeout(() => setError(null), 2000);
    }, [error]);
  
    return (
      <div className="modal-backdrop">
      <div className="modal">
        <h2>{selectedDuck ? "Edit" : "Add"} Duck</h2>
        <form onSubmit={handleSubmit}>
          {/* Colors */}
          <fieldset className="modal-fieldset">
            <legend>Choose a Color</legend>
            <div className={`modal-options-grid ${selectedDuck ? 'disabled' : ''}`}>
              {(["Red", "Green", "Yellow", "Black"] as DuckColor[]).map((c) => (
                <label key={c} className={`modal-option-label ${selectedDuck ? 'disabled' : ''}`}>
                  <input
                    type="radio"
                    name="color"
                    value={c}
                    checked={color === c}
                    onChange={() => setColor(c)}
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
            <div className={`modal-options-grid ${selectedDuck ? 'disabled' : ''}`}>
              {(
                ["XLarge", "Large", "Medium", "Small", "XSmall"] as DuckSize[]
              ).map((s) => (
                <label key={s} className={`modal-option-label ${selectedDuck ? 'disabled' : ''}`}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
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
              onChange={(e) => setPrice(Number(e.target.value))}
              className="modal-number-input"
            />
          </label>

          <label className="modal-form-label quantity-label">
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="modal-number-input"
            />
          </label>

          <div className={`modal-error ${!error ? 'hidden' : ''}`}>
            {error}
          </div>

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