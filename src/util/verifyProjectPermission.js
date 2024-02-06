import { get } from "local-storage"

export default function verifyProjectPermission(projectInfo) {
    let userId = get('user-login')._id;

    if (projectInfo?.userId === userId || !projectInfo?.userId) {
        return 'owner';
    }
    else {
        for(let collaborator of projectInfo?.share.collaborators) {
            if(collaborator.userId === userId) {
                return collaborator.permission;
            }
        }
    }
}