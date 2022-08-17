import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './app/App';
import './index.css';
import { store } from '../src/app/store';
import { Dashboard, SurveyNew } from '../src/app/App';
import Landing from './features/ui/Landing';

// Development _ONLY_ Axios Helpers
import axios from 'axios';
window.axios = axios;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Landing />} />
          <Route path='surveys' element={<Dashboard />}>
            <Route path='new' element={<SurveyNew />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
