
import React from 'react';
import {
  HiOutlineSparkles,
  HiOutlineClock,
  HiOutlineTruck,
  HiOutlineArrowPath
} from 'react-icons/hi2';

const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold">Why choose AgriLink?</h2>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Feature 1 */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-white rounded-full p-4 mb-4 shadow">
            <HiOutlineSparkles className="w-8 h-8 text-gray-700" />
          </div>
          <h4 className="font-semibold text-gray-900">Quality</h4>
          <p className="text-gray-500 text-sm">You can trust</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-white rounded-full p-4 mb-4 shadow">
            <HiOutlineClock className="w-8 h-8 text-gray-700" />
          </div>
          <h4 className="font-semibold text-gray-900">On time</h4>
          <p className="text-gray-500 text-sm">Guarantee</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-white rounded-full p-4 mb-4 shadow">
            <HiOutlineTruck className="w-8 h-8 text-gray-700" />
          </div>
          <h4 className="font-semibold text-gray-900">Free</h4>
          <p className="text-gray-500 text-sm">Delivery</p>
        </div>

        {/* Feature 4 */}
        <div className="bg-gray-100 p-6 rounded-lg flex flex-col items-center">
          <div className="bg-white rounded-full p-4 mb-4 shadow">
            <HiOutlineArrowPath className="w-8 h-8 text-gray-700" />
          </div>
          <h4 className="font-semibold text-gray-900">Return Policy</h4>
          <p className="text-gray-500 text-sm">No Question asked</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;











/*import React from 'react'
import { HiArrowPath, HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2'

const FeaturesSection = () => {
  return (
    <section className='py-16 px-4 bg-white'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center'>
            {/**Feature 1 */ //}
 /*           <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiShoppingBag className='text-xi'/>
                </div>
                <h4 className='tracking-tighter mb-2'>FREE INTERNATIONAL SHIPPING</h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    On all orders over RS 100.00
                </p>
            </div>
             {/**Feature 2 */ //}
 /*            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiArrowPathRoundedSquare className='text-xi'/>
                </div>
                <h4 className='tracking-tighter mb-2'>45 DAYS RETURN</h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    Money back gurantee
                </p>
            </div>
             {/**Feature 3 */ //}
 /*            <div className='flex flex-col items-center'>
                <div className='p-4 rounded-full mb-4'>
                    <HiOutlineCreditCard className='text-xi'/>
                </div>
                <h4 className='tracking-tighter mb-2'>SECURE CHECKOUT</h4>
                <p className='text-gray-600 text-sm tracking-tighter'>
                    100% secure checkout process
                </p>
            </div>
        </div>
    </section>
  )
}

export default FeaturesSection */