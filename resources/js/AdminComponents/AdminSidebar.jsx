
import React, { useState, useContext } from 'react'
import { AdminDataContext } from '@/AdminContext/AdminContext'
import { Link } from '@inertiajs/react'
import { FaChevronDown } from 'react-icons/fa6'
import { FaUserCircle } from 'react-icons/fa'
import { IoTicket } from "react-icons/io5";
import { RiFileWarningFill, RiShoppingBag4Fill } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { FaBook } from "react-icons/fa6";
import { MdClose } from 'react-icons/md'
import SaitLogo from '../../../public/assets/sait white logo.png'
import { IoArrowForwardSharp } from 'react-icons/io5'
import { IoArrowBackSharp } from 'react-icons/io5'
import { FiMenu } from "react-icons/fi";
import { FaChevronRight } from 'react-icons/fa6'
import { FaRegImages } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaDisplay } from "react-icons/fa6";
import { HiInformationCircle } from 'react-icons/hi'
import { FaUserFriends } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";


const AdminSidebar = ({pageLocation}) => {
    const {showResponsiveAdminSidebar, setShowResponsiveSidebar, toggleSidebar, setToggleSidebar} = useContext(AdminDataContext)

    
    const [showComplainRecordSection, setShowComplainRecordSection] = useState(false)

    const [showProductSection, setShowProductSection] = useState(false)


    const [showShowCaseSection, setShowShowCaseSection] = useState(false)



    const [showPromoCodeSection, setShowPromoCodeSection] = useState(true)

    const [showOrderSection, setShowOrderSection] = useState(true)

    const [showLogsSection, setShowLogsSection] = useState(true)




    const isProductActive =['/saitadmin/productcategory', '/saitadmin/producttype', '/saitadmin/productbrand', '/saitadmin/products'].includes(pageLocation);

    const isShowCaseActive = ['/saitadmin/featuredproduct', '/saitadmin/onsale', '/saitadmin/newarrival', '/saitadmin/bestdeals'].includes(pageLocation); 

    
    const isDashboardActive = ['/saitadmin'].includes(pageLocation)
    const isComplainRecordActive = ['/saitadmin/complain-record'].includes(pageLocation)

    const isPromoCodeActive = ['/saitadmin/promocode'].includes(pageLocation);

    const isOrdersActive = ['/saitadmin/orders'].includes(pageLocation); 

    const isLogsActive = ['/saitadmin/logs'].includes(pageLocation);

    const isBannerActive = ['/saitadmin/banner'].includes(pageLocation);

    const isAboutusActive = ['/saitadmin/aboutus'].includes(pageLocation);

    const isEmployeeActive = ['/saitadmin/employee'].includes(pageLocation);

    const isGalleryActive = ['/saitadmin/gallery'].includes(pageLocation);

    //console.log(pageLocation)

    // {toggleSidebar ? <IoArrowForwardSharp className='text-xl'/> : <IoArrowBackSharp className='text-xl'/>}
    //rounded-tr-[50px]
  return (
    <div className={` sm:fixed h-screen overflow-y-scroll bg-base-100  text-black sm:pt-8 pt-24 pb-16 absolute sm:scale-100 origin-top-left transition-all duration-300 lg:top-16  ${showResponsiveAdminSidebar ? 'scale-100 z-[150]' : 'scale-0 z-[150]'}  left-scrollbar-sidebar ${toggleSidebar ? 'w-[4%]' : 'md:w-[30%] lg:w-[15%]'} shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}>

<button className='hidden sm:block ml-auto mr-4 mb-4 text-base-content p-0.5' onClick={()=>setToggleSidebar((prev)=>!prev)}><FiMenu className='text-xl'/></button>

        {/* <Link href='/saitadmin' className=' text-xl font-medium '>
            <img src={SaitLogo} className='w-20'/>
        </Link> */}

        {/* <button className='absolute top-2 right-2'>
            <MdClose/>
        </button> */}

        <Link href='/saitadmin' className={`${isDashboardActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <RiDashboardHorizontalFill className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Dashboard</p>
            </Link>
            

        <div className='w-full flex flex-col mt-1'>
            <button className={`${isProductActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-base  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent  transition-all duration-300  px-3 justify-between py-2`} onClick={()=>setShowProductSection(!showProductSection)}>
                <div className='flex items-center gap-2'>
                <AiFillProduct className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>Products</p>
                </div>
                <FaChevronRight className={`transition-transform duration-300 text-xs ${showProductSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden' : ''}`}/>
            </button>
            <div className={`${showProductSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
                <Link href='/saitadmin/productcategory' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/productcategory')?'text-saitblue':'text-base-content'}`}>Product Category</Link>
                <Link href='/saitadmin/producttype' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/producttype')?'text-saitblue':'text-base-content'}`}>Product Type</Link>
                <Link href='/saitadmin/productbrand' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/productbrand')?'text-saitblue':'text-base-content'}`}>Product Brand</Link>
                <Link href='/saitadmin/products' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/products')?'text-saitblue':'text-base-content'}`}>Product</Link>
                {/* <Link href='/saitadmin/featuredproduct' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/featuredproduct') ? 'text-saitblue' : 'text-base-content'}`}>Featured Product</Link> */}
            </div>  
        </div>


        <div className='w-full flex flex-col mt-1'>
            <button className={`${isShowCaseActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-base  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent  transition-all duration-300  px-3 justify-between py-2`} onClick={()=>setShowShowCaseSection(!showShowCaseSection)}>
                <div className='flex items-center gap-2'>
                <FaDisplay className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>ShowCase</p>
                </div>
                <FaChevronRight className={`transition-transform duration-300 text-xs ${showShowCaseSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden' : ''}`}/>
            </button>
            <div className={`${showShowCaseSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
                
                <Link href='/saitadmin/featuredproduct' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/featuredproduct') ? 'text-saitblue' : 'text-base-content'}`}>Featured</Link>
                <Link href='/saitadmin/onsale' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/onsale') ? 'text-saitblue' : 'text-base-content'}`}>OnSale</Link>
                <Link href='/saitadmin/newarrival' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/newarrival') ? 'text-saitblue' : 'text-base-content'}`}>New Arrival</Link>
                <Link href='/saitadmin/bestdeals' className={`py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/bestdeals') ? 'text-saitblue' : 'text-base-content'}`}>Best Deals</Link>
            </div>  
        </div>

        {/* <div className='w-full flex flex-col'>
            <button className={`${isOrdersActive ? 'bg-accent text-base-content' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent  hover:border-l-accent  transition-all duration-300  px-3 justify-between py-3`} onClick={()=>setShowOrderSection(!showOrderSection)}>
                <div className='flex items-center gap-2'>
                <RiShoppingBag4Fill className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium ${toggleSidebar ? 'hidden': ''}`}>Orders</p>
                </div>
                <FaChevronRight className={`transition-transform duration-300 text-xs ${showOrderSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden': ''} ${toggleSidebar ? 'hidden' : ''}`}/>
            </button>
            <div className={`${showOrderSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
                <Link href='/saitadmin/orders' className={` py-1 hover:text-saitblue transition-all text-sm ${(pageLocation==='/saitadmin/orders')?'text-saitblue':'text-base-content'}`}>Orders</Link>       
            </div>  
        </div> */}

        <Link href='/saitadmin/orders' className={`${isOrdersActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <RiShoppingBag4Fill className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Orders</p>
            </Link>

             <Link href='/saitadmin/complain-record' className={`${isComplainRecordActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <RiFileWarningFill className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Complain Record</p>
            </Link>

        {/* <div className='w-full flex flex-col'>
            <button className={`${isPromoCodeActive ? 'bg-accent text-base-content' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 justify-between py-3`} onClick={()=>setShowPromoCodeSection(!showPromoCodeSection)}>
                <div className='flex items-center gap-2'>
                <IoTicket className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>Promo Code</p>
                </div>
                <FaChevronRight className={`transition-transform duration-300 text-xs ${showPromoCodeSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden' : ''}`}/>
            </button>
            <div className={`${showPromoCodeSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
                <Link href='/saitadmin/promocode' className={` py-1 hover:text-saitblue transition-all text-sm ${(pageLocation==='/saitadmin/promocode')?'text-saitblue':'text-base-content'}`}>Promo Code</Link>       
            </div>  
        </div> */}

        <Link href='/saitadmin/promocode' className={`${isPromoCodeActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <IoTicket className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Promo Code</p>
        </Link>

        <Link href='/saitadmin/banner' className={`${isBannerActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <FaRegImages className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Banner</p>
        </Link>

        <Link href='/saitadmin/gallery' className={`${isGalleryActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <FaCamera className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Gallery</p>
        </Link>


        <Link href='/saitadmin/employee' className={`${isEmployeeActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <FaUserFriends className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Employees</p>
        </Link>


        <Link href='/saitadmin/aboutus' className={`${isAboutusActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <HiInformationCircle className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>About Us</p>
        </Link>


        {/* <div className='w-full flex flex-col'>
            <button className={`${isLogsActive ? 'bg-accent text-base-content' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent  transition-all duration-300  px-3 justify-between py-3`} onClick={()=>setShowLogsSection(!showLogsSection)}>
                <div className='flex items-center gap-2'>
                <FaBook className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>Logs</p>
                </div>
                <FaChevronRight className={`transition-transform duration-300 text-xs ${showLogsSection ? 'rotate-90' : ''}`}/>
            </button>
            <div className={`${showLogsSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
                <Link href='/saitadmin/logs' className={` py-1 hover:text-saitblue transition-all text-sm ${(pageLocation==='/saitadmin/logs')?'text-saitblue':'text-base-content'}`}>Logs</Link>       
            </div>  
        </div> */}

        <Link href='/saitadmin/logs' className={`${isLogsActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
                <FaBook className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
                <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Log</p>
            </Link>




    </div>
  )
}

export default AdminSidebar



// INSERT INTO laravel_ecommerce.brands (id, brand_name, logo, created_at, updated_at)
// SELECT id, brand_name, logo, created_at, updated_at
// FROM ecommerce.brands;


//id image_path product_identifier created_at updated_at



// import React, { useState, useContext } from 'react'
// import { AdminDataContext } from '@/AdminContext/AdminContext'
// import { Link } from '@inertiajs/react'
// import { FaChevronDown } from 'react-icons/fa6'
// import { FaUserCircle } from 'react-icons/fa'
// import { IoTicket } from "react-icons/io5";
// import { RiShoppingBag4Fill } from "react-icons/ri";
// import { AiFillProduct } from "react-icons/ai";
// import { FaBook } from "react-icons/fa6";
// import { MdClose } from 'react-icons/md'
// import SaitLogo from '../../../public/assets/sait white logo.png'
// import { IoArrowForwardSharp } from 'react-icons/io5'
// import { IoArrowBackSharp } from 'react-icons/io5'
// import { FiMenu } from "react-icons/fi";
// import { FaChevronRight } from 'react-icons/fa6'
// import { FaRegImages } from "react-icons/fa6";
// import { RiDashboardHorizontalFill } from "react-icons/ri";



// const AdminSidebar = ({pageLocation}) => {
//     const {showResponsiveAdminSidebar, setShowResponsiveSidebar, toggleSidebar, setToggleSidebar} = useContext(AdminDataContext)


//     const [showProductSection, setShowProductSection] = useState(false)

//     const [showPromoCodeSection, setShowPromoCodeSection] = useState(true)

//     const [showOrderSection, setShowOrderSection] = useState(true)

//     const [showLogsSection, setShowLogsSection] = useState(true)


//     const isProductActive =['/saitadmin/productcategory', '/saitadmin/producttype', '/saitadmin/productbrand', '/saitadmin/products', '/saitadmin/featuredproduct'].includes(pageLocation);
    
//     const isDashboardActive = ['/saitadmin'].includes(pageLocation)

//     const isPromoCodeActive = ['/saitadmin/promocode'].includes(pageLocation);

//     const isOrdersActive = ['/saitadmin/orders'].includes(pageLocation); 

//     const isLogsActive = ['/saitadmin/logs'].includes(pageLocation);

//     const isBannerActive = ['/saitadmin/banner'].includes(pageLocation);
//     //console.log(pageLocation)

//     // {toggleSidebar ? <IoArrowForwardSharp className='text-xl'/> : <IoArrowBackSharp className='text-xl'/>}
//     //rounded-tr-[50px]
//   return (
//     <div className={` sm:fixed h-screen overflow-y-scroll bg-base-100  text-black sm:pt-8 pt-24 pb-16 absolute sm:scale-100 origin-top-left transition-all duration-300 lg:top-16  ${showResponsiveAdminSidebar ? 'scale-100 z-[150]' : 'scale-0 z-[150]'}  left-scrollbar-sidebar ${toggleSidebar ? 'w-[4%]' : 'md:w-[30%] lg:w-[15%]'} shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}>

// <button className='hidden sm:block ml-auto mr-4 mb-4 text-base-content p-0.5' onClick={()=>setToggleSidebar((prev)=>!prev)}><FiMenu className='text-xl'/></button>

//         {/* <Link href='/saitadmin' className=' text-xl font-medium '>
//             <img src={SaitLogo} className='w-20'/>
//         </Link> */}

//         {/* <button className='absolute top-2 right-2'>
//             <MdClose/>
//         </button> */}

//         <Link href='/saitadmin' className={`${isDashboardActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
//                 <RiDashboardHorizontalFill className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Dashboard</p>
//             </Link>
            

//         <div className='w-full flex flex-col mt-1'>
//             <button className={`${isProductActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-base  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent  transition-all duration-300  px-3 justify-between py-2`} onClick={()=>setShowProductSection(!showProductSection)}>
//                 <div className='flex items-center gap-2'>
//                 <AiFillProduct className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>Products</p>
//                 </div>
//                 <FaChevronRight className={`transition-transform duration-300 text-xs ${showProductSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden' : ''}`}/>
//             </button>
//             <div className={`${showProductSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
//                 <Link href='/saitadmin/productcategory' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/productcategory')?'text-saitblue':'text-base-content'}`}>Product Category</Link>
//                 <Link href='/saitadmin/producttype' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/producttype')?'text-saitblue':'text-base-content'}`}>Product Type</Link>
//                 <Link href='/saitadmin/productbrand' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/productbrand')?'text-saitblue':'text-base-content'}`}>Product Brand</Link>
//                 <Link href='/saitadmin/products' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/products')?'text-saitblue':'text-base-content'}`}>Product</Link>
//                 <Link href='/saitadmin/featuredproduct' className={` py-1 hover:text-saitblue transition-all text-[0.85rem] ${(pageLocation==='/saitadmin/featuredproduct') ? 'text-saitblue' : 'text-base-content'}`}>Featured Product</Link>
//             </div>  
//         </div>

//         {/* <div className='w-full flex flex-col'>
//             <button className={`${isOrdersActive ? 'bg-accent text-base-content' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent  hover:border-l-accent  transition-all duration-300  px-3 justify-between py-3`} onClick={()=>setShowOrderSection(!showOrderSection)}>
//                 <div className='flex items-center gap-2'>
//                 <RiShoppingBag4Fill className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium ${toggleSidebar ? 'hidden': ''}`}>Orders</p>
//                 </div>
//                 <FaChevronRight className={`transition-transform duration-300 text-xs ${showOrderSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden': ''} ${toggleSidebar ? 'hidden' : ''}`}/>
//             </button>
//             <div className={`${showOrderSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
//                 <Link href='/saitadmin/orders' className={` py-1 hover:text-saitblue transition-all text-sm ${(pageLocation==='/saitadmin/orders')?'text-saitblue':'text-base-content'}`}>Orders</Link>       
//             </div>  
//         </div> */}

//         <Link href='/saitadmin/orders' className={`${isOrdersActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
//                 <RiShoppingBag4Fill className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Orders</p>
//             </Link>

//         {/* <div className='w-full flex flex-col'>
//             <button className={`${isPromoCodeActive ? 'bg-accent text-base-content' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 justify-between py-3`} onClick={()=>setShowPromoCodeSection(!showPromoCodeSection)}>
//                 <div className='flex items-center gap-2'>
//                 <IoTicket className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>Promo Code</p>
//                 </div>
//                 <FaChevronRight className={`transition-transform duration-300 text-xs ${showPromoCodeSection ? 'rotate-90' : ''} ${toggleSidebar ? 'hidden' : ''}`}/>
//             </button>
//             <div className={`${showPromoCodeSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
//                 <Link href='/saitadmin/promocode' className={` py-1 hover:text-saitblue transition-all text-sm ${(pageLocation==='/saitadmin/promocode')?'text-saitblue':'text-base-content'}`}>Promo Code</Link>       
//             </div>  
//         </div> */}

//         <Link href='/saitadmin/promocode' className={`${isPromoCodeActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
//                 <IoTicket className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Promo Code</p>
//         </Link>

//         <Link href='/saitadmin/banner' className={`${isBannerActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
//                 <FaRegImages className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Banner</p>
//         </Link>


//         {/* <div className='w-full flex flex-col'>
//             <button className={`${isLogsActive ? 'bg-accent text-base-content' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent  transition-all duration-300  px-3 justify-between py-3`} onClick={()=>setShowLogsSection(!showLogsSection)}>
//                 <div className='flex items-center gap-2'>
//                 <FaBook className={`${toggleSidebar ? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium ${toggleSidebar ? 'hidden' : ''}`}>Logs</p>
//                 </div>
//                 <FaChevronRight className={`transition-transform duration-300 text-xs ${showLogsSection ? 'rotate-90' : ''}`}/>
//             </button>
//             <div className={`${showLogsSection ? 'max-h-[500px]': 'max-h-0'} overflow-hidden transition-height duration-300 pl-8 flex flex-col ${toggleSidebar ? 'hidden' : ''}`}>
//                 <Link href='/saitadmin/logs' className={` py-1 hover:text-saitblue transition-all text-sm ${(pageLocation==='/saitadmin/logs')?'text-saitblue':'text-base-content'}`}>Logs</Link>       
//             </div>  
//         </div> */}

//         <Link href='/saitadmin/logs' className={`${isLogsActive ? 'bg-accent text-saitblue' : 'hover:bg-accent/30 text-base-content'} text-lg  flex gap-2 items-center border-l-[4px] border-transparent hover:border-l-accent transition-all duration-300  px-3 py-2`}>
//                 <FaBook className={`${toggleSidebar? 'text-lg' : 'text-lg'}`}/>
//                 <p className={`font-medium text-base ${toggleSidebar ? 'hidden' : ''}`}>Log</p>
//             </Link>




//     </div>
//   )
// }

// export default AdminSidebar



// // INSERT INTO laravel_ecommerce.brands (id, brand_name, logo, created_at, updated_at)
// // SELECT id, brand_name, logo, created_at, updated_at
// // FROM ecommerce.brands;


// //id image_path product_identifier created_at updated_at




