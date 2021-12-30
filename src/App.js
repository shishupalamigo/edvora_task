import React, { useState, useEffect } from 'react';
import Sidebar from './Components/Sidebar';
import ProductsList from './Components/ProductsList';

function App() {
  const [products, setProducts] = useState(null);
  const [productNames, setProductNames] = useState(null);

  useEffect(() => {
    fetch('https://assessment-edvora.herokuapp.com/')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then((data) => setProducts(data))
      .catch((errors) => console.log(errors));
  }, []);

  useEffect(() => {
    if (products !== null) {
      let uniqProductNames = products
        .map((product) => {
          return product.product_name;
        })
        .reduce((acc, cv) => {
          if (acc.includes(cv) === false) {
            acc.push(cv);
          }
          return acc;
        }, []);
      setProductNames(uniqProductNames);
    }
  }, [products]);

  return (
    <div className="bg-zinc-900 min-h-screen p-10 sm:flex lg:flex-row sm:flex-col">
      <Sidebar products={products} productNames={productNames} />
      <div className="lg:w-3/4">
        <div className="">
          <h1 className="text-white text-2xl mb-5">Edvora</h1>
          <h2 className="text-gray-500 text-xl mb-5">Products</h2>
        </div>
        {products &&
          productNames &&
          productNames.map((product) => {
            let filteredProducts = products.filter(
              (elm) => elm.product_name === product
            );
            return (
              <div className="w-full mb-5" key={product}>
                <h3 key={product} className="text-white mb-5">
                  {product}
                </h3>
                <div className="min-w-full bg-gray-800 h-1"></div>
                <div className="flex mb-5">
                  <ProductsList products={filteredProducts} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
