import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

import App from './components/app/app';

import { store } from './store';
import { fetchAllCameraAction, fetchPromoAction } from './store/api-actions/api-actions';
import HistoryRoute from './components/history-route/history-route';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

store.dispatch(fetchAllCameraAction());
store.dispatch(fetchPromoAction());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRoute history={browserHistory}>
        <ToastContainer/>
        <App />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
);
