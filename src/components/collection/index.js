import { Handle, Position } from 'reactflow';
import CollectionField from '../collection_field';
import './index.scss';

export default function Collection({ data }) {
    return (
        <section className="collection">
            <header>
                <h2>{data.entity}</h2>
            </header>

            <Handle type='target' id="right" position={Position.Right} />
            <Handle type='target' id="left" position={Position.Left} />
            <Handle type="source" position={Position.Top} />

            <main>
                <CollectionField atributos={data.attributes} collectionName={data.entity} />
            </main>
        </section>
    )
}