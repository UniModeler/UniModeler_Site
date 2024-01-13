import DownloadButton from '../../downloadButton';
import './index.scss';
import { createSharedLink } from '../../../api/sharedLinksAPI';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

export default function ActionsBar({ jsString }) {

    let location = useLocation();

    async function copy(linkInfo) {

        let url = window.location.href;
        let copyUrl = url.slice(0, url.search('\\?')) + '?sharedLink=' + linkInfo.code;

        await navigator.clipboard.writeText(copyUrl)

        toast.success('Copied to clipboard', {position: 'top-center'});
    }

    async function shareLink() {
        try {
            let linkInfo = await createSharedLink(jsString);

            toast.success(
                <div>
                    Here is your shared link. You can make this {linkInfo.remaining} more times.

                    <button onClick={() => copy(linkInfo)}>Copy</button>
                </div>, 
                {
                    position: 'top-center'
                }
            )

        } catch (error) {
            toast.error(error.response.data)
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