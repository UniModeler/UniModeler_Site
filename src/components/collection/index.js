import CollectionField from '../collection_field';
import './index.scss';

export default function Collection({ data }) {
    return (
        <section className="collection">
            <header>
                <h2>{data.entity}</h2>
            </header>

            <main>
                <CollectionField atributos={data.attributes} collectionName={data.entity} />
            </main>
        </section>
    )
}