import Editor from '@monaco-editor/react';

export default function StructureMenu({jsString, setJsString, buscarEstruturaObjeto, closeMenu}) {
    return (
        <section className="menu structure-menu">
            <div className="title" onClick={closeMenu}>
                <div>
                    <img src="/assets/images/icons/keys.svg" alt="" />
                    <h3>Structure</h3>    
                </div>

                <img src="/assets/images/icons/pin.svg" alt="" />
            </div>

            <button onClick={buscarEstruturaObjeto}>
                <img src="/assets/images/icons/loading.svg" alt="" />
                <h4>Atualizar</h4>    
            </button>

            <hr/>

            <Editor height={'calc(100% - 250px)'} 
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