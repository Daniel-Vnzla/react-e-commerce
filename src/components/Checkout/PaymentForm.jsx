import React from 'react';
import CustomInput from './CustomInput.jsx';
import Review from './Review.jsx';
import { Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("...");

const PaymentForm = ({ checkoutToken, backStep }) => {
  return (
   <section>
		<div className="payment">
			<Review checkoutToken={checkoutToken} />
			<div className="payment-method">
				<h3>Payment method</h3>
					<Elements stripe={stripePromise}>
						<ElementsConsumer>
							{({ elements, stripe }) => (
								<form>
									<CardElement />
									<br />
									<div className="actions">
										<button onClick={backStep} >Back</button>
										<button>Pay 2000$</button>
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