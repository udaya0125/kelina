import React from 'react'
import moneyicon from '../../../public/moneyicon.png'
import megaphoneicon from '../../../public/megaphoneicon.png'
import rocketicon from '../../../public/rocketicon.png'
import customersupporticon from '../../../public/customersupporticon.png'
const AssuranceSection = () => {
  return (
    <div className='lg:-mx-16 lg:px-16 px-4 grid grid-cols-2 lg:grid-cols-4  text-white/80 py-8 gap-6 bg-black/90'>
        <div className='flex gap-2 lg:items-center flex-col lg:flex-row items-start'>
            <img src={rocketicon} alt='rocket'/>
            <div>
                <p className='lg:text-lg font-medium'>Fast Delivery</p>
                <p className='text-sm lg:text-base'>We provide fast delivery all over the country</p>
            </div>
        </div>
        <div className='flex gap-2 lg:items-center flex-col lg:flex-row items-start'>
            <img src={moneyicon} alt='money'/>
            <div>
                <p className='lg:text-lg font-medium'>Money back</p>
                <p className='text-sm lg:text-base'>We will fulfill refund for any defective product.</p>
            </div>
        </div>
        <div className='flex gap-2 lg:items-center flex-col lg:flex-row items-start'>
            <img src={megaphoneicon} alt='megaphone'/>
            <div>
                <p className='lg:text-lg font-medium'>15 days return</p>
                <p className='text-sm lg:text-base'>If you are not satisfied, return within 15 days.</p>
            </div>
        </div>
        <div className='flex gap-2 flex-col lg:items-center lg:flex-row items-start'>
            <img src={customersupporticon} alt='support'/>
            <div>
                <p className='lg:text-lg font-medium'>Customer Support</p>
                <p className='text-sm lg:text-base'>We will provide 24/7 Customer Support.</p>
            </div>
        </div>
    </div>
  )
}

export default AssuranceSection