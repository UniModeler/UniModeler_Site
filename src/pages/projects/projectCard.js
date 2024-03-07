import { get } from "local-storage";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import callApi from "../../api/callAPI";
import { changeProjectImage, deleteProject, duplicateProject, getProjectImage, updateProject } from "../../api/services/projectsAPI";
import { confirmAlert } from "react-confirm-alert";
import OutsideClickHandler from "react-outside-click-handler";
import toast from "react-hot-toast";
import SharePopup from "../../components/work_space/actions_bar/sharePopup";

export default function Project({ project, resetProjects }) {

    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [projectInfo, setProjectInfo] = useState(project);
    const permission = project.permission;

    const [changeName, setChangeName] = useState(false);
    const [name, setName] = useState(project.info.name);

    const buttonRef = useRef();
    const [showMenuLeft, setShowMenuLeft] = useState(false);
    const [showMenuTop, setShowMenuTop] = useState(false);

    useEffect(() => {
        if (changeName)
            document.getElementById('change-name').select();
    }, [changeName])

    useEffect(() => {
        let buttonMeasures = buttonRef.current.getBoundingClientRect();

        if (buttonMeasures.x + 178 >= window.innerWidth)
            setShowMenuLeft(true);

        if (buttonMeasures.y + 194 >= window.innerHeight)
            setShowMenuTop(true);
    }, [])

    let login = get('user-login');

    function toProject() {
        navigate('/workspace/project/' + project._id)
    }

    async function renameIt() {
        if (permission !== 'owner') {
            toast("You don't have permission to do that.");
            return;
        }

        let data = project;
        data.info.name = name;

        await callApi(updateProject, project._id, data);
        setChangeName(false);
        resetProjects();
    }

    function deleteIt() {
        if (permission !== 'owner') {
            toast("You don't have permission to do that.");
            return;
        }

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
        if (permission !== 'owner') {
            toast("You don't have permission to do that.");
            return;
        }

        await callApi(changeProjectImage, project._id, image);
        resetProjects();
    }

    function share() {
        confirmAlert({
            customUI: () => <SharePopup projectInfo={projectInfo} setInfo={setProjectInfo} pathname={pathname} permission={permission} />
        })
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

            <button ref={buttonRef} onClick={() => setShowMenu(!showMenu)}>
                <img src="/assets/images/icons/menu-vertical.svg" alt="" />
                <input type="file" id='image' onChange={e => updateImage(e.target.files[0])} />

                {showMenu &&
                    <OutsideClickHandler onOutsideClick={() => { setShowMenu(false) }}>
                        <section className="menu"
                            style={{
                                right: showMenuLeft && '100%',
                                left: showMenuLeft && 'unset',
                                bottom: showMenuTop && '100%',
                                top: showMenuTop && 'unset'
                            }}
                        >
                            <div className="group">
                                <button onClick={toProject}>Ver</button>
                            </div>

                            <div className="group">
                                <button onClick={() => {
                                    if (permission !== 'owner')
                                        toast("You don't have permission to do that.");
                                    else setChangeName(true)
                                }}>Renomear</button>
                                
                                <button onClick={duplicateIt}>Duplicar</button>
                                <button onClick={deleteIt}>Excluir</button>
                            </div>

                            <div className="group">
                                <button onClick={share}>Compartilhar</button>
                                <button onClick={() => document.getElementById('image').click()}>Alterar capa</button>
                            </div>
                        </section>
                    </OutsideClickHandler>
                }
            </button>
        </section>

    )
}