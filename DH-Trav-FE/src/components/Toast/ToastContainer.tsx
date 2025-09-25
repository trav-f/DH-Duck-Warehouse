import { useAppContext } from '../../contexts/AppContext'
import Toast from './Toast'
import './Toast.css'

function ToastContainer() {
  const { alerts, clearAlert } = useAppContext()

  if (alerts.length === 0) {
    return null
  }

  return (
    <div className="toast-container">
      {alerts.map((alert) => (
        <Toast 
          key={alert.id} 
          alert={alert} 
          onClose={clearAlert}
        />
      ))}
    </div>
  )
}

export default ToastContainer
