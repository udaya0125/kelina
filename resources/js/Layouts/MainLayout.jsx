import React from 'react'
import Topbar from '@/MainComponents/Topbar'
import Navbar from '@/MainComponents/Navbar'
import Footer from '@/MainComponents/Footer'
import MobileBottomBar from '@/MainComponents/MobileBottomBar'
const MainLayout = ({children, loggedUser}) => {
  return (
    <div className='bg-gray-100' >
        <Topbar/>
        <Navbar loggedUser={loggedUser}/>
        <main>
            {children}
        </main>
        <Footer/>
        <MobileBottomBar/>
    </div>
  )
}

export default MainLayout



// style={{
//   backgroundColor: 'transparent',
//   backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
//   backgroundRepeat: 'repeat',
//   backgroundSize: '182px',
  
//   top: 0,
//   left: 0,
//   position: 'absolute',
//   width: '100%',
//   height: '100%'
// }}