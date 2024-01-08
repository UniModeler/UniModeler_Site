import CollectionInfo from "./collectionInfo";

export default function ObjectsMenu({ closeMenu, structure }) {
    return (
        <section className="menu object-menu">
            <div className="title" onClick={closeMenu}>
                <div>
                    <img src="/assets/images/icons/leaves.svg" alt="" />
                    <h3>Objects</h3>
                </div>

                <img src="/assets/images/icons/pin.svg" alt="" />
            </div>

            <hr />

            {structure &&
                <div className="entities">
                    <h4>Entities ({structure.length})</h4>

                    <div>
                        {structure.map(collection =>
                            <> 
                                <CollectionInfo infoCollection={collection} />
                                <hr />
                            </>
                        )}
                    </div>
                </div>
            }
        </section>
    )
}