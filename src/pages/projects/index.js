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
                    <h3>+</h3>
                </div>

                <section className="container-projects">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </section>
            </main>

            <Footer />
        </div>
    )
}