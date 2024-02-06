export default function validParams(params) {
    for (let param of params) {
        if(!param) {
            console.log('a');
            throw new Error("Missing field: " + param);
        }
    }

    return true;
}