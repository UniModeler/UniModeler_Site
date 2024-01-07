import './index.scss';

export default function Cabecalho() {
    return (
        <header className='cabecalho'>
            <div className="logo">
                <img src="/assets/images/logo.svg" alt="" />
                <h1>UniModeler</h1>
            </div>

            <div className='project-name'>
                <h2>E-commerce Loja de Roupa</h2>

                <button>
                    <img src="/assets/images/icons/chevron-down.svg" alt="" />
                </button>
            </div>

            <button>Guest</button>
        </header>
    )
}