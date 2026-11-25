import React, {useEffect, useContext} from 'react'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import StyledContentParser from '@/AdminComponents/StyledContentParser'
import axios from 'axios'

const MainAboutUs = () => {
    const [aboutUsData, setAboutUsData] = useState('')


    //console.log(aboutUsData)

    useEffect(()=> {
        const fetchAboutUs = async() => {
            try {
                const response = await axios.get(route('companyaboutus.get'))
                setAboutUsData(response.data.data.content)
            } catch (error) {
                console.log('Error fetching data', error)
            }
        }
        fetchAboutUs()
    })



  return (
    <>
    <Head>
      <title>About Us | Kelina International</title>
      <meta name="description" content="Explore our extensive collection of top-quality products at amazing prices. Don't miss out on exclusive offers—shop today!"/>
    </Head>
    <MainPageWrapper>
        <div className='w-full min-h-screen p-4 lg:px-16 bg-white'>
            <StyledContentParser content={aboutUsData}/>
        </div>
    </MainPageWrapper>
    </>
  )
}

export default MainAboutUs