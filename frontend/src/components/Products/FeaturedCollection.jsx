
import React from 'react'
import featured from "../../assets/featuredcollectionfinal.jpg";
import { Link } from 'react-router-dom';

const FeaturedCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
      <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
        
        {/** Left content */}
        <div className='lg:w-1/2 p-8 text-center lg:text-left'>
          <h2 className='text-lg font-semibold text-gray-700 mb-2'>
            Rooted in Tradition, Growing with Innovation
          </h2>
          <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
            Empowering Maharashtra’s Farmers, One Step at a Time
          </h2>
          <p className='text-lg text-gray-600 mb-6'>
            From the rich soils of Vidarbha to the lush fields of Kolhapur, our farmers nurture the land with care, courage, and commitment. 
            Discover fresh, local, and sustainable produce—straight from the hands that feed the nation.
          </p>
          <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
            Explore Now
          </Link>
        </div>

        {/** Right content */}
        <div className='lg:w-1/2'>
          <img src={featured} alt="Featured Collection" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
        </div>
        
      </div>
    </section>
  )
}

export default FeaturedCollection



/*import React from 'react'
import featured from "../../assets/featured.webp";
import { Link } from 'react-router-dom';

const FeaturedCollection = () => {
  return (
    <section className='py-16 px-4 lg:px-0'>
        <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
             {/**left content */ //}
  /*           <div className='lg:w-1/2 p-8 text-center lg:text-left'>
              <h2 className='text-lg font-semibold text-gray-700 mb-2'>
                Comfort and Style text at FeaturedCollectionyash.mahallejsx
              </h2>
              <h2 className='text-4xl lg:text-5xl font-bold mb-6'>
                Apparel made for your everyday life
              </h2>
              <p className='text-lg text-gray-600 mb-6'>
                ghd dgg ydvgydvvghd v vdgyv vdgyv hudhjbhdv  hvghdv v vdvgug
                 ydvjhdvh  hdh j dhj bd h gvdy g hd g hdh gu hhjdh g hdgj hd 
              </p>
              <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800">
               Shop Now
              </Link>
             </div>

             {/**Right content */ //}
 /*            <div className='lg:w-1/2'>
             <img src={featured} alt="Featured Collection" className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' />
             
             </div>
        </div>
    </section>
  )
}

export default FeaturedCollection */