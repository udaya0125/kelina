import React from 'react'
import attendanceimg from '../../../public/attendancemimage.png'
import monitorimg from '../../../public/monitorimage.png'
import printerimg from '../../../public/printerimage.png'
import {router} from '@inertiajs/react'
const TriBanner = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 '>
        {/* <div className='w-full text-white rounded-md bg-[#017CC2] p-4 h-64 flex justify-between items-center group'>
        
            <div>
              <p className='text-3xl font-medium'>Best Quality</p>
                <p className='text-xl mt-2'>Monitors</p>
              <button className='underline mt-4 hover:no-underline'>Shop Now</button>
            </div>
            <img src={monitorimg} className='w-52'/>
        </div> */}

<div className="relative w-full text-white rounded-md bg-[#017CC2] p-4 h-64 flex justify-between items-center group overflow-hidden ">
      {/* Shine effect overlay */}
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
      
      <div>
        <p className="text-3xl font-medium">Best Quality</p>
        <p className="text-xl mt-2">Monitors</p>
        <button onClick={()=>router.get('/shop')} className="underline mt-4 hover:no-underline">Shop Now</button>
      </div>
      
      <img src={monitorimg} alt="Monitor" className="w-52" />
    </div>

        <div className='relative w-full rounded-md bg-[#B24A3B] p-4 h-64 flex justify-between items-center text-white group overflow-hidden'>
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        <div>
              <p className='text-3xl font-medium'>Most Reliable</p>
                <p className='text-xl mt-2'>Attendance Machine</p>
              <button onClick={()=>router.get('/shop')} className='mt-4 underline hover:no-underline'>Shop Now</button>
            </div>
            <img src={attendanceimg} alt='Attendance' className='w-52'/>
        </div>
        <div className='relative w-full rounded-md bg-[#2F6A4D] p-4 h-64 flex justify-between items-center text-white group overflow-hidden'>
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
        <div>
              <p className='text-3xl font-medium'>Most Trusted</p>
                <p className='text-xl mt-2'>Printers</p>
              <button onClick={()=>router.get('/shop')} className='underline mt-4 hover:no-underline'>Shop Now</button>
            </div>
            <img src={printerimg} alt='Printer' className='w-52'/>
        </div>
    </div>
  )
}

export default TriBanner