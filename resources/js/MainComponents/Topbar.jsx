
import { FaPhone } from "react-icons/fa6";
import { MdClose, MdOutlineAlternateEmail } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";

const Topbar = () => {
  const [showServiceSubmenu, setShowServiceSubmenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const phoneNumber = '061457843';
  const emailAddress = 'kelinainternational@gmail.com';

  return (
    <div className="w-full fixed top-0 z-[110]">

    <div className='w-full  py-2 px-4 lg:px-16 flex justify-between fixed top-0 z-[110] bg-gray-100 '>
        <div className="flex gap-3">
        
        <div className='flex gap-0.5 items-center'>
           <FaPhone className='text-tertiary'/>
            <a href={`tel:${phoneNumber}`} className='text-sm font-medium'>{phoneNumber}</a>
        </div>
        <div className='lg:flex gap-0.5 items-center hidden '>
           <MdOutlineAlternateEmail className='text-tertiary'/>
            <a href={`mailto:${emailAddress}`} className='text-sm font-medium'>{emailAddress}</a>
        </div>
        </div>

        {/* <div className="sm:flex gap-4 hidden">
          <a href="https://www.sait.com.np/" className="font-bold text-gray-600">HOME</a>
          <a href="https://www.sait.com.np/about-us/" className="font-bold text-gray-600">ABOUT US</a>
          <div className="dropdown dropdown-hover">
            <div tabIndex={0} role="button" className="flex gap-1 items-center font-bold text-gray-600">SERVICE <IoChevronDownOutline/></div>
            <ul tabIndex = {0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-60 shadow">
                <li><a href="https://www.sait.com.np/services/web-development/" >Webdevelopment</a></li>
                <li><a href="https://www.sait.com.np/services/digital-marketing/" >Digital Marketing</a></li>
                <li><a href="https://www.sait.com.np/services/web-domain-hosting/" >Web & Domain Hosting</a></li>
                <li><a href="https://www.sait.com.np/services/online-travel-agencies-otas/">Online Travel Agencies(OTAs)</a></li>
                <li><a href="https://www.sait.com.np/services/surveillance-system/" >Surveillance System</a></li>
                <li><a href="https://www.sait.com.np/services/network-services/" >Network Services</a></li>
                <li><a href="https://www.sait.com.np/services/tech-support/" >Tech Support</a></li>
                <li><a href="https://www.sait.com.np/services/it-infrastructure/" >IT Infrastructure</a></li>
            </ul>
          </div>
          <a href="https://www.sait.com.np/portfolio/" target='_blank' className="font-bold text-gray-600">PORTFOLIO</a>
          <a href="https://www.sait.com.np/blogs/" className="font-bold text-gray-600">BLOGS</a>
          <a href="https://www.sait.com.np/contact-us/" className="font-bold text-gray-600">CONTACT</a>
        </div> */}

        <div className="flex">
        <a target="_blank" href="https://maps.app.goo.gl/wh33EpYbyL9yNbqg7" className='flex items-center'>
            {/* <p className="lg:text-base text-sm font-medium hidden lg:block">Follow Us: </p>
                <a target="_blank" href='https://www.facebook.com/saitsolutionpokhara' aria-label="facebook"><FaFacebook className='text-tertiary text-lg'/></a>
                <a target="_blank" href='https://www.instagram.com/saitsolutionpokhara/' aria-label="instagram"><FaInstagram className='text-tertiary text-lg' /></a>
                <a target="_blank" href='https://www.linkedin.com/company/saitsolutionnepal/' aria-label="linkedin"><FaLinkedinIn className='text-tertiary text-lg'/></a>
                <a target="_blank" href='https://www.youtube.com/@saitsolution' aria-label="youtube"><FaYoutube className='text-tertiary text-lg'/></a>

               */}

         
        <IoLocationOutline className="text-xl text-tertiary"/>
        <p className="text-sm font-medium">Find Store</p>
        </a>
        {/* <button className="ml-4 sm:hidden" onClick={()=>setShowServiceSubmenu(true)} aria-label="menu">
          <RiMenu3Fill className="text-lg text-tertiary"/>
        </button>  */}
        </div>
    </div>

    {/* <div className={`fixed top-0 left-0 w-full h-full z-[250] bg-black/30 transition-all duration-200 ${showServiceSubmenu ? 'translate-x-[0]' : 'translate-x-[-450px]'} sm:hidden`}>
      <div className="w-[70%] h-full bg-[#0F75BC] flex flex-col pt-16 text-white/90 relative">
      <button className="absolute top-6 right-6" onClick={()=>setShowServiceSubmenu(false)} aria-label="close"><MdClose className="text-xl"/></button>
      <a href="https://www.sait.com.np/" target="_blank" className="font-medium text-lg px-4 py-3 hover:text-[#F3AB40]">HOME</a>
      <a href="https://www.sait.com.np/about-us/" target="_blank" className="font-medium px-4 py-3 text-lg hover:text-[#F3AB40]">ABOUT US</a>
      <div onClick={()=>setShowMenu((prev)=>!prev)} className="font-medium text-lg px-4 py-2  hover:text-[#F3AB40] flex gap-4 items-center">SERVICE <FaChevronDown/></div>
      <ul tabIndex = {0} className={` rounded-box z-[1] w-60 overflow-hidden ${showMenu ? 'h-[220px]' : 'h-0'} transition-all duration-300`}>
                <li className="pl-8"><a href="https://www.sait.com.np/services/web-development/" target="_blank">Webdevelopment</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/digital-marketing/" target="_blank">Digital Marketing</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/web-domain-hosting/" target="_blank">Web & Domain Hosting</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/online-travel-agencies-otas/" target="_blank">Online Travel Agencies(OTAs)</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/surveillance-system/" target="_blank">Surveillance System</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/network-services/" target="_blank">Network Services</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/tech-support/" target="_blank">Tech Support</a></li>
                <li className="pl-8"><a href="https://www.sait.com.np/services/it-infrastructure/" target="_blank">IT Infrastructure</a></li>
            </ul>
      <a href="https://www.sait.com.np/portfolio/" target='_blank' className="font-medium px-4 py-3 text-lg hover:text-[#F3AB40]">PORTFOLIO</a>
      <a href="" className="font-medium px-4 py-3 text-lg hover:text-[#F3AB40]">STORE</a>
      <a href="https://www.sait.com.np/blogs/" className="font-medium px-4 py-3 text-lg hover:text-[#F3AB40]">BLOGS</a>
      <a href="https://www.sait.com.np/contact-us/" className="font-medium px-4 py-3 text-lg hover:text-[#F3AB40]">CONTACT</a>
      </div>
    </div> */}

    </div>
  )
}

export default Topbar