import {useContext, useEffect, useState} from 'react'
import { MainPartContext } from '@/MainContext/MainContext';
import axios from 'axios'
import notFoundImg from '../../../../public/assets/not-found.png'
import StatusPin from '@/MainComponents/StatusPin';
import MainPageWrapper from '@/MainComponents/MainPageWrapper';
import { usePage } from '@inertiajs/react';
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import Slider from 'react-slick'; 
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';
import { IoIosHeart } from "react-icons/io";
import { IoMdCart } from 'react-icons/io';
import WishlistItems from '@/MainComponents/WishlistItems';
import ProductView from '@/MainComponents/ProductView';
import CompareNavigator from '@/MainComponents/CompareNavigator';

const UserProfile = () => {
    // const {loggedUser} = useContext(MainPartContext)
    const {AddToCart} = useContext(MainPartContext)
    const {props} = usePage();
    const [userOrders,setUserOrders] = useState([])

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchClicked,setSearchClicked] = useState(false)
    
    const [showCancellationDialog, setShowCancellationDialog] = useState(false)
    const [cancellationOrderId, setCancellationOrderId] = useState('')
    const [cancellationReason, setCancellationReason] = useState('')

    const [reloadDataTrigger, setReloadDataTrigger] = useState(false)
    
    const [allWishlistItems,setAllWishlistItems] = useState([])

    const [reloadWishlistDataTrigger, setReloadWishlistDataTrigger] = useState(false)

    const ordersByOrderId = {}
    
    userOrders.forEach(order => {
        const {order_id, ...orderItem} = order;
        console.log(order_id)
        console.log(orderItem)
        if (!ordersByOrderId[order_id]) {
            ordersByOrderId[order_id] = [orderItem];
          } else {
            ordersByOrderId[order_id].push(orderItem);
          }
    })

    const apiUrl = import.meta.env.VITE_APP_URL

    // console.log(userOrders)
    // console.log(ordersByOrderId)

    // const handleSearch = () => {
    //     const results = Object.values(ordersByOrderId).flatMap((order) =>
    //     Array.isArray(order) ? order.filter((item) => item.id.toString() === searchTerm) : []
    //     );
    //     setSearchResults(results);
    //   };
    const loggedUser = props?.auth?.user
    //console.log(props?.auth?.user?.id)

    const searchOrderById = (itemId) => {
        return userOrders.filter(order => order.order_id === itemId.trim())
    }

  

    const handleItemSearch = () => {
        setSearchClicked(true)
        setSearchResults(searchOrderById(searchTerm))
        
    }

    // console.log(searchResults)


    useEffect(()=>{
        const fetchUserOrders = async()=>{
            try {
                const response = await axios.post(route('order.user'),{
                   user_id:props.auth.user.id 
                })
                setUserOrders(response.data.orders)
            } catch (error) {
               console.log('Error fetching',error) 
            }
        }
        fetchUserOrders()
    },[loggedUser,reloadDataTrigger])

//   console.log(userOrders) 

// console.log(userOrders)
//   console.log(ordersByOrderId)

const handleCancellation = async(e) => {
    e.preventDefault(); 
    console.log(cancellationOrderId)
    try {
        const response = await axios.post(route('order.cancel'),{
            order_id:cancellationOrderId, 
            cancellation_reason:cancellationReason
        })
        toast.success('Order Cancelled')
        setShowCancellationDialog(false)
        setReloadDataTrigger((prev)=>!prev)
    } catch (error) {
        console.log('Error cancelling',error)
        toast.error('Error Cancelling Order')
    }
}   


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


// console.log(allWishlistItems)
// console.log(apiUrl)

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

