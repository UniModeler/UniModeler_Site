import toast from 'react-hot-toast';

export default async function callApi(callback, ...params) {
    try {
        let r = await callback(...params);

        return r;
    } catch (error) {
        if(error.response)
            toast.error(error.response.data.erro);
        else
            toast.error(error.message); 
    }
}