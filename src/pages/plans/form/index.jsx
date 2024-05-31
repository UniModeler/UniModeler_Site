import './index.scss';

export default function PaymentForm({ submitPayment }) {
    return (
        <div className="payment-form">
            <section className="sec-form">
                <div>
                    <h1>Forma de Pagamento</h1>
                    <h2>Cartão</h2>

                    <div className="container-inputs">
                        <div className="input">
                            <h3>Nome impresso no cartão</h3>
                            <input type="text" />
                        </div>

                        <div className="input">
                            <h3>Número do cartão</h3>
                            <input type="text" />
                        </div>

                        <div className="input-divided">
                            <div className="input">
                                <h3>Validade</h3>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <h3>Código de segurança</h3>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="input">
                            <h3>Parcelamento</h3>
                            <input type="text" />
                        </div>
                    </div>
                </div>

                <div>
                    <h1>Endereço de cobrança</h1>

                    <div className="container-inputs">
                        <div className="input">
                            <h3>Nome</h3>
                            <input type="text" />
                        </div>

                        <div className="input">
                            <h3>Email</h3>
                            <input type="text" />
                        </div>

                        <div className="input-divided">
                            <div className="input">
                                <h3>Celular</h3>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <h3>CEP</h3>
                                <input type="text" />
                            </div>
                        </div>

                        <div className="input">
                            <h3>Endereço</h3>
                            <input type="text" />
                        </div>

                        <div className="input-divided">
                            <div className="input">
                                <h3>Cidade</h3>
                                <input type="text" />
                            </div>
                            <div className="input">
                                <h3>Estado</h3>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
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
                        <img src="/assets/images/icons/dot.svg" alt="" />
                    </span>

                    <hr />

                    <span>
                        <h3>Finalização</h3>
                        <img src="/assets/images/icons/dot.svg" alt="" />
                    </span>
                </div>

                <div className="order">
                    <h3>Pedido</h3>
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

                    <button className="next" onClick={submitPayment}>Próximo</button>
                    <button className="cancel">Cancelar Pedido</button>
                </div>
            </section>
        </div>
    )
}