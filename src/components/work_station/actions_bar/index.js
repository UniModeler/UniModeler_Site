import { useReactFlow } from 'reactflow';
import DownloadButton from '../../downloadButton';
import './index.scss';

export default function ActionsBar() {

    let { getNodes } = useReactFlow();

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

                <button>
                    <img src="/assets/images/icons/share.svg" alt="" />
                </button>
            </div>
        </section>
    )
}