import axios from 'axios'
import  { useState, useEffect, useContext,useRef } from 'react'
import parse from 'html-react-parser'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { AdminDataContext } from '../AdminContext/AdminContext';
// import {useNavigate} from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
// import { MainPartContext } from '../../Main/Context/MainContext';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
const AdminViewProducts = ({reloadDataTrigger,productsData}) => {
    const apiUrl = import.meta.env.VITE_APP_URL
    const {editItemInfo,setEditItemInfo} = useContext(AdminDataContext)
    
    // const {loggedUser} = useContext(MainPartContext)
    // const navigate = useNavigate()

    // const [productsData,setProductsData] = useState([])
    const [productImages,setProductImages] = useState([])
    const [showDeletionDialog,setShowDeletionDialog] = useState(false)
    const [deletionItemId,setDeletionItemId] = useState(null)
    const [reloadProductsTrigger,setReloadProdutsTrigger] = useState(false)
    const [productDetail,setProductDetail] = useState({})
    const [showDetailsDialog,setShowDetailsDialog] = useState(false)
    const [deletionItemName,setDeletionItemName] = useState('')

    const [currentPage,setCurrentPage] = useState(1) 

   const startIndex = (currentPage-1)*10
   const endIndex = startIndex + 10

   const tableRef = useRef()
   const slicedData = productsData.slice(startIndex,endIndex)

   const totalPages = Math.ceil(productsData.length / 10)

    const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
        }

