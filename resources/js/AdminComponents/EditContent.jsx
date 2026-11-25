import  {useContext,useState,useEffect,useRef} from 'react'
import QuillEditor from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

import { AdminDataContext } from '@/AdminContext/AdminContext'
import { toast } from 'react-toastify'
import AddBrand from './AddBrand'
import AddCategory from './AddCategory'
import AddType from './AddType'
import { FaCirclePlus } from 'react-icons/fa6'
import Select from 'react-select'

const EditContent = () => {
   

    const quill = useRef()
    // const navigate = useNavigate()

    const {editItemInfo, setEditItemInfo} = useContext(AdminDataContext)

    const [categoryData,setCategoryData] = useState([])
    const [brandData,setBrandData] = useState([])
    const [typesData,setTypesData] = useState([])
    const [selectedCategory,setSelectedCategory] = useState('')

    const [triggerReload, setTriggerReload] = useState(false)

    const [editFormData,setEditFormData] = useState({
        product_name:'',
        sku:'',
        product_category:'',
        product_type:'',
        product_brand:'',
        discounted_price:null,
        buying_price:null,
        selling_price:null,
        stock_quantity:null,
        description:'',
        specification:'',
    })


    const [tags, setTags] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isInStock, setIsInStock] = useState('')


    const [reloadBrandsDataTrigger, setReloadBrandsDataTrigger] = useState(false)
    const [reloadCategoryTrigger, setReloadCategoryTrigger] = useState(false)
    const [reloadTypesDataTrigger, setReloadTypesDataTrigger] = useState(false) 

    const [showCategoryAddForm, setShowCategoryAddForm] = useState(false)
    const [showBrandsAddForm, setShowBrandsAddForm] = useState(false)
    const [showTypesAddForm, setShowTypesAddForm] = useState(false)

    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=> {
        const storedItem = JSON.parse(localStorage.getItem('editItemInfo'))
        if(storedItem){
            setEditItemInfo(storedItem);
        }

    }, [triggerReload])


    const handleChange = (selectedOption, action) => {
        setEditFormData({
            ...editFormData, 
            [action.name]: selectedOption? selectedOption.value : ''
        })
    }

    const categoryOptions = categoryData.map(item => ({
        value: item.id,
        label: item.Category_name
    }));
    
    const typeOptions = typesData.map(type => ({
        value: type.type_name,
        label: type.type_name
    }));
    
    const brandOptions = brandData.map(item => ({
        value: item.brand_name,
        label: item.brand_name
    }));
     
    // console.log(brandOptions)

    // console.log(editFormData)
    // console.log(categoryData)
    // console.log(brandData)
    // console.log(typesData)


    //console.log(inputValue)

    const populateEditFormData = () => {
        setEditFormData({
            product_name: editItemInfo.product_name,
            sku: editItemInfo.sku,
            product_category: Number(editItemInfo.product_category),
            product_type: editItemInfo.product_type,
            product_brand: editItemInfo.product_brand,
            discounted_price: editItemInfo.discounted_price,
            buying_price: editItemInfo.buying_price,
            selling_price: editItemInfo.selling_price,
            stock_quantity: editItemInfo.stock_quantity,
            description: editItemInfo.description,
            specification: editItemInfo.specification,
        })
        setSelectedCategory(editItemInfo.product_category)

        setTags(editItemInfo.tags ? editItemInfo.tags.split(",").map(tag => tag.trim()) : []);

        setIsInStock(editItemInfo.instock === 1 ? true : false)
    }


    const handleCheckboxChange = () => {
        const newStatus = !isInStock;
        setIsInStock(newStatus);
        // // Call the onStatusChange prop with the new status (as 0 or 1)
        // onStatusChange(newStatus ? 1 : 0);
      };

    const handleCategoryChange = (e) =>{
        const selectedCategoryId = e.target.value
        setSelectedCategory(selectedCategoryId)
        setEditFormData({...editFormData,
        [e.target.name]:e.target.value})
    }

    // console.log(editFormData)
    // console.log(editItemInfo)

    // useEffect(()=> {
    //     populateEditFormData()
    // },[editItemInfo])


    // Modify your useEffect for fetching data to include setEditFormData after data is loaded
