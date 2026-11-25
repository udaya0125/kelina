import React, { useEffect, useState } from 'react'
import bannerone from '../../../public/banner_trial_one.jpg'
import bannertwo from '../../../public/banner_trial_two.jpg'
import bannerthree from '../../../public/banner_trial_three.jpg'
import bannerfour from '../../../public/banner_trial_four.jpg'
import axios from 'axios'
const BannerImage = () => {

  const [allBannerImages, setAllBannerImages] = useState([])

  const appUrl = import.meta.env.VITE_APP_URL

  useEffect(()=>{
    const fetchBannerImage = async() => {
      try {
        const response = await axios.get(route('bannerimage.get'))
        setAllBannerImages(response.data)

      } catch (error) {
        console.log('Error fetching Data', error)
      }
    }
    fetchBannerImage()
  },[])


  //console.log(allBannerImages)



    // const images = [
    //     {url:bannerone, alt:"slide 1"},
    //     // {url:bannertwo, alt:"slide 2" },
    //     {url:bannerfour, alt:"slide 3"}, 
    //     {url:bannerthree, alt:"slide 4"}
    // ]

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCurrentIndex((prevIndex)=>
            prevIndex === allBannerImages?.length - 1 ? 0 : prevIndex + 1
            )
        }, 4000)

        return () => clearInterval(timer)
    },[allBannerImages?.length])

    
  //   useEffect(()=>{
  //     const timer = setInterval(()=>{
  //         setCurrentIndex((prevIndex)=>
  //         prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //         )
  //     }, 4000)

  //     return () => clearInterval(timer)
  // },[images.length])


    const goToSlide = (index) => {
        setCurrentIndex(index);
      };

  return (
    <div className="relative  w-full mx-auto pt-4 flex flex-col">
    {/* Carousel container */}
    <div className="relative sm:h-[500px] h-[400px] 2xl:w-[95%] lg:w-[92%] md:w-[95%] w-full ml-auto overflow-hidden rounded-lg">
      {/* Images */}
      {allBannerImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={`${appUrl}/${image.image_path}`}
            alt={"Banner Image"}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>

    {/* Navigation dots */}
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
      {allBannerImages.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index === currentIndex ? 'bg-white' : 'bg-white/50'
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  </div>
);
}

export default BannerImage




// {images.map((image, index) => (
//   <div
//     key={index}
//     className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
//       index === currentIndex ? 'opacity-100' : 'opacity-0'
//     }`}
//   >
//     <img
//       src={image.url}
//       alt={image.alt}
//       className="w-full h-full object-cover"
//     />
//   </div>
// ))}