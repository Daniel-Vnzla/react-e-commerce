import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="products-card" style={{ "--bg-color": product.variants[0].name }}>
			<img onLoad={({ target }) => target.style.opacity = 1 } src={product.media.source} alt="texto" />
			<h3>{product.name}</h3>
			<p>{product.description}</p>
			<div className="products-actions">
				<button onClick={() => onAddToCart(product.id, 1) }> 
					<div className="icon plus">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 768 768">
						<title></title>
						<g id="icomoon-ignore">
						</g>
						<path fill="#fff" d="M384 672c-52.928 0-96-43.072-96-96l1.696-97.696-97.12 1.696c-53.504 0-96.576-43.072-96.576-96s43.072-96 96-96l97.696-1.728-1.696-93.696c0-53.504 43.072-96.576 96-96.576s96 43.072 96 96l1.76 94.272 94.816 1.728c52.352 0 95.424 43.072 95.424 96s-43.072 96-96 96l-94.24-1.696-1.76 98.272c0 52.352-43.072 95.424-96 95.424zM352 416v160.576c0 17.056 14.368 31.424 32 31.424s32-14.368 32-32v-160h160.576c17.056 0 31.424-14.368 31.424-32s-14.368-32-32-32h-160v-160c0-18.208-14.368-32-32-32s-32 14.368-32 32v160h-160c-18.208 0-32 14.368-32 32s14.368 32 32 32h160z"></path>
						</svg>
					</div>
					<span>
						ADD TO CART
					</span>
				</button>
				<strong className="price">{product.price.formatted_with_symbol}</strong>
			</div>
		</div>
  )
}

export default ProductCard;