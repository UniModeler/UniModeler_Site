import { MarkerType } from "reactflow";
import api from "./apiURL";
import randomColor from 'randomcolor';

export async function estruturaObjeto(jsString) {
    let resp = await api.post('/structure', { jsString: jsString });

    return resp.data;
}

export function createCollectionNodes(structure) {
    let nodes = [];
    let collectionCounter = 1;

    for (let entity of structure) {
        nodes.push({
            id: `collection_${entity.entity}`,
            position: { x: 300 * (collectionCounter - 2), y: 0 },
            type: 'collection',
            data: entity
        })

        collectionCounter++;
    }

    return nodes;
}

export function createEdges(structure) {
    let edges = [];

    for (let collection of structure) {
        exploreAttributes(collection.attributes, collection.entity);
    }

    return edges;

    function exploreAttributes(attributes, collectionName) {
        for (let prop of attributes) {
            if (prop.references) {
                let color = randomColor({luminosity: 'light'});

                edges.push({
                    id: `${prop.references}-->${collectionName}_${prop.name}`,
                    source: `collection_${prop.references}`,
                    target: `collection_${collectionName}`,
                    targetHandle: Math.random().toFixed(0) === '1' ? 'left' : 'right',
                    style: { strokeWidth: '7px', stroke: color }, 
                    markerEnd: { type: MarkerType.ArrowClosed, color: color, width: 20, heigth: 20 },
                    animated: true,
                    type: 'smoothstep'
                })
            }
                
            if (prop.attributes)
                exploreAttributes(prop.attributes, collectionName)
        }
    }
}

