import Footer from '../../components/account/footer';
import Header from '../../components/account/header';
import './index.scss';

export default function Projects() {
    return (
        <div className="page projects">
            <Header />

            <main>
                <div>
                    <h2>Meus Projetos</h2>
                    <button><h3>+</h3></button>
                </div>

                <section className="container-projects">
                    <Project />

                    <div className="no-project"></div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

function Project(props) {
    return (
        <div className="project">
            <div className="shadow">
                <div>
                    <h3>PsicoSystem</h3>
                    <p>Alterado há 10 horas</p>
                </div>

                <button>
                    <img src="/assets/images/icons/menu-vertical.svg" alt="" />
                </button>
            </div>
        </div>
    )
}