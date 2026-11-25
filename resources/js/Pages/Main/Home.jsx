import React, { useState, useEffect } from 'react'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import BannerImage from '@/MainComponents/BannerImage'
import { RiMenu2Fill } from 'react-icons/ri'
import { IoChevronDownOutline } from 'react-icons/io5'
import LatestProducts from '@/MainComponents/OnSaleProducts'
import AssuranceSection from '@/Components/AssuranceSection'
import TriBanner from '@/MainComponents/TriBanner'
import FeaturedProducts from '@/MainComponents/FeaturedProducts'
import ShopByBrand from '@/MainComponents/ShopByBrand'
import ShopByCategory from '@/MainComponents/ShopByCategory'
// import { Link } from '@inertiajs/react'
import { Link } from '@inertiajs/inertia-react'
import ProductView from '@/MainComponents/ProductView'
import Solobanner from '@/MainComponents/Solobanner'
import ClientTestimonial from '@/MainComponents/ClientTestimonial'
import TopNavigator from '@/MainComponents/TopNavigator'
import { Head } from '@inertiajs/react'
import FeaturedCategories from '@/MainComponents/FeaturedCategories'
import ShowSection from '@/MainComponents/ShowSection'
import OnSaleProducts from '@/MainComponents/OnSaleProducts'
import CompareNavigator from '@/MainComponents/CompareNavigator'
import NewArrivalSection from '@/MainComponents/NewArrivalSection'
import {FloatingWhatsApp} from 'react-floating-whatsapp'
import SocialsFloat from '@/MainComponents/SocialsFloat'

const Home = () => {
    const [allCategories, setAllCategories] = useState([])
    const [isOpen, setIsOpen] = useState(true)
 useEffect(()=>{
        const fetchCategories = async () => {
            try {
                const response = await axios.get(route('categories.index'))
                setAllCategories(response.data)
            } catch (error) {
                console.log('Error fetching categories', error)
            }
        }
        fetchCategories()
    },[]) 

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
      //fixed sm:top-10 top-8
  return (
    <>
    <Head>
      <title>Kelina International | Best CCTV Cameras & Systems Shop</title>
      <meta name="description" content="Shop best UNV CCTV cameras, network systems & security solutions at Kelina International Nepal. 18MP cameras, complete packages - order now!"/>
    </Head>
    <MainPageWrapper>
      
        <div className='w-full min-h-screen  flex flex-col lg:px-16'>

          <ProductView/>

            <FloatingWhatsApp phoneNumber='+9779856032023' accountName='Kelina International' avatar='https://kelina.com.np/kelinainternationallogo.jpg' chatMessage='Hello, how can we help you?'/>

             {/* <div className='flex gap-12 bg-white -mx-16 px-16'>
            <div className="relative w-64">
        <button
          onClick={toggleDropdown}
          className="w-full flex gap-2 items-center font-medium px-2.5 py-2 bg-accent text-white rounded-t-md"
        >
          <RiMenu2Fill />
          <span>SHOP BY CATEGORY</span>
          <IoChevronDownOutline className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute w-full bg-white   z-50 mt-4 h-[500px] overflow-scroll hidden-scrollable-div rounded-md">
            <ul className="py-2 ">
              {allCategories.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-1 hover:bg-gray-100 cursor-pointer text-[1.05rem]"
                  onClick={() => {
                    // Add your category selection logic here
                    console.log(`Selected category: ${item.Category_name}`);
                  }}
                >
                  {item.Category_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='sm:flex gap-8 hidden items-end'>  
      <Link className='text-lg font-medium border-2'>Home</Link>
      <Link href='/shop' className='text-lg font-medium border-2'>Shop</Link>
      <button className='text-lg font-medium'>Blog</button>
      <button className='text-lg font-medium'>Contact</button>
      </div>
        </div>    */}


            <div className='sm:ml-[25%] lg:ml-[25%] xl:ml-[15%] p-2 sm:p-0'>   
            <BannerImage/>
            </div>


            <FeaturedCategories/>

           

            {/* <LatestProducts/> */}

            <OnSaleProducts/>

            <NewArrivalSection/>

            <ShowSection/>

            <TriBanner/>

            {/* <FeaturedProducts/> */}

            <ShopByBrand/>

            <Solobanner/>

            <ShopByCategory/>

            <ClientTestimonial/>
            <AssuranceSection/>
           <TopNavigator/>
           <CompareNavigator/>

           <SocialsFloat/>
        </div>
    </MainPageWrapper>
    </>
  )
}

export default Home