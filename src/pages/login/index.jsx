import { useState } from 'react';
import './index.scss';
import { Link, useNavigate } from 'react-router-dom';
import ToasterContainer from '../../components/toast';
import toast from 'react-hot-toast';
import { loginAccount } from '../../api/services/accountsAPI';

import { set } from 'local-storage'
import callApi from '../../api/callAPI';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function login() {
    let login = await callApi(loginAccount, email, password);

    if (login) {
      set('user-login', login);
      toast.success('Logado!');
    }
  }

  return (
    <div className="page login">

      <ToasterContainer props={{ position: 'bottom-center' }} />

      <div>
        <section className="logo">
          <img src="/assets/images/logo.svg" alt="" onClick={() => navigate('/')}/>
        </section>

        <section className="inputs">
          <div>
            <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={login}>Entrar</button>

            <div>
              <Link to={'/signup'}>Criar conta</Link>
              <Link>Esqueci a senha</Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}