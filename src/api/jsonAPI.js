import api from "./apiURL";

export async function estruturaObjeto(jsString) {
    let resp = await api.post('/structure', {jsString: jsString});

    return resp.data;
}