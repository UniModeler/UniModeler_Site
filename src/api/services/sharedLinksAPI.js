import api from "../apiURL";

export async function getSharedLink(code) {
    let r = await api.get('/projects/link/' + code);

    return r.data;
}