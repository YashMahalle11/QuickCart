
import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../redux/slices/cartSlice";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, delta, quantity, unit, weight, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          unit,
          weight,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, unit, weight, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        unit,
        weight,
        color,
      })
    );
  };

  if (!cart?.products?.length) {
    return (
      <div className="py-6 text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div>
      {cart.products.map((product) => {
        const selectedColor = product.colors?.[0] || "Default";

        return (
          <div
            key={product.productId}
            className="flex items-start justify-between py-4 border-b"
          >
            <div className="flex items-start">
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />

              {/* Product Details */}
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Category: {product.category} | Type: {product.type} | Unit: {product.unit} | Weight: {product.weight}
                </p>
                <p className="text-sm text-gray-500">
                  Freshness: {product.freshness} | Brand: {product.brand?.join(", ") || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  Available Colors: {product.colors?.join(", ") || "N/A"}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.unit,
                        product.weight,
                        selectedColor
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.unit,
                        product.weight,
                        selectedColor
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-medium"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price and Remove Button */}
            <div className="text-right">
              <p className="text-lg font-medium">
              ₹
                {product.discountPrice
                  ? product.discountPrice.toLocaleString()
                  : product.price.toLocaleString()}
              </p>
              <button
                aria-label="Remove from cart"
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.unit,
                    product.weight,
                    selectedColor
                  )
                }
              >
                <RiDeleteBinLine className="h-6 w-6 mt-2 text-red-600 hover:text-red-800" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;


/*import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { updateCartQuantity, removeFromCart } from "../../redux/slices/cartSlice"; // ✅ Correct thunk import

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or subtracting quantity
  const handleAddToCart = (productId, delta, quantity, unit, weight, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          unit,
          weight,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, unit, weight, color) => {
    dispatch(
      removeFromCart({
        productId,
        guestId,
        userId,
        unit,
        weight,
        color,
      })
    );
  };

  return (
    <div>
      {cart.products.map((product) => (
        <div key={product.productId} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            {/* Product Image */ //}
/*            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />

            {/* Product Details */ //}
  /*          <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Category: {product.category} | Type: {product.type} | Unit: {product.unit} | Weight: {product.weight}
              </p>
              <p className="text-sm text-gray-500">
                Freshness: {product.freshness} | Brand: {product.brand?.join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                Available Colors: {product.colors?.join(", ") || "N/A"}
              </p>

              {/* Quantity Controls */ //}
  /*            <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.unit,
                      product.weight,
                      product.colors[0]
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.unit,
                      product.weight,
                      product.colors[0]
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price and Remove Button */ //}
 /*         <div>
            <p>
              $
              {product.discountPrice
                ? product.discountPrice.toLocaleString()
                : product.price.toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.unit,
                  product.weight,
                  product.colors[0]
                )
              }
            >
              <RiDeleteBinLine className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents; */




/*import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
//import { updateCartItemQuantity, removeFromCart } from "../redux/cartSlice";
import { updateCartItemQuantity, removeFromCart } from "../../redux/slices/cartSlice";


const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or subtracting quantity
  const handleAddToCart = (productId, delta, quantity, unit, weight, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          unit,
          weight,
          color,
        })
      );
    }
  };

  const handleRemoveFromCart = (productId, unit, weight, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, unit, weight, color }));
  };

  return (
    <div>
      {cart.products.map((product, index) => (
        <div key={index} className="flex items-start justify-between py-4 border-b">
          <div className="flex items-start">
            {/* Product Image */ //}
/*            <img src={product.image} alt={product.name} className="w-20 h-24 object-cover mr-4 rounded" />

            {/* Product Details */ //}
 /*           <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Category: {product.category} | Type: {product.type} | Unit: {product.unit} | Weight: {product.weight}
              </p>
              <p className="text-sm text-gray-500">
                Freshness: {product.freshness} | Brand: {product.brand?.join(", ")}
              </p>
              <p className="text-sm text-gray-500">
                Available Colors: {product.colors?.join(", ") || "N/A"}
              </p>

              {/* Quantity Controls */ //}
  /*            <div className="flex items-center mt-2">
                <button
                  onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.unit, product.weight, product.colors[0])}
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.unit, product.weight, product.colors[0])}
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price and Remove Button */ //}
 /*         <div>
            <p>
              $
              {product.discountPrice
                ? product.discountPrice.toLocaleString()
                : product.price.toLocaleString()}
            </p>
            <button onClick={() => handleRemoveFromCart(product.productId, product.unit, product.weight, product.colors[0])}>
              <RiDeleteBinLine className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents; */














/*import React from 'react'
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";




const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if(newQuantity >= 1){
      dispatch(
        updateCartItemQuantity(
          {
            productId,
            quantity: newQuantity,
            guestId,
            userId,
            size,
            color,
          }
        )
      );
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };
  
  return (
    <div>
        {cart.products.map((product,index) =>(
                <div 
                  key={index} 
                  className='flex items-start justify-between py-4 border-b'
                >
                  <div className='flex items-start' > 
                    <img src={product.image} ail={product.name} className="w-20 h-24 object-cover mr-4 rounded " />
                    <div>
                        <h3>{product.name}</h3>
                        <p className="text-sm text-gray-500">
                            size: {product.size} | color: {product.color}
                        </p>
                        <div className='flex items-center mt-2'>
                            <button
                              onClick={()=> 
                                 handleAddToCart(
                                  product.productId,
                                  -1,
                                  product.quantity,
                                  product.size,
                                  product.color
                                 )
                              }
                             className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                            <span className='mx-4'>{product.quantity}</span>
                            <button
                              onClick={()=> 
                                handleAddToCart(
                                 product.productId,
                                 1,
                                 product.quantity,
                                 product.size,
                                 product.color
                                )
                             }
                             className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                        </div>
                    </div> 
                  </div> 
                  <div>
                     <p>$ {product.price.toLocaleString()}</p>
                     <button 
                       onClick={() => 
                        handleRemoveFromCart(
                          product.productId,
                          product.size,
                          product.color
                        )
                       }
                     >
                        <RiDeleteBinLine className='h-6 w-6 mt-2 text-red-600' />
                     </button>
                  </div>

                </div>
            ))}
    </div>
  )
}
 
export default CartContents */