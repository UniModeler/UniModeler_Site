import { useEffect, useState } from 'react';

export default function useTranslations(component) {
    
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        setTranslations(translate(component));
    }, [])
    
    return translations;
}

function translate(component) {
    let language = 'pt_br';
    
    return translations[language][component];
}

const translations = {
    en: {
        sideBar: {
            botaoAtualizar: 'Update',
            entidades: 'Entities',
            tituloEstrutura: 'Structure',
            tituloObjetos: 'Objects'
        }
    },

    pt_br: {
        sideBar: {
            botaoAtualizar: 'Atualizar',
            entidades: 'Entidades',        
            tituloEstrutura: 'Estrutura',
            tituloObjetos: 'Objetos'
        }
    }
}