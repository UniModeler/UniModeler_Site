import api from "./apiURL";

export async function estruturaObjeto(jsString) {
    let resp = await api.post('/structure', { jsString: jsString });

    return resp.data;
}

export function createCollectionNodes(structure) {
    let nodes = [];
    let collectionCounter = 1;
    let fieldsCounter = 1;

    for (let entity of structure) {
        nodes.push({
            id: `collection_${entity.entity}`,
            position: { x: 300 * (collectionCounter - 2), y: 0 },
            type: 'collection',
            data: entity
        })
        
        createFieldNodes(entity.attributes, entity,`collection_${entity.entity}`)
        collectionCounter++;
    }

    return nodes;

    function createFieldNodes(attributes, entity, parentNode) {
        for (let attribute of attributes) {
            let id;

            if (attribute.key) {
                id = !attribute.references ?
                    `${entity.entity}_primary_key` :
                    `${entity.entity}_foreign_key_${attribute.references}`
            } else 
                id = String(fieldsCounter);

            nodes.push({
                id: id,
                type: 'default',
                position: {x: 0, y: fieldsCounter * 30},
                data: {label: fieldsCounter},
                parentNode: parentNode
            });

            fieldsCounter++;

            if (attribute.attributes) 
                createFieldNodes(attribute.attributes, entity, parentNode)
        }
    }
}