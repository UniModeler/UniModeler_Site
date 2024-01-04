import api from "./apiURL";

export async function estruturaObjeto(jsString) {
    let resp = await api.post('/structure', { jsString: jsString });

    return resp.data;
}

export function createCollectionNodes(structure) {
    let nodes = [];
    let counter = 1;

    for (let entity of structure) {
        nodes.push({
            id: `collection_${entity.entity}`,
            position: { x: 300 * (counter - 2), y: 0 },
            type: 'collection',
            data: entity
        })

        counter++;
    }

    return nodes;
}

function createKeyNodes(attributes) {

}
