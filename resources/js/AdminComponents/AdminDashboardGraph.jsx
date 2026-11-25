import axios from 'axios'
import { parse } from 'postcss'
import React, { useEffect, useState } from 'react'
import {ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer} from 'recharts'

const AdminDashboardGraph = () => {
    const [allGraphSalesData, setAllGraphSalesData] = useState([])

    useEffect(()=>{
        const fetchAllGraphData = async() => {
            try {
                const response = await axios.get(route('dashboard.sales'))
                setAllGraphSalesData(response.data)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        fetchAllGraphData();
    },[])
    //console.log(allGraphSalesData)
    const maxSalesAmount = Math.max(...allGraphSalesData?.map(item => parseFloat(item.salesAmount)))
  return (
    <div className='w-full sm:px-20 bg-base-100 '>
        <p className='text-xl font-medium mb-4 text-base-content'>Monthly Sales Statistics</p>
    <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={allGraphSalesData}>
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" domain={[0, Math.ceil(maxSalesAmount / 100) * 100]}
          tickFormatter={(value) => `${value}`}/>
                <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax +1']}/>
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar yAxisId="left" dataKey="salesAmount" fill="#8884d8" />
                <Line yAxisId="right" type="monotone" dataKey="orderNumber" stroke="#ff7300" />
            </ComposedChart>
        </ResponsiveContainer>
        </div>
  )
}

export default AdminDashboardGraph