import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import OutsideClickHandler from "react-outside-click-handler";
import callApi from "../../../api/callAPI";
import { confirmAlert } from "react-confirm-alert";
import { duplicateProject } from "../../../api/services/projectsAPI";
import { useNavigate } from "react-router-dom";
import DeleteAlert from "./deleteAlert";

export default function ProjectMenu({ menuButtonRef, project, permission, resetProjects, setShowMenu, setChangeName, share  }) {

  const [showMenuLeft, setShowMenuLeft] = useState(false);
  const [showMenuTop, setShowMenuTop] = useState(false);
  
  const navigate = useNavigate();
  const toProject = () => navigate('/workspace/project/' + project.id);

  useEffect(() => {
    let buttonMeasures = menuButtonRef.current.getBoundingClientRect();

    if (buttonMeasures.x + 178 >= window.innerWidth)
      setShowMenuLeft(true);

    if (buttonMeasures.y + 194 >= window.innerHeight)
      setShowMenuTop(true);
  }, [menuButtonRef])

  function deleteIt() {
    if (permission !== 'owner') {
      toast("You don't have permission to do that.");
      return;
    }

    confirmAlert({
      customUI: ({ onClose }) =>  <DeleteAlert project={project} resetProjects={resetProjects} onClose={onClose}/>
    })
  }

  async function duplicateIt() {
    await callApi(duplicateProject, project.id);
    resetProjects();
  }

  return (
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
  )
}