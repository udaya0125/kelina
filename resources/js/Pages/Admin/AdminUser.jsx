import React, { useEffect, useState } from 'react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import { FaCirclePlus } from 'react-icons/fa6'
import { MdClose } from 'react-icons/md'
import { toast } from 'react-toastify'
import axios from 'axios'
import { MdDelete } from 'react-icons/md'
import { usePage } from '@inertiajs/react'
import { FaPlus } from 'react-icons/fa'
const AdminUser = () => {
    const [showUserAddForm,setShowUserAddForm] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [deletionItemId, setDeletionItemId] = useState('')
    const [reloadTrigger, setReloadTrigger] = useState(false)


    const [formData, setFormData] = useState({
        name:'', 
        email:'', 
        password:'', 
        confirmpassword:''
    })

    const [allAdminUser, setAllAdminUser] = useState([])


    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevformdata)=>({
            ...prevformdata, 
            [name]:value
        }))
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault(); 
        const formDataToSend = {
            name:formData.name, 
            email:formData.email, 
            password:formData.password
        }
        if(formData.password === formData.confirmpassword) {
            try {
                const response = await axios.post(route('admin.store',formDataToSend))
                setFormData({
                    name:'', 
                    email:'', 
                    password:'', 
                    confirmpassword:''
                })
                console.log(response.data)
                toast.success('User Added Successfully')
                setReloadTrigger((prev)=>!prev)
            } catch (error) {
                toast.error('Error Adding User')
                console.log('Error Adding user',error)
            }
        }
        else {
            toast.error('Passwords do not match')
        }
    }

    useEffect(()=>{
        const fetchAdminUsers = async()=> {
            try {
                const response = await axios.get(route('admin.index'))
                setAllAdminUser(response.data)
            } catch (error) {
                console.log('Error fetching users', error)
            }
        }
        fetchAdminUsers()
    },[reloadTrigger])

    //console.log(allAdminUser)

    const handleDeletion = async() =>{
        if(deletionItemId){
            try {
                const response = await axios.post(route('admin.destroy'),{id:deletionItemId,})
                console.log(response.data)
               
                    setDeletionItemId('')
                    setShowDeleteDialog(false)
                    setReloadTrigger((prev)=>!prev)
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }

  return (
    <AdminPageWrapper>
        <div className='w-full min-h-screen  flex flex-col relative'>
    <div className='min-h-screen w-full sm:w-[70%] lg:w-[85%] ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative'>
        <div className='w-[80%] mx-auto  flex flex-col'>
            {/* <button className='ml-auto tooltip tooltip-bottom' data-tip="Add User" onClick={()=>setShowUserAddForm(true)}>
                <FaCirclePlus className='text-5xl text-white'/>
            </button> */}
            <button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full ml-auto  mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Brand" onClick={()=>setShowUserAddForm(true)}>
                    <FaPlus/>
                </button>
            <div className={`fixed w-full h-full top-0 left-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-[200] ${showUserAddForm ? 'scale-100' : 'scale-0'}`}>
                <div className='w-full max-w-[450px] p-8 bg-base-100 text-base-content rounded-md relative'>
                    <button className='absolute top-3 right-3' onClick={()=>setShowUserAddForm(false)}>
                        <MdClose className='text-xl'/>
                    </button>
                    <form className='flex flex-col gap-2' onSubmit={handleFormSubmit}>
                        <label>
                            <p>Username</p>
                            <input type='text' className='w-full rounded-md border-2 p-1.5 focus:outline-none focus:ring-0 bg-base-100 text-base-content' placeholder='Username' name='name' value={formData.name} onChange={handleChange}/>
                        </label>
                        <label>
                            <p>Email</p>
                            <input type='email' placeholder='Email' className='w-full rounded-md border-2 p-1.5 focus:outline-none focus:ring-0 bg-base-100 text-base-content' name='email' value={formData.email} onChange={handleChange}/>
                        </label>
                        <label>
                            <p>Password</p>
                            <input type='password' className='w-full rounded-md border-2 p-1.5 focus:outline-none focus:ring-0 bg-base-100 text-base-content' placeholder='Password' name='password' value={formData.password} onChange={handleChange}/>
                        </label>
                        <label>
                            <p>Confirm Password</p>
                            <input type='password' className='w-full rounded-md border-2 p-1.5 focus:outline-none focus:ring-0 bg-base-100 text-base-content' placeholder='Confirm Password' name='confirmpassword' value={formData.confirmpassword} onChange={handleChange}/>
                        </label>
                        <button type='submit' className='p-1.5 bg-tertiary rounded-md text-white mt-1'>Create</button>
                    </form>
                </div>
            </div>

            <div className='w-full bg-base-100 text-base-content mt-8 rounded-md p-2 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] h-[500px] overflow-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-accent'>
                        <td className='p-2 text-center font-bold'>S.No</td>
                        <td className='p-2 text-center font-bold'>Name</td>
                        <td className='p-2 text-center font-bold'>Email</td>
                        <td className='p-2 text-center font-bold'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {allAdminUser.map((item, index)=>
                            <tr className='text-sm' key={item.id}>
                                <td className='text-center p-1.5'>{index+1}</td>
                                <td className='text-center'>{item.name}</td>
                                <td className='text-center'>{item.email}</td>
                                <td className='text-center'><button onClick={()=>{
                                    setShowDeleteDialog(true); 
                                    setDeletionItemId(item.id);
                                }}><MdDelete className='text-lg'/></button></td>
                            </tr>
                        )}    
                    </tbody>
                    
                </table>
            </div>

            <div className={`fixed w-full h-full backdrop-blur-sm bg-black/10 top-0 left-0 flex justify-center items-center z-[200] ${showDeleteDialog ? 'scale-100' : 'scale-0'}`}>
                <div className='bg-base-100 text-base-content border-2 border-accent p-6 w-full max-w-[300px] rounded-md' >
                            <p className='text-lg font-semibold text-center'>Confirm Delete?</p>
                            <div className='flex gap-2 mt-6 w-full'>
                                <button className='bg-gray-400 py-1 w-[50%] rounded-md ml-auto hover:scale-90 transition duration-300' onClick={()=>setShowDeleteDialog(false)}>Cancel</button>
                                <button className='text-white bg-tertiary py-1 w-[50%] rounded-md hover:scale-90 transition duration-300' onClick={handleDeletion} >Confirm</button>
                            </div>

                </div>
             </div>
        </div>
        </div>
        </div>
    </AdminPageWrapper>
  )
}

export default AdminUser