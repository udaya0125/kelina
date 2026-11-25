
import {createContext, useCallback, useEffect, useState } from 'react'

// import {onAuthStateChanged} from 'firebase/auth'
// import {auth} from '../../Firebase/firebase'
import axios from 'axios'
import {debounce} from 'lodash'
// import {ToastContainer} from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
//import '../../../css/CustomCarousel.css'
import '../../css/CustomCarousel.css'
import { router } from '@inertiajs/react'
import { toast } from 'react-toastify'
export const MainPartContext = createContext()

const MainContext = ({children}) => {
    
    const [showInfoDialog,setShowInfoDialog] = useState(false)
    const [infoDialogDetails,setInfoDialogDetails] = useState({})
    const [loggedUser,setLoggedUser] = useState(null)
    const [allItems,setAllItems] = useState([])
    const [showMainSideBar,setShowMainSideBar] = useState(false)

    const [allUserOrders,setAllUserOrders] = useState([]) 
    
    const [comparisonProducts,setComparisonProducts] = useState([])

    const [typeFilters, setTypeFilters] = useState(()=> {
         const saved = localStorage.getItem('typeFilters'); 
         return saved ? JSON.parse(saved) : [];
    })

    const [brandFilters, setBrandFilters] = useState(()=>{
        const saved = localStorage.getItem('brandFilters'); 
        return saved ? JSON.parse(saved) : [];
    })
    
    const [categoryFilters, setCategoryFilters] = useState(()=>{
        const saved = localStorage.getItem('categoryFilters'); 
        return saved ? JSON.parse(saved) : [];
    });

    const [productLoading, setProductLoading] = useState(false) 

    const cartData = localStorage.getItem('cart')
    const initialCart = cartData ? JSON.parse(cartData) : [];
    const [cart,setCart] = useState(initialCart)

    // const [cart,setCart] = useState([])
    // console.log(cart)

    const [searchTerm , setSearchTerm] = useState(()=> localStorage.getItem('searchTerm') || '')
    const [filteredProducts,setFilteredProducts] = useState(allItems)
    const [allCategoryData,setAllCategoryData] = useState([])
    const [allBrandsData,setAllBrandsData] = useState([])
    const [sortedProducts,setSortedProducts] = useState(filteredProducts)

    const [productDataReloadTrigger, setProductDataReloadTrigger] = useState(false)

    const [promoCode, setPromoCode] = useState(()=> sessionStorage.getItem('promoCode') || '');
    const [discountAmount, setDiscountAmount] = useState(()=> parseFloat(sessionStorage.getItem('discountAmount') || '0'));
    const [error, setError] = useState('')


    const FETCH_STATE = {
        LOADING: 'loading', 
        SUCCESS: 'success', 
        ERROR: 'error'
    }

    const [fetchState, setFetchState] = useState(FETCH_STATE.LOADING)

    

    useEffect(()=>{
        const fetchData = async() => {
            try {

                setFetchState(FETCH_STATE.LOADING);
                const result = await axios.get(route('product.index'))
                setAllItems(result.data) 
                setFetchState(FETCH_STATE.SUCCESS);
            } catch (error) {
                console.log('Error',error); 
                setFetchState(FETCH_STATE.ERROR)
            }
           

        }
        fetchData()
    },[productDataReloadTrigger])



    useEffect(()=>{
        
        setFilteredProducts(allItems)
        setSortedProducts(filteredProducts)
    },[allItems, productDataReloadTrigger])

    //console.log(filteredProducts)
    
    useEffect(()=>{
        const  fetchCategoryData = async()=>{
             try {
                 const result = await axios.get(route('categories.index'))
                 setAllCategoryData(result.data)
             } catch (error) {
                 console.log('Error fetching',error)
             }
         }
         fetchCategoryData()
     },[])
    
    // console.log(allBrandsData)
 
     useEffect(()=>{
         const fetchBrandData = async()=>{
             try {
                 const result = await axios.get(route('productbrand.index'))
                 setAllBrandsData(result.data)
             } catch (error) {
                 console.log('Error fetching',error)
             }
         }
         fetchBrandData()
     },[])




    const searchProducts = (searchTerm) => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        const filtered = allItems.filter(product => {
            return Object.values(product).some(value => {
                if (typeof value === 'string' && !['description', 'specification'].includes(value)) {
                    return value.toLowerCase().includes(normalizedSearchTerm);
                }
                return false;
            });
        });
        setFilteredProducts(filtered);
    }



    // const handleSearch = (term, currentPath) => {
    //     const searchTerm = term.trim()
    //     setSearchTerm(searchTerm)
    //     localStorage.setItem('searchTerm', searchTerm)

    //     if (currentPath !== '/shop') {
    //         router.get('/shop', {}, {
    //             preserveState: true,
    //             onSuccess: () => {
    //                 // Search will be performed after navigation due to useEffect
    //                 searchProducts(searchTerm)
    //             }
    //         })
    //     } else {
    //         const url = new URL(window.location.href)
    //     if (searchTerm) {
    //         url.searchParams.set('search', searchTerm)
    //     } else {
    //         url.searchParams.delete('search')
    //     }
    //     window.history.pushState({}, '', url)
    //     searchProducts(searchTerm)
    //     }
    // }

    // useEffect(() => {
    //     if (searchTerm) {
    //         searchProducts(searchTerm)
    //     }
    // }, [searchTerm])

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search)
    //     const searchFromUrl = urlParams.get('search')
    //     if (searchFromUrl) {
    //         setSearchTerm(searchFromUrl)
    //         searchProducts(searchFromUrl)
    //     }
    // }, [])

    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search)
    //     const searchFromUrl = urlParams.get('search')
    //     const searchFromStorage = localStorage.getItem('searchTerm')
        
    //     if (searchFromUrl) {
    //         setSearchTerm(searchFromUrl)
    //         searchProducts(searchFromUrl)
    //     } else if (searchFromStorage) {
    //         setSearchTerm(searchFromStorage)
    //         searchProducts(searchFromStorage)
    //     }
    // }, [])
    
   


    // useEffect(() => {
    //     const storedUser = JSON.parse(localStorage.getItem('authAdmin'));
      
    //     if (storedUser) {
    //       setLoggedUser(storedUser);
    //     } else {
    //       const unsubscribe = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //           localStorage.setItem('authAdmin', JSON.stringify(user));
    //           setLoggedUser(user);
    //           console.log('logged in', user);
    //         } else {
    //           console.log('signed out');
    //           setLoggedUser(null);
    //         }
    //       });
      
    //       return () => unsubscribe();
    //     }
    // }, []);

    // const handleSearch = (term, currentPath) => {
    //     const searchTerm = term.trim()
    //     setSearchTerm(searchTerm)
    //     localStorage.setItem('searchTerm', searchTerm)
    
    //     if (currentPath !== '/shop') {
    //         // When not on shop page, navigate with search parameter
    //         router.visit(route('shop', { search: searchTerm }), {
    //             preserveState: true,
    //             preserveScroll: true,
    //             onSuccess: () => {
    //                 searchProducts(searchTerm)
    //             }
    //         })
    //     } else {
    //         // When already on shop page, just search
    //         searchProducts(searchTerm)
    //     }
    // }
    
    // // Initialize search from URL params
    // useEffect(() => {
    //     const urlParams = new URLSearchParams(window.location.search)
    //     const searchFromUrl = urlParams.get('search')
        
    //     if (searchFromUrl) {
    //         setSearchTerm(searchFromUrl)
    //         searchProducts(searchFromUrl)
    //     }
    //}, [])


    const handleSearch = (term, currentPath) => {
        const searchTerm = term.trim()
        setSearchTerm(searchTerm)
        localStorage.setItem('searchTerm', searchTerm)
    
        if (currentPath !== '/shop') {
            // When not on shop page, navigate with search parameter
            router.visit(route('shop', { search: searchTerm }), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    searchProducts(searchTerm)
                }
            })
        } else {
            // When already on shop page, update URL and search
            const url = new URL(window.location.href)
            if (searchTerm) {
                url.searchParams.set('search', searchTerm)
            } else {
                url.searchParams.delete('search')
            }
            window.history.pushState({}, '', url)
            searchProducts(searchTerm)
        }
    }
    
    // Initialize search from URL params
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const searchFromUrl = urlParams.get('search')
        
        if (searchFromUrl) {
            setSearchTerm(searchFromUrl)
            searchProducts(searchFromUrl)
        }
    }, [])

    useEffect(()=>{
        const savedItems = JSON.parse(localStorage.getItem('cart')) || []
        setCart(savedItems)
    }, [])

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
        validateCoupon();
    },[cart])


    

    const validateCoupon = useCallback(
        debounce(async()=>{
            if(promoCode) {
                try {
                    const response = await axios.post(route('promocode.validate'), {
                        code:promoCode, 
                        cart:cart
                    });
                    setDiscountAmount(response.data.discount_amount); 
                    sessionStorage.setItem('discountAmount', response.data.discount_amount.toString()); 
                } catch (error) {
                    setDiscountAmount(0);
                    setPromoCode(''); 
                    sessionStorage.removeItem('promoCode'); 
                    sessionStorage.removeItem('discountAmount');
                    setError('Coupon is no longer valid for current cart')
                }
            }
        },500),
        [promoCode, cart]
    );




    const AddToCart = (product) => {
        const existingItem = cart.find((item)=>item.id === product.id)
        if(existingItem){
            setCart((prevCart)=>prevCart.map((item)=>item.id === product.id ? {...item,quantity:item.quantity +1}: item ))
        }
        else {
            setCart((prevCart)=>[...prevCart, {...product, quantity:1}])
        }
    }

    const AddToCartWithQuantity = (product,quantity) => {
        const existingItem = cart.find((item)=>item.id === product.id)
        if(existingItem){
            setCart((prevCart)=>prevCart.map((item)=>item.id === product.id ? {
                ...item, quantity:item.quantity + quantity
            }:item))
        }
        else {
            setCart((prevCart)=>[...prevCart, {
                ...product, quantity:quantity
            }])
        }
    }

    const RemoveFromCart = (productId) => {
        setCart((prevCart)=>prevCart.filter((item)=>item.id!==productId))
    }

    const IncreaseQuantity = (productId) => {
        setCart((prevCart)=>prevCart.map((item)=>(item.id===productId)?{...item, quantity:item.quantity + 1}:item))
    }

    const DecreaseQuantity = (productId) => {
        setCart((prevCart)=>prevCart.map((item)=>(item.id === productId)?{...item,quantity:Math.max(1,item.quantity-1)}:item))
    }

    const SubTotal = cart.reduce((total,item)=>total+(item.quantity*item.selling_price),0)

    
    // const VatAmount = parseFloat((0.13 * SubTotal).toFixed(2))

    // const TotalAmount = SubTotal + VatAmount - discountAmount

    const TotalAmount = SubTotal  - discountAmount

    const TotalQuantity = cart.reduce((total,item)=>total+item.quantity,0)


    const handleApplyPromoCode = async () => {
        try {
            const response = await axios.post(route('promocode.apply', {
                code:promoCode, 
                // subtotal:SubTotal
                cart:cart
            }))
            setDiscountAmount(response.data.discount_amount); 
            setError('');

            // console.log(response.data)
            sessionStorage.setItem('promoCode', response.data.promoCode);
            sessionStorage.setItem('discountAmount', response.data.discount_amount.toString());

        } catch (error) {
          setDiscountAmount(0)
          setError(error.response?.data?.error || 'Failed to apply promocode')
            
          console.log('Error Promo code', error)

        }
    }

    // console.log(discountAmount)
    // console.log(TotalAmount)

    // console.log(comparisonProducts)

    useEffect(()=>{
        const savedComparisonProducts = JSON.parse(localStorage.getItem('comparisonProducts')) || []
        setComparisonProducts(savedComparisonProducts)
    },[])


    const addToComparison = (product) => {
        const isAlreadyAdded = comparisonProducts.some((item)=>item.id === product.id)

        if(isAlreadyAdded){
            toast.error('Product already in comparison')
            return;
        }

        if(comparisonProducts.length === 4){
            toast.error('You can only compare 4 products at a time')
            return;
        }

        const updatedComparisonProducts = [...comparisonProducts, product]
        setComparisonProducts(updatedComparisonProducts)
        localStorage.setItem('comparisonProducts', JSON.stringify(updatedComparisonProducts))
        toast.success('Product added to comparison')
    }


    const removeFromComparison = (productId) => {
        const updatedComparisonProducts = comparisonProducts.filter((item)=>item.id !== productId)
        setComparisonProducts(updatedComparisonProducts)
        localStorage.setItem('comparisonProducts', JSON.stringify(updatedComparisonProducts))
    }
    


    const contexts = {showInfoDialog,setShowInfoDialog,infoDialogDetails,setInfoDialogDetails,cart,setCart, AddToCart,RemoveFromCart,IncreaseQuantity,DecreaseQuantity,AddToCartWithQuantity,SubTotal,TotalAmount,TotalQuantity, searchTerm,setSearchTerm,searchProducts,filteredProducts,setFilteredProducts,loggedUser,allItems,allCategoryData,allBrandsData,showMainSideBar,setShowMainSideBar, allUserOrders, setAllUserOrders, sortedProducts, setSortedProducts, promoCode, setPromoCode, discountAmount, setDiscountAmount, error, setError, handleApplyPromoCode, setProductDataReloadTrigger, typeFilters, setTypeFilters, brandFilters, setBrandFilters, categoryFilters, setCategoryFilters, productLoading, FETCH_STATE, fetchState, handleSearch, addToComparison, removeFromComparison, comparisonProducts }

    

    return (
    <MainPartContext.Provider value={contexts}>
        {children}
    </MainPartContext.Provider>
  )
}

