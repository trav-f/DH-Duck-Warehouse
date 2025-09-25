import './LoadingModal.css'

function LoadingModal() {
  return (
    <div className="modal-backdrop">
      <div className="loading-modal">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default LoadingModal
