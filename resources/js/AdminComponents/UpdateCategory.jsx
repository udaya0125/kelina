import React, { useState } from 'react'

const UpdateCategory = ({updateCategoryId, showUpdateDialog, setShowUpdateDialog, updateCategoryName, setUpdateCategoryName}) => {

   

    const handleCategoryUpdateForm = (e) => {
        e.preventDefault();

    }

  return (
    <div className={`w-full h-full top-0 left-0 absolute flex justify-center items-center bg-black/20 backdrop-blur-sm ${showUpdateDialog ? 'scale-100' : 'scale-0'} z-[120]`}>
    <div className='w-full max-w-[400px] p-6 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-white relative'>
        <button className='absolute top-3 right-3' onClick={()=>setShowUpdateDialog(false)}>
            <MdClose className='text-lg'/>
        </button>
    <form onSubmit={handleCategoryUpdateForm} className={`bg-gray-50  overflow-hidden  mx-auto rounded-sm shadow-lg  transition-all duration-300`}>
    <label>
        <p>Category<span className='text-red-500'>*</span></p>
        <input type='text' placeholder='Enter the category name' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={updateCategoryName} onChange={(e)=>setUpdateCategoryName(e.target.value)}/>
        <button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Update</button>
    </label>
    </form>
    </div>
    </div>
  )
}

export default UpdateCategory