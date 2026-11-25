import {useContext,useEffect, useState,} from 'react'

import { FaHeart } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
// import { MainPartContext } from '../Context/MainContext';
import { MainPartContext } from '@/MainContext/MainContext';
import axios from 'axios';
import { toast} from 'react-toastify'
import { IoIosHeart } from "react-icons/io";
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/inertia-react';
import { HiOutlineShoppingBag } from "react-icons/hi";
import notfoundimage from '../../../public/assets/undraw_not_found.svg'
import MobileFilterOptions from './MobileFilterOptions';
import { TiFilter } from "react-icons/ti";
import { GoGitCompare } from 'react-icons/go';

const MainProducts = ({search}) => {
    // console.log(productItems)
    const {props} = usePage();

    //console.log(search)

    // console.log(props)

    const apiUrl = import.meta.env.VITE_APP_URL

    const {setInfoDialogDetails,setShowInfoDialog, AddToCart, filteredProducts, allItems,setFilteredProducts,sortedProducts,setSortedProducts, setProductDataReloadTrigger, productDataReloadTrigger,setCategoryFilters, setTypeFilters, setBrandFilters, productLoading, FETCH_STATE, fetchState, addToComparison } = useContext(MainPartContext)

    // const [isHovered, setIsHovered] = useState(false)
   
    const [allWishlistItems, setAllWishlistItems] = useState([])

    const [loading, setLoading] = useState(false)

    
    //console.log(filteredProducts)

    const [currentPage, setCurrentPage] = useState(1); 
    const productsPerPage = 12; 
    

    const indexOfLastProduct = currentPage * productsPerPage; 
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    //console.log(currentProducts)

  //

  //console.log(search)
          
//   const searchProducts = (products, searchTerm) => {
//     const normalizedSearchTerm = searchTerm.trim().toLowerCase();
    
//     // If no search term, return all products
//     if (!normalizedSearchTerm) {
//         return products;
//     }

//     return products.filter(product => {
//         // Primary fields - exact matches (higher priority)
//         const primaryExactMatch = [
//             product.product_name,
//             product.product_brand,
//             product.sku
//         ].some(field => field?.toLowerCase() === normalizedSearchTerm);

//         if (primaryExactMatch) return true;

//         // Primary fields - partial matches
//         const primaryPartialMatch = [
//             product.product_name,
//             product.product_brand,
//             product.sku
//         ].some(field => field?.toLowerCase().includes(normalizedSearchTerm));

//         if (primaryPartialMatch) return true;

//         // Secondary fields - partial matches
//         const secondaryMatch = [
//             product.description,
//             // Strip HTML tags from specification before searching
//             product.specification?.replace(/<[^>]*>/g, ' ')
//         ].some(field => field?.toLowerCase().includes(normalizedSearchTerm));

//         return secondaryMatch;
//     });
// };



// useEffect(() => {
//           const filtered = searchProducts(allItems, search);

//           console.log(filtered)

//           setFilteredProducts(filtered);
//       }, []);


// useEffect(() => {
//   if (allItems.length > 0 && search) {  // Only search if we have products and a search term
//       const filtered = searchProducts(allItems, search);
//       setFilteredProducts(filtered);
//   } else {
//       setFilteredProducts(allItems);  // If no search term, show all products
//   }
// }, [search, allItems]);


// useEffect(() => {
//   const searchTerm = getSearchTermFromURL();
//   console.log(searchTerm)
//   const filtered = searchProducts(allItems, search);
//   setFilteredProducts(filtered);
// }, [allItems]);

//console.log(filteredProducts)

  //  


    const pageCount = Math.ceil(filteredProducts.length / productsPerPage)
    const paginate = (pageNumber) => {
       setCurrentPage(pageNumber);
    };


    useEffect(() => {
      if(currentProducts.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }, [currentProducts, currentPage])



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


  
    

    const sortProducts = (sortBy) => {
        let sortedItems = [...filteredProducts];
        if (sortBy === 'lowToHigh') {
          sortedItems.sort((a, b) => a.selling_price - b.selling_price);
        } else if (sortBy === 'highToLow') {
          sortedItems.sort((a, b) => b.selling_price - a.selling_price);
        }
        else if(sortBy === 'nameAsc') {
            sortedItems.sort((a,b)=>a.product_name.localeCompare(b.product_name, undefined, {sensitivity:'base'}))
        }
        else if (sortBy === 'nameDesc') {
            sortedItems.sort((a, b) => b.product_name.localeCompare(a.product_name, undefined, { sensitivity: 'base' }));
        }
       
        setFilteredProducts(sortedItems);
      };

//    console.log(allItems)
    //console.log(filteredProducts)
//    console.log(sortedProducts)

   const notify = () => toast.success('Added to cart')


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


   const handleClick = (e, action) => {
    e.preventDefault();
    action();
  };


//   const generateSlug = (productName) => {
//     return productName
//         .toLowerCase() // Convert to lowercase
//         .trim() // Remove leading and trailing whitespace
//         .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
//         .replace(/\s+/g, '-') // Replace spaces with hyphens
//         .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
//         .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
// };  


const generateSlug = (productName) => {
  return productName
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading and trailing whitespace
      .replace(/[^a-z0-9./\s-]/g, '') // Allow decimals and slashes
      .replace(/(?<=\d)\.(?=\d)/g, '_dot_') // Temporarily replace valid decimal points
      .replace(/[\/]/g, '-') // Replace slashes with hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, '') // Remove leading and trailing hyphens
      .replace(/_dot_/g, '.'); // Restore decimal points
};


// console.log(currentProducts)
// console.log(filteredProducts)


const resetFilter = () => {
  setCategoryFilters([])
  setTypeFilters([])
  setBrandFilters([])
  localStorage.removeItem('typeFilters')
  localStorage.removeItem('categoryFilters')
  localStorage.removeItem('brandFilters')
} 


if (fetchState === FETCH_STATE.LOADING) {
  return (
    <div className='lg:w-[75%] lg:ml-[25%]  w-full  lg:p-10 min-h-[900px] flex flex-col mt-12 sm:mt-8'>
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-48 w-full"></div>
    </div>
    </div>
  );
}


if (fetchState === FETCH_STATE.SUCCESS && currentProducts.length === 0) {
  return (
    <div className='lg:w-[75%] lg:ml-[25%]  w-full  lg:p-10 min-h-[900px] flex flex-col'>
    <div className='w-full flex flex-col mt-24'>
      <button className='mx-auto bg-tertiary px-4 py-1.5 text-white rounded-md mb-2' onClick={resetFilter}>No Items, Reset Filter</button>
      <img src={notfoundimage} className='w-96 mx-auto' alt="No items found" />
    </div>
    </div>
  );
}

if(fetchState === FETCH_STATE.SUCCESS && currentProducts.length > 0) {
  return (
    <div className='lg:w-[75%] lg:ml-[25%]  w-full  lg:p-10 min-h-[900px] flex flex-col'>   
      <MobileFilterOptions/>

        <div className='w-full pb-4 flex mt-14 sm:mt-0 justify-between px-2 items-center'>
            <button onClick={()=>document.getElementById('my-drawer-5').checked = true} className='p-1.5 border-2 border-gray-400 rounded-md sm:hidden'><TiFilter className='text-xl text-gray-500'/></button>
            <select id='sortOptions' className='p-1.5 border-2 border-gray-400 focus:outline-gray-500 ml-auto w-[200px] rounded-md'
            onChange={(e)=>sortProducts(e.target.value)} aria-label='sort-options'>
                <option value="sortby">Sort by</option>
                <option value="lowToHigh">Price: low to high</option>
                <option value="highToLow">Price: high to low</option>
                <option value="nameAsc">Order: A-Z</option>
                <option value="nameDesc">Order: Z-A</option>
            </select>
    
        </div>

        


      
      
      <div className='grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6'>
  {
  currentProducts.map((item) =>{
    const isInWishlist = allWishlistItems.some(wishlistItem => wishlistItem.product_id === item.id)
    const hasSecondImage = item.images && item.images.length > 1;

  return(
   
   <Link href={`/shop/${generateSlug(item.product_name)}`} key={item.id} className=' rounded-md  relative   bg-white py-4 overflow-hidden'>
      
      {item.discounted_price &&
        (<div className='w-[150px] p-1.5 z-[10]  absolute top-6 -left-8 -rotate-45 bg-red-600 flex justify-center items-center shadow-lg shadow-gray-400'>
            {/* <p className='text-sm font-medium text-white'>{Math.round(((item.discounted_price - item.selling_price) / item.discounted_price) * 100)}% OFF</p> */}
            {item.selling_price == 0.00 && item.discounted_price == 0.00 ? (
            <p className='text-sm font-medium text-white'>0% OFF</p>
        ) : (
            <p className='text-sm font-medium text-white'>
                {Math.round(((item.discounted_price - item.selling_price) / item.discounted_price) * 100)}% OFF
            </p>
        )}
      </div>
        )
      }



<div className="overflow-hidden relative group flex justify-center items-center bg-white h-64">

      

      <div className="relative w-48 h-48"> {/* Fixed size container for images */}
        <img 
          src={`${apiUrl}/${item.images[0]?.image_path}`}
          className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${hasSecondImage ? 'group-hover:opacity-0' : ''} `}
          alt={item.product_name}
          loading="eager"
          onError={(e)=> {e.target.onerror = null; e.target.src = 'https://placehold.co/600x600'}}
        />
        {hasSecondImage &&
        (<img 
          src={`${apiUrl}/${item.images[1]?.image_path}`}
          className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          alt={`${item.product_name} - Hover`}
          loading="eager"
          onError={(e)=> {e.target.onerror = null; e.target.src = 'https://placehold.co/600x600'}}
        />
        )
        }
      </div>

      <div className="absolute  flex flex-col gap-2 sm:translate-x-[60px] transition-all duration-300 sm:group-hover:translate-x-0 top-3 right-3">
        <button 
          className="w-8 h-8 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left"
          data-tip="View Details"
          onClick={(e) => handleClick(e, () => {
            setShowInfoDialog(true);
            document.body.style.overflow = 'hidden';
            setInfoDialogDetails(item);
          })}
          aria-label='viewdetail'
        >
          <FaRegEye className="text-base text-white" />
        </button>
        <button 
          className="w-8 h-8 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left"
          data-tip={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
          onClick={(e) => handleClick(e, () => addToWishlist(item.id))}
          disabled={isInWishlist}
          aria-label='wishlist'
        >
          <IoIosHeart className={`text-lg ${isInWishlist ? 'text-red-400' : 'text-gray-100'}`} />
        </button>
        <button 
          className="w-8 h-8 bg-tertiary rounded-full flex justify-center items-center tooltip tooltip-left"
          data-tip={'Add to Compare'}
          onClick={(e) => handleClick(e, () => addToComparison(item))}
          disabled={isInWishlist}
          aria-label='wishlist'
        >
          <GoGitCompare className={`text-lg text-gray-100`} />
        </button>
      </div>
    </div>

      <div className='p-4  bg-white'>
        <div className="pb-5 mb-1">
            <p className=''>{item.product_name}</p>
            <div className='absolute bottom-2 w-full  px-4 left-0'>
            <div className='flex gap-2 items-center py-0.5 justify-between'>
              <div className='flex gap-2 items-center'>
              {item.selling_price && <p className='font-semibold text-lg'>Rs.{item.selling_price}</p>}
              {item.discounted_price && <p className='text-gray-500 line-through '>Rs.{item.discounted_price}</p>}
              </div>

              
                
              <button className={`w-10 h-10 ${item.instock && item.selling_price!==null ? 'bg-tertiary' : 'bg-gray-300'} flex justify-center items-center p-2 rounded-full tooltip tooltip-left`} data-tip={item.instock && item.selling_price!==null ? "Add to Cart": "Out of Stock"} onClick={(e) => handleClick(e, () => { 
            AddToCart(item); 
            notify(); 
          })}  
            aria-label='addtocart'
            disabled={item.instock === 0 || item.selling_price === null}
          >
                  <HiOutlineShoppingBag className='text-xl text-white'/>
              </button>
              
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
  ) 
  }
      </div>
      
  


<div className="join mt-8 flex justify-center">
        {[...Array(pageCount)].map((_, index) => (
          <button 
            key={index} 
            className={`join-item btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>


    <div className={`${loading ? 'scale-100' : 'scale-0'} fixed top-0 left-0 w-full h-full bg-black/10 z-[100] flex justify-center items-center`}>
    <span className='loading loading-spinner loading-lg'>
      </span>
    </div>
      
    </div>
  )
}

}

export default MainProducts


// console.log(allWishlistItems)


    // console.log(filteredProducts)

    //console.log(currentProducts)

    // console.log(filteredProducts)
    // useEffect(()=>{
    //     const fetchData = async() => {
    //         try {
    //             const result = await axios.get('http://localhost:3000/productstest')
    //             console.log(result.data)
    //         } catch (error) {
    //             console.log('Error',error)
    //         }
    //     }
    //     fetchData()
    // },[])

    // const sortProducts = (sortBy) => {
    //     let sortedItems = [...filteredProducts];
    //     if (sortBy === 'lowToHigh') {
    //       sortedItems.sort((a, b) => a.discounted_price - b.discounted_price);
    //     } else if (sortBy === 'highToLow') {
    //       sortedItems.sort((a, b) => b.discounted_price - a.discounted_price);
    //     }
    //     setSortedProducts(sortedItems);
    //   };

{/* <div className='grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-6 '>
{filteredProducts.map((item)=>
    (
        <div key={item.id} className='border-2 border-gray-300 rounded-md hover:shadow-lg hover:shadow-gray-400 relative '>
            <div className='overflow-hidden relative group flex justify-center items-center bg-white'>
             <img src={`http://localhost:3000/${item.images[0]?.replace('public/', '')}`} className='w-[50%] h-64 object-scale-down'/>
            <div className='flex flex-col gap-2 absolute top-3 right-3 translate-x-[90px]  transition-all duration-300  group-hover:translate-x-0'>
                {/* <button>
                <FaHeart className='text-gray-500 text-xl'/>
                </button> */}
//                 <button  className='border-2 border-tertiary bg-tertiary rounded-full p-2 transition-all duration-300 group relative ' onClick={()=>{setShowInfoDialog(true)
//                 document.body.style.overflow = 'hidden'
//                 setInfoDialogDetails(item)}}>
//                 <FaRegEye className='text-white '/>
//                 </button>
//             </div>
//             </div>
//             <div className='p-4 bg-gray-400'>
//             <p className='text-lg'>{item.product_name}</p>
//             <div>
//             <div className='flex gap-2 items-center py-0.5'>
//                 <p className='font-semibold'>Rs.{item.selling_price}</p>
//                 {item.discounted_price && <p className='text-gray-500 line-through '>Rs.{item.selling_price}</p>}
//             </div>
//             <button className='bg-tertiary text-white py-1 px-3 rounded-sm border-2 border-tertiary hover:bg-white hover:text-customFrontTheme transition duration-500' onClick={()=>{AddToCart(item);
//             notify()}}>Add to Cart</button>
//             </div>
//             </div>
//         </div>
//     )
// )}
// </div> */}



{/* <div className='overflow-hidden relative group flex justify-center items-center bg-white' 
        onMouseEnter={()=>setHoveredProductId(item.id)}
        onMouseLeave={()=>setHoveredProductId(null)}
      >
        
        <img 
        src={`${apiUrl}/${item.images[0]?.image_path}`}
        className={`w-[45%] h-56 object-scale-down transition-opacity duration-500 ease-in-out ${
          hoveredProductId === item.id ? 'opacity-0' : 'opacity-100'
        }`}
        alt={item.product_name}
       
      />
      <img 
        src={`${apiUrl}/${item.images[1]?.image_path}`}
        className={`w-[45%] h-56 object-scale-down transition-opacity duration-500 ease-in-out absolute top-0 left-0 right-0 bottom-0 m-auto ${
          hoveredProductId === item.id ? 'opacity-100' : 'opacity-0'
        }`}
        alt={`${item.product_name} - Hover`}
        />

        <div className='flex  absolute flex-col sm:translate-x-[60px]  transition-all duration-300  sm:group-hover:translate-x-0 top-3 right-3'>

        <div className='transition-all duration-300 flex flex-col gap-2' >
          <button  className='  w-8 h-8 bg-tertiary rounded-full group relative  flex justify-center items-center tooltip tooltip-left ' data-tip="View Details"
          onClick={(e) => handleClick(e, () => {
            setShowInfoDialog(true);
            document.body.style.overflow = 'hidden';
            setInfoDialogDetails(item);
          })}
          >
            <FaRegEye className='text-base text-white' />
          </button>
          <button className='w-8 h-8 p-2 bg-tertiary rounded-full group relative flex justify-center items-center tooltip tooltip-left' data-tip={isInWishlist ? "Already in Wishlist":"Add to Wishlist" }
          //  onClick={()=>addToWishlist(item.id)} disabled={isInWishlist}
          onClick={(e) => handleClick(e, () => addToWishlist(item.id))}
          disabled={isInWishlist}
           >
            <IoIosHeart className={`text-lg ${isInWishlist ? 'text-red-400' : 'text-gray-100'}`}/>
          </button>

          </div>
         

        </div>

       

      </div> */}

{/* <div className="overflow-hidden relative group flex justify-center items-center bg-white">
      <div className="w-full pb-[100%] relative"> 
        <img 
          src={`${apiUrl}/${item.images[0]?.image_path}`}
          className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          alt={item.product_name}
          loading="lazy"
        />
        <img 
          src={`${apiUrl}/${item.images[1]?.image_path}`}
          className="absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out opacity-0 group-hover:opacity-100"
          alt={`${item.product_name} - Hover`}
          loading="lazy"
        />
      </div>

      <div className="flex absolute flex-col sm:translate-x-[60px] transition-all duration-300 sm:group-hover:translate-x-0 top-3 right-3">
        <div className="transition-all duration-300 flex flex-col gap-2">
          <button 
            className="w-8 h-8 bg-tertiary rounded-full group relative flex justify-center items-center tooltip tooltip-left"
            data-tip="View Details"
            onClick={(e) => handleClick(e, () => {
              setShowInfoDialog(true);
              document.body.style.overflow = 'hidden';
              setInfoDialogDetails(item);
            })}
          >
            <FaRegEye className="text-base text-white" />
          </button>
          <button 
            className="w-8 h-8 p-2 bg-tertiary rounded-full group relative flex justify-center items-center tooltip tooltip-left"
            data-tip={isInWishlist ? "Already in Wishlist" : "Add to Wishlist"}
            onClick={(e) => handleClick(e, () => addToWishlist(item.id))}
            disabled={isInWishlist}
          >
            <IoIosHeart className={`text-lg ${isInWishlist ? 'text-red-400' : 'text-gray-100'}`} />
          </button>
        </div>
      </div>
    </div> */}