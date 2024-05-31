import './index.scss';

export default function PaymentConfirmation({ finalize }) {
    return (
        <div className="payment-confirmation">
            <section className="overview">
                <h1>Resumo do Pedido</h1>

                <div>
                    <h2>Forma de Pagamento</h2>
                    <ul>
                        <li>Cartão <span>(Crédito)</span></li>
                        <li>Final 0489</li>
                        <li>10x de R$ 100,00 sem juros</li>
                    </ul>
                </div>

                <div>
                    <h2>Endereço de cobrança</h2>
                    <ul>
                        <li>BRUNO DE OLIVEIRA</li>
                        <li>brunodeoliveira.22.10@gmail.com</li>
                        <li>(11) 99888-7777</li>
                        <li>Av. Senador Teotonio Vilela, 3548 - Bloco 1A apto 12</li>
                        <li>São Paulo - SP</li>
                        <li>04833-587</li>
                    </ul>
                </div>
            </section>

            <section className="sec-order">
                <div className="history">
                    <span>
                        <h3>Escolha do Plano</h3>
                        <img src="/assets/images/icons/check.svg" alt="" />
                    </span>

                    <hr />

                    <span>
                        <h3>Detalhes do Pagamento</h3>
                        <img src="/assets/images/icons/check.svg" alt="" />
                    </span>

                    <hr />

                    <span>
                        <h3>Finalização</h3>
                        <img src="/assets/images/icons/dot.svg" alt="" />
                    </span>
                </div>

                <div className="order">
                    <h3>Finalização do Pedido</h3>
                    <h4>Pedido: 21862564</h4>

                    <div>
                        <img src="/assets/images/plans/lightning.svg" alt="" />
                        <p>Unimodeler Plano Básico Mensal</p>

                        <h5>
                            R$150
                            <span>/mês</span>
                        </h5>
                    </div>

                    <hr />

                    <button className="next" onClick={finalize}>Concluir Pedido</button>
                    <button className="cancel">Cancelar Pedido</button>
                </div>
            </section>
        </div>
    )
}