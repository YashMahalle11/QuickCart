
import React from 'react'
import { Link } from 'react-router-dom';
import {TbBrandMeta} from "react-icons/tb"
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from "react-icons/fi"



const Footer = () => {
  return <footer className='border-t py-12'>
    <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ml-8'>
        <div>
            <h3 className='text-lg text-gray-800 mb-4'>🌾 Newsletter</h3>
            <p className='text-gray-500 mb-4'>
            Stay connected with AgriLink!
            Get the latest updates on fresh farm produce, seasonal deals, and exclusive offers — delivered straight from our farms to your inbox. 
            </p>
            <p className='font-medium text-sm text-gray-600 mb-6'>
                Sign up now and get 10% off your first order of fresh produce!
            </p>
            {/**Newsletter form */ }
            <form className='flex'>
                <input type="email" placeholder="Enter your Email" className='p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all ' required />
                <button type="submit" className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
            </form>
        </div>

        {/**shop links */   }
        <div>
            <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
            <ul className='space-y-2 text-gray-600'>
                <li>
                    <Link to="/collections/all?category=Vegetables" className='hover:text-gray-500 transition-colors '>VEGETABLES</Link>
                </li>
                <li>
                    <Link to="/collections/all?category=Fruits" className='hover:text-gray-500 transition-colors '>FRUITS</Link>
                </li>
                <li>
                    <Link to="/collections/all?category=Dairy+Products" className='hover:text-gray-500 transition-colors '>DAIRY PRODUCTS</Link>
                </li>
                <li>
                    <Link to="/collections/all?category=Grains+%26+Pulses" className='hover:text-gray-500 transition-colors '>GRAINS & PULSES</Link>
                </li>
            </ul>
        </div>
        {/**Support Links */ }
        <div>
            <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
            <ul className='space-y-2 text-gray-600'>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors '>Contact Us</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors '>About Us</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors '>FAQs</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500 transition-colors '>Features</Link>
                </li>
            </ul>
        </div>
        {/*Follow us */ }
        <div>
            <h3 className='text-lg text-gray-800 mb-4'>Follow Us</h3>
            <div className='flex items-center space-x-4 mb-6'>
                <a 
                  href='https://www.instagram.com/yash_mahalle_?igsh=Z2RpcTRtcXVqbnJ0' 
                  target='"_blank' 
                  rel="noopener noreferrer" 
                  className='hover:text-gray-500'
                >
                  <TbBrandMeta className='h-5 w-5'/>
                </a>
                <a 
                  href='https://www.instagram.com/yash_mahalle_?igsh=Z2RpcTRtcXVqbnJ0' 
                  target='"_blank' 
                  rel="noopener noreferrer" 
                  className='hover:text-gray-500'
                >
                  <IoLogoInstagram className='h-5 w-5'/>
                </a>
                <a 
                  href='https://x.com/YashMahalle_11?t=m8_h9nt7GP7sIjE6e-cRHA&s=09' 
                  target='"_blank' 
                  rel="noopener noreferrer" 
                  className='hover:text-gray-500'
                >
                  <RiTwitterXLine className='h-4 w-4'/>
                </a>
               
            </div>
            <p className='text-gray-500' >Call Us</p>
            <p>
                <FiPhoneCall className='inline-block mr-2' />
                8329695309
            </p>
        </div>
    </div>
    {/**Footer Bottom */ }
    <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6'>
        <p className='text-gray-500 text-sm tracking-tighter text-center'> © 2025, CompileTab. All Rights Reserved.</p>
    </div>
  </footer>
  
}

export default Footer 