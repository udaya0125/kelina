import React, { useContext, useEffect, useState } from 'react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import { MdEdit } from 'react-icons/md'
import { usePage } from '@inertiajs/react'
import { AdminDataContext } from '@/AdminContext/AdminContext'
import { FaPlus } from 'react-icons/fa'
const AdminPromoCode = () => {
    const {url} = usePage();

    const {toggleSidebar} = useContext(AdminDataContext)

    const [showPromoAddForm, setShowPromoAddForm] = useState(false)

    const [dataReloadTrigger, setDataReloadTrigger] = useState(false)

    const [formData, setFormData] = useState({
        promocode:'', 
        discount_type:'', 
        discount_amount:'', 
        validity:new Date(), 
    })

    const [updateItemId, setUpdateItemId] = useState('')
    const [showPromoUpdateForm, setShowPromoUpdateForm] = useState(false)

    const [updateFormData, setUpdateFormData] = useState({
        promocode:'', 
        discount_type:'', 
        discount_amount:'', 
        validity:''
    })


    const [allPromoCode, setAllPromoCode] = useState([])

    const [deletionItemId, setDeletionItemId] = useState(null)
    const [showDeletionDialog, setShowDeletionDialog] = useState(false)


    const handleChange = (e) => {
        const {name, value} = e.target;
        if(name === 'validity'){
            setFormData((prevformdata)=>({
                ...prevformdata, 
                [name]:e
            }))
        }
        else {
            setFormData((prevformdata)=>({
                ...prevformdata, 
                [name]:value
            }))
        }
    }

    const handleUpdateChange = (e) => {
        const {name, value} = e.target;
        if(name === 'validity'){
            setUpdateFormData((prevformdata)=>({
                ...prevformdata, 
                [name]:e
            }))
        }
        else {
            setUpdateFormData((prevformdata)=>({
                ...prevformdata, 
                [name]:value
            }))
        }
    }


    const handlePromoAdditionForm = async(e) => {
        e.preventDefault();
        const formDataToSubmit =  {
            ...formData,
            created_by:'testuser'
        }
        try {
            const response = await axios.post(route('promocode.store'),formDataToSubmit)
            setFormData({
                promocode:'', 
                discount_type:'', 
                discount_amount:'', 
                validity:new Date(), 
                created_by:''
            })
            setShowPromoAddForm(false)
            toast.success('Promo Code Added')
            setDataReloadTrigger((prev)=>!prev)
        } catch (error) {
            toast.error('Error Adding Promo')
            console.log('Error Adding Promo Code', error)
        }
    }


    useEffect(()=>{

        const fetchPromoCode = async()=>{
            try {
                const response  = await axios.get(route('promocode.index'))
                setAllPromoCode(response.data)

            } catch (error) {
                console.log('Error fetching data', error)
            }
        }

        fetchPromoCode()
 
    },[dataReloadTrigger])

    console.log(allPromoCode)

    const handleDeletion = async() =>{
        if(deletionItemId){
            try {
                const response = await axios.post(route('promocode.destroy'),{id:deletionItemId
                })
              
                    setDeletionItemId('')
                    setShowDeletionDialog(false)
                    setDataReloadTrigger((prev)=>!prev)
                
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }

    const handlePromoUpdateForm= async(e) => {
        e.preventDefault();
        const formDataToSend ={

            ...updateFormData,
            id:updateItemId,
            created_by:'test'
        }
        try {
            const response = await axios.post(route('promocode.update'),formDataToSend)
            setUpdateFormData({
                promocode:'', 
                discount_type:'', 
                discount_amount:'', 
                validity:''
            })
            setUpdateItemId('')
            setShowPromoUpdateForm(false)
            setDataReloadTrigger((prev)=>!prev)
            toast.success('Promo Code Data Updated')
        } catch (error) {
             console.log('Error updating',error) 
             toast.error('Error Updating Promo Code Data')

        }
    }

  return (
    <AdminPageWrapper pageLocation={url}>
         <div className='w-full min-h-screen  flex flex-col relative'>
    <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        <div className='w-[90%] mx-auto  flex flex-col'>
        {/* <button className='ml-auto tooltip tooltip-bottom' data-tip='Add Promo Code' onClick={()=>setShowPromoAddForm(!showPromoAddForm)}>
                <FaCirclePlus className='text-5xl text-base-content'/>
            </button> */}
        
        <button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full ml-auto  mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Promo Code" onClick={()=>setShowPromoAddForm(true)}>
                    
                    <FaPlus/>
                </button>
            <div className={`w-full h-full fixed top-0 left-0 bg-black/10 flex justify-center items-center backdrop-blur-sm ${showPromoAddForm ? 'scale-100' : 'scale-0'} z-[200]`}>

            <div className="w-full max-w-[400px] p-6 bg-base-100 rounded-md relative text-base-content">
                <button onClick={()=>setShowPromoAddForm(false)} className="absolute top-3 right-3">
                    <MdClose className="text-lg"/>
                </button>
            <form onSubmit={handlePromoAdditionForm} className={`  overflow-hidden  mx-auto rounded-sm transition-all duration-300 flex flex-col gap-2`}>
            <label>
                <p>Promo Code<span className='text-red-500'>*</span></p>
                <input className='p-1.5 w-full border-2 bg-base-100 text-base-content' name='promocode' value={formData.promocode} onChange={handleChange}/>
            </label>
            <div className='flex gap-2'>
            <label className='w-[50%]'>
                <p>Discount Type<span className='text-red-500'>*</span></p>
                <select className='w-full border-2 p-1.5 bg-base-100 text-base-content' name='discount_type' value={formData.discount_type} onChange={handleChange}>
                    <option value='' disabled>Select</option>
                    <option value='percentage'>Percentage</option>
                    <option value='fixed'>Fixed</option>
                </select>
            </label>
            <label>
                <p>Discount Amount<span className='text-red-500'>*</span></p>
                <input type='number' className='p-1.5 w-full border-2 bg-base-100 text-base-content' name='discount_amount' value={formData.discount_amount} onChange={handleChange}/>
            </label>
            </div>
            <label>
                <p>Valid Upto<span className='text-red-500'>*</span></p>
            <DatePicker className='border-2 p-1.5 bg-base-100 text-base-content' selected={formData.validity} name='validity' onChange={(date)=> setFormData((prevFormData)=>({
                ...prevFormData, 
                validity:date
            }))}/>
            </label>
            <button type='submit' className='bg-tertiary text-white w-full p-1.5 mt-3 rounded-sm '>Add</button>
            </form>
            </div>
            </div>


            <div className={`w-full h-full fixed top-0 left-0 bg-black/10 flex justify-center items-center backdrop-blur-sm ${showPromoUpdateForm ? 'scale-100' : 'scale-0'} z-[200]`}>

<div className="w-full max-w-[400px] p-6 bg-base-100 text-base-content rounded-md relative ">
    <button onClick={()=>setShowPromoUpdateForm(false)} className="absolute top-3 right-3">
        <MdClose className="text-lg"/>
    </button>
<form onSubmit={handlePromoUpdateForm} className={`overflow-hidden  mx-auto rounded-sm  transition-all duration-300 flex flex-col gap-2`}>
<label>
    <p>Promo Code<span className='text-red-500'>*</span></p>
    <input className='p-1.5 w-full border-2 bg-base-100 text-base-content' name='promocode' value={updateFormData.promocode} onChange={handleUpdateChange}/>
</label>
<div className='flex gap-2'>
<label className='w-[50%]'>
    <p>Discount Type<span className='text-red-500'>*</span></p>
    <select className='w-full border-2 p-1.5 bg-base-100 text-base-content' name='discount_type' value={updateFormData.discount_type} onChange={handleUpdateChange}>
        <option value='' disabled>Select</option>
        <option value='percentage'>Percentage</option>
        <option value='fixed'>Fixed</option>
    </select>
</label>
<label>
    <p>Discount Amount<span className='text-red-500'>*</span></p>
    <input type='number' className='p-1.5 w-full border-2 bg-base-100 text-base-content' name='discount_amount' value={updateFormData.discount_amount} onChange={handleUpdateChange}/>
</label>
</div>
<label>
    <p>Valid Upto<span className='text-red-500'>*</span></p>
<DatePicker className='border-2 p-1.5 bg-base-100 text-base-content' selected={updateFormData.validity} name='validity' onChange={(date)=> setUpdateFormData((prevFormData)=>({
    ...prevFormData, 
    validity:date
}))}/>
</label>
<button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Update</button>
</form>
</div>
</div>


            
        </div>
        <div className='w-[90%] mx-auto bg-base-100 text-base-content p-2 mt-4 rounded-md h-[550px] overflow-auto'>
            <table className='w-full'>
                <thead>
                    <tr className='bg-accent text-base-content/80'>
                    <td className='p-2 text-center font-medium'>Promo Code</td>
                    <td className='p-2 text-center font-medium'>Discount Type</td>
                    <td className='p-2 text-center font-medium'>Discount Amount</td>
                    <td className='p-2 text-center font-medium'>Validity</td>
                    <td className='p-2 text-center font-medium'>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {allPromoCode.map((item,index)=>(
                        <tr key={item.id} className='text-sm cursor-pointer'>
                            <td className='text-center p-1.5'>{item.promocode}</td>
                            <td  className='text-center'>{item.discount_type}</td>
                            <td  className='text-center'>{item.discount_amount}</td>
                            <td  className='text-center'>{item.validity}</td>
                            <td className='flex items-center gap-2 p-1.5 justify-center'>
                                <button onClick={()=>{
                                    setUpdateItemId(item.id)
                                     setUpdateFormData({
                                        promocode:item.promocode, 
                                        discount_type:item.discount_type, 
                                        discount_amount:item.discount_amount, 
                                        validity:item.validity
                                    })
                                    setShowPromoUpdateForm(true)
                                   
                                }}><MdEdit className='text-lg '/></button>
                                <button onClick={()=>{
                                    setDeletionItemId(item.id); 
                                    setShowDeletionDialog(true)
                                }}><MdDelete className='text-lg text-red-500'/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className={`fixed w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center backdrop-blur-sm ${showDeletionDialog ? 'scale-100' : 'scale-0'} z-[200]`}>
                <div className='bg-base-100 text-base-content border-2 border-accent p-6 w-full max-w-[300px] rounded-md' >
                            <p className='text-lg font-semibold text-center'>Confirm Delete?</p>
                            <div className='flex gap-2 mt-6 w-full'>
                                <button className='bg-gray-400 py-1 w-[50%] rounded-md ml-auto hover:scale-90 transition duration-300' onClick={()=>setShowDeletionDialog(false)}>Cancel</button>
                                <button className='text-base-content bg-tertiary py-1 w-[50%] rounded-md hover:scale-90 transition duration-300' onClick={handleDeletion} >Confirm</button>
                            </div>

                </div>
             </div>

        </div>
        </div>
    </AdminPageWrapper>
  )
}

export default AdminPromoCode