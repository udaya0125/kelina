import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import React, {useContext, useEffect, useState} from 'react'
import { AdminDataContext } from '@/AdminContext/AdminContext'
import { usePage } from '@inertiajs/react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import Select from 'react-select';

const AdminBestDeals = () => {
    const appUrl = import.meta.env.VITE_APP_URL

    const {toggleSidebar} = useContext(AdminDataContext)
    const {url} = usePage();
    const [allProducts, setAllProducts] = useState([])

    const [allBestDealProduct, setAllBestDealProduct] = useState([])

    const [selectedProduct, setSelectedProduct] = useState('')
    const [reloadFeatureTrigger, setReloadFeatureTrigger] = useState(false)


    const productOptions = allProducts.map(product => ({
        value: product.id,
        label: product.product_name
    }));

    useEffect(()=>{
        const fetchProducts = async() => {
            try {
                const response = await axios.get(route('adminproduct.index'))
                setAllProducts(response.data)
            } catch (error) {
                console.log('Error fetching data', error)
            }    
        }

        const fetchFeaturedProduct = async()=>{
            try {
                const response = await axios.get(route('bestdealproduct.get'))
                setAllBestDealProduct(response.data)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
 
        fetchProducts()

        fetchFeaturedProduct()
    },[reloadFeatureTrigger])

    //console.log(allProducts);

    //console.log(allBestDealProduct)

    // const handleAddToFeatured = async(e)=>{
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(route('bestdealproduct.store'),{
    //             'product_id':selectedProduct
    //         })
    //         setSelectedProduct('')
    //         toast.success('Product Added Successfully')
    //         setReloadFeatureTrigger((prev)=>!prev)
    //     } catch (error) {
    //         console.log('Error Adding Product', error)
    //         toast.error('Error Adding Product')
    //     }
    // }

    const handleAddToFeatured = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        try {
            await axios.post(route('bestdealproduct.store'), {
                'product_id': selectedProduct.value
            });
            
            setSelectedProduct(null);
            toast.success('Product Added Successfully');
            setReloadFeatureTrigger(prev => !prev);
        } catch (error) {
            console.log('Error Adding Product', error);
            toast.error('Error Adding Product');
        }
    }

    
    const removeBestDealProduct = async(productId) => {
       
        try {
            const response = await axios.delete(route('bestdealproduct.destroy',{bestdealProduct:productId}))
            toast.success('Product Removed')
            setReloadFeatureTrigger((prev)=>!prev)
        } catch (error) {
            console.log('Error Removing', error)
            toast.error('Error Removing Product')
        }

    }

    //console.log(allBestDealProduct)


  return (
    <AdminPageWrapper pageLocation={url}>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300 lg:mt-10 `}>
        <div className='w-[90%] mx-auto flex gap-2 mb-4'>
            {/* <form className='flex gap-2' onSubmit={handleAddToFeatured}>
            <select required value={selectedProduct} onChange={(e)=>setSelectedProduct(e.target.value)} className='rounded-md bg-base-100 text-base-content border-2 border-accent'>
                <option disabled value=''>Select Product for Best Deals</option>
                {allProducts.map((item)=>
                <option value={item.id} key={item.id}>{item.product_name}</option>
                )}
            </select>
            <button type='submit' className='bg-saitblue px-6 rounded-md text-white border-2 border-accent'>Add</button>
            </form> */}
            <form className='flex gap-2 w-full' onSubmit={handleAddToFeatured}>
                            <div className='flex-grow'>
                                <Select
                                    value={selectedProduct}
                                    onChange={setSelectedProduct}
                                    options={productOptions}
                                    placeholder="Select Product for Best Deals"
                                    className='react-select-container'
                                    classNamePrefix="react-select"
                                    isSearchable={true}
                                    isClearable={true}
                                />
                            </div>
                            <button 
                                type='submit' 
                                disabled={!selectedProduct}
                                className='bg-saitblue px-6 rounded-md text-white border-2 border-accent 
                                    disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Add
                            </button>
                        </form>
        </div>
        <div className='w-[90%] mx-auto p-2 bg-base-100 text-base-content rounded-md  h-[550px] overflow-auto relative'>
        {/* <div className='w-full grid grid-cols-2 sm:grid-cols-5 gap-4 p-4'>
           {allBestDealProduct.map((item)=>
        (
            <div key={item.id} className='w-full  relative'>
                <img className='object-cover' src={`${appUrl}/${item.product.images[0].image_path}`}/>
                <p className='text-center'>{item.product.product_name}</p>
                <button onClick={()=>removeBestDealProduct(item.product_id)} className='p-1.5 rounded-sm bg-red-600 text-white absolute top-0 right-0 tooltip tooltip-left' data-tip="delete"><IoClose className='text-xl'/></button>
            </div>
        )
        )}     
        </div> */}
        <table className='w-full overflow-auto text-sm text-base-content'>
            <thead>
                <tr className='bg-accent sticky top-0'>
                    <td className='p-1.5 text-center font-medium'>Image</td>
                    <td className='p-1.5 text-center font-medium'>Name</td>
                    <td className='p-1.5 text-center font-medium'>Selling Price</td>
                    <td className='p-1.5 text-center font-medium'>Discounted Price</td>
                    <td className='p-1.5 text-center font-medium'>Remove</td>
                </tr>
            </thead>
            <tbody>
                
                    {allBestDealProduct.map(item=>
                        <tr key={item.id}>
                            <td className='flex justify-center items-center'>
                                <img className='object-cover w-20' src={`${appUrl}/${item.product.images[0].image_path}`}/>
                            </td>
                            <td className='text-center'>{item.product.product_name}</td>
                            <td className='text-center'>{item.product.selling_price ? item.product.selling_price : 'N.A'}</td>
                            <td className='text-center'>{item.product.discounted_price ? item.product.discounted_price : 'N.A'}</td>
                            <td className='text-center'><button onClick={()=>removeBestDealProduct(item.product_id)}><MdDelete className='text-lg text-red-500'/></button></td>
                        </tr>
                    )}
                
            </tbody>
        </table>
        </div>
    </div>
    </div>
    </AdminPageWrapper>
  )
}

export default AdminBestDeals