useEffect(() => {
    const fetchData = async() => {
        setIsLoading(true)
      try {
        const [categoryResponse, brandResponse, itemTypeResponse] = await Promise.all([
          axios.get(route('categories.index')),
          axios.get(route('productbrand.index')),
          axios.get(route('producttype.index'))  
        ]);
        
        setCategoryData(categoryResponse.data);
        setBrandData(brandResponse.data);
        setTypesData(itemTypeResponse.data);
        
        // Now that we have the data, populate the form
        populateEditFormData();
        setIsLoading(false)
      } catch (error) {
        console.log('Error', error);
        setIsLoading(false)
      }
    };
    
    fetchData();
  }, [reloadTypesDataTrigger, reloadBrandsDataTrigger, reloadCategoryTrigger, editItemInfo]);




    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEditFormData((prevFormData)=>({
            ...prevFormData,
            [name]: value    
        }))
    }

    

    useEffect(()=>{
        const fetchData = async() => {
            
            try {
                const [categoryResponse,brandResponse,itemTypeResponse] = await Promise.all([
                  axios.get(route('categories.index')),
                  axios.get(route('productbrand.index')),
                  axios.get(route('producttype.index'))  
                ])
                setCategoryData(categoryResponse.data)
                setBrandData(brandResponse.data)
                setTypesData(itemTypeResponse.data)
            } catch (error) {
                console.log('Error',error)
            }
        }
        fetchData()
    },[reloadTypesDataTrigger, reloadBrandsDataTrigger, reloadCategoryTrigger])


   
    const handleProductUpdateForm = async(e) => {
        e.preventDefault(); 
        const tagsString = tags.join(', ')
        const formDataToSend = {
            ...editFormData, 
            id:editItemInfo.id,
            tags:tagsString,
            instock:isInStock
        }       
        //console.log(formDataToSend)
        try {
            const response = await axios.post(route('productcontent.update'),formDataToSend,{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            if(response.status === 200) {
                toast.success('Content Edited')
                const fetchItem = await axios.get(route('productedit.show', {id:editItemInfo.id}))
                localStorage.setItem('editItemInfo', JSON.stringify(fetchItem.data));
                setTriggerReload((prev)=>!prev)

                // const data = response.data
                // console.log('Product Data Updated', data)
                
            }
            else {
                console.log(response,'Sending Request Failed')
              }
        } catch (error) {
            console.log(error)
            toast.error('Error updating the content.')
        }
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
          e.preventDefault();
          setTags((prevTags) => [...prevTags, inputValue.trim()]);
          setInputValue('');
        }
      };
      
      const removeTag = (indexToRemove) => {
        setTags((prevTags) => prevTags.filter((_, i) => i !== indexToRemove));
      };


      //console.log(isInStock)

      console.log(editItemInfo)
      console.log(editFormData)
    

   if(isLoading) {
    return <div className='w-full text-center pt-12'>Loading...</div>
   }   
  
  return (
    <div className='w-full  flex justify-center'>
        <AddBrand showBrandsAddForm={showBrandsAddForm} setShowBrandsAddForm={setShowBrandsAddForm} setReloadBrandsDataTrigger={setReloadBrandsDataTrigger}/>
    <AddCategory showCategoryAddForm={showCategoryAddForm} setShowCategoryAddForm={setShowCategoryAddForm} setReloadCategoryTrigger={setReloadCategoryTrigger} reloadCategoryTrigger={reloadCategoryTrigger}/>
    <AddType showTypesAddForm={showTypesAddForm} setShowTypesAddForm={setShowTypesAddForm} setReloadDataTrigger={setReloadTypesDataTrigger} reloadCategoryTrigger={reloadCategoryTrigger}/>

        <div className='w-full max-w-[90%]  rounded-md overflow-hidden mt-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-base-content'>
                <div className='bg-tertiary p-4 '>
                    <p className='text-lg text-center text-white/80'>Edit Product</p>
                </div>
            
            <form encType="multipart/form-data" className="p-6 sm:grid sm:grid-cols-3 gap-1 shadow-lg rounded-sm bg-base-100" onSubmit={handleProductUpdateForm}>

    <div className="flex gap-2">
    <label className="sm:w-[60%]">
        <p className="mb-0.5">Name<span className="text-red-500">*</span></p>
        <input name="product_name" type="text" className="w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content" value={editFormData.product_name} onChange={handleInputChange} required/>
    </label>
    <label className="sm:w-[40%]">
        <p className="mb-0.5">SKU<span className="text-red-500">*</span></p>
        <input name="sku" type="text" className="w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content" value={editFormData.sku} onChange={handleInputChange} required readOnly/>
    </label>
</div>

<div>
    <div className='w-full flex justify-between items-center'>
    <p className="mb-0.5">Product Category<span className="text-red-500">*</span></p>
    <button type='button' onClick={(e)=> {
        e.preventDefault(); 
        setShowCategoryAddForm(true)
        className='text-center pr-1 text-tertiary'
    }}><FaCirclePlus className='text-tertiary'/></button>
    </div>
    {/* <select name="product_category" className="w-full border-2 border-gray-400 p-1.5 bg-base-100 text-base-content" value={editFormData.product_category} onChange={handleCategoryChange}
    
    >
        <option value="" disabled>Select</option>
        {categoryData.map((item) => (
            <option value={item.id} key={item.id}>{item.Category_name}</option>
        ))}
    </select> */}
    <Select
            options={categoryOptions}
            value={categoryOptions.find(option => option.value === Number(editFormData.product_category))}
            onChange={(selectedOption) => handleChange(selectedOption, { name: 'product_category' })}
            placeholder="Select Category"
            className="w-full"
        />
</div>

<div className="w-full">
    <div className='w-full flex justify-between items-center'>

    <p className="mb-0.5">Product Type<span className="text-red-500">*</span></p>
    <button type='button' onClick={(e) => {
        e.preventDefault(); 
        setShowTypesAddForm(true); 
        className='text-center pr-1 text-tertiary'
    }}><FaCirclePlus className='text-tertiary'/></button>
    </div>
    {/* <select name="product_type" className="border-2 border-gray-400 w-full p-1.5 bg-base-100 text-base-content " value={editFormData.product_type} onChange={handleInputChange}>
        <option value="" disabled>Select</option>
        {typesData.map((type) => (
            <option value={type.type_name} key={type.id}>{type.type_name}</option>
        ))}
    </select> */}
     <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === editFormData.product_type)}
            onChange={(selectedOption) => handleChange(selectedOption, { name: 'product_type' })}
            placeholder="Select Type"
            className="w-full"
        />
