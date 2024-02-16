import { NodeToolbar, Position } from 'reactflow';
import './index.scss';
import { useState } from 'react';

export default function Collection({ data }) {

    const [toolBarVisible, setToolBarVisible] = useState(false);
    const [allShow, setAllShow] = useState(false);

    return (
        <section className="canvas-collection">
            <NodeToolbar position={Position.Top} isVisible={toolBarVisible} align='end'>
                <ul className='node-options'>
                    <button onClick={() => setAllShow(!allShow)}>
                        {allShow ?
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