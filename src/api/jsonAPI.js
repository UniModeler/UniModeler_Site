import api from "./apiURL";

export async function estruturaObjeto(obj) {
    let resp = await api.post('/structure', obj);

    return resp.data;
}