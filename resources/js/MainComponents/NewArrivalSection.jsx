import axios from 'axios'
import React from 'react'
import { useMemo } from 'react'
import { useEffect, useContext } from 'react'
import { useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Link } from '@inertiajs/react'
import { MainPartContext } from '@/MainContext/MainContext'
import {usePage} from '@inertiajs/react';
import { FaRegEye } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { GoGitCompare } from "react-icons/go";
import { FaCartShopping } from "react-icons/fa6";
import cctvai from '../../../public/cctv_ai.jpg'; 
import attendanceai from '../../../public/attendance_ai.jpg'


const getMaxLength = () => {
    if(window.innerWidth <=1360) {
      return 18;
    }
    else return 22;
  }

const NewArrivalSection = () => {

    const {props} = usePage();
    const apiUrl = import.meta.env.VITE_APP_URL

    const [allProducts, setAllProducts] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [screenWidth, setScreenWidth] = useState(typeof window!== 'undefined' ? window.innerWidth : 1024);
    const [allWishlistItems, setAllWishlistItems] = useState([])

    const [maxLength, setMaxLength] = useState(getMaxLength());
    const [loading, setLoading] = useState(false)

    const [filteredProducts, setFilteredProducts] = useState([])
    const [activeCategory, setActiveCategory] = useState('CCTV')

    const {setInfoDialogDetails,setShowInfoDialog,setProductDataReloadTrigger, productDataReloadTrigger, AddToCart, addToComparison} = useContext(MainPartContext)

 useEffect(()=> {
    setMaxLength(getMaxLength());
  },[screenWidth])


  const truncateString = (string, maxLength) => {
    return string.length > maxLength ? string.substring(0, maxLength - 3) + '...' : string;
  }


    useEffect(()=> {
        const fetchAllProducts = async() => {
            try {
                const response = await axios.get(route('product.index'))
                setAllProducts(response.data)

                const cctvProducts = response.data.filter(
                    product => product.product_category === '25'
                )

                setFilteredProducts(cctvProducts);

            } catch (error) {
                console.log('Error fetching data', error)
            }
        }

        fetchAllProducts()
    }, [])

    const handleCategoryFilter = (category) => {
        let categoryId = ''; 
        if(category === 'CCTV') {
            categoryId = '25'; 
        }
        else if (category === 'Attendance Machine') {
            categoryId = '23';
        }

        const filteredItems = allProducts.filter(
            product => product.product_category === categoryId
        ); 

        setFilteredProducts(filteredItems)
        setActiveCategory(category)

    }


    useEffect(()=> {
        const handleResize = () => setScreenWidth(window.innerWidth)
        window.addEventListener('resize', handleResize); 
        return () => window.removeEventListener('resize', handleResize)
    },[])

    const getVisibleProductsPerPage = useMemo(() => {
        return screenWidth >= 1024 ? 8 : 4;
    },[screenWidth])

    const getGridColumns = useMemo(() => {
        return screenWidth >=1024 ? 4 :2;
    },[screenWidth])



    const nextSlide = () => {
        const visibleProductsPerPage = getVisibleProductsPerPage;
        if (currentIndex < filteredProducts.length - visibleProductsPerPage) {
          setCurrentIndex(currentIndex + visibleProductsPerPage);
        } else {
          setCurrentIndex(0);
        }
      };
    
      // Navigate to previous page of products
      const prevSlide = () => {
        const visibleProductsPerPage = getVisibleProductsPerPage;
        if (currentIndex > 0) {
          setCurrentIndex(currentIndex - visibleProductsPerPage);
        } else {
          setCurrentIndex(
            Math.max(0, filteredProducts.length - visibleProductsPerPage)
          );
        }
      };


      const visibleProducts = useMemo(() => {
        const visibleProductsPerPage = getVisibleProductsPerPage;
        return filteredProducts.slice(
          currentIndex, 
          currentIndex + visibleProductsPerPage
        );
      }, [allProducts, currentIndex, getVisibleProductsPerPage, filteredProducts]);


      const generateSlug = (productName) => {
        return productName
            .toLowerCase() // Convert to lowercase
            .trim() // Remove leading and trailing whitespace
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
            .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
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
    
    
    const handleClick = (e, action) => {
      e.preventDefault();
      action();
    };
    
    
    
     const addToWishlist = async(productId)=> {
        if(props?.auth?.user?.id){
            try {
              setLoading(true)
              const response = await axios.post(route('wishlist.store'),{
                product_id:productId,
                user_id:props.auth.user.id
              })
              toast.success('Item added to wishlist')
              setAllWishlistItems(prevWishlist => [
                ...prevWishlist,
                { 
                  id: response.data.id,  // Assuming `response.data.id` contains the wishlist item ID
                  user_id: props.auth.user.id,
                  product_id: productId,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }
              ]);
              setProductDataReloadTrigger((prev)=>!prev)
            } catch (error) {
              console.log('Error adding to wishlist', error)
              toast.error('Error adding item to the Wishlist.')
            }
            finally{
              setLoading(false)
            }
        }
        else {
          Inertia.visit('/login')
        }
     }


  return (
    <div className='relative w-full mb-8 bg-white lg:p-4 p-2 rounded-md flex flex-col lg:flex-row gap-4'>
        <div className='lg:w-[20%] w-full flex lg:flex-col flex-col gap-4'>
            {/* <div className='w-full h-full lg:h-[400px] relative before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/50 flex justify-center items-center flex-col' style={{ 
                    backgroundImage: `url(${cctvai})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}>
                  <p className='text-base uppercase font-medium text-white z-[1]'>New Arrivals</p>
                  <p className='text-white z-[1] text-2xl my-2'><span className='font-bold'>CCTV</span> Cameras</p>
                    <p className='text-[0.75rem] text-white z-[1]'>The best quality</p>
            </div> */}
            <div 
  className='w-full h-full lg:h-[360px] relative 
    before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/50 
    flex justify-center items-center flex-col 
    overflow-hidden group py-4 ' 
  style={{ 
    backgroundImage: `url(${cctvai})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }}
>
  {/* Background image with zoom effect */}
  <div 
    className='absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/60' 
    style={{ 
      backgroundImage: `url(${cctvai})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transformOrigin: 'center center'
    }}
  />

  {/* Content */}
  <p className='text-base uppercase font-medium text-white z-[1]'>New Arrivals</p>
  <p className='text-white z-[1] text-2xl my-2'><span className='font-bold'>CCTV</span> Cameras</p>
  <p className='text-[0.75rem] text-white z-[1]'>The best quality</p>
</div>
            {/* <div className='w-full h-full lg:h-[400px] relative before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/60 flex justify-center items-center flex-col'  style={{ 
                    backgroundImage: `url(${attendanceai})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center' 
                }}>
                  <p className='text-base uppercase font-medium text-white z-[1]'>Best Offers</p>
                  <p className='text-white z-[1] text-2xl my-2'><span className='font-bold'>Attendance</span> Machine</p>
                    <p className='text-[0.75rem] text-white z-[1]'>The best quality</p>  
            </div> */}

<div 
  className='w-full h-full lg:h-[360px] relative 
    before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/60 
    flex justify-center items-center flex-col 
    overflow-hidden group py-4' 
  style={{ 
    backgroundImage: `url(${attendanceai})`, 
    backgroundSize: 'cover', 
    backgroundPosition: 'center' 
  }}
>
  {/* Background image with zoom effect */}
  <div 
    className='absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-black/60' 
    style={{ 
      backgroundImage: `url(${attendanceai})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      transformOrigin: 'center center'
    }}
  />

  {/* Content */}
  <p className='text-base uppercase font-medium text-white z-[1]'>Best Offers</p>
  <p className='text-white z-[1] text-2xl my-2'><span className='font-bold'>Attendance</span> Machine</p>
  <p className='text-[0.75rem] text-white z-[1]'>The best quality</p>
</div>
        </div>
        <div className='w-full lg:w-[80%] lg:p-4'>
            <div className='w-full flex justify-between items-center border-b-2 pb-2'>
                <div className='flex gap-4 items-end'>
                <p className='uppercase lg:text-2xl  font-semibold relative before:border-b-4 before:border-tertiary before:w-[110px] before:lg:w-[140px] before:absolute before:bottom-0 before:mb-[-9px]'>Best of the week</p>
                <button className={`font-medium ${
                    activeCategory === 'CCTV' 
                    ? 'text-blue-800' 
                    : ''
                }`} onClick={()=> handleCategoryFilter('CCTV')}>CCTV</button>
                <button className={`font-medium ${
                    activeCategory === 'Attendance Machine' 
                    ? 'text-blue-800' 
                    : ''
                }`} onClick={()=> handleCategoryFilter('Attendance Machine')}>Attendace Machine</button>
                </div>
                <div className='flex gap-2'>
                    <button onClick={prevSlide} aria-label='left'><FaChevronLeft/></button>
                    <button onClick={nextSlide} aria-label='right'><FaChevronRight/></button>
                </div>
            </div>

            <div className='relative mt-8'>
            <div className={`grid grid-cols-${getGridColumns} gap-4`}>
            {
             visibleProducts.map((item) =>{
    const isInWishlist = allWishlistItems.some(wishlistItem => wishlistItem.product_id === item.product.id)
    const hasSecondImage = item.images && item.images.length > 1;

  return(
   
   <Link href={`/shop/${generateSlug(item?.product_name)}`} key={item.id}
    //  className={`flex-none w-1/2 lg:w-1/5 px-2 pt-2`}
     className="flex flex-col items-center rounded-lg border-2"
     >
      
<div className=' rounded-md p-2 flex flex-col w-full'>

<div className="overflow-hidden relative group flex justify-center items-center bg-white">
      <div className="relative w-48 h-48">
        <img 
          src={`${apiUrl}/${item?.images[0]?.image_path}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${hasSecondImage ? 'group-hover:opacity-0' : ''} `}
          alt={item.product_name}
          loading="eager"
          onError={(e)=> {e.target.onerror = null; e.target.src = 'https://placehold.co/600x600'}}
        />
        {hasSecondImage &&
        (<img 
          src={`${apiUrl}/${item?.images[1]?.image_path}`}
          className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          alt={`${item.product_name} - Hover`}
          loading="eager"
          onError={(e)=> {e.target.onerror = null; e.target.src = 'https://placehold.co/600x600'}}
        />
        )
        }
      </div>

      <div className="absolute flex flex-col gap-2 sm:translate-x-[60px] transition-all duration-300 sm:group-hover:translate-x-0 top-3 right-3">
        <button 
          className="w-6 h-6 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left"
          data-tip="View Details"
          onClick={(e) => handleClick(e, () => {
            setShowInfoDialog(true);
            document.body.style.overflow = 'hidden';
            setInfoDialogDetails(item);
          })}
          aria-label='viewdetail'
        >
          <FaRegEye className="text-white text-sm" />
        </button>
        <button 
          className="w-6 h-6 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left"
          data-tip={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
          onClick={(e) => handleClick(e, () => addToWishlist(item?.id))}
          disabled={isInWishlist}
          aria-label='wishlist'
        >
          <IoIosHeart className={` ${isInWishlist ? 'text-red-400' : 'text-gray-100'} text-sm`} />
        </button>

        <button className='w-6 h-6 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left'
        data-tip='Add to Compare'
        onClick={(e) => handleClick(e, () => addToComparison(item))}
        aria-label='compare'
        >
          <GoGitCompare className='text-sm text-gray-100'/>
        </button>

        <button className={`w-6 h-6 rounded-full flex justify-center items-center tooltip tooltip-left ${item?.instock && item?.selling_price!==null ? 'bg-tertiary' : 'bg-gray-400'}`} 
        data-tip={item?.instock && item?.selling_price!==null ? "Add to Cart": "Out of Stock"}
        onClick={(e) => handleClick(e, () => { 
          AddToCart(item); 
          notify(); 
        })} 
        aria-label='cart'
        >
          <FaCartShopping className='text-sm text-gray-100'/>
        </button>
      </div>
    </div>

      <div className='pt-2 bg-white flex flex-col justify-between'>
        <div className="mb-1">
            <p className='font-medium text-gray-500 text-center'>{item?.product_brand ? item?.product_brand : 'N.A'}</p>
            <p className='text-center'>{truncateString(item?.product_name, maxLength)}</p>
        </div>
        <div className='flex flex-wrap gap-2 items-center justify-center'> {/* Fixed height for price container */}
          {item.selling_price ? (
            <>
              <p className='font-semibold text-lg '>Rs.{item.selling_price}</p>
              {item.discounted_price && 
                <p className='text-gray-500 text-lg relative after:content-[""] after:absolute after:left-0 after:top-1/2 after:w-full after:h-[2px] after:bg-gray-500 after:rotate-[-12deg]'>
                  Rs.{item.discounted_price}
                </p>
              }
            </>
          ) : (
            <p className='font-medium text-lg  text-gray-500'>Rs. N.A</p>
          )}
        </div>
      </div>

</div>
    </Link>
  )
}
  ) 
  }
            </div>
            </div>


        </div>
    </div>
  )
}

export default NewArrivalSection