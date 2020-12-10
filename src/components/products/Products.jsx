import React from 'react';
import ProductCard from './ProductCard.jsx';

import img from '../../assets/Headphones Headset with Apple Microphone Headphones Headphones - headphones.png';


const Products = ({ products, onAddToCart }) => {
  return (
  	<section className="products">
  		<h2>Headphones</h2>	
	    <div className="grid">
	    	{products.map(product => (
	    		<ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
	    		))}
	    </div>
  	</section>
  )
}

export default Products;