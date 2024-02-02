import { useEffect, useState } from "react";
import CollectionIcon from "../collection_icon";
import { typeFormat } from "../../../../util/generalFunctions";

export default function CollectionField({ atributos, collectionName, nestLevel, allShow }) {

    if (!nestLevel) nestLevel = 0;

    return atributos.map(prop =>
        <CollectionCell prop={prop} collectionName={collectionName} nestLevel={nestLevel} allShow={allShow} />
    )
}

function CollectionCell({ prop, collectionName, nestLevel, allShow }) {

    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        setShowInfo(allShow);
    }, [allShow])

    return (
        <div className="collection-field">

            <div style={{ paddingLeft: `${11 + 28 * nestLevel}px` }}
                className={showInfo ? "description" : ''}
            >
                <div className="name">
                    <CollectionIcon prop={prop} />
                    <div>
                        <h3>{prop.name}</h3>
                        {prop.description &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>{prop.description}</p>
                        }

                        {prop.optional &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>Opcional</p>
                        }

                        {prop.example &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>Ex: {prop.example}</p>
                        }

                        {prop.references &&
                            <p style={{ display: showInfo ? 'flex' : 'none' }}>References to: '{prop.references}'</p>
                        }
                    </div>
                </div>

                <div className="type">
                    <h4>{typeFormat(prop.type)}</h4>

                    <button onClick={() => setShowInfo(!showInfo)}>
                        <img src={showInfo ?
                            '/assets/images/icons/arrow-down.svg' :
                            '/assets/images/icons/arrow-right.svg'
                        } alt="" />
                    </button>
                </div>
            </div>

            {prop.attributes && showInfo &&
                <CollectionField atributos={prop.attributes}
                    collectionName={collectionName}
                    nestLevel={nestLevel + 1} 
                    allShow={allShow}/>
            }
        </div>
    )
}