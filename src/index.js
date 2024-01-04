import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import WorkStation from './pages/work_station';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WorkStation />
  </React.StrictMode>
);