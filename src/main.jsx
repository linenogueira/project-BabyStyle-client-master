import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import { AuthProviderWrapper } from './Context/auth.context.jsx'
const API_URL = "http://localhost:5005";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
      <App />
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
)
