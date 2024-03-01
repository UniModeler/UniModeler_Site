import Footer from '../../components/account/footer';
import Header from '../../components/account/header';
import './index.scss';
import { useState } from 'react';

export default function Plans() {

    const [installment, setInstallment] = useState('monthly');

    return (
        <div className="page plans">
            <Header />

            <main>
                <img src="/assets/images/star1.svg" className="star1" alt="" />
                <img src="/assets/images/star2.svg" className="star2" alt="" />

                <h1>Escolha o melhor plano para você!</h1>
                <h2>Benefícios Exclusivos para Assinantes</h2>

                <p>Escolha o plano que atenda às suas necessidades e transforme sua experiência com nosso aplicativo. Dê um passo em direção à experiência premium! Junte-se agora para desbloquear benefícios exclusivos.</p>

                <div className='buttons'>
                    <button onClick={() => setInstallment('monthly')}
                        className={installment === 'monthly' ? 'selected' : ''}>
                        Mensal
                    </button>

                    <button onClick={() => setInstallment('yearly')}
                        className={installment === 'yearly' ? 'selected' : ''}>
                        Anual
                    </button>
                </div>

                <section className='container-plans'>
                    <div>
                        <div className="plan-content">
                            <h3>Free</h3>
                            <img src="/assets/images/plans/anchor.svg" alt="" />

                            <div>
                                <div className='line' />
                                <h4>$ 0/<span>month</span></h4>
                                <div className='line' />
                            </div>

                            <ul>
                                <li>Plataforma UniModeler.</li>
                                <li>Até 03 projetos.</li>
                                <li>Até 10 objetos por projeto.</li>
                                <li>Compartilhamento de projeto <br /> somente leitura.</li>
                            </ul>
                        </div>

                        <div className='subscribe'>
                            Atual
                        </div>
                    </div>

                    <div className='favourite'>
                        <div className="plan-content">
                            <h3>Personal</h3>
                            <img src="/assets/images/plans/lightning.svg" alt="" />

                            <div>
                                <div className='line' />
                                <h4>$ 6/<span>month</span></h4>
                                <div className='line' />
                            </div>

                            <ul>
                                <li>Plataforma UniModeler.</li>
                                <li>Projetos e objetos ilimitados.</li>
                                <li>Dezenas de funcionalidades.</li>
                                <li>Compartilhamento de projeto <br /> leitura e escrita.</li>
                            </ul>
                        </div>

                        <div className='subscribe disabled'>
                            Atualizar
                        </div>
                    </div>

                    <div>
                        <div className="plan-content">
                            <h3>Team</h3>
                            <img src="/assets/images/plans/sharing.svg" alt="" />

                            <div>
                                <div className='line' />
                                <h4>Em breve</h4>
                                <div className='line' />
                            </div>

                            <ul>
                                <li>Tudo do plano Personal</li>
                                <li>Colaboração em tempo real.</li>
                                <li>Suporte premium.</li>
                            </ul>
                        </div>

                        <div className='subscribe disabled'>
                            Em breve
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}