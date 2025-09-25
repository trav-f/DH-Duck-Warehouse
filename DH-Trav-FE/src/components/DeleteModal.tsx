import { useState } from "react";
import type { Duck } from "../models/Duck";
import { useDucksContext } from "../services/DucksService";

function DeleteModal({
  selectedDuck,
  onClose
}: {
  selectedDuck: Duck;
  onClose: () => void;
}) {
  const { deleteDuck } = useDucksContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    deleteDuck(selectedDuck.id);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Delete Duck</h2>
        <div style={{ marginBottom: "1rem" }}>
          <p>Are you sure you want to delete this duck?</p>
          <div style={{ 
            padding: "1rem", 
            backgroundColor: "#f5f5f5", 
            borderRadius: "4px",
            margin: "1rem 0"
          }}>
            <p><strong>Color:</strong> {selectedDuck.color}</p>
            <p><strong>Size:</strong> {selectedDuck.size}</p>
            <p><strong>Price:</strong> ${selectedDuck.price}</p>
            <p><strong>Quantity:</strong> {selectedDuck.quantity}</p>
          </div>
          <p style={{ color: "#666", fontSize: "14px" }}>
            This action cannot be undone.
          </p>
        </div>

        <div style={{ marginTop: "10px", width: "100%", display: "flex", flexDirection: "row-reverse" }}>
          <button 
            type="button" 
            style={{ 
              margin: '4px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: isDeleting ? 'not-allowed' : 'pointer',
              opacity: isDeleting ? 0.6 : 1
            }}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button 
            type="button" 
            style={{ margin: '4px' }} 
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;