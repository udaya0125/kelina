import React, { useContext, useState, useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import { AdminDataContext } from '@/AdminContext/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { IoClose } from "react-icons/io5";
 
const AdminBannerSection = () => {
    const {toggleSidebar} = useContext(AdminDataContext)
    const {url} = usePage();
    const [bannerImage, setBannerImage] = useState(null)

    const appUrl = import.meta.env.VITE_APP_URL;

    const [allBannerImages, setAllBannerImages] = useState([])

    const [reloadBannerTrigger ,setReloadBannerTrigger] = useState(false)

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        setBannerImage(file);
    }


    const handleBannerAdditionForm = async(e) => {
        e.preventDefault(); 

        if(!bannerImage) {
            toast.error('Please select an image to upload'); 
            return; 
        }

        const maxSizeInMB = 2; 
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if(bannerImage.size > maxSizeInBytes) {
            alert('The selected image is larger than 2 MB and is not allowed.'); 
            return;
        }

        const formData = new FormData(); 
        formData.append('image', bannerImage)

        try {
            const response = await axios.post(route('bannerimage.store'),formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            });
            setBannerImage(null)
            setReloadBannerTrigger((prev)=>!prev)
            toast.success('Banner Image Added Successfully')
        } catch (error) {
            console.log('Error Adding', error)
            toast.error('Error Adding Brand Image')
        }

    }


    useEffect(()=>{
        const fetchBannerImages = async() => {
            try {
                const response = await axios.get(route('bannerimage.get'))
                setAllBannerImages(response.data)
            } catch (error) {
                console.log('Error fetching images', error)
            }
        }
        fetchBannerImages()
    },[reloadBannerTrigger])


    const deleteBanner = async(id) => {
        try {
            const response = await axios.delete(route('bannerimage.destroy',{id}))
            setReloadBannerTrigger((prev)=>!prev)
            toast.success('Banner Deleted Successfully')
        } catch (error) {
            console.log('Error deleting banner', error)
        }
    }


    //console.log(allBannerImages)

  return (
    <AdminPageWrapper pageLocation={url}>
        <div className='w-full min-h-screen  flex flex-col relative'>
        <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-16 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300`}>
            <div className='p-4 bg-base-100 rounded-md w-[90%] mx-auto my-4'>
                <form onSubmit={handleBannerAdditionForm} className='flex gap-2'>
                <input type='file' onChange={handleFileChange} className="file-input w-full max-w-xs text-base-content"/>
                <button className='bg-saitblue px-6 rounded-md text-white'>Add</button>
                </form>
            </div>
            <div className=' p-4 grid grid-cols-2 gap-4 w-[90%] bg-base-100 mx-auto rounded-md'>
                {
                   allBannerImages.map((image)=>(
                    <div className='w-full relative' key={image.id}>
                        <button onClick={()=>deleteBanner(image.id)} className='absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-sm tooltip tooltip-left' data-tip="Delete"><IoClose/></button>
                        <img src={`${appUrl}/${image.image_path}`} className='w-full h-72'/>
                    </div>
                   ))
                }
            </div>
        </div>
        </div>
    </AdminPageWrapper>
  )
}

export default AdminBannerSection