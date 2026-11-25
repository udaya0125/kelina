import React,{useState, useEffect} from 'react'
import { toast } from 'react-toastify'
import { MdClose } from 'react-icons/md'
const AddType = ({showTypesAddForm, setShowTypesAddForm,setReloadDataTrigger,reloadCategoryTrigger}) => {
    // const [showTypesAddForm,setShowTypesAddForm] = useState(false)
    const [typeName,setTypeName] = useState('')
    const [categoryData,setCategoryData] = useState([])
    const [selectedBrandCategory,setSelectedBrandCategory] = useState('')


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
    },[reloadCategoryTrigger])


    const handleTypesAdditionForm = async(e) =>{
        e.preventDefault()
        try {
            const response = await axios.post(route('producttype.store'),{
                type_name:typeName,
                category_identifier:selectedBrandCategory,
                // email:loggedUser.email
            })
           
                const data = response.data
                console.log('Category Types Added', data)
                // setShowTypesAddForm(false)
                setTypeName('')
                setSelectedBrandCategory('')
                setReloadDataTrigger((prev)=>!prev)
                toast.success('Product Type Added Successfully')
        } catch (error) {
            console.log(error)
            toast.error('Error Adding Product Type')
        }
    }

    const handleCategoryChange = (e) =>{
        setSelectedBrandCategory(e.target.value)
    }

  return (
    <div className={`w-full h-full fixed top-0 left-0 bg-black/10 flex justify-center items-center backdrop-blur-sm ${showTypesAddForm ? 'scale-100' : 'scale-0'} z-[250]`}>

            <div className="w-full max-w-[400px] p-6 bg-base-100 text-base-content rounded-md relative ">
                <button onClick={()=>setShowTypesAddForm(false)} className="absolute top-3 right-3">
                    <MdClose className="text-lg"/>
                </button>
            <form onSubmit={handleTypesAdditionForm} className={`  overflow-hidden  mx-auto rounded-sm   transition-all duration-300 flex flex-col gap-2`}>
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
                <input type='text' placeholder='Enter the type name' className='border-2 border-gray-400 p-1.5 w-full mt-1 bg-base-100 text-base-content rounded-sm ' required value={typeName} onChange={(e)=>setTypeName(e.target.value)}/>
                <button type='submit' className='bg-tertiary  w-full p-1.5 mt-3 rounded-sm text-white'>Add</button>
            </label>
            </form>
            </div>
            </div>
  )
}

export default AddType