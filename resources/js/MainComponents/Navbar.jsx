import {useEffect, useRef, useContext} from 'react'
import { LuUser } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
// import dummyData from '../dummyData.json'
import { FaChevronDown } from "react-icons/fa6";
import { useState } from "react";
import  {IoChevronDownOutline, IoMenu}  from "react-icons/io5";
// import { MainPartContext } from '../Context/MainContext';
import { MainPartContext } from '@/MainContext/MainContext';
import axios from 'axios';

import deliLogo from '../../../public/assets/deli.png'
import brotherImage from '../../../public/assets/brother.jpg'
import necLogo from '../../../public/assets/nec-image.png'
import CanonLogo from '../../../public/assets/canon_new.webp'
import brotherlogo from '../../../public/assets/brother-small-png.png'
import zonerrichlogo from '../../../public/assets/zonerrich.png'
import xlablogo from '../../../public/assets/xlab.png'
import hpLogo from '../../../public/assets/hplogo.webp'
import { Inertia } from '@inertiajs/inertia';
import { IoIosSearch } from "react-icons/io";
import saitlogo from '../../../public/assets/sait.png'
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import { FaMinus } from 'react-icons/fa';
import { MdClose, MdDelete } from 'react-icons/md';
import { router } from '@inertiajs/react';
import {usePage} from '@inertiajs/react'
import Kelinalogo from '../../../public/kelinainternationallogo.jpg'
import {BsChevronDown} from 'react-icons/bs'
import SecondaryNavMobile from './SecondaryNavMobile';
import emptycartimg from '../../../public/emptycart.webp';

