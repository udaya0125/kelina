import  { useState,useEffect,useContext } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';
import { MdClose, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper';
// import { MainPartContext } from '../../Main/Context/MainContext';
import { usePage } from '@inertiajs/react';
import AddBrand from '@/AdminComponents/AddBrand';
import { AdminDataContext } from '@/AdminContext/AdminContext';
import { FaPlus } from 'react-icons/fa';
import AddEmployee from '@/AdminComponents/AddEmployee';
const AdminEmployee = () => {
    const apiUrl = import.meta.env.VITE_APP_URL

    const {toggleSidebar} = useContext(AdminDataContext)

    const {url} = usePage();
    // const {loggedUser} = useContext(MainPartContext)

    const [showEmployeeAddForm,setShowEmployeeAddForm] = useState(false)
    const [name,setName] = useState('')
    const [image, setImage] = useState(null)
    const [reloadEmployeeDataTrigger,setReloadEmployeeDataTrigger] = useState(false)
    const [allEmployeeData,setAllEmployeeData] = useState([])

    const [updateImage, setUpdateImage] = useState(null)

    const [updateItemId,setUpdateItemId] = useState('')
    const [updateEmployeeName,setUpdateEmployeeName] = useState('')
    const [updateEmployeeDesignation, setUpdateEmployeeDesignation] = useState('')
    const [updateEmployeePhoneNumber, setUpdateEmployeePhoneNumber] = useState('')
    
    const [deletionItemId,setDeletionItemId] = useState(null)

    const[showUpdateDialog,setShowUpdateDialog] = useState(false)

    const [showDeletionDialog,setShowDeletionDialog] = useState(false)

    useEffect(()=>{
        const loadBrandsData = async()=>{
            try {
                const response = await axios.get(route('employee.index'))
                setAllEmployeeData(response.data)
            } catch (error) {
                console.log('Error fetching',error)
            }
        }
        loadBrandsData()
    },[reloadEmployeeDataTrigger])

    // const handleEmployeeUpdateForm = async(e) => {
    //     e.preventDefault()
        
    //     const formData = new FormData()
    //     formData.append('name',updateEmployeeName)
    //     formData.append('image',updateImage)
    //     formData.append('designation',updateEmployeeDesignation)
    //     // formData.append('id',updateItemId)

    //     console.log(updateEmployeeName)
    //     console.log(updateEmployeeDesignation)

    //     console.log(formData)
    //     try {

    //         const response = await axios.put(route('employee.update',{id:updateItemId}),formData,{
    //             headers: {
    //                 'Content-Type': 'multipart/form-data'
    //             }
    //         })
    //         if(response.status === 200) {
    //             const data = response.data
    //             console.log('Employee Added', data)
    //             setShowUpdateDialog(false)
    //             setUpdateEmployeeName('')
    //             setReloadEmployeeDataTrigger((prev)=>!prev)
    //         }
    //         else {
    //             console.log(response,'Sending Request Failed')
    //           }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Error Updating Employee')
    //     }
    // }

    //console.log(allEmployeeData)

    const handleEmployeeUpdateForm = async(e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('name', updateEmployeeName)
        formData.append('designation', updateEmployeeDesignation)
        formData.append('phone_number', updateEmployeePhoneNumber)
        // If you're updating the image, append it
        if (updateImage) {
            formData.append('image', updateImage)
        }
    
        // Important: Log the contents of FormData to verify
        for (let [key, value] of formData.entries()) {
            console.log(key, value)
        }
    
        try {
            const response = await axios.post(route('employee.update', {id: updateItemId}), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            
                const data = response.data
                console.log('Employee Updated', data)
                setShowUpdateDialog(false)
                setUpdateEmployeeName('')
                setUpdateEmployeeDesignation('')
                setUpdateEmployeePhoneNumber('')
                setUpdateImage(null)
                setReloadEmployeeDataTrigger((prev)=>!prev)
               
           
        } catch (error) {
            console.log(error.response.data) // This will show more detailed error information
            toast.error('Error Updating Employee')
        }
    }

    const handleDeletion = async() =>{
        if(deletionItemId){
            try {
                const response = await axios.delete(route('employee.destroy',{id:deletionItemId}))
                
                    setDeletionItemId('')
                    setShowDeletionDialog(false)
                    setReloadEmployeeDataTrigger((prev)=>!prev)
                    
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }

    // const handleBrandsAdditionForm = async(e) => {
    //     e.preventDefault();
    //     // console.log(name)
    //     // console.log(image)
    //     try {

    //         const formData= new FormData()
    //         formData.append('brand_name', name)
    //         formData.append('image', image)

    //         const response = await axios.post(route('productbrand.store'),
    //         formData, 
    //     {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })

    //             const data = response.data
    //             console.log('Brand Added', data)
    //             setShowEmployeeAddForm(false)
    //             setName('')
    //             setReloadEmployeeDataTrigger((prev)=>!prev)
    //             toast.success('Brand Added Successfully')
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Error Adding Brand')
    //     }

    // }
   
    // const handleFileChange = (e) => {
    //     const file = e.target.files[0]; 
    //     setImage(file)
    // }

    const handleUpdateFileChange = (e) => {
        const file = e.target.files[0]
        setUpdateImage(file)
    }

    console.log(allEmployeeData)
   

  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full  ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        <div className='w-[90%] mx-auto  flex flex-col'>
            {/* <button className='ml-auto tooltip tooltip-bottom' data-tip="Add Brand" onClick={()=>setShowEmployeeAddForm(true)}>
                <FaCirclePlus className='text-5xl text-base-content'/>
            </button> */}

            
 <button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full ml-auto  mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Employee" onClick={()=>setShowEmployeeAddForm(true)}>
                    <FaPlus/>
                </button>
           
            <AddEmployee showEmployeeAddForm={showEmployeeAddForm} setShowEmployeeAddForm={setShowEmployeeAddForm} setReloadEmployeeDataTrigger={setReloadEmployeeDataTrigger}/>
            <div className='bg-base-100 text-base-content p-2 mt-4 rounded-md h-[550px] overflow-auto '>
            <table className='mx-auto w-full '>
            <tbody>
                <tr className='bg-accent text-base-content/80 sticky top-0'>
                    <th className='p-2'>S.No</th>
                    <th className='p-2'>Name</th>
                    <th className='p-2'>Designation</th>
                    <th className='p-2'>Phone Number</th>
                    <th className='p-2'>Image</th>
                    {/* <th className='p-2'>Edit</th>
                    <th className='p-2'>Delete</th>  */}
                    <th className='p-2'>Actions</th>   
                </tr>
                {allEmployeeData && allEmployeeData.map((item,index)=>(
                    <tr key={item.id} className='text-sm cursor-pointer'>
                        <td className='text-center p-1.5'>{index+1}.</td>
                        <td className='text-center p-1.5'>{item.name}</td>
                        <td className='text-center p-1.5'>{item.designation}</td>
                        <td className='text-center p-1.5'>{item.phone_number}</td>
                        <td className='text-center p-1.5 flex justify-center'><img src={`${apiUrl}/${item.image}`} className='w-16'/></td>
                    
                        <td className='text-center'>
                        <button><MdEdit className=' text-lg' onClick={()=>{
                            setUpdateItemId(item.id)
                            setUpdateEmployeeName(item.name)
                            setShowUpdateDialog(true)
                            setUpdateEmployeeDesignation(item.designation)
                            setUpdateEmployeePhoneNumber(item.phone_number)
                        }}/></button>   
                         <button onClick={()=>{setDeletionItemId(item.id)
                            setShowDeletionDialog(true)}}><MdDelete className='text-red-600 text-lg'/></button>
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
        <div className={`fixed backdrop-blur-sm w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center  ${showDeletionDialog ? 'scale-100' : 'scale-0'} z-[200]`}>
                <div className='bg-base-100 text-base-content border-2 border-accent p-6 w-full max-w-[300px] rounded-md' >
                            <p className='text-lg font-semibold text-center'>Confirm Delete?</p>
                            <div className='flex gap-2 mt-6 w-full'>
                                <button className='bg-gray-400 py-1 w-[50%] rounded-sm ml-auto hover:scale-90 transition duration-300' onClick={()=>setShowDeletionDialog(false)}>Cancel</button>
                                <button className='text-white bg-red-500 py-1 w-[50%] rounded-sm hover:scale-90 transition duration-300' onClick={handleDeletion} >Confirm</button>
                            </div>

                </div>
             </div>
        

             <div className={`fixed w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center backdrop-blur-sm  ${showUpdateDialog ? 'scale-100' : 'scale-0'} z-[200]`}>
             <form onSubmit={handleEmployeeUpdateForm}  className={`bg-base-100 text-base-content w-full max-w-[400px] overflow-hidden  mx-auto rounded-md shadow-lg  mt-8 p-6 flex flex-col gap-1.5`}>
            <label>
                <p>Updated Employee<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the category name' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm bg-base-100 text-base-content' required value={updateEmployeeName} onChange={(e)=>setUpdateEmployeeName(e.target.value)}/>
                
            </label>

            <label>
                <p>Designation</p>
                <input type='text' placeholder ='Enter Designation Name' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm bg-base-100 text-base-content' required value={updateEmployeeDesignation} onChange={(e)=>setUpdateEmployeeDesignation(e.target.value)}/>
            </label>

            <label> 
                <p>Phone Number</p>
                <input type='text' placeholder = 'Enter Phone Number' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm bg-base-100 text-base-content' value={updateEmployeePhoneNumber} onChange={(e)=>setUpdateEmployeePhoneNumber(e.target.value)}/>
            </label>
                
            <label>
                <p>Image</p>
                <input type='file' className='mt-1' onChange={handleUpdateFileChange}/>
            </label>

            <div className='flex gap-2 mt-3'>
                <button type='button' className='w-[50%] bg-gray-400 text-base-content' onClick={(e)=>{
                    e.preventDefault;
                    setShowUpdateDialog(false)
                }}>
                    Cancel
                </button>
                <button type='submit' className='bg-tertiary py-1.5  rounded-sm text-white w-[50%]'>Update</button>
                </div>
            </form>
                </div>
        </div>
        </div>
    </AdminPageWrapper>
  )
}

export default AdminEmployee