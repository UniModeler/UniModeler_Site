import './index.scss';
import {Link} from 'react-router-dom';

export default function LoginPage() {
    return (
        <div className="page login">
            <div>
                <section className="logo">
                    <img src="/assets/images/logo.svg" alt="" />
                </section>

                <section className="inputs">
                    <div>
                        <input type="text" placeholder='E-mail'/>
                        <input type="text" placeholder='Senha'/>
                        <button>Entrar</button>

                        <div>
                            <Link>Criar conta</Link>
                            <Link>Esqueci a senha</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}