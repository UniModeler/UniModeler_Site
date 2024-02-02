import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import WorkSpace from './pages/work_space';
import SharedLinkWorkspace from './pages/work_space/sharedLink';
import ProjectWorkspace from './pages/work_space/project';

import Projects from './pages/projects';
import LoginPage from './pages/login';
import SignUpPage from './pages/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/workspace' element={<WorkSpace />}/>
        <Route path='/workspace/shareLink/:code' element={<SharedLinkWorkspace />}/>
        <Route path='/workspace/project/:id' element={<ProjectWorkspace />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/cadastro' element={<SignUpPage />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);