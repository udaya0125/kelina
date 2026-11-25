import {useContext} from 'react'
// import Sidebar from '../MainComponents/Sidebar'
import Sidebar from './Sidebar'
// import MainProducts from '../MainComponents/MainProducts'
import MainProducts from './MainProducts'
// import ProductView from '../MainComponents/ProductView'
import ProductView from './ProductView'
// import { MainPartContext } from '../Context/MainContext'
import { MainPartContext } from '@/MainContext/MainContext'
// import HomeFrontDisplay from './HomeFrontDisplay'
const HomePage = ({viewRef, search}) => {
    const {loggedUser} = useContext(MainPartContext)
    //console.log(loggedUser)
    //md:mt-[170px] mt-[130px]
  return (
    <div className='w-full bg-zinc-100 flex md:px-6 relative   border-2  lg:py-0' ref={viewRef}>
        <Sidebar/>
        <MainProducts search={search}/>
        <ProductView/>
    </div>
  )
}

export default HomePage
//bg-[#f8f8f8]

//bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]