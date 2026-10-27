import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import 'remixicon/fonts/remixicon.css'
import './styles/variables.css' ;
import './styles/global.css';
import '@fontsource/inter';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </StrictMode>
);