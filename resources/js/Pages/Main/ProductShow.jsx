import React, {useState, useContext} from 'react'
import ProductImageZoom from '@/MainComponents/ProductImageZoom'
import { FaPlus } from 'react-icons/fa'
import { FaMinus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import parse from 'html-react-parser'
import { MainPartContext } from '@/MainContext/MainContext'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import ShareButtons from '@/MainComponents/ShareButtons'
import { Helmet } from 'react-helmet-async'
const ProductShow = ({product}) => {

    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''; 
    const imageUrl = product.images[0] ? `${window.location.origin}/${product.images[0].image_path}`:'';


    const {AddToCartWithQuantity} = useContext(MainPartContext)

    const [itemAmount,setItemAmount] = useState(1)

    const increaseItemQuantity = () => {
        setItemAmount((prev)=>prev + 1)
    }

    const decreaseItemQuantity = () => {
        if(itemAmount > 1) {
            setItemAmount((prev)=>prev - 1)
        }
    }

    const notify = () => toast.success('Added to cart')

//   console.log(product)
//   console.log(imageUrl)
//   console.log(currentUrl)

    return (
        <MainPageWrapper>

        <Helmet>
          <title>{product.product_name}</title>
          <meta property="og:title" content={product.product_name} />
          <meta property="og:description" content={product.description} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={currentUrl} />
          <meta property="og:type" content="product" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@YourTwitterHandle" />
        </Helmet>

        <div className={` w-full min-h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-white backdrop-blur-sm flex justify-center items-center `}
        >
           
           <div className='w-full max-w-[1200px] sm:max-h-[90%] h-full  sm:p-8 flex rounded-md relative flex-col sm:flex-row overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-white'>
              
               <ProductImageZoom images={product.images}/>
               <div className='sm:w-[50%] w-full sm:p-10 p-4 flex flex-col gap-3 my-auto'>
                   <p className='text-3xl font-semibold'>{product.product_name}</p>
                   {product.description &&
                   <div>
                   <p className='text-lg font-medium'>Description</p>
                   <p className='text-sm text-gray-500'>{product.description
   }</p>           </div>
                    }
                    {product.specification &&
                   <div>
                   <p className='text-lg font-medium'>Specification</p>
                   {product.specification ? parse(product.specification) : ''}
                   </div>
                   
                    }
                    {product.selling_price &&
                   <div className='flex gap-2'>
                       <p className='text-2xl font-semibold'>Rs.{product.selling_price}</p>
                       {product.discounted_price && <p className='text-2xl text-gray-400 line-through'>Rs.{product.discounted_price}</p>}
                       
                   </div>
                    }
                   <div className='flex gap-2 items-center'>
                       <button className={`py-2 px-3 rounded-sm text-white hover:scale-90 transition duration-300 ${product.instock && product.selling_price ? 'bg-tertiary' : 'bg-gray-300'}`} onClick={decreaseItemQuantity}>
                           <FaMinus/>
                       </button>
                       <div className='border-2 py-1 px-4'><p className=''>{itemAmount}</p></div>
                       <button className={`py-2 px-3 rounded-sm text-white hover:scale-90 transition duration-300 ${product.instock && product.selling_price ? 'bg-tertiary' : 'bg-gray-300'}`} onClick={increaseItemQuantity}>
                           <FaPlus/>
                       </button>
                   </div>
                   {
                    product.instock && product.selling_price 
                    ?
                   (<button className='bg-tertiary rounded-sm py-2 mt-4 text-white border-2 border-tertiary hover:bg-white hover:text-tertiary transition-all duration-300'onClick={()=>{
                       AddToCartWithQuantity(product, itemAmount);
                       setItemAmount(1);
                       notify()
                   }
                   } >Add to Cart</button>)
                   :
                   (
                    <button disabled className='bg-gray-300 text-white rounded-sm py-2 mt-4'>
                        Out of Stock
                    </button>
                   )
                    }
                   <ShareButtons product={product}/>
               </div>
               
           </div>
       </div>
       </MainPageWrapper>
  )
}

export default ProductShow




 {/* <div className='sm:w-[50%] w-full p-10 relative'>
                   <div className='relative w-full h-[300px] flex justify-center items-center'>
                   <img
                   src={`${apiUrl}/${product.images[displayImageIndex].image_path}`}
                   className='w-[75%] mb-4'/>
                   <div className='flex justify-between absolute w-full top-[50%] px-2'>
                           <button onClick={prevImage} className='hover:scale-110 transition duration-300'>
                               <FaChevronLeft className='text-tertiary text-xl'/>
                           </button>
                           <button onClick={nextImage} className='hover:scale-110 transition duration-300'>
                               <FaChevronRight className='text-tertiary text-xl'/>
                           </button>
                       </div>
                   </div>
                   <div className='flex gap-3 overflow-x-scroll mt-6'>
                       {product.images.map((item,index)=>(
                           <div key={index} className={`w-[33%] cursor-pointer border-2 flex justify-center items-center  ${(displayImageIndex === index) ? 'border-tertiary' : 'border-transparent'}`} onClick={()=>setDisplayImageIndex(index)} >
                               <img 
                               src={`${apiUrl}/${item.image_path}`}
                               />
                           </div> 
                       ))}
                      
                   </div>
                   
               </div> */}



               {/* <button className='absolute top-4 right-4 hover:text-red-600 transition duration-300' onClick={()=>{setShowInfoDialog(false);
                document.body.style.overflow = '';
                setDisplayImageIndex(0)}}>
                   <IoClose className='text-3xl'/>
               </button> */}