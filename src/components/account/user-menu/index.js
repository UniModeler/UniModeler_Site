import { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { remove } from 'local-storage';

export default function UserMenu({ login }) {

    const [opened, setOpened] = useState(false);

    function signOut() {
        remove('user-login');
        window.location.reload();
    }

    return (
        <>
            <div className="user-menu" onClick={() => setOpened(!opened)}>
                <div style={{ background: login.profileColor }}>
                    {login.info.name.charAt(0)}
                </div>

                <img src="/assets/images/icons/chevron-down.svg" alt="" />
            </div>

            {opened &&
                <div className='menu-opened'>
                    <div>
                        <div className='user-letter' style={{ background: login.profileColor }}>
                            {login.info.name.charAt(0)}
                        </div>

                        <div className='username'>
                            <h3>{login.info.name}</h3>
                            <button onClick={signOut}>Sair</button>
                        </div>
                    </div>

                    <nav>
                        <Link to={'/projects?section=myProjects'}>Meus Projetos</Link>
                        <Link to={'/projects?section=sharedWithMe'}>Compartilhados Comigo</Link>
                    </nav>
                </div>
            }
        </>
    )
}