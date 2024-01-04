import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/jsonAPI';
import Collection from '../../components/collection';

export default function WorkStation() {

    const [jsString, setJsString] = useState('');
    const [model, setModel] = useState();

    async function buscarEstruturaObjeto() {
        try {
            let modelInfo = await estruturaObjeto(jsString);
            setModel(modelInfo)

        } catch (error) {
            console.log(error);
        }
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
                    <section className="sec-schema">
                        <div className='modelo-result'>
                            {model.map(entity =>
                                <Collection entity={entity} />
                            )}
                        </div>
                    </section>
                }
            </main>
        </div>
    )
}