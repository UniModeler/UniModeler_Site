import './index.scss';
import { useState } from 'react';

export default function Cabecalho() {

    const [logged, setLogged] = useState(true);

    return (
        <header className='cabecalho'>
            <div className="logo">
                <img src="/assets/images/logo.svg" alt="" />
            </div>

            <div className='project-name'>
                <h2>E-commerce Loja de Roupa</h2>

                <button>
                    <img src="/assets/images/icons/chevron-down.svg" alt="" />
                </button>
            </div>

            <div className="user">
                {!logged ?
                    <button className="btn-login">Login</button> :
                    
                    <div className="user-menu">
                        <div>B</div>
                        <img src="/assets/images/icons/chevron-down.svg" alt="" />
                    </div>
                }
            </div>
        </header>
    )
}