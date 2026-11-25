import {useContext, useState, useEffect} from 'react'
import { IoMenu } from "react-icons/io5";
import { AdminDataContext } from '../AdminContext/AdminContext';
import { IoMdLogOut } from "react-icons/io";
import { Link } from '@inertiajs/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import {router} from '@inertiajs/react'
import ThemeToggle from './ThemeToggle';
import FullScreenToggle from './FullScreenToggle';
import { GoHomeFill } from "react-icons/go";

const AdminNavbar = () => {
  const {setShowResponsiveAdminSidebar,adminLogout} = useContext(AdminDataContext)

  const [isScrolled, setIsScrolled] = useState(false)
  
  
  const handleScroll = () => {
    if(window.scrollY > 0) {
      setIsScrolled(true);
    }
    else {
      setIsScrolled(false);
    }
  }; 


  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    };
  },[])
   

    const handleLogout = () => {
        router.post(route('saitadmin.logout'), {}, {
            preserveState: false, 
            preserveScroll: false, 
            onSuccess: () => {
                // Add a delay to ensure session invalidation is processed
                setTimeout(() => {
                    window.location.href = route('admin.login');
                }, 500);
            },
            onError: (error) => {
                console.error('Logout failed:', error);
            }
        });
    };

 

  const [showNotification, setShowNotification] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)




  


  return (
    <div className={`w-full bg-base-100 py-5 px-4 flex justify-between fixed top-0 z-[200] transition-all duration-300`}>
      <div className='flex gap-4 items-center'>
        <button className='sm:hidden' onClick={()=>setShowResponsiveAdminSidebar((prev)=>!prev)}>
            <IoMenu className='text-2xl text-white'/>
        </button>
       <Link href='/saitadmin'><GoHomeFill className='text-saitblue text-2xl'/></Link>
      </div>
      <div className='flex gap-3 items-center'>
        <FullScreenToggle/>
        <ThemeToggle/>
      <Link href='/saitadmin/user' className='text-lg font-semibold text-saitblue'><FaUser/></Link>
        
      <button onClick={handleLogout} className='text-red-500 font-bold tooltip tooltip-bottom' data-tip="Logout">
        <IoIosLogOut className='text-2xl'/>
      </button>
      </div>

     
    </div>

  )
}

export default AdminNavbar

{/* <IoMdLogOut className='text-3xl text-red-700'/> */}


 // const handleLogout = () => {
    //     router.post(route('saitadmin.logout'), {}, {
    //         preserveState:false, 
    //         preserveScroll:false, 
    //         onSuccess: () => window.location.href = route('admin.login'),
    //         onError: (error) => {
    //             console.error('Logout failed:', error)
    //         }
    //     })
    // }


    //   const handleLogout = async () => {
//     try {
//       // Make a POST request to the logout route
//       await axios.post(route('admin.logout'));
      
//       // Redirect to the admin login page
//       window.location.href = '/saitadmin/login';
//     } catch (error) {
//       console.error('Logout failed:', error);
//       // Handle any errors (e.g., show an error message to the user)
//     }
//   };

//   useEffect(() => {
//     // Load unread count from local storage on component mount
//     const storedUnreadCount = parseInt(localStorage.getItem('unreadCount') || '0');
//     setUnreadCount(storedUnreadCount);
// }, []);

// useEffect(() => {
//     // Save unread count to local storage whenever it changes
//     localStorage.setItem('unreadCount', unreadCount.toString());
// }, [unreadCount]);


 // const handleLogout = () => {
  //   axios.post(route('admin.logout')).then(response => {
  //     if(response.data.redirect) {
  //       window.location.href = response.data.redirect;
  //     }
  //     else {
  //       window.location.href = '/login';
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Logout error:', error)
  //     toast.error('Failed to logout. Please try again.')
  //   })
  // }