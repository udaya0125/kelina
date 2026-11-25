import React from 'react'
import AdminLayout from '@/Layouts/AdminLayout'
const AdminPageWrapper = ({children, pageLocation}) => {
  return (
    <AdminLayout pageLocation={pageLocation}>
        {children}
    </AdminLayout>
  )
}

export default AdminPageWrapper