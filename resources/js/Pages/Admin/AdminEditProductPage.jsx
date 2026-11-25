import  { useContext, useState } from 'react'
import EditContent from '@/AdminComponents/EditContent'
import EditImages from '@/AdminComponents/EditImages'
import AdminPageWrapper from '@/AdminComponents/AdminPageWrapper'
import { AdminDataContext } from '@/AdminContext/AdminContext'
const AdminEditProductPage = () => {
  const [showEditContent,setShowEditContent] = useState(true)
  const {toggleSidebar} = useContext(AdminDataContext)
  return (
    <AdminPageWrapper>
    <div className='w-full min-h-screen flex flex-col relative'>
    <div className={`min-h-screen w-full  ml-auto flex justify-start items-start py-20 overflow-x-auto flex-col relative ${toggleSidebar ? 'w-[96%]' : 'sm:w-[70%] lg:w-[85%]' } transition-all duration-300`}>
      <div className='flex gap-4 mx-auto'>
          <button onClick={()=>setShowEditContent(true)} className={` px-4 py-1.5 rounded-sm  border-2 border-tertiary ${showEditContent ? 'bg-tertiary text-white' : 'text-tertiary bg-white'}`}>Edit Content</button>
          <button onClick={()=>setShowEditContent(false)} className={` px-4 py-1.5 rounded-sm  border-2 border-tertiary ${showEditContent ? 'text-tertiary bg-white' :'bg-tertiary text-white' }`}>Edit Images</button>
      </div>
      {
        showEditContent
        ?
        <EditContent/>
        :
        <EditImages/>
      }
    </div>
    </div>
    </AdminPageWrapper>
  )
}

export default AdminEditProductPage