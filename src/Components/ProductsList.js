import React, { useRef } from 'react';

function ProductsList(props) {

  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const products = props.products;
  return (
    <div
      className="flex mb-5 flex-nowrap mt-5 w-full overflow-x-scroll bg-black  relative no-scrollbar scroll-smooth rounded-2xl pl-5"
      ref={ref}
    >
      {products &&
        products.map((product) => {
          return (
            <div
              className="flex flex-col justify-between mb-5 bg-zinc-900 min-w-full sm:min-w-[50%] md:min-w-[27%] p-2 m-2 mt-5 rounded-lg flex-grow-0 pl-5 mr-10"
              key={`${product.date}${product.brand_name}`}
            >
              <div className="flex">
                <div className="w-1/2 mr-4 min-h-[45%]">
                  <img
                    src={product.image}
                    alt={product.product_name}
                    className=" w-fit h-fit"
                  />
                </div>
                <div className="w-1/2 flex flex-col justify-between">
                  <span className="text-xs text-gray-200 ">
                    {product.product_name.split(' ').slice(0, 3).join(' ')}
                  </span>
                  <span className="text-xs text-gray-500">
                    Brand: {product.brand_name}
                  </span>
                  <span className="text-xs text-gray-300">
                    Price: {product.price}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                <p className="flex justify-between text-xs text-gray-400">
                  <span>City: {product.address.city}</span>{' '}
                  <span>Date: {product.date.slice(0, 10)}</span>
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-5">
                Description: {product.discription}
              </p>
            </div>
          );
        })}
      {products && products.length > 3 && (
        <div className="text-white sticky sm:sticky md:sticky -right-5 z-10 sm:z-10 bg-zinc-900 min-w-[10%] flex items-center justify-center">
          <button
            className="text-6xl font-thin hover:text-green-500 hover:shadow-lg"
            onClick={() => scroll(120)}
          >
            &#x203A;
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsList;
