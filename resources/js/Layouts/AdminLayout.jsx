import React from 'react'
import AdminNavbar from '@/AdminComponents/AdminNavbar'
import AdminSidebar from '@/AdminComponents/AdminSidebar'

const AdminLayout = ({children, pageLocation}) => {
  return (
    <div className='bg-gradient-to-b from-accent from-35% to-accent to-35% transition-all duration-300'>
        <AdminNavbar/>
        <AdminSidebar pageLocation={pageLocation}/>
        <main>
            {children}
        </main>
        
    </div>
  )
}

export default AdminLayout

//from-[#25476a]