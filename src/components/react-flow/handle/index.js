import { Handle, Position } from "reactflow";

export default function NodeHandle({attributes}) {
    return attributes.map(attribute => {
        if (attribute.key) 
            return (
                <>
                    <Handle id="left" position={Position.Left} type="source"/>
                    <Handle id="right" position={Position.Right} type="source"/>
                </>
            )
        else if (attribute.attributes && !attribute.nodeInfo.showInside) 
            return <NodeHandle attributes={attribute.attributes}/>
    })
}