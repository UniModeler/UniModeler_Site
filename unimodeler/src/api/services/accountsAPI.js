import api from "../apiURL";

export async function registerAccount(name, email, password, company, expertise) {
  let r = await api().post('/accounts/register', {
    name: name, 
    email: email,
    password: password,
    company: company,
    expertise: expertise
  });

  return r.data;
}

export async function loginAccount(email, password) {
  let r = await api().post('/accounts/login', {
    email: email,
    password: password
  });

  return r.data;
}

export async function getUserByEmail(email) {
  let r = await api().get('/accounts/email?address=' + email);
  
  return r.data;
}

export async function getUserById(id) {
  let r = await api().get('/accounts/' + id);

  return r.data;
}