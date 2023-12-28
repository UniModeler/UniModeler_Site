import { useXarrow } from 'react-xarrows';
import CollectionCells from '../collection_cells';
import './index.scss';
import Draggable from 'react-draggable';

export default function Collection({ data }) {

    const updateXarrow = useXarrow();

    return (
        data.map(entity =>
            <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
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