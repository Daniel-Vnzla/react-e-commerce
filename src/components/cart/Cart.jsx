import React from 'react';
import CartItem from './CartItem.jsx';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

	if (!cart.line_items) return "loading..."

  return (
    <section>
		<div className="cart">
			<h2>Shopping cart</h2>
			<div className="grid">
				<div className="grid-checkout">
					<div className="grid-checkout-card">
						<h3>Total</h3>
						<strong>{cart.subtotal.formatted_with_symbol}</strong>
						<Link to="/checkout" >	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="687" height="448" viewBox="0 0 687 448">
					<title></title>
					<g id="icomoon-ignore">
					</g>
						<path fill="#fff" d="M381 390.25c0 22.75-18.25 41-41 41s-41.25-18.25-41.25-41 18.5-41.25 41.25-41.25 41 18.5 41 41.25zM193.75 390.25c0 22.75-18.5 41-41.25 41s-41-18.25-41-41 18.25-41.25 41-41.25 41.25 18.5 41.25 41.25zM0 16.75c73.75 77.75 143 89.25 415 89.25s152.5 60.5-15.5 210.5c53.25-92.5 236.25-174.5-63.75-170-287.75 4.25-304.75-83.25-335.75-129.75z"></path>
					</svg>
				Checkout</Link>
					</div>
				</div>
				<div className="grid-items">
					<div className="grid-items-header">
						<h4>items</h4>
						{cart.line_items.length &&
						<button onClick={handleEmptyCart}>
							<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 768 768">
							<title></title>
							<g id="icomoon-ignore">
							</g>
							<path fill="#fff" d="M223.5 576q25.5 0 45 19.5t19.5 45-19.5 44.25-45 18.75-44.25-18.75-18.75-44.25 18.75-45 44.25-19.5zM498 415.5l-288-288h430.5q13.5 0 22.5 9.75t9 23.25q0 1.5-4.5 15l-114 207q-18 33-55.5 33zM237 480h162l-64.5-64.5h-75l-28.5 52.5-1.5 4.5q0 7.5 7.5 7.5zM727.5 727.5l-40.5 40.5-91.5-91.5q-19.5 27-51 27-25.5 0-45-18.75t-19.5-44.25q0-33 27-52.5l-45-43.5h-238.5q-25.5 0-44.25-19.5t-18.75-45q0-15 7.5-30l43.5-79.5-70.5-148.5-141-141 40.5-40.5z"></path>
							</svg>
							<strong>Empty cart</strong>
						</button>
						}
					</div>
					{cart.line_items.map(item =>(
						<CartItem 
							key={item.id} 
							item={item} 
							handleRemoveFromCart={handleRemoveFromCart} 
							handleUpdateCartQty={handleUpdateCartQty} />
						) )}
					{!cart.line_items.length && <div className="grid-no-items" >You have no items in your shoppin cart, <Link to="/">Start adding some!</Link></div> }
				</div>
			</div>
		</div>
	</section>
  )
}

export default Cart;