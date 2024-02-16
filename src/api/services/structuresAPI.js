import { MarkerType } from "reactflow";
import api from "../apiURL";
import randomColor from 'randomcolor';

export async function estruturaObjeto(jsString) {
    let resp = await api.post('/modeler/structure', { jsString: jsString });

    return resp.data;
}