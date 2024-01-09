import useTranslations from "../../../api/multiLanguage";
import CollectionInfo from "./collectionInfo";

export default function ObjectsMenu({ closeMenu, structure }) {

    const translations = useTranslations('sideBar');

    return (
        <section className="menu object-menu">
            <div className="title" onClick={closeMenu}>
                <div>
                    <img src="/assets/images/icons/leaves.svg" alt="" />
                    <h3>{translations.tituloObjetos}</h3>
                </div>

                <img src="/assets/images/icons/pin.svg" alt="" />
            </div>

            <hr />

            {structure &&
                <div className="entities">
                    <h4>{translations.entidades} ({structure.length})</h4>

                    <div>
                        {structure.map(collection =>
                            <> 
                                <CollectionInfo infoCollection={collection}/>
                                <hr />
                            </>
                        )}
                    </div>
                </div>
            }
        </section>
    )
}