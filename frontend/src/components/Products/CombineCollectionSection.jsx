
import React from 'react'
import vegetables from "../../assets/vegie.jpg";
import fruits from "../../assets/fruits.jpg";
import dairy from "../../assets/dairy.jpg";
import grains from "../../assets/pulses.jpg";
import { Link } from "react-router-dom";

const CombineCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        
        {/* Vegetables collection */}
        <div className='relative'>
          <img src={vegetables} alt="vegetables collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Vegetables
            </h2>
            <Link to="/collections/all?category=Vegetables" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

        {/* Fruits collection */}
        <div className='relative'>
          <img src={fruits} alt="fruits collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Fruits
            </h2>
            <Link to="/collections/all?category=Fruits" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

        {/* Dairy Products collection */}
        <div className='relative'>
          <img src={dairy} alt="dairy products collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Dairy Products
            </h2>
            <Link to="/collections/all?category=Dairy+Products" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

        {/* Grains & Pulses collection */}
        <div className='relative'>
          <img src={grains} alt="grains & pulses collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Grains & Pulses
            </h2>
            <Link to="/collections/all?category=Grains+%26+Pulses" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CombineCollectionSection



/*import React from 'react'
import mensCollectionImage from "../../assets/vegie.jpg"
import vegetables from "../../assets/vegie.jpg"
import { Link } from "react-router-dom";

const CombineCollectionSection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {/* Vegetables collection */ //}
   /*     <div className='relative'>
          <img src={vegetables} alt="vegetables collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Vegetables
            </h2>
            <Link to="/collections/vegetables" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

        {/* Fruits collection */ //}
  /*      <div className='relative'>
          <img src={fruits} alt="fruits collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Fruits
            </h2>
            <Link to="/collections/fruits" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

        {/* Dairy Products collection */ //}
 /*       <div className='relative'>
          <img src={mensCollectionImage} alt="dairy products collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Dairy Products
            </h2>
            <Link to="/collections/dairy-products" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>

        {/* Grains & Pulses collection */ //}
 /*       <div className='relative'>
          <img src={mensCollectionImage} alt="grains & pulses collection" className='w-full h-[700px] object-cover'/>
          <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-3'>
              Grains & Pulses
            </h2>
            <Link to="/collections/grains-pulses" className="text-gray-900 underline">Shop Now</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CombineCollectionSection */








/*import React from 'react'
 import mensCollectionImage from "../../assets/mens-Collection.webp"
 import womensCollectionImage from "../../assets/womens-Collection.webp"
 import { Link } from "react-router-dom";

 
 const CombineCollectionSection = () => {
   return (
     <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            {/**vegetables nad fruits collection */ //}
 /*           <div className='relative flex-1'>
                <img src={womensCollectionImage} alt="women's collection" className='w-full h-[700px] object-cover'/>
                <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Vegitable's & Fruits
                    </h2>
                    <Link to="/collections/all?gender=women" className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
            {/**Dairy products */  //}
            
 /*           <div className='relative flex-1'>
                <img src={mensCollectionImage} alt="men's collection" className='w-full h-[700px] object-cover'/>
                <div className='absolute bottom-8 left-8 bg-white bg-opacity-90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Dairy Products
                    </h2>
                    <Link to="/collections/all?gender=men" className="text-gray-900 underline">Shop Now</Link>
                </div>
            </div>
        </div>

     </section>
   )
 }
 
 export default CombineCollectionSection */