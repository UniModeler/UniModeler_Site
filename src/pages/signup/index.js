import { useState } from 'react';
import './index.scss';
import ToasterContainer from '../../components/toast';
import toast from 'react-hot-toast';
import { registerAccount } from '../../api/services/accountsAPI';

import { set } from 'local-storage';
import callApi from '../../api/callAPI';
import validParams from '../../util/testParams';

export default function SignUpPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [expertise, setExpertise] = useState('');

    async function register() {
        if(validParams(name, email, password, company, expertise)) {
            let r = await callApi(registerAccount, [name, email, password, company, expertise]);

            set('user-login', r);
    
            toast.success('Conta criada com sucesso!')
        }
    }

    return (
        <div className="page sign-up">

            <ToasterContainer props={{ position: 'bottom-center' }} />

            <div>
                <img src="/assets/images/logo.svg" alt="" />

                <section className="inputs">
                    <div>
                        <input type="text" placeholder='Nome' value={name} onChange={e => setName(e.target.value)} />
                        <input type="text" placeholder='Empresa' value={company} onChange={e => setCompany(e.target.value)} />
                        <input type="text" placeholder='Área de atuação' value={expertise} onChange={e => setExpertise(e.target.value)} />
                        <button onClick={register}>Criar conta</button>
                    </div>
                    <div>
                        <input type="text" placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
                        <input type="text" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                </section>
            </div>
        </div>
    )
}