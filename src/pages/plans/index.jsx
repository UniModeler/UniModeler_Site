import Footer from '../../components/account/footer';
import Header from '../../components/account/header';
import './index.scss';

import PlansPresentation from './presentation';
import PaymentForm from './form';
import PaymentConfirmation from './confirmation';
import PaymentFinalization from './finalization';
import { useState } from 'react';

export default function Plans() {
  return (
    <div className="page account-page plans">
      <Header />

      <main>
        <img src="/assets/images/star1.svg" className="star1" alt="" />
        <img src="/assets/images/star2.svg" className="star2" alt="" />

        <h1>Escolha o melhor plano para você!</h1>
        <h2>Benefícios Exclusivos para Assinantes</h2>

        <PaymentFlow />

      </main>

      <Footer />
    </div>
  )
}

function PaymentFlow() {
  
  const [currentSection, setCurrentSection] = useState(<PlansPresentation choosePlan={choosePlan}/>);

  function choosePlan(plan) {
    setCurrentSection(<PaymentForm submitPayment={submitForm}/>)
  }

  function submitForm() {
    setCurrentSection(<PaymentConfirmation finalize={finalize}/>);
  }

  function finalize() {
    setCurrentSection(<PaymentFinalization />);
  }
  
  return currentSection; 
}