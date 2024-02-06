import { useParams } from "react-router-dom";
import WorkSpace from "./base";
import { useEffect, useState } from "react";
import { getProject, updateProject } from "../../api/services/projectsAPI";
import callApi from "../../api/callAPI";
import verifyProjectPermission from "../../util/verifyProjectPermission";
import toast from "react-hot-toast";
import { estruturaObjeto } from "../../api/services/structuresAPI";

import './index.scss'

export default function ProjectWorkspace() {

    let {id} = useParams();

    const [projectInfo, setProjectInfo] = useState();
    const [projectModel, setProjectModel] = useState();
    const [structure, setStructure] = useState();

    const [permission, setPermission] = useState();

    async function buscarEstruturaObjeto() {
        let struct = await callApi(estruturaObjeto, projectModel);
        setStructure(struct);
    }

    async function getIt() {
        let data = await callApi(getProject, id);
        let permission = verifyProjectPermission(data);

        if (permission === 'read') {
            toast(`Your permission in this project is to "read", so you can't change it.`)
        }

        setProjectInfo(data);
        setPermission(permission);
        setProjectModel(data.modeling.data);
        setStructure(await callApi(estruturaObjeto, data.modeling.data));
    }

    async function updateIt() {
        if (projectInfo && permission !== 'read') {
            let data = projectInfo;
            data.modeling.data = projectModel;

            await callApi(updateProject, projectInfo._id, data);
        }
    }

    useEffect(() => {
        getIt();
    }, []);

    useEffect(() => {
        updateIt();
    }, [projectModel])

    return (
        <WorkSpace projectInfo={projectInfo} 
                   model={projectModel} 
                   setModel={setProjectModel} 
                   structure={structure}
                   getStructure={buscarEstruturaObjeto}
                   permission={permission} />
    )
}