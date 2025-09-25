import { useEffect, useState } from "react";
import type { Duck, DuckColor, DuckSize } from "../models/Duck";
import { useDucksContext } from "../services/DucksService";

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
          <fieldset style={{ marginBottom: "1rem" }}>
            <legend>Choose a Color</legend>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                opacity: selectedDuck ? 0.6 : 1,
              }}
            >
              {(["Red", "Green", "Yellow", "Black"] as DuckColor[]).map((c) => (
                <label key={c} style={{ cursor: selectedDuck ? 'not-allowed' : 'pointer' }}>
                  <input
                    type="radio"
                    name="color"
                    value={c}
                    checked={color === c}
                    onChange={() => setColor(c)}
                    disabled={!!selectedDuck}
                    style={{ cursor: selectedDuck ? 'not-allowed' : 'pointer' }}
                  />
                  {c}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Sizes */}
          <fieldset style={{ marginBottom: "1rem" }}>
            <legend>Choose a Size</legend>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "8px",
                opacity: selectedDuck ? 0.6 : 1,
              }}
            >
              {(
                ["XLarge", "Large", "Medium", "Small", "XSmall"] as DuckSize[]
              ).map((s) => (
                <label key={s} style={{ cursor: selectedDuck ? 'not-allowed' : 'pointer' }}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
                    disabled={!!selectedDuck}
                    style={{ cursor: selectedDuck ? 'not-allowed' : 'pointer' }}
                  />
                  {s}
                </label>
              ))}
            </div>
          </fieldset>

          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Price ($):
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              style={{ marginLeft: "8px", width: '50px' }}
            />
          </label>

          <label style={{ display: "block", marginBottom: "1rem" }}>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ marginLeft: "8px", width: '50px' }}
            />
          </label>

          <div className={`modal-error ${!error ? 'hidden' : ''}`} style={{ color: 'red', fontSize: "14px", height: '14px'}}>
            {error}
          </div>

          <div style={{ marginTop: "10px", width: "100%", display: "flex", flexDirection: "row-reverse"}}>
            <button type="submit" style={{ margin: '4px', backgroundColor: '#2563eb', color: 'white'}}>{selectedDuck ? "Save" : "Add"}</button>
            <button type="button" style={{ margin: '4px'}} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  }
  
export default EditAddModal