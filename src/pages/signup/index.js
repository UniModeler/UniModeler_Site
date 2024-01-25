import './index.scss';

export default function SignUpPage() {
    return (
        <div className="page sign-up">
            <div>
                <img src="/assets/images/logo.svg" alt="" />

                <section className="inputs">
                    <div>
                        <input type="text" placeholder='Nome' />
                        <input type="text" placeholder='Empresa' />
                        <input type="text" placeholder='Área de atuação' />
                        <button>Criar conta</button>
                    </div>
                    <div>
                        <input type="text" placeholder='E-mail' />
                        <input type="text" placeholder='Senha' />
                    </div>
                </section>
            </div>
        </div>
    )
}