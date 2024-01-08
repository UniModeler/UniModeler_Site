import { useEffect, useState } from 'react';
import Cabecalho from '../../components/work_station/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/structuresAPI';
import CollectionsFlow from './collectionsFlow';
import ActionsBar from '../../components/work_station/actions_bar';
import SideBar from '../../components/work_station/side_bar';
import { ReactFlowProvider } from 'reactflow';
import initialString from './initialJs';

export default function WorkStation() {

    const [jsString, setJsString] = useState(initialString);
    const [structure, setStructure] = useState();

    async function buscarEstruturaObjeto() {
        try {
            let struct = await estruturaObjeto(jsString);
            setStructure(struct)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        buscarEstruturaObjeto();
    }, [])

    return (
        <ReactFlowProvider>
            <div className="pagina workstation">
                <main>
                    <Cabecalho />
                    <ActionsBar />

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