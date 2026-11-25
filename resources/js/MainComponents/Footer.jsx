import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";
import saitlogo from '../../../public/assets/sait white logo.png'

import { FaFacebook } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { LiaViber } from "react-icons/lia";



import { Link } from '@inertiajs/inertia-react';
const Footer = () => {

  const currentYear = new Date().getFullYear();  


  const svgData = `
  <svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'>
      <defs>
          <pattern id='a' patternUnits='userSpaceOnUse' width='25' height='13' patternTransform='scale(4) rotate(0)'>
              <rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/>
              <path d='M15.044 22.25a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5m2.5 0a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5m2.5 0a7.5 7.5 0 01-7.5 7.5 7.5 7.5 0 01-7.5-7.5 7.5 7.5 0 017.5-7.5 7.5 7.5 0 017.5 7.5m2.5 0a10 10 0 01-10 10 10 10 0 01-10-10 10 10 0 0110-10 10 10 0 0110 10m2.5... (truncated for brevity)
              ' stroke-width='2' stroke='%23cfcfcfff' fill='none'/>
          </pattern>
      </defs>
      <rect width='800%' height='800%' transform='translate(-20,-44)' fill='url(%23a)'/>
  </svg>
`;

const styles = {
  backgroundColor: '#ffffff',
  backgroundImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svgData)}")`,
  backgroundSize: 'cover',
  height: '100vh', // Adjust as needed
  width: '100%', // Adjust as needed
};