export default MainContext



// import {createContext, useCallback, useEffect, useState } from 'react'

// // import {onAuthStateChanged} from 'firebase/auth'
// // import {auth} from '../../Firebase/firebase'
// import axios from 'axios'
// import {debounce} from 'lodash'
// // import {ToastContainer} from 'react-toastify'
// // import 'react-toastify/dist/ReactToastify.css'
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css"
// //import '../../../css/CustomCarousel.css'
// import '../../css/CustomCarousel.css'
// import { router } from '@inertiajs/react'

// export const MainPartContext = createContext()

// const MainContext = ({children}) => {
    
//     const [showInfoDialog,setShowInfoDialog] = useState(false)
//     const [infoDialogDetails,setInfoDialogDetails] = useState({})
//     const [loggedUser,setLoggedUser] = useState(null)
//     const [allItems,setAllItems] = useState([])
//     const [showMainSideBar,setShowMainSideBar] = useState(false)

//     const [allUserOrders,setAllUserOrders] = useState([]) 
    
//     const [typeFilters, setTypeFilters] = useState([])
//     const [brandFilters, setBrandFilters] = useState(()=>{
//         const saved = localStorage.getItem('brandFilters'); 
//         return saved ? JSON.parse(saved) : [];
//     })
//     const [categoryFilters, setCategoryFilters] = useState(()=>{
//         const saved = localStorage.getItem('categoryFilters'); 
//         return saved ? JSON.parse(saved) : [];
//     });

