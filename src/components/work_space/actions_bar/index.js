import DownloadButton from '../../react-flow/downloadButton';
import './index.scss';
import toast from 'react-hot-toast';
import useTranslations from '../../../util/multiLanguage';
import { useLocation, useNavigate } from 'react-router-dom';
import { get } from 'local-storage';
import { confirmAlert } from 'react-confirm-alert';
import callApi from '../../../api/callAPI';
import { createProject, updateProject } from '../../../api/services/projectsAPI';

export default function ActionsBar({ projectInfo, projectModel, permission }) {

    const logged = get('user-login');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    function shareLink() {
        confirmAlert({
            customUI: () => <SharePopup projectInfo={projectInfo} pathname={pathname} />
        })
    }

    async function saveProject() {
        if (projectInfo && permission !== 'read') {
            let data = projectInfo;
            data.modeling.data = projectModel;

            await callApi(updateProject, projectInfo._id, data);

            toast.success('Salvo!', { position: 'top-center' });
        }
    }

    async function newProject() {
        let project = await callApi(createProject, logged._id, 'Untitled Project');
        navigate('/workspace/project/' + project._id);
    }

    return (
        <section className="actions-bar">
            <div className={logged ? '' : 'not-logged'}>
                <button onClick={saveProject}>
                    <img src="/assets/images/icons/save.svg" alt="" />
                </button>

                <button onClick={() => { saveProject(); navigate('/projects') }}>
                    <img src="/assets/images/icons/file.svg" alt="" />
                </button>

                <button onClick={() => { saveProject(); newProject() }}>
                    <img src="/assets/images/icons/addPage.svg" alt="" />
                </button>
            </div>

            <div>
                <DownloadButton>
                    <img src="/assets/images/icons/exportPage.svg" alt="" />
                </DownloadButton>

                <button onClick={shareLink}>
                    <img src="/assets/images/icons/share.svg" alt="" />
                </button>
            </div>
        </section>
    )
}

function SharePopup({ projectInfo, pathname }) {

    const [translation, replace] = useTranslations('actionsBar');


    async function copyLink() {
        let url = window.location.href;

        let copyUrl = url.replace(pathname, '/workspace/shareLink/' + projectInfo.share.link.code);

        await navigator.clipboard.writeText(copyUrl)

        toast.success(translation.shareButton.copyText, { position: 'top-center' });
    }

    return (
        <div className="sharePopUp">
            <h2>Compartilhar Projeto</h2>
            <p>Convide seu time para colaborar nesse projeto.</p>

            <div className='input'>
                <img src="/assets/images/icons/search.svg" alt="" />
                <input type="text" placeholder='Informe o e-mail' />
            </div>

            <h3>Colaboradores</h3>
            <section className='collaborators'>
                <div>
                    <span style={{ backgroundColor: '#0FAA00' }}>A</span>
                    <div>
                        <h4>Bruno de Oliveira</h4>
                        <p>brunodeoliveira.22.10@gmail.com</p>
                    </div>

                    <div className='select'>
                        <select>
                            <option value="Ver" key="">Ver</option>
                            <option value="Editar" key="">Editar</option>
                        </select>
                    </div>
                </div>
            </section>

            <h3>Link Público</h3>
            <div className='link'>
                <span onClick={copyLink}>
                    <img src="/assets/images/icons/copy.svg" alt="" />
                </span>

                <div>
                    <h4>Qualquer pessoa com o link</h4>
                    <p>pode ver esse projeto</p>
                </div>

                <div className='select'>
                    <select>
                        <option value="Ver" key="">Ver</option>
                        <option value="Editar" key="">Editar</option>
                    </select>
                </div>
            </div>
        </div>
    )
}