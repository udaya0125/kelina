import React from 'react'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import { Head } from '@inertiajs/react'
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { FaSquarePhone } from "react-icons/fa6";

const MainOurTeam = ({employees}) => {
    //console.log(employees)

    const apiUrl = import.meta.env.VITE_APP_URL

    console.log(employees)
  return (
    <>
        <Head>
            <title>Our Team | Kelina International</title>
            <meta name="description" content="Explore our extensive collection of top-quality products at amazing prices. Don't miss out on exclusive offers—shop today!"/>
        </Head>
        <MainPageWrapper>    
            <div className='w-full min-h-screen lg:px-16 py-8 flex flex-col bg-white'>
                <p className='text-center flex mx-auto items-center gap-2 text-2xl font-semibold text-[#217945] before:w-full before:absolute before:border-2 relative before:bottom-0 before:border-[#217945]'><FaPeopleGroup className='text-2xl'/>Our Team</p>
                <p className='text-center text-4xl lg:text-5xl font-bold my-4 text-gray-600 '>Meet With Our <span className='text-[#217945]'>Team</span></p>    
                <p className='text-center'>Behind every great store is an amazing team. Meet the people who work tirelessly to ensure your shopping experience is nothing short of exceptional</p>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-6 gap-8'>
                    {employees.map(employee=>
                        <div key={employee.id} className='flex flex-col items-center justify-center border bg-white rounded-tl-[50px] rounded-tr-[50px] rounded-br-[50px] p-4 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                            <img src={`${apiUrl}/${employee.image}`} alt={employee.name} className='w-full h-64 object-cover rounded-t-[50px]'/>
                            <p className='pt-3 pb-1 text-xl font-medium text-gray-600'>{employee.name}</p>

                            <p className='font-medium text-gray-600'>{employee.designation}</p>
                            {employee.phone_number && <p className='font-medium text-gray-600 flex gap-1.5 items-center mt-0.5'><FaSquarePhone className='text-lg '/> {employee.phone_number}</p>}
                        </div>
                    )}
                </div>
            </div>       
        </MainPageWrapper>
    </>
  )
}

export default MainOurTeam