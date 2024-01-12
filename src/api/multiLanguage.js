import { useState } from 'react';
import { get } from 'local-storage';

export default function useTranslations(component) {

    const [translations] = useState(translate(component));

    return translations;
}

function translate(component) {
    let language = get('language');
    
    if(!language) language = 'en';

    return translations[language][component];
}

const translations = {
    en: {
        sideBar: {
            menus: {
                structure: {
                    title: 'Structure',
                    button: 'Update'
                },
                objects: {
                    title: 'Objects',
                    entitiesTitle: 'Entities'
                }
            },
        }
    },

    pt_br: {
        sideBar: {
            menus: {
                structure: {
                    title: 'Estrutura',
                    button: 'Atualizar'
                },
                objects: {
                    title: 'Objetos',
                    entitiesTitle: 'Entidades'
                }
            },
        }
    },
}