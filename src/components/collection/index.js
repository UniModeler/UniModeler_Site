import CollectionField from '../collection_field';
import './index.scss';
import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';
import { useEffect, useRef, useState } from 'react';

export default function Collection({ entity }) {

    const [minHeight, setMinHeight] = useState();
    const [minWidth, setMinWidth] = useState();
    const [heightStyle, setHeightStyle] = useState({height: '100%'});
    const ref = useRef(null);

    const [draggable, setDraggable] = useState(true);

    const updateHeight = () => setHeightStyle({minHeight: '100%', height: 'auto'});

    useEffect(() => {
        setMinHeight(ref.current.offsetHeight);
        setMinWidth(ref.current.offsetWidth);

    }, [heightStyle]);

    return (
        <Draggable disabled={!draggable}>
            <Resizable minHeight={minHeight}
                       minWidth={minWidth} 
                       onResizeStart={() => setDraggable(false)}
                       onResizeStop={() => setDraggable(true)}>

                <section className="collection" ref={ref} style={heightStyle}>
                    <header>
                        <h2>{entity.entity}</h2>
                    </header>

                    <main>
                        <CollectionField atributos={entity.attributes} collectionName={entity.entity} updateHeight={updateHeight} />
                    </main>
                </section>
            </Resizable>
        </Draggable>
    )


}