import Editor from '@monaco-editor/react';
import useTranslations from '../../../../util/multiLanguage';

import './index.scss';

export default function StructureMenu({jsString, setJsString, buscarEstruturaObjeto, closeMenu}) {

    const [translations] = useTranslations('sideBar');

    return (
        <section className="menu structure-menu">
            <div className="title" onClick={closeMenu}>
                <div>
                    <img src="/assets/images/icons/keys.svg" alt="" />
                    <h3>{translations.menus.structure.title}</h3>    
                </div>

                <img src="/assets/images/icons/close-arrow.svg" alt="" />
            </div>

            <button onClick={buscarEstruturaObjeto}>
                <img src="/assets/images/icons/loading.svg" alt="" />
                <h4>{translations.menus.structure.button}</h4>    
            </button>

            <hr/>

            <Editor height={'calc(100% - 150px)'} 
                    width={'100%'}
                    theme='vs-dark'
                    defaultLanguage="javascript"
                    value={jsString}
                    onChange={value => setJsString(value)}
                    options={{minimap: {enabled: false}, quickSuggestions: false}}
            />
        </section>
    )
}