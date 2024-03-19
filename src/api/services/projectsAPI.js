import exampleModel from "../../util/example";
import api from "../apiURL";

export async function getUserProjects() {
  let r = await api().get(`/projects/user`)

  return r.data;
}

export async function getCollaborationProjects() {
  let r = await api().get(`/projects/collaboration`);

  return r.data;
}

export async function getProject(id) {
  let r = await api().get(`/projects/id/${id}`);

  return r.data;
}

export async function createProject(name, content) {
  let projectInfo = {
    name: name,
    jsContent: content ? content : exampleModel
  }

  let r = await api().post('/projects', projectInfo);

  return r.data;
}

export async function duplicateProject(projectId) {
  let r = await api().post(`/projects/${projectId}/duplicate`);

  return r.data;
}

export async function updateProject(projectId, newModel) {
  let r = await api().put('/projects/' + projectId, { newModel });

  return r.data;
}

export async function renameProject(projectId, newName) {
  let r = await api().put(`/projects/${projectId}/rename`, { newName });

  return r.data;
}

export async function deleteProject(projectId) {
  let r = await api().delete('/projects/' + projectId);

  return r;
}

export async function changeProjectImage(projectId, image) {
  const formData = new FormData();
  formData.append('cover-image', image);
  
  let r = await api().put(`/projects/${projectId}/cover`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  return r;
}

export function getProjectImage(url) {
  let string = api().getUri() + '/' + url;

  return string.replaceAll('\\', '/');
}