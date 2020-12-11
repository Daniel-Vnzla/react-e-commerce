import React from 'react';

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  return (
		<div className="product-card-vertical">
			<img src={item.media.source} alt="imagen" />
			<div className="product-card-vertical-info">
				<h3>{item.name}</h3>
				<strong>Quantity: {item.quantity}</strong>
			</div>
			<strong className="price">{item.line_total.formatted_with_symbol}</strong>
			<div className="product-card-vertical-quantity-controls">
				<button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1) }>-</button>
				<input type="number" min="1" max="9999" value={item.quantity} onChange={({ target }) => handleUpdateCartQty(item.id, target.value > 9999 ? 9999 : target.value )} />
				<button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1) }>+</button>
			</div>
			<div className="product-card-vertical-actions">
				<button onClick={() => handleRemoveFromCart(item.id)}>
			
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 768 768">
					<title></title>
					<g id="icomoon-ignore">
					</g>
					<path fill="#fff" d="M223.5 576q25.5 0 45 19.5t19.5 45-19.5 44.25-45 18.75-44.25-18.75-18.75-44.25 18.75-45 44.25-19.5zM498 415.5l-288-288h430.5q13.5 0 22.5 9.75t9 23.25q0 1.5-4.5 15l-114 207q-18 33-55.5 33zM237 480h162l-64.5-64.5h-75l-28.5 52.5-1.5 4.5q0 7.5 7.5 7.5zM727.5 727.5l-40.5 40.5-91.5-91.5q-19.5 27-51 27-25.5 0-45-18.75t-19.5-44.25q0-33 27-52.5l-45-43.5h-238.5q-25.5 0-44.25-19.5t-18.75-45q0-15 7.5-30l43.5-79.5-70.5-148.5-141-141 40.5-40.5z"></path>
					</svg>
				</button>
			</div>
		</div>	
  )
}

export default CartItem;