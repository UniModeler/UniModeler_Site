import { useNavigate, useParams } from "react-router-dom";
import WorkSpace from "..";
import { useEffect, useState } from "react";
import { getProject, updateProject } from "../../../api/services/projectsAPI";
import callApi from "../../../api/callAPI";

export default function ProjectWorkspace() {

    let { id } = useParams();
    const [projectInfo, setProjectInfo] = useState();
    const [projectModel, setProjectModel] = useState();

    const navigate = useNavigate();

    async function getIt() {
        let data = await callApi(getProject, id);
        setProjectInfo(data);

        if(!data) {
            navigate('/workspace');
            return;
        }

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
        <WorkSpace projectInfo={projectInfo} model={projectModel} setModel={setProjectModel} />
    )
}