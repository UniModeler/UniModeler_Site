import './index.scss';

export default function PaymentFinalization() {
    return (
        <div className="payment-finalization">
            <section className="finalization">
                <h1>Parabéns!</h1>
                <h2>Seu pedido foi finalizado com sucesso!</h2>
                <p>A confirmação de pagamento pode levar até 2 dias dependendo da forma escolhida. Você será notificado por e-mail e pode conferir o andamento do pedido em ‘Meus Pedidos’.</p>

                <h2>Seja Bem-Vindo à Unimodeler!</h2>
                <p>Transformando a forma de modelar dados.</p>
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
                        <img src="/assets/images/icons/check.svg" alt="" />
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

                    <button className="back">Ir para Meus Projetos</button>
                </div>
            </section>
        </div>
    )
}