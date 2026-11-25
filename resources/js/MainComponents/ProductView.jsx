import  { useState,useContext} from 'react'
// import demoProducts from '../dummyData.json'
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
// import { MainPartContext } from '../Context/MainContext';
import { MainPartContext } from '@/MainContext/MainContext';
import parse from 'html-react-parser'
import { toast} from 'react-toastify'
import ProductImageZoom from './ProductImageZoom';
const ProductView = ({product}) => {
    const apiUrl = import.meta.env.VITE_APP_URL

    const {showInfoDialog,setShowInfoDialog,infoDialogDetails,AddToCartWithQuantity} = useContext(MainPartContext)

    // console.log(demoProducts)
    
    // console.log(infoDialogDetails)

    // console.log(showInfoDialog)

    //console.log(infoDialogDetails)

    const notify = () => toast.success('Added to cart')

    const [itemAmount,setItemAmount] = useState(1)

    const increaseItemQuantity = () => {
        setItemAmount((prev)=>prev + 1)
    }

    const decreaseItemQuantity = () => {
        if(itemAmount > 1) {
            setItemAmount((prev)=>prev - 1)
        }
    }

    const [displayImageIndex,setDisplayImageIndex] = useState(0)

    const nextImage = () => {
        if(displayImageIndex < infoDialogDetails.images.length-1){
            setDisplayImageIndex((prev)=>prev+1)
        }
    }

    const prevImage = () => {
        if(displayImageIndex > 0) {
            setDisplayImageIndex((prev)=>prev-1)
        }
    }


    

  return (
    <>
    { showInfoDialog && 
    (<div className={`fixed inset-0 z-[150] w-full min-h-screen bg-black/20 backdrop-blur-sm flex justify-center items-center ${showInfoDialog ? 'block': 'hidden'}`}
     >
        
        <div className='w-full max-w-[1000px] sm:max-h-[90%] h-full  sm:p-8 flex rounded-md relative flex-col sm:flex-row overflow-auto bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] bg-white'>
            {/* <div className='sm:w-[50%] w-full p-10 relative'>
                <div className='relative w-full h-[300px] flex justify-center items-center'>
                <img
                src={`${apiUrl}/${infoDialogDetails.images[displayImageIndex].image_path}`}
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
                    {infoDialogDetails.images.map((item,index)=>(
                        <div key={index} className={`w-[33%] cursor-pointer border-2 flex justify-center items-center  ${(displayImageIndex === index) ? 'border-tertiary' : 'border-transparent'}`} onClick={()=>setDisplayImageIndex(index)} >
                            <img 
                            src={`${apiUrl}/${item.image_path}`}
                            />
                        </div> 
                    ))}
                   
                </div>
                
            </div> */}
            <ProductImageZoom images={infoDialogDetails.images}/>
            <div className='sm:w-[50%] w-full sm:p-10 p-4 flex flex-col gap-3 my-auto'>
                <p className='text-3xl font-semibold'>{infoDialogDetails.product_name}</p>
                {infoDialogDetails.description &&
                <div>
                <p className='text-lg font-medium'>Description</p>
                <p className='text-sm text-gray-500'>{infoDialogDetails.description
}</p>           </div>
                }
                {infoDialogDetails.specification &&
                (<div>
                <p className='text-lg font-medium'>Specification</p>
                <div>
                {infoDialogDetails.specification ? parse(infoDialogDetails.specification) : ''}
                </div>
                </div>
                )
                }
                {
                    infoDialogDetails.selling_price &&
                (<div className='flex gap-2'>
                    <p className='text-2xl font-semibold'>Rs.{infoDialogDetails.selling_price}</p>
                    {infoDialogDetails.discounted_price && <p className='text-2xl text-gray-400 line-through'>Rs.{infoDialogDetails.discounted_price}</p>}
                    
                </div>
                )
                }
                <div className='flex gap-2 items-center'>
                    <button className={`py-2 px-3  rounded-sm text-white hover:scale-90 transition duration-300 ${infoDialogDetails.instock && infoDialogDetails.selling_price!==null ? 'bg-tertiary' : 'bg-gray-300'}`} onClick={decreaseItemQuantity}
                    disabled={infoDialogDetails.instock === 0}
                    >
                        <FaMinus/>
                    </button>
                    <div className='border-2 py-1 px-4'><p className=''>{itemAmount}</p></div>
                    <button className={`py-2 px-3 ${infoDialogDetails.instock && infoDialogDetails.selling_price!==null  ? 'bg-tertiary' : 'bg-gray-300'} rounded-sm text-white hover:scale-90 transition duration-300`} onClick={increaseItemQuantity}
                    disabled={infoDialogDetails.instock === 0}>
                        <FaPlus/>
                    </button>
                </div>
                {
                    infoDialogDetails.instock && infoDialogDetails.selling_price
                    ?
                (<button className='bg-tertiary rounded-sm py-2 mt-4 text-white border-2 border-tertiary hover:bg-white hover:text-tertiary transition-all duration-300'onClick={()=>{
                    AddToCartWithQuantity(infoDialogDetails, itemAmount);
                    setItemAmount(1);
                    notify()
                }
                } >Add to Cart</button>)
                :
                (<button disabled className='bg-gray-300 text-white rounded-sm py-2 mt-4'>
                        Out of Stock
                </button>)
                }
            </div>
            <button className='absolute top-4 right-4 hover:text-red-600 transition duration-300' onClick={()=>{setShowInfoDialog(false);
             document.body.style.overflow = '';
             setDisplayImageIndex(0)}}>
                <IoClose className='text-3xl'/>
            </button>
        </div>
    </div>
    )
    }
    </>
  )
           
        }
 

export default ProductView

{/* <img src={infoDialogDetails.images[displayImageIndex]}  */}