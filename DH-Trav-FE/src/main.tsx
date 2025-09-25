import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DucksProvider } from './contexts/DucksService.tsx'
import { AppProvider } from './contexts/AppContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <DucksProvider>
        <App />
      </DucksProvider>
    </AppProvider>
  </StrictMode>,
)
