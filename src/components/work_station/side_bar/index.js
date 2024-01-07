import { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import './index.scss';
import StructureMenu from './structureMenu';
import ObjectMenu from './objectMenu';

export default function SideBar({ jsString, setJsString, buscarEstruturaObjeto }) {

    const [showBar, setShowBar] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [menu, setMenu] = useState('structure');

    const openMenu = (myMenu) => {
        setShowBar(false);

        setTimeout(() => {
            setShowMenu(true)
            setMenu(myMenu);
        }, 300)
    }

    const closeMenu = () => {
        setShowMenu(false)

        setTimeout(() => {
            setShowBar(true)
        }, 300)
    }

    return (
        <section className="sidebar">
            <Sidebar collapsed={!showBar} collapsedWidth='0px' width='55px' transitionDuration={300}>
                <div className='sidebar-container'>
                    <div>
                        <div className='rotate-container' onClick={() => openMenu('structure')}>
                            <img src="/assets/images/icons/keys.svg" alt="" />
                            <h3>Structure</h3>
                        </div>
                    </div>

                    <div>
                        <div className='rotate-container' onClick={() => openMenu('objects')}>
                            <img src="/assets/images/icons/leaves.svg" alt="" />
                            <h3>Objects</h3>
                        </div>
                    </div>
                </div>
            </Sidebar>


            <Sidebar collapsed={!showMenu} collapsedWidth='0px' width='527px' transitionDuration={300}>
                {menu === 'structure' &&
                    <StructureMenu jsString={jsString}
                        setJsString={setJsString}
                        buscarEstruturaObjeto={buscarEstruturaObjeto} 
                        closeMenu={closeMenu}/>
                }

                {menu === 'objects' &&
                    <ObjectMenu />
                }
            </Sidebar>
        </section>
    )
}