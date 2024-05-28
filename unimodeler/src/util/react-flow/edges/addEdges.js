import randomColor from "randomcolor";
import { MarkerType } from "reactflow";

const colors = [randomColor({ luminosity: 'light' })];
let index = 0;

export function addEdges(nodes) {
  let edges = [];
  index = 0;

  for (let node of nodes) {
    let color = colors[index];

    if (node.type === 'attribute' && node.data.key === 'foreign key') {
      let foreignKeyCollection = node.parentNode;

      let edge = newEdge(edges.length, node.data.references, node.id, color, foreignKeyCollection);
      edges.push(edge);

      index++;

    } else if (node.keysInside && node.data.nodeInfo.nestLevel === 0) {
      addEdgesKeysInside(edges, node.keysInside, node.id, color, node.parentNode);
      index++;
    }
  }

  return edges;
}

function addEdgesKeysInside(edges, keysInside, fatherId, color, foreignKeyCollection) {
  for (let key of keysInside) {
    edges.push(newEdge(edges.length, key.references, key.id, color, foreignKeyCollection));
    edges.push(newEdge(edges.length, key.references, fatherId, color, foreignKeyCollection));

    addParentAtributtesEdges(edges, key, color, foreignKeyCollection);
  }
}

function addParentAtributtesEdges(edges, key, color, foreignKeyCollection) {
  for (let parentAtributteId of key.parentAtributtes)
    edges.push(newEdge(edges.length, key.references, parentAtributteId, color, foreignKeyCollection));
}

function newEdge(counter, sourceId, target, color, foreignKeyCollection) {

  let newColor = randomColor({ luminosity: 'light' });
  colors.push(newColor);

  return {
    id: counter,
    source: `pk_${sourceId}`,
    target: target,
    targetHandle: 'left',
    sourceHandle: 'right',
    style: { strokeWidth: '3px', stroke: color },
    markerEnd: { type: MarkerType.ArrowClosed, color: color, width: 10, heigth: 10 },
    animated: true,
    type: 'smoothstep',
    foreignKeyCollection: foreignKeyCollection,
    primaryKeyCollection: `collection_${sourceId}`
  }
}