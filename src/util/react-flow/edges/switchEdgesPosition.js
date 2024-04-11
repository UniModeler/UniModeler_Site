export default function switchEdgesPosition(nodes, edges, collectionId) {
  let newEdges = [...edges];

  let collection = nodes.find(node => node.id === collectionId);
  let collectionEdges = newEdges.filter(edge => 
    edge.primaryKeyCollection === collectionId || edge.foreignKeyCollection === collectionId
  );

  for(let edge of collectionEdges) {
    let immobileCollectionId;
    let immobileTip;
    let mobileTip;

    if(edge.primaryKeyCollection === collectionId) {
      immobileCollectionId = edge.foreignKeyCollection;
      immobileTip = "targetHandle"; 
      mobileTip = "sourceHandle";
    }
    else {
      immobileCollectionId = edge.primaryKeyCollection;
      immobileTip = "sourceHandle";
      mobileTip = "targetHandle";
    }

    let immobileCollection = nodes.find(node => node.id === immobileCollectionId);

    if(immobileCollection.position.x > collection.position.x) {
      edge[immobileTip] = "left";
      edge[mobileTip] = "left"
    }
      
    else if(immobileCollection.position.x < collection.position.x + 400) {
      edge[immobileTip] = "right";
      edge[mobileTip] = "right";
    }

    if(collection.position.x + 400 < immobileCollection.position.x)
      edge[mobileTip] = "right";
    else if(collection.position.x > immobileCollection.position.x + 400) 
      edge[mobileTip] = "left";
  }

  return newEdges;
}