//mt-[180px]
// bg-white  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]
  return (
    <MainPageWrapper loggedUser = {props.auth.user}>
    <div className='w-full min-h-screen flex flex-col gap-4 lg:px-16 p-2 sm:py-10 '>
        <div className='grid sm:grid-cols-3 grid-cols-1'>
        <div className='flex flex-col gap-2 items-start bg-white  rounded-md p-2'>
            <p className='text-xl font-semibold text-tertiary'>Profile</p>
            <div className=' flex gap-2 flex-col '>
                <div className='flex items-center gap-2'>
                    <p className='text-lg font-medium text-gray-600 underline'>Email</p>
                    <p>{loggedUser?.email}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-lg font-medium text-gray-600 underline'>User Name</p>
                    <p>{loggedUser?.name}</p>
                </div>
            </div>
        </div>
        </div>
        <WishlistItems/>
        
        <div className='bg-white p-4 rounded-md'>
            <p className='text-xl font-semibold text-tertiary '>Search Order by ID</p>
            <div className='flex items-center gap-1'>
            <input placeholder='Enter the id' className='border-2 border-gray-400 p-1.5 w-full max-w-[400px] focus:outline-tertiary my-2' onChange={(e)=>{setSearchTerm(e.target.value);
            setSearchClicked(false)}}/>
            <button onClick={()=>handleItemSearch()} className='bg-tertiary text-white p-2 rounded-sm'>Search</button>
            </div>
            {searchResults.length > 0 ? 
            ( 
             <div className='rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                          <div className='px-4 py-4 '>
                <p className='font-medium'>Order Id: <span className='font-normal'>{searchResults[0]?.order_id}</span></p>
                <p className='font-medium'>Total Quantity: <span className='font-normal'>{searchResults[0]?.total_quantity}</span></p>
                <p className='font-medium'>Total Amount: <span className='font-normal'>Rs. {searchResults[0]?.total_amount}</span></p>
            </div>  
            {searchResults[0].items.map((item,index)=>(
            <div key={index} className='flex w-full  gap-6 items-center  px-4 bg-white'>
                <p>{index+1}.</p>
                <div className='w-[33%]'><p className='text-center'>{item.item_name}</p></div>
                <div className='w-[33%]'><p className='text-center'>Rs. {item.product_price}</p></div>
                <div className='w-[33%]'><p className='text-center'>Quantity:{item.quantity}</p></div>
            </div>
        ))} 
            
                    <div className='px-4 w-full mt-2 font-medium '>
                    <p className='text-lg'>Order status:</p>
                     <div className='w-full  overflow-x-scroll'>
                     <StatusPin requestStatus={searchResults[0]?.status}/>
                     </div>
                    </div>  
                 
                  {searchResults[0]?.contact_info ? <p className='pl-4 text-gray-500 pb-4 italic'>**For any enquiry contact <span className='font-semibold'>{searchResults[0].contact_info}
                  </span></p> : ''}
            </div>  
            ) : searchClicked ? 
                (<div className='w-full justify-center flex flex-col items-start'>
                    <img src={notFoundImg} className='w-32 h-32'/>
                    <p className='text-center text-xl text-purple-600 font-medium'>No Results</p></div>)
                : null
            }
         </div>
        <div className='flex flex-col gap-2 items-start bg-white p-4 rounded-md'>
        <p className='text-xl font-semibold text-tertiary'>Orders</p>
           
            {/* {Object.entries(ordersByOrderId).map(([orderId, orderItems]) => (
                
                 <div key={orderId} className='w-full border-2 border-tertiary rounded-md'>
                     {userOrders && (
            <div className='px-4 py-4 '>
                <p className='font-medium'>Order Id: <span className='font-normal'>{orderId}</span></p>
                <p className='font-medium'>Total Quantity: <span className='font-normal'>{orderItems[0]?.total_quantity}</span></p>
                <p className='font-medium'>Total Amount: <span className='font-normal'>Rs. {orderItems[0]?.total_amount}</span></p>
            </div> 
        )}
        {orderItems && orderItems.map((item,index)=>(
            <div key={index} className='flex w-full  gap-6 items-center  px-4 bg-white'>
                <p>{index+1}.</p>
                <div className='w-[33%]'><p className='text-center'>{item.item_name}</p></div>
                <div className='w-[33%]'><p className='text-center'>Rs. {item.product_price}</p></div>
                <div className='w-[33%]'><p className='text-center'>Quantity:{item.quantity}</p></div>
            </div>
        ))}
                  {orderItems && 
                  (
                    <div className='px-4 w-full mt-2 font-medium '>
                    <p className='text-lg'>Order status:</p>
                     <div className='w-full h-[100px] overflow-x-scroll'>
                     <StatusPin requestStatus={orderItems[0]?.status}/>
                     </div>
                    </div>  
                  )}
                  {orderItems[0]?.contact_info ? <p className='pl-4 text-gray-500 pb-4 italic'>**For any enquiry contact <span className='font-semibold'>{orderItems[0].contact_info}
                  </span></p> : ''}
                 </div>
            ))} */}

{Object.entries(ordersByOrderId).map(([orderId, orderItems]) => (
  <div key={orderId} className="w-full  rounded-md border-2 relative">
    <button onClick={()=>{setShowCancellationDialog(true);
        setCancellationOrderId(orderId)
    }} className='flex items-center gap-1 absolute top-2 right-2 bg-slate-900 text-white/80 px-2 py-1 rounded-sm text-sm sm:text-base'
    disabled={orderItems[0].status==='Cancelled'}
    ><MdClose/>Cancel Order</button>
    {userOrders && (
      <div className="px-4 py-4">
        <p className="font-medium">
          Order Id: <span className="font-normal">{orderId}</span>
        </p>
        <p className="font-medium">
          Total Quantity: <span className="font-normal">{orderItems[0]?.total_quantity}</span>
        </p>
        <p className="font-medium">
          Total Amount: <span className="font-normal">Rs. {orderItems[0]?.total_amount}</span>
        </p>
      </div>
    )}

    {/* Looping through the orderItems to display each order's items */}
    {orderItems &&
      orderItems.map((order) => (
        <div key={order.id}>
          {order.items.map((item, index) => (
            <div key={index} className="flex w-full gap-6 items-center px-4 bg-white">
              <p>{index + 1}.</p>
              <div className="w-[33%]">
                <p className="text-center">{item.item_name}</p>
              </div>
              <div className="w-[33%]">
                <p className="text-center">Rs. {item.product_price}</p>
              </div>
              <div className="w-[33%]">
                <p className="text-center">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ))}

    {orderItems && (
      <div className="px-4 w-full mt-2 font-medium">
        <p className="text-lg">Order status:</p>
        <div className="w-full  overflow-x-scroll">
          <StatusPin requestStatus={orderItems[0]?.status} />
        </div>
      </div>
    )}
    {orderItems[0]?.contact_info ? (
      <p className="pl-4 text-gray-500 pb-4 italic">
        **For any enquiry contact <span className="font-semibold">{orderItems[0].contact_info}</span>
      </p>
    ) : (
      ''
    )}
  </div>
))}


            {/* <div>
            {userOrders && 
            (
             <div className='px-4 py-4 '>
                <p className='font-medium'>Order Id : <span className='font-normal'>{userOrders[0]?.order_id}</span></p>
                <p className='font-medium'>Total Quantity : <span className='font-normal'>{userOrders[0]?.total_quantity}</span></p>
                <p className='font-medium'>Total Amount : <span className='font-normal'>Rs. {userOrders[0]?.total_amount}</span></p>
             </div> 
            )}  
             {userOrders && userOrders.map((item,index)=>(
                <div key={index} className='flex w-full max-w-[600px] gap-6 items-center  px-4 bg-white'>
                        <p>{index+1}.</p>
                        <div className='w-[33%]'><p className='text-center'>{item.item_name}</p></div>
                        <div className='w-[33%]'><p className='text-center'>${item.product_price}</p></div>
                        <div className='w-[33%]'><p className='text-center'>Quantity:{item.quantity}</p></div>
                </div>
             ))}
             {userOrders && 
             (
               <div className='px-4 w-full'>
                <button className='flex items-center gap-2 hover:text-tertiary transition-all duration-300 font-medium'>More details <IoChevronDownOutline/></button>
                <div className='w-full border border-black h-[100px]'>
                <StatusPin requestStatus={userOrders[0]?.status}/>
                </div>
               </div> 
             )}
            </div> */}
            
        </div>

        <div className={`w-full backdrop-blur-sm h-screen fixed top-0 left-0 bg-black/40 z-[100] flex justify-center items-center ${showCancellationDialog ? 'scale-100' : 'scale-0'} z-[200]`}>
            <div className='bg-white p-4 w-full max-w-[450px] rounded-md flex flex-col gap-2'>
                <p className='text-xl font-medium text-gray-900'>Confirm Cancellation ?</p>
                <form onSubmit={handleCancellation} className='flex flex-col gap-2'>
                <textarea value={cancellationReason} onChange={(e)=>setCancellationReason(e.target.value)} type='text' className='w-full p-1 border-2 rounded-md' placeholder='Cancellation Reason' rows={3}/>
                <div className='flex gap-2 ml-auto mt-3'>
                    <button type='button' onClick={()=>{setShowCancellationDialog(false); 
                        setCancellationOrderId('')
                    }} className='bg-gray-300 px-2 py-1 rounded-sm'>Cancel</button>
                    <button type='submit' className='bg-tertiary text-white px-2 py-1 rounded-sm'>Confirm</button>
                </div>
                </form>
            </div>
        </div>

    </div>
    <ProductView/>
    <CompareNavigator/>
    </MainPageWrapper>

  )
}

export default UserProfile

