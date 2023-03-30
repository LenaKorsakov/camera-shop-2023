import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import App from './components/app/app';

import { store } from './store';
import HistoryRouter from './components/history-route/history-router';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory} basename={process.env.PUBLIC_URL}>
        <ToastContainer/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
