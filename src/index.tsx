import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';

import { App } from './App';
import { MainProvider } from './components/MainContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <MainProvider>
      <Router>
        <App />
      </Router>
    </MainProvider>
  );