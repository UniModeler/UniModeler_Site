import { useEffect, useState } from 'react';
import './index.scss';
import { get } from 'local-storage';
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const [logged, setLogged] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        let login = get('user-login');

        if (!login) {
            navigate('/login');
        } else {
            setLogged(login);
        }
    }, [])

    return (
        <header className="accounts-header">
            <div className="welcome">
                <img src="/assets/images/logo_icon.svg" alt="" />
                <h2>Olá, bom te ver de novo Bruno ;)</h2>
            </div>

            {logged &&
                <div className="user-menu">
                    <div style={{ background: logged.profileColor }}>
                        {logged.info.name.charAt(0)}
                    </div>

                    <img src="/assets/images/icons/chevron-down.svg" alt="" />
                </div>
            }
        </header>
    )
}