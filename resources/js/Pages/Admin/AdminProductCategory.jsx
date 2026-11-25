import  { useEffect, useState, useContext } from 'react'
import { FaCirclePlus } from "react-icons/fa6";
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper';
import { usePage } from '@inertiajs/react';
import AddCategory from '@/AdminComponents/AddCategory';
import { AdminDataContext } from '@/AdminContext/AdminContext';
import { FaPlus } from 'react-icons/fa';
const AdminProductCategory = () => {
    const apiUrl = import.meta.env.VITE_APP_URL ; 
    
    const {toggleSidebar} = useContext(AdminDataContext)

    const {url} = usePage();
    const [showCategoryAddForm,setShowCategoryAddForm] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [deletionItemId,setDeletionItemId] = useState(null)
    const [showDeletionDialog,setShowDeletionDialog] = useState(false)
    const [reloadCategoryDataTrigger,setReloadCategoryTrigger] = useState(false)
    const [updateCategoryId, setUpdateCategoryId] = useState('')
    const [updateCategoryName, setUpdateCategoryName] = useState('')
    const [showUpdateDialog, setShowUpdateDialog] = useState(false)

    const [updateImage, setUpdateImage] = useState(null)

    


    useEffect(()=>{
        const loadCategoryData = async()=>{
            try {
                const response = await axios.get(route('categories.index'))
                setCategoryData(response.data)
            } catch (error) {
                console.log('Error fetching',error)
            }
        }
        loadCategoryData()
    },[reloadCategoryDataTrigger])

    //console.log(categoryData)


    


    const handleDeletion = async() =>{
        if(deletionItemId){
            try {
                const response = await axios.post(route('categories.destroy'),{id:deletionItemId
                })
              
                    setDeletionItemId('')
                    setShowDeletionDialog(false)
                    setReloadCategoryTrigger((prev)=>!prev)
                
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }
    // console.log(updateCategoryName)
    // console.log(updateImage)
    const handleCategoryUpdateForm = async(e) => {
        e.preventDefault();
        const formData = new FormData()
        //formData.append("_method", "PUT")
        formData.append("category_name",updateCategoryName)
        formData.append("image", updateImage)
        formData.append("id", updateCategoryId)
        console.log('Sending Data', {
            category_name: updateCategoryName, 
            image:updateImage
        })
        try {
            // const response = await axios.post(route('categories.update',{category:updateCategoryId}), formData, {
            //     headers: {
            //         'Content-Type' : 'multipart/form-data'
            //     }
            // } 

            const response = await axios.post(route('categories.update',{category:updateCategoryId}), formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            }
        )

            console.log(response.data)
            setUpdateCategoryId(''); 
            setUpdateCategoryName('');
            setReloadCategoryTrigger((prev)=>!prev);
            setShowUpdateDialog(false); 
            toast.success('Category Updated Successfully');
        } catch (error) {
            console.log('Error Updating Data', error)
            toast.error('Error updating Data');
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        setUpdateImage(file)
    }

    //console.log(updateImage)

  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen  flex flex-col relative'>
    <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        <div className='w-[90%] mx-auto  flex flex-col'>
            {/* <button className='ml-auto tooltip tooltip-bottom' data-tip="Add Category"  onClick={()=>setShowCategoryAddForm(true)}>
                <FaCirclePlus className='text-5xl text-base-content'/>
            </button> */}
            <button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full ml-auto  mb-2 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Category" onClick={()=>setShowCategoryAddForm(true)}>
                    
                    <FaPlus/>
                </button>
            <AddCategory showCategoryAddForm={showCategoryAddForm} setShowCategoryAddForm={setShowCategoryAddForm} setReloadCategoryTrigger={setReloadCategoryTrigger}/>
            <div className='bg-base-100 text-base-content mt-4 p-2 rounded-md h-[550px] overflow-auto '>
            <table className=' mx-auto w-full relative'>
            <tbody>
                <tr className='bg-accent sticky top-0 z-[10] text-base-content/80'>
                    <th className='p-2'>S.No</th>
                    <th className='p-2'>Category Name</th>
                    <th className='p-2'>Image</th>
                    {/* <th className='p-2'>Edit</th>
                    <th className='p-2'>Delete</th>   */}
                    <th className='p-2'>Actions</th>                  
                </tr>
                {categoryData && categoryData.map((item,index)=>(
                    <tr key={item.id} className='text-sm cursor-pointer'>
                        <td className='text-center p-1.5'>{index+1}.</td>
                        <td className='text-center p-1.5'>{item.Category_name}</td>
                        <td className='text-center p-1.5 flex justify-center'><img className='w-16' src={`${apiUrl}/${item.image}`}/></td>
                        {/* <td className='text-center p-1.5'><button><MdEdit className=' text-base' onClick={()=>{
                            setUpdateCategoryId(item.id)
                            setUpdateCategoryName(item.Category_name)
                            setShowUpdateDialog(true)
                        }}/></button></td> */}
                       {/* <td className='text-center p-1.5'>
                            <button onClick={()=>{
                                setShowDeletionDialog(true); 
                                setDeletionItemId(item.id); 
                            }}>
                                <MdDelete className='text-red-500 text-xl'/>
                            </button>
                       </td> */}
                       <td className='text-center'>
                       <button className='pr-1' onClick={()=>{
                            setUpdateCategoryId(item.id)
                            setUpdateCategoryName(item.Category_name)
                            setShowUpdateDialog(true)
                        }}><MdEdit className=' text-lg' /></button>
                        <button onClick={()=>{
                                setShowDeletionDialog(true); 
                                setDeletionItemId(item.id); 
                            }}>
                                <MdDelete className='text-red-500 text-lg'/>
                            </button>
                       </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
                    
        <div className={`fixed w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center backdrop-blur-sm ${showDeletionDialog ? 'scale-100' : 'scale-0'} z-[200]`}>
                <div className='bg-base-100 text-base-content border-2 border-accent p-6 w-full max-w-[300px] rounded-md' >
                            <p className='text-lg font-semibold text-center'>Confirm Delete?</p>
                            <div className='flex gap-2 mt-6 w-full'>
                                <button className='bg-gray-400 py-1 w-[50%] rounded-md ml-auto hover:scale-90 transition duration-300' onClick={()=>setShowDeletionDialog(false)}>Cancel</button>
                                <button className='text-white bg-red-500 py-1 w-[50%] rounded-md hover:scale-90 transition duration-300' onClick={handleDeletion} >Confirm</button>
                            </div>

                </div>
             </div>


             <div className={`w-full h-full top-0 left-0 fixed flex justify-center items-center bg-black/20 backdrop-blur-sm ${showUpdateDialog ? 'scale-100' : 'scale-0'} z-[200]`}>
            <div className='w-full max-w-[400px] p-6 rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] bg-base-100 relative text-base-content'>
                <button className='absolute top-3 right-3' onClick={()=>setShowUpdateDialog(false)}>
                    <MdClose className='text-lg'/>
                </button>
            <form onSubmit={handleCategoryUpdateForm} className={`  overflow-hidden  mx-auto rounded-sm  transition-all duration-300`}>
            <label>
                <p>Category<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the category name' className='border-2 bg-base-100 border-gray-500 p-1.5 w-full mt-1 rounded-sm' required value={updateCategoryName} onChange={(e)=>setUpdateCategoryName(e.target.value)}/>
               
            </label>

            <input type='file' className='mt-3' onChange={handleFileChange}/>
            <button type='submit' className='bg-tertiary text-white  w-full p-1.5 mt-3 rounded-sm'>Update</button>
            </form>
            </div>
            </div>
        

             
        </div>
        </div>
    </AdminPageWrapper>
  )
}

export default AdminProductCategory




// const handleCategoryAdditionForm = async(e) => {
    //     e.preventDefault();       
    //     try {
    //         const response = await axios.post(route('categories.store'),{
    //             Category_name:categoryName,
    //         })

    //             setCategoryName('')
    //             setReloadCategoryTrigger((prev)=>!prev)
    //             toast.success('Category Added Successfully')
    //     } catch (error) {
    //         console.log(error)
    //         toast.error('Error Adding Category')
    //     }
    // }

    // const handleCategoryUpdateForm = async(e) => {
    //     e.preventDefault()       
    //     try {
    //         const response = await axios.post('http://localhost:3000/updateproductcategory',{
    //             recordId:updateCategoryId, updatedCategory:updatedCategoryName
    //         },{
    //             headers:{
    //                 'Content-Type':'application/json'
    //             }
    //         })
    //         if(response.status === 200) {
    //             const data = response.data
    //             console.log('Category Added', data)
    //             setShowUpdateDialog(false)
    //             setUpdatedCategoryName('')
    //             setReloadCategoryTrigger((prev)=>!prev)
    //         }
    //         else {
    //             console.log(response,'Sending Request Failed')
    //           }
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    {/* <div className={`absolute w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center transition-all duration-300 ${showUpdateDialog ? 'scale-100' : 'scale-0'} z-[120]`}>
             <form onSubmit={handleCategoryUpdateForm} className={`bg-gray-50 w-full max-w-[400px] overflow-hidden  mx-auto rounded-sm shadow-lg  mt-8 p-6`}>
            <label>
                <p>Updated Category<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the category name' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={updatedCategoryName} onChange={(e)=>setUpdatedCategoryName(e.target.value)}/>
                </label>
                <div className='flex gap-2 mt-3'>
                <button type='button' className='w-[50%] bg-gray-400 text-base-content' onClick={(e)=>{
                    e.preventDefault;
                    setShowUpdateDialog(false)
                }}>
                    Cancel
                </button>
                <button type='submit' className='bg-customTheme py-1.5  rounded-sm text-base-content w-[50%]'>Update</button>
                </div>
            
            </form>
                </div> */}