import api from "../apiURL";

export async function getSharedLink(code) {
  let r = await api().get('/projects/link/' + code);

  return r.data;
}

export async function changeLinkPermission(projectId, newPermission) {
  let r = await api().put(`projects/link/${projectId}?permission=${newPermission}`);

  return r.data;
}

export async function addCollaborator(projectId, collaboratorId) {
  let r = await api().post(`/projects/${projectId}/collaborator/${collaboratorId}`);

  return r.data;
}

export async function changeCollaboratorPermission(projectId, collaboratorId, newPermission) {
  let r = await api().put(`/projects/${projectId}/collaborator/${collaboratorId}?permission=${newPermission}`);

  return r.data;
}