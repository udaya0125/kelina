import {useEffect, useState,useRef, useContext} from 'react'
import axios from 'axios'

import { IoClose } from "react-icons/io5";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { MdClose } from 'react-icons/md';
//import {Editor} from '@tinymce/tinymce-react'

//import { MainPartContext } from '../../Main/Context/MainContext';

import { FaCirclePlus } from 'react-icons/fa6';
import AdminViewProducts from '@/AdminComponents/AdminViewProducts';
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper';
import { usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import AddBrand from '@/AdminComponents/AddBrand';
import AddCategory from '@/AdminComponents/AddCategory';
import AddType from '@/AdminComponents/AddType';
import { AdminDataContext } from '@/AdminContext/AdminContext';
import { FaAllergies, FaPlus } from 'react-icons/fa';
import Select from 'react-select'; 


const AdminProducts = () => {
  const {url} = usePage();
    
    const {toggleSidebar} = useContext(AdminDataContext)

    const [quillvalue, setQuillvalue] = useState('')
    const [showProductAddForm, setShowProductAddForm] = useState(false)
    
     
    const [formSubmitted,setFormSubmitted] = useState(false)

    const [formData,setFormData] = useState({
        product_name:'',
        // sku:'',
        product_category:'',
        product_type:'',
        product_brand:'',
        discounted_price:null,
        buying_price:null,
        selling_price:null,
        stock_quantity:null,
        description:'',
        specification:'',
        tags:'',
        images:[]
    })



const [categoryData,setCategoryData] = useState([])
const [brandData,setBrandData] = useState([])
const [typesData,setTypesData] = useState([])
const [selectedCategory,setSelectedCategory] = useState('')
const [base64ImageStrings,setBase64ImageStrings] = useState([])
const [imagePreviews,setImagePreviews] = useState([])
const [reloadDataTrigger, setReloadDataTrigger] = useState(false)

const [tags, setTags] = useState([])
const [inputValue, setInputValue] = useState('')

const [isChecked, setIsChecked] = useState(true)


const [showBrandsAddForm, setShowBrandsAddForm] = useState(false)
const [showCategoryAddForm, setShowCategoryAddForm] = useState(false)
const [showTypesAddForm, setShowTypesAddForm] = useState(false)
const [reloadBrandsDataTrigger, setReloadBrandsDataTrigger] = useState(false)
const [reloadCategoryTrigger, setReloadCategoryTrigger] = useState(false)
const [reloadTypesDataTrigger, setReloadTypesDataTrigger] = useState(false)

const [searchTerm, setSearchTerm] = useState('')

const [productsData, setProductsData] = useState([])



useEffect(()=>{
  const fetchData = async() => {
      try {
          const response = await axios.get(route('adminproduct.index'))
          setProductsData(response.data)
      } catch (error) {
              console.log('Error fetching',error)          
      }
  }
  fetchData() 
},[reloadDataTrigger])

//console.log(productsData)

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }




    const handleNewSelectChange = (selectedOption, action) => {
      setFormData({
        ...formData,
        [action.name]: selectedOption ? selectedOption.value : '' 
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
      value: item.brandName,
      label: item.brand_name
  }));



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
                // setFormData({
                //     ...formData,
                //     product_category:categoryResponse.data[0].id,
                //     product_type:itemTypeResponse.data[0].type_name,
                //     product_brand:brandResponse.data[0].brand_name
                // })
            } catch (error) {
                console.log('Error',error)
            }
        }
        fetchData()
    },[reloadTypesDataTrigger, reloadBrandsDataTrigger, reloadCategoryTrigger])

    // console.log(categoryData)
    // console.log(brandData)
    // console.log(typesData)

    
    const handleCategoryChange = (e) =>{
        const selectedCategoryId = e.target.value
        setSelectedCategory(selectedCategoryId)
        setFormData({...formData,
        [e.target.name]:e.target.value})
    }
    
    // useEffect(() => {
    //     if (categoryData.length > 0 && selectedCategory === '') {
    //       setSelectedCategory(categoryData[0].id);
    //     }
    //   }, [categoryData, selectedCategory]);


      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };

      const handleNameChange = (e) => {
            setFormData({...formData,
            [e.target.name]:e.target.value})
      }

      const handleDiscountedPriceChange = (e) =>{
            setFormData({...formData,
            [e.target.name]:e.target.value})
      }

      const handleBuyingPriceChange = (e) => {
        setFormData({...formData, 
        [e.target.name]:e.target.value})
      }

      const handleSellingPriceChange = (e) => {
            setFormData({...formData, 
            [e.target.name]:e.target.value})
      }

      const handleStockQuantityChange = (e) => {
             setFormData({...formData, 
            [e.target.name]:e.target.value})
      }

      const handleDescriptionChange = (e) =>{
        setFormData({...formData, 
            [e.target.name]:e.target.value})
      }

     const handleTypeChange = (e) => {
        setFormData({...formData,
        [e.target.name]:e.target.value})
     }
    
     const handleBrandChange = (e) =>{
        setFormData({...formData,
        [e.target.name]:e.target.value})
     }

    //  const handleImageFileChange = (e) => {
    //     const files = e.target.files;
      
    //     if (files.length > 0) {
    //       const maxSizeInBytes = 1024 * 1024;
    //       const newImages = [];
    //       const newImagePreviews = [...imagePreviews];

    //       for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
      
    //         if (file.size > maxSizeInBytes) {
    //           alert('File size exceeds the 1mb limit. Please choose smaller files.');
    //         //   e.target.value = null;
    //           return;
    //         } else {
    //           convertToBase64(file, (base64String) => {
    //             newImages.push(base64String);
    //             newImagePreviews.push(URL.createObjectURL(file))
    //             if (newImages.length === files.length) {
    //               // All files processed
                  
    //               setFormData((prevData)=>({
    //                 ...prevData,
    //                 images: [...prevData.images,...newImages]
    //               }))
    //               setImagePreviews(newImagePreviews)
    //             }
    //           });
    //         }
    //       }
    //     }
    //   };
      
    //   const convertToBase64 = (file, callback) => {
    //     const reader = new FileReader();
      
    //     reader.onloadend = () => {
    //       const base64String = reader.result;
    //       callback(base64String);
    //     };
      
    //     reader.readAsDataURL(file);
    //   };


    const handleImageFileChange = async (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        const maxSizeInBytes = 1024 * 1024;
        const newImages = [];
        const newImagePreviews = [...imagePreviews];
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.size > maxSizeInBytes) {
            alert('File size exceeds the 1mb limit. Please choose smaller files.');
            return;
          } else {
            try {
              // Compress and resize the image
              const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1000,
                useWebWorker: true
              });
              
              // Convert to WebP
              const webpBlob = await convertToWebP(compressedFile);
              const base64String = await convertToBase64(webpBlob);
              
              newImages.push(base64String);
              newImagePreviews.push(URL.createObjectURL(webpBlob));
              
              if (newImages.length === files.length) {
                // All files processed
                setFormData((prevData) => ({
                  ...prevData,
                  images: [...prevData.images, ...newImages]
                }));
                setImagePreviews(newImagePreviews);
              }
            } catch (error) {
              console.error('Error processing image:', error);
            }
          }
        }
      }
    };
    
    const convertToWebP = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1000;
            canvas.height = 1000;
            const ctx = canvas.getContext('2d');
            
            // Calculate dimensions to crop to square
            const size = Math.min(img.width, img.height);
            const x = (img.width - size) / 2;
            const y = (img.height - size) / 2;
            
            // Draw image as square
            ctx.drawImage(img, x, y, size, size, 0, 0, 1000, 1000);
            
            // Convert to WebP
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('WebP conversion failed'));
              }
            }, 'image/webp', 0.75);
          };
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const resetForm = () => {
      setFormData({
        product_name: '',
        sku:'',
        discounted_price: null,
        buying_price: null,
        selling_price: null,
        stock_quantity: null,
        description: '',
        specification: '',
        images: [],
      });
    }


     const handleFormSubmit = async(e) => {
        e.preventDefault(); 
        const tagString = tags.join(', ')
        const formDataToSubmit = {
            ...formData, 
            specification:quillvalue, 
            tags:tagString, 
            instock:isChecked
            
        }
        //console.log(formDataToSubmit)

        try {
            const response = await axios.post(route('product.store'), formDataToSubmit)
            console.log(response.data)
            setShowProductAddForm(false)
            toast.success('Product Added Successfully')
            setReloadDataTrigger((prevdata)=>!prevdata)
            resetForm()
        } catch (error) {
            console.log('Error submitting', error) 
            toast.error('Error Adding Product')           
        }

        // try {
        //     const response = await axios.post('http://localhost:3000/addproduct',{formData:formData,email:loggedUser.email},{
        //         headers:{
        //             'Content-Type':'application/json'
        //         }               
        //     })
        //     if(response.status === 201){
        //         console.log('Data Entry Added',response.data)
        //         resetForm()
        //         navigate('/admin/viewProducts')
        //     }
        //     else (
        //         console.log('Error submitting')
        //     )
        // } catch (error) {
        //     console.log('Error submitting form:', error)            
        // }
        // console.log(formData)
     }

    //  useEffect(()=>{
    //   if(formSubmitted){
    //     resetForm()
    //     setFormSubmitted(false)
    //     window.location.reload()
    //   }
    //  },[formSubmitted])

    //  console.log(typesData)
     const handleRemoveImage = (index) => {
        setFormData((prevData) => {
          const updatedImages = [...prevData.images];
          updatedImages.splice(index, 1);
          return {
            ...prevData,
            images: updatedImages,
          };
        });
      
        setImagePreviews((prevPreviews) => {
          const updatedPreviews = [...prevPreviews];
          updatedPreviews.splice(index, 1);
          return updatedPreviews;
        });
      };


      const handleKeyDown = (e) => {
        if(e.key === 'Enter' && inputValue.trim()) {
          e.preventDefault();
          setTags((prevTags)=>[...prevTags, inputValue.trim()]);
          setInputValue('');
        }
      }

      const removeTag = (indexToRemove) => {
        console.log(indexToRemove)
        setTags((prevTags) => prevTags.filter((_, i) => i !==indexToRemove));
      };


      //console.log(isChecked)


      const handleSearchSubmit = (e) => {
        e.preventDefault();
    const filteredProducts = productsData.filter(item => 
      item.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
      setProductsData(filteredProducts);
      }

      const handleSearchReset = () => {
        setReloadDataTrigger((prev)=>!prev);
        setSearchTerm('');
      }


  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>

    <div className='w-[90%] mx-auto  flex flex-col mb-4'>
    {/* <button className='ml-auto tooltip tooltip-bottom' data-tip='Add Product' onClick={()=>setShowProductAddForm(true)}>
                <FaCirclePlus className='text-5xl text-base-content'/>
            </button> */}
<div className='flex gap-2'>
  <form className='ml-auto' onSubmit={handleSearchSubmit}>
    <input className='rounded-md p-1.5 border-2' placeholder='Search' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
    <button type='button' onClick={handleSearchReset} className='bg-tertiary p-1.5 rounded-sm ml-1 text-white'>Reset</button>
  </form>
<button className='flex items-center gap-2 py-3 px-3  font-semibold rounded-b-full  mb-4 border-2 border-saitblue bg-saitblue text-white tooltip tooltip-bottom' data-tip="Add Product" onClick={()=>setShowProductAddForm(true)}>
               
                    <FaPlus/>
                </button>
</div>
  
    </div>
     
    <AddBrand showBrandsAddForm={showBrandsAddForm} setShowBrandsAddForm={setShowBrandsAddForm} setReloadBrandsDataTrigger={setReloadBrandsDataTrigger}/>
    <AddCategory showCategoryAddForm={showCategoryAddForm} setShowCategoryAddForm={setShowCategoryAddForm} setReloadCategoryTrigger={setReloadCategoryTrigger} reloadCategoryTrigger={reloadCategoryTrigger}/>
    <AddType showTypesAddForm={showTypesAddForm} setShowTypesAddForm={setShowTypesAddForm} setReloadDataTrigger={setReloadTypesDataTrigger} reloadCategoryTrigger={reloadCategoryTrigger}/>


        <div className={`w-full h-full z-[200] backdrop-blur-sm fixed top-0 left-0 mx-auto flex flex-col items-center bg-black/10 pt-20 ${showProductAddForm ? 'scale-100' : 'scale-0'}`}>
            <div className=' max-w-[1000px] bg-base-100 text-base-content rounded-md overflow-auto relative h-[600px]'>
                <button className='absolute top-3 right-3' onClick={()=>setShowProductAddForm(false)}>
                    <MdClose className='text-lg '/>
                </button>
                <div className='bg-customTheme p-4'>
                    <p className='text-lg  text-center'>Add Product</p>
                </div>
            <form encType='multipart/form-data' className=' p-6 sm:grid  sm:grid-cols-3 gap-1 shadow-lg rounded-sm' onSubmit={handleFormSubmit}>
                
                <div className='flex gap-2'>
                <label className='sm:w-[100%]'>
                    <p className='mb-0.5 '>Name<span className='text-red-500'>*</span></p>
                    <input name='product_name' type='text' className='w-full p-1.5 border rounded-md border-gray-400  bg-base-100 text-base-content' value={formData.product_name} onChange={handleChange} required/>
                </label>
                {/* <label className='sm:w-[40%]'>
                    <p className='mb-0.5 '>SKU<span className='text-[0.80rem]'>(ItemNo.)</span><span className='text-red-500'>*</span></p>
                    <input name='sku' type='text' className='w-full p-1.5 border-2 border-gray-400 focus:outline-customTheme' value={formData.sku} onChange={handleChange} required/>
                </label> */}
                </div>
                <div>
                  <div className='flex justify-between items-center'>
                    <p className='mb-0.5'>Product Category<span className='text-red-500'>*</span></p>
                    <button type='button' onClick={(e)=>{
                      e.preventDefault();
                      setShowCategoryAddForm(true);
                    }} className='text-center pr-1 text-tertiary'><FaCirclePlus/></button>
                    </div>
                    {/* <select name='product_category' className='w-full border-2 border-gray-400 p-1.5 bg-base-100 text-base-content'
                    value={formData.product_category}
                    onChange={handleCategoryChange}>
                        <option value='' disabled>Select</option>
                        {categoryData.map((item)=>(
                            <option value={item.id} key={item.id}>{item.Category_name}</option>
                        ))}
                    </select> */}

                    <Select 
                      options={categoryOptions}
                      value={categoryOptions.find(option => option.value === formData.product_category)}
                      onChange={(selectedOption) => handleNewSelectChange(selectedOption, {name: 'product_category'})}
                      placeholder='Select Category'
                      className='w-full rounded-md'
                      isClearable={true}
                    />
                </div>
               
                <div className='w-full'>
                  <div className='flex justify-between items-center'>
                    <p className='mb-0.5'>Product Type<span className='text-red-500'>*</span></p>
                    <button type='button' 
                    onClick={(e)=>{
                      e.preventDefault();
                      setShowTypesAddForm(true)}}
                    className='text-center pr-1 text-tertiary'><FaCirclePlus/></button>
                  </div>
                {/* <select name='product_type' className='border-2 border-gray-400 w-full p-1.5 bg-base-100 text-base-content' value={formData.product_type} onChange={handleTypeChange}>
                <option value='' disabled>Select</option>
                        {typesData.map((type)=>(
                            <option value={type.type_name} key={type.id}>
                                {type.type_name}
                            </option>
                        ))}
                </select> */}
                <Select
            options={typeOptions}
            value={typeOptions.find(option => option.value === formData.product_type)}
            onChange={(selectedOption) => handleNewSelectChange(selectedOption, { name: 'product_type' })}
            placeholder="Select Type"
            className="w-full"
            isClearable={true}
        />

                </div>
              
                <div className='w-full'>
                    <div className='flex justify-between items-center'>
                    <p className='mb-0.5'>Product Brand<span className='text-red-500'>*</span></p>
                    <button type='button' onClick={
                      (e)=>{
                        e.preventDefault(); 
                        setShowBrandsAddForm(true)
                      }
                    }
                     className='text-center pr-1 text-tertiary'><FaCirclePlus/></button>
                    </div>
                    {/* <select name='product_brand' value={formData.product_brand} className='w-full border-2 border-gray-400 p-1.5 bg-base-100 text-base-content' onChange={handleBrandChange}>
                      <option value='' disabled>Select</option>
                        {brandData.map((item)=>(
                            <option value={item.brandName} key={item.id}>{item.brand_name}</option>
                        ))}
                    </select> */}
                     <Select
            options={brandOptions}
            value={brandOptions.find(option => option.value === formData.product_brand)}
            onChange={(selectedOption) => handleNewSelectChange(selectedOption, { name: 'product_brand' })}
            placeholder="Select Brand"
            className="w-full"
            isClearable={true}
        />
                </div>
               
                <div className='flex gap-2 items-end'>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Selling Price
                      {/* <span className='text-red-500'>*</span> */}
                      </p>
                    <input name='selling_price' type='number' className='w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content'
                    value={formData.selling_price} onChange={handleChange}/>
                </label>
                <label className='w-[50%]'>
                    <p className='mb-0.5 line-through text-gray-400'>Crossed Price</p>
                    <input name='discounted_price' type='number' className='w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content' value={formData.discounted_price} onChange={handleChange}/>
                </label>
                </div>
                <div className='flex gap-2 items-end'>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Buying Price</p>
                    <input name='buying_price' value={formData.buying_price} type='number' className='w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content' onChange={handleChange}/>
                </label>
                <label className='w-[50%]'>
                    <p className='mb-0.5'>Stock Quantity</p>
                    <input name='stock_quantity' value={formData.stock_quantity} type='number' className='w-full p-1.5 border rounded-md border-gray-400 bg-base-100 text-base-content' onChange={handleChange}/>
                </label>
                </div>
                <div className='col-span-3 flex gap-4 flex-col sm:flex-row'>
                <label className='sm:w-[50%] '>
                    <p className='mb-0.5'>Description</p>
                    <textarea name='description' className='w-full p-1.5 border rounded-md border-gray-400 resize-none bg-base-100 text-base-content' rows={3} value={formData.description} onChange={handleChange}/>
                </label>
                <label className='sm:w-[50%]'>
                    <p className='mb-0.5'>Specifications</p>
                    {/* <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={editorState => setEditorState(editorState)}
                    /> */}
                    <ReactQuill theme='snow' value={quillvalue} onChange={setQuillvalue}/>
                 </label>
                 </div>
                 
                 <label className='w-full col-span-3'>
                  <p>Tags</p>

                  <div className="flex flex-wrap gap-2 mb-4 w-full">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-blue-500 text-base-content px-2 py-1 rounded-md flex items-center">
                        {tag}
                        <button type="button" onClick={(e) =>{ 
                          e.preventDefault();
                          removeTag(index)}} className="ml-2 text-xs">
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
                    className="border  p-1.5 rounded-md bg-base-100 text-base-content"
                />
            </div>
                 </label>
                 {/* <label className='flex cursor-pointer select-none items-center'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
            className='sr-only'
          />
          <div className='h-5 w-14 rounded-full bg-[#E5E7EB] shadow-inner'></div>
          <div
            className={`dot shadow-switch-1 absolute left-0 -top-1 flex h-7 w-7 items-center justify-center rounded-full transition ${
              isChecked ? '!bg-white' : 'bg-white'
            }`}
          >
            <span
              className={`active h-4 w-4 rounded-full  ${
                isChecked ? 'bg-primary' : 'bg-[#E5E7EB]'
              }`}
            ></span>
          </div>
        </div>
      </label> */}
      <div className='flex-col flex gap-1'>
<p>In Stock</p>
<label class="relative inline-flex cursor-pointer items-center">
    <input id="switch-2" type="checkbox" class="peer sr-only" value={isChecked} onChange={handleCheckboxChange} defaultChecked/>
    <label for="switch-2" class="hidden"></label>
    <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
  </label>
  </div>

                  <label>

                  </label>


                 <div className='sm:col-span-3'>
                 <label>
                    <p className='pb-0.5'>Images <span className='text-gray-400'>(Choose multiple images if needed)</span></p>
                    <input id='image-input' type='file' accept='image/*'
                    multiple="multiple"
                    className='w-full'
                    onChange={handleImageFileChange}
                    />
                 </label>
                 <div className='flex gap-4 my-4'>
                 {imagePreviews && imagePreviews.map((preview,index)=>(
                    <div key={index} className='relative'>
                    <img  src={preview} className='w-14 h-14 rounded-full'/> 
                    <button type='button' className='absolute top-0 right-0 mt-[-10px] mr-[-6px]' onClick={(e)=>{
                      e.preventDefault();
                      handleRemoveImage(index)}}><IoClose className='text-red-500'/></button>                  
                    </div>
                 ))}
                 </div>
                 </div>
                <button type='submit' className='w-full col-span-3 bg-tertiary p-1.5 rounded-sm text-white'>Add</button>
            </form>
            </div>
        </div>

        <AdminViewProducts reloadDataTrigger={reloadDataTrigger} productsData={productsData}/>
    </div>
    </div>
    </AdminPageWrapper>
  )
}

export default AdminProducts


{/* <QuillEditor ref={(el)=>(quill.current = el)}  theme='snow'              
                 value={formData.specification}
                 onChange={(value)=>setFormData({...formData,specification:value})}
                 className='border-2 border-gray-400'/> */}
