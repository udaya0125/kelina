import React from 'react'
import MainLayout from '@/Layouts/MainLayout'
const MainPageWrapper = ({children,loggedUser}) => {
  return (
    <MainLayout loggedUser={loggedUser}>
        {children}
    </MainLayout>
  )
}

export default MainPageWrapper