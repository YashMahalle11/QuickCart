import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import {
  HiOutlineUser,
  HiBars3BottomRight,
} from "react-icons/hi2"
import { IoMdClose } from "react-icons/io"
import { useSelector } from "react-redux"
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { FaShoppingBasket } from "react-icons/fa";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const navDrawerRef = useRef();

  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Close nav drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navDrawerRef.current && !navDrawerRef.current.contains(event.target)) {
        setNavDrawerOpen(false);
      }
    };

    if (navDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navDrawerOpen]);

  return (
    <>
      <nav className='container mx-auto flex items-center justify-between py-4 px-6'>
        {/* Left - Logo */}
        <div>
          <Link to="/" className='text-2xl font-medium'>
            AgriLink
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className='hidden md:flex space-x-6 w-full justify-center items-center py-2'>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            VEGETABLES
          </Link>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            FRUITS
          </Link>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            DAIRY PRODUCTS
          </Link>
          <Link to="/collections/all" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
            GRAINS & PULSES
          </Link>
        </div>

        {/* Right - Icons */}
        <div className='flex items-center space-x-4'>
          {user && user.role === "admin" && (
            <Link to="/admin" className='block bg-black px-2 rounded text-sm text-white'>
              Admin
            </Link>
          )}
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className='h-6 w-6 text-gray-700' />
          </Link>
          <button onClick={toggleCartDrawer} className='relative hover:text-gray-700'>
            <FaShoppingBasket className='h-6 w-6 text-gray-700' />
            {cartItemCount > 0 && (
              <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>
                {cartItemCount}
              </span>
            )}
          </button>
          <div className='overflow-hidden'>
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Backdrop for Mobile Menu */}
      {navDrawerOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-30"></div>
      )}

      {/* Mobile Navigation */}
      <div
        ref={navDrawerRef}
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Menu</h2>
          <nav className='space-y-4'>
            <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
              VEGETABLES
            </Link>
            <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
              FRUITS
            </Link>
            <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
              DAIRY PRODUCTS
            </Link>
            <Link to="/collections/all" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
              GRAINS & PULSES
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;



/*import React from 'react'
import { Link } from "react-router-dom"
import {HiOutlineUser, HiOutlineShoppingBag ,HiBars3BottomRight,   } from "react-icons/hi2"
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useSelector} from "react-redux"



const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = 
      cart?.products?.reduce((total, product)=> total + product.quantity, 0) || 0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
      setDrawerOpen(!drawerOpen);
  };

  return (
    <>
        <nav className='container mx-auto flex item-center justify-between py-4 px-6'>
            {/*  left - logo */ //}
  /*          <div>
                <Link to="/" className='text-2xl font-medium '>
                AgriLink
                </Link>
            </div>
            {/* Center - Navigation Links */ //}
  /*          <div className='hidden md:flex space-x-6 w-full justify-center items-center py-2'>
                <Link to="/collections/all?category=Vegetables" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                VEGETABLES
                </Link>
                <Link to="/collections/all?category=Fruits" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                FRUITS
                </Link>
                <Link to="/collections/all?category=Dairy+Products" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                DAIRY PRODUCTS
                </Link>
                <Link to="/collections/all?category=Grains+%26+Pulses" className='text-gray-700 hover:text-black text-sm font-medium uppercase'>
                GRAINS & PULSES
                </Link>
            </div>
            {/* Right - icons */ //}
 /*           <div className='flex items-center space-x-4'>
              {user && user.role === "admin" && (
                 <Link to="/admin"
                 className='block bg-black px-2 rounded text-sm text-white'>
                   Admin
                 </Link>
              )}
               
                <Link to="/profile" className="hover:text-black">
                  <HiOutlineUser className='h-6 w-6 text-gray-700' />
                </Link>
                <button onClick={toggleCartDrawer} className='relative hover:text-gray-700'>
                <HiOutlineShoppingBag className='h-6 w-6 text-gray-700' />
                {cartItemCount > 0 && (  <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5'>
                    {cartItemCount}
                 </span>)}
                
                </button>
                {/* search */ //}
    /*            <div className='overflow-hidden'> 
                   <SearchBar />
                </div>
               

                <button onClick={toggleNavDrawer} className="md:hidden">
                    <HiBars3BottomRight className="h-6 w-6 text-gray-700"/>
                </button>

            </div>
        </nav>
        <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

        {/**mobile Navigation */  //}
 /*       <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
         <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
         </div>
         <div className='p-4'>
           <h2 className='text-xl font-semibold mb-4'>Menu</h2>
           <nav className='space-y-4'>
            <Link to="/collections/all?category=Vegetables" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            VEGETABLES
            </Link>
            <Link to="/collections/all?category=Fruits" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            FRUITS
            </Link>
            <Link to="/collections/all?category=Dairy+Products" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            DAIRY PRODUCTS
            </Link>               
            <Link to="/collections/all?category=Grains+%26+Pulses" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>
            GRAINS & PULSES 
            </Link>
           </nav>
         </div>
        
        </div>
    </>
  )
}

export default Navbar */