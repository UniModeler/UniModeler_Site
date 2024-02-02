import { useParams } from "react-router-dom";
import WorkSpace from "..";
import { getSharedLink } from "../../../api/services/sharedLinksAPI";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SharedLinkWorkspace() {

    let { code } = useParams();
    const [sharedModel, setSharedModel] = useState(' ');

    async function buscarSharedLink() {
        if (code) {
            try {
                let linkData = await getSharedLink(code);
                setSharedModel(linkData.jsonModel);

            } catch (error) {
                toast.error(error.response.data.erro);
            }
        }
    }

    useEffect(() => {
        buscarSharedLink();
    }, []);

    return (
        <WorkSpace model={sharedModel} setModel={setSharedModel}/>
    )
}