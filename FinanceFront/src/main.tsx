import { StrictMode } from 'react'
import './index.css'
import NotificationList from './Components/Notification/NotificationList'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Homepage from './pages/Homepage'
import Navbar from './Components/Navbar/Navbar';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <NotificationList/>
    <Navbar/>
    <Homepage/>
    </BrowserRouter>
  </StrictMode>,
)
