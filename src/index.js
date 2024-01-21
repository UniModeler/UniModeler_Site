import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import WorkSpace from './pages/work_space';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/workspace' element={<WorkSpace />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);