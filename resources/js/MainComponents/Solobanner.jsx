import React from 'react'
import cctvimage from '../../../public/cctvpngimage.png'
import { router } from '@inertiajs/react'
const Solobanner = () => {
  return (
    <div className=' relative w-full bg-[#284687] mt-8 rounded-md lg:py-12 py-4 flex justify-between text-white lg:px-20 items-center gap-2 p-2 group overflow-hidden '>
         <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />


       <div className=' lg:p-0'>
        <p className='text-2xl'>Best Prices</p>
        <p className='lg:text-4xl  font-bold mb-6 mt-4'>Ensure the safety of your premises with our advanced CCTV camera systems. 
        </p>
        {/* <button onClick={()=>router.get('/shop')} class="group relative inline-flex lg:h-10 h-8 items-center justify-center overflow-hidden rounded-full bg-orange-600 px-6 font-medium text-neutral-200 transition hover:scale-110"><span className='text-sm lg:text-base'>Shop Now</span><div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]"><div class="relative h-full w-8 bg-white/20"></div></div></button> */}
        <button onClick={()=>router.get('/shop')} className='lg:h-10 h-8 bg-orange-700 px-6 rounded-full hover:scale-110 transition-all duration-300'>Shop Now</button>
        </div>
        <img src={cctvimage} className='lg:w-80 w-24  transition-all duration-1000' alt='cctv'/>
    </div>
  )
}

export default Solobanner