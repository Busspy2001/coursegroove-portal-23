
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AnimatePresence } from 'framer-motion';

// Ajouter AnimatePresence pour gérer les transitions de page
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AnimatePresence mode="wait">
      <App />
    </AnimatePresence>
  </React.StrictMode>
);
