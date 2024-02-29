import { NodeToolbar, Position, useReactFlow } from 'reactflow';
import './index.scss';
import { useContext, useEffect, useState } from 'react';
import { updateShowAllNodes, updateShowAllStruct } from '../../../../util/react-flow/nodes/updateNodes';
import StructureContext from '../../../../util/react-flow/structure/context';

export default function Collection({ data }) {

    const [toolBarVisible, setToolBarVisible] = useState(false);
    const [showAll, setShowAll] = useState(false);

    const flow = useReactFlow();
    const {structure, setStructure} = useContext(StructureContext);

    useEffect(() => {
        setStructure(updateShowAllStruct(data.entity, showAll, structure));
        
        const nodes = flow.getNodes();
        flow.setNodes(updateShowAllNodes(data.id, showAll, nodes));
    }, [showAll])

    return (
        <section className="canvas-collection">
            <NodeToolbar position={Position.Top} isVisible={toolBarVisible} align='end'>
                <ul className='node-options'>
                    <button onClick={() => setShowAll(!showAll)}>
                        {showAll ?
                            'Hide all attributes' :
                            'Show all attributes'
                        }
                    </button>    
                </ul>
            </NodeToolbar>

            <header>
                <h2>{data.entity}</h2>
                <button onClick={() => setToolBarVisible(!toolBarVisible)}>
                    <img src="/assets/images/icons/menu.svg" alt="" />
                </button>
            </header>
        </section>
    )
}