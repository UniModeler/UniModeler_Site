import CollectionIcon from "../collection_icon";
import Arrow from "./arrow";

export default function CollectionCells({ atributos, collectionName, nestLevel }) {
    
    if (!nestLevel) nestLevel = 0;

    function typeFormat(type) {
        if(type.includes('array_')) {
            type = type.replace('array_', '');

            type = `array <${type}>`;
        }

        return type;
    }

    return atributos.map(prop =>

        <div className="collection-field"
            id={prop.key && `${collectionName}_${prop.name}`}
        >
            <div style={{ paddingLeft: `${11 + 28 * nestLevel}px`}}>
                <div className="name">
                    <CollectionIcon prop={prop} />
                    <h3>{prop.name}</h3>
                </div>

                <div className="type">
                    <h4>{typeFormat(prop.type)}</h4>
                    {prop.optional && <span>OPT</span>}
                </div>
            </div>

            {prop.key === 'foreign key' &&
                <Arrow prop={prop} collectionName={collectionName} />
            }

            {prop.attributes && <CollectionCells atributos={prop.attributes} collectionName={collectionName} nestLevel={nestLevel + 1} />}
        </div>
    )
}

