import toast from 'react-hot-toast';

export default async function callApi(callback, params) {
    try {
        let r = await callback(...params);

        return r;
    } catch (error) {
        toast.error(error.reponse.data.erro);
    }
}