const Navbar = () => {

    const {props} = usePage()

    const loggedUser = props?.auth?.user


    const apiUrl = import.meta.env.VITE_APP_URL
    //searchProducts
    const {TotalQuantity,searchTerm,setSearchTerm,allCategoryData,allBrandsData,allItems,showMainSideBar,setShowMainSideBar, TotalAmount , SubTotal, typeFilters, setTypeFilters, brandFilters, setBrandFilters ,cart, IncreaseQuantity, DecreaseQuantity, RemoveFromCart, searchProducts, handleSearch, setCategoryFilters } = useContext(MainPartContext)
    const additionalInfoRef = useRef(null)
    const categories = [...new Set(allItems.map(product=>product.product_category))]
    // console.log(categories)
    const [showAdditionalInfo,setShowAdditionalInfo] = useState(false)
    const [showAdditionalBrandInfo,setShowAdditionalBrandInfo] = useState(false)
    const [selectedCategory,setSelectedCategory] = useState('')
    const [showUserMenu,setShowUserMenu] = useState(false)
    
    const [allTypesData,setAllTypesData] = useState([])

    const [topCategories, setTopCategories] = useState([])

    const [allCategories, setAllCategories] = useState([])

    const [openDropdownCategory, setOpenDropDownCategory] = useState(true)
    

    const [showBrandSection, setShowBrandSection] = useState(false)
    const [showCategorySection, setShowCategorySection] = useState(false)


    const [allBrands, setAllBrands] = useState([])
    const [categoryWithTypes, setCategoryWithTypes] = useState([])

    const handleBrandMouseEnter = () => {
        setShowBrandSection(true)
        setShowCategorySection(false)
    }

    const handleBrandMouseLeave = () => {
        setShowBrandSection(false)
    }

    const handleCategoryMouseEnter = () => {
        setShowCategorySection(true)
        setShowBrandSection(false)
    }

    const handleCategoryMouseLeave = () => {
        setShowCategorySection(false)
    }
    
    
    useEffect(()=>{
      const fetchCategoryWithTypes = async() =>{ 
          try {
              const response = await axios.get(route('categorytypes.data'))
              setCategoryWithTypes(response.data)
          } catch (error) {
              console.log('Error fetching data',error)
          }
      }

      const fetchAllBrands = async() => {
          try {
              const response = await axios.get(route('productbrand.index'))
              setAllBrands(response.data)
          } catch (error) {
              console.log('Error fetching data', error)
          }
      }

      fetchCategoryWithTypes()
      fetchAllBrands()
  },[])


  const clearAllFilters = () => {
    // setCategoryFilters([])
    // setBrandFilters([])
    // setTypeFilters([])
    localStorage.removeItem('brandFilters');
    localStorage.removeItem('categoryFilters');
    localStorage.removeItem('typeFilters');
    localStorage.removeItem('searchTerm');
}

const handleBrandClick = (brandName) => {
    clearAllFilters();
    localStorage.setItem('brandFilters', JSON.stringify([brandName.toString()]));
    router.get(`/shop?brand=${encodeURIComponent(brandName)}`);
}

const handleCategoryClick = (categoryName) => {
    clearAllFilters();
    localStorage.setItem('categoryFilters', JSON.stringify([categoryName.toString()]));
    router.get(`/shop?category=${encodeURIComponent(categoryName)}`);
}

const handleTypeClick = (typeName) => {
    clearAllFilters();
    localStorage.setItem('typeFilters', JSON.stringify([typeName.toString()]));
    router.get(`/shop?type=${encodeURIComponent(typeName)}`);
}


    const { url } = usePage();

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };


    //   const searchProducts = (searchTerm) => {
    //     // Always redirect to shop page with search parameter
    //     router.get('/shop', { 
    //         search: searchTerm 
    //     }, {
    //         preserveState: true,
    //         preserveScroll: true,
    //     })
    // }

    // const searchProducts = (searchTerm) => {
    //     if (searchTerm.trim()) {  // Only search if there's actually a search term
    //         router.get('/shop', { 
    //             search: searchTerm 
    //         }, {
    //             preserveState: false,  // Changed this to false
    //             preserveScroll: true,
    //         })
    //     }
    // }


      useEffect(() => {
        const handleResize = () => {
          // Check if we're on the main page
          const isMainPage = url === '/' || url === '';
          
          // Check if screen is small (e.g., mobile devices)
          const isSmallScreen = window.innerWidth < 768; // 768px is typical mobile breakpoint
          
          // Set dropdown state based on conditions
          setIsOpen(isMainPage && !isSmallScreen);
        };
    
        // Initial check
        handleResize();
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
      }, [url]);


    const brandImages = [deliLogo,brotherlogo,necLogo,CanonLogo,zonerrichlogo,xlablogo,hpLogo]

    // console.log(loggedUser)

    const currentPath = window.location.pathname; 

    //console.log(currentPath)
    

    //console.log(currentPath)

    useEffect(()=> {
        const fetchTopCategories = async()=> {
            try {
                const result = await axios.get(route('topcategories.index'))
                setTopCategories(result.data)
            } catch (error) {
                console.log('Error fetching',error)                
            }
        }

        fetchTopCategories()

    },[])




    useEffect(()=>{
       const fetchTypesData = async()=>{
            try {
                const result = await axios.get(route('producttype.index'))
                setAllTypesData(result.data)
            } catch (error) {
                console.log('Error fetching',error)                
            }
        }
        fetchTypesData()
    },[])

   

    useEffect(()=>{
        const handleClickOutside = (event) => {
            if (additionalInfoRef.current && !additionalInfoRef.current.contains(event.target)) {
              setShowAdditionalInfo(false);
              setShowAdditionalBrandInfo(false)
            }
          };
        
          document.addEventListener("mousedown", handleClickOutside);
        
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };

    },[additionalInfoRef])


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

    //console.log(allCategories)


    // console.log(selectedCategory)
    const displayTypesData = allTypesData.filter((product)=>product.category_identifier == selectedCategory)
   

    const handleLogout = async() => {
        try {
            await axios.post(route('logout')); 
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout failed', error); 
        }
    }

    // console.log(allBrands)
    const handleProfileRedirect = () => {
        if(loggedUser){
            navigate('/profile')
        }
        else {
            navigate('/login')
        }
    }

