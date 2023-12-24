import './index.scss';

export default function Collection({ data }) {
    return (
        <section className="collection">
            <header>
                <h2>{data.entity}</h2>
            </header>

            <CollectionCells atributos={data.attributes} />

        </section>
    )

    function CollectionCells({ atributos, numero }) {
        if(!numero) numero = 0;

        return atributos.map(prop => {

            let img = "/assets/images/icons/";

            if(prop.type === "array_object") {
                img = img + "array_object.svg";

            } else if (prop.type.includes("array")) {
                img = img + "array.svg";

            } else if (prop.type === "object") {
                img = img + "object.svg"

            } else {
                img = img + "simple_value.svg"
            }

            console.log(numero);

            return (
                <div className="collection-field">
                    <div>
                        <div className="name">
                            <img src={img} alt="" />
                            <h3>{prop.name}</h3>
                        </div>

                        <div className="type">
                            <h4>{prop.type}</h4>
                        </div>
                    </div>

                    {prop.attributes && <CollectionCells atributos={prop.attributes} numero={numero + 1}/>}
                </div>
            )
        }

        )
    }
}