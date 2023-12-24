import './index.scss';

export default function Collection({ data }) {
    return (
        <section className="collection">
            <header>
                <h2>{data.entity}</h2>
            </header>

            <CollectionCells atributos={data.attributes}/>

        </section>
    )

    function CollectionCells({ atributos }) {
        return atributos.map(prop => 
            <div className="collection-field">
                <div>
                    <div className="name">
                        <img src="/assets/images/simple_value.svg" alt="" />
                        <h3>{prop.name}</h3>
                    </div>

                    <div className="type">
                        <h4>{prop.type}</h4>
                    </div>
                </div>

                {prop.attributes && <CollectionCells atributos={prop.attributes}/>}
            </div>
        )    
    }
}