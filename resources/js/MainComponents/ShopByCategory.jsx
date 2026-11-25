import React, { useState, useEffect, useContext } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { FaRegEye } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import {usePage} from '@inertiajs/react';
import { MainPartContext } from '@/MainContext/MainContext';
import axios from 'axios';
import { BsArrowRight } from "react-icons/bs";
import {router} from '@inertiajs/react'


const getMaxLength = () => {
  if(window.innerWidth <= 1360) {
    return 8;
  }
  else return 12;
}
const ShopByCategory = () => {

  const {props} = usePage();
  const apiUrl = import.meta.env.VITE_APP_URL;

  const {setInfoDialogDetails,setShowInfoDialog,setProductDataReloadTrigger, productDataReloadTrigger,} = useContext(MainPartContext)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allWishlistItems, setAllWishlistItems] = useState([])

  const [maxLength, setMaxLength] = useState(getMaxLength());
  
  useEffect(() => { 
    setMaxLength(getMaxLength());
  },[screenWidth])

  const truncateString = (string, maxLength) => {
    return string.length > maxLength ? string.substring(0, maxLength - 3) + '...' : string;
  } 

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        // Simulated data for demonstration
        const sampleData = await axios.get(route('category.items'))
        //console.log(sampleData)
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

  const handleCategoryClick = (categoryId) => {
    
    clearAllFilters();

    const newCategoryFilters = [categoryId.toString()];
    localStorage.setItem('categoryFilters', JSON.stringify(newCategoryFilters));

    // Navigate to shop page with the filters
    router.get(`/shop?category=${encodeURIComponent(categoryId)}`);

  }


  return (
    <div className="relative w-full  bg-white p-4 rounded-md my-8">
      {/* Carousel container */}
      
      <div>
        <div className='w-full flex justify-between items-center border-b-2 pb-2'>
            <p className='text-2xl font-medium relative before:border-b-4 before:border-tertiary before:w-[75px] before:absolute before:bottom-0 before:mb-[-9px]'>Shop By Category</p>
            <div className='flex gap-2'>
                <button aria-label='left' onClick={prevSlide}><FaChevronLeft className='text-lg'/></button>
                <button aria-label='right' onClick={nextSlide}><FaChevronRight className='text-lg'/></button>
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
   
   <div key={item.id} onClick={()=>handleCategoryClick(item.id)} //className=' rounded-md  relative   bg-white py-4 overflow-hidden'
     className={`flex-none w-1/2 lg:w-1/6 px-2 pt-4 group cursor-pointer`}>

      <div className='border-2 rounded-md p-2'>
      <div className='w-full h-24 lg:h-32  flex justify-center items-center rounded-md  shadow-[inset_-12px_-8px_40px_#46464620] '>
        <img src={item.image ?`${apiUrl}/${item.image}` :'https://placehold.co/200x100'} alt={item.Category_name} className='w-full h-24 lg:h-32 object-cover'/>
      </div>
        <div className='flex gap-2 items-center justify-center group-hover:gap-2.5 transition-all duration-300'>
        <p className='text-center text-base font-medium'>{truncateString(item.Category_name, maxLength)}</p>
        <BsArrowRight/>
        </div>
        <p className='text-center text-gray-500'>({item.products_count} Items)</p>
      </div>


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

export default ShopByCategory;