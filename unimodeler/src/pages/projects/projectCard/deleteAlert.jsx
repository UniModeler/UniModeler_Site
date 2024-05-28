import callApi from "../../../api/callAPI";
import { deleteProject } from "../../../api/services/projectsAPI";

export default function DeleteAlert({project, resetProjects, onClose}) {
  return (
    <div className="delete-alert">
      <p>Deseja realmente excluir o projeto &quot;{project.info.name}&quot;?</p>

      <div>
        <button className='btn-yes' onClick={async () => {
          await callApi(deleteProject, project.id);
          resetProjects();
          onClose();
        }}>Sim</button>

        <button className='btn-no' onClick={onClose}>Não</button>
      </div>
    </div>
  )
}