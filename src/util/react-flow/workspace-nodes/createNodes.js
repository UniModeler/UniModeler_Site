import randomColor from "randomcolor";
import { MarkerType } from "reactflow";
import { collectionTitleHeight, attributeHeight } from "./sizeConstants";

export function createCollectionNodes(structure) {
    let nodes = [];
    let collectionCounter = 0;

    for (let entity of structure) {
        nodes.push({
            id: `collection_${entity.entity}`,
            position: { x: 300 * (collectionCounter), y: 0 },
            type: 'collection',
            data: entity,
            width: 1,
            style: {width: '100%', maxWidth: 500},
            height: 200
        });

        nodes.push(
            ...createAttributesNodes(entity.attributes, entity.entity)
        );

        collectionCounter++;
    }

    return nodes;
}

function createAttributesNodes(attributes, collectionName, positionObject) {
    let nodes = [];

    if(!positionObject)
        positionObject = {y: collectionTitleHeight};

    for (let attribute of attributes) {
        nodes.push({
            id: attribute.nodeInfo.id,
            type: 'attribute',
            data: attribute,
            position: {x: 0, y: positionObject.y},
            parentNode: `collection_${collectionName}`,
            height: attribute.nodeInfo.height,
            width: 1,
            style: {width: '100%', maxWidth: 500},
            draggable: false
        });

        positionObject.y += attribute.nodeInfo.height;

        if (attribute.nodeInfo.showInside) {
            nodes.push(...createAttributesNodes(attribute.attributes, collectionName, positionObject));
        }
    }

    return nodes;
}

export function giveNodeInfo(structure) {
    let nodeStructure = [...structure];
    let nodeCounter = 0;

    for (let entity of nodeStructure) {
        exploreAttributes(entity);
    }

    return nodeStructure;

    function exploreAttributes(entity, nestLevel) {
        if (!nestLevel)
            nestLevel = 0;

        for (let attribute of entity.attributes) {
            let nodeInfo = {};

            nodeInfo.height = attributeHeight;

            nodeInfo.showAll = false;

            nodeInfo.nestLevel = nestLevel;

            nodeInfo.id = nodeCounter;
            nodeCounter++;

            if (attribute.attributes) {
                nodeInfo.showInside = false;
                exploreAttributes(attribute, nestLevel + 1);
            }

            attribute.nodeInfo = { ...nodeInfo, ...attribute.nodeInfo };
        }
    }
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
                let color = randomColor({ luminosity: 'light' });

                edges.push({
                    id: `${prop.references}-->${collectionName}_${prop.name}`,
                    source: `collection_${prop.references}`,
                    target: `collection_${collectionName}`,
                    targetHandle: Math.random().toFixed(0) === '1' ? 'left' : 'right',
                    style: { strokeWidth: '3px', stroke: color },
                    markerEnd: { type: MarkerType.ArrowClosed, color: color, width: 10, heigth: 10 },
                    animated: true,
                    type: 'smoothstep'
                })
            }

            if (prop.attributes)
                exploreAttributes(prop.attributes, collectionName)
        }
    }
}