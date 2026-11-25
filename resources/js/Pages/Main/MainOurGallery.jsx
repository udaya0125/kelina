import React from 'react'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import { Head } from '@inertiajs/react'
import PhotoGallery from '@/Components/PhotoGallery'
const MainOurGallery = ({galleryimages}) => {
    console.log(galleryimages)
    const apiUrl = import.meta.env.VITE_APP_URL
  return (
    <>
        <Head>
            <title>Gallery | Kelina International</title>
            <meta name="description" content="Explore our extensive collection of top-quality products at amazing prices. Don't miss out on exclusive offers—shop today!"/>
        </Head>
        <MainPageWrapper>
            <div className='w-full min-h-screen bg-white'>
                <div className='lg:px-16 py-8'>
                <PhotoGallery apiUrl={apiUrl} images={galleryimages}/>
                </div>
            </div>
        </MainPageWrapper>
    </>
  )
}

export default MainOurGallery