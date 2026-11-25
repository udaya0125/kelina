import React, {useEffect, useState} from 'react'
import { RiMenu3Fill } from "react-icons/ri";
import {Link} from '@inertiajs/react';
import {router} from '@inertiajs/react';
import { FaChevronDown } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
const SecondaryNavMobile = () => {

    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(true);
    const [showBrands, setShowBrands] = useState(true);
    const [categoriesWithTypes, setCategoriesWithTypes] = useState([]);
    const [allBrands, setAllBrands] = useState([]);


    useEffect(()=>{
        const fetchCategoriesWithTypes = async () => {
            try {
                const response = await axios.get(route('categorytypes.data'));
            setCategoriesWithTypes(response.data);
            } catch (error) {
                console.log('Error fetching categories with types', error);
            }
        }


        const fetchAllBrands = async () => {
            try {
                const response = await axios.get(route('productbrand.index'));
                setAllBrands(response.data);
            } catch (error) {
                console.log('Error fetching all brands', error);
            }
        }
        fetchCategoriesWithTypes();
        fetchAllBrands();
    },[])


    const clearAllFilters = () => {
        localStorage.removeItem('brandFilters');
        localStorage.removeItem('categoryFilters');
        localStorage.removeItem('typeFilters');
    }

    const handleBrandClick = (brandName) => {
        clearAllFilters();
        localStorage.setItem('brandFilters', JSON.stringify([brandName.toString()]));
        router.get('/shop');
    }   

    const handleCategoryClick = (categoryName) => {
        clearAllFilters();
        localStorage.setItem('categoryFilters', JSON.stringify([categoryName.toString()]));
        router.get('/shop');
    }

    const handleTypeClick = (typeName) => {
        clearAllFilters();
        localStorage.setItem('typeFilters', JSON.stringify([typeName.toString()]));
        router.get('/shop');
    }

  return (
    <div className='lg:hidden flex flex-col'>
        {/* <button className='flex items-center gap-1.5 p-1.5 ml-auto bg-tertiary text-white rounded-t-lg' onClick={()=>document.getElementById('my-drawer-10').checked = true}>   
            <RiMenu3Fill className='text-xl'/>
            <p className='font-medium'>Menu</p>
        </button> */}


        <div className='drawer drawer-end z-[200] bg-white'>
            <input id='my-drawer-10' type='checkbox' className='drawer-toggle' />
            <div className='drawer-side z-40 '>
                <label htmlFor='my-drawer-10' aria-label='close sidebar' className='drawer-overlay'></label>
                <ul className='menu p-4 w-[340px] min-h-full bg-white text-base-content'>
                    <button className='ml-auto' onClick={()=>document.getElementById('my-drawer-10').checked = false}>   
                        <MdClose className='text-xl'/>
                        
                    </button>
                    <button className='border-b border-gray-400 py-2 text-lg font-medium flex items-center justify-between' onClick={()=>setShowCategories(!showCategories)}>
                        Categories <FaChevronDown className={`${showCategories ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}/>
                    </button>
                    <div className={`${showCategories ? 'max-h-[500px] p-4' : 'max-h-0'} overflow-auto transition-height duration-300 bg-gray-100`}>
                        {categoriesWithTypes.map((item)=>
                        <div key={item.id} className='flex flex-col items-start'>
                        <button key={item.id} className='block w-full text-left py-2  font-medium' onClick={()=>handleCategoryClick(item.Category_name)}>
                            {item.Category_name}
                        </button>
                        
                        {item?.product_types?.map((type)=><button onClick={()=>handleTypeClick(type.type_name)} key={type.id} className='text-[0.75rem] pl-2'>{type.type_name}</button>)}
                        </div>
                    )}
                    </div>

                    <button className='border-b border-gray-400 py-2 text-lg font-medium flex items-center justify-between' onClick={()=>setShowBrands(!showBrands)}>
                        Brands
                        <FaChevronDown className={`${showBrands ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`}/>
                    </button>
                    <div className={`${showBrands ? 'max-h-[500px] p-4' : 'max-h-0'} overflow-auto transition-height duration-300 bg-gray-100 grid grid-cols-2`}>
                    {allBrands.map((brand)=>
            <div className='w-full' key={brand.id}>
            <button onClick={()=>handleBrandClick(brand.brand_name)} className='text-center  font-medium my-2 ' id={brand.id}>{brand.brand_name}</button>
                        </div>    
                    )}
                    </div>
                </ul>
            </div>
        </div>


        {/* <div className='drawer-side z-40' id='my-drawer-10'>
            <label htmlFor='my-drawer-10' aria-label='close sidebar' className='drawer-overlay'></label>
            <ul className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
                <p>Hello</p>
            </ul>
        </div> */}

    </div>
  )
}

export default SecondaryNavMobile