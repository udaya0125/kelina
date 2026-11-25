// import React, { useState } from 'react';

// const ProductImage = ({ item }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div 
//       className="overflow-hidden relative group flex justify-center items-center bg-white"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <img 
//         src={`${apiUrl}/${item.images[0]?.image_path}`}
//         className={`w-[45%] h-48 object-scale-down transition-opacity duration-500 ease-in-out ${
//           isHovered ? 'opacity-0' : 'opacity-100'
//         }`}
//         alt={item.name}
//       />
//       <img 
//         src={`${apiUrl}/${item.images[1]?.image_path}`}
//         className={`w-[45%] h-48 object-scale-down transition-opacity duration-500 ease-in-out absolute top-0 left-0 right-0 bottom-0 m-auto ${
//           isHovered ? 'opacity-100' : 'opacity-0'
//         }`}
//         alt={`${item.name} - Hover`}
//       />
//     </div>
//   );
// };

// export default ProductImage;


import React from 'react';

const ProductImage = ({ item, isHovered }) => {
    const apiUrl = import.meta.env.VITE_APP_URL
  return (
    <div className="overflow-hidden relative group flex justify-center items-center bg-white">
      <img 
        src={`${apiUrl}/${item.images[0]?.image_path}`}
        className={`w-[45%] h-48 object-scale-down transition-opacity duration-500 ease-in-out ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
        alt={item.product_name}
      />

      <img 
        src={`${apiUrl}/${item.images[1]?.image_path}`}
        className={`w-[45%] h-48 object-scale-down transition-opacity duration-500 ease-in-out absolute top-0 left-0 right-0 bottom-0 m-auto ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        alt={`${item.product_name} - Hover`}
      />
    </div>
  );
};

export default ProductImage;