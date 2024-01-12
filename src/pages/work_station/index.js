import { useEffect, useState } from 'react';
import Cabecalho from '../../components/work_station/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/structuresAPI';
import CollectionsFlow from './collectionsFlow';
import ActionsBar from '../../components/work_station/actions_bar';
import SideBar from '../../components/work_station/side_bar';
import { ReactFlowProvider } from 'reactflow';
import initialString from './initialJs';
import ToasterContainer from '../../components/toast';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import { getSharedLink } from '../../api/sharedLinksAPI';

export default function WorkStation() {

    const query = new URLSearchParams(useLocation().search);
    const [jsString, setJsString] = useState();
    const [structure, setStructure] = useState();

    const [initialLoad, setInitialLoad] = useState(false);

    async function buscarEstruturaObjeto() {
        try {
            let struct = await estruturaObjeto(jsString);
            setStructure(struct);

        } catch (error) {
            console.log(error)
        }
    }

    async function buscarSharedLink() {
        let sharedCode = query.get('sharedLink')

        if (sharedCode) {
            try {
                let linkData = await getSharedLink(sharedCode);
                setJsString(linkData.jsonModel);

            } catch (error) {
                setJsString(initialString);
                toast.error(error.response.data.erro);
            }
        } else {
            setJsString(initialString);
        }

        setInitialLoad(true);
    }

    useEffect(() => {
        buscarSharedLink();
    }, [])

    useEffect(() => {
        if (initialLoad) {
            buscarEstruturaObjeto();
            setInitialLoad(false)
        }
    }, [jsString])

    return (
        <ReactFlowProvider>
            <div className="pagina workstation">

                <ToasterContainer />

                <main>
                    <Cabecalho />
                    <ActionsBar jsString={jsString} />

                    <SideBar jsString={jsString}
                        setJsString={setJsString}
                        buscarEstruturaObjeto={buscarEstruturaObjeto}
                        structure={structure}
                    />

                </main>

                <CollectionsFlow structure={structure} />
            </div>
        </ReactFlowProvider>
    )
}