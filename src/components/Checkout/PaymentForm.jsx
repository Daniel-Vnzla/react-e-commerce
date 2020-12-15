import React from 'react';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review.jsx';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ shippingData, checkoutToken, onBackStep, onNextStep, onCaptureCheckout, timeout }) => {
const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });

    if (error) return console.error('[error]', error);

    const orderData = {
      line_items: checkoutToken.live.line_items,
      customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.email },
      shipping: { name: 'International', street: shippingData.address1, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.zip, country: shippingData.shippingCountry },
      fulfillment: { shipping_method: shippingData.shippingOption },
      payment: {
        gateway: 'stripe',
        stripe: {
          payment_method_id: paymentMethod.id,
        },
      },
    };

    onCaptureCheckout(checkoutToken.id, orderData);

    timeout();
    
    onNextStep();
  
  };

  return (
   <section>
		<div className="payment">
			<Review checkoutToken={checkoutToken} />
			<div className="payment-method">
				<h3>Payment method</h3>
					<Elements stripe={stripePromise}>
						<ElementsConsumer>
							{({ elements, stripe }) => (
								<form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
									<CardElement />
                  <p className="test">Creadit Card for testing: 4242 4242 4242 4242 | 04/24 | 242 | 42424 </p>
									<br />
									<div className="actions">
										<button onClick={onBackStep} >Back</button>
										<button>Pay {checkoutToken.live.subtotal.formatted_with_symbol}</button>
									</div>
								</form>
							)}
						</ElementsConsumer>
					</Elements>
				</div>
		</div>
	</section>
  )
}

export default PaymentForm;