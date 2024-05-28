export default function validParams(params) {
  for (let param of params) {
    if(!param) {
      throw new Error("Missing field: " + param);
    }
  }

  return true;
}