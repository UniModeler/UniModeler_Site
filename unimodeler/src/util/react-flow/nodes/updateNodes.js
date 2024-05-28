import { createCollectionNodes } from "./createNodes";
import { attributeHeight } from "./sizeConstants";

export function toogleShowInsideAttribute(structure, attribute, showInside, newHeight) {
  let struct = [...structure];
  let nodeCounter = 0;
  
  if(!newHeight)
    newHeight = attributeHeight;

  for (let entity of struct) {
    changeShowInside(entity.attributes, attribute);
  }

  return createCollectionNodes(struct);

  function changeShowInside(nodes, attribute) {
    for (let node of nodes) {
      node.nodeInfo.id = nodeCounter;
      nodeCounter++;

      if (node.nodeInfo.id === attribute.nodeInfo.id) {
        node.nodeInfo.height = newHeight;

        if (node.attributes) {
          node.nodeInfo.showInside = showInside;
          break;
        }

      } else if (node.attributes) {
        changeShowInside(node.attributes, attribute);
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

export function updateShowAllNodes(collectionId, showAll, nodes) {
  let newNodes = [...nodes];

  for (let node of newNodes) {
    if (node.parentNode === collectionId) {
      node.data = {
        ...node.data,
        nodeInfo: {
          ...node.data.nodeInfo,
          showAll: showAll
        }
      }
    }
  }

  return newNodes;
}

export function updateShowAllStruct(collectionName, showAll, structure) {
  let struct = [...structure];

  for(let collection of struct) {
    if(collection.entity === collectionName) {
      changeShowAll(collection.attributes, showAll);
    }
  }

  return struct;
}

function changeShowAll(attributes, showAll) {
  for(let attribute of attributes) {
    attribute.nodeInfo.showAll = showAll;

    if(attribute.attributes) 
      changeShowAll(attribute.attributes, showAll);
  }
}