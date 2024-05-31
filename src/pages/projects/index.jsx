import { useEffect, useState } from 'react';
import Footer from '../../components/account/footer';
import Header from '../../components/account/header';
import './index.scss';
import { get } from 'local-storage';
import { createProject, getCollaborationProjects, getUserProjects } from '../../api/services/projectsAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import callApi from '../../api/callAPI';

import 'react-confirm-alert/src/react-confirm-alert.css';
import { useQuery } from '../../util/urlQuery';
import ProjectCard from './projectCard';
import ToasterContainer from '../../components/toast';

export default function Projects() {

  const location = useLocation();
  const query = useQuery();
  let querySection = query.get("section")

  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projects, setProjects] = useState([]);
  const [section, setSection] = useState(querySection ? querySection : 'myProjects');
  let login = get('user-login')?.user;

  const navigate = useNavigate();

  async function getProjects() {
    if (section === 'myProjects') {
      let data = await callApi(getUserProjects, login.id);
      setProjects(data);
      setLoadingProjects(false);
    }
    else if (section === 'sharedWithMe') {
      let data = await callApi(getCollaborationProjects, login.id);
      setProjects(data);
      setLoadingProjects(false);
    }
  }

  async function createIt() {
    let project = await callApi(createProject, 'Untitled Project');
    navigate('/workspace/project/' + project.id);
  }

  useEffect(() => {
    if (querySection)
      setSection(querySection);

    setLoadingProjects(true);

  }, [location.key])

  useEffect(() => {
    if (login)
      getProjects();
  }, [section, location.key])

  return (
    <div className="page account-page projects">
      <Header />

      <ToasterContainer />

      <main>
        <div className="sections">
          <div className={section !== 'myProjects' ? 'disabled' : ''}
            onClick={() => { setSection('myProjects'); setLoadingProjects(true) }}
          >
            <h2>Meus Projetos</h2>
            <button onClick={() => { if (section === 'myProjects') createIt() }}><h3>+</h3></button>
          </div>

          <div className={section !== 'sharedWithMe' ? 'disabled' : ''}
            onClick={() => { setSection('sharedWithMe'); setLoadingProjects(true) }}
          >
            <h2>Compartilhados Comigo</h2>
          </div>
        </div>

        {projects.length > 0 ?
          <section className="container-projects">
            {projects.map(p => <ProjectCard project={p} resetProjects={getProjects} key={p}/>)}
          </section>

          :

          !loadingProjects && <NoProjects section={section} createProject={createIt} />
        }
      </main>

      <Footer />
    </div>
  )
}

function NoProjects({ section, createProject }) {
  if (section === 'myProjects') {
    return (
      <div className="noProjects">
        <img src="/assets/images/space-mailbox.png" alt="" />
        <p>Parece que você ainda não tem projetos.</p>
        <p>Comece a Modelar agora mesmo!</p>
        <button onClick={createProject}>Novo Projeto</button>
      </div>
    )
  }
  else if (section === 'sharedWithMe') {
    return (
      <div className="noProjects">
        <img src="/assets/images/space-mailbox.png" alt="" />
        <p>Parece que ninguém compartilhou nada com você ainda.</p>
      </div>
    )
  }
}