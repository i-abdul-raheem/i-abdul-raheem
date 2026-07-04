import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../style.css';
import './styles.css';
import './admin/admin.css';
import { LanguageProvider } from './language';
import { ContentProvider } from './context/ContentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ContentProvider>
          <App />
        </ContentProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
