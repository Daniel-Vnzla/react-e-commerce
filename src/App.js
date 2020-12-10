import React from 'react';
import "./scss/styles.scss";

import Products from './components/products/Products.jsx';
import Header from './components/header/Header.jsx';

const App = (props) => {
  return (
    <main>
      <Header />
      <Products />
    </main>
  )
}

export default App;