//     const [productLoading, setProductLoading] = useState(false) 

//     const cartData = localStorage.getItem('cart')
//     const initialCart = cartData ? JSON.parse(cartData) : [];
//     const [cart,setCart] = useState(initialCart)

//     // const [cart,setCart] = useState([])
//     // console.log(cart)

//     const [searchTerm , setSearchTerm] = useState(()=> localStorage.getItem('searchTerm') || '')
//     const [filteredProducts,setFilteredProducts] = useState(allItems)
//     const [allCategoryData,setAllCategoryData] = useState([])
//     const [allBrandsData,setAllBrandsData] = useState([])
//     const [sortedProducts,setSortedProducts] = useState(filteredProducts)

//     const [productDataReloadTrigger, setProductDataReloadTrigger] = useState(false)

//     const [promoCode, setPromoCode] = useState(()=> sessionStorage.getItem('promoCode') || '');
//     const [discountAmount, setDiscountAmount] = useState(()=> parseFloat(sessionStorage.getItem('discountAmount') || '0'));
//     const [error, setError] = useState('')


//     const FETCH_STATE = {
//         LOADING: 'loading', 
//         SUCCESS: 'success', 
//         ERROR: 'error'
//     }

//     const [fetchState, setFetchState] = useState(FETCH_STATE.LOADING)

