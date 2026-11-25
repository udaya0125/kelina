import  {useContext,useState} from 'react'
// import { MainPartContext } from '../Context/MainContext'
import { MainPartContext } from '@/MainContext/MainContext';
import { FaRegEye } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import {toast} from 'react-toastify'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'; 
import 'swiper/css/navigation'; 
import 'swiper/css/pagination'; 
import {Navigation, Pagination} from 'swiper/modules'
import 'swiper/css/effect-fade'; 
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import {EffectFade, EffectCards, EffectCoverflow} from 'swiper/modules'
import Slider from 'react-slick'
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';


const FeaturedItems = () => {
    const apiUrl = import.meta.env.VITE_APP_URL

    const {allItems,AddToCart,setInfoDialogDetails,infoDialogDetails,setShowInfoDialog} = useContext(MainPartContext)
    const toShowItems = allItems?.slice(0,5)

    const [hoveredProductId, setHoveredProductId] = useState(null)


    function getOldestProducts(products) {
        const sortedProducts = products.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        const latestProducts = sortedProducts.slice(0, 8);
        return latestProducts;
    }
    let oldestProducts = []
    if(allItems){
        oldestProducts = getOldestProducts(allItems)
    }

    const notify = () => toast.success("Added to cart")
    console.log(allItems)

    const PrevArrow = ({ className, style, onClick }) => (
        <div
          className={`${className} z-10 `}
          style={{ ...style, display: "block", left: "12px" }}
          onClick={onClick}
        >
            
          <FaChevronLeft className="sm:text-2xl text-xl text-gray-600 hover:text-gray-800" />
        </div>
      );
      
      const NextArrow = ({ className, style, onClick }) => (
        <div
          className={`${className} z-10`}
          style={{ ...style, display: "block", right: "12px" }}
          onClick={onClick}
        >
          <FaChevronRight className="sm:text-2xl text-xl text-gray-600 hover:text-gray-800" />
        </div>
      );

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        prevArrow: <PrevArrow/>, 
        nextArrow: <NextArrow/>,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          }
        ]
      };


  return (
    <div className='w-full sm:py-12 md:px-20 p-2 '>
        <div className='w-full  pb-2 border-gray-400'>
        <p className='text-gray-600 sm:text-4xl text-3xl font-medium text-center mb-2'>Our Featured Products</p>
        <p className='text-sm text-center'>Uncover the latest trends and must-have items in our carefully selected featured products.</p>
        </div>
    <div className='w-full py-6 custom-carousel-container'>
    <Slider {...settings}>
        {oldestProducts.map((item)=>
                (
                    <div key={item.id} className='slide-item-wrapper'>
                    <div className='rounded-md hover:shadow-md hover:shadow-gray-400 relative bg-white overflow-hidden group shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] my-4'
                         onMouseEnter={()=>setHoveredProductId(item.id)}
                         onMouseLeave={()=>setHoveredProductId(null)}
                    >
                        <div className='overflow-hidden relative group flex justify-center items-center bg-white h-[200px] transition-all duration-500'>
                         {/* <img src={`${apiUrl}/${hoveredProductId === item.id ? item.images[1]?.image_path : item.images[0]?.image_path}`} className='w-[65%] h-44 object-scale-down transition-all duration-500'/> */}

                         <img 
        src={`${apiUrl}/${item.images[0]?.image_path}`}
        className={`sm:w-[45%] w-[70%] sm:h-56 h-44 object-scale-down transition-opacity duration-500 ease-in-out ${
          hoveredProductId === item.id ? 'opacity-0' : 'opacity-100'
        }`}
        alt={item.product_name}
      />
      <img 
        src={`${apiUrl}/${item.images[1]?.image_path}`}
        className={`sm:w-[45%] w-[70%] sm:h-56 h-44 object-scale-down transition-opacity duration-500 ease-in-out absolute top-0 left-0 right-0 bottom-0 m-auto ${
          hoveredProductId === item.id ? 'opacity-100' : 'opacity-0'
        }`}
        alt={`${item.product_name} - Hover`}
        />


                        {/* <div className='flex flex-col gap-2 absolute top-3 right-3 translate-x-[100px]  transition-all duration-500  group-hover:translate-x-0'>
                            <button className='p-2 border-2 border-tertiary bg-tertiary rounded-full' onClick={()=>{AddToCart(item);
                            notify()}}>
                            <IoMdCart className='text-white text-base'/>
                            </button>
                            <button className='p-2 border-2 border-tertiary bg-tertiary rounded-full' onClick={()=>{setShowInfoDialog(true)
                            document.body.style.overflow = 'hidden'
                            setInfoDialogDetails(item)}}>
                            <FaRegEye className='text-white text-base'/>
                            </button>
                        </div> */}
                         <div className='flex flex-col gap-0.5 absolute top-3 right-3 translate-x-[100px] transition-all duration-500 group-hover:translate-x-0'>
                        <button 
                            className='p-1.5 rounded-full tooltip tooltip-left'
                            data-tip="Add to Cart" 
                            onClick={() => { AddToCart(item); notify(); }}
                        >
                            <IoMdCart className=' text-xl text-gray-600' />
                        </button>
                        <button 
                            className='p-1.5 rounded-full tooltip tooltip-left'
                            data-tip="View" 
                            onClick={() => { 
                                setShowInfoDialog(true);
                                document.body.style.overflow = 'hidden';
                                setInfoDialogDetails(item);
                            }}
                        >
                            <FaRegEye className='text-lg text-gray-600' />
                        </button>
                    </div>
                        </div>
                        <div className='p-2 bg-white  w-full sm:h-[120px] h-[100px] flex flex-col justify-between'>
                        <div>
                        <p className='sm:text-base text-sm font-medium'>{item.product_name}</p>
                        <p className='text-sm font-medium text-gray-400'>{item.product_brand}</p>
                        </div>
                        <p className='text-lg font-semibold text-gray-700'>Rs.{item.selling_price}</p>
                         </div>
                    </div>
                    </div>
                )
            )}
        </Slider>
        </div>
    </div>
  )
}

