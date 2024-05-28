import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import callApi from "../../../api/callAPI";
import { changeProjectImage, getProjectImage, renameProject } from "../../../api/services/projectsAPI";
import { confirmAlert } from "react-confirm-alert";
import OutsideClickHandler from "react-outside-click-handler";
import toast from "react-hot-toast";
import SharePopup from "../../../components/sharePopup";
import ProjectMenu from "./projectMenu";

export default function Project({ project, resetProjects }) {

  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [projectInfo, setProjectInfo] = useState(project);
  const permission = project.permission;

  const [changeName, setChangeName] = useState(false);
  const [name, setName] = useState(project.info.name);

  const menuButtonRef = useRef();

  useEffect(() => {
    if (changeName)
      document.getElementById('change-name').select();
  }, [changeName])

  useEffect(() => {
    setProjectInfo(project);
  }, [project])

  function toProject() {
    navigate('/workspace/project/' + project.id)
  }

  async function renameIt() {
    if (permission !== 'owner') {
      toast("You don't have permission to do that.");
      return;
    }

    await callApi(renameProject, project.id, name);
    setChangeName(false);
    resetProjects();
  }

  async function updateImage(image) {
    if (permission !== 'owner') {
      toast("You don't have permission to do that.");
      return;
    }

    await callApi(changeProjectImage, project.id, image);
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

      <button ref={menuButtonRef} onClick={() => setShowMenu(!showMenu)}>
        <img src="/assets/images/icons/menu-vertical.svg" alt="" />
        <input type="file" id='image' onChange={e => updateImage(e.target.files[0])} />

        {showMenu &&
          <ProjectMenu menuButtonRef={menuButtonRef} 
                 project={projectInfo}
                 permission={permission}
                 resetProjects={resetProjects}
                 setShowMenu={setShowMenu}
                 setChangeName={setChangeName}
                 share={share} />
        }
      </button>
    </section>

  )
}