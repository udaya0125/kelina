import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { MdCalendarMonth } from "react-icons/md";
import { BsCalendarWeek } from "react-icons/bs";
import { MdPointOfSale } from "react-icons/md";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";

const AdminDashboardStats = () => {
    const [statistics, setStatistics] = useState({
        totalSales: 0, 
        totalOrders: 0, 
        lastWeekSales: 0, 
        lastMonthSales: 0
    })

    const [period, setPeriod] = useState('all')


    useEffect(()=>{
        const fetchStats = async()=>{
            try {
                const response = await axios.get(route('dashboard.stats',{
                    params: {period}
                })); 
                setStatistics(response.data); 
            } catch (error) {
                console.log('Error fetching stats, error')                
            }
        }
        fetchStats()
    },[period])

    // console.log(statistics)

  return (
    <div className='w-full sm:px-20 my-8'>
        <select value={period} onChange={(e)=>setPeriod(e.target.value)} className='p-1.5 w-32 rounded-md border-2 bg-base-100 text-base-content'>
            <option value='daily'>Daily</option>
            <option value='weekly'>Weekly</option>
            <option value='monthly'>Monthly</option>
            <option value='all'>All Time</option>
        </select>
        <div className='grid grid-cols-2 sm:grid-cols-4 my-4 gap-4'>
            <div className='w-full p-6 bg-base-100 rounded-md flex gap-4 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-base-content'>
                <div className='p-1 bg-green-100 rounded-full '>
                <TbCurrencyRupeeNepalese className='text-2xl text-green-600 bg-green-100 '/>
                </div>
                <div>
                <p className='font-medium text-gray-400'>Total Sales</p>
                <p className='text-3xl font-medium'>Rs. {statistics?.totalSales}</p>
                </div>
            </div>
            <div className='w-full p-6 bg-base-100 text-base-content rounded-md flex gap-4 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                <div className='p-1 bg-blue-100 rounded-full '>
                <MdPointOfSale className='text-2xl text-sky-600 bg-blue-100 '/>
                </div>
                <div>
                <p className='font-medium text-gray-400'>Total Orders</p>
                <p className='text-3xl font-medium'>{statistics?.totalOrders}</p>
                </div>
            </div>
            <div className='w-full p-6 bg-base-100 text-base-content rounded-md flex gap-4 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                <div className='p-2 bg-red-100 rounded-full '>
                <BsCalendarWeek className='text-lg text-red-600 '/>
                </div>
                <div>
                <p className='font-medium text-gray-400'>Last Weeks Sale</p>
                <p className='text-3xl font-medium'>Rs. {statistics?.lastWeekSales.toFixed(2)}</p>
                </div>
            </div>
            <div className='w-full p-6 bg-base-100 text-base-content rounded-md flex gap-4 items-center shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                <div className='p-1 bg-yellow-100 rounded-full '>
                <MdCalendarMonth className='text-2xl text-yellow-600'/>
                </div>
                <div>
                <p className='font-medium text-gray-400'>Last Months Sale</p>
                <p className='text-3xl font-medium'>Rs. {statistics?.lastMonthSales.toFixed(2)}</p>
                </div>
            </div>

            
        </div>
    </div>
  )
}

export default AdminDashboardStats