//     useEffect(()=>{
//         const fetchData = async() => {
//             try {

//                 setFetchState(FETCH_STATE.LOADING);
//                 const result = await axios.get(route('product.index'))
//                 setAllItems(result.data) 
//                 setFetchState(FETCH_STATE.SUCCESS);
//             } catch (error) {
//                 console.log('Error',error); 
//                 setFetchState(FETCH_STATE.ERROR)
//             }
           
//         }
//         fetchData()
//     },[productDataReloadTrigger])

//     useEffect(()=>{
//         setFilteredProducts(allItems)
//         setSortedProducts(filteredProducts)
//     },[allItems, productDataReloadTrigger])

//     //console.log(filteredProducts)
    
//     useEffect(()=>{
//         const  fetchCategoryData = async()=>{
//              try {
//                  const result = await axios.get(route('categories.index'))
//                  setAllCategoryData(result.data)
//              } catch (error) {
//                  console.log('Error fetching',error)
//              }
//          }
//          fetchCategoryData()
//      },[])
    
//     // console.log(allBrandsData)
 
//      useEffect(()=>{
//          const fetchBrandData = async()=>{
//              try {
//                  const result = await axios.get(route('productbrand.index'))
//                  setAllBrandsData(result.data)
//              } catch (error) {
//                  console.log('Error fetching',error)
//              }
//          }
//          fetchBrandData()
//      },[])

