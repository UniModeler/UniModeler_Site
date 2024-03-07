import DownloadButton from '../../react-flow/downloadButton';
import './index.scss';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { get } from 'local-storage';
import { confirmAlert } from 'react-confirm-alert';
import callApi from '../../../api/callAPI';
import { createProject, updateProject } from '../../../api/services/projectsAPI';
import { useEffect, useState } from 'react';
import SharePopup from './sharePopup';

export default function ActionsBar({ projectInfo, projectModel, permission }) {

    const [info, setInfo] = useState(projectInfo);
    const logged = get('user-login');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(projectInfo)
            setInfo(projectInfo);
    }, [projectInfo])

    function share() {
        confirmAlert({
            customUI: () => <SharePopup projectInfo={info} setInfo={setInfo} pathname={pathname} permission={permission} />
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

                <button onClick={share}>
                    <img src="/assets/images/icons/share.svg" alt="" />
                </button>
            </div>
        </section>
    )
}