import { useState } from "react";
import type { Duck } from "../../models/Duck";
import { useDucksContext } from "../../contexts/DucksService";
import "./DeleteModal.css";

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
        <div className="delete-modal-content">
          <p>Are you sure you want to delete this duck?</p>
          <div className="delete-modal-info">
            <p><strong>Color:</strong> {selectedDuck.color}</p>
            <p><strong>Size:</strong> {selectedDuck.size}</p>
            <p><strong>Price:</strong> ${selectedDuck.price.toFixed(2)}</p>
            <p><strong>Quantity:</strong> {selectedDuck.quantity}</p>
          </div>
          <p className="delete-modal-warning">
            This action cannot be undone.
          </p>
        </div>

        <div className="delete-modal-button-container">
          <button 
            type="button" 
            className="delete-modal-button danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button 
            type="button" 
            className="delete-modal-button"
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