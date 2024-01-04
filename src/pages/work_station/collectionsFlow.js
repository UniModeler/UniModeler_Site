import { useEffect } from "react";
import ReactFlow, { Background, useNodesState, useReactFlow } from "reactflow";
import 'reactflow/dist/style.css'
import Collection from "../../components/collection";

const nodeTypes = {collectionNode: Collection};

export default function CollectionsFlow({ structure }) {

    const [nodes, setNodes, onNodesChange] = useNodesState([]);

    useEffect(() => {
      let nodes = [];
      let id = 1;

      structure.forEach(entity => {
        nodes.push({
            id: String(id),
            position: {x: 300 * (id - 2), y: 0},
            type: 'collectionNode',
            data: entity
        })

        id++;
      });      

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