//     const searchProducts = (searchTerm) => {
//         const normalizedSearchTerm = searchTerm.trim().toLowerCase();
//         const filtered = allItems.filter(product => {
//             return Object.values(product).some(value => {
//                 if (typeof value === 'string' && !['description', 'specification'].includes(value)) {
//                     return value.toLowerCase().includes(normalizedSearchTerm);
//                 }
//                 return false;
//             });
//         });
//         setFilteredProducts(filtered);
//     }

//     const handleSearch = (term, currentPath) => {
//         const searchTerm = term.trim()
//         setSearchTerm(searchTerm)
//         localStorage.setItem('searchTerm', searchTerm)
    
//         if (currentPath !== '/shop') {
//             // When not on shop page, navigate with search parameter
//             router.visit(route('shop', { search: searchTerm }), {
//                 preserveState: true,
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     searchProducts(searchTerm)
//                 }
//             })
//         } else {
//             // When already on shop page, update URL and search
//             const url = new URL(window.location.href)
//             if (searchTerm) {
//                 url.searchParams.set('search', searchTerm)
//             } else {
//                 url.searchParams.delete('search')
//             }
//             window.history.pushState({}, '', url)
//             searchProducts(searchTerm)
//         }
//     }
   


//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search)
//         const searchFromUrl = urlParams.get('search')
//         console.log(searchFromUrl)
//         if (searchFromUrl) {
//             setSearchTerm(searchFromUrl)
//             searchProducts(searchFromUrl)
            
//         }
//     }, [])

//     // useEffect(() => {
//     //     const storedUser = JSON.parse(localStorage.getItem('authAdmin'));
      
//     //     if (storedUser) {
//     //       setLoggedUser(storedUser);
//     //     } else {
//     //       const unsubscribe = onAuthStateChanged(auth, (user) => {
//     //         if (user) {
//     //           localStorage.setItem('authAdmin', JSON.stringify(user));
//     //           setLoggedUser(user);
//     //           console.log('logged in', user);
//     //         } else {
//     //           console.log('signed out');
//     //           setLoggedUser(null);
//     //         }
//     //       });
      
//     //       return () => unsubscribe();
//     //     }
//     //   }, []);



//     useEffect(()=>{
//         const savedItems = JSON.parse(localStorage.getItem('cart')) || []
//         setCart(savedItems)
//     }, [])

//     useEffect(()=>{
//         localStorage.setItem('cart', JSON.stringify(cart));
//         validateCoupon();
//     },[cart])


