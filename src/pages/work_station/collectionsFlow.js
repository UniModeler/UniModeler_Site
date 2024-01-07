import { useEffect } from "react";
import ReactFlow, { Background, ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css'
import Collection from "../../components/collection";
import { createCollectionNodes, createEdges } from "../../api/structuresAPI";
import DownloadButton from "../../components/downloadButton";

const nodeTypes = { collection: Collection };

export default function CollectionsFlow({ structure }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
        if (structure) {
            let nodes = createCollectionNodes(structure);
            let edges = createEdges(structure);

            setNodes(nodes);
            setEdges(edges);
        }
    }, [structure])

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            nodeTypes={nodeTypes}
            edges={edges}
            onEdgesChange={onEdgesChange}
            fitView
            style={{ background: '#333333' }}
        >

            <Background variant='dots' gap={12} size={5} color="#2F2A2A" />
            <DownloadButton />
        </ReactFlow>
    )
}