import React from 'react'
const FeaturedCategories = () => {
  return (
    <div className='bg-white mt-8 p-4 rounded-md lg:-mx-16 lg:px-16'>
        <h1 className='text-center text-sm text-gray-600'>KELINA COLLECTIONS</h1>
        <h2 className='lg:text-3xl text-xl font-medium text-center my-3'>Featured Categories</h2>
        <h3 className='text-center text-sm text-gray-600'>Illuminate Your Space with Our Premium Products!</h3>
        <div className='grid lg:grid-cols-4 grid-cols-2 gap-4 my-4'>
            <div className='bg-gray-100 rounded-md p-4 col-span-2 row-span-2 flex flex-col justify-between items-center group overflow-hidden'>
                <img src='https://imgs.search.brave.com/ZOx_p-pF3gO5qkayQhWuG4a5ZRLQekeMii-HVkQKiZE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvNy9DQ1RW/LUNhbWVyYS1QTkct/SW1hZ2VzLnBuZw' alt='featured-category' className='w-full h-full object-cover group-hover:scale-110 transition-all duration-500'/>
                <p className=' lg:text-lg text-sm font-medium text-gray-600'>CCTV Cameras</p>
            </div>
            <div className='bg-gray-100 rounded-md p-4 col-span-1 flex flex-col justify-between items-center group overflow-hidden'>
                <img src='https://purepng.com/public/uploads/large/purepng.com-routerelectronicsroutermodem-941524673187etyyr.png' alt='featured-category' className='w-52 group-hover:scale-110 transition-all duration-500'/>
                <p className=' lg:text-lg text-sm font-medium text-gray-600'>Routers</p>
            </div>
            <div className='bg-gray-100 rounded-md p-4 col-span-1 flex flex-col justify-between items-center group overflow-hidden'>
                <img src='https://imgs.search.brave.com/cpKrzvzfMar2NDtVxDFxylTRIkntL-BPmtv4bRVjnok/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNy9CaW9t/ZXRyaWMtQWNjZXNz/LUNvbnRyb2wtU3lz/dGVtLVBORy1QaWN0/dXJlLnBuZw' alt='featured-category' className='w-52 group-hover:scale-110 transition-all duration-500'/>
                <p className=' lg:text-lg text-sm font-medium text-gray-600'>Biometric Devices</p>
            </div>
            <div className='bg-gray-100 rounded-md p-4 col-span-1 flex flex-col justify-between items-center group overflow-hidden'>
                <img src='https://imgs.search.brave.com/S-ycff--JI9q1IVHdPLPmek4TcekXF4t5ThmLWjMyzY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvMy9GaXJl/LUFsYXJtLVN5c3Rl/bS1QTkctVHJhbnNw/YXJlbnQtSW1hZ2Uu/cG5n' alt='featured-category' className='w-52 group-hover:scale-110 transition-all duration-500'/>
                <p className='  lg:text-lg text-sm font-medium text-gray-600 text-center'>Fire Alarm Systems</p>
            </div>
            <div className='bg-gray-100 rounded-md p-4 col-span-1 flex flex-col justify-between items-center group overflow-hidden'>
                <img src='https://imgs.search.brave.com/U0lErDq3r7HQRkZDd4ihBFly0hpr9sA0lfe5xjTDK1A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNi9JbnZl/cnRlci1QTkctVHJh/bnNwYXJlbnQtSW1h/Z2UucG5n' alt='featured-category' className='lg:w-64 w-48 group-hover:scale-110 transition-all duration-500'/>
                <p className=' lg:text-lg text-sm font-medium text-gray-600 text-center'>Backup Power Systems</p>
            </div>
        </div>

    </div>
  )
}

export default FeaturedCategories