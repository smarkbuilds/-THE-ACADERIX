import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { AuthProvider } from './context/AuthContext';
import { SubjectProvider } from './context/SubjectContext';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <SubjectProvider>
          <App />
        </SubjectProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
