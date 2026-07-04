import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import User from './Components/Users/Users'
import './index.css'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <User/>
  </StrictMode>,
)
