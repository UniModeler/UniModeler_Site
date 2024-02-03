import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useEffect, useState } from 'react';

import { get } from 'local-storage';
import OutsideClickHandler from 'react-outside-click-handler';
import callApi from '../../../api/callAPI';
import { updateProject } from '../../../api/services/projectsAPI';

export default function Cabecalho({ projectInfo }) {
    const [name, setName] = useState('');
    const [changeName, setChangeName] = useState(false);
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        let login = get('user-login');

        if (login) {
            setLogged(login);
        }
    }, [])

    useEffect(() => {
        if (projectInfo)
            setName(projectInfo.info.name);
    }, [projectInfo])

    useEffect(() => {
        if(changeName) {
            document.getElementById('change-name').select();
        }
    }, [changeName])

    async function renameIt() {
        let data = projectInfo;
        data.info.name = name;

        await callApi(updateProject, [data._id, data]);
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
                    changeName ?
                        <OutsideClickHandler onOutsideClick={() => renameIt()}>
                            <input type="text" value={name}
                                   id='change-name' 
                                   onChange={e => setName(e.target.value)}
                                   onKeyDown={e => { if (e.key === 'Enter') renameIt() }} />
                        </OutsideClickHandler> :

                        <h2>{name}</h2>
                }

                <button onClick={() => setChangeName(true)}>
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