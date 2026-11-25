import React, { useContext, useEffect, useState } from 'react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import axios from 'axios'
import { FaEye } from "react-icons/fa";
import { MdClose } from 'react-icons/md';
import { usePage } from '@inertiajs/react';
import { AdminDataContext } from '@/AdminContext/AdminContext';
const AdminOrders = () => {
  const {url} = usePage()

  const {toggleSidebar} = useContext(AdminDataContext)

  console.log(url)

  const [allOrders, setAllOrders] = useState([])

  const [showDetailSection, setShowDetailSection] = useState(false)

  const [orderDetailId, setOrderDetailId] = useState('')
  const [reloadDataTrigger, setReloadDataTrigger] = useState(false)

  useEffect(()=>{
    const fetchAllOrders = async() => {
      try {
        const response = await axios.get(route('order.index'))
        setAllOrders(response.data)
      } catch (error) {
        console.log('Error fetching the orders',error)
      }
    }
    fetchAllOrders()
  },[reloadDataTrigger])

  console.log(allOrders)

  const detailOrder = allOrders.find((item)=>item.id === orderDetailId)

  console.log(detailOrder)

  const handleStatusChange = async(orderId, newStatus) => {
    try {
      const response = await axios.post(route('order.update'),{
        orderId,
        status:newStatus
      })

      if (response.data.success) {
       setReloadDataTrigger((prev)=>!prev)
      } else {
        console.error('Failed to update status');
      }


    } catch (error) {
        console.error('Error updating status:', error)
    }
  }

  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-20 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        <div className='w-[90%] mx-auto p-2 bg-base-100 text-base-content rounded-md  h-[550px] overflow-auto lg:mt-10'>
          <table className='w-full'>
            <thead>
              <tr className='bg-accent text-base-content/80 font-medium'>
                <td className='p-1.5 text-center'>S.No</td>
                <td className='p-1.5 text-center'>Order Id</td>
                <td className='p-1.5 text-center'>Customer Name</td>
                <td className='p-1.5 text-center'>Contact Number</td>
                <td className='p-1.5 text-center'>Order Detail</td>
                <td className='p-1.5 text-center'>Status</td>
                <td className='p-1.5 text-center'>Update Status</td>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((item,index)=>
              <tr key={item.id} className='cursor-pointer'>
                <td className='text-center p-1.5 text-sm'>{index + 1}</td>
                <td className='text-center p-1.5 text-sm'>{item.order_id}</td>
                <td className='text-center p-1.5 text-sm'>{item.name}</td>
                <td className='text-center p-1.5 text-sm'>{item.phone}</td>
                <td className='text-center p-1.5 text-sm'><button onClick={()=>{
                  setOrderDetailId(item.id); 
                  setShowDetailSection(true)
                }}><FaEye/></button></td>
                <td className='text-center p-1.5 text-sm'>{item.status}</td>
                <td>
                  <select value={item.status} className='p-1 w-full text-sm rounded-md border-2 bg-base-100 text-base-content' onChange={(e)=> handleStatusChange(item.id, e.target.value)}
                    disabled={item.status === 'Cancelled'} >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Shipped</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={`backdrop-blur-sm w-full h-full fixed top-0 left-0 bg-black/20 flex justify-center items-center z-[200] ${showDetailSection ? 'scale-100' : 'scale-0'}`}>
              <div className='w-full max-w-[700px] p-6 bg-base-100 text-base-content rounded-md relative '>
                <button className='absolute top-3 right-3' onClick={()=>{
                  setShowDetailSection(false); 
                  setOrderDetailId('')
                }}><MdClose className='text-lg'/></button>
                <p className='text-xl font-medium underline'>Order Detail</p>
                <p>Order Id: {detailOrder?.order_id}</p>
                {detailOrder?.cancellation_reason && <p className='text-red-500 text-sm'>(Cancellation Reason: {detailOrder?.cancellation_reason})</p>}
                <div className='flex flex-col gap-3 my-3'>
                <div className='flex justify-between bg-accent p-2'>
                  <div className=''>
                    <p className='text-center text-sm'>Name</p> 
                    <p className='text-center font-medium'>{detailOrder?.name}</p>
                  </div>
                  <div >
                    <p className='text-center text-sm'>Address</p> 
                    <p className='text-center font-medium'>{detailOrder?.address},{detailOrder?.city}, {detailOrder?.zipcode}</p>
                  </div>
                  <div >
                    <p className='text-center text-sm'>Phone</p> 
                    <p className='text-center font-medium'>{detailOrder?.phone}</p>
                  </div>
                  <div >
                    <p className='text-center text-sm'>Email</p> 
                    <p className='text-center font-medium'>{detailOrder?.email}</p>
                  </div>
                </div>
                <div className='flex justify-between bg-accent p-2'>
                  <div className=''>
                    <p className='text-center text-sm'>Total Amount</p> 
                    <p className='text-center font-medium'>Rs.{detailOrder?.total_amount}</p>
                  </div>
                  <div >
                    <p className='text-center text-sm'>Total Quantity</p> 
                    <p className='text-center font-medium'>{detailOrder?.total_quantity}</p>
                  </div>
                  <div >
                    <p className='text-center text-sm'>Coupon Code</p> 
                    <p className='text-center font-medium'>{detailOrder?.coupon_code}</p>
                  </div>
                  <div >
                    <p className='text-center text-sm'>Discount Amount</p> 
                    <p className='text-center font-medium'>Rs.{detailOrder?.discount_amount}</p>
                  </div>
                </div>
                <div>
                  <p>Order Items</p>
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-accent'>
                        <td className='p-1 font-medium'>Name</td>
                        <td className='text-center font-medium'>Quantity</td>
                        <td className='text-center font-medium'>Price</td>
                      </tr>
                    </thead>
                    <tbody>
                      
                  {detailOrder?.items?.map(item=>(
                    <tr>
                      <td className='text-sm'>{item.item_name}</td>
                      <td className='text-center text-sm'>{item.quantity}</td>
                      <td className='text-center text-sm'>Rs. {item.product_price}</td>
                    </tr>                    
                  ))}
                  </tbody>
                  </table>
                </div>
                </div>
              </div>
        </div>
    </div>
    </div>
    </AdminPageWrapper>
  )
}

export default AdminOrders