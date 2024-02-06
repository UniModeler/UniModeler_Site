import { useNavigate, useParams } from "react-router-dom";
import { getSharedLink } from "../../../api/services/sharedLinksAPI";
import { useEffect } from "react";
import toast from "react-hot-toast";
import callApi from "../../../api/callAPI";
import { createProject } from "../../../api/services/projectsAPI";
import { get } from "local-storage";

export default function SharedLink() {

    let { code } = useParams();
    const navigate = useNavigate();

    async function buscarSharedLink() {
        if (code) {
            let linkData = await callApi(getSharedLink, code);
            let userInfo = get('user-login');
            let newProject = await callApi(createProject, userInfo?._id, linkData.info.name + ' Copy', linkData.modeling.data);

            navigate('/workspace/project/' + newProject._id);

            setTimeout(() =>
                toast("You are editing a copy of this project. Any changes here won't affect the original one."),
                2000)
        }
    }

    useEffect(() => {
        buscarSharedLink();
    }, []);

    return (
        <></>
    )
}