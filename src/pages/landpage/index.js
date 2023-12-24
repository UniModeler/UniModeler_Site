import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/jsonAPI';
import Collection from '../../components/collection';

export default function Landpage() {

    const [jsonString, setJsonString] = useState('');
    const [jsonObj, setJsonObj] = useState();

    async function buscarEstruturaObjeto() {
        try {
            let object = await estruturaObjeto(JSON.parse(jsonString));
            console.log(object);
            setJsonObj(object);

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
                    <textarea rows="20" value={jsonString} onChange={e => setJsonString(e.target.value)} />

                    <button onClick={buscarEstruturaObjeto}>
                        <img src="/assets/images/right-arrow.svg" alt="" />
                    </button>
                </div>

                    {jsonObj &&
                        <div className='modelo-result'>
                            <Collection data={jsonObj} />
                        </div>
                    }  
                
            </main>
        </div>
    )
}