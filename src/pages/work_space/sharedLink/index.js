import { useParams } from "react-router-dom";
import WorkSpace from "../base";
import { useEffect, useState } from "react";
import callApi from "../../../api/callAPI";
import toast from "react-hot-toast";
import { estruturaObjeto } from "../../../api/services/structuresAPI";

import { giveNodeInfo } from "../../../util/react-flow/nodes/createNodes";
import { get } from "local-storage";
import { getSharedLink } from "../../../api/services/shareProjectAPI";

export default function SharedLinkWorkspace() {

    let { code } = useParams();
    const [projectInfo, setProjectInfo] = useState();
    const [projectModel, setProjectModel] = useState();
    const [structure, setStructure] = useState();
    const [permission, setPermission] = useState();

    async function buscarEstruturaObjeto() {
        let struct = await callApi(estruturaObjeto, projectModel);
        setStructure(giveNodeInfo(struct));
    }

    async function getIt() {
        let userId = get('user-login')?.user.id;
        let data = await callApi(getSharedLink, code, userId);
        let permission = data.permission;

        if (permission === 'read') {
            toast(`This link is read-only, so you cannot make any change.`, { duration: 8000 })
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