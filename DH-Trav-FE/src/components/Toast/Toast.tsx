import { useEffect, useState } from 'react'
import type { Alert } from '../../contexts/AppContext'
import './Toast.css'

interface ToastProps {
  alert: Alert
  onClose: (id: string) => void
}

function Toast({ alert, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsLeaving(true)
    setTimeout(() => onClose(alert.id), 300) // Wait for exit animation
  }

  const getIcon = () => {
    switch (alert.type) {
      case 'success':
        return '✓'
      case 'error':
        return '✕'
      case 'warning':
        return '⚠'
      case 'info':
        return 'ℹ'
      default:
        return 'ℹ'
    }
  }

  return (
    <div 
      className={`toast toast-${alert.type} ${isVisible ? 'toast-enter' : ''} ${isLeaving ? 'toast-leave' : ''}`}
      onClick={handleClose}
    >
      <div className="toast-icon">{getIcon()}</div>
      <div className="toast-content">
        <div className="toast-message">{alert.message}</div>
      </div>
      <button className="toast-close" onClick={handleClose}>×</button>
    </div>
  )
}

export default Toast