</div>

<div className="w-full">
    <div className='w-full flex justify-between items-center'>
    <p className="mb-0.5">Product Brand<span className="text-red-500">*</span></p>
    <button type='button' className='mr-1' onClick={(e)=>{
        e.preventDefault(); 
        setShowBrandsAddForm(true);
    }}>
        <FaCirclePlus className='text-tertiary'/>
    </button>
    </div>
    {/* <select name="product_brand" className="w-full bg-base-100 text-base-content border-2 border-gray-400 p-1.5 " value={editFormData.product_brand} onChange={handleInputChange}>
        <option value="" disabled>Select</option>
        {brandData.map((item) => (
            <option value={item.brand_name} key={item.id}>{item.brand_name}</option>
        ))}
    </select> */}
    <Select
            options={brandOptions}
            value={brandOptions.find(option => option.value === editFormData.product_brand)}
            onChange={(selectedOption) => handleChange(selectedOption, { name: 'product_brand' })}
            placeholder="Select Brand"
            className="w-full"
        />
</div>

<div className="flex gap-2 items-end">
    <label className="w-[50%]">
        <p className="mb-0.5 line-through">Crossed Price<span className="text-red-500">*</span></p>
        <input name="discounted_price" type="number" className="w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content" value={editFormData.discounted_price} onChange={handleInputChange} />
    </label>
    <label className="w-[50%]">
        <p className="mb-0.5">Selling Price<span className="text-red-500">*</span></p>
        <input name="selling_price" type="number" className="w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content" value={editFormData.selling_price} onChange={handleInputChange} />
    </label>
</div>

<div className="flex gap-2 items-end">
    <label className="w-[50%]">
        <p className="mb-0.5">Buying Price<span className="text-red-500">*</span></p>
        <input name="buying_price" value={editFormData.buying_price} type="number" className="w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content" onChange={handleInputChange} />
    </label>
    <label className="w-[50%]">
        <p className="mb-0.5">Stock Quantity<span className="text-red-500">*</span></p>
        <input name="stock_quantity" value={editFormData.stock_quantity} type="number" className="w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content " onChange={handleInputChange} />
    </label>
</div>

<div className="col-span-3 flex gap-4 flex-col sm:flex-row">
    <label className="sm:w-[50%]">
        <p className="mb-0.5">Description<span className="text-red-500">*</span></p>
        <textarea name="description" className="w-full p-1.5 border rounded-md border-gray-400 resize-none bg-base-100 text-base-content" rows={3} value={editFormData.description} onChange={handleInputChange} />
    </label>
    <label className="sm:w-[50%]">
        <p className="mb-0.5">Specifications<span className="text-red-500">*</span></p>
        <QuillEditor ref={(el) => (quill.current = el)} theme="snow" value={editFormData.specification} onChange={(value) => setEditFormData({ ...editFormData, specification: value })} className="border border-gray-400" />
    </label>
</div>

<label className='w-full flex flex-wrap gap-2 mb-2'>
{tags.map((tag, index) => (
    <div key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md flex items-center">
      {tag}
      <button
        type="button"
        onClick={(e) =>{ 
            e.preventDefault();
            removeTag(index)}}
        className="ml-2 text-xs"
      >
        &times;
      </button>
    </div>
  ))}
  <input
    type="text"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    onKeyDown={handleKeyDown}
    placeholder="Add a tag"
    className="border rounded-md p-1.5 bg-base-100 text-base-content"
  />  

