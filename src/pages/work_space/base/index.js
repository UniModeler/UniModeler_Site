import Cabecalho from '../../../components/work_space/cabecalho';
import CollectionsFlow from '../../../components/react-flow/flow';
import ActionsBar from '../../../components/work_space/actions_bar';
import SideBar from '../../../components/work_space/side_bar';
import { ReactFlowProvider } from 'reactflow';
import ToasterContainer from '../../../components/toast';

import './index.scss';
import StructureContext from '../../../util/react-flow/structure/context';
import callApi from '../../../api/callAPI';
import { estruturaObjeto } from '../../../api/services/structuresAPI';
import { useEffect, useState } from 'react';
import { giveNodeInfo } from '../../../util/react-flow/nodes/createNodes';

export default function WorkSpace({ projectInfo, model, setModel, permission, initialLoad, setInitialLoad }) {

    const [structure, setStructure] = useState();

    async function buscarEstruturaObjeto() {
        let struct = await callApi(estruturaObjeto, model);
        setStructure(giveNodeInfo(struct));
    }

    useEffect(() => {
        if (initialLoad) {
            buscarEstruturaObjeto();
            setInitialLoad(false);
        }
    }, [model])

    return (
        <ReactFlowProvider>
            <StructureContext.Provider value={{ structure: structure, setStructure: setStructure }}>
                <div className="page workspace">

                    <ToasterContainer />

                    <main>
                        <Cabecalho projectInfo={projectInfo} permission={permission} />
                        <ActionsBar projectInfo={projectInfo} projectModel={model} permission={permission} />

                        <SideBar jsString={model}
                            setJsString={setModel}
                            buscarEstruturaObjeto={buscarEstruturaObjeto}
                            structure={structure}
                            permission={permission}
                        />
                    </main>

                    <CollectionsFlow structure={structure} />
                </div>
            </StructureContext.Provider>
        </ReactFlowProvider>
    )
}