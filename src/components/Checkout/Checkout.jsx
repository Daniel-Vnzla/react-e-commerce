import React, { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce.js';
import { Link } from 'react-router-dom';

import AddressForm from './AddressForm.jsx';
import PaymentForm from './PaymentForm.jsx';

const steps = ["Shipping address", "Payment details"]

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
	const [ activeStep, setActiveStep ] = useState(0);
	const [checkoutToken, setCheckoutToken] = useState(null);
	const [shippingData, setShippingData ] = useState({});
	const [ isFinished, setFinished ] = useState(false);

	const generateToken = async () => {
		if (!cart.id) return
		try {
			const token = await commerce.checkout.generateToken(cart.id, { type: "cart" });
			setCheckoutToken(token);
		}
		catch(err){
			console.log(err);
		}
	}
	useEffect(() => {
		generateToken();  // eslint-disable-next-line 
	},[cart]);

	const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1 );
	const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1 );

  const next = (data) => {
  	setShippingData(data)
  	nextStep();
  }

  const timeout = () => {
  	setTimeout(() => {
  		setFinished(true);
  	}, 3000);
  }

	let Confimation = () => order.customer ? (
		<div className="confimation">
			<h4>Thanks your for your purchase, { order.customer.firstName }, { order.customer.lastName }</h4>
			<strong>Ref: { order.customer_reference }</strong>
			<Link to="/">Back to Home</Link>
		</div>
	) : isFinished ? (
		<div className="confimation">
			<h4>Thanks your for your purchase</h4>
			<Link to="/">Back to Home</Link>
		</div>
	) :(
		<div>Loading...</div>
	)

	if (error) {
		<>
			<div>Error: { error }</div>
			<Link to="/">Back to Home</Link>
		</>
	}

	const Form = () => activeStep === 0
		? <AddressForm checkoutToken={checkoutToken} next={next} />
		: <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} onBackStep={backStep} onNextStep={nextStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} />
	
  return (
    <section>
		<div className="checkout">
			<h2>Checkout</h2>
			<ul className="steps">
				<li className="active" >1 Ship Address </li>
				<li className={activeStep === 1 ? "active" : ""}>2 Payment</li>
			</ul>
				{activeStep === steps.length ? <Confimation /> : checkoutToken && <Form />}
		</div>
	</section>
  )
}

export default Checkout;