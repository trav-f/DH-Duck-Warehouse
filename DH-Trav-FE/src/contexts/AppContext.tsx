import { createContext, useContext, useState, type ReactNode } from "react";

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export interface Alert {
  id: string;
  message: string;
  type: AlertType;
  timestamp: Date;
}

type AppContextType = {
  // Loading state to trigger a loading spinner
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Alert system
  alerts: Alert[];
  showAlert: (message: string, type: AlertType) => void;
  clearAlert: (id: string) => void;
  clearAllAlerts: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const setLoading = (loading: boolean) => {
    if (!loading) {
        setTimeout(() => { // I want the loader to be visible in this sample app for minimum 0.5 seconds
            setIsLoading(loading);
        }, 500);
    } else {
        setIsLoading(loading);
    }
  };

  const showAlert = (message: string, type: AlertType) => {
    const newAlert: Alert = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date()
    };
    
    setAlerts(prev => [...prev, newAlert]);
    
    // Auto-remove alert after 3 seconds
    setTimeout(() => {
      clearAlert(newAlert.id);
    }, 3000);
  };

  const clearAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  return (
    <AppContext.Provider value={{
      isLoading,
      setLoading,
      alerts,
      showAlert,
      clearAlert,
      clearAllAlerts
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};