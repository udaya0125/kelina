import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedinIn } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import saitLogo from '../../../public/assets/sait white logo.png'
import backgroundlogo from '../../../public/assets/cool-background.png'


const lightModeStyle = {
  backgroundColor: '#a0d3ff', // Stronger bluish background color
  opacity: 0.9,
  backgroundImage: 'radial-gradient(#0056b3 0.5px, transparent 0.5px), radial-gradient(#0056b3 0.5px, #a0d3ff 0.5px)', // Adjusted the gradient color to a stronger blue shade
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 10px 10px',
};

export default function Guest({ children }) {

  


    return (
        <>
        <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0 bg-cover" style={lightModeStyle}>
            
            {/* <div>
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-gray-500" />
                </Link>
            </div> */}

            {/* <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
                <div className='w-full flex justify-center items-center'>
            <div className='flex flex-col mx-auto'>
              <p className='text-center mt-8 font-semibold text-xl text-customTheme'>Powered By</p>
              <a href='https://www.sait.com.np/' target="_blank" className='mx-auto'>
                <img src={saitLogo} className='w-56'/>
              </a>
              <p className='text-center font-semibold text-lg text-customTheme'>Reach Us</p>
              <div className='flex gap-1 mx-auto'>
                <a target="_blank" href='https://www.facebook.com/saitsolutionpokhara'><FaFacebook className='text-blue-600 text-lg'/></a>
                <a target="_blank" href='https://www.instagram.com/saitsolutionpokhara/'><FaInstagram className='text-red-600 text-lg' /></a>
                <a target="_blank" href='https://www.linkedin.com/company/saitsolutionnepal/'><FaLinkedinIn className='text-blue-600 text-lg'/></a>
                <a target="_blank" href='https://www.youtube.com/@saitsolution'><FaYoutube className='text-red-600 text-lg'/></a>
              </div>
            </div>
            </div>
        
            </div> */}

            <div className="w-full sm:max-w-[800px] mt-6 shadow-xl overflow-hidden sm:rounded-3xl">
                {children}
            </div>
        </div>
        </>
    );
}
