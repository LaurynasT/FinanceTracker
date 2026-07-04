import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import User from './Components/Users/Users'
import './index.css'
import NotificationList from './Components/Notification/NotificationList'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationList/>
    <User/>
  </StrictMode>,
)
