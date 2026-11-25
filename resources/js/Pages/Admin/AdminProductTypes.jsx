import { useState,useEffect,useContext } from "react"
import { FaCirclePlus } from "react-icons/fa6";
import axios from "axios";
// import { MainPartContext } from "../../Main/Context/MainContext";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import AdminPageWrapper from "@/AdminComponents/AdminPageWrapper";
import { usePage } from "@inertiajs/react";
import AddType from "@/AdminComponents/AddType";
import { AdminDataContext } from "@/AdminContext/AdminContext";
import { FaPlus } from "react-icons/fa";
const AdminProductTypes = () => {
    const {toggleSidebar} = useContext(AdminDataContext)

    const {url} = usePage()

    const [showTypesAddForm,setShowTypesAddForm] = useState(false)

    const [allTypesData,setAllTypesData] = useState([])
    const [deletionItemId,setDeletionItemId] = useState('')
    const [showDeletionDialog,setShowDeletionDialog] = useState(false)
    const [reloadDataTrigger,setReloadDataTrigger] = useState(false)
    const [deletionItemName,setDeletionItemName] = useState('')

    const [editTypeName, setEditTypeName] = useState('')
    const [showEditForm, setShowEditForm] = useState(false)
    const [categoryData, setCategoryData] = useState([])
    const [selectedBrandCategory, setSelectedBrandCategory] = useState('')

    const [editTypeId, setEditTypeId] = useState('')


    const handleDeletion = async() =>{
        console.log(deletionItemId)
        if(deletionItemId){
            try {
                const response = await axios.post(route('producttype.destroy'),{id:deletionItemId,
                deleteTypeName:deletionItemName 
                })
               
                    setDeletionItemId('')
                    setShowDeletionDialog(false)
                    setReloadDataTrigger((prev)=>!prev)
                
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }

    //console.log(allTypesData)

    
        
      

      useEffect(()=>{
            const fetchAllTypesData = async()=>{
                try {
                    const response = await axios.get(route('producttype.index'))
                    setAllTypesData(response.data)
                } catch (error) {
                    console.log('Error',error)
                }
            }
            fetchAllTypesData()
      },[reloadDataTrigger])
     console.log(allTypesData)


    
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
    },[])

    const handleTypesEditForm = async(e) => {
        e.preventDefault();
        try {
            const response =await axios.put(route('producttype.update', {productType: editTypeId}),{"type_name":editTypeName,"category_identifier":selectedBrandCategory})
            //console.log(response.data)
            setEditTypeName('')
            setSelectedBrandCategory('')
            setReloadDataTrigger((prev)=>!prev)
            setShowEditForm(false)
            toast.success('Data Updated Successfully')
        } catch (error) {
            console.log('Error updating', error)
            toast.error('Error Updating Data')
        }
    }

    const handleCategoryChange = (e) =>{
        setSelectedBrandCategory(e.target.value)
    }

  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen  flex flex-col relative transition-all duration-300'>
    <div className={`min-h-screen w-full  ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
        <div className='w-[90%] mx-auto  flex flex-col'>
        {/* <button className='ml-auto tooltip tooltip-bottom' data-tip='Add Type' onClick={()=>setShowTypesAddForm(!showTypesAddForm)}>
                <FaCirclePlus className='text-5xl text-base-content'/>
            </button> */}
           <button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full ml-auto  mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Type" onClick={()=>setShowTypesAddForm(true)}>
                    
                    <FaPlus/>
                </button>
            <AddType showTypesAddForm={showTypesAddForm} setShowTypesAddForm={setShowTypesAddForm} setReloadDataTrigger={setReloadDataTrigger}/>
        </div>
        
        <div className=" bg-base-100 text-base-content h-[550px] overflow-auto w-[90%] mx-auto mt-4 rounded-md p-2">
        <table className='mx-auto w-full '>
            <tbody>
                <tr className="bg-accent text-base-content/80 sticky top-0">
                    <th className='p-2'>S.No</th>
                    <th className='p-2'>Types</th>
                    <th className='p-2'>Category</th>
                    {/* <th className="p-2">Edit</th>
                    <th className='p-2'>Delete</th>  */}
                    <th className="p-2">Actions</th>   
                </tr>
                {allTypesData && allTypesData.map((item,index)=>(
                    <tr key={item.id} className="text-sm cursor-pointer">
                        <td className='text-center p-1.5'>{index+1}.</td>
                        <td className='text-center p-1.5'>{item.type_name}</td>
                        <td className='text-center p-1.5'>{item?.category?.Category_name}</td>
                        {/* <td className="text-center p-1.5">
                            <button onClick={()=>{
                                setEditTypeId(item.id);
                                setShowEditForm(true); 
                                setEditTypeName(item.type_name); 
                                setSelectedBrandCategory(item.category_identifier)
                            }}>
                                <MdEdit className="text-xl"/>
                            </button>
                        </td>
                        <td  className='text-center p-1.5'><button   onClick={()=>{setDeletionItemId(item.id);
                         setShowDeletionDialog(true); setDeletionItemName(item.type_name)}}><MdDelete className='text-red-600 text-xl'/></button></td> */}

                         <td className="text-center">
                         <button  onClick={()=>{
                                setEditTypeId(item.id);
                                setShowEditForm(true); 
                                setEditTypeName(item.type_name); 
                                setSelectedBrandCategory(item.category_identifier)
                            }}>
                                <MdEdit className="text-xl"/>
                            </button>

                            <button   onClick={()=>{setDeletionItemId(item.id);
                         setShowDeletionDialog(true); setDeletionItemName(item.type_name)}}><MdDelete className='text-red-600 text-xl'/></button>
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
                                <button className=' bg-red-500 text-white py-1 w-[50%] rounded-md hover:scale-90 transition duration-300' onClick={handleDeletion} >Confirm</button>
                            </div>

                </div>
             </div>



             <div className={`w-full h-full fixed top-0 left-0 bg-black/10 flex justify-center items-center backdrop-blur-sm ${showEditForm ? 'scale-100' : 'scale-0'} z-[200]`}>

<div className="w-full max-w-[400px] p-6 bg-base-100 text-base-content rounded-md relative ">
    <button onClick={()=>setShowEditForm(false)} className="absolute top-3 right-3">
        <MdClose className="text-lg"/>
    </button>
<form onSubmit={handleTypesEditForm} className={`  overflow-hidden  mx-auto rounded-sm shadow-lg  transition-all duration-300 flex flex-col gap-2`}>
<label>
    <p>Category<span className='text-red-500'>*</span></p>
    <select value={selectedBrandCategory} onChange={handleCategoryChange} className="w-full p-1.5 border-2 border-gray-400 bg-base-100 text-base-content">
        <option disabled value=''>Select</option>
        {categoryData.map((category)=>(
            <option value={category.id} key={category.id}>{category.Category_name}</option>
        ))}
    </select>
</label>
<label>
    <p>Product Type<span className='text-red-500'>*</span></p>
    <input type='text' placeholder='Enter the type name' className='border-2 border-gray-400 p-1.5 w-full mt-1 bg-base-100 text-base-content rounded-sm ' required value={editTypeName} onChange={(e)=>setEditTypeName(e.target.value)}/>
    <button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Update</button>
</label>
</form>
</div>
</div>



    </div>
    </div>
    </AdminPageWrapper>
  )
}

export default AdminProductTypes


// onClick={()=>{
//     setUpdateItemId(item.id)
//     setUpdateBrandName(item.brand_name)
//     setShowUpdateDialog(true)
// }}
// onClick={()=>{setDeletionItemId(item.id)
//     setShowDeletionDialog(true)}}