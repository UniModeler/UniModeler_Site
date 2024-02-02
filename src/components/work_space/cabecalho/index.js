import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

import { get } from 'local-storage';

export default function Cabecalho({projectInfo}) {

    const [logged, setLogged] = useState(false);

    useEffect(() => {
        let login = get('user-login');

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

            <div className='project-name'>
                <h2>{projectInfo ? projectInfo.info.name : 'Guest'}</h2>

                <button>
                    <img src="/assets/images/icons/chevron-down.svg" alt="" />
                </button>
            </div>

            <div className="user">
                {!logged ?
                    <button className="btn-login" onClick={() => navigate('/login')}>Login</button> :

                    <div className="user-menu">
                        <div style={{ background: logged.profileColor }}>
                            {logged.info.name.charAt(0)}
                        </div>

                        <img src="/assets/images/icons/chevron-down.svg" alt="" />
                    </div>
                }
            </div>
        </header>
    )
}