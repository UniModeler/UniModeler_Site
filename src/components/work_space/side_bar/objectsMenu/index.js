import useTranslations from "../../../../util/multiLanguage";
import CollectionInfo from "./collectionInfo";

import './index.scss';

export default function ObjectsMenu({ closeMenu, structure }) {

  const [translations] = useTranslations('sideBar');

  return (
    <section className="menu object-menu">
      <div className="title" onClick={closeMenu}>
        <div>
          <img src="/assets/images/icons/leaves.svg" alt="" />
          <h3>{translations.menus.objects.title}</h3>
        </div>

        <img src="/assets/images/icons/close-arrow.svg" alt="" />
      </div>

      <hr />

      {structure &&
        <div className="entities">
          <h4>{translations.menus.objects.entitiesTitle} ({structure.length})</h4>

          <div>
            {structure.map(collection =>
                <CollectionInfo infoCollection={collection}/>
            )}
          </div>
        </div>
      }
    </section>
  )
}