import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './app/App';
import './index.css';
import { store } from '../src/app/store';
import Dashboard from './features/dashboard/Dashboard';
import Landing from './features/ui/Landing';
import SurveyNew from './features/newSurvey/SurveyNew';

// Development _ONLY_ Axios Helpers
// import axios from 'axios';
// window.axios = axios;

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Landing />} />
          <Route path='surveys' element={<Dashboard />} />
          <Route path='surveys/new' element={<SurveyNew />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
