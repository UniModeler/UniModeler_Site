import { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import './index.scss';

export default function Landpage() {

    const [jsonString, setJsonString] = useState('');
    const [jsonObj, setJsonObj] = useState({});

    function tipoValor(valor) {
        let tipo = typeof (valor);

        if (tipo === 'object' && valor.length) {
            return 'array'
        } else {
            return tipo;
        }
    }

    function construirModelo(objeto, nivel, nome) {

        console.log(objeto, nivel, nome);

        if (tipoValor(objeto) === 'array') {
            return (
                // retornar um componente especial com filhos caso seja um array
                <Array nome={nome}>
                    {objeto.map(item => {
                        if (tipoValor(item) === 'array' || tipoValor(item) === 'object') {
                            return construirModelo(item, nivel + 1)
                        }

                        return (
                            <li>{item}</li>
                        )
                    }
                    )
                    }
                </Array>
            )
        }

        if (tipoValor(objeto) === 'object' && nivel > 1) {
            //retornar um componente especial com filhos caso seja um objeto filho
            console.log(objeto);

            return (
                <NestedObject nome={nome}>
                    {Object.keys(objeto).map(chave => {
                        if (tipoValor(objeto[chave]) === 'array' || tipoValor(objeto[chave]) === 'object') {
                            return construirModelo(objeto[chave], nivel + 1, chave)
                        }

                        return (
                            <li>{chave}: {objeto[chave]}</li>
                        )
                    }
                    )
                    }
                </NestedObject>
            )
        }

        return Object.keys(objeto).map(chave => {
            if (tipoValor(objeto[chave]) === 'array' || tipoValor(objeto[chave]) === 'object') {
                return construirModelo(objeto[chave], nivel + 1, chave)
            }

            return (
                <li>
                    {chave}: {objeto[chave]}
                </li>
            )
        }
        )
    }

    return (
        <div className="pagina landpage">
            <Cabecalho />

            <textarea placeholder='Escreva seu JSON aqui!' value={jsonString} onChange={e => setJsonString(e.target.value)} />

            <button onClick={() => setJsonObj(JSON.parse(jsonString))}>funcionar</button>

            <ul>
                {construirModelo(jsonObj, 1)}
            </ul>

        </div>
    )

    function Array({ children, nome }) {
        return (
            <li>
                <h4>{nome}</h4>
                <ol>
                    {children}
                </ol>
            </li>
        )
    }

    function NestedObject({ children, nome }) {
        return (
            <li>
                <h4>{nome}</h4>
                <ul>
                    {children}
                </ul>
            </li>
        )
    }
}