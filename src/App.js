import React, { useState, useEffect } from 'react';
import "./scss/styles.scss";
import { commerce } from './lib/commerce.js';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Products from './components/products/Products.jsx';
import Header from './components/header/Header.jsx';
import Cart from './components/cart/Cart.jsx';

const App = (props) => {
  const [ products, setProducts ] = useState([]);
  const [ cart, setCart ] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  }

  useEffect(() => {
    fetchProducts();
    fetchCart()
  },[])

  return (
    <Router>
      <main>
        <Header totalCartItems={cart.total_items}/>
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart" >
            <Cart cart={cart} />
          </Route>
        </Switch>
      </main>
    </Router>
  )
}

export default App;