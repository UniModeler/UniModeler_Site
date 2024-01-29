import api from "./apiURL";

export async function registerAccount(name, email, password, company, expertise) {
    let r = await api.post('/accounts/register', {
        name: name, 
        email: email,
        password: password,
        company: company,
        expertise: expertise
    });

    return r.data;
}

export async function loginAccount(email, password) {
    let r = await api.post('/accounts/login', {
        email: email,
        password: password
    });

    return r.data;
}