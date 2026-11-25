import {useContext, useState} from 'react'
// import { MainPartContext } from '../Context/MainContext'
import { MainPartContext } from '@/MainContext/MainContext';
import axios from 'axios';
// import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import MainPageWrapper from '@/MainComponents/MainPageWrapper';
import { usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

 const CheckoutPage = () => {

    const {props} = usePage();

    console.log(props.auth.user)

    // const navigate = useNavigate()
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth" 
        });
      };

    const initialErrorState = {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        specialInstruction: '',
        paymentMethod: ''
    };

    const {cart, TotalAmount,TotalQuantity,setCart,loggedUser} = useContext(MainPartContext)
    console.log(cart)
    // const [formErrors,setFormErrors] = useState(initialErrorState)
    // const [checkoutForm,setCheckoutForm] = useState({
    //     name:'',
    //     phone:'',
    //     email:'',
    //     address:'',
    //     city:'',
    //     zipCode:'',
    //     specialInstruction:'',
    //     paymentMethod:''
    // })

    const initialFormState = {
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        specialInstruction: '',
        paymentMethod: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState({});


    const [showErrorDialog,setShowErrorDialog] = useState(false)
  
    const validateForm = (formData) => {
        let errors = {};
    
        // Name validation
        if (formData.name.trim().length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        }
    
        // Phone validation
        if (formData.phone.trim().length !== 10) {
            errors.phone = 'Phone number must be 10 characters long';
        }
    
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            errors.email = 'Invalid email address';
        }
    
        // Zip code validation
        if (formData.zipCode.trim().length !== 5) {
            errors.zipCode = 'Zip code must be 5 characters long';
        }
    
        return errors;
    };
    //console.log(cart)

    
    const couponCode = sessionStorage.getItem('promoCode');
    const discountAmount = sessionStorage.getItem('discountAmount')



    // const handlePlaceOrder = async() => {
    //     console.log(checkoutForm)
    //        try {
    //         const response =await axios.post(route('order.store'),{
    //             user_id:props.auth.user.id.toString(),
    //             total_quantity:TotalQuantity,
    //             total_amount:TotalAmount,
    //             items:cart,
    //             form:checkoutForm,
    //             discount_amount:discountAmount, 
    //             coupon_code:couponCode
    //         })
            
    //             console.log('successful')
    //             setCart([])
    //             localStorage.removeItem('cart')
    //             setCheckoutForm({
    //                 name:'',
    //                 phone:'',
    //                 email:'',
    //                 address:'',
    //                 city:'',
    //                 zipCode:'',
    //                 specialInstruction:'',
    //                 paymentMethod:''
    //             })
    //             toast.success('Order placed successfully!!')
    //             setTimeout(()=>{
    //                 Inertia.visit('/')
    //             },1000)
            
    //        } catch (error) {
    //         console.log('Error placing order',error)
    //        }
          
        
    // }

    // const handleChange = (e) => {
    //     const {name, value} = e.target;
    //     setCheckoutForm(prevData=>({
    //       ...prevData,
    //       [name]: value
    //     }));

    //     setFormErrors()

    //   };

    // const handleCheckoutFormSubmit = async(e) => {
    //     e.preventDefault()
    //     const errors = validateForm(checkoutForm);
    //     if (Object.keys(errors).length === 0) {
    //         // Form is valid, submit data
    //         try {
    //             console.log('Form submitted:', checkoutForm);
    //             await handlePlaceOrder()
    //             setFormErrors(initialErrorState);
    //             setCheckoutForm({
    //                 name:'',
    //                 phone:'',
    //                 email:'',
    //                 address:'',
    //                 city:'',
    //                 zipCode:'',
    //                 specialInstruction:'',
    //                 paymentMethod:''
    //             })

    //         } catch (error) {
    //             console.log('Error placing order', error)
    //         }
    //         // Reset errors
    //     } else {
           
    //         setFormErrors(errors);
            
    //         scrollToTop()
    //         const errorMessage = Object.keys(errors)
    //         .map((key) => `${errors[key]}`)
    //         .join(', ');
    //         toast.error(errorMessage, {
    //             autoClose: 3000,
    //         })
    //     }
    // }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        // Clear the error for this field as the user types
        setFormErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            try {
                await handlePlaceOrder();
                setFormData(initialFormState);
                toast.success('Order placed successfully!!');
                setTimeout(() => Inertia.visit('/'), 1000);
            } catch (error) {
                console.error('Error placing order', error);
                toast.error('Failed to place order. Please try again.');
            }
        } else {
            const errorMessage = Object.values(errors).join(', ');
            // toast.error(errorMessage, { autoClose: 3000 });
            scrollToTop();
        }
    };

    const handlePlaceOrder = async () => {
        const response = await axios.post(route('order.store'), {
            user_id: props.auth.user.id.toString(),
            total_quantity: TotalQuantity,
            total_amount: TotalAmount,
            items: cart,
            form: formData,
            discount_amount: discountAmount,
            coupon_code: couponCode
        });
        console.log('Order placed successfully');
        setCart([]);
        localStorage.removeItem('cart');
        sessionStorage.removeItem('discountAmount');
        sessionStorage.removeItem('promoCode');
    };
    

    

    // console.log(couponCode, discountAmount) 

    //sm:mt-[180px] mt-[130px]
  return (
    <MainPageWrapper loggedUser = {props?.auth?.user}>
    <div className='w-full px-2 my-4 lg:my-0  min-h-screen flex flex-col lg:flex-row-reverse lg:items-start items-center sm:py-12 gap-4 relative  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] lg:px-16'>
        <div className='w-full lg:w-[55%] max-w-[800px] rounded-md p-6 flex flex-col gap-4 border-2 border-tertiary bg-white'>
            <h1 className='text-xl text-tertiary font-semibold underline'>Cart Detail</h1>
            <div>
            {cart.map((item,index)=>(  
                    <div key={index} className='flex w-full justify-between'>
                    <p className='p-1.5 text-center w-[25%]'>{index+1}.</p>
                    <p className='p-1.5 text-center w-[25%]'>{item.product_name}</p>
                    <p className='p-1.5 text-center w-[25%]'>Quantity {item.quantity}</p>
                    <p className='p-1.5 text-center w-[25%]'>Rs.{item.selling_price}</p>
                   </div>
            ))}
            </div>
              <div className='ml-auto'>
                <p className='text-base text-right'>Total Quantity: <span className='font-medium text-lg'>{TotalQuantity}</span></p>
                {couponCode!==null && <p className='text-base text-right'>Coupon Applied: <span className='font-medium text-lg'>{couponCode}</span></p>}
                {discountAmount!==null && <p className='text-base text-right'>Discount Amount: <span className='font-medium text-lg'>Rs. {discountAmount}</span></p>}
                <p className='text-base text-right'>Total Amount: <span className='font-medium text-lg'>Rs.{TotalAmount}</span></p>
                </div>  
        </div>
        <div className='w-full max-w-[800px] rounded-md p-6 border-2 border-tertiary bg-white'>
            <p className='text-xl text-tertiary font-semibold mb-4'>Checkout Form</p>
            {/* <form className='flex flex-col gap-2' onSubmit={handleCheckoutFormSubmit}>
                <div className='flex gap-2'>
                    <label className='w-[50%]'>
                        <p>Name</p>
                        <input name='name' type='text' className='w-full border-2 border-gray-400 p-1.5 focus:outline-tertiary' placeholder='Enter your name' required onChange={handleChange}/>
                    </label>
                    <label className='w-[50%]'>
                        <p>Phone Number</p>
                        <input name='phone' type='number' className='w-full p-1.5 border-2 border-gray-400 focus:outline-tertiary' placeholder='Enter your number' required onChange={handleChange}/>
                    </label>
                </div>
                <label>
                    <p>Email Address</p>
                    <input name='email' type='text' className='w-full p-1.5 border-2 border-gray-400 focus:outline-tertiary' placeholder='Enter your email address' required onChange={handleChange}/>
                </label>
                <div className='flex flex-col gap-2'>
                    <p className='text-lg font-medium'>Address</p>
                    <input name='address' className='w-full border-gray-400 border-2 p-1.5 focus:outline-tertiary' placeholder='Address' onChange={handleChange}/>
                    <div className='flex gap-2'>
                        <input name='zipCode' className='w-full border-gray-400 border-2 p-1.5 focus:outline-tertiary' placeholder='Zip Code' onChange={handleChange}/>
                        <input name='city' className='w-full border-gray-400 border-2 p-1.5 focus:outline-tertiary' placeholder='City' onChange={handleChange}/>
                    </div>
                </div>
                
                <label>
                    <p>Special Instruction</p>
                    <textarea name='specialInstruction' className='w-full border-2 resize-none border-gray-400 p-1.5 focus:outline-tertiary' rows={4} onChange={handleChange}/>
                </label>
                <div>
                    <p className='text-lg font-medium'>Payment Method</p>
                    <label className='flex gap-2 items-center'>
                    <input name='paymentMethod' value={'Cash on delivery'} type='radio' className='w-4 h-4 accent-tertiary focus:outline-tertiary' onChange={handleChange}/>
                    <p>Cash on delivery</p>
                    </label>
                </div>
                <button className='bg-tertiary py-1.5 text-white rounded-sm border-2 border-tertiary hover:bg-white hover:text-tertiary transition duration-300'>Place Order</button>
            </form> */}

<form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='flex gap-2'>
                <label className='w-[50%]'>
                    <p>Name</p>
                    <input
                        name='name'
                        type='text'
                        className={`w-full border-2 p-1.5 focus:outline-tertiary ${formErrors.name ? 'border-red-500' : 'border-gray-400'}`}
                        placeholder='Enter your name'
                        required
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                </label>
                <label className='w-[50%]'>
                    <p>Phone Number</p>
                    <input
                        name='phone'
                        type='tel'
                        className={`w-full p-1.5 border-2 focus:outline-tertiary ${formErrors.phone ? 'border-red-500' : 'border-gray-400'}`}
                        placeholder='Enter your number'
                        required
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                </label>
            </div>
            <label>
                <p>Email Address</p>
                <input
                    name='email'
                    type='email'
                    className={`w-full p-1.5 border-2 focus:outline-tertiary ${formErrors.email ? 'border-red-500' : 'border-gray-400'}`}
                    placeholder='Enter your email address'
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </label>
            <div className='flex flex-col gap-2'>
                <p className='text-lg font-medium'>Address</p>
                <input
                    name='address'
                    className='w-full border-gray-400 border-2 p-1.5 focus:outline-tertiary'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                />
                <div className='flex gap-2'>
                    <input
                        name='zipCode'
                        className={`w-full border-2 p-1.5 focus:outline-tertiary ${formErrors.zipCode ? 'border-red-500' : 'border-gray-400'}`}
                        placeholder='Zip Code'
                        value={formData.zipCode}
                        onChange={handleChange}
                    />
                    {formErrors.zipCode && <p className="text-red-500 text-sm">{formErrors.zipCode}</p>}
                    <input
                        name='city'
                        className='w-full border-gray-400 border-2 p-1.5 focus:outline-tertiary'
                        placeholder='City'
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <label>
                <p>Special Instruction</p>
                <textarea
                    name='specialInstruction'
                    className='w-full border-2 resize-none border-gray-400 p-1.5 focus:outline-tertiary'
                    rows={4}
                    value={formData.specialInstruction}
                    onChange={handleChange}
                />
            </label>
            <div>
                <p className='text-lg font-medium'>Payment Method</p>
                <label className='flex gap-2 items-center'>
                    <input
                        name='paymentMethod'
                        value='Cash on delivery'
                        type='radio'
                        className='w-4 h-4 accent-tertiary focus:outline-tertiary'
                        checked={formData.paymentMethod === 'Cash on delivery'}
                        onChange={handleChange}
                    />
                    <p>Cash on delivery</p>
                </label>
            </div>
            <button className='bg-tertiary py-1.5 text-white rounded-sm border-2 border-tertiary hover:bg-white hover:text-tertiary transition duration-300' type="submit">
                Place Order
            </button>
        </form>
        </div>

<div role="alert" className={`rounded border-s-4 border-red-500 bg-red-50 p-4 absolute top-0 w-full max-w-[400px] flex flex-col ${showErrorDialog ? 'block':'hidden'}`} >
  <div className="flex items-center gap-2 text-red-800">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
        clipRule="evenodd"
      />
    </svg>

    <strong className="block font-medium text-lg"> Error </strong>
  </div>
    
    {Object.keys(formErrors).map((item,index)=>{
        return(
        <p key={index} className="mt-2 text-sm text-red-700">
            {formErrors[item]}
      </p>
        )
    })}
  
</div>
    </div>
    </MainPageWrapper>
  )
}

export default CheckoutPage