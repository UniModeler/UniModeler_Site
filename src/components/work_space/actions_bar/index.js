import DownloadButton from '../../downloadButton';
import './index.scss';
import { createSharedLink } from '../../../api/sharedLinksAPI';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import useTranslations from '../../../api/multiLanguage';

export default function ActionsBar({ jsString }) {

    const [translation, replace] = useTranslations('actionsBar');

    async function copy(linkInfo) {
        let url = window.location.href;
        let queryIndex = url.search('\\?')

        queryIndex = queryIndex !== -1 ? queryIndex : url.length;

        let copyUrl = url.slice(0, queryIndex) + '?sharedLink=' + linkInfo.code;

        await navigator.clipboard.writeText(copyUrl)

        toast.success(translation.shareButton.copyText, {position: 'top-center'});
    }

    async function shareLink() {
        try {
            let linkInfo = await createSharedLink(jsString);

            toast.success(t =>
                <div className='cont-button'>
                    <p>{replace(translation.shareButton.shareText, [linkInfo.remaining])}</p>

                    <button onClick={() => {copy(linkInfo); toast.dismiss(t.id);}}>
                        <img src="/assets/images/icons/copy-button.svg" alt="" />
                    </button>
                </div>, 
                {
                    position: 'top-center',
                    duration: 60000,
                    className: 'button-share-link'
                }
            )

        } catch (error) {
            toast.error(error.response.data.erro)
        }
    }

    return (
        <section className="actions-bar">
            <div className="not-logged">
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