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
import { FaCartShopping } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { GoGitCompare } from "react-icons/go";


  const getMaxLength = () => {
    if(window.innerWidth <=1360) {
      return 18;
    }
    else return 22;
  }

const WishlistItems = () => {
  const {props} = usePage();
  const apiUrl = import.meta.env.VITE_APP_URL;

  const {setInfoDialogDetails,setShowInfoDialog,setProductDataReloadTrigger, productDataReloadTrigger, AddToCart, addToComparison} = useContext(MainPartContext)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allWishlistItems, setAllWishlistItems] = useState([])

  const [maxLength, setMaxLength] = useState(getMaxLength());
 const [loading, setLoading] = useState(false)
    const [reloadWishlistDataTrigger, setReloadWishlistDataTrigger] = useState(false)
    

    useEffect(()=>{
        const fetchWishlistByUser = async() => {
            try {
                const userId = props?.auth?.user?.id; 
                const response = await axios.get(route('wishlist.index', {userId}))
                setAllWishlistItems(response.data)
            } catch (error) {
                console.log('Error fetching the wishlist data', error)
            }
        }
        fetchWishlistByUser()
    },[reloadWishlistDataTrigger])
    


  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        // Simulated data for demonstration
        const sampleData = await axios.get(route('onsaleproduct.get'))
        setLatestProducts(sampleData.data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchLatestProducts();

    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [productDataReloadTrigger]);


  useEffect(()=> {
    setMaxLength(getMaxLength());
  },[screenWidth])


  const truncateString = (string, maxLength) => {
    return string.length > maxLength ? string.substring(0, maxLength - 3) + '...' : string;
  }

  const getVisibleProducts = () => {
    return screenWidth >= 1024 ? 5 : 2;
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


  const generateSlug = (productName) => {
    return productName
        .toLowerCase() // Convert to lowercase
        .trim() // Remove leading and trailing whitespace
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
};  


// useEffect(()=>{
//     const fetchWishlistByUser = async() => {
//       try {

//         const userId = props?.auth?.user?.id; 
        
//         if (userId) {
//           const response = await axios.get(route('wishlist.index', { userId }));
//           setAllWishlistItems(response.data);
//       } else {
//           // Handle the case for non-logged-in users
//           setAllWishlistItems([]); // or set a default state
//       }

//       } catch (error) {
//         console.log('Error fetching the wishlist data', error)
//       }
//     }
//     fetchWishlistByUser()
//   },[productDataReloadTrigger])


  //console.log(latestProducts)\


  const handleRemoveWishlist = async(id) => {
    try {
        const response = await axios.get(route('wishlist.destroy',{id}))
        toast.success('Item Removed from Wishlist')
        setReloadWishlistDataTrigger((prev)=>!prev)
    } catch (error) {
        console.log('Error removing', error)
        toast.error('Error Removing Item from Wishlist')
    }
}


const notify = () => toast.success('Added to cart')


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
    <div className="relative w-full my-2 bg-white lg:p-4 p-2 rounded-md ">
      {/* Carousel container */}
      
      <div className={`${loading ? 'scale-100' : 'scale-0'} fixed top-0 left-0 w-full h-full bg-black/10 z-[100] flex justify-center items-center`}>
    <span className='loading loading-spinner loading-lg'>
      </span>
    </div>

      <div>
        <div className='w-full flex justify-between items-center border-b-2 pb-2'>
           

<p className='text-2xl font-black relative 
  before:border-b-4 before:border-red-500 
  before:w-[75px] before:absolute 
  before:bottom-0 before:mb-[-9px] 
  bg-multi-gradient
  bg-[length:200%_100%]
  animate-gradientx
  text-transparent bg-clip-text'>
  Wishlist
</p>
          
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
  allWishlistItems.map((item) =>{
    const isInWishlist = allWishlistItems.some(wishlistItem => wishlistItem.product_id === item.product.id)
    const hasSecondImage = item.product.images && item.product.images.length > 1;

  return(
   
   <Link href={`/shop/${generateSlug(item?.product.product_name)}`} key={item.id}
     className={`flex-none w-1/2 lg:w-1/5 px-2 pt-2`}>
      
<div className='border-2 rounded-md p-2 mt-2 flex flex-col'>

<div className="overflow-hidden relative group flex justify-center items-center bg-white">
      <div className="relative w-48 h-48">
        <img 
          src={`${apiUrl}/${item?.product?.images[0]?.image_path}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${hasSecondImage ? 'group-hover:opacity-0' : ''} `}
          alt={item.product_name}
          loading="eager"
          onError={(e)=> {e.target.onerror = null; e.target.src = 'https://placehold.co/600x600'}}
        />
        {hasSecondImage &&
        (<img 
          src={`${apiUrl}/${item?.product?.images[1]?.image_path}`}
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
            setInfoDialogDetails(item?.product);
          })}
          aria-label='viewdetail'
        >
          <FaRegEye className="text-white text-sm" />
        </button>
        <button 
          className="w-6 h-6 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left"
          data-tip={"Remove from Wishlist"}
          onClick={(e) => handleClick(e, () =>handleRemoveWishlist(item?.product.id))}
          disabled={isInWishlist}
          aria-label='wishlist'
        >
          <IoIosHeart className={` ${isInWishlist ? 'text-red-400' : 'text-gray-100'} text-sm`} />
        </button>

        <button className='w-6 h-6 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left'
        data-tip='Add to Compare'
        onClick={(e) => handleClick(e, () => addToComparison(item.product))}
        aria-label='compare'
        >
          <GoGitCompare className='text-sm text-gray-100'/>
        </button>

        <button className={`w-6 h-6 rounded-full flex justify-center items-center tooltip tooltip-left ${item?.product?.instock && item?.product?.selling_price!==null ? 'bg-tertiary' : 'bg-gray-400'}`} 
        data-tip={item?.product?.instock && item?.product?.selling_price!==null ? "Add to Cart": "Out of Stock"}
        onClick={(e) => handleClick(e, () => { 
          AddToCart(item.product); 
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
            <p className='font-medium text-gray-500'>{item?.product?.product_brand ? item?.product?.product_brand : 'N.A'}</p>
            <p className=''>{truncateString(item?.product?.product_name, maxLength)}</p>
        </div>
        <div className='flex gap-2 items-center'> {/* Fixed height for price container */}
          {item.product.selling_price ? (
            <>
              <p className='font-semibold text-lg '>Rs.{item.product.selling_price}</p>
              {item.product.discounted_price && 
                <p className='text-gray-500 text-lg relative after:content-[""] after:absolute after:left-0 after:top-1/2 after:w-full after:h-[2px] after:bg-gray-500 after:rotate-[-12deg]'>
                  Rs.{item.product.discounted_price}
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
  );
};

export default WishlistItems;