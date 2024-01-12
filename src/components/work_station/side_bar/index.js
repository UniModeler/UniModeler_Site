import { useEffect, useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import './index.scss';
import StructureMenu from './structureMenu';
import ObjectsMenu from './objectsMenu';
import { useEdges } from 'reactflow';
import t from '../../../api/multiLanguage';
import useTranslations from '../../../api/multiLanguage';

export default function SideBar({ jsString, setJsString, buscarEstruturaObjeto, structure }) {

    const [showBar, setShowBar] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [menu, setMenu] = useState('structure');

    const translations = useTranslations('sideBar');

    const openMenu = (myMenu) => {
        setShowBar(false);

        setTimeout(() => {
            setShowMenu(true)
            setMenu(myMenu);
        }, 200)
    }

    const closeMenu = () => {
        setShowMenu(false)

        setTimeout(() => {
            setShowBar(true)
        }, 400)
    }

    return (
        <section className="sidebar">
            <Sidebar collapsed={!showBar} collapsedWidth='0px' width='55px' transitionDuration={200}>
                <div className='sidebar-container'>
                    <div>
                        <div className='rotate-container' onClick={() => openMenu('structure')}>
                            <img src="/assets/images/icons/keys.svg" alt="" />
                            <h3>{translations.menus.structure.title}</h3>
                        </div>
                    </div>

                    <div>
                        <div className='rotate-container' onClick={() => openMenu('objects')}>
                            <img src="/assets/images/icons/leaves.svg" alt="" />
                            <h3>{translations.menus.objects.title}</h3>
                        </div>
                    </div>
                </div>
            </Sidebar>


            <Sidebar collapsed={!showMenu} collapsedWidth='0px' width='527px' transitionDuration={400}>
                {menu === 'structure' &&
                    <StructureMenu jsString={jsString}
                                   setJsString={setJsString}
                                   buscarEstruturaObjeto={buscarEstruturaObjeto} 
                                   closeMenu={closeMenu}/>
                }

                {menu === 'objects' &&
                    <ObjectsMenu closeMenu={closeMenu} structure={structure}/>
                }
            </Sidebar>
        </section>
    )
}