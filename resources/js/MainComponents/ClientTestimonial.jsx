// import React, {useState} from 'react'
// import { FaChevronLeft } from 'react-icons/fa';
// import { FaChevronRight } from 'react-icons/fa';

// const ClientTestimonial = () => {

//     const [currentIndex, setCurrentIndex] = useState(0);
// const [screenWidth, setScreenWidth] = useState(window.innerWidth);


// const getVisibleProducts = () => {
//     return screenWidth >= 1024 ? 3 : 1;
//   };

//   const nextSlide = () => {
//     const visibleProducts = getVisibleProducts();
//     if (currentIndex < testimonials.length - visibleProducts) {
//       setCurrentIndex(currentIndex + 1);
//     } else {
//       setCurrentIndex(0);
//     }
//   };

//   const prevSlide = () => {
//     const visibleProducts = getVisibleProducts();
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     } else {
//       setCurrentIndex(testimonials.length - visibleProducts);
//     }
//   };



// const testimonials = [
//   {
//       id: 1,
//       name: "Suman Thapa",
//       title: "Founder",
//       review: "The CCTV cameras from this company have transformed our security. The quality is outstanding, and the installation was seamless!"
//   },
//   {
//       id: 2,
//       name: "Anjali Sharma",
//       title: "Operations Manager",
//       review: "We have seen a significant reduction in incidents since installing these cameras. Highly recommend for any business looking to enhance security."
//   },
//   {
//       id: 3,
//       name: "Ramesh Gurung",
//       title: "Homeowner",
//       review: "I feel much safer knowing I can monitor my home remotely. The image quality is excellent, and the app is user-friendly."
//   },
//   {
//       id: 4,
//       name: "Priya Karki",
//       title: "IT Specialist",
//       review: "The integration with our existing systems was surprisingly easy. Great product and fantastic support from the team!"
//   },
//   {
//       id: 5,
//       name: "Bikram Joshi",
//       title: "Marketing Director",
//       review: "These cameras provide peace of mind. The clarity of the footage is impressive, and I love the mobile access feature."
//   }
// ];


//   return (
//     (
//         <div className="relative w-full  bg-white p-4 rounded-md mb-8">
//           {/* Carousel container */}
          
//           <div>
//             <div className='w-full flex justify-between items-center border-b-2 pb-2 '>
//                 <p className='text-2xl font-medium relative before:border-b-4 before:border-tertiary before:w-[75px] before:absolute before:bottom-0 before:mb-[-9px]'>What Our Clients Say</p>
//                 <div className='flex gap-2'>
//                     <button aria-label='left' onClick={prevSlide}><FaChevronLeft className='text-lg'/></button>
//                     <button aria-label='right' onClick={nextSlide}><FaChevronRight className='text-lg'/></button>
//                 </div>
//             </div>
//           <div className="overflow-hidden w-full">
//             <div
//               className="flex transition-transform duration-300 ease-in-out"
//               style={{
//                 transform: `translateX(-${(currentIndex * 100) / getVisibleProducts()}%)`,
//               }}
//             >
    
              
    
//     {
//       testimonials.map((item) =>{
//       return(
       
//        <div key={item.id} //className=' rounded-md  relative   bg-white py-4 overflow-hidden'
//          className={`flex-none w-full lg:w-1/3 px-2 py-6 group cursor-pointer  mt-4 rounded-md`}>
            
//             <div className='p-4 bg-gray-100 h-full rounded-md'>
//                 <div className='flex gap-2 items-center'>
//                     <img src='https://avatar.iran.liara.run/public/34' className='w-16' alt='avatar'/>
//                     <div>
//                         <p className='font-medium'>{item.name}</p>
//                         <p className='text-sm'>{item.title}</p>
//                     </div>
//                 </div>
//                 <p className='text-sm lg:mt-8 mt-4'>{item.review}</p>
//             </div>
            
//         </div>
//       )
//     }
//       ) 
//       }
    
//             </div>
//           </div>
    
//           </div>
    
          
//         </div>
//       )
//   )
// }

// export default ClientTestimonial




import React, { useState, useEffect } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ClientTestimonial = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const testimonials = [
    {
      id: 1,
      name: "Suman Thapa",
      title: "Founder",
      review: "The CCTV cameras from this company have transformed our security. The quality is outstanding, and the installation was seamless!"
    },
    {
      id: 2,
      name: "Anjali Sharma",
      title: "Operations Manager",
      review: "We have seen a significant reduction in incidents since installing these cameras. Highly recommend for any business looking to enhance security."
    },
    {
      id: 3,
      name: "Ramesh Gurung",
      title: "Homeowner",
      review: "I feel much safer knowing I can monitor my home remotely. The image quality is excellent, and the app is user-friendly."
    },
    {
      id: 4,
      name: "Priya Karki",
      title: "IT Specialist",
      review: "The integration with our existing systems was surprisingly easy. Great product and fantastic support from the team!"
    },
    {
      id: 5,
      name: "Bikram Joshi",
      title: "Marketing Director",
      review: "These cameras provide peace of mind. The clarity of the footage is impressive, and I love the mobile access feature."
    }
  ];

  const getVisibleProducts = () => {
    return screenWidth >= 1024 ? 3 : 1;
  };

  const nextSlide = () => {
    const visibleProducts = getVisibleProducts();
    if (currentIndex < testimonials.length - visibleProducts) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    const visibleProducts = getVisibleProducts();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(testimonials.length - visibleProducts);
    }
  };

  // Function to get initials
  const getInitials = (name) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative w-full bg-white p-4 rounded-md mb-8">

      <div>
        <div className='w-full flex justify-between items-center border-b-2 pb-2'>
          <p className='text-2xl font-medium relative before:border-b-4 before:border-tertiary before:w-[75px] before:absolute before:bottom-0 before:mb-[-9px]'>
            What Our Clients Say
          </p>
          <div className='flex gap-2'>
            <button aria-label='left' onClick={prevSlide}>
              <FaChevronLeft className='text-lg'/>
            </button>
            <button aria-label='right' onClick={nextSlide}>
              <FaChevronRight className='text-lg'/>
            </button>
          </div>
        </div>

        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / getVisibleProducts()}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="flex-none w-full lg:w-1/3 px-2 py-6 group cursor-pointer mt-4 rounded-md"
              >
                <div className='p-4 bg-gray-100 h-full rounded-md'>
                  <div className='flex gap-3 items-center'>

                    {/* Initials Avatar */}
                    <div className='w-16 h-16 flex items-center justify-center rounded-full bg-blue-700 text-white font-semibold text-lg'>
                      {getInitials(item.name)}
                    </div>

                    <div>
                      <p className='font-medium'>{item.name}</p>
                      <p className='text-sm text-gray-500'>{item.title}</p>
                    </div>
                  </div>

                  <p className='text-sm lg:mt-8 mt-4'>{item.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientTestimonial;
