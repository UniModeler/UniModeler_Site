import { get } from "local-storage";
import api from "../apiURL";

export async function createSharedLink(projectInfo, jsString) {
    
    let linkInfo = {}; 

    let logged = get('user-info');
    
    if(logged) {
        linkInfo.type = 'read';
        linkInfo.userId = logged._id;
        linkInfo.projectId = projectInfo._id;
    } else {
        linkInfo.type = 'guest';
        linkInfo.jsString = jsString;
    }

    let r = await api.post('/link', linkInfo);

    return r.data;
}   

export async function getSharedLink(code) {
    let r = await api.get('/projects/link/' + code);

    return r.data;
}