import { useEffect, useState } from "react";
import useTranslations from "../../util/multiLanguage";
import toast from "react-hot-toast";
import callApi from "../../api/callAPI";
import { addCollaborator, changeCollaboratorPermission, changeLinkPermission } from "../../api/services/shareProjectAPI";
import { getProject } from "../../api/services/projectsAPI";
import { getUserByEmail, getUserById } from "../../api/services/accountsAPI";

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

import './index.scss';

export default function SharePopup({ projectInfo, setInfo, pathname, permission }) {

    console.log(projectInfo);

    const changingPermission = permission === 'owner';

    const [translation, replace] = useTranslations('actionsBar');
    const [linkPermission, setLinkPermission] = useState(projectInfo.share.link.permission);
    const [collaborators, setCollaborators] = useState(projectInfo.share.collaborators);

    const [email, setEmail] = useState('');

    async function copyLink() {
        let url = window.location.href;

        let copyUrl = url.replace(pathname, '/workspace/shareLink/' + projectInfo.share.link.code);

        await navigator.clipboard.writeText(copyUrl)

        toast.success(translation.shareButton.copyText, { position: 'top-center' });
    }

    async function changeLinkPerm(newPermission) {
        callApi(() => {
            if ((newPermission !== 'read' && newPermission !== 'edit') || !changingPermission) {
                throw new Error('Erro ao alterar a permissão.')
            }

            changeLinkPermission(projectInfo.id, newPermission);
            setLinkPermission(newPermission);
        })

        updateInfo();
    }

    async function addCollab() {
        await callApi(async () => {
            if (!changingPermission)
                throw new Error('You cannot do that.')

            let user = await getUserByEmail(email);

            if (!user)
                throw new Error('Não existe um usuário com o email informado.')

            await addCollaborator(projectInfo.id, user.id);

            toast.success('Compartilhado!')
        });

        updateInfo();
    }

    async function updateInfo() {
        let newInfo = await callApi(getProject, projectInfo.id, projectInfo.userId);
        setInfo(newInfo);
        setCollaborators(newInfo.share.collaborators);
        setLinkPermission(newInfo.share.link.permission);
    }

    return (
        <div className="sharePopUp">
            <h2>Compartilhar Projeto</h2>
            <p>Convide seu time para colaborar nesse projeto.</p>

            {changingPermission &&
                <div className='input'>
                    <img src="/assets/images/icons/search.svg" alt="" />

                    <input type="text" placeholder='Informe o e-mail'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') addCollab() }} />
                </div>
            }

            <h3>Colaboradores</h3>
            <PerfectScrollbar style={{maxHeight: '138px', marginBottom: '70px'}}>
                <section className='collaborators'>
                    {collaborators.map(collaborator => <Collaborator id={collaborator.userId}
                                                                    projectInfo={projectInfo}
                                                                    collaborators={collaborators}
                                                                    updateInfo={updateInfo}
                                                                    changingPermission={changingPermission} />)}
                </section>
            </PerfectScrollbar>

            <h3>Link Público</h3>
            <div className='link'>
                <button disabled={!projectInfo.share.link.code} onClick={copyLink}>
                    {projectInfo.share.link.code ?
                        <img src="/assets/images/icons/copy.svg" alt="" />
                        :
                        <img src="/assets/images/icons/link.svg" alt="" />                        
                    }                    
                </button>

                <div>
                    <h4>Qualquer pessoa com o link</h4>
                    <p>pode {linkPermission} esse projeto</p>
                </div>

                <div className='select'>
                    <select defaultValue={projectInfo.share.link.permission}
                        onChange={e => changeLinkPerm(e.target.value)}
                        disabled={!changingPermission}
                    >
                        <option value="read" key="">Ver</option>
                        <option value="edit" key="">Editar</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

function Collaborator({ id, projectInfo, collaborators, updateInfo, changingPermission }) {

    const [userInfo, setUserInfo] = useState();
    const [myPermission, setMyPermission] = useState();

    async function getUserInfo() {
        setUserInfo(await callApi(getUserById, id));
        let permission = collaborators.filter(collab => collab.userId === id)[0];

        setMyPermission(permission.permission);
    }

    async function changeCollabPermission(newPermission) {
        await callApi(async () => {
            if ((newPermission !== 'read' && newPermission !== 'edit') || !changingPermission)
                throw new Error('Erro ao atualizar permissão')

            await changeCollaboratorPermission(projectInfo.id, id, newPermission);
            updateInfo();
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [id])

    if (userInfo)
        return (
            <div>
                <span style={{ backgroundColor: userInfo.profileColor }}>{userInfo.info.name.charAt(0)}</span>
                <div>
                    <h4>{userInfo.info.name}</h4>
                    <p>{userInfo.auth.email}</p>
                </div>

                <div className='select'>
                    <select defaultValue={myPermission}
                        onChange={e => changeCollabPermission(e.target.value)}
                        disabled={!changingPermission}
                    >
                        <option value="read" key="">Ver</option>
                        <option value="edit" key="">Editar</option>
                    </select>
                </div>
            </div>
        )
}