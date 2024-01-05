import { useState } from "react";
import CollectionIcon from "../collection_icon";
import { typeFormat } from "../../api/generalFunctions";

export default function CollectionField({ atributos, collectionName, nestLevel }) {

    if (!nestLevel) nestLevel = 0;

    return atributos.map(prop =>
        <CollectionCell prop={prop} collectionName={collectionName} nestLevel={nestLevel} />
    )
}

function CollectionCell({ prop, collectionName, nestLevel }) {

    const [showAttributes, setShowAttributes] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div className="collection-field">

            <div style={{ paddingLeft: `${11 + 28 * nestLevel}px` }}
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
                        <button onClick={() => setShowAttributes(!showAttributes)}>
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

            {prop.attributes &&
                <div style={{ display: showAttributes ? 'flex' : 'none' }}>
                    <CollectionField atributos={prop.attributes}
                        collectionName={collectionName}
                        nestLevel={nestLevel + 1} />
                </div>
            }
        </div>
    )
}