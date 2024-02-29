import Cabecalho from '../../../components/work_space/cabecalho';
import CollectionsFlow from '../../../components/react-flow/flow';
import ActionsBar from '../../../components/work_space/actions_bar';
import SideBar from '../../../components/work_space/side_bar';
import { ReactFlowProvider } from 'reactflow';
import ToasterContainer from '../../../components/toast';

import './index.scss';
import StructureContext from '../../../util/react-flow/structure/context';

export default function WorkSpace({ projectInfo, model, setModel, structure, setStructure, buscarEstruturaObjeto, permission }) {
    return (
        <ReactFlowProvider>
            <StructureContext.Provider value={{structure: structure, setStructure: setStructure}}>
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