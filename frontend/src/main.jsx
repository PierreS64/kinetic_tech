import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { AppProvider } from './contexts/AppContext'

function AppProviders({ children }) {
  const { currentUser } = useAuth();
  const userId = currentUser?.id || 'guest';
  
  return (
    <AppProvider key={userId} userId={userId}>
      <CartProvider key={userId} userId={userId}>
        {children}
      </CartProvider>
    </AppProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/kinetictech">
      <AuthProvider>
        <AppProviders>
          <App />
        </AppProviders>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