//    console.log(allCategoryData)
//    console.log(topCategories)
//    console.log(allBrandsData)


   const addToBrandFilter = (item) => {
       if(!brandFilters.includes(item)){
        setBrandFilters((prev)=>[...prev,item])
       } 
   }

   const addToTypeFilter = (item) => {
        if(!typeFilters.includes(item)){
            setTypeFilters((prev)=>[...prev,item])
        }
   }


   const toggleCategoryDropdown = () => {
    setOpenDropDownCategory((prev)=>!prev)
   }
   //fixed sm:top-10 top-8

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight, 
            behavior: 'smooth',
        })
    }
   

    const totalAmountPerItem = (price, quantity) => {
        return (price * quantity).toFixed(2)
    }


    // const handleCategoryClick = (categoryId) => {
    //     localStorage.removeItem('brandFilters'); 
    //     localStorage.removeItem('categoryFilters');

    //     const newCategoryFilters = [categoryId.toString()];
    //     localStorage.setItem('categoryFilters', JSON.stringify(newCategoryFilters)); 

    //     router.get('/shop'); 
    // }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        handleSearch(searchTerm, currentPath)
    }


  return (
    <div className='w-full flex flex-col  z-[100]  bg-white'>
        <div className=''>
        
        <div className='fixed sm:top-8 top-8 z-[100] w-full bg-white'>
        <div className='flex justify-between items-center px-4 lg:px-16 pt-6 pb-2   bg-white w-full'>
            <div className='flex gap-4'>
                {/* { (currentPath === '/shop' || currentPath === '/') &&
                (<button className='lg:hidden' onClick={()=>setShowMainSideBar((prev)=>!prev)} aria-label='menu'>
                    <IoMenu className='text-3xl text-tertiary'/>
                </button>
                )
                } */}
            <a href='https://kelina.com.np' onClick={()=>{
                clearAllFilters();
                }} aria-label='homebutton' className='flex gap-2 items-center'>
            {/* <p className='text-3xl font-semibold text-white/80'>LOGO</p> */}
            <img src={Kelinalogo} className='w-20 object-cover' alt='saitlogo' loading='eager'/>
            <div className='flex flex-col items-start space-y-1'>
            <p className='uppercase font-medium border-b-2 border-gray-400 text-lg'>Kelina International</p>
            <p className='text-[.70rem] uppercase font-medium'>YOUR TECH PARTNER</p>
            
            </div>
            </a>
            </div>
            {(currentPath === '/shop' || currentPath === '/') &&
(<form onSubmit={handleSearchSubmit} className='sm:flex  hidden  px-2 rounded-full overflow-hidden bg-gray-100 py-1'>
                <input type='text' placeholder='Search' className='p-2  sm:w-[300px] focus:outline-none focus:ring-0  lg:w-[650px] border-none bg-gray-100' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} 
                // onKeyDown={(e) => {
                //     if (e.key === 'Enter') {
                //         searchProducts(searchTerm);
                //     }
                // }}
                />
                <button className='pl-2 pr-1'type='submit' aria-label='search'><IoIosSearch className='text-2xl font-bold text-gray-500'/></button>
            </form>
            )
            }
            <div className='flex gap-5 items-center'>
            <div className='relative hidden sm:flex gap-3 items-center'>
                    <button className='p-3 bg-blue-50 rounded-md'  onClick={()=>setShowUserMenu((prev)=>!prev)} aria-label='account'>
                    <FaUserCircle className='text-xl text-tertiary cursor-pointer'/>
                    </button>
                    <div>
                        <p>Account</p>
                    </div>
                    <div className={`border bg-white py-2 px-6 flex flex-col gap-2 bottom-0 left-0 mb-[-80px] ml-[-50px] rounded-md shadow-lg z-[10] ${showUserMenu ? 'absolute' : 'hidden'}`}>
                        <button onClick={()=>Inertia.visit('/userprofile')} className='text-tertiary font-medium' >Profile</button>
                        {loggedUser 
                        ? 
                        (<button onClick={handleLogout} className='text-red-600 font-medium'>Logout</button>)
                        : (<button onClick={()=>Inertia.visit('/login')} className='text-green-600 font-medium'>Login</button>)}
                    </div>
                </div>
                {/* onClick={()=>Inertia.visit('/cart')} */}
                <div className='flex gap-3 items-center'>
                <button className='relative hidden sm:block p-3 bg-blue-50 rounded-md'  aria-label='cart' onClick={()=> document.getElementById('my-drawer-4').checked = true}>
                    <FaCartShopping className='text-xl text-tertiary'/>
                    <div className='w-5 h-5 bg-tertiary rounded-full absolute top-0 right-0 mt-[-10px] flex justify-center items-center mr-[-8px]'>
                    <p className='text-[0.75rem] text-white'>{TotalQuantity}</p> 
                    </div>
                </button>
                <div className='lg:block hidden'>
                    <p className='text-base font-medium'>Rs.{SubTotal}</p>
                    <p className='text-sm font-medium'>My Cart</p>
                </div>
                </div>
            </div>
        </div>
       

