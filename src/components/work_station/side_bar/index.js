import { useState } from 'react';
import { Sidebar } from 'react-pro-sidebar';
import './index.scss';
import StructureMenu from './structureMenu';
import ObjectMenu from './objectMenu';

export default function SideBar({ jsString, setJsString, buscarEstruturaObjeto }) {

    const [showBar, setShowBar] = useState(false);
    const [menu, setMenu] = useState('structure');

    const handleSideBar = (myMenu) => {
        if (menu !== myMenu) {
            setMenu(myMenu);
            setShowBar(true);

        } else {
            setShowBar(!showBar);
        }
    }

    return (
        <section className="sidebar">
            <div className='sidebar-container'>
                <div>
                    <div className='rotate-container' onClick={() => handleSideBar('structure')}>
                        <img src="/assets/images/icons/keys.svg" alt="" />
                        <h3>Structure</h3>
                    </div>
                </div>

                <div>
                    <div className='rotate-container' onClick={() => handleSideBar('object')}>
                        <img src="/assets/images/icons/leaves.svg" alt="" />
                        <h3>Objects</h3>
                    </div>
                </div>
            </div>

            <Sidebar collapsed={!showBar} collapsedWidth='0px' width='527px'>
                {menu === 'structure' &&
                    <StructureMenu jsString={jsString}
                                   setJsString={setJsString}
                                   buscarEstruturaObjeto={buscarEstruturaObjeto} />
                }

                {menu === 'object' &&
                    <ObjectMenu />
                }
            </Sidebar>
        </section>
    )
}