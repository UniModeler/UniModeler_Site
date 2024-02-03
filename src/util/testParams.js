import toast from "react-hot-toast";

export default function validParams(...params) {
    for (const param of params) {
        if(!param) {
            toast.error("Missing field: " + param);
        }

        return false;
    }

    return true;
}