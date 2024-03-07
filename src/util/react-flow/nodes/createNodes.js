import { collectionTitleHeight, attributeHeight } from "./sizeConstants";

export function createCollectionNodes(structure) {
    let nodes = [];

    for (let entity of structure) {
        nodes.push({
            id: entity.id,
            position: entity.position,
            type: 'collection',
            data: entity,
            width: 400,
            style: { width: '100%', maxWidth: 400 },
            height: 200
        });

        nodes.push(
            ...createAttributesNodes(entity.attributes, entity.entity)
        );
    }

    return nodes;
}

function createAttributesNodes(attributes, collectionName, positionObject) {
    let nodes = [];

    if (!positionObject)
        positionObject = { y: collectionTitleHeight };

    for (let attribute of attributes) {

        let keysInside;
        if (attribute.attributes)
            keysInside = findKeys(attribute.attributes);

        let primaryKey = attribute.key === 'primary key';

        nodes.push({
            id: primaryKey ? `pk_${collectionName}` : attribute.nodeInfo.id,
            type: 'attribute',
            data: attribute,
            position: { x: 0, y: positionObject.y },
            parentNode: `collection_${collectionName}`,
            height: attribute.nodeInfo.height,
            width: 400,
            style: { width: '100%', maxWidth: 400 },
            draggable: false,
            keysInside: keysInside
        });

        positionObject.y += attribute.nodeInfo.height;

        if (attribute.nodeInfo.showInside) {
            nodes.push(...createAttributesNodes(attribute.attributes, collectionName, positionObject));
        }
    }

    return nodes;
}

function findKeys(attributes, parentAtributtes) {
    let keys = [];

    if(!parentAtributtes)
        parentAtributtes = [];

    for (let attribute of attributes) {
        if (attribute.key === 'foreign key') {
            keys.push({
                id: attribute.nodeInfo.id,
                type: 'foreign key',
                references: attribute.references,
                parentAtributtes: parentAtributtes
            });
        }

        else if (attribute.attributes) {
            parentAtributtes.push(attribute.nodeInfo.id);
            keys.push(...findKeys(attribute.attributes, parentAtributtes));
        }
    }

    return keys;
}

export function giveNodeInfo(structure) {
    let nodeStructure = [...structure];

    let collectionCounter = 0;
    let nodeCounter = 0;

    for (let entity of nodeStructure) {
        entity.position = { x: 450 * (collectionCounter++), y: 0 };
        entity.id = `collection_${entity.entity}`;
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