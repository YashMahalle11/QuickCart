import React from "react";
import { Link } from "react-router-dom";

// ✅ Loading Spinner Component
const LoadingSpinner = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    <p className="mt-2 text-gray-600">Loading products...</p>
  </div>
);

// ✅ Error Display Component
const ErrorDisplay = ({ message }) => (
  <div className="text-center py-8 bg-red-50 rounded-lg">
    <p className="text-red-500 font-semibold">Error loading products:</p>
    <p className="text-red-600">{message}</p>
  </div>
);

// ✅ Empty State Component
const EmptyState = () => (
  <div className="text-center py-8">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
  </div>
);

const ProductGrid = ({ products = [], loading, error }) => {
  // console.log line was here

  // ✅ Handle states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!Array.isArray(products) || products.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const imageUrl =
          product.images &&
          product.images.length > 0 &&
          product.images[0].url &&
          product.images[0].url.trim() !== ""
            ? product.images[0].url
            : "/placeholder.jpg";

        return (
          <Link key={product._id} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col">
              {/* ✅ Product Image */}
              <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={imageUrl}
                  alt={product.images?.[0]?.altText || product.name || "Product image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                    e.target.className = "w-full h-full object-contain p-4";
                  }}
                />
              </div>

              {/* ✅ Product Info */}
              <div className="flex-grow">
                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mb-1">
                  Sold by: {product.seller || "Unknown Seller"}
                </p>

                <p className="text-gray-700 font-medium text-sm">
                  {product.discountPrice ? (
                    <>
                      <span className="text-red-500 font-bold">
                        Rs {product.discountPrice}{" "}
                      </span>
                      <span className="text-gray-400 line-through">
                        Rs {product.price}
                      </span>
                    </>
                  ) : (
                    <>Rs {product.price}</>
                  )}
                </p>

                {product.category && (
                  <p className="text-xs text-gray-500 mt-1 bg-green-100 inline-block px-2 py-1 rounded">
                    {product.category}
                  </p>
                )}

                <p
                  className={`mt-2 text-sm font-medium ${
                    product.countInStock > 0 ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {Number(product.countInStock || 0) > 0
                    ? `In Stock (${product.countInStock} ${product.unit || ""})`
                    : "Out of Stock"}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;

/*import React from "react";
import { Link } from "react-router-dom";

// ✅ Loading Spinner Component
const LoadingSpinner = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    <p className="mt-2 text-gray-600">Loading products...</p>
  </div>
);

// ✅ Error Display Component
const ErrorDisplay = ({ message }) => (
  <div className="text-center py-8 bg-red-50 rounded-lg">
    <p className="text-red-500 font-semibold">Error loading products:</p>
    <p className="text-red-600">{message}</p>
  </div>
);

// ✅ Empty State Component
const EmptyState = () => (
  <div className="text-center py-8">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
  </div>
);

const ProductGrid = ({ products = [], loading, error }) => {
  console.log("🔍 ProductGrid received:", { products, loading, error });

  // ✅ Handling different states
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!Array.isArray(products) || products.length === 0) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        // ✅ Ensure product has an image
        const imageUrl =
        product.images &&
        product.images.length > 0 &&
        product.images[0].url &&
        product.images[0].url.trim() !== ""
          ? product.images[0].url
          : "/placeholder.jpg";
      

        return (
          <Link key={product._id} to={/product/${product._id}} className="block">
            <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col">
              
              {/* ✅ Product Image */ //}
    /*          <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={imageUrl}
                  alt={product.images?.[0]?.altText || product.name || "Product image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                    e.target.className = "w-full h-full object-contain p-4";
                  }}
                />
              </div>

              {/* ✅ Product Info */ //}
   /*           <div className="flex-grow">
                <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm mb-1">
                  Sold by: {product.seller || "Unknown Seller"}
                </p>

                <p className="text-gray-700 font-medium text-sm">
                  {product.discountPrice ? (
                    <>
                      <span className="text-red-500 font-bold">
                        Rs {product.discountPrice}{" "}
                      </span>
                      <span className="text-gray-400 line-through">
                        Rs {product.price}
                      </span>
                    </>
                  ) : (
                    <>Rs {product.price}</>
                  )}
                </p>

                {product.category && (
                  <p className="text-xs text-gray-500 mt-1 bg-green-100 inline-block px-2 py-1 rounded">
                    {product.category}
                  </p>
                )}

                <p
                  className={mt-2 text-sm font-medium ${
                    product.countInStock > 0 ? "text-green-600" : "text-red-500"
                  }}
                >
                  {Number(product.countInStock || 0) > 0
                       ? In Stock (${product.countInStock} ${product.unit || ""})
                       : "Out of Stock"}

                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid; */




/*import React from "react";
import { Link } from "react-router-dom";

// Define the missing components
const LoadingSpinner = () => (
  <div className="text-center py-8">
    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    <p className="mt-2 text-gray-600">Loading products...</p>
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div className="text-center py-8 bg-red-50 rounded-lg">
    <p className="text-red-500 font-semibold">Error loading products:</p>
    <p className="text-red-600">{message}</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-8">
    <svg
      className="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters</p>
  </div>
);

const ProductGrid = ({ products = [], loading, error }) => {
  console.log("ProductGrid received:", { products, loading, error });

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;
  if (!products.length) return <EmptyState />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product._id} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 h-full flex flex-col">
            {/* Product Image */  //}
   /*         <div className="w-full aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.images?.[0]?.url || "/placeholder.jpg"}
                alt={product.images?.[0]?.altText || product.name || "Product image"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                  e.target.className = "w-full h-full object-contain p-4";
                }}
              />
            </div>

            {/* Product Info */ //}
    /*        <div className="flex-grow">
              <h3 className="text-md font-semibold text-gray-800 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm mb-1">
                Sold by: {product.seller || "Unknown Seller"}
              </p>

              <p className="text-gray-700 font-medium text-sm">
                {product.discountPrice ? (
                  <>
                    <span className="text-red-500 font-bold">
                      Rs {product.discountPrice}{" "}
                    </span>
                    <span className="text-gray-400 line-through">
                      Rs {product.price}
                    </span>
                  </>
                ) : (
                  <>Rs {product.price}</>
                )}
              </p>

              {product.category && (
                <p className="text-xs text-gray-500 mt-1 bg-green-100 inline-block px-2 py-1 rounded">
                  {product.category}
                </p>
              )}

              <p
                className={`mt-2 text-sm font-medium ${
                  product.stock > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} ${product.unit || ""})`
                  : "Out of Stock"}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid; */








/*import React from "react";
import { Link } from "react-router-dom";

/*const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
  }*/
/*    const ProductGrid = ({ products = [], loading, error }) => {
      console.log("ProductGrid received:", { products, loading, error }); // Debugging
    
      if (loading) return <LoadingSpinner />;
      if (error) return <ErrorDisplay message={error} />;
      if (!products.length) return <EmptyState />;
    
      // ... rest of your component

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            {/* Product Image */ //}
/*            <div className="w-full h-96 mb-4">
              <img
                src={product.images && product.images.length > 0 ? product.images[0].url : "/placeholder.jpg"}
                alt={product.images && product.images.length > 0 ? product.images[0].altText || product.name : "No Image"}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Product Name */ //}
 /*           <h3 className="text-md font-semibold text-gray-800 truncate">{product.name}</h3>

            {/* Seller Name */ //}
 /*           <p className="text-gray-500 text-sm mb-1">Sold by: {product.seller || "Unknown Seller"}</p>

            {/* Product Price & Discount */ //}
/*            <p className="text-gray-700 font-medium text-sm">
              {product.discountPrice ? (
                <>
                  <span className="text-red-500 font-bold">Rs {product.discountPrice} </span>
                  <span className="text-gray-400 line-through">Rs {product.price}</span>
                </>
              ) : (
                <>Rs {product.price}</>
              )}
            </p>

            {/* ✅ Fix: Only Show Category if Available */ //}
/*            {product.category && (
              <p className="text-xs text-gray-500 mt-1 bg-green-100 inline-block px-2 py-1 rounded">
                {product.category}
              </p>
            )}

            {/* Stock Availability */ //}
 /*           <p className={`mt-2 text-sm font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} ${product.unit || ""})` : "Out of Stock"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;





/*import React from 'react'
import {Link} from "react-router-dom";

const ProductGrid = ({products, loading, error}) => {
    if (loading) {
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error}</p>
    }
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products.map((product,index)=>(
            <Link key={index} to={`/product/${product._id}`} className='block'>
                <div className='bg-white p-4 rounded-lg'>
                    <div className='w-full h-96 mb-4'>
                        <img src={product.images[0].url} alt={product.images[0].alText || product.name} className='w-full h-full object-cover rounded-lg' />
                    </div>
                    <h3 className='text-sm mb-2'>{product.name}</h3>
                    <p className='text-gray-500 font-medium text-sm tracking-tighter'>
                        Rs {product.price}
                    </p>
                </div>
            </Link>
        ))}
    </div>
  )
}


export default ProductGrid  */