import { useNavigate, useParams } from "react-router-dom";
import WorkSpace from "../base";
import { useEffect, useState } from "react";
import { getProject } from "../../../api/services/projectsAPI";
import callApi from "../../../api/callAPI";
import toast from "react-hot-toast";
import { estruturaObjeto } from "../../../api/services/structuresAPI";

import { giveNodeInfo } from "../../../util/react-flow/nodes/createNodes";
import { get } from "local-storage";

export default function ProjectWorkspace() {

    const navigate = useNavigate();

    let { id } = useParams();
    const [projectInfo, setProjectInfo] = useState();
    const [projectModel, setProjectModel] = useState();
    const [structure, setStructure] = useState();

    const [permission, setPermission] = useState();

    async function buscarEstruturaObjeto() {
        let struct = await callApi(estruturaObjeto, projectModel);
        setStructure(giveNodeInfo(struct));
    }

    async function getIt() {
        let userId = get('user-login')?._id;
        let data = await callApi(getProject, id, userId);
        let permission = data?.permission;

        if (!permission) {
            navigate(-1);
        }

        if (permission === 'read') {
            toast(`Your permission in this project is to "read", so you can't change it.`)
        }

        setProjectInfo(data);
        setPermission(permission);
        setProjectModel(data.modeling.data);

        let struct = await callApi(estruturaObjeto, data.modeling.data);
        setStructure(giveNodeInfo(struct));
    }

    useEffect(() => {
        getIt();
    }, []);

    return (
        <WorkSpace projectInfo={projectInfo}
            model={projectModel}
            setModel={setProjectModel}
            structure={structure}
            setStructure={setStructure}
            buscarEstruturaObjeto={buscarEstruturaObjeto}
            permission={permission} />
    )
}