//     const validateCoupon = useCallback(
//         debounce(async()=>{
//             if(promoCode) {
//                 try {
//                     const response = await axios.post(route('promocode.validate'), {
//                         code:promoCode, 
//                         cart:cart
//                     });
//                     setDiscountAmount(response.data.discount_amount); 
//                     sessionStorage.setItem('discountAmount', response.data.discount_amount.toString()); 
//                 } catch (error) {
//                     setDiscountAmount(0);
//                     setPromoCode(''); 
//                     sessionStorage.removeItem('promoCode'); 
//                     sessionStorage.removeItem('discountAmount');
//                     setError('Coupon is no longer valid for current cart')
//                 }
//             }
//         },500),
//         [promoCode, cart]
//     );




//     const AddToCart = (product) => {
//         const existingItem = cart.find((item)=>item.id === product.id)
//         if(existingItem){
//             setCart((prevCart)=>prevCart.map((item)=>item.id === product.id ? {...item,quantity:item.quantity +1}: item ))
//         }
//         else {
//             setCart((prevCart)=>[...prevCart, {...product, quantity:1}])
//         }
//     }

//     const AddToCartWithQuantity = (product,quantity) => {
//         const existingItem = cart.find((item)=>item.id === product.id)
//         if(existingItem){
//             setCart((prevCart)=>prevCart.map((item)=>item.id === product.id ? {
//                 ...item, quantity:item.quantity + quantity
//             }:item))
//         }
//         else {
//             setCart((prevCart)=>[...prevCart, {
//                 ...product, quantity:quantity
//             }])
//         }
//     }

//     const RemoveFromCart = (productId) => {
//         setCart((prevCart)=>prevCart.filter((item)=>item.id!==productId))
//     }

//     const IncreaseQuantity = (productId) => {
//         setCart((prevCart)=>prevCart.map((item)=>(item.id===productId)?{...item, quantity:item.quantity + 1}:item))
//     }

//     const DecreaseQuantity = (productId) => {
//         setCart((prevCart)=>prevCart.map((item)=>(item.id === productId)?{...item,quantity:Math.max(1,item.quantity-1)}:item))
//     }

//     const SubTotal = cart.reduce((total,item)=>total+(item.quantity*item.selling_price),0)

    
//     // const VatAmount = parseFloat((0.13 * SubTotal).toFixed(2))

//     // const TotalAmount = SubTotal + VatAmount - discountAmount

//     const TotalAmount = SubTotal  - discountAmount

//     const TotalQuantity = cart.reduce((total,item)=>total+item.quantity,0)


//     const handleApplyPromoCode = async () => {
//         try {
//             const response = await axios.post(route('promocode.apply', {
//                 code:promoCode, 
//                 // subtotal:SubTotal
//                 cart:cart
//             }))
//             setDiscountAmount(response.data.discount_amount); 
//             setError('');

//             // console.log(response.data)
//             sessionStorage.setItem('promoCode', response.data.promoCode);
//             sessionStorage.setItem('discountAmount', response.data.discount_amount.toString());

//         } catch (error) {
//           setDiscountAmount(0)
//           setError(error.response?.data?.error || 'Failed to apply promocode')
            
//           console.log('Error Promo code', error)

//         }
//     }

//     // console.log(discountAmount)
//     // console.log(TotalAmount)
    
//     const contexts = {showInfoDialog,setShowInfoDialog,infoDialogDetails,setInfoDialogDetails,cart,setCart, AddToCart,RemoveFromCart,IncreaseQuantity,DecreaseQuantity,AddToCartWithQuantity,SubTotal,TotalAmount,TotalQuantity, searchTerm,setSearchTerm,searchProducts,filteredProducts,setFilteredProducts,loggedUser,allItems,allCategoryData,allBrandsData,showMainSideBar,setShowMainSideBar, allUserOrders, setAllUserOrders, sortedProducts, setSortedProducts, promoCode, setPromoCode, discountAmount, setDiscountAmount, error, setError, handleApplyPromoCode, setProductDataReloadTrigger, typeFilters, setTypeFilters, brandFilters, setBrandFilters, categoryFilters, setCategoryFilters, productLoading, FETCH_STATE, fetchState, handleSearch }

    

//     return (
//     <MainPartContext.Provider value={contexts}>
//         {children}
//     </MainPartContext.Provider>
//   )
// }

// export default MainContext
