

import React, { useEffect, useState, useRef } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    const queryParams = Object.fromEntries([...searchParams]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-grow">
                {/* Sidebar */   }
                 <div
                    ref={sidebarRef}
                    className={`${
                        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed inset-y-0 left-0 w-180 flex-shrink-0 bg-white shadow-lg transition-transform duration-300 lg:static lg:translate-x-0 z-50`}
                >
                    <FilterSidebar />
                </div>

                {/* Mobile overlay */ }
                 {isSidebarOpen && (
                    <div
                        onClick={toggleSidebar}
                        className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
                    />
                )}

                {/* Main content */  }
                  <div className="flex-grow p-4 lg:ml-180">
                    <button
                        onClick={toggleSidebar}
                        className="lg:hidden border p-2 flex justify-center items-center mb-4"
                    >
                        <FaFilter className="mr-2" /> Filters
                    </button>

                    <h2 className="text-2xl uppercase mb-4">{collection} Collection</h2>

                    <SortOptions />
                    <ProductGrid products={products} loading={loading} error={error} />
                </div>
            </div>
        </div>
    );
};

export default CollectionPage; 




/*import React, { useEffect, useState, useRef } from 'react';
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    const { products, loading, error } = useSelector((state) => state.products);

    const queryParams = Object.fromEntries([...searchParams]);
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */ //}
 /*           <div
                ref={sidebarRef}
                className={`${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } fixed inset-y-0 left-0 w-64 bg-white shadow-lg transition-all duration-300 lg:static lg:translate-x-0 lg:w-64 lg:h-auto lg:shadow-none z-50`}
            >
                <FilterSidebar />
            </div>

            {/* Mobile overlay */ //}
 /*           {isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
                />
            )}

            {/* Main content */ //}
 /*           <div className="flex-grow p-4 lg:ml-64">
                {/* Mobile filter toggle button */ //}
    /*            <button
                    onClick={toggleSidebar}
                    className="lg:hidden border p-2 flex justify-center items-center mb-4"
                >
                    <FaFilter className="mr-2" /> Filters
                </button>

                <h2 className="text-2xl uppercase mb-4">{collection} Collection</h2>

                {/* Sort Options */ //}
     /*           <SortOptions />

                {/* Product Grid */ //}
     /*           <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default CollectionPage; */










/*import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    
    // Fix: Use state.products instead of state.product
    const { products, loading, error } = useSelector((state) => state.products);
    
    const queryParams = Object.fromEntries([...searchParams]);
   
    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParams]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-col lg:flex-row'>
            {/**Mobile Filter Button */ //}
  /*          <button 
                onClick={toggleSidebar}
                className='lg:hidden border p-2 flex justify-center items-center mb-4'
            >
                <FaFilter className='mr-2' /> Filters
            </button>

            {/** Filter sidebar */ //}
  /*          <div 
                ref={sidebarRef} 
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 lg:w-72`}
            >
                <FilterSidebar />
            </div>
            
            <div className='flex-grow p-4 '>
                <h2 className='text-2xl uppercase mb-4'>{collection} Collection</h2>
                
                {/**sort option */ //}
  /*              <SortOptions />

                {/**Product Grid */ //}
  /*              <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default CollectionPage;*/










/*import React, { useEffect, useRef, useState  } from 'react'
import  {FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';

const CollectionPage = () => {
        const { collection } = useParams();
        const [searchParams] = useSearchParams();
        const dispatch = useDispatch();
        const { product, loading, error } = useSelector((state) => state.product);
        const queryParams = Object.fromEntries([...searchParams]);
       
        const sidebarRef = useRef(null);
        const [isSidebarOpen , setIsSidebarOpen] = useState(false);

        useEffect(()=> {
            dispatch(fetchProductsByFilters({collection, ...queryParams}));
        }, [dispatch, collection, searchParams]);


        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        };

        const handleClickOutside = (e) => {
            //close sidebar if clicked outside 
            if(sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        useEffect(() =>{
            //Add Event Listner for Clicks 
            document.addEventListener("mousedown",handleClickOutside);
            //clean Event listner
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        },[]);

      
    
  return (
    <div className='flex flex-col lg:flex-row'>
        {/**Mobile Filter Button */ //}
   /*     <button 
        onClick={toggleSidebar}
        className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2' /> Filters
        </button>

        {/** Filter  sidebar*/ //}
  /*      <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar />
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>All Collection</h2>
            {/**sort option */ //}
   /*         <SortOptions />

            {/**Product Grid *///}
    /*        <ProductGrid products={products} loading={loading} error={error} />
        </div>
    </div>
  );
};

export default CollectionPage */