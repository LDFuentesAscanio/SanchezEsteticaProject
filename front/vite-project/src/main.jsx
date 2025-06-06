import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './reset.css'
import { BrowserRouter } from 'react-router-dom'
import { UsersProvider } from './Context/UsersContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsersProvider>
  </StrictMode>,
)