//console.log(editItemInfo)

    // useEffect(()=>{
    //     const fetchImageData = async() => {
    //         try {
    //             const response = await axios.get(
    //                 'http://localhost:3000/getallproductimages'     
    //             )
    //                 setProductImages(response.data)
    //         } catch (error) {
    //             console.log('Error fetching',error)
    //         }
    //     }
    //     fetchImageData()
    // },[reloadProductsTrigger])

    // console.log(productImages)

    // useEffect(()=>{
    //     const fetchData = async() => {
    //         try {
    //             const response = await axios.get(route('adminproduct.index'))
    //             setProductsData(response.data)
    //         } catch (error) {
    //                 console.log('Error fetching',error)          
    //         }
    //     }
    //     fetchData() 
    // },[reloadProductsTrigger, reloadDataTrigger])

    // console.log(productsData)

    const handleDeletion = async() => {
        if(deletionItemId){
            try {
                const response = await axios.post(route('product.destroy'),{id:deletionItemId
                })
                console.log(response.data)
                if(response.status === 200) {
                    setDeletionItemId('')
                    setShowDeletionDialog(false)
                    setReloadProdutsTrigger((prev)=>!prev)
                }
            } catch (error) {
                console.log('Error',error)
            }
        }
        else{ 
            console.log('Nothing selected to delete')
        }
    }
    // console.log(productsData)
    // console.log(productDetail)


    console.log(editItemInfo)

    console.log(productDetail)

  return (
    <div className='w-full flex flex-col relative'>
    
    <div className='p-2 bg-base-100 text-base-content w-[90%] mx-auto rounded-md  h-[550px] overflow-auto'>
    <table className='mx-auto w-full' ref={tableRef}>
            <tbody>
                <tr className='bg-accent sticky top-0 text-base-content/80'>
                <th className='p-2'>S.No</th>
                <th className='p-2'>Product Name</th>
                <th className='p-2'>Details</th>    
                {/* <th className='p-2'>Edit</th>
                <th className='p-2'>Delete</th>    */}
                <th className='p-2'>Actions</th>             
                </tr>
                
                    {productsData && slicedData.map((item,index)=>{
                        return(
                            <tr className=' text-sm cursor-pointer' key={item.id}>
                            <td className='p-2 text-center '>{startIndex+index+1}.</td>
                            <td className='p-2 text-center '>{item.product_name}</td>
                            <td className='p-2 text-center '>
                                <button onClick={()=>{setProductDetail(item);
                                setShowDetailsDialog(true)}}>
                                <FaEye className=''/>
                                </button>
                                </td>
                            
                            {/* <td className='p-2 text-center'><button onClick={()=>{setEditItemInfo(item);
                            localStorage.setItem('editItemInfo', JSON.stringify(item));
                             Inertia.visit('/saitadmin/editproduct', {
                                preserveState:true,
                             })
                            }}><MdEdit className='text-lg'/></button></td> */}
                            {/* <td className='p-2 text-center '><button onClick={()=>{setDeletionItemId(item.id);
                            setShowDeletionDialog(true);
                            setDeletionItemName(item.product_name)}}><MdDelete className='text-lg text-red-500'/></button></td> */}

                            <td className='text-center'>
                            <button onClick={()=>{setEditItemInfo(item);
                            localStorage.setItem('editItemInfo', JSON.stringify(item));
                             Inertia.visit('/saitadmin/editproduct', {
                                preserveState:true,
                             })
                            }}><MdEdit className='text-lg'/></button>
                            <button onClick={()=>{setDeletionItemId(item.id);
                            setShowDeletionDialog(true);
                            setDeletionItemName(item.product_name)}}><MdDelete className='text-lg text-red-500'/></button>
                            </td>
                            </tr>
                        )
                    })}
             </tbody>
             </table>
    </div>
             <div className={`fixed backdrop-blur-sm z-[200] w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center pl-64 ${showDeletionDialog ? 'scale-100' : 'scale-0'} `}>
                <div className='bg-base-100 border-2 border-accent text-base-content p-6 w-full max-w-[300px] rounded-md' >
                            <p className='text-lg font-semibold text-center'>Confirm Delete?</p>
                            <p className='text-sm text-center italic  mt-3'>Deleting the product would also delete all the related images</p>
                            <div className='flex gap-2 mt-6 w-full'>
                                <button className='bg-gray-400 py-1 w-[50%] rounded-md ml-auto hover:scale-90 transition duration-300' onClick={()=>setShowDeletionDialog(false)}>Cancel</button>
                                <button className='text-white bg-red-500 py-1 w-[50%] rounded-md hover:scale-90 transition duration-300' onClick={handleDeletion} >Confirm</button>
                            </div>

                </div>
             </div>
             <div className={`fixed backdrop-blur-sm w-full h-full bg-black/10 top-0 left-0 flex justify-center items-center pl-64  ${showDetailsDialog? 'scale-100' : 'scale-0'} z-[200]`}>
                <div className='w-full max-w-[500px] bg-base-100 text-base-content p-6 grid grid-cols-2 rounded-md border-2 border-accent relative h-[650px] overflow-scroll'>
                    <p className='text-xl font-semibold col-span-2 text-base-content mb-3 underline'>Product Details</p>
                    <p className=' font-semibold'> Name : <span className='font-normal'>{productDetail.product_name}</span></p>
                    <p className=' font-semibold'> SKU(Item id) : <span className='font-normal'>{productDetail.sku}</span></p>
                    <p className=' font-semibold'> Brand : <span className='font-normal'>{productDetail.product_brand}</span></p>
                    <p className=' font-semibold'>Type : <span className='font-normal'>{productDetail.product_type}</span></p>
                    <p className=' font-semibold'>Category Id : <span className='font-normal'>{productDetail.product_category}</span></p>
                    <p className=' font-semibold'>Discounted Price : <span className='font-normal'>{productDetail.discounted_price}</span></p>
                    <p className=' font-semibold'>Selling Price : <span className='font-normal'>{productDetail.selling_price}</span></p>
                    <p className=' font-semibold'>Cost Price : <span className='font-normal'>{productDetail.buying_price}</span></p>
                    <p className=' font-semibold'>Stock Quantity : <span className='font-normal'>{productDetail.stock_quantity}</span></p>
                    <div className='col-span-2'>
                        <p className='font-semibold'>
                            Description:
                        </p>
                        <p>{productDetail.description}</p>
                    </div>
                    <div className='col-span-2' >
                        <p className='font-semibold'>
                            Specification:
                        </p>
                        <div className='list-decimal' style={{ listStyleType: 'decimal' }}>{productDetail.specification && parse(productDetail.specification)}</div>
                    </div>
                    <div className='col-span-2'>
                        <p className='font-semibold'>
                            Tags:
                        </p>
                        <p>{productDetail.tags}</p>
                    </div>
                    <div className='col-span-2'>
                    <p className='font-semibold mb-1'>
                            Images:
                        </p>
                        <div className='flex gap-2'>
                            {productDetail?.images?.map((item)=>(
                                <img className='w-16 h-16 rounded-full ' key={item.id} src={`${apiUrl}/${item.image_path}`} />
                            ))
                                }
                        </div>
                    </div>


                 <button onClick={()=>setShowDetailsDialog(false)}><IoMdCloseCircleOutline className='text-xl text-red-600 absolute top-3 right-3'/></button>
                </div>
             </div>


             <div className="flex gap-4 items-center mx-auto mt-6 absolute bottom-1 sm:left-[45%] left-[25%]">
  <button
    className="p-2 bg-accent rounded-full hover:scale-90 transition duration-300"
    disabled={currentPage === 1}
    onClick={() => handlePageChange(currentPage - 1)}
  >
    <FaChevronLeft className="text-xl text-base-content" />
  </button>

  {Array.from({ length: totalPages }, (_, index) => {
    const isCurrentPage = index + 1 === currentPage;
    const isWithinRange = Math.abs(index + 1 - currentPage) <= 1;
    const isFirstOrLastPage = index === 0 || index === totalPages - 1;
    const isSecondOrSecondLastPage = index === 1 || index === totalPages - 2;

    if (totalPages <= 4 || isCurrentPage || isWithinRange || isFirstOrLastPage || isSecondOrSecondLastPage) {
      return (
        <button key={index} onClick={() => handlePageChange(index + 1)} className={`${isCurrentPage ? 'text-tertiary' : 'text-base-content'}`}>
          {index + 1}
        </button>
      );
    }

    if ((index === 2 && currentPage >= 4) || (index === totalPages - 3 && currentPage <= totalPages - 3)) {
      return <span key={index} className='text-base-content'>...</span>;
    }

    return null;
  })}

  <button
    className="p-2 bg-accent rounded-full hover:scale-90 transition duration-300"
    disabled={currentPage === totalPages}
    onClick={() => handlePageChange(currentPage + 1)}
  >
    <FaChevronRight className="text-xl text-base-content" />
  </button>
</div>  
    </div>
    
  )
}

export default AdminViewProducts