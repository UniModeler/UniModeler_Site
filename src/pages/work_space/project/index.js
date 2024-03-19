import { useNavigate, useParams } from "react-router-dom";
import WorkSpace from "../base";
import { useEffect, useState } from "react";
import { getProject } from "../../../api/services/projectsAPI";
import callApi from "../../../api/callAPI";
import toast from "react-hot-toast";

import { get } from "local-storage";

export default function ProjectWorkspace() {

  const navigate = useNavigate();

  let { id } = useParams();
  const [projectInfo, setProjectInfo] = useState();
  const [projectModel, setProjectModel] = useState();
  const [permission, setPermission] = useState();

  const [initialLoad, setInitialLoad] = useState(true);

  async function getIt() {
    setInitialLoad(true);
    
    let userId = get('user-login')?.user.id;
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