const svgString = "<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='25' height='13' patternTransform='scale(4) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M15.044 22.25a2.5 2.5 0 01-2.5 2.5 2.5 2.5 0 01-2.5-2.5 2.5 2.5 0 012.5-2.5 2.5 2.5 0 012.5 2.5m2.5 0a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5m2.5 0a7.5 7.5 0 01-7.5 7.5 7.5 7.5 0 01-7.5-7.5 7.5 7.5 0 017.5-7.5 7.5 7.5 0 017.5 7.5m2.5 0a10 10 0 01-10 10 10 10 0 01-10-10 10 10 0 0110-10 10 10 0 0110 10m2.5 0a12.5 12.5 0 01-12.5 12.5 12.5 12.5 0 01-12.5-12.5 12.5 12.5 0 0112.5-12.5 12.5 12.5 0 0112.5 12.5m0-9a2.5 2.5 0 00-2.363 1.688 12.5 12.5 0 011.672 3.212 12.5 12.5 0 010 .002 2.5 2.5 0 00.69.098 2.5 2.5 0 002.5-2.5 2.5 2.5 0 00-2.5-2.5zm0-2.5a5 5 0 00-4.143 2.203 12.5 12.5 0 014.053 7.795 5 5 0 00.09.002 5 5 0 005-5 5 5 0 00-5-5zm-.037-2.5a7.5 7.5 0 00-6.125 3.227 12.5 12.5 0 016.162 10.773 12.5 12.5 0 01-.041 1 7.5 7.5 0 00.04 0 7.5 7.5 0 007.5-7.5 7.5 7.5 0 00-7.5-7.5 7.5 7.5 0 00-.036 0zm.017-2.5a10 10 0 00-8.441 4.672 12.5 12.5 0 018.46 11.828 12.5 12.5 0 01-.495 3.488 10 10 0 00.496.012 10 10 0 0010-10 10 10 0 00-10-10 10 10 0 00-.02 0zm.006-2.5a12.5 12.5 0 00-10.998 6.588 12.5 12.5 0 01.29.039 12.5 12.5 0 01.005 0 12.5 12.5 0 01.29.045 12.5 12.5 0 01.003 0 12.5 12.5 0 01.58.113 12.5 12.5 0 01.004 0 12.5 12.5 0 011.123.3 12.5 12.5 0 01.02.007 12.5 12.5 0 01.006.002 12.5 12.5 0 01.277.093 12.5 12.5 0 01.8.31 12.5 12.5 0 01.032.01 12.5 12.5 0 01.033.016 12.5 12.5 0 01.492.223 12.5 12.5 0 01.016.008 12.5 12.5 0 01.004.002 12.5 12.5 0 01.523.271 12.5 12.5 0 01.006.002 12.5 12.5 0 01.254.143 12.5 12.5 0 01.004.002 12.5 12.5 0 01.252.15 12.5 12.5 0 01.004.002 12.5 12.5 0 01.248.156 12.5 12.5 0 01.004.002 12.5 12.5 0 01.244.16 12.5 12.5 0 01.004.002 12.5 12.5 0 01.24.168 12.5 12.5 0 01.004.002 12.5 12.5 0 01.236.174 12.5 12.5 0 01.004.002 12.5 12.5 0 01.233.18 12.5 12.5 0 01.004.002 12.5 12.5 0 01.228.183 12.5 12.5 0 01.004.002 12.5 12.5 0 01.223.19 12.5 12.5 0 01.004.002 12.5 12.5 0 01.218.195 12.5 12.5 0 01.032.03 12.5 12.5 0 01.185.173 12.5 12.5 0 01.004.002 12.5 12.5 0 01.209.205 12.5 12.5 0 01.004.004 12.5 12.5 0 01.205.21 12.5 12.5 0 01.002.001 12.5 12.5 0 01.2.215 12.5 12.5 0 01.003.004 12.5 12.5 0 01.193.219 12.5 12.5 0 01.004.003 12.5 12.5 0 01.19.223 12.5 12.5 0 01.004.004 12.5 12.5 0 01.363.463 12.5 12.5 0 01.004.004 12.5 12.5 0 01.172.236 12.5 12.5 0 01.004.004 12.5 12.5 0 01.166.24 12.5 12.5 0 01.002.004 12.5 12.5 0 01.162.244 12.5 12.5 0 01.002.004 12.5 12.5 0 01.156.248 12.5 12.5 0 01.03.05 12.5 12.5 0 01.251.437 12.5 12.5 0 01.016.029 12.5 12.5 0 01.01.02 12.5 12.5 0 01.263.507 12.5 12.5 0 01.002.004 12.5 12.5 0 01.125.266 12.5 12.5 0 01.002.004 12.5 12.5 0 01.118.267 12.5 12.5 0 01.002.004 12.5 12.5 0 01.113.272 12.5 12.5 0 01.002.004 12.5 12.5 0 01.105.273 12.5 12.5 0 01.002.004 12.5 12.5 0 01.098.275 12.5 12.5 0 01.002.004 12.5 12.5 0 01.092.278 12.5 12.5 0 01.002.003 12.5 12.5 0 01.086.282 12.5 12.5 0 01.002.004 12.5 12.5 0 01.078.28 12.5 12.5 0 01.002.005 12.5 12.5 0 01.072.285 12.5 12.5 0 01.002.004 12.5 12.5 0 01.067.285 12.5 12.5 0 01.023.121 12.5 12.5 0 01.035.17 12.5 12.5 0 01.086.496 12.5 12.5 0 01.014.09 12.5 12.5 0 010 .004 12.5 12.5 0 01.039.29 12.5 12.5 0 01.008.075 12.5 12.5 0 01.045.467 12.5 12.5 0 01.003.05 12.5 12.5 0 01.002.04 12.5 12.5 0 01.028.535 12.5 12.5 0 010 .02 12.5 12.5 0 010 .003 12.5 12.5 0 01.004.293 12.5 12.5 0 010 .014 12.5 12.5 0 01-.127 1.777 12.5 12.5 0 01-.1.586 12.5 12.5 0 01-.058.291 12.5 12.5 0 010 .002 12.5 12.5 0 01-.141.576 12.5 12.5 0 01-.08.287 12.5 12.5 0 01-.182.567 12.5 12.5 0 01-.207.557 12.5 12.5 0 01-.234.546 12.5 12.5 0 01-.26.536 12.5 12.5 0 01-.1.187 12.5 12.5 0 001.488.088 12.5 12.5 0 0012.5-12.5 12.5 12.5 0 00-12.5-12.5 12.5 12.5 0 00-.014 0zm-24.986 10a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 002.5 2.5 2.5 2.5 0 00.691-.098 12.5 12.5 0 011.672-3.214A2.5 2.5 0 00.044 13.25zm0-2.5a5 5 0 00-5 5 5 5 0 005 5 5 5 0 00.09-.002 12.5 12.5 0 014.054-7.795A5 5 0 00.044 10.75zm-.037-2.5a7.5 7.5 0 00-7.463 7.5 7.5 7.5 0 007.5 7.5 7.5 7.5 0 00.041 0 12.5 12.5 0 01-.041-1 12.5 12.5 0 016.162-10.773A7.5 7.5 0 00.044 8.25a7.5 7.5 0 00-.037 0zm.017-2.5a10 10 0 00-9.98 10 10 10 0 0010 10 10 10 0 00.498-.014 12.5 12.5 0 01-.498-3.486 12.5 12.5 0 018.46-11.828A10 10 0 00.045 5.75a10 10 0 00-.02 0zm-.082-2.5a12.5 12.5 0 00-12.486 12.5 12.5 12.5 0 0012.5 12.5 12.5 12.5 0 001.57-.1 12.5 12.5 0 01-1.482-5.9 12.5 12.5 0 0110.93-12.4A12.5 12.5 0 00-.044 3.25a12.5 12.5 0 00-.014 0zm12.602 3.5a2.5 2.5 0 00-2.39 1.773 12.5 12.5 0 01.82 1.327 12.5 12.5 0 011.57-.1 12.5 12.5 0 011.488.088 12.5 12.5 0 01.875-1.399 2.5 2.5 0 00-2.363-1.689zm0-2.5a5 5 0 00-4.178 2.256 12.5 12.5 0 012.608 3.344 12.5 12.5 0 011.57-.1 12.5 12.5 0 011.488.088 12.5 12.5 0 012.658-3.383 5 5 0 00-4.146-2.205zm-.037-2.5a7.5 7.5 0 00-6.15 3.266 12.5 12.5 0 014.617 4.834 12.5 12.5 0 011.57-.1 12.5 12.5 0 011.488.088 12.5 12.5 0 014.676-4.861 7.5 7.5 0 00-6.164-3.227 7.5 7.5 0 00-.037 0zm5.226 9.129a12.5 12.5 0 01.254.117 12.5 12.5 0 00-.254-.117zM12.524-.75a10 10 0 00-8.457 4.695 12.5 12.5 0 016.907 5.905 12.5 12.5 0 011.57-.1 12.5 12.5 0 011.488.088 12.5 12.5 0 016.973-5.916A10 10 0 0012.544-.75a10 10 0 00-.02 0zm5.21 11.629a12.5 12.5 0 01.253.117 12.5 12.5 0 00-.254-.117zM12.53-3.25a12.5 12.5 0 00-11.004 6.6 12.5 12.5 0 019.448 6.5 12.5 12.5 0 011.57-.1 12.5 12.5 0 011.488.088 12.5 12.5 0 019.526-6.498 12.5 12.5 0 00-11.014-6.59 12.5 12.5 0 00-.014 0zm5.203 14.129a12.5 12.5 0 01.254.117 12.5 12.5 0 00-.254-.117zM25.043.25a2.5 2.5 0 00-2.362 1.688 12.5 12.5 0 01.877 1.4 12.5 12.5 0 011.472-.088 12.5 12.5 0 01.014 0 12.5 12.5 0 012.389.23 2.5 2.5 0 00.11-.73 2.5 2.5 0 00-2.5-2.5zm0-2.5A5 5 0 0020.9-.047a12.5 12.5 0 012.659 3.385 12.5 12.5 0 011.472-.088 12.5 12.5 0 01.014 0 12.5 12.5 0 014.783.953 5 5 0 00.217-1.453 5 5 0 00-5-5zm-.036-2.5a7.5 7.5 0 00-6.125 3.227 12.5 12.5 0 014.676 4.86 12.5 12.5 0 011.472-.087 12.5 12.5 0 01.014 0 12.5 12.5 0 017.014 2.152 7.5 7.5 0 00.486-2.652 7.5 7.5 0 00-7.5-7.5 7.5 7.5 0 00-.037 0zm.017-2.5a10 10 0 00-8.441 4.672 12.5 12.5 0 016.975 5.916 12.5 12.5 0 011.472-.088 12.5 12.5 0 01.014 0 12.5 12.5 0 019.01 3.838 10 10 0 00.99-4.338 10 10 0 00-10-10 10 10 0 00-.02 0zm.006-2.5a12.5 12.5 0 00-10.998 6.59 12.5 12.5 0 019.526 6.498 12.5 12.5 0 011.472-.088 12.5 12.5 0 01.014 0 12.5 12.5 0 0110.678 6 12.5 12.5 0 001.822-6.5 12.5 12.5 0 00-12.5-12.5 12.5 12.5 0 00-.014 0zM14.69 8.75a12.5 12.5 0 00-.128.197 12.5 12.5 0 01.128-.197zm3.043 2.129a12.5 12.5 0 01.254.117 12.5 12.5 0 00-.254-.117zM.043.25a2.5 2.5 0 00-2.5 2.5 2.5 2.5 0 00.106.717A12.5 12.5 0 01-.058 3.25a12.5 12.5 0 01.014 0 12.5 12.5 0 011.57.1 12.5 12.5 0 01.881-1.41A2.5 2.5 0 00.044.25zm0-2.5a5 5 0 00-5 5 5 5 0 00.208 1.42 12.5 12.5 0 014.691-.92 12.5 12.5 0 01.014 0 12.5 12.5 0 011.57.1A12.5 12.5 0 014.19-.045 5 5 0 00.044-2.25zm-.036-2.5a7.5 7.5 0 00-7.463 7.5 7.5 7.5 0 00.469 2.605A12.5 12.5 0 01-.057 3.25a12.5 12.5 0 01.013 0 12.5 12.5 0 011.57.1 12.5 12.5 0 014.682-4.873A7.5 7.5 0 00.044-4.75a7.5 7.5 0 00-.037 0zm.017-2.5a10 10 0 00-9.98 10 10 10 0 00.96 4.275A12.5 12.5 0 01-.057 3.25a12.5 12.5 0 01.014 0 12.5 12.5 0 011.57.1 12.5 12.5 0 016.979-5.928A10 10 0 00.044-7.25a10 10 0 00-.02 0zm.006-2.5a12.5 12.5 0 00-12.486 12.5 12.5 12.5 0 001.78 6.428A12.5 12.5 0 01-.059 3.25a12.5 12.5 0 01.014 0 12.5 12.5 0 011.57.1 12.5 12.5 0 019.532-6.51A12.5 12.5 0 00.044-9.75a12.5 12.5 0 00-.014 0zM9.722 7.951a12.5 12.5 0 01.12.154 12.5 12.5 0 00-.12-.154z'  stroke-width='2' stroke='#f4f2f2ff' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-20,-44)' fill='url(#a)'/></svg>"


  const iframeCode = `  <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d644.1311007840974!2d83.97078934975123!3d28.192831156912106!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399595b2a9b505eb%3A0xdbed83ec8f7cc7ce!2sKELINA%20International!5e0!3m2!1sen!2snp!4v1742101625481!5m2!1sen!2snp"  style="border:0; height:200px; width:100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`

  return (
    <div className="w-full sm:pt-10 pt-6 pb-6 lg:px-16  flex flex-col " style={{
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svgString)}")`,
      backgroundRepeat: 'repeat'
    }} >
        <div className='w-full  grid lg:grid-cols-4 grid-cols-1  gap-8 px-2'>
        <div className='flex flex-col lg:col-span-1 col-span-1 sm:col-span-1 lg:px-0 pl-0 sm:pl-3 lg:pl-0'>
          <p className='text-xl font-bold mb-3 text-tertiary'>Kelina International</p>
          <p>Your trusted partner in security and connectivity, we specialize in advanced CCTV systems, fire alarm solutions, network devices, EPABX systems, GPRS systems, backup solutions, fire fighting equipment, and biometric machines. Empowering your safety and efficiency with cutting-edge technology.
          </p>
          <a href="https://www.facebook.com/Kelinainternational/" className='mt-2 text-lg text-tertiary' target='__blank'><FaFacebook/></a>
        </div>

        


        <div className='flex flex-col  w-full lg:items-end col-span-1 sm:col-span-1  '>
          <div>
        <p className='text-xl font-bold mb-3 text-tertiary'>Contact Information</p>
          <div>
            {/* <p className='font-bold'>Kathmandu, Nepal:</p>
            <p>+977 9801067391, +977 9801072368</p> */}
            <p className='font-bold'>Pokhara, Nepal:</p>
            <p>+977 061-457843, +977 9856032023</p>
          </div>
          <div>
            <p><span className='font-bold'>Email:</span> kelinainternational@gmail.com</p>
          </div>
          <div>
            <p className='font-bold  '>Business Hours:</p>
            <p>Sunday-Friday: 10:15 AM - 6:00 PM</p>
            <p>Saturday: Closed (SAT)</p> 
          </div>
          </div>
        </div>


        <div className='col-span-1 flex flex-col lg:items-center '>
          <div>
        <p className='text-xl font-bold mb-3 text-tertiary'>Useful Links</p>
        <div className='flex flex-col gap-1'>
          <Link href='/shop'>Shop</Link>
          <Link href='/userprofile'>Profile</Link>
          <Link href='/cart'>Cart</Link>
          <Link href='/aboutus'>About Us</Link>
          <Link href='/ourteam'>Our Team</Link>
          <Link href='/gallery'>Gallery</Link>
        </div>
        </div>
        </div>
       

        <div className='col-span-1 flex flex-col lg:items-end'>
          {/* <div>
        <p className='text-xl font-bold mb-3 text-tertiary'>Get in touch</p>
        <div className='flex flex-col gap-1 '>
          <p>Questions or feedback?</p>
          <p>We'd love to hear from you</p>
          <div className='flex gap-4 mt-12 items-center'>
          <a target="_blank" href='https://www.facebook.com/Kelinainternational/' aria-label="facebook" className='flex gap-2 items-center'><FaFacebook className=' text-2xl text-tertiary  '/><span className='text-tertiary font-medium'>Facebook</span></a>

          

          </div>
        </div>
        </div> */}
         <div dangerouslySetInnerHTML={{ __html: iframeCode }}  className='w-full'/>
        </div>


        {/* <div className='flex flex-col sm:items-center items-start col-span-2 sm:pt-2 pt-0 lg:pt-0'>
        <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8712345731806!2d83.97125527523418!3d28.211224503088417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995950c613fc82f%3A0xc0fdf8ea31ad1b62!2sSAIT%20Solution%20and%20Trade%20Concern%20%7C%20Website%20Designer%20%7C%20Digital%20Marketing%20%7C%20OTA%20Listing%20and%20Management%20%7C%20Software%20Development%20%7C!5e0!3m2!1sen!2snp!4v1727347614043!5m2!1sen!2snp"
        // width="300"
        // height="200"
        className='w-full h-[240px] '
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"
      ></iframe>
        </div> */}
        </div>
        <div className='mt-10 border-t-2 pt-3 border-white/20 p-4 md:p-0 pb-12 sm:pb-0'>
            {/* <p>Crafted By <a href='https://www.sait.com.np/' target="_blank">S.A I.T Solution</a></p> */}

            <p className='text-center'>
            ©{currentYear} Kelina International | All rights reserved | Crafted By: <a href='https://www.sait.com.np/' className='font-medium'>S.A I.T Solutions and Trade Concern</a> 
        </p>
        </div>
    </div>
  )
}

export default Footer



// {/* <div className='flex flex-col items-left w-full'>
//             {/* <p className='uppercase text-xl'>sign up for our newsletter</p>
//             <input className='bg-transparent border-2 sm:w-[60%] p-1.5 mt-2 ' placeholder='Enter Your Email'/> */}
//             <p className='text-xl'>Contact Us</p>
//             <p>For Sale Related Queries</p>
//             <p className='text-xl font-semibold'>+977 01-5713515, 01-5713583</p>
//             <div className='flex gap-2 items-center'>
//                <IoIosMail className='text-xl'/> <p>infoshift@yahoo.com</p>
//             </div>
//             <div className='flex gap-3 mt-3'>
//                 <a href='https://www.facebook.com/shifttechnologypvtltd/' target="_blank"><FaFacebookSquare className='text-2xl'/></a>
//                 <FaInstagram className='text-2xl'/>
//                 <FaXTwitter className='text-2xl'/>
//             </div>
//         </div> */}