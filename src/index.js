import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import WorkSpace from './pages/work_space';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projects from './pages/projects';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/workspace' element={<WorkSpace />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/cadastro' element={<SignUpPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);