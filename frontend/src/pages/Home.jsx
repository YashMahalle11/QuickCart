
import React, { useState, useEffect } from "react";
import Hero from '../components/Layout/Hero';
import CombineCollectionSection from '../components/Products/CombineCollectionSection';
import LimitedTimeOffers from '../components/Products/LimitedTimeOffers';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
import axios from "axios";


const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => {
    console.log("Current Redux products state:", {
      products: state.products.products,
      loading: state.products.loading,
      error: state.products.error
    });
    return state.products;
  });
  
  const [bestSellerProduct, setBestSellerProduct] = useState(null);
  const [bestSellerError, setBestSellerError] = useState(null);

  useEffect(() => {
    // Debug before fetching
    console.log("Dispatching fetchProductsByFilters");
    
    dispatch(
      fetchProductsByFilters({
        category: [],
        limit: 8,
      })
    )
     // In Home.jsx useEffect

    .then((action) => {
      // Debug after fetching
      if (action.meta.requestStatus === 'fulfilled') {
        console.log("Fetched products:", action.payload);
      } else {
        console.error("Failed to fetch products:", action.error);
      }
    });

    const fetchBestSeller = async () => {
      try {
        console.log("Fetching best seller...");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        console.log("Best seller response:", response.data);
        setBestSellerProduct(response.data);
        setBestSellerError(null);
      } catch (error) {
        console.error("Best seller fetch error:", error);
        setBestSellerError(error.message);
        setBestSellerProduct(null);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
     <div>
      

      <Hero />
      <CombineCollectionSection />
      <LimitedTimeOffers />

      {/* Best Seller */  }
      <div className="mb-12">
        <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        {bestSellerError ? (
          <p className="text-center text-red-500">Failed to load best seller: {bestSellerError}</p>
        ) : bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <p className="text-center">Loading best seller product...</p>
        )}
      </div>

      {/* Product Grid */   }
      <div className='container mx-auto mb-12'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Fresh Products Available
        </h2>
        {error ? (
          <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Failed to load products:</p>
            <p className="font-semibold">{error}</p>
          </div>
        ) : (
          
          <ProductGrid 
            products={products} 
            loading={loading} 
            error={error} 
          />
        
      
        )}
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home; 














/*import React, { useState, useEffect } from "react";
import Hero from '../components/Layout/Hero';
import CombineCollectionSection from '../components/Products/CombineCollectionSection';
import LimitedTimeOffers from '../components/Products/LimitedTimeOffers';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturesSection from '../components/Products/FeaturesSection';
import FilterSidebar from "../components/Products/FilterSidebar";


import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null); 

 
  
    

  useEffect(() => {
    // Fetch products for specific collections (limited to your categories)
    dispatch(
      fetchProductsByFilters({
        category: ["Vegetables", "Fruits", "Dairy Products", "Grains & Pulses"],
        limit: 8,
      })
    );

    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data); // Ensure state updates properly
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero /> 
      <CombineCollectionSection />
      <LimitedTimeOffers /> 

      {/* Best Seller */ //}
 /*     <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller product ...</p>
      )}

      <div className='container mx-auto'>
        <h2 className='text-3xl text-center font-bold mb-4'>
          Fresh Products Available
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>

      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
}

export default Home;   */


/*import React, { useState, useEffect } from "react";
import Hero from '../components/Layout/Hero'
import CombineCollectionSection from '../components/Products/CombineCollectionSection'
import LimitedTimeOffers from '../components/Products/LimitedTimeOffers'
import ProductDetails from '../components/Products/ProductDetails'
import ProductGrid from '../components/Products/ProductGrid'
import FeaturedCollection from '../components/Products/FeaturedCollection'
import FeaturesSection from '../components/Products/FeaturesSection'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from '../redux/slices/productsSlice'
import axios from "axios";



const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    // Fetch best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  },[dispatch]);




  return <div>
        <Hero /> 
        <CombineCollectionSection />
        <LimitedTimeOffers /> 

        {/**Best seller */ //}
 /*       <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
        {bestSellerProduct ? (
            <ProductDetails  productId={bestSellerProduct._id}/>
        ) : (
          <p className="text-center">Loading best seller product ...</p>
        )}
        

        <div className='container mx-auto'>
          <h2 className='text-3xl text-center font-bold mb-4'>
            Top Wears for Women
          </h2>
          <ProductGrid products = {products} loading={loading} error={error} />
        </div>

        <FeaturedCollection />
        <FeaturesSection />
  </div>
}

export default Home  */