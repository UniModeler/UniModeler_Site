import Cabecalho from '../../../components/work_space/cabecalho';
import CollectionsFlow from '../../../components/react-flow/flow';
import ActionsBar from '../../../components/work_space/actions_bar';
import SideBar from '../../../components/work_space/side_bar';
import { ReactFlowProvider } from 'reactflow';
import ToasterContainer from '../../../components/toast';

export default function WorkSpace({ projectInfo, model, setModel, structure, getStructure, permission }) {
    return (
        <ReactFlowProvider>
            <div className="page workspace">

                <ToasterContainer />

                <main>
                    <Cabecalho projectInfo={projectInfo} permission={permission}/>
                    <ActionsBar projectInfo={projectInfo} />

                    <SideBar jsString={model}
                        setJsString={setModel}
                        buscarEstruturaObjeto={getStructure}
                        structure={structure}
                        permission={permission}
                    />
                </main>

                <CollectionsFlow structure={structure} />
            </div>
        </ReactFlowProvider>
    )
}