import { useState } from "react";
import CollectionIcon from "../collection_icon";
import Arrow from "./arrow";
import { typeFormat } from "../../api/generalFunctions";
import { useXarrow } from "react-xarrows";

export default function CollectionField({ atributos, collectionName, nestLevel }) {

    if (!nestLevel) nestLevel = 0;

    return atributos.map(prop =>
        <CollectionCell prop={prop} collectionName={collectionName} nestLevel={nestLevel} />
    )
}

function CollectionCell({ prop, collectionName, nestLevel }) {

    const [showAttributes, setShowAttributes] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const updateXarrow = useXarrow();

    return (
        <div className="collection-field">

            <div style={{ paddingLeft: `${11 + 28 * nestLevel}px` }}
                 id={prop.key && `${collectionName}_${prop.name}`}
                 className={showDescription && "description"}
            >
                <div className="name">
                    <CollectionIcon prop={prop} />
                    <div>
                        <h3>{prop.name}</h3>
                        {prop.description &&
                            <p style={{ display: showDescription ? 'flex' : 'none' }}>{prop.description}</p>
                        }
                    </div>
                    {prop.description && <img src="/assets/images/question-circle.svg" onClick={() => setShowDescription(!showDescription)} alt="" className="desc-icon" />}
                </div>

                <div className="type">
                    {prop.attributes &&
                        <button onClick={() => { setShowAttributes(!showAttributes); updateXarrow(); }}>
                            <img src={showAttributes ?
                                '/assets/images/arrow-down.svg' :
                                '/assets/images/arrow-right.svg'
                            } alt="" />
                        </button>
                    }

                    <h4>{typeFormat(prop.type)}</h4>
                    {prop.optional && <span>OPT</span>}
                </div>
            </div>

            {prop.key === 'foreign key' &&
                <Arrow prop={prop} collectionName={collectionName} />
            }

            {prop.attributes && showAttributes && <CollectionField atributos={prop.attributes} collectionName={collectionName} nestLevel={nestLevel + 1} />}
        </div>
    )
}