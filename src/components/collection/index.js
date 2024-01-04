import CollectionField from '../collection_field';
import './index.scss';

export default function Collection({ entity }) {
    return (
        <section className="collection">
            <header>
                <h2>{entity.entity}</h2>
            </header>

            <main>
                <CollectionField atributos={entity.attributes} collectionName={entity.entity} />
            </main>
        </section>
    )
}