import React, { useEffect, useRef } from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartContents from "../Cart/CartContents";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const drawerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                if (drawerOpen) {
                    toggleCartDrawer();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [drawerOpen, toggleCartDrawer]);

    const handleCheckout = () => {
        toggleCartDrawer();
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
            ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
            ref={drawerRef}
        >
            {/* Close Button */}
            <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            {/* Cart Contents with Scrollable Area */}
            <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            {/* Checkout Button Fixed at the Bottom */}
            <div className='p-4 bg-white sticky bottom-0'>
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button
                            onClick={handleCheckout}
                            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
                        >
                            Checkout
                        </button>
                        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                            Secure payment and fast delivery.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer;





/*import React from 'react';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartContents from "../Cart/CartContents";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
    const navigate = useNavigate();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const userId = user ? user._id : null;

    const handleCheckout = () => {
        toggleCartDrawer();
        if (!user) {
            navigate("/login?redirect=checkout");
        } else {
            navigate("/checkout");
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 
            ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Close Button */ //}
 /*           <div className='flex justify-end p-4'>
                <button onClick={toggleCartDrawer}>
                    <IoMdClose className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            {/* Cart Contents with Scrollable Area */ //}
  /*          <div className='flex-grow p-4 overflow-y-auto'>
                <h2 className='text-xl font-semibold mb-4'>Your Cart</h2>
                {cart && cart?.products?.length > 0 ? (
                    <CartContents cart={cart} userId={userId} guestId={guestId} />
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>

            {/* Checkout Button Fixed at the Bottom */ //}
      /*      <div className='p-4 bg-white sticky bottom-0'>
                {cart && cart?.products?.length > 0 && (
                    <>
                        <button
                            onClick={handleCheckout}
                            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition'
                        >
                            Checkout
                        </button>
                        <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                            Secure payment and fast delivery.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default CartDrawer; */
















/*import React from 'react'
import { IoMdClose } from "react-icons/io";
import CartContents from "../cart/CartContents";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CartDrawer = ({ drawerOpen, toggleCartDrawer}) => {
     
       const navigate = useNavigate();
       const { user, guestId } = useSelector((state) => state.auth);
       const { cart } = useSelector((state) => state.cart);
       const userId = user ? user._id : null;

       const handleCheckout = () => {
           toggleCartDrawer();
           if (!user){
            navigate("/login?redirect=checkout");
           }else{
            navigate("/checkout");
           }
       };

  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${drawerOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
        {/* close Button */ //}
 /*       <div className='flex justify-end p-4'>
            <button onClick={toggleCartDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600"/>
            </button>
        </div>
        {/* cart contents with scrollable area */ //}
 /*       <div className='flex-grow p-4 overflow-y-auto'>
            <h2 className='text-xl font-semibold mb-4'>your cart</h2>
            {cart && cart?.products?.length > 0 ? (<CartContents cart={cart} userId={userId} guestId={guestId} />) : (
                <p>Your cart is empty.</p>
            )}
        </div>


        {/*checkout button fixed at the bottom */ //}
 /*       <div className='p-4 bg-white sticky bottom-0'>
            {cart && cart?.products?.length > 0 && (
                <>
                  <button 
                     onClick={handleCheckout}
                     className='w-full bg-black text-white py-3 roundrd-lg font-semibold hover:bg-gray-800 transition'>Checkout</button>
                     <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
                         this text is present at cartdrawer.yasgjsx.
                     </p>
                
                </>
            )}
            
        </div>

    </div>
  )
}

export default CartDrawer */