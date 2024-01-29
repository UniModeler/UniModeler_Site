import { useState } from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import ToasterContainer from '../../components/toast';
import toast from 'react-hot-toast';
import { loginAccount } from '../../api/accountsAPI';

import {set} from 'local-storage'

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function login() {
        try {
            let login = await loginAccount(email, password);

            set('user-login', login);

            toast.success('Logado!')
            
        } catch (error) {
            console.log(error.response.data.erro);
        }
    }

    return (
        <div className="page login">

            <ToasterContainer props={{position: 'bottom-center'}}/>

            <div>
                <section className="logo">
                    <img src="/assets/images/logo.svg" alt="" />
                </section>

                <section className="inputs">
                    <div>
                        <input type="email" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="password" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} />
                        <button onClick={login}>Entrar</button>

                        <div>
                            <Link to={'/cadastro'}>Criar conta</Link>
                            <Link>Esqueci a senha</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}