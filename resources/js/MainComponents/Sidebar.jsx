
 


import { useContext, useState, useEffect } from 'react';
import { MainPartContext } from '@/MainContext/MainContext';
import { FaChevronDown } from "react-icons/fa6";
import axios from 'axios';
import { useQueries } from '@tanstack/react-query';

const Sidebar = () => {
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
        const savedTypes = localStorage.getItem('typeFilters');
        if(savedCategories) {
            setCategoryFilters(JSON.parse(savedCategories))
        }
        if(savedBrands) {
            setBrandFilters(JSON.parse(savedBrands))
        }
        if(savedTypes) {
            setTypeFilters(JSON.parse(savedTypes))
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

    // Initialize expanded state for all categories when data is loaded
    useEffect(() => {
        if (categoriesQuery.data) {
            const initialExpandedState = {};
            categoriesQuery.data.forEach(category => {
                initialExpandedState[category.id] = true; // Set to true to expand by default
            });
            setExpandedCategories(initialExpandedState);
        }
    }, [categoriesQuery.data]);

    useEffect(() => {
        if(!isInitialLoad) {
        applyFilters();
        }
    }, [categoryFilters, typeFilters, brandFilters]);


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
        <div className={`lg:w-[25%] md:w-[35%] w-[60%] sm:block md:mt-14 mt-[-16px] ${showMainSideBar ? 'scale-100' : 'lg:scale-100 scale-0'} z-[50] lg:z-[0] min-h-screen fixed top-0 sm:absolute sm:flex p-2 lg:p-10 md:flex flex-col gap-2 transition-all duration-300 origin-top-left bg-white lg:bg-transparent `}>
        
            <div className='bg-white lg:p-2 rounded-md'>
                <p className='text-xl lg:text-2xl font-medium text-gray-600 mb-2'>Categories</p>
                {categoriesQuery.isLoading ? (
                    <div className="flex w-52 flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ) : (
                    <div className="flex flex-col transition-all duration-100 max-h-[210px] lg:max-h-[300px] overflow-scroll bg-white">
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
                <p className='text-xl lg:text-2xl font-medium text-gray-600 mb-2'>Brands</p>
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
        </div>
    );
};

export default Sidebar;















// import { useContext, useState,useEffect } from 'react'
// // import dummyData from '../dummyData.json'
// // import { MainPartContext } from '../Context/MainContext'
// import { MainPartContext } from '@/MainContext/MainContext';
// import { FaChevronDown } from "react-icons/fa6";
// import axios from 'axios';
// import { useQueries } from '@tanstack/react-query';


// const Sidebar = () => {

// const { setFilteredProducts, allItems, showMainSideBar,  typeFilters, setTypeFilters, brandFilters, setBrandFilters, categoryFilters, setCategoryFilters  } = useContext(MainPartContext);

// const [allCategoryData, setAllCategoryData] = useState([]);
// const [allBrandsData, setAllBrandsData] = useState([]);
// const [productTypes, setProductTypes] = useState({});
// const [expandedCategories, setExpandedCategories] = useState({});

// // const [categoryFilters, setCategoryFilters] = useState([]);
// // const [typeFilters, setTypeFilters] = useState([]);
// // const [brandFilters, setBrandFilters] = useState([]);

// const [loadingData, setLoadingData] = useState(false)
// const [loadingBrandsData, setLoadingBrandsData] = useState(false)


    


// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             setLoadingData(true)
//             const [categoriesResult, typesResult] = await Promise.all([
//                 axios.get(route('categories.index')),
//                 axios.get(route('producttype.index')) // Assuming you have this route
//             ]);
//             setAllCategoryData(categoriesResult.data);
            
            
//             // Organize product types by category
//             const typesByCategory = typesResult.data.reduce((acc, type) => {
//                 if (!acc[type.category_identifier]) {
//                     acc[type.category_identifier] = [];
//                 }
//                 acc[type.category_identifier].push(type);
//                 return acc;
//             }, {});
//             setProductTypes(typesByCategory);
//             setLoadingData(false)

//         } catch (error) {
//             console.log('Error fetching data', error);
//         }
//     };
//     fetchData();
// }, []);

// useEffect(()=>{
//     const fetchBrandsData = async() => {
//         try {
//             setLoadingBrandsData(true)
//             const response = await axios.get(route('productbrand.index')) 
//             setAllBrandsData(response.data)
//             setLoadingBrandsData(false)
//         } catch (error) {
//             console.log('Error fetching data', error)
//         }    
//     }

//     fetchBrandsData()

// },[])

// useEffect(() => {
//     applyFilters();
// }, [categoryFilters, typeFilters, brandFilters]);

// const toggleCategoryExpansion = (categoryId) => {
//     setExpandedCategories(prev => ({
//         ...prev,
//         [categoryId]: !prev[categoryId]
//     }));
// };

// const handleCategoryChange = (categoryId, checked) => {
//     setCategoryFilters(prev => 
//         checked ? [...prev, categoryId.toString()] : prev.filter(id => id !== categoryId.toString())
//     );
// };

// const handleTypeChange = (typeName, checked) => {
//     setTypeFilters(prev => 
//         checked ? [...prev, typeName] : prev.filter(name => name !== typeName)
//     );
// };

// const handleBrandChange = (brandName, checked) => {
//     console.log(brandName,checked)
//     setBrandFilters(prev => 
//         checked ? [...prev, brandName] : prev.filter(name => name !== brandName)
//     );
// };

// console.log(brandFilters)

// const applyFilters = () => {
//     let filteredProducts = allItems;

//     if (categoryFilters.length > 0) {
//         filteredProducts = filteredProducts.filter(product => 
//             categoryFilters.includes(product.product_category.toString())
//         );
//     }

//     if (typeFilters.length > 0) {
//         filteredProducts = filteredProducts.filter(product => 
//             typeFilters.includes(product.product_type)
//         );
//     }

//     if (brandFilters.length > 0) {
//         filteredProducts = filteredProducts.filter(product => 
//             brandFilters.includes(product.product_brand)
//         );
//     }

//     setFilteredProducts(filteredProducts);
// };


// const resetFilter = () => {
//     setCategoryFilters([])
//     setTypeFilters([])
//     setBrandFilters([])
// }

// return (
//     <div className={`lg:w-[25%] md:w-[25%] w-[60%] sm:block md:mt-14 mt-[-16px] ${showMainSideBar ? 'scale-100' : 'lg:scale-100 scale-0'} z-[100] sm:z-[0] min-h-screen fixed sm:absolute sm:flex p-2 lg:p-10 md:flex flex-col gap-2 transition-all duration-300 origin-top-left bg-white lg:bg-transparent`}>
//         <div className='bg-white lg:p-2 rounded-md'>
//             <p className='text-xl lg:text-2xl font-medium text-gray-600 mb-2'>Categories</p>
//             {loadingData ? 
//                 <div className="flex w-52 flex-col gap-4">
//                 <div className="skeleton h-32 w-full"></div>
//                 <div className="skeleton h-4 w-28"></div>
//                 <div className="skeleton h-4 w-full"></div>
//                 <div className="skeleton h-4 w-full"></div>
//               </div>
//             :
//             <div className="flex flex-col transition-all duration-100 max-h-[210px] lg:max-h-[300px] overflow-scroll bg-white">
//                 {allCategoryData.map((category) => (
//                     <div key={category.id} className="mb-1">
//                         <label className='flex gap-2 my-1 pl-4 text-sm lg:text-base items-center justify-between'>
//                             <div className='flex gap-2 items-center'>
//                             <input 
//                                 type='checkbox' 
//                                 className='w-4 h-4 accent-tertiary rounded-sm'
//                                 onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
//                                 checked={categoryFilters.includes(category.id.toString())}
//                             />
//                             {category.Category_name}
//                             </div>
//                             {productTypes[category.id] && (
//                                 <button onClick={() => toggleCategoryExpansion(category.id)} className="mr-2">
//                                     <FaChevronDown className={`transition-transform duration-200 text-gray-600 ${expandedCategories[category.id] ? 'rotate-180' : ''}`} />
//                                 </button>
//                             )}
//                         </label>
//                         {expandedCategories[category.id] && productTypes[category.id] && (
//                             <div className="ml-6 mt-1">
//                                 {productTypes[category.id].map((type) => (
//                                     <label key={type.id} className='flex gap-2 my-1 pl-4 text-sm lg:text-base items-center'>
//                                         <input 
//                                             type='checkbox' 
//                                             className='w-4 h-4 accent-tertiary rounded-sm'
//                                             onChange={(e) => handleTypeChange(type.type_name, e.target.checked)}
//                                             checked={typeFilters.includes(type.type_name)}
//                                         />
//                                         {type.type_name}
//                                     </label>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//             }
//         </div>

//         <div className='p-2 bg-white rounded-md mt-4 max-h-[250px] overflow-auto'>
//             <p className='text-xl lg:text-2xl font-medium text-gray-600 mb-2'>Brands</p>
//             {loadingBrandsData ? 
//                 <div className="flex w-52 flex-col gap-4">
//                 <div className="skeleton h-32 w-full"></div>
//                 <div className="skeleton h-4 w-28"></div>
//                 <div className="skeleton h-4 w-full"></div>
//                 <div className="skeleton h-4 w-full"></div>
//               </div>
//             :
//             <div className="flex flex-col transition-all duration-100 max-h-[210px] lg:max-h-[270px] overflow-scroll bg-white">
//                 {allBrandsData.map((brand) => (
//                     <label key={brand.id} className='flex gap-2 my-1 pl-4 text-sm lg:text-base items-center'>
//                         <input 
//                             type='checkbox' 
//                             className='w-4 h-4 accent-tertiary rounded-sm'
//                             onChange={(e) => handleBrandChange(brand.brand_name, e.target.checked)}
//                             checked={brandFilters.includes(brand.brand_name)}
//                         />
//                         {brand.brand_name}
//                     </label>
//                 ))}
//             </div>
//             }
//         </div>
//         <button onClick={resetFilter} className='w-full bg-tertiary rounded-md text-white py-2 mt-2'>Reset</button>
//     </div>
// );


// }


//  export default Sidebar 




 // const fetchCategories = async () => {
//     const { data } = await axios.get(route('categories.index'));
//     return data;
// };

// const fetchBrands = async () => {
//     const { data } = await axios.get(route('productbrand.index'));
//     return data;
// };

// const fetchTypes = async () => {
//     const { data } = await axios.get(route('producttype.index'));
//     return data;
// };

// const results = useQueries({
//     queries: [
//         {
//          queryKey:['categories'], queryFn:fetchCategories
//         }, 
//         {
//           queryKey:['brands'], queryFn:fetchBrands  
//         },
//         {
//           queryKey:['types'], queryFn:fetchTypes
//         }
//     ]
// })

// const [categoriesResult, brandsResult, typesResult] = results;

//     // Loading and Error Handling
//     const isLoading = results.some(result => result.isLoading);
//     const isError = results.some(result => result.isError);

//     if (isLoading) return <div>Loading data...</div>;
//     if (isError) return <div>Error fetching data!</div>;

//     // Organize product types by category when all data is fetched
//     if (typesResult.data) {
//         const typesByCategory = typesResult.data.reduce((acc, type) => {
//             if (!acc[type.category_identifier]) {
//                 acc[type.category_identifier] = [];
//             }
//             acc[type.category_identifier].push(type);
//             return acc;
//         }, {});