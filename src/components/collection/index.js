import CollectionField from '../collection_field';
import './index.scss';
import Draggable from 'react-draggable';

export default function Collection({ entity, enableZoom, disableZoom }) {

    return (
        <Draggable onStart={disableZoom}
                    onStop={enableZoom}>
                <section className="collection">
                    <header>
                        <h2>{entity.entity}</h2>
                    </header>

                    <main>
                        <CollectionField atributos={entity.attributes} collectionName={entity.entity} />
                    </main>
                </section>
        </Draggable>
    )


}