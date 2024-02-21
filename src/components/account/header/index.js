import { useEffect, useState } from 'react';
import './index.scss';
import { get } from 'local-storage';
import { useNavigate } from 'react-router-dom';
import UserMenu from '../user-menu';

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
                <UserMenu login={logged}/>
            }
        </header>
    )
}