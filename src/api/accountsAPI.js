import api from "./apiURL";

export async function registerAccount(userInfo) {
    let [r] = await api.post('/accounts/login', userInfo);

    return r;
}

export async function loginAccount(userInfo) {
    let [r] = await api.post('/accounts/register', userInfo);

    return r;
}