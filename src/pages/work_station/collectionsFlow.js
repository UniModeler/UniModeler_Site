import { useEffect } from "react";
import ReactFlow, { Background, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css'
import Collection from "../../components/collection";
import { createCollectionNodes } from "../../api/structuresAPI";

const nodeTypes = {collection: Collection};

export default function CollectionsFlow({ structure }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    useEffect(() => {
      let nodes = createCollectionNodes(structure);

      console.log(nodes);
      setNodes(nodes);

    }, [structure])

    return (
        <ReactFlow nodes={nodes}
                   onNodesChange={onNodesChange} 
                   nodeTypes={nodeTypes}
                   fitView>
                    
            <Background variant='dots' gap={12} size={2} />
        </ReactFlow>
    )
}