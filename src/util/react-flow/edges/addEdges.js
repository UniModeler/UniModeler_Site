import randomColor from "randomcolor";
import { MarkerType } from "reactflow";

export function addEdges(nodes) {
    let edges = [];

    for (let node of nodes) {
        let color = randomColor({ luminosity: 'bright' });

        if (node.type === 'attribute' && node.data.key === 'foreign key') {
            let edge = newEdge(edges.length, node.id, node.data.references, color);
            edges.push(edge);

        } else if (node.keysInside) {
            addEdgesKeysInside(edges, node.keysInside, color, node.id);
        }
    }

    return edges;
}

function addEdgesKeysInside(edges, keysInside, color, fatherId) {
    for (let key of keysInside) {
        if(key.type === 'foreign key') {
            edges.push(newEdge(edges.length, key.references, key.key, color));
            edges.push(newEdge(edges.length, key.references, fatherId, color));
        }
    }
}

function newEdge(counter, sourceId, target, color) {
    return {
        id: counter,
        source: `pk_${sourceId}`,
        target: target,
        targetHandle: 'left',
        sourceHandle: 'right',
        style: { strokeWidth: '3px', stroke: color },
        markerEnd: { type: MarkerType.ArrowClosed, color: color, width: 10, heigth: 10 },
        animated: true,
        type: 'smoothstep'
    }
}