import api from "./apiURL";

export async function createSharedLink(jsString) {
    let r = await api.post('/link', {jsString: jsString});

    return r.data;
}   

export async function getSharedLink(code) {
    let r = await api.get('/link/' + code);

    return r.data;
}