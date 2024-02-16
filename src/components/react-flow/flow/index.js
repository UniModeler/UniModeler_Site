import { useEffect } from "react";
import ReactFlow, { Background, useEdgesState, useNodesState, useUpdateNodeInternals } from "reactflow";
import 'reactflow/dist/style.css'

import Entity from "../nodes/collection";
import Attribute from "../nodes/attribute";

import { createCollectionNodes, createEdges } from "../../../util/react-flow/workspace-nodes/createNodes";

const nodeTypes = { collection: Entity, attribute: Attribute };

export default function CollectionsFlow({ structure }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const updateNodes = useUpdateNodeInternals();

    useEffect(() => {
        if (structure) {
            let n = createCollectionNodes(structure);
            let e = createEdges(structure);

            setNodes(n);
            setEdges(e);
            updateNodes();
        }
    }, [structure])

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            zoomOnDoubleClick={false}

            style={{ background: '#333333' }}
        >

            <Background variant='dots' gap={12} size={5} color="#2F2A2A" />
        </ReactFlow>
    )
}