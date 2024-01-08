import { Handle, NodeToolbar, Position } from 'reactflow';
import CollectionField from './collection_field';
import './index.scss';
import { useState } from 'react';

export default function Collection({ data }) {
    
    const [toolBarVisible, setToolBarVisible] = useState(false);
    const [allShow, setAllShow] = useState(false);
    
    return (
        <section className="canvas-collection">
            <NodeToolbar position={Position.Top} isVisible={toolBarVisible} align='end'>
                <button onClick={() => setAllShow(!allShow)}>
                    {allShow ?
                     'Hide all attributes' :
                     'Show all attributes'
                    }
                </button>
            </NodeToolbar>

            <header>
                <h2>{data.entity}</h2>
                <button onClick={() => setToolBarVisible(!toolBarVisible)}>
                    <img src="/assets/images/icons/menu.svg" alt="" />
                </button>
            </header>

            <Handle type='target' id="right" position={Position.Right} />
            <Handle type='target' id="left" position={Position.Left} />
            <Handle type="source" position={Position.Top} />

            <main>
                <CollectionField atributos={data.attributes} collectionName={data.entity} allShow={allShow}/>
            </main>
        </section>
    )
}