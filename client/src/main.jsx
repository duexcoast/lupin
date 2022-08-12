import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import { store } from '../src/app/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, SurveyNew } from '../src/app/App';
import Landing from './features/ui/Landing';


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

console.log('STRIPE KEY IS', import.meta.env.VITE_APP_STRIPE_KEY);
console.log('Environment is ', import.meta.env.MODE);
