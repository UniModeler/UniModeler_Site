import { useState } from 'react';
import { get } from 'local-storage';

export default function useTranslations(component) {

  const [translations] = useState(translate(component));

  return [translations, replace];
}

function translate(component) {
  let language = get('language');
  
  if(!language) language = 'pt_br';

  return translations[language][component];
}

function replace(translation, replacements) {

  let t = translation;

  for(let r of replacements) {
    t = t.replace('%?', r)  
  }

  return t;
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
    },
    actionsBar: {
      shareButton: {
        shareText: 'Here is your share link.',
        copyText: 'Copied to clipboard!'
      }
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
    },
    actionsBar: {
      shareButton: {
        shareText: 'Aqui está seu link compartilhável.',
        copyText: 'Copiado!'
      }
    }
  },
}