import React, {useContext} from 'react'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import { usePage } from '@inertiajs/react'
import { AdminDataContext } from '@/AdminContext/AdminContext'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import parse from 'html-react-parser' 
import StyledContentParser from '@/AdminComponents/StyledContentParser'


const AboutUs = () => {
    const {toggleSidebar} = useContext(AdminDataContext)
    const {url} = usePage();
    const [quillValue, setQuillValue]  = useState('')
    const [aboutUs, setAboutUs] = useState('')
    const [reloadDataTrigger, setReloadDataTrigger] = useState(false)




    useEffect(()=>{
        const fetchAboutUs = async() => {
            try {
                const response = await axios.get(route('companyaboutus.get'))
                setAboutUs(response.data.data)
                setQuillValue(response.data.data.content)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }

        fetchAboutUs()

    },[reloadDataTrigger])

    // console.log(aboutUs)

    // console.log(quillValue)

    const handleFormSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route('companyaboutus.store'),{content: quillValue})
            setQuillValue('')
            toast.success('AboutUs Data Submitted')

            setReloadDataTrigger((prev)=>!prev)
        } catch (error) {
            toast.error('Error Submitting AboutUs Data')
            console.log('Error')
        }
    }


  return (
    <AdminPageWrapper pageLocation={url}>
        <div className='w-full min-h-screen flex flex-col relative'>
        <div className={`min-h-screen w-full ml-auto flex justify-start items-start py-20 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]'} transition-all duration-300 px-10`}>

            <p className='text-2xl font-medium mb-4 text-base-content'>AboutUs Section</p>

            <form onSubmit={handleFormSubmit} className='w-full flex flex-col gap-4'>
            <ReactQuill theme='snow' value={quillValue} onChange={setQuillValue} className='bg-white w-full'/>
            <button className='bg-tertiary py-1.5 rounded-sm text-white'>Submit</button>
            </form>

            {/* {parse(quillValue)} */}

                <StyledContentParser content={quillValue}/>

        </div>
        </div>
    </AdminPageWrapper>
  )
}

export default AboutUs