</label>

<div className='flex-col flex gap-1'>
      <p>In Stock</p>
      <label className="relative inline-flex cursor-pointer items-center">
        <input 
          id="stock-status-switch" 
          type="checkbox" 
          className="peer sr-only" 
          checked={isInStock}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="stock-status-switch" className="hidden"></label>
        <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
      </label>
    </div>

{/* <div className="sm:col-span-3">
    <label>
        <p className="pb-0.5">Images <span className="text-gray-400">(Choose multiple images if needed)</span></p>
        <input id="image-input" type="file" accept="image/*" multiple className="w-full" onChange={handleImageFileChange} />
    </label>
    <div className="flex gap-4 my-4">
        {imagePreviews && imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
                <img src={preview} className="w-14 h-14 rounded-full" />
                <button className="absolute top-0 right-0 mt-[-10px] mr-[-6px]" onClick={() => handleRemoveImage(index)}>
                    <IoClose className="text-red-500" />
                </button>
            </div>
        ))}
    </div>
</div> */}

<button type="submit" className="w-full col-span-3 bg-tertiary p-1.5 rounded-sm text-white">Update</button>
</form>

            </div>

    </div>
)
}
  


export default EditContent



{/* <form encType='multipart/form-data' className=' p-6 sm:grid  sm:grid-cols-3 gap-1 shadow-lg rounded-sm' onSubmit={handleProductUpdateForm}>
                
                <label>
                    <p className='mb-0.5'>Name<span className='text-red-500'>*</span></p>
                    <input name='product_name' type='text' className='w-full p-1.5 border-2 border-gray-400 ' value={editFormData.product_name} onChange={handleInputChange} required/>
                </label>
                <label>
                    <p className='mb-0.5'>Product Category<span className='text-red-500'>*</span></p>
                    <select name='product_category' className='w-full border-2 border-gray-400 p-1.5 '
                    value={editFormData.product_category}
                    onChange={handleCategoryChange}>
                        {categoryData.map((item)=>(
                            <option value={item.id} key={item.id}>{item.Category_name}</option>
                        ))}
                    </select>
                </label>
                <div className='flex gap-2'>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Product Type<span className='text-red-500'>*</span></p>
                <select name='product_type' className='border-2 border-gray-400 w-full p-1.5 ' value={editFormData.product_type} onChange={handleInputChange}>
                        {typesData.filter(type=>type.identifier == selectedCategory).map((type)=>(
                            <option value={type.type_name} key={type.id}>
                                {type.type_name}
                            </option>
                        ))}
                </select>
                </label>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Product Brand<span className='text-red-500'>*</span></p>
                    <select name='product_brand' className='w-full border-2 border-gray-400 p-1.5 ' onChange={handleInputChange}>
                        {brandData.map((item)=>(
                            <option value={item.brand_name} key={item.id}>{item.brand_name}</option>
                        ))}
                    </select>
                </label>
                </div>
                <div className='flex gap-2'>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Discounted Price<span className='text-red-500'>*</span></p>
                    <input name='discounted_price' type='number' className='w-full p-1.5 border-2 border-gray-400 '
                    
                    value={editFormData.discounted_price} onChange={handleInputChange}/>
                </label>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Selling Price<span className='text-red-500'>*</span></p>
                    <input name='selling_price' type='number' className='w-full p-1.5 border-2 border-gray-400 ' value={editFormData.selling_price} onChange={handleInputChange}/>
                </label>
                </div>
                <div className='flex gap-2'>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Buying Price<span className='text-red-500'>*</span></p>
                    <input name='buying_price' value={editFormData.buying_price} type='number' className='w-full p-1.5 border-2 border-gray-400 ' onChange={handleInputChange}/>
                </label>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Stock Quantity<span className='text-red-500'>*</span></p>
                    <input name='stock_quantity' value={editFormData.stock_quantity} type='number' className='w-full p-1.5 border-2 border-gray-400 ' onChange={handleInputChange}/>
                </label>
                </div>
                <label>
                    <p className='mb-0.5'>Description<span className='text-red-500'>*</span></p>
                    <textarea name='description' className='w-full p-1.5 border-2 border-gray-400 resize-none ' rows={4} value={editFormData.description} onChange={handleInputChange}/>
                </label>
                <label>
                    <p className='mb-0.5'>Specifications<span className='text-red-500'>*</span></p>
                <QuillEditor ref={(el)=>(quill.current = el)}  theme='snow'              
                 value={editFormData.specification}
                 onChange={(value)=>setEditFormData({...editFormData,specification:value})}
                 className='border-2 border-gray-400'/>
                 </label>
                 
                 
                <button type='submit' className='w-full bg-tertiary p-1.5 rounded-sm text-white'>Update</button>
            </form> */}