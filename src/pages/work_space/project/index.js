import { useParams } from "react-router-dom";
import WorkSpace from "..";
import { getSharedLink } from "../../../api/services/sharedLinksAPI";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { getProject, updateProject } from "../../../api/services/projectsAPI";
import callApi from "../../../api/callAPI";
import Timer from "../../../util/timer";

export default function ProjectWorkspace() {

    let { id } = useParams();
    const [projectInfo, setProjectInfo] = useState();
    const [projectModel, setProjectModel] = useState();

    async function getIt() {
        let data = await callApi(getProject, [id]);
        setProjectInfo(data);

        if (data.modeling.data) {
            setProjectModel(data.modeling.data);
        } else {
            setProjectModel(' ');
        }
    }

    async function updateIt() {
        if (projectInfo) {
            let data = projectInfo;
            data.modeling.data = projectModel;

            await callApi(updateProject, [projectInfo._id, data]);
        }
    }

    useEffect(() => {
        getIt();
        
    }, []);

    useEffect(() => {
        updateIt();
    }, [projectModel])

    return (
        <WorkSpace projectInfo={projectInfo} model={projectModel} setModel={setProjectModel} />
    )
}