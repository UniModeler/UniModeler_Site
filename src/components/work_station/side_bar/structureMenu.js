import Editor from '@monaco-editor/react';

export default function StructureMenu({jsString, setJsString, buscarEstruturaObjeto, closeMenu}) {
    return (
        <section className="menu structure-menu">
            <div className="title" onClick={closeMenu}>
                <img src="/assets/images/icons/keys.svg" alt="" />
                <h3>Structure</h3>
            </div>

            <button onClick={buscarEstruturaObjeto}>
                <img src="/assets/images/icons/loading.svg" alt="" />
                <h4>Atualizar</h4>    
            </button>

            <hr/>

            <Editor height={'300px'} 
                    theme='vs-dark'
                    defaultLanguage="javascript"
                    defaultValue="// Escreva seu modelo estruturado em javascript "
                    value={jsString}
                    onChange={value => setJsString(value)}
                    options={{minimap: {enabled: false}}}
            />
        </section>
    )
}