import { useEffect } from "react";
import ReactFlow, { Background, ReactFlowProvider, useEdgesState, useNodesState } from "reactflow";
import 'reactflow/dist/style.css'
import Collection from "../../components/collection";
import { createCollectionNodes, createEdges } from "../../api/structuresAPI";
import DownloadButton from "../../components/downloadButton";

const nodeTypes = {collection: Collection};

export default function CollectionsFlow({ structure }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    useEffect(() => {
      let nodes = createCollectionNodes(structure);
      let edges = createEdges(structure);  

      console.log(edges);

      setNodes(nodes);
      setEdges(edges)

    }, [structure])

    return (
        <ReactFlowProvider>
            <ReactFlow 
                    nodes={nodes}
                    onNodesChange={onNodesChange} 
                    nodeTypes={nodeTypes}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    fitView
                >
                        
                <Background variant='dots' gap={12} size={2} />
                <DownloadButton />
            </ReactFlow>    
        </ReactFlowProvider>
    )
}