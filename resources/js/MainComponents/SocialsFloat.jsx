import React from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { FaViber } from 'react-icons/fa'
const SocialsFloat = () => {
  return (
    <div className='flex fixed lg:bottom-[5%] bottom-[10%] lg:right-[35%]  backdrop-blur-lg bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] z-[200] '>
        <a href="https://wa.me/+9779856032023" className='flex items-center gap-1 text-green-600 font-medium hover:bg-green-200 transition-all duration-300 p-4 rounded-l-md border-r-2' target='_blank'>
            <BsWhatsapp/> +9779856032023
        </a>
        <a href="viber://chat?number=%2B9770956032023" className='flex items-center gap-1 text-purple-600 font-medium p-4 hover:bg-purple-200 rounded-r-md' target='_blank'>
            <FaViber/> +9779856032023
        </a>
    </div>
  )
}

export default SocialsFloat