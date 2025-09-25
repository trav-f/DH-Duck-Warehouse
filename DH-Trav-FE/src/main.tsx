import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { DucksProvider } from './services/DucksService.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DucksProvider>
      <App />
    </DucksProvider>
  </StrictMode>,
)
