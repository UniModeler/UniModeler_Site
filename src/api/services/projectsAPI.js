import exampleModel from "../../util/example";
import api from "../apiURL";

export async function getUserProjects(userId) {
    let r = await api.get(`/projects/user/${userId}`)

    return r.data;
}

export async function getCollaborationProjects(userId) {
    let r = await api.get(`/projects/collaboration/${userId}`);

    return r.data;
}

export async function getProject(id, userId) {
    let r = await api.get(`/projects/${id}?userId=${userId}`);

    return r.data;
}

export async function createProject(userId, name, content) {
    let projectInfo = {
        userId: userId,
        name: name,
        jsContent: content ? content : exampleModel
    }

    let r = await api.post('/projects', projectInfo);

    return r.data;
}

export async function duplicateProject(userId, name, coverImage, jsContent) {
    let projectInfo = {
        userId: userId,
        name: name + ' Copy',
        cover: coverImage,
        jsContent: jsContent
    }

    let r = await api.post('/projects', projectInfo);

    return r.data;
}

export async function updateProject(id, projectInfo) {
    let r = await api.put('/projects/' + id, projectInfo);

    return r.data;
}

export async function deleteProject(id) {
    let r = await api.delete('/projects/' + id);

    return r;
}

export async function changeProjectImage(id, image) {
    const formData = new FormData();
    formData.append('cover-image', image);
    console.log('a');

    let r = await api.put(`/projects/${id}/cover`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })

    return r;
}

export function getProjectImage(url) {
    let string = api.getUri() + '/' + url;

    return string.replaceAll('\\', '/');
}