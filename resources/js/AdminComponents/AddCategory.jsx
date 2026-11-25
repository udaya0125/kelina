import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
const AddCategory = ({showCategoryAddForm, setShowCategoryAddForm, setReloadCategoryTrigger}) => {

    const [categoryName, setCategoryName] = useState('')
    const [categoryImage, setCategoryImage] = useState(null)
    

    const handleCategoryAdditionForm = async(e) => {
        e.preventDefault(); 
        const formData = new FormData();
        formData.append('Category_name', categoryName); 

        if(categoryImage) {
            formData.append('image', categoryImage)
        }
        
        try {
            const response = await axios.post(route('categories.store',),formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

                setCategoryName('')
                setCategoryImage(null)
                setReloadCategoryTrigger((prev)=>!prev)
                toast.success('Category Added Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Error Adding Category')
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setCategoryImage(file)
    }


    //console.log(categoryImage)

  return (
    <div className={`w-full h-full top-0 left-0 fixed flex justify-center items-center bg-black/20 backdrop-blur-sm ${showCategoryAddForm ? 'scale-100' : 'scale-0'} z-[250]`}>
            <div className='w-full max-w-[400px] p-6 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-base-100 relative text-base-content'>
                <button className='absolute top-3 right-3' onClick={()=>setShowCategoryAddForm(false)}>
                    <MdClose className='text-lg'/>
                </button>
            <form onSubmit={handleCategoryAdditionForm} className={`  overflow-hidden  mx-auto rounded-sm   transition-all duration-300`}>
            <label>
                <p>Category<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the category name' className='border-2 bg-base-100 border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={categoryName} onChange={(e)=>setCategoryName(e.target.value)}/>
                
            </label>
            <input type='file' className='mt-3' onChange={handleFileChange}/>

                <button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Add</button>
            </form>
            </div>
            </div>
  )
}

export default AddCategory