import { useEffect, useState } from 'react';
import Footer from '../../components/account/footer';
import Header from '../../components/account/header';
import './index.scss';
import { get } from 'local-storage';
import { changeProjectImage, createProject, deleteProject, duplicateProject, getProjectImage, getUserProjects, updateProject } from '../../api/services/projectsAPI';
import { useNavigate } from 'react-router-dom';
import callApi from '../../api/callAPI';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import OutsideClickHandler from 'react-outside-click-handler';

export default function Projects() {

    const [projects, setProjects] = useState([]);
    let login = get('user-login');

    const navigate = useNavigate();

    async function getProjects() {
        if (login) {
            let data = await callApi(getUserProjects, login._id);
            setProjects(data);
        }
    }

    async function createIt() {
        let project = await callApi(createProject, login._id, 'Untitled Project');
        navigate('/workspace/project/' + project._id);
    }

    useEffect(() => {
        getProjects();
    }, [])

    return (
        <div className="page projects">
            <Header />

            <main>
                <div>
                    <h2>Meus Projetos</h2>
                    <button onClick={createIt}><h3>+</h3></button>
                </div>

                <section className="container-projects">
                    {projects.map(p =>
                        <Project project={p} resetProjects={getProjects} />
                    )}
                </section>
            </main>

            <Footer />
        </div>
    )
}

function Project({ project, resetProjects }) {

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const [changeName, setChangeName] = useState(false);
    const [name, setName] = useState(project.info.name);

    useEffect(() => {
        if (changeName)
            document.getElementById('change-name').select();
    }, [changeName])

    let login = get('user-login');

    function toProject() {
        navigate('/workspace/project/' + project._id)
    }

    async function renameIt() {
        let data = project;
        data.info.name = name;

        await callApi(updateProject, project._id, data);
        setChangeName(false);
        resetProjects();
    }

    function deleteIt() {
        confirmAlert({
            customUI: ({ onClose }) =>
                <div className="delete-alert">
                    <p>Deseja realmente excluir o projeto "{project.info.name}"?</p>

                    <div>
                        <button className='btn-yes' onClick={async () => {
                            await callApi(deleteProject, project._id);
                            resetProjects();
                            onClose();
                        }}>Sim</button>

                        <button className='btn-no' onClick={onClose}>Não</button>
                    </div>
                </div>
        })
    }

    async function duplicateIt() {
        await callApi(duplicateProject, login._id, project.info.name, project.info.cover, project.modeling.data);
        resetProjects();
    }

    async function updateImage(image) {
        await callApi(changeProjectImage, project._id, image);
        resetProjects();
    }

    return (
        <section className="project">
            <div style={{ backgroundImage: `url(${getProjectImage(project.info.cover)})` }}
                onClick={toProject}
            >
                <div className="shadow">
                    <div>
                        {
                            changeName ?
                                <OutsideClickHandler onOutsideClick={() => renameIt()}>
                                    <input id='change-name' type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') renameIt() }} />
                                </OutsideClickHandler> :
                                <h3>{project.info.name}</h3>
                        }

                        <p>Alterado há 10 horas</p>
                    </div>
                </div>
            </div>

            <button onClick={() => setShowMenu(!showMenu)} >
                <img src="/assets/images/icons/menu-vertical.svg" alt="" />
                <input type="file" id='image' onChange={e => updateImage(e.target.files[0])} />

                {showMenu &&
                    <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
                        <section className="menu">
                            <div className="group">
                                <button onClick={toProject}>Ver</button>
                            </div>

                            <div className="group">
                                <button onClick={() => setChangeName(true)}>Renomear</button>
                                <button onClick={duplicateIt}>Duplicar</button>
                                <button onClick={deleteIt}>Excluir</button>
                            </div>

                            <div className="group">
                                <button >Compartilhar</button>
                                <button onClick={() => document.getElementById('image').click()}>Alterar capa</button>
                            </div>
                        </section>
                    </OutsideClickHandler>
                }
            </button>
        </section>

    )
}