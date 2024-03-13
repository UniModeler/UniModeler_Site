import api from "../apiURL";

export async function estruturaObjeto(jsString) {
    let resp = await api().post('/modeler/structure', { jsString: jsString });

    return resp.data;
}