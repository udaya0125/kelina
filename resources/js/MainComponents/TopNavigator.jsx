import React, {useState, useEffect} from 'react'
import { FaChevronUp } from 'react-icons/fa'
const TopNavigator = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        const handleScroll = () => {
            const scrollTop = window.scrollY; 
            setIsVisible(scrollTop > 300);
        }
        window.addEventListener("scroll", handleScroll); 
        return () => window.removeEventListener("scroll", handleScroll);
    },[])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0, 
            behavior: "smooth",
        })
    }

  return (
    isVisible && (
        <button onClick={scrollToTop} className='p-4 bg-tertiary  text-white rounded-full fixed sm:bottom-5 bottom-[105px] lg:right-[100px] right-[40px] z-[210]'>
            <FaChevronUp/>
        </button>
    )
  )
}

export default TopNavigator