{(currentPath === '/shop') &&
            (<div className='sm:hidden   px-2 rounded-full overflow-hidden bg-gray-100 mx-4 flex justify-between items-center mb-4 border-2'>
                <input type='text' placeholder='Search' className='p-2  sm:w-[300px] focus:outline-none focus:ring-0  md:w-[650px] border-none bg-gray-100 ' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        searchProducts(searchTerm);
                    }
                }}/>
                <button className='pl-2 pr-1' onClick={()=>searchProducts(searchTerm)} aria-label='search'><IoIosSearch className='text-xl font-bold '/></button>
            </div>
            )
            }


        </div>


<div className='flex gap-12 bg-[#217945]  lg:px-16 px-2 py-1.5 lg:mt-[160px] mt-[150px] relative items-center justify-between sm:justify-start'>
            <div className="relative w-64">
        <button
          onClick={toggleDropdown}
          className="w-full flex gap-2 items-center font-medium px-2.5 py-2 my-[-6px] bg-green-800 text-white"
        >
          <RiMenu2Fill />
          <span>SHOP BY CATEGORY</span>
          <IoChevronDownOutline className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
            
            

        {isOpen && (
          <div className="absolute w-full  z-50 mt-5 h-[500px] overflow-scroll hidden-scrollable-div   bg-white rounded-md ">
            <ul className="">
              {allCategories.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-1.5 hover:bg-gray-100 cursor-pointer text-[1.10rem] border-b font-medium"
                  onClick={() => {
                    // Add your category selection logic here
                    // console.log(`Selected category: ${item.Category_name}`);
                    handleCategoryClick(item.id)
                  }}
                >
                  {item.Category_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <SecondaryNavMobile/>
      <button className='sm:hidden pr-2' onClick={()=>document.getElementById('my-drawer-10').checked = true}><IoMenu className='text-2xl text-white'/></button>
      <div className='sm:flex gap-8 hidden items-end'>  
      <Link href='/' onClick={clearAllFilters} className={`text-base font-medium hover:text-white/80 text-white ${currentPath === '/' ? 'text-white' : ''}`}>Home</Link>
      <Link href='/shop' onClick={clearAllFilters} className={`${currentPath === '/shop' ? 'text-white' : '' } text-base font-medium hover:text-white/80 text-white`}>Shop</Link>
      <button onMouseEnter={handleBrandMouseEnter} onMouseLeave={handleBrandMouseLeave} className=' font-medium flex gap-1 items-center text-base text-white'>Brands <BsChevronDown className='text-sm'/></button>
        <button onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave} className=' font-medium flex gap-1 items-center text-base text-white'>Categories <BsChevronDown className='text-sm'/></button>
      <button onClick={scrollToBottom} className='text-base font-medium text-white hover:text-white/80'>Contact</button>
      <Link href='/aboutus'  className='text-white font-medium hover:text-white/80'>About Us</Link>
      <Link href='/ourteam' className='text-white font-medium hover:text-white/80'>Our Team</Link>
      <Link href='/gallery' className='text-white font-medium hover:text-white/80'>Gallery </Link>
      {showBrandSection && 
        <div className='absolute w-full h-[300px] bg-white z-[200] top-9  left-0 grid grid-cols-6 p-8 gap-8 overflow-auto shadow-lg rounded-b-md' onMouseEnter={handleBrandMouseEnter} onMouseLeave={handleBrandMouseLeave}>
            {allBrands.map((brand)=>
            <div className='w-full flex flex-col justify-center items-center' key={brand.id}>
            <button onClick={()=>handleBrandClick(brand.brand_name)} className='text-center text-lg font-medium hover:text-tertiary' id={brand.id}>{brand.brand_name}</button>
            </div>    
        )}
        </div>
        }

        {showCategorySection && 
        <div onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave} className='absolute w-full h-[400px] bg-white z-[200] top-9 left-0 grid grid-cols-4 p-8 gap-8 overflow-auto shadow-lg rounded-b-md'>
            {categoryWithTypes.map((item)=>
               <div className='w-full flex flex-col justify-start items-center' key={item.id}>
                    <button onClick={()=>handleCategoryClick(item.id)} className='text-xl font-medium hover:text-tertiary'>{item.Category_name}</button>
                    {item?.product_types?.map((type)=><button onClick={()=>handleTypeClick(type.type_name)} key={type.id} className='text-[0.75rem] hover:text-tertiary'>{type.type_name}</button>)}
               </div> 
            )}
        </div>
        }


      </div>
        </div> 


        </div>
{/* <div className='flex gap-12 lg:px-16'>
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
          <div className="absolute w-full bg-white border border-gray-200 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-50 mt-4 h-[500px] overflow-scroll hidden-scrollable-div">
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

      <button className='text-lg font-medium'>Home</button>
      <button className='text-lg font-medium'>Shop</button>
        </div> */}

       {/** Drawer for CART */} 
        
       <div className="drawer drawer-end z-[200]">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    {/* Page content here */}
    {/* <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label> */}
  </div>
  <div className="drawer-side">

    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-white text-base-content h-full w-96 p-4 ">
      {/* Sidebar content here */}
    <div className='flex flex-col items-between h-full'>
     <div className='flex-grow'>
        <div className='w-full flex justify-between items-center border-b'>
      <p className='uppercase py-2 font-medium  text-lg'>Your cart</p>
      <button aria-label='close' onClick={()=>document.getElementById('my-drawer-4').checked = false}><MdClose className='text-xl' /></button>
      </div>
      <div className='flex justify-between py-2 border-b'>
        <p className='text-sm uppercase'>product</p>
        <p className='text-sm uppercase'>total</p>
      </div>

        {cart.length!==0 ?

      <div className='flex flex-col gap-4 max-h-[350px] lg:max-h-[500px] overflow-scroll'>
      {cart.map((cartitem, index)=>(
        <div className='flex justify-between '>
            <div className='flex items-start gap-2'>
               <img 
                                    src={`${apiUrl}/${cartitem.images[0]?.image_path}`}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200'; }} 
                                    className='w-20 h-20 rounded-sm object-contain'/>
                <div>
                    <p>{cartitem.product_name}</p>
                    <p>Rs.{cartitem.selling_price}</p>
                    <div className='flex gap-3 mt-2'>
                        <div className='flex gap-2 border px-2 rounded-sm '><button className='text-tertiary' onClick={()=>DecreaseQuantity(cartitem.id)}><FaMinus/></button>
                            <p className='text-lg'>{cartitem.quantity}</p>
                            <button className='text-tertiary' onClick={()=>IncreaseQuantity(cartitem.id)}><FaPlus/></button>
                        </div>
                        <button className='text-lg text-red-500' onClick={()=>RemoveFromCart(cartitem.id)} ><MdDelete/></button>
                    </div>
                </div>                    
            </div>
            <p className='font-medium text-tertiary'>Rs. 
            {totalAmountPerItem(cartitem.selling_price,cartitem.quantity)}</p>
        </div>
      ))}
    </div>
    :
    <div className='flex flex-col justify-center items-center h-full'>
      <img src={emptycartimg} className='w-52' alt='emptycart' loading='eager'/>
      <p className='text-lg font-medium'>Your cart is empty</p>
      <Link href='/shop' onClick={clearAllFilters} className='bg-tertiary border-2 border-tertiary text-white px-4 py-2 rounded-sm text-xl mt-6 lg:hover:bg-white lg:hover:text-tertiary transition-all duration-100'>Continue Shopping</Link>
    </div>

    }
     </div>
      <div className='mt-auto pt-4 border-t'>
        <div className='flex justify-between '>
            <p className='uppercase text-lg'>subtotal</p>
            <p className='text-xl text-tertiary font-medium '>Rs. {SubTotal}</p>
            
        </div>
        <button onClick={()=>Inertia.visit('/cart')} className='uppercase font-medium w-full bg-tertiary text-white rounded-sm py-2 mt-3 border-2 border-tertiary hover:bg-white hover:text-tertiary transition-all duration-300'>view cart</button>
      </div>
    
    </div>


    </ul>
        </div>
        </div>

        
    </div>
  )
}

