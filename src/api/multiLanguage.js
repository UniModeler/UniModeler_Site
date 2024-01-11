import { useEffect, useState } from 'react';

export default function useTranslations(component) {
    
    const [translations, setTranslations] = useState(translate(component));

    return translations;
}

function translate(component) {
    let language = 'en';
    
    return translations[language][component];
}

const translations = {
    en: {
        sideBar: {
            menus: {
                structure: {
                    title: 'Structure'
                }
            },
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