import {useContext} from 'react'
// import { MainPartContext } from '../Context/MainContext'
import { MainPartContext } from '@/MainContext/MainContext';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";

import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';
import MainPageWrapper from '@/MainComponents/MainPageWrapper';
// import backgroundImage  from '../../assets/background_check.jpg'
import HoverCard from '@/MainComponents/HoverCard';
import { usePage } from '@inertiajs/react';
const CartPage = () => {
    const apiUrl = import.meta.env.VITE_APP_URL

    const {props} = usePage();  

    // console.log(props)

    const {cart,setCart,SubTotal,VatAmount,TotalAmount, IncreaseQuantity, DecreaseQuantity, RemoveFromCart,loggedUser,TotalQuantity, promoCode, setPromoCode, discountAmount, error, handleApplyPromoCode} = useContext(MainPartContext)
    // console.log(cart)
    // console.log(SubTotal, VatAmount, TotalAmount)
    const totalAmountPerItem = (price,quantity)  =>{
            return (price * quantity).toFixed(2)
    }
   
    // console.log(cart)
    // console.log(loggedUser)


    // const handlePlaceOrder = async() => {
    //     if(loggedUser){
    //        try {
    //         const response =await axios.post('http://localhost:3000/adduserorder',{
    //             user_id:loggedUser.uid,
    //             total_quantity:TotalQuantity,
    //             total_amount:TotalAmount,
    //             cart:cart
    //         })
    //         if(response.status === 200){
    //             console.log('successful')
    //             setCart([])
    //             localStorage.removeItem('cart')
    //         }
    //         else {
    //             console.log('unsuccessful')
    //         }
    //        } catch (error) {
    //         console.log('Error placing order',error)
    //        }
          
    //     }
    //     else {
    //         navigate('/login')
    //     }
    // }

    // console.log(TotalQuantity)

    //sm:mt-[180px] mt-[130px]


    // bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]

  return (
    <MainPageWrapper loggedUser = {props?.auth?.user}>
    <div className='w-full min-h-screen flex justify-center lg:px-16 '>
        
        <div className='w-full   rounded-md  my-20 md:my-8 gap-4 flex flex-col lg:flex-row h-[800px] lg:h-[500px] '>
            <div className='lg:w-[65%] w-full p-8  rounded-md overflow-x-scroll bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                <h1 className='text-2xl font-semibold text-tertiary underline'>Cart Items</h1>
                <table className='w-full my-4'>
                    <tbody>
                        
                            <tr className='bg-gray-100'>
                            <th className='uppercase text-tertiary'>S.No</th>
                            <th className='uppercase text-tertiary '>Image</th>
                            <th className='uppercase text-tertiary'>product</th>
                            <th className='uppercase text-tertiary'>price</th>
                            <th className='uppercase text-tertiary'>quantity</th>
                            <th className='uppercase text-tertiary'>total</th>
                            <th className='uppercase text-tertiary'>remove</th>
                            </tr>
                            {cart.map((cartitem,index)=>(
                                
                                <tr key={cartitem.id} className='my-4'>
                                   <td className='text-center p-1'>{index +1 }.</td> 
                                   <td className='p-1'>
                                    <img 
                                    src={`${apiUrl}/${cartitem.images[0]?.image_path}`}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/200x200'; }} 
                                    className='w-20 h-20 rounded-sm object-contain'/>
                                   </td>
                                   <td className='text-center p-1'>
                                    {cartitem.product_name}
                                   </td>
                                   <td className='text-center'>
                                    Rs.{cartitem.selling_price}
                                   </td>
                                   <td className='p-1'>
                                    <div className='flex gap-2 items-center justify-center'>
                                        <button onClick={()=>DecreaseQuantity(cartitem.id)} className='bg-tertiary p-1 rounded-full text-white'>
                                            <FaMinus className='text-sm'/>
                                        </button>
                                    {cartitem.quantity}
                                    <button 
                                    onClick={()=>IncreaseQuantity(cartitem.id)} 
                                    className='bg-tertiary p-1 rounded-full text-white'>
                                        <FaPlus className='text-sm'/>
                                    </button>
                                    </div>
                                   </td>
                                   <td className='text-center p-1'>
                                    Rs. 
                                    {totalAmountPerItem(cartitem.selling_price,cartitem.quantity)}
                                   </td>
                                   <td className='text-center p-1'>
                                    <button className='bg-red-200 p-1 rounded-full hover:scale-125 transition-all duration-100' onClick={()=>RemoveFromCart(cartitem.id)}>
                                    <MdDelete className='text-lg text-red-500'/>
                                    </button>
                                   </td>
                                </tr>
                               
                            ))}
                    </tbody>
                </table>

                
            </div>
            <div className='lg:w-[35%] w-full p-8 flex flex-col justify-between bg-white rounded-md shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
               
            <div className='flex flex-col mt-3'>
                <p className='text-2xl font-semibold text-tertiary underline'>Payment Details</p>
                    <div className='flex justify-between border-b-2 border-tertiary py-3'>
                        <p>SubTotal</p>
                        <p className='font-semibold'>Rs.{SubTotal}</p>
                    </div>
                    {/* <div className='flex justify-between border-b-2 border-tertiary py-3'>
                        <p>VAT Amount <span className='text-gray-500 text-sm'>(13%)</span></p>
                        <p className='font-semibold'>Rs.{VatAmount}</p>
                    </div> */}
                    <div className='flex justify-between border-b-2 border-tertiary py-3'>
                        <p>Total</p>
                        <p className='font-semibold'>Rs.{TotalAmount}</p>
                    </div>
               </div>
               <div className='w-full'>
               <div className=' flex gap-2 items-center my-6 lg:my-0'>
               <input className='rounded-md border-2 p-1.5 w-full' placeholder='Promo Code' value={promoCode} onChange={(e)=>setPromoCode(e.target.value)}/>     
               <button onClick={handleApplyPromoCode} className='bg-tertiary px-2 py-1.5 rounded-md text-white border-2 border-tertiary'>Apply</button>    
               </div>
               {discountAmount > 0 && <p className='text-green-600 text-sm'>Discount of Rs.{discountAmount} Applied</p> }
               {error && <p className="text-red-500 text-sm">{error}</p>}
               </div>
               
               <div>
               <button onClick={()=>Inertia.visit('/checkout', {preserveState: true})} className='w-full bg-tertiary py-2 rounded-md text-white border-2 border-tertiary hover:bg-gray-100 hover:text-tertiary transition duration-300'>Proceed to Checkout</button>
               <button className='flex gap-2 items-center text-tertiary mt-4 hover:text-tertiary/60 transition duration-300' onClick={()=>Inertia.visit('/')}>
                   <FaArrowLeftLong/> <p className='text-lg'>Continue Shopping</p>       
               </button>
               </div>
            </div>
        </div>
    </div>
    </MainPageWrapper>
  )
}

export default CartPage