
import { useContext, useState, useEffect } from 'react';
import { MainPartContext } from '@/MainContext/MainContext';
import { FaChevronDown } from "react-icons/fa6";
import axios from 'axios';
import { useQueries } from '@tanstack/react-query';
import { MdClose } from 'react-icons/md';
const MobileFilterOptions = () => {

    const { 
        setFilteredProducts, 
        allItems, 
        showMainSideBar, 
        typeFilters, 
        setTypeFilters, 
        brandFilters, 
        setBrandFilters, 
        categoryFilters, 
        setCategoryFilters 
    } = useContext(MainPartContext);

    const [expandedCategories, setExpandedCategories] = useState({});


    const [isInitialLoad, setIsInitialLoad] = useState(true)


    useEffect(()=> {
        const savedCategories = localStorage.getItem('categoryFilters'); 
        const savedBrands = localStorage.getItem('brandFilters');

        if(savedCategories) {
            setCategoryFilters(JSON.parse(savedCategories))
        }
        if(savedBrands) {
            setBrandFilters(JSON.parse(savedBrands))
        }

        setIsInitialLoad(false)

    },[])


    // Use React Query for data fetching
    const queries = useQueries({
        queries: [
            {
                queryKey: ['categories'],
                queryFn: () => axios.get(route('categories.index')).then(res => res.data),
            },
            {
                queryKey: ['productTypes'],
                queryFn: () => axios.get(route('producttype.index')).then(res => res.data),
            },
            {
                queryKey: ['brands'],
                queryFn: () => axios.get(route('productbrand.index')).then(res => res.data),
            },
        ],
    });

    const [categoriesQuery, productTypesQuery, brandsQuery] = queries;

    // Process product types data
    const productTypes = productTypesQuery.data ? productTypesQuery.data.reduce((acc, type) => {
        if (!acc[type.category_identifier]) {
            acc[type.category_identifier] = [];
        }
        acc[type.category_identifier].push(type);
        return acc;
    }, {}) : {};

    useEffect(() => {
        if(!isInitialLoad) {
        applyFilters();
        }
    }, [categoryFilters, typeFilters, brandFilters]);

    // Initialize expanded state for all categories
    useEffect(() => {
        if (categoriesQuery.data) {
            const initialExpandedState = {};
            categoriesQuery.data.forEach(category => {
                initialExpandedState[category.id] = true; // Set to true to expand by default
            });
            setExpandedCategories(initialExpandedState);
        }
    }, [categoriesQuery.data]);


    //console.log(categoryFilters)
    //console.log(brandFilters)


    const toggleCategoryExpansion = (categoryId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleCategoryChange = (categoryId, checked) => {
        // setCategoryFilters(prev => 
        //     checked ? [...prev, categoryId.toString()] : prev.filter(id => id !== categoryId.toString())
        // );
        
        setCategoryFilters(prev => {
            const newFilters = checked 
                ? [...prev, categoryId.toString()] 
                : prev.filter(id => id !== categoryId.toString());
            
            // Save to localStorage whenever state changes
            localStorage.setItem('categoryFilters', JSON.stringify(newFilters));
            return newFilters;
        });



    };




    const handleTypeChange = (typeName, checked) => {
        setTypeFilters(prev => 
            checked ? [...prev, typeName] : prev.filter(name => name !== typeName)
        );
    };

    const handleBrandChange = (brandName, checked) => {
        // setBrandFilters(prev => 
        //     checked ? [...prev, brandName] : prev.filter(name => name !== brandName)
        // );

        setBrandFilters(prev => {
            const newFilters = checked 
                ? [...prev, brandName] 
                : prev.filter(name => name !== brandName);
            
            // Save to localStorage whenever state changes
            localStorage.setItem('brandFilters', JSON.stringify(newFilters));
            return newFilters;
        });
    };

    const applyFilters = () => {
        let filteredProducts = allItems;

        if (categoryFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                categoryFilters.includes(product.product_category.toString())
            );
        }

        if (typeFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                typeFilters.includes(product.product_type)
            );
        }

        if (brandFilters.length > 0) {
            filteredProducts = filteredProducts.filter(product => 
                brandFilters.includes(product.product_brand)
            );
        }

        setFilteredProducts(filteredProducts);
    };

    const resetFilter = () => {

        localStorage.removeItem('brandFilters');
        localStorage.removeItem('categoryFilters');
        setCategoryFilters([]);
        setTypeFilters([]);
        setBrandFilters([]);
    };



  return (
    <div className="drawer drawer-end z-[200]">
        <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content">
    
  </div>
  <div className="drawer-side">

    <label htmlFor="my-drawer-5" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-white text-base-content h-full w-72 p-4 ">
    <div className='border-b pb-1 flex justify-between'>
        <p className='text-2xl font-medium'>Filters</p>
        <button onClick={()=>document.getElementById('my-drawer-5').checked = false}><MdClose className='text-2xl'/></button>
    </div>
    <div className='bg-white lg:p-2 rounded-md'>
                <p className='text-lg lg:text-2xl font-medium text-gray-600 mb-2'>Categories</p>
                {categoriesQuery.isLoading ? (
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ) : (
                    <div className="flex flex-col transition-all duration-100 max-h-[250px] lg:max-h-[300px] overflow-scroll">
                        {categoriesQuery.data?.map((category) => (
                            <div key={category.id} className="mb-1">
                                <label className='flex gap-2 my-1 pl-4 text-sm lg:text-base items-center justify-between'>
                                    <div className='flex gap-2 items-center'>
                                        <input 
                                            type='checkbox' 
                                            className='w-4 h-4 accent-tertiary rounded-sm'
                                            onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                                            checked={categoryFilters.includes(category.id.toString())}
                                        />
                                        {category.Category_name}
                                    </div>
                                    {productTypes[category.id] && (
                                        <button onClick={() => toggleCategoryExpansion(category.id)} className="mr-2" aria-label='dropdown'>
                                            <FaChevronDown className={`transition-transform duration-200 text-gray-600 ${expandedCategories[category.id] ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </label>
                                {expandedCategories[category.id] && productTypes[category.id] && (
                                    <div className="ml-6 mt-1">
                                        {productTypes[category.id].map((type) => (
                                            <label key={type.id} className='flex gap-2 my-1 pl-4 text-sm lg:text-base items-center'>
                                                <input 
                                                    type='checkbox' 
                                                    className='w-4 h-4 accent-tertiary rounded-sm'
                                                    onChange={(e) => handleTypeChange(type.type_name, e.target.checked)}
                                                    checked={typeFilters.includes(type.type_name)}
                                                />
                                                {type.type_name}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className='p-2 bg-white rounded-md mt-4 max-h-[250px]'>
                <p className='text-lg lg:text-2xl font-medium text-gray-600 mb-2'>Brands</p>
                {brandsQuery.isLoading ? (
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ) : (
                    <div className="flex flex-col transition-all duration-100 max-h-[210px] lg:max-h-[180px] overflow-scroll bg-white">
                        {brandsQuery.data?.map((brand) => (
                            <label key={brand.id} className='flex gap-2 my-1 pl-4 text-sm lg:text-base items-center'>
                                <input 
                                    type='checkbox' 
                                    className='w-4 h-4 accent-tertiary rounded-sm'
                                    onChange={(e) => handleBrandChange(brand.brand_name, e.target.checked)}
                                    checked={brandFilters.includes(brand.brand_name)}
                                />
                                {brand.brand_name}
                            </label>
                        ))}
                    </div>
                )}
            </div>
            <button onClick={resetFilter} className='w-full bg-tertiary rounded-md text-white py-2 mt-2'>Reset</button>

	 </ul>
        </div>
        </div>
  )
}

export default MobileFilterOptions