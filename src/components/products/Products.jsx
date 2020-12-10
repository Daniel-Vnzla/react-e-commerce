import React from 'react';
import ProductCard from './ProductCard.jsx';

import img from '../../assets/Headphones Headset with Apple Microphone Headphones Headphones - headphones.png';

const products = [
	{
		id: "1",
		color: "#79aa41",
		title: "Bing Headphones",
		description: "Headphones Headset with Apple Microphone Headphones Headphones",
		imgUrl: img
	},
	{
		id: "2",
		color: "#79aa41",
		title: "Bing Headphones",
		description: "Headphones Headset with Apple Microphone Headphones Headphones",
		imgUrl: img
	},
	{
		id: "3",
		color: "#79aa41",
		title: "Bing Headphones",
		description: "Headphones Headset with Apple Microphone Headphones Headphones",
		imgUrl: img
	},
	{
		id: "4",
		color: "#79aa41",
		title: "Bing Headphones",
		description: "Headphones Headset with Apple Microphone Headphones Headphones",
		imgUrl: img
	},
	{
		id: "5",
		color: "#79aa41",
		title: "Bing Headphones",
		description: "Headphones Headset with Apple Microphone Headphones Headphones",
		imgUrl: img
	},
]

const Products = (props) => {
  return (
  	<section className="products">
  		<h2>Headphones</h2>	
	    <div className="grid">
	    	{products.map(product => (
	    		<ProductCard key={product.id} product={product} />
	    		))}
	    </div>
	    <h2>Auriculares</h2>
	    <div className="grid">
	    	
	    </div>
  	</section>
  )
}

export default Products;