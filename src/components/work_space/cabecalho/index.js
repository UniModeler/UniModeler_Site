import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

import { get } from 'local-storage';
import OutsideClickHandler from 'react-outside-click-handler';
import callApi from '../../../api/callAPI';
import { renameProject } from '../../../api/services/projectsAPI';
import toast from 'react-hot-toast';
import UserMenu from '../../account/user-menu';

export default function Cabecalho({ projectInfo, permission }) {

    const [name, setName] = useState('');
    const [changeName, setChangeName] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        let login = get('user-login').user;

        if (login) {
            setLogged(login);
        }
    }, [])

    useEffect(() => {
        if (projectInfo)
            setName(projectInfo.info.name);
    }, [projectInfo])

    useEffect(() => {
        if (changeName) {
            document.getElementById('change-name').select();
        }
    }, [changeName])

    async function renameIt() {
        await callApi(renameProject, projectInfo.id, name);
        setChangeName(false);
    }

    const navigate = useNavigate();

    return (
        <header className='cabecalho'>
            <div className="logo">
                <img src="/assets/images/logo.svg" alt="" />
            </div>

            <div className='project-name'>
                {
                    projectInfo && changeName ?
                        <OutsideClickHandler onOutsideClick={() => renameIt()}>
                            <input type="text" value={name}
                                id='change-name'
                                onChange={e => setName(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') renameIt() }} />
                        </OutsideClickHandler> :

                        <h2>{name ? name : 'Untitled'}</h2>
                }

                {
                    projectInfo &&
                    <button onClick={() => {permission === "owner" ? setChangeName(true) : toast("You don't have permission to change this.")}}>
                        <img src="/assets/images/icons/chevron-down.svg" alt="" />
                    </button>
                }

            </div>

            <div className="user">
                {!logged ?
                    <button className="btn-login" onClick={() => navigate('/login')}>Login</button> :

                    <UserMenu login={logged}/>    
                }
            </div>
        </header>
    )
}