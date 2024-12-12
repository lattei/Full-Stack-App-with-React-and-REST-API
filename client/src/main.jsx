import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/reset.css';
import './styles/global.css';
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
