import React, { useContext, useEffect } from 'react'
import HomePage from '@/MainComponents/HomePage'
import MainPageWrapper from '@/MainComponents/MainPageWrapper'
import {usePage} from '@inertiajs/react'
import shopImage from '../../../../public/assets/undraw_add_to_cart.svg'
import {Head} from '@inertiajs/react'
import { MainPartContext } from '@/MainContext/MainContext'
import CompareNavigator from '@/MainComponents/CompareNavigator'
const ShopPage = ({search}) => {

    const {props} = usePage();

  return (
    <>
    <Head>
      <title>Shop | Kelina International</title>
      <meta name="description" content="Discover a wide range of products at unbeatable prices. Shop now for exclusive deals."/>
    </Head>
    <MainPageWrapper loggedUser = {props.auth.user}>
    <HomePage search={search}/>
    </MainPageWrapper>
    <CompareNavigator/>
    </>
  )

}

export default ShopPage