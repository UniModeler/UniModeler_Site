import './index.scss';

import Cabecalho from '../../../components/work_space/cabecalho';
import CollectionsFlow from '../../../components/react-flow/flow';
import ActionsBar from '../../../components/work_space/actions_bar';
import SideBar from '../../../components/work_space/side_bar';
import { ReactFlowProvider } from 'reactflow';
import ToasterContainer from '../../../components/toast';

import StructureContext from '../../../util/react-flow/structure/context';
import callApi from '../../../api/callAPI';
import { estruturaObjeto } from '../../../api/services/structuresAPI';
import { useEffect, useState } from 'react';
import { giveNodeInfo } from '../../../util/react-flow/nodes/createNodes';

import { useAutosave } from 'react-autosave';
import { updateProject } from '../../../api/services/projectsAPI';

export default function WorkSpace({ projectInfo, model, setModel, permission, initialLoad, setInitialLoad }) {

  const [structure, setStructure] = useState();
  const [autoSaving, setAutoSaving] = useState(true);

  async function buscarEstruturaObjeto() {
    let struct = await callApi(estruturaObjeto, model);

    if (struct)
      setStructure(giveNodeInfo(struct));
  }

  async function autoSaveProject(newModel) {
    await callApi(async () => {
      let response = await updateProject(projectInfo.id, newModel);
      if (!response.modifiedCount && autoSaving) {
        setAutoSaving(false);
        throw new Error("Projeto não salvo. Verifique a sua rede.")
      }

      if (response.modifiedCount)
        setAutoSaving(true);
    });
  }

  useEffect(() => {
    if (initialLoad) {
      buscarEstruturaObjeto();
      setInitialLoad(false);
    }
  }, [model])

  useAutosave({
    data: model,
    onSave: (newModel) => {if(projectInfo) autoSaveProject(newModel)},
  }
  )

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