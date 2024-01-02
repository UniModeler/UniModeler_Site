import CollectionCells from '../collection_field';
import './index.scss';
import Draggable from 'react-draggable';

export default function Collection({ data }) {

    return (
        data.map(entity =>
            <Draggable bounds='parent'>
                <section className="collection">
                    <header>
                        <h2>{entity.entity}</h2>
                    </header>

                    <CollectionCells atributos={entity.attributes} collectionName={entity.entity} />

                </section>
            </Draggable>
        )
    )


}