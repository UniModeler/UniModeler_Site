import { useEffect, useState } from 'react';
import Cabecalho from '../../components/work_space/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/services/structuresAPI';
import CollectionsFlow from '../../components/react-flow/collectionsFlow/collectionsFlow';
import ActionsBar from '../../components/work_space/actions_bar';
import SideBar from '../../components/work_space/side_bar';
import { ReactFlowProvider } from 'reactflow';
import initialString from '../../initialJs';
import ToasterContainer from '../../components/toast';

export default function WorkSpace({ projectInfo, model, setModel }) {

    const [jsString, setJsString] = useState();
    const [structure, setStructure] = useState();
    const [initialLoad, setInitialLoad] = useState(true);

    async function buscarEstruturaObjeto() {
        try {
            setStructure(await estruturaObjeto(jsString));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        buscarEstruturaObjeto();
    }, [])

    useEffect(() => {
        async function getModel() {
            if (model && initialLoad) {
                setJsString(model);
                setStructure(await estruturaObjeto(model));
                setInitialLoad(false);
            }
        }

        getModel();
    }, [model])

    useEffect(() => {
        if(!initialLoad) {
            setModel(jsString);
        }  
    }, [jsString])

    useEffect(() => {
        if(!initialLoad && !model)
            setModel(initialString);
    }, [initialLoad])

    return (
        <ReactFlowProvider>
            <div className="page workspace">

                <ToasterContainer />

                <main>
                    <Cabecalho projectInfo={projectInfo}/>
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