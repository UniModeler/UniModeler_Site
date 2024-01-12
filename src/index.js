import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import WorkStation from './pages/work_station';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/workstation' element={<WorkStation />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);