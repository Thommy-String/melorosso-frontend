import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import ContactPage from './pages/Contact';
import './App.css';
import { ConsentProvider } from './consent/ConsentContent'; // ✅ importa il provider

// Crea il router con le tue rotte
const router = createHashRouter([
  {
    path: "/",
    element: <App />, // La tua homepage
  },
  {
    path: "/contact",
    element: <ContactPage />, // La nuova pagina di contatto
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConsentProvider>
      <RouterProvider router={router} />
    </ConsentProvider>
  </React.StrictMode>,
);