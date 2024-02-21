import { createCollectionNodes } from "./createNodes";

export function toogleShowInsideAttribute(structure, attribute, showInside, newHeight) {
    let struct = [...structure];
    let nodeCounter = 0;

    for (let entity of struct) {
        changeShowInside(entity.attributes, attribute.nodeInfo.id);
    }

    return createCollectionNodes(struct);

    function changeShowInside(nodes, id) {
        for (let node of nodes) {
            node.nodeInfo.id = nodeCounter;
            nodeCounter++;

            if (node.nodeInfo.id === id) {
                node.nodeInfo.height = newHeight;

                if (node.attributes) {
                    node.nodeInfo.showInside = showInside;
                    break;
                }

            } else if (node.attributes) {
                changeShowInside(node.attributes, id);
            }
        }
    }
}

export function updateCollectionPosition(idCollection, structure, newPosition) {

    let struct = [...structure];

    for (let entity of struct) {

        if (entity.id === idCollection)
            entity.position = newPosition;
    }

    return createCollectionNodes(struct);
}