import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/jsonAPI';
import Collection from '../../components/collection';

import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { useXarrow } from 'react-xarrows';

export default function Landpage() {

    const [jsString, setJsString] = useState('');
    const [model, setModel] = useState();
    const [showButton, setShowButton] = useState(true);

    const updateXarrow = useXarrow();

    async function buscarEstruturaObjeto() {
        try {
            let modelInfo = await estruturaObjeto(jsString);
            setModel(modelInfo)

        } catch (error) {
            console.log(error);
        }
    }

    function baixarImagem() {
        setShowButton(false);

        setTimeout(() => {
            toPng(document.getElementById('schema'))
                .then(function (dataUrl) {
                    download(dataUrl, 'schema.png');
                });
                
            setShowButton(true);
        }, 2000)        
    }

    return (
        <div className="pagina pagina-landpage">
            <Cabecalho />

            <main>
                <h1>Create models from JSON Objects!</h1>
                <h2>Insert a JSON Object below to create a model from it.</h2>

                <div className='json-textarea'>
                    <textarea rows="20" value={jsString} onChange={e => setJsString(e.target.value)} />

                    <button onClick={buscarEstruturaObjeto}>
                        <img src="/assets/images/right-arrow.svg" alt="" />
                    </button>
                </div>

                {model &&
                    <div className='modelo-result' id='schema' onMouseMove={updateXarrow}>
                        <button onClick={baixarImagem} style={{display: showButton ? 'flex' : 'none'}}>
                            <img src="/assets/images/image.svg" alt="" />
                        </button>

                        {model.map(entity => 
                            <Collection entity={entity} />
                        )}
                    </div>
                }

            </main>
        </div>
    )
}