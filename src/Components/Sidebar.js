import React, { useEffect, useState } from 'react';

function Sidebar(props) {
  
  const { products, productNames } = props;
  const [stateNames, setStateNames] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState('Product');
  const [selectedState, setSelectedState] = useState('State');
  const [cityNames, setCityNames] = useState(null);

  useEffect(() => {
    if (products) {
      function getStateNames() {
        const filteredProducts = products.filter((product) => {
          return product.product_name === selectedProduct;
        });
        return filteredProducts.reduce((acc, cv) => {
          if (acc.includes(cv.address.state) === false) {
            acc.push(cv.address.state);
          }
          return acc;
        }, []);
      }
      setStateNames(getStateNames());
    }
  }, [selectedProduct, products]);

  useEffect(() => {
    if (products) {
      function getCityNames() {
        const filteredProducts = products.filter(
          (product) => product.address.state === selectedState
        );
        return filteredProducts.reduce((acc, cv) => {
          if (acc.includes(cv.address.city) === false) {
            acc.push(cv.address.city);
          }
          return acc;
        }, []);
      }
      setCityNames(getCityNames());
    }
  }, [selectedState, products, selectedProduct]);

  return (
    <aside className="lg:w-1/4 sm:w-full bg-black lg:flex lg:flex-col items-center mr-10 rounded-lg h-60 mb-20">
      <div className="sm:flex flex-wrap p-5 mb-10 w-full">
        <select
          className="w-full p-2 bg-zinc-900 text-gray-100 mb-5 rounded"
          onChange={(event) => {
            setCityNames(null);
            setSelectedState('State');
            return setSelectedProduct(event.target.value);
          }}
        >
          <option className="p-2 mb-3 rounded">Products</option>
          {products &&
            productNames &&
            productNames.map((product) => {
              return (
                <option value={product} key={product}>
                  {product}
                </option>
              );
            })}
        </select>
        <select
          className="w-full p-2 bg-zinc-900 text-gray-100 mb-5 rounded"
          onChange={(event) => setSelectedState(event.target.value)}
        >
          <option>State</option>
          {products &&
            stateNames &&
            stateNames.map((state) => {
              return (
                <option value={state} key={state}>
                  {state}
                </option>
              );
            })}
        </select>
        <select className="w-full p-2 bg-zinc-900 text-gray-100 mb-5 rounded">
          <option>City</option>
          {products &&
            cityNames &&
            cityNames.map((city) => {
              return (
                <option key={city} value={city}>
                  {city}
                </option>
              );
            })}
        </select>
      </div>
    </aside>
  );
}

export default Sidebar;
