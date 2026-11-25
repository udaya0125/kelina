import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
const AddBrand = ({showBrandsAddForm, setShowBrandsAddForm,  setReloadBrandsDataTrigger}) => {

    const [brandName, setBrandName] = useState('')
    const [logo, setLogo] = useState(null)

    const handleBrandsAdditionForm = async(e) => {
        e.preventDefault();
        // console.log(brandName)
        // console.log(logo)
        try {

            const formData= new FormData()
            formData.append('brand_name', brandName)
            formData.append('logo', logo)

            const response = await axios.post(route('productbrand.store'),
            formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

                const data = response.data
                console.log('Brand Added', data)
                setShowBrandsAddForm(false)
                setBrandName('')
                setLogo(null)
                setReloadBrandsDataTrigger((prev)=>!prev)
                toast.success('Brand Added Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Error Adding Brand')
        }
    }


    
    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        setLogo(file)
    }


  return (
    <div className={`fixed bg-black/10 backdrop-blur-sm top-0 left-0 w-full h-full flex justify-center items-center ${showBrandsAddForm ? 'scale-100' : 'scale-0'} z-[250]`}>
            <div className='w-full max-w-[400px] p-6 bg-base-100 text-base-content rounded-md relative'>
                <button className='absolute top-3 right-3' onClick={()=>setShowBrandsAddForm(false)}>
                    <MdClose className='text-lg'/>
                </button>
            <form onSubmit={handleBrandsAdditionForm} className={` w-full overflow-hidden mx-auto rounded-sm  $transition-all duration-300 flex flex-col gap-2`}>
            <label>
                <p>Brand Name<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the brand name' className='border-2 bg-base-100 text-base-content border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={brandName} onChange={(e)=>setBrandName(e.target.value)}/>
            </label>
            <label>
                <p>Logo</p>
                <input type='file' className='mt-1' onChange={handleFileChange}/>
            </label>
            <button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Add</button>
            </form>
            </div>
            </div>
  )
}

export default AddBrand