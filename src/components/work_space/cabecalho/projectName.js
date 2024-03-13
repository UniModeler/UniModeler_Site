import { useEffect, useState } from "react";
import callApi from "../../../api/callAPI";
import { renameProject } from "../../../api/services/projectsAPI";

import OutsideClickHandler from 'react-outside-click-handler';
import toast from "react-hot-toast";

export default function ProjectName({ project, permission }) {

    const [name, setName] = useState('');
    const [changeName, setChangeName] = useState(false);

    useEffect(() => {
        if (project)
            setName(project.info.name);
    }, [project])

    useEffect(() => {
        if (changeName) {
            document.getElementById('change-name').select();
        }
    }, [changeName])

    async function renameIt() {
        await callApi(renameProject, project.id, name);
        setChangeName(false);
    }

    return (
        <div className='project-name'>
            {
                project && changeName ?
                    <OutsideClickHandler onOutsideClick={() => renameIt()}>
                        <input type="text" value={name}
                            id='change-name'
                            onChange={e => setName(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') renameIt() }} />
                    </OutsideClickHandler> :

                    <h2>{name ? name : 'Untitled'}</h2>
            }

            {
                project &&
                <button onClick={() => { permission === "owner" ? setChangeName(true) : toast("You don't have permission to change this.") }}>
                    <img src="/assets/images/icons/chevron-down.svg" alt="" />
                </button>
            }
        </div>
    )
}