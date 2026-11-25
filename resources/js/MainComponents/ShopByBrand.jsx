import React, { useState, useEffect, useContext } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { Link, router } from '@inertiajs/react';
import { FaRegEye } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import {usePage} from '@inertiajs/react';
import { MainPartContext } from '@/MainContext/MainContext';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
const ShopByBrand = () => {

  const {props} = usePage();
  const apiUrl = import.meta.env.VITE_APP_URL;

  const {setInfoDialogDetails,setShowInfoDialog,setProductDataReloadTrigger, productDataReloadTrigger,} = useContext(MainPartContext)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allWishlistItems, setAllWishlistItems] = useState([])

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        // Simulated data for demonstration
        const sampleData = await axios.get(route('productbrand.index'))
        setLatestProducts(sampleData.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchLatestProducts();

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getVisibleProducts = () => {
    return screenWidth >= 1024 ? 6 : 2;
  };

  const nextSlide = () => {
    const visibleProducts = getVisibleProducts();
    if (currentIndex < latestProducts.length - visibleProducts) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    const visibleProducts = getVisibleProducts();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(latestProducts.length - visibleProducts);
    }
  };


 


useEffect(()=>{
    const fetchWishlistByUser = async() => {
      try {

        const userId = props?.auth?.user?.id; 
        
        if (userId) {
          const response = await axios.get(route('wishlist.index', { userId }));
          setAllWishlistItems(response.data);
      } else {
          // Handle the case for non-logged-in users
          setAllWishlistItems([]); // or set a default state
      }

      } catch (error) {
        console.log('Error fetching the wishlist data', error)
      }
    }
    fetchWishlistByUser()
  },[productDataReloadTrigger])


  //console.log(latestProducts)

  const clearAllFilters = () => {
    localStorage.removeItem('brandFilters');
    localStorage.removeItem('categoryFilters');
    localStorage.removeItem('typeFilters');
    localStorage.removeItem('searchTerm');
  }

  const handleBrandClick = (brandName) => {
    clearAllFilters();

    const newBrandFilters = [brandName.toString()]; 
    localStorage.setItem('brandFilters', JSON.stringify(newBrandFilters))

    router.get(`/shop?brand=${encodeURIComponent(brandName)}`)
  }

  return (
    <div className="relative w-full  bg-white px-4 pt-4 rounded-md mt-8">
      {/* Carousel container */}
      
      <div>
        <div className='w-full flex justify-between items-center border-b-2 pb-2'>
            <p className='text-2xl font-medium relative before:border-b-4 before:border-tertiary before:w-[75px] before:absolute before:bottom-0 before:mb-[-9px]'>Shop By Brand</p>
            <div className='flex gap-2'>
                <button onClick={prevSlide} aria-label='left'><FaChevronLeft className='text-lg'/></button>
                <button onClick={nextSlide} aria-label='right'><FaChevronRight className='text-lg'/></button>
            </div>
        </div>
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / getVisibleProducts()}%)`,
          }}
        >

          

{
  latestProducts.map((item) =>{
  return(
   
   <div key={item.id} //className=' rounded-md  relative   bg-white py-4 overflow-hidden'
     className={`flex-none w-1/2 lg:w-1/6 px-2 py-6 group cursor-pointer`} 
      onClick={()=>handleBrandClick(item.brand_name)}
     >
      <div className='w-full h-24 lg:h-28  flex justify-center items-center rounded-md border-2'>
        <img src={`${apiUrl}/${item.logo}`} className='w-20 lg:w-24 ' alt={item.brand_name}/>
      </div>
          {/* <img src='https://placehold.co/200x150'/> */}
          {/* <div className='flex gap-2 items-center justify-center group-hover:gap-2.5 transition-all duration-300'>
        <p className='text-center text-base font-medium'>{item.brand_name}</p>
        <BsArrowRight/>
        </div> */}
    </div>
  )
}
  ) 
  }

        </div>
      </div>

      </div>

      
    </div>
  );
};

export default ShopByBrand;
