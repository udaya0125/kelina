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
const AdminProductBrands = () => {
    const apiUrl = import.meta.env.VITE_APP_URL

    const {toggleSidebar} = useContext(AdminDataContext)

    const {url} = usePage();
    // const {loggedUser} = useContext(MainPartContext)

    const [showBrandsAddForm,setShowBrandsAddForm] = useState(false)
    const [brandName,setBrandName] = useState('')
    const [logo, setLogo] = useState(null)
    const [reloadBrandsDataTrigger,setReloadBrandsDataTrigger] = useState(false)
    const [allBrandsData,setAllBrandsData] = useState([])

    const [updateLogo, setUpdateLogo] = useState(null)

    const [updateItemId,setUpdateItemId] = useState('')
    const [updateBrandName,setUpdateBrandName] = useState('')

    const [deletionItemId,setDeletionItemId] = useState(null)

    const[showUpdateDialog,setShowUpdateDialog] = useState(false)

    const [showDeletionDialog,setShowDeletionDialog] = useState(false)

    useEffect(()=>{
        const loadBrandsData = async()=>{
            try {
                const response = await axios.get(route('productbrand.index'))
                setAllBrandsData(response.data)
            } catch (error) {
                console.log('Error fetching',error)
            }
        }
        loadBrandsData()
    },[reloadBrandsDataTrigger])

    const handleBrandUpdateForm = async(e) => {
        e.preventDefault()
        
        const formData = new FormData()
        formData.append('brand_name',updateBrandName)
        formData.append('logo',updateLogo)
        formData.append('id',updateItemId)
        try {

            const response = await axios.post(route('productbrand.update'),formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if(response.status === 200) {
                const data = response.data
                console.log('Category Added', data)
                setShowUpdateDialog(false)
                setUpdateBrandName('')
                setReloadBrandsDataTrigger((prev)=>!prev)
            }
            else {
                console.log(response,'Sending Request Failed')
              }
        } catch (error) {
            console.log(error)
            toast.error('Error Updating Brand')
        }
    }

    //console.log(allBrandsData)


    const handleDeletion = async() =>{
        if(deletionItemId){
            try {
                const response = await axios.post(route('productbrand.destroy'),{id:deletionItemId,
                })
                
                    setDeletionItemId('')
                    setShowDeletionDialog(false)
                    setReloadBrandsDataTrigger((prev)=>!prev)
                    
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }

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

    const handleUpdateFileChange = (e) => {
        const file = e.target.files[0]
        setUpdateLogo(file)
    }

   

  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full  ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        <div className='w-[90%] mx-auto  flex flex-col'>
            {/* <button className='ml-auto tooltip tooltip-bottom' data-tip="Add Brand" onClick={()=>setShowBrandsAddForm(true)}>
                <FaCirclePlus className='text-5xl text-base-content'/>
            </button> */}

            
 <button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full ml-auto  mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Brand" onClick={()=>setShowBrandsAddForm(true)}>
                    <FaPlus/>
                </button>
            {/* <div className={`absolute bg-black/10 backdrop-blur-sm top-0 left-0 w-full h-full flex justify-center items-center ${showBrandsAddForm ? 'scale-100' : 'scale-0'} z-[20]`}>
            <div className='w-full max-w-[400px] p-6 bg-white rounded-md relative'>
                <button className='absolute top-3 right-3' onClick={()=>setShowBrandsAddForm(false)}>
                    <MdClose className='text-lg'/>
                </button>
            <form onSubmit={handleBrandsAdditionForm} className={` w-full overflow-hidden mx-auto rounded-sm  $transition-all duration-300 flex flex-col gap-2`}>
            <label>
                <p>Brand Name<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the brand name' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm' required value={brandName} onChange={(e)=>setBrandName(e.target.value)}/>
               
            </label>
            <label>
                <p>Logo</p>
                <input type='file' className='mt-1' onChange={handleFileChange}/>
            </label>
            <button type='submit' className='bg-accent  w-full p-1.5 mt-3 rounded-sm text-base-content'>Add</button>
            </form>
            </div>
            </div> */}
            <AddBrand showBrandsAddForm={showBrandsAddForm} setShowBrandsAddForm={setShowBrandsAddForm} setReloadBrandsDataTrigger={setReloadBrandsDataTrigger}/>
            <div className='bg-base-100 text-base-content p-2 mt-4 rounded-md h-[550px] overflow-auto '>
            <table className='mx-auto w-full '>
            <tbody>
                <tr className='bg-accent text-base-content/80 sticky top-0'>
                    <th className='p-2'>S.No</th>
                    <th className='p-2'>Brand</th>
                    <th className='p-2'>Image</th>
                    {/* <th className='p-2'>Edit</th>
                    <th className='p-2'>Delete</th>  */}
                    <th className='p-2'>Actions</th>   
                </tr>
                {allBrandsData && allBrandsData.map((item,index)=>(
                    <tr key={item.id} className='text-sm cursor-pointer'>
                        <td className='text-center p-1.5'>{index+1}.</td>
                        <td className='text-center p-1.5'>{item.brand_name}</td>
                        <td className='text-center p-1.5 flex justify-center'><img src={`${apiUrl}/${item.logo}`} className='w-16'/></td>
                        {/* <td className='text-center p-1.5'><button><MdEdit className=' text-lg' onClick={()=>{
                            setUpdateItemId(item.id)
                            setUpdateBrandName(item.brand_name)
                            setShowUpdateDialog(true)
                        }}/></button></td>
                        <td className='text-center p-1.5'><button onClick={()=>{setDeletionItemId(item.id)
                            setShowDeletionDialog(true)}}><MdDelete className='text-red-600 text-lg'/></button></td> */}
                        <td className='text-center'>
                        <button><MdEdit className=' text-lg' onClick={()=>{
                            setUpdateItemId(item.id)
                            setUpdateBrandName(item.brand_name)
                            setShowUpdateDialog(true)
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
             <form onSubmit={handleBrandUpdateForm}  className={`bg-base-100 text-base-content w-full max-w-[400px] overflow-hidden  mx-auto rounded-md shadow-lg  mt-8 p-6 flex flex-col gap-1.5`}>
            <label>
                <p>Updated Brand<span className='text-red-500'>*</span></p>
                <input type='text' placeholder='Enter the category name' className='border-2 border-gray-400 p-1.5 w-full mt-1 rounded-sm bg-base-100 text-base-content' required value={updateBrandName} onChange={(e)=>setUpdateBrandName(e.target.value)}/>
                
            </label>
                
            <label>
                <p>Logo</p>
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

export default AdminProductBrands