import React, { useContext, useEffect, useState, useRef } from 'react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { usePage } from '@inertiajs/react'
import { AdminDataContext } from '@/AdminContext/AdminContext'
import { BsFileEarmarkPdfFill } from "react-icons/bs";

const AdminLogs = () => {
    const {url} = usePage()

    const {toggleSidebar} = useContext(AdminDataContext)

    const [allLogData, setAllLogData] = useState([])

    const tableRef = useRef()

    useEffect(()=>{
        const fetchLogData = async() => {
            try {
                const response = await axios.get(route('log.index'))
                setAllLogData(response.data)

            } catch (error) {
                console.log('Error fetching log data',error)
            }
        }
        fetchLogData();

    },[])

    const handlePdfExport = () => {
        if(tableRef.current) {
            const pdf = new jsPDF()
            const tableNode = tableRef.current;

            pdf.autoTable({html:tableNode})

            pdf.save('logdata.pdf')
        }
    }
    
    //console.log(allLogData)

  return (
    <AdminPageWrapper pageLocation={url}>
        <div className=' min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-20 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300 lg:mt-16`}>
        <button onClick={handlePdfExport} className='absolute top-3 right-8'><BsFileEarmarkPdfFill className='text-2xl text-tertiary'/></button>
        <div className='w-[90%] mx-auto p-2 bg-base-100 text-base-content rounded-md  h-[550px] overflow-auto '>
          <table className='w-full relative' ref={tableRef}>
            <thead>
                <tr className='bg-accent text-base-content/80 sticky top-0'>
                    <td className='p-1.5 font-medium text-center'>S.No</td>
                    <td className='p-1.5 font-medium text-center'>Action</td>
                    <td className='p-1.5 font-medium text-center'>IP Address</td>
                    <td className='p-1.5 font-medium text-center'>Email</td>
                </tr>
            </thead>
            <tbody>
                {allLogData.map((item,index)=>(
                    <tr key={item.id} className='text-sm cursor-pointer hover:bg-gray-200'>
                        <td className='text-center p-1'>{index+1}</td>
                        <td>{item.action}</td>
                        <td className='text-center'>{item.ip_address}</td>
                        <td className='text-center'>{item.email}</td>
                    </tr>
                ))}
            </tbody>
            </table>  
        </div>
        </div>
        </div>

    </AdminPageWrapper>
  )
}

export default AdminLogs