export default FeaturedItems

{/* <button className='bg-tertiary text-white py-1 px-3 rounded-sm border-2 border-tertiary hover:bg-white hover:text-tertiary transition duration-500' >Add to Cart</button> */}


// {/* <Swiper spaceBetween={50}
           
//            effect="coverflow"
//            navigation
//            pagination={{clickable: true}}
//            modules={[EffectCoverflow, Navigation, Pagination]}
//            coverflowEffect={{
//                rotate: 30, 
//                stretch: 5, 
//                depth: 90, 
//                modifier: 1, 
//                slideShadows: true
//            }}
//            onSlideChange={()=>console.log('slide change')}
//                onSwiper={(swiper)=> console.log(swiper)}
               
//                breakpoints={{
//                    640: {
//                        slidesPerView: 1, // For small screens
//                    },
//                    768: {
//                        slidesPerView: 2, // For medium screens
//                    },
//                    1024: {
//                        slidesPerView: 3, // For larger screens
//                    },
//                    1280: {
//                        slidesPerView: 4, // For extra-large screens
//                    },
//                }}
//                >
//        {oldestProducts.map((item)=>
//                (
//                    <SwiperSlide key={item.id}>
//                    <div className='rounded-md hover:shadow-md hover:shadow-gray-400 relative bg-white overflow-hidden group'
//                         onMouseEnter={()=>setHoveredProductId(item.id)}
//                         onMouseLeave={()=>setHoveredProductId(null)}
//                    >
//                        <div className='overflow-hidden relative group flex justify-center items-center bg-white h-[200px] transition-all duration-500'>
//                         {/* <img src={`${apiUrl}/${hoveredProductId === item.id ? item.images[1]?.image_path : item.images[0]?.image_path}`} className='w-[65%] h-44 object-scale-down transition-all duration-500'/> */}

//                         <img 
//        src={`${apiUrl}/${item.images[0]?.image_path}`}
//        className={`w-[45%] h-56 object-scale-down transition-opacity duration-500 ease-in-out ${
//          hoveredProductId === item.id ? 'opacity-0' : 'opacity-100'
//        }`}
//        alt={item.product_name}
//      />
//      <img 
//        src={`${apiUrl}/${item.images[1]?.image_path}`}
//        className={`w-[45%] h-56 object-scale-down transition-opacity duration-500 ease-in-out absolute top-0 left-0 right-0 bottom-0 m-auto ${
//          hoveredProductId === item.id ? 'opacity-100' : 'opacity-0'
//        }`}
//        alt={`${item.product_name} - Hover`}
//        />


//                        {/* <div className='flex flex-col gap-2 absolute top-3 right-3 translate-x-[100px]  transition-all duration-500  group-hover:translate-x-0'>
//                            <button className='p-2 border-2 border-tertiary bg-tertiary rounded-full' onClick={()=>{AddToCart(item);
//                            notify()}}>
//                            <IoMdCart className='text-white text-base'/>
//                            </button>
//                            <button className='p-2 border-2 border-tertiary bg-tertiary rounded-full' onClick={()=>{setShowInfoDialog(true)
//                            document.body.style.overflow = 'hidden'
//                            setInfoDialogDetails(item)}}>
//                            <FaRegEye className='text-white text-base'/>
//                            </button>
//                        </div> */}
//                         <div className='flex flex-col gap-0.5 absolute top-3 right-3 translate-x-[100px] transition-all duration-500 group-hover:translate-x-0'>
//                        <button 
//                            className='p-1.5 rounded-full tooltip tooltip-left'
//                            data-tip="Add to Cart" 
//                            onClick={() => { AddToCart(item); notify(); }}
//                        >
//                            <IoMdCart className=' text-xl text-gray-600' />
//                        </button>
//                        <button 
//                            className='p-1.5 rounded-full tooltip tooltip-left'
//                            data-tip="View" 
//                            onClick={() => { 
//                                setShowInfoDialog(true);
//                                document.body.style.overflow = 'hidden';
//                                setInfoDialogDetails(item);
//                            }}
//                        >
//                            <FaRegEye className='text-lg text-gray-600' />
//                        </button>
//                    </div>
//                        </div>
//                        <div className='p-4 bg-white  w-full h-[80px]'>
//                        <p className='text-lg font-medium text-tertiary'>{item.product_name}</p>
//                         </div>
//                    </div>
//                    </SwiperSlide>
//                )
//            )}
//        </Swiper> */}