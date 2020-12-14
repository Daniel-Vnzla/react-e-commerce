import React from 'react';

const Review = ({ checkoutToken }) => {
  return (
    <div className="list-items">
			<h3>Order sumary</h3>
			<div className="list-items-wrapper">
				{checkoutToken.live.line_items.map( product => (
					<div className="list-item" key={product.id}>
						<div className="list-info">
							<h4>{product.name}</h4>
							<strong>Quantity: {product.quantity}</strong>
						</div>
						<strong className="price">
							{product.line_total.formatted_with_symbol}
						</strong>
					</div>
				))}
			<div className="total">
				<h6>Total</h6>
				<strong>{checkoutToken.live.subtotal.formatted_with_symbol}</strong>
				</div>
			</div>
		</div>
  )
}

export default Review;