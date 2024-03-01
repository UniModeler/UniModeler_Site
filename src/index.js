import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SharedLinkWorkspace from './pages/work_space/sharedLink';
import ProjectWorkspace from './pages/work_space/project';

import Projects from './pages/projects';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';
import Plans from './pages/plans';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/workspace/shareLink/:code' element={<SharedLinkWorkspace />}/>
        <Route path='/workspace/project/:id' element={<ProjectWorkspace />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/signup' element={<SignUpPage />}/>
        <Route path='/plans' element={<Plans />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);