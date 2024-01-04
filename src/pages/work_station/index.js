import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';
import { estruturaObjeto } from '../../api/jsonAPI';
import CollectionsFlow from './collectionsFlow';
import { ReactFlowProvider } from 'reactflow';


export default function WorkStation() {

    const [jsString, setJsString] = useState('');
    const [structure, setStructure] = useState();

    async function buscarEstruturaObjeto() {
        try {
            let struct = await estruturaObjeto(jsString);
            setStructure(struct)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="pagina pagina-landpage">
            <Cabecalho />

            <main>
                <div className='json-textarea'>
                    <textarea rows="20" value={jsString} onChange={e => setJsString(e.target.value)} />

                    <button onClick={buscarEstruturaObjeto}>
                        <img src="/assets/images/right-arrow.svg" alt="" />
                    </button>
                </div>

                <ReactFlowProvider>
                    {structure &&
                        <section className="sec-schema">
                            <div className='modelo-result'>
                                <CollectionsFlow structure={structure} />
                            </div>
                        </section>
                    }    
                </ReactFlowProvider>
                
            </main>
        </div>
    )
}