
import { createContext, useState } from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-datepicker/dist/react-datepicker.css'


export const AdminDataContext = createContext()

const AdminContext = ({children}) => {
    
    const [showResponsiveAdminSidebar, setShowResponsiveAdminSidebar] = useState(false)
    const [editItemInfo, setEditItemInfo] = useState({})

    const [toggleSidebar, setToggleSidebar] = useState(false)

    const contexts = { showResponsiveAdminSidebar, setShowResponsiveAdminSidebar, editItemInfo, setEditItemInfo, toggleSidebar, setToggleSidebar}

  return (
    <AdminDataContext.Provider value={contexts}>
        <ToastContainer autoClose={1000} position='bottom-right'/>
        {children}
    </AdminDataContext.Provider>
  )
}

export default AdminContext