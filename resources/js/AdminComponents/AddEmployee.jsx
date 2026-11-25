import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
const AddEmployee = ({showEmployeeAddForm, setShowEmployeeAddForm,  setReloadEmployeeDataTrigger}) => {

    const [name, setName] = useState('')
    const [image, setImage] = useState(null)
    const [designation, setDesignation] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleEmployeeAdditionForm = async(e) => {
        e.preventDefault();
        // console.log(brandName)
        // console.log(logo)
        try {

            const formData= new FormData()
            formData.append('name', name)
            formData.append('image', image)
            formData.append('designation', designation)
            formData.append('phone_number', phoneNumber)
            const response = await axios.post(route('employee.store'),
            formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

                const data = response.data
                console.log('Employee Added', data)
                setShowEmployeeAddForm(false)
                setName('')
                setImage(null)
                setDesignation('')
                setPhoneNumber('')
                setReloadEmployeeDataTrigger((prev)=>!prev)
                toast.success('Employee Added Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Error Adding Employee')
        }
    }


    
    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        setImage(file)
    }


  return (
    <div className={`fixed bg-black/10 backdrop-blur-sm top-0 left-0 w-full h-full flex justify-center items-center ${showEmployeeAddForm ? 'scale-100' : 'scale-0'} z-[250]`}>
            <div className='w-full max-w-[400px] p-6 bg-base-100 text-base-content rounded-md relative'>
                <button className='absolute top-3 right-3' onClick={()=>setShowEmployeeAddForm(false)}>
                    <MdClose className='text-lg'/>
                </button>
            <form onSubmit={handleEmployeeAdditionForm} className={` w-full overflow-hidden mx-auto rounded-sm  $transition-all duration-300 flex flex-col gap-2`}>
            <label>
                <p>Employee Name<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the name' className='border-2 bg-base-100 text-base-content border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={name} onChange={(e)=>setName(e.target.value)}/>
            </label>
            <label>
                <p>Designation<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the designation' className='border-2 bg-base-100 text-base-content border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={designation} onChange={(e)=>setDesignation(e.target.value)}/>
            </label>
            <label>
                <p>Phone Number</p>
                <input type='text' placeholder='Enter the phone number' className='border-2 bg-base-100 text-base-content border-gray-400 p-1.5 w-full mt-1 rounded-sm' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}/>
            </label>
            <label>
                <p>Image</p>
                <input type='file' className='mt-1' onChange={handleFileChange}/>
            </label>
            <button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Add</button>
            </form>
            </div>
            </div>
  )
}

export default AddEmployee