export default Navbar

//bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] 
{/* <button className='relative'>
                    <FaRegHeart className='text-2xl text-white/80'/>
                    <div className='w-5 h-5 bg-tertiary rounded-full absolute top-0 right-0 mt-[-18px] flex justify-center items-center mr-[-10px]'>
                        <p className='text-[0.75rem] text-white'>0</p>
                    </div>
                </button> */}

                //allCategoryData.slice(0,6)


                {/* {topCategories?.map((item,index)=>
                (<button className={`flex gap-2 p-2 font-medium  items-center ${(selectedCategory===item && showAdditionalInfo) ? 'text-white/80' : 'text-white'} relative hover:text-white/80 before:w-full before:absolute before:top-0 before:left-0 before:border-2 before:border-tertiary before:scale-0 hover:before:scale-100 transition-all duration-300 before:transition-all before:duration-300`} key={index} onMouseEnter={()=>{setSelectedCategory(item.id);
                setShowAdditionalInfo(true);
                setShowAdditionalBrandInfo(false)}}
                    onMouseLeave={()=>{
                        setShowAdditionalInfo(false)
                    }}

                >
                    
                    <p>{item.Category_name}</p>
                    <FaChevronDown/>
                </button>)
            )} */}


            {/* <div className={`sm:flex gap-6 w-full hidden absolute top-0 md:mt-[45px] mt-[65px] left-0 bg-white shadow-xl transition-all duration-300 overflow-hidden justify-center ${showAdditionalInfo ? 'p-12 max-h-[500px]':'max-h-0'} z-[10]`} onMouseEnter={()=>{
                setShowAdditionalInfo(true);
                setShowAdditionalBrandInfo(false)}} 
                onMouseLeave={()=>setShowAdditionalInfo(false)}
                >
                {displayTypesData && displayTypesData.map((item)=>(
                    <div key={item.id}>
                        <p onClick={()=>addToTypeFilter(item.type_name)} className="text-center font-semibold text-gray-500 cursor-pointer">{item.type_name}</p>
                    </div>
                ))}
            </div> */}



             {/* <div className="lg:flex lg:flex-col w-full px-8 py-1 hidden relative mx-auto bg-tertiary " ref={additionalInfoRef}>
            <div className='lg:flex mx-auto'>
            <button onClick={()=>Inertia.visit('/')} className='font-medium text-white px-2 relative  hover:text-white/80 before:w-full before:absolute before:top-0 before:left-0 before:border-2 before:border-tertiary before:scale-0 hover:before:scale-100 transition-all duration-300 before:transition-all before:duration-300'>Shop</button>
        <button onMouseEnter={()=>
            {   setShowAdditionalInfo(false)
                setShowAdditionalBrandInfo(true)}} onMouseLeave={()=>{
                    
                    setShowAdditionalBrandInfo(false)
                }} className="flex gap-2 p-2 items-center font-medium text-white relative hover:text-white/80 before:w-full before:absolute before:top-0 before:left-0 before:border-2 before:border-tertiary before:scale-0 hover:before:scale-100 transition-all duration-300 before:transition-all before:duration-300">
                    <p>All Brands</p>
                    <FaChevronDown/>
                </button>
            
            

            {topCategories?.map((item,index)=>(
                    <div className='dropdown dropdown-hover' key={index}>
                        <div tabIndex={0} role='button' className='flex gap-1 items-center font-medium text-white py-2 px-2.5'>
                            {item.Category_name} <IoChevronDownOutline/>
                        </div>
                        <ul tabIndex={0} className='dropdown-content menu bg-base-100  z-[1] w-full rounded-md shadow  p-1'>
                            {allTypesData.filter((product)=>product.category_identifier == item.id).map((showproduct,index)=>(
                                <li key={index} onClick={()=>{
                                    setTypeFilters([]);
                                    addToTypeFilter(showproduct.type_name)}} className='text-base p-1 text-gray-600 font-medium cursor-pointer hover:bg-gray-200 rounded-md'>{showproduct.type_name}</li>
                            ))}
                        </ul>
                    </div>
            ))}


            <div className={`sm:flex gap-6 w-full hidden absolute top-0 md:mt-[45px] mt-[65px] left-0 bg-white shadow-xl transition-all duration-300 overflow-hidden justify-center item-center ${showAdditionalBrandInfo ? 'p-12 max-h-[500px]':'max-h-0'} z-[10]`} onMouseEnter={()=>
            {   setShowAdditionalInfo(false)
                setShowAdditionalBrandInfo(true)}} onMouseLeave={()=>{
                    
                    setShowAdditionalBrandInfo(false)
                }}>
                {allBrandsData && allBrandsData.map((item,index)=>(
                    <div key={index} className='w-20 h-6 flex justify-center items-center cursor-pointer' onClick={()=>{
                        setBrandFilters([]);
                        addToBrandFilter(item.brand_name)}}>                    
                      <img src={`${apiUrl}/${item.logo}`} className='w-20' alt={item.brand_name} loading='eager'/>
                    </div>
                ))}
            </div>

        </div>
        
        </div> */}



         // console.log(displayTypesData)
    // console.log(localStorage.getItem('cart'))
    // console.log(displayTypesData)
    // console.log(allCategoryData)
    //const allBrands = [...new Set(allItems.map(product=>product.product_brand))]
    
    // const MainLogoutFunction = async() => {
    //     try {
    //         await auth.signOut()
    //         localStorage.removeItem('authAdmin');
    //         sessionStorage.removeItem('Auth_status_main')
    //         setShowUserMenu(false)
    //         navigate('/login')
            
    //     } catch (error) {
    //       console.log('Error logging out',error)
    //     }
    // }




    {/* <div className='dropdown'>
                <div tabIndex={0} role='button' className='flex gap-2 items-center font-medium px-2.5 py-2 bg-tertiary text-white rounded-t-md' onClick={toggleCategoryDropdown}>
                   <RiMenu2Fill/> SHOP BY CATEGORY <IoChevronDownOutline/>
                     </div>
                { openDropdownCategory &&
                (<ul tabIndex={0} className='dropdown-content menu bg-base-100 z-[50] w-full rounded-sm shadow p-4 flex flex-col gap-2 mt-4 '>
                   {allCategories.map((item,index)=>(
                    <li key={index} onClick={()=>{}} className='text-[1.05rem]'>
                        {item.Category_name}
                    </li>
                   ))} 
                </ul>
                )
                }
            </div> */}