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
import { Inertia } from '@inertiajs/inertia';

  const getMaxLength = () => {
    if(window.innerWidth <=1360) {
      return 18;
    }
    else return 22;
  }

const OnSaleProducts = () => {
  const {props} = usePage();
  const apiUrl = import.meta.env.VITE_APP_URL;

  const {setInfoDialogDetails,setShowInfoDialog,setProductDataReloadTrigger, productDataReloadTrigger, AddToCart, addToComparison} = useContext(MainPartContext)

  const [currentIndex, setCurrentIndex] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [allWishlistItems, setAllWishlistItems] = useState([])

  const [maxLength, setMaxLength] = useState(getMaxLength());
 const [loading, setLoading] = useState(false)

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
    <div className="relative w-full my-8 bg-white lg:p-4 p-2 rounded-md ">
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
  ON SALE
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
  latestProducts.map((item) =>{
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
          alt={item.product.product_name}
          loading="eager"
          onError={(e)=> {e.target.onerror = null; e.target.src = 'https://placehold.co/600x600'}}
        />
        {hasSecondImage &&
        (<img 
          src={`${apiUrl}/${item?.product?.images[1]?.image_path}`}
          className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          alt={`${item.product.product_name} - Hover`}
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
          data-tip={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
          onClick={(e) => handleClick(e, () => addToWishlist(item?.product.id))}
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

export default OnSaleProducts;





// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import { FaChevronLeft } from 'react-icons/fa'
// import { FaChevronRight } from 'react-icons/fa'
// const LatestProducts = () => {

//     const [latestProducts, setLatestProducts] = useState([])
//     const [currentIndex, setCurrentIndex] = useState(0)
//     const containerRef = useRef(null)
//     const [itemsPerView, setItemsPerView] = useState(8)


   

//     useEffect(() => {
//         const updateItemsPerView = () => {
//           // Get the actual width of the container including padding
//           const containerWidth = containerRef.current?.getBoundingClientRect().width || window.innerWidth;
          
//           if (containerWidth >= 1280) setItemsPerView(8);      // xl
//           else if (containerWidth >= 1024) setItemsPerView(6);  // lg
//           else if (containerWidth >= 768) setItemsPerView(4);   // md
//           else if (containerWidth >= 640) setItemsPerView(3);   // sm
//           else setItemsPerView(2);                             // xs
//         };
    
//         updateItemsPerView();
        
//         // Create a ResizeObserver to watch for container size changes
//         const resizeObserver = new ResizeObserver(updateItemsPerView);
//         if (containerRef.current) {
//           resizeObserver.observe(containerRef.current);
//         }
    
//         // Also listen to window resize events
//         window.addEventListener('resize', updateItemsPerView);
        
//         return () => {
//           resizeObserver.disconnect();
//           window.removeEventListener('resize', updateItemsPerView);
//         };
//       }, []);

//     const extendedItems = [...latestProducts,...latestProducts,...latestProducts]
    
//   const slideLeft = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev - 1;
//       // If we're at the start of the first copy, jump to the second copy
//       if (newIndex < 0) {
//         return latestProducts.length - 1;
//       }
//       return newIndex;
//     });
//   };

//   const slideRight = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev + 1;
//       // If we're at the end of the second copy, jump to the first copy
//       if (newIndex >= latestProducts.length) {
//         return 0;
//       }
//       return newIndex;
//     });
//   };

//   // Calculate the transform position
//   const translateX = -(currentIndex * (100 / itemsPerView));

//     useEffect(()=>{
//         const fetchLatestProducts = async() => {
//             try {
//                 const response = await axios.get(route('products.latest'))
//                 setLatestProducts(response.data)

//             } catch (error) {
//                 console.log('Error fetching data',error)
//             }
//         }
//         fetchLatestProducts()
//     },[])


//     console.log(latestProducts)
//   return (
//     <div className="w-full relative overflow-hidden">
//     {/* Custom position for navigation buttons - adjust margin/padding as needed */}
//     <div className="flex justify-between mb-4">
//       <button
//         onClick={slideLeft}
//         className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//         aria-label="Previous slide"
//       >
//         <FaChevronLeft className="w-6 h-6" />
//       </button>
//       <button
//         onClick={slideRight}
//         className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//         aria-label="Next slide"
//       >
//         <FaChevronRight className="w-6 h-6" />
//       </button>
//     </div>
    
//     <div 
//       ref={containerRef}
//       className="flex transition-transform duration-300 ease-in-out"
//       style={{ 
//         transform: `translateX(${translateX}%)`,
//         width: `${(extendedItems.length * 100) / itemsPerView}%`
//       }}
//     >
//       {extendedItems.map((item, index) => (
//         <div
//           key={index}
//           className="flex-shrink-0"
//           style={{ width: `${100 / itemsPerView}%` }}
//         >
//           <div className="p-2">
//             <div className="bg-white rounded-lg shadow p-4 h-full">
//               {item.product_category}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
//   )
// }

// export default LatestProducts



// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// const LatestProducts = () => {
//   const [latestProducts, setLatestProducts] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const containerRef = useRef(null)
//   const [itemsPerView, setItemsPerView] = useState(8)

//   useEffect(() => {
//     const updateItemsPerView = () => {
//       // Get the width of the container excluding padding
//       const container = containerRef.current;
//       const containerWidth = container?.clientWidth || window.innerWidth;

//       if (containerWidth >= 1280) setItemsPerView(8);      // xl
//       else if (containerWidth >= 1024) setItemsPerView(6);  // lg
//       else if (containerWidth >= 768) setItemsPerView(4);   // md
//       else if (containerWidth >= 640) setItemsPerView(3);   // sm
//       else setItemsPerView(2);                             // xs
//     };

//     updateItemsPerView();

//     const resizeObserver = new ResizeObserver(updateItemsPerView);
//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     window.addEventListener('resize', updateItemsPerView);

//     return () => {
//       resizeObserver.disconnect();
//       window.removeEventListener('resize', updateItemsPerView);
//     };
//   }, []);

//   const extendedItems = [...latestProducts, ...latestProducts, ...latestProducts]

//   const slideLeft = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev - 1;
//       if (newIndex < 0) {
//         return latestProducts.length - 1;
//       }
//       return newIndex;
//     });
//   };

//   const slideRight = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev + 1;
//       if (newIndex >= latestProducts.length) {
//         return 0;
//       }
//       return newIndex;
//     });
//   };

//   const translateX = -(currentIndex * (100 / itemsPerView));

//   useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         const response = await axios.get(route('products.latest'))
//         setLatestProducts(response.data)
//       } catch (error) {
//         console.log('Error fetching data', error)
//       }
//     }
//     fetchLatestProducts()
//   }, [])

//   return (
//     <div className="w-full relative overflow-hidden">
//       <div className="flex justify-between mb-4">
//         <button
//           onClick={slideLeft}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//           aria-label="Previous slide"
//         >
//           <FaChevronLeft className="w-6 h-6" />
//         </button>
//         <button
//           onClick={slideRight}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//           aria-label="Next slide"
//         >
//           <FaChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex transition-transform duration-300 ease-in-out lg:px-0" // Reset padding for lg screens
//         style={{
//           transform: `translateX(${translateX}%)`,
//           width: `${(extendedItems.length * 100) / itemsPerView}%`
//         }}
//       >
//         {extendedItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0"
//             style={{ width: `${100 / itemsPerView}%` }}
//           >
//             <div className="p-2">
//               <div className="bg-white rounded-lg shadow p-4 h-full">
//                 {item.product_category}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default LatestProducts



// import axios from 'axios'
// import React, { useEffect, useRef, useState } from 'react'
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// const LatestProducts = () => {
//   const [latestProducts, setLatestProducts] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const containerRef = useRef(null)
//   const [itemsPerView, setItemsPerView] = useState(8)

//   // Fetch latest products data
//   useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         const response = await axios.get(route('products.latest'))
//         setLatestProducts(response.data)
//       } catch (error) {
//         console.log('Error fetching data', error)
//       }
//     }
//     fetchLatestProducts()
//   }, [])

//   // Update itemsPerView based on container width
//   useEffect(() => {
//     const updateItemsPerView = () => {
//       const containerWidth = containerRef.current?.clientWidth || window.innerWidth

//       if (containerWidth >= 1280) setItemsPerView(8)      // xl
//       else if (containerWidth >= 1024) setItemsPerView(6)  // lg
//       else if (containerWidth >= 768) setItemsPerView(4)   // md
//       else if (containerWidth >= 640) setItemsPerView(3)   // sm
//       else setItemsPerView(2)                             // xs

//       console.log("Updated items per view:", itemsPerView);
//     }

//     updateItemsPerView()

//     const resizeObserver = new ResizeObserver(updateItemsPerView)
//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current)
//     }

//     window.addEventListener('resize', updateItemsPerView)

//     return () => {
//       resizeObserver.disconnect()
//       window.removeEventListener('resize', updateItemsPerView)
//     }
//   }, [])

//   const extendedItems = [...latestProducts, ...latestProducts, ...latestProducts]

//   // Slide functions
//   const slideLeft = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev - 1
//       if (newIndex < 0) {
//         return latestProducts.length - 1
//       }
//       return newIndex
//     })
//   }

//   const slideRight = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev + 1
//       if (newIndex >= latestProducts.length) {
//         return 0
//       }
//       return newIndex
//     })
//   }

//   const translateX = -(currentIndex * (100 / itemsPerView))

//   return (
//     <div className="w-full relative overflow-hidden">
//       <div className="flex justify-between mb-4">
//         <button
//           onClick={slideLeft}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//           aria-label="Previous slide"
//         >
//           <FaChevronLeft className="w-6 h-6" />
//         </button>
//         <button
//           onClick={slideRight}
//           className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
//           aria-label="Next slide"
//         >
//           <FaChevronRight className="w-6 h-6" />
//         </button>
//       </div>

//       <div
//         ref={containerRef}
//         className="flex transition-transform duration-300 ease-in-out"
//         style={{
//           transform: `translateX(${translateX}%)`,
//           width: `${(extendedItems.length * 100) / itemsPerView}%`
//         }}
//       >
//         {extendedItems.map((item, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0"
//             style={{ width: `${100 / itemsPerView}%` }}
//           >
//             <div className="p-2">
//               <div className="bg-white rounded-lg shadow p-4 h-full">
//                 {item.product_category}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default LatestProducts


// import React, { useState, useEffect } from 'react';

// const LatestProducts = ({ products }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [latestProducts, setLatestProducts] = useState([])


//     useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         const response = await axios.get(route('products.latest'))
//         setLatestProducts(response.data)
//       } catch (error) {
//         console.log('Error fetching data', error)
//       }
//     }
//     fetchLatestProducts()
//   }, [])

//   const nextSlide = () => {
//     if (currentIndex < products.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else {
//       setCurrentIndex(products.length - 1);
//     }
//   };

//   const getVisibleProducts = () => {
//     return window.innerWidth >= 1024 ? 5 : 2;
//   };

//   console.log(window.innerWidth)

//   return (
//     <div className="relative w-full flex items-center justify-center">
//       {/* Carousel items */}
//       <div className="overflow-hidden w-full">
//         <div
//           className="flex transition-transform duration-300"
//           style={{
//             transform: `translateX(-${(100 / getVisibleProducts()) * currentIndex}%)`,
//           }}
//         >
//           {latestProducts.map((product, index) => (
//             <div
//               key={index}
//               className="min-w-[calc(100%/5)] lg:min-w-[calc(100%/2)] flex-shrink-0"
//             >
//               <div className="p-4 bg-white shadow-md rounded-lg m-2">
//                 <h3 className="font-semibold">{product.name}</h3>
//                 <p className="text-gray-500">{product.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Navigation Buttons */}
//       <button
//         onClick={prevSlide}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
//       >
//         &#9664;
//       </button>
//       <button
//         onClick={nextSlide}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700"
//       >
//         &#9654;
//       </button>
//     </div>
//   );
// };

// export default LatestProducts;