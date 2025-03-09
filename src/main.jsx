import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Global Bootstrap Import
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Include Bootstrap JavaScript (for modals, tooltips, etc.)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
