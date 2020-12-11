import React from 'react';
import AddressForm from './AddressForm.jsx';

const Checkout = (props) => {
  return (
    <section>
		<div class="checkout">
			<h2>Checkout</h2>
			<ul class="steps">
				<li class="active">1 Ship Address </li>
				<li>2 Payment</li>
			</ul>
				<AddressForm />
		</div>
	</section>
  )
}

export default Checkout;