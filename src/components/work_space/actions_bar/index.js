import DownloadButton from '../../react-flow/downloadButton';
import './index.scss';
import toast from 'react-hot-toast';
import useTranslations from '../../../util/multiLanguage';
import { useLocation } from 'react-router-dom';
import { get } from 'local-storage';

export default function ActionsBar({ projectInfo }) {

    const [translation, replace] = useTranslations('actionsBar');
    const logged = get('user-info');
    const { pathname } = useLocation();

    async function copy() {
        let url = window.location.href;

        let copyUrl = url.replace(pathname, '/workspace/shareLink/' + projectInfo.share.code);

        await navigator.clipboard.writeText(copyUrl)

        toast.success(translation.shareButton.copyText, { position: 'top-center' });
    }

    async function shareLink() {
        toast.success(t =>
            <div className='cont-button'>
                <p>{translation.shareButton.shareText}</p>

                <button onClick={() => { copy(); toast.dismiss(t.id); }}>
                    <img src="/assets/images/icons/copy.svg" alt="" />
                </button>
            </div>,
            {
                position: 'top-center',
                duration: 60000,
                className: 'button-share-link'
            }
        )
    }

    return (
        <section className="actions-bar">
            <div className={logged ? '' : 'not-logged'}>
                <button>
                    <img src="/assets/images/icons/save.svg" alt="" />
                </button>

                <button>
                    <img src="/assets/images/icons/file.svg" alt="" />
                </button>

                <button>
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