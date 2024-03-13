import { useParams } from "react-router-dom";
import WorkSpace from "../base";
import { useEffect, useState } from "react";
import callApi from "../../../api/callAPI";
import toast from "react-hot-toast";
import { get } from "local-storage";
import { getSharedLink } from "../../../api/services/shareProjectAPI";

export default function SharedLinkWorkspace() {

    let { code } = useParams();
    const [projectInfo, setProjectInfo] = useState();
    const [projectModel, setProjectModel] = useState();
    const [permission, setPermission] = useState();

    const [initialLoad, setInitialLoad] = useState(true);

    async function getIt() {
        setInitialLoad(true);

        let userId = get('user-login')?.user.id;
        let data = await callApi(getSharedLink, code, userId);
        let permission = data.permission;

        if (permission === 'read') {
            toast(`This link is read-only, so you cannot make any change.`, { duration: 8000 })
        }

        setProjectInfo(data);
        setPermission(permission);
        setProjectModel(data.modeling.data);
    }

    useEffect(() => {
        getIt();
    }, []);

    return (
        <WorkSpace projectInfo={projectInfo}
            model={projectModel}
            setModel={setProjectModel}
            permission={permission}

            initialLoad={initialLoad}
            setInitialLoad={setInitialLoad}
        />
    )
}