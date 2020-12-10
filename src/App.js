import React, { useState, useEffect } from 'react';
import "./scss/styles.scss";
import { commerce } from './lib/commerce.js';

import Products from './components/products/Products.jsx';
import Header from './components/header/Header.jsx';

const App = (props) => {
  const [ products, setProducts ] = useState([]);
  const [ cart, setCart ] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
    console.log(data); 
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart()
  },[])

  return (
    <main>
      <Header totalCartItems={cart.total_items}/>
      <Products products={products} onAddToCart={handleAddToCart} />
    </main>
  )
}

export default App;