import React, {useContext} from 'react'
import { LuHome } from "react-icons/lu";
import { TbGridDots } from "react-icons/tb";
import { RiShoppingCart2Line } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';
import { MainPartContext } from '@/MainContext/MainContext';
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

const MobileBottomBar = () => {
    const {TotalQuantity} = useContext(MainPartContext)
  return (
    <div className='w-full grid grid-cols-5 sm:hidden bg-white fixed bottom-0 pt-3 pb-2 border-t-2 text-gray-900 z-[20]'>
        <button className='flex flex-col w-full gap-1 justify-center items-center ' onClick={()=>Inertia.visit('/')}>
            <LuHome className='text-lg text-tertiary'/>
            <p className='font-medium text-tertiary'>Home</p>
        </button>
        <button className='flex flex-col w-full gap-1 justify-center items-center ' onClick={()=>Inertia.visit('/shop')}>
            <TbGridDots className='text-lg text-tertiary'/>
            <p className='font-medium text-tertiary'>Shop</p>
        </button>
        <button className='flex flex-col w-full gap-1 justify-center items-center' onClick={()=>Inertia.visit('/userprofile')}>
            <FaRegHeart className='text-lg text-tertiary'/>
            <p className='font-medium text-tertiary'>Wishlist</p>
        </button>
        <button className='flex flex-col w-full gap-1 justify-center items-center relative' 
        // onClick={()=>Inertia.visit('/cart')}
        onClick={()=> document.getElementById('my-drawer-4').checked = true}
        >
            <RiShoppingCart2Line className='text-lg text-tertiary'/>
            <p className='font-medium text-tertiary'>Cart</p>
            <div className='w-5 h-5 bg-tertiary rounded-full absolute top-0 right-0 mt-[-12px] flex justify-center items-center mr-[18px]'>
                    <p className='text-[0.75rem] text-white'>{TotalQuantity}</p> 
                    </div>

        </button>
        <button className='flex flex-col w-full gap-1 justify-center items-center' onClick={()=>Inertia.visit('/userprofile')}>
            <FaUserCircle className='text-lg text-tertiary'/>
            <p className='font-medium text-tertiary'>Account</p>
        </button>
    </div>
  )
}

export default MobileBottomBar