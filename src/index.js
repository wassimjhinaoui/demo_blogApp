import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import { DarkModeProvider } from './Contexts/DarkModeContext';


ReactDOM.render(
  <React.StrictMode>
        <DarkModeProvider>

    <App />
    </DarkModeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

