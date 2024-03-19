import { useEffect } from "react";
import ReactFlow, { Background, useEdgesState, useNodesState, useUpdateNodeInternals } from "reactflow";
import 'reactflow/dist/style.css'

import Entity from "../nodes/collection";
import Attribute from "../nodes/attribute";

import { createCollectionNodes } from "../../../util/react-flow/nodes/createNodes";
import { updateCollectionPosition } from "../../../util/react-flow/nodes/updateNodes";
import { addEdges } from "../../../util/react-flow/edges/addEdges";

const nodeTypes = { collection: Entity, attribute: Attribute };

export default function CollectionsFlow({ structure }) {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const updateNodes = useUpdateNodeInternals();

  function changeNodesPosition(changes) {
    for (let change of changes) {
      if (change.type === 'position' && change.dragging) {
        let updatedNodes = updateCollectionPosition(change.id, structure, change.position);
        setNodes(updatedNodes);
      }
    }

    onNodesChange(changes);
  }

  useEffect(() => {
    if (structure) {
      let n = createCollectionNodes(structure);
      let e = addEdges(n);

      setNodes(n);
      setEdges(e);
      updateNodes();
    }
  }, [structure])

  return (
    <ReactFlow
      nodes={nodes}
      onNodesChange={changeNodesPosition}
      nodeTypes={nodeTypes}
      edges={edges}
      onEdgesChange={onEdgesChange}
      zoomOnDoubleClick={false}
      connectionMode="loose"

      style={{ background: '#333333' }}
    >

      <Background variant='dots' gap={12} size={5} color="#2F2A2A" />
    </ReactFlow>
  )
}