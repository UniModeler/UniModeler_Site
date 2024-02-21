import { useContext, useEffect, useState, useRef } from "react";
import CollectionIcon from "../attribute_icon";
import { typeFormat } from "../../../../util/typeFormat";

import './index.scss';
import { toogleShowInsideAttribute } from "../../../../util/react-flow/nodes/updateNodes";
import GetStructureContext from "../../../../util/react-flow/structure/context";
import { Handle, Position, useReactFlow, useUpdateNodeInternals } from "reactflow";
import { updateEdges } from "../../../../util/react-flow/edges/addEdges";
import NodeHandle from "../../handle";

export default function Attribute({ data }) {

    const heightRef = useRef(null);

    const [showInfo, setShowInfo] = useState(false);
    const [height, setHeight] = useState(0);

    const structure = useContext(GetStructureContext);
    const setNodes = useReactFlow().setNodes;
    const setEdges = useReactFlow().setEdges;

    const resetInternal = useUpdateNodeInternals();

    function handleShowInfo() {
        let show = !showInfo;
        setShowInfo(show);
    }

    useEffect(() => {
        setShowInfo(data.allShow);
    }, [data]);

    useEffect(() => {
        setHeight(heightRef.current.clientHeight);
    }, [showInfo]);

    useEffect(() => {
        let newNodes = toogleShowInsideAttribute(structure, data, showInfo, height);

        setNodes(newNodes);

        resetInternal(data.nodeInfo.id);
    }, [height]);

    return (
        <div className="collection-field" ref={heightRef}>

            <NodeHandle attributes={[data]}/>
           
            <div style={{ paddingLeft: `${11 + 28 * data.nodeInfo.nestLevel}px` }}
                className={showInfo ? "description" : ''}
            >
                <div className="name">
                    <CollectionIcon prop={data} />
                    <div>
                        <h3>{data.name}</h3>
                        {data.description &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>{data.description}</p>
                        }

                        {data.optional &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>Opcional</p>
                        }

                        {data.example &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>Ex: {data.example}</p>
                        }

                        {data.references &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>References to: '{data.references}'</p>
                        }
                    </div>
                </div>

                <div className="type">
                    <h4>{typeFormat(data.type)}</h4>

                    <button onClick={handleShowInfo}>
                        <img src={showInfo ?
                            '/assets/images/icons/arrow-down.svg' :
                            '/assets/images/icons/arrow-right.svg'
                        } alt="" />
                    </button>
                </div>
            </div>
        </div>
    )
}