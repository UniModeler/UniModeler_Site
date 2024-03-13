import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

import { get } from 'local-storage';
import UserMenu from '../../account/user-menu';
import ProjectName from './projectName';

export default function Cabecalho({ projectInfo, permission }) {

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        let login = get('user-login').user;

        if (login) {
            setLogged(login);
        }
    }, [])

    const navigate = useNavigate();

    return (
        <header className='cabecalho'>
            <div className="logo">
                <img src="/assets/images/logo.svg" alt="" />
            </div>

            <ProjectName project={projectInfo} permission={permission}/>

            <div className="user">
                {!logged ?
                    <button className="btn-login" onClick={() => navigate('/login')}>Login</button> :

                    <UserMenu login={logged}/>    
                }
            </div>
        </header>
    )
}