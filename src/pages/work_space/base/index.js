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

import { useBeforeUnload, useBlocker } from 'react-router-dom';
import UnsavedAlert from '../../../components/work_space/unsavedAlert';

export default function WorkSpace({ projectInfo, model, setModel, permission, initialLoad, setInitialLoad }) {

    const [structure, setStructure] = useState();
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    async function buscarEstruturaObjeto() {
        let struct = await callApi(estruturaObjeto, model);

        if (struct)
            setStructure(giveNodeInfo(struct));
    }

    useEffect(() => {
        if (initialLoad) {
            buscarEstruturaObjeto();
            setInitialLoad(false);
        } else {
            setHasUnsavedChanges(true);
        }
    }, [model])

    const handleUnsavedEvent = event => {
        if (!hasUnsavedChanges) return;

        event.preventDefault();
        event.returnValue = '';
        return '';
    }

    useBeforeUnload(handleUnsavedEvent, { capture: true });
    const blocker = useBlocker(hasUnsavedChanges);

    return (
        <ReactFlowProvider>
            <StructureContext.Provider value={{ structure: structure, setStructure: setStructure }}>
                <div className="page workspace">

                    <ToasterContainer />

                    <main>
                        <Cabecalho projectInfo={projectInfo} permission={permission} />
                        <ActionsBar projectInfo={projectInfo} projectModel={model} permission={permission} setHasUnsavedChanges={setHasUnsavedChanges} />

                        <SideBar jsString={model}
                            setJsString={setModel}
                            buscarEstruturaObjeto={buscarEstruturaObjeto}
                            structure={structure}
                            permission={permission}
                        />
                    </main>


                    {blocker.state === "blocked" &&
                        <UnsavedAlert blocker={blocker} />
                    }
                    <CollectionsFlow structure={structure} />
                </div>
            </StructureContext.Provider>
        </ReactFlowProvider>
    )
}