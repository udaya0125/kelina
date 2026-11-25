import React, { useContext, useEffect, useState } from 'react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import { usePage } from '@inertiajs/react'
import AdminDashboardStats from '@/AdminComponents/AdminDashboardStats'
import AdminDashboardGraph from '@/AdminComponents/AdminDashboardGraph'
import axios from 'axios'
import { AdminDataContext } from '@/AdminContext/AdminContext'
const AdminDashboard = () => {
  const {url} = usePage()
  const [latestOrders, setLatestOrders] = useState([])

  const {toggleSidebar} = useContext(AdminDataContext)

  useEffect(()=>{
    const fetchLatestOrders = async()=>{
      try {
        const response = await axios.get(route('order.latest'))
        setLatestOrders(response.data)
      } catch (error) {
        console.error('Error fetching Orders',error)        
      }
    }

    fetchLatestOrders()

  },[])

  console.log(latestOrders)


  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full  ml-auto flex justify-start items-start py-20 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        
        <AdminDashboardStats/>
        <AdminDashboardGraph/>
        <div className='w-full  mt-8 sm:px-20 bg-base-100 py-4'>
          <p className='text-xl font-medium mb-2 text-base-content'>Latest Orders</p>
            <table className='w-full text-base-content text-sm'>
              <tbody>
                {latestOrders.map(item=>
                  <tr className=' border-b-2' key={item.id}>
                    <td className='p-2'>{item.order_id}</td>
                    <td className='p-2'>{item.name}</td>
                    <td className='p-2'>{item.phone}</td>
                    <td className='p-2'>{item.total_amount}</td>
                    <td className={`p-2 ${item.status === 'Pending' ? 'text-yellow-600' : ''} ${item.status === 'Cancelled' ? 'text-red-600' : ''}`}>{item.status}</td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
    </div>
    </div>
    </AdminPageWrapper>
  )
}

export default AdminDashboard