

// const StatusPin = ({requestStatus}) => {

  
//     if(requestStatus === 'Cancelled'){
//       return(
//         <div className='  flex items-start justify-start lg:w-[90%]  mt-2 mr-6 sm:mr-0 md:ml-14'>
//             <div className='flex gap-2'>
//             <div className={`w-6 h-6 rounded-full relative  bg-red-600 `}></div>
//             <p className='font-semibold'>Cancelled</p>
//             </div>
            
//         </div>
//       )
//     }
//     const getButtonClasses = (requestStatus) => {
//       if (['Pending'].includes(requestStatus)) {
//         return 'w-6 h-6 bg-yellow-400 rounded-full relative before:content-["Pending"] before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-20px] before:font-semibold';
//       } else if (['Approved','Shipped','Out for delivery', 'Delivered' ].includes(requestStatus)) {
//         return 'w-6 h-6 bg-green-600 rounded-full relative before:content-["Pending"] before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-20px] before:font-semibold';
//       } else {
//         return 'w-6 h-6 bg-gray-400 rounded-full relative before:content-["Pending"] before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-20px] before:font-semibold';
//       }
//     };
  
//     const pendingButtonClasses = getButtonClasses(requestStatus)
//     return (
//       <div className=' w-[600px] p-4 flex items-center justify-center lg:w-[90%]  mt-2 mr-6 sm:mr-0 md:ml-8 '>
//             <div className={pendingButtonClasses}></div>
//             <div className={`w-[20%] md:w-[20%] mx-2  border-2 rounded-full ${[ 'Approved', 'Shipped', 'Out for delivery', 'Delivered'].includes(requestStatus) ?'border-green-600':'border-gray-400'}`}></div>
//             <div className={`w-6 h-6  rounded-full relative before:content-['Approved'] before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-30px] before:font-semibold ${['Approved', 'Shipped', 'Out for delivery', 'Delivered'].includes(requestStatus) ?'bg-green-600':'bg-gray-400'}`}></div>
//             <div className={`w-[20%] md:w-[20%] mx-2  border-2 rounded-full ${[ 'Shipped', 'Out for delivery', 'Delivered'].includes(requestStatus) ?'border-green-600':'border-gray-400'}`}></div>
//             <div className={`w-6 h-6 rounded-full relative before:content-['Shipped'] before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-30px] before:font-semibold ${['Shipped', 'Out for delivery', 'Delivered'].includes(requestStatus) ?'bg-green-600':'bg-gray-400'}`}></div>
//             <div className={`w-[20%] md:w-[20%] mx-2  border-2 rounded-full ${['Out for delivery', 'Delivered'].includes(requestStatus) ?'border-green-600':'border-gray-400'}`}></div>
//             <div className={`w-6 h-6 rounded-full relative before:content-["Out_for_delivery"] before:whitespace-nowrap before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-30px] before:font-semibold ${['Shipped', 'Out for delivery', 'Delivered'].includes(requestStatus) ?'bg-green-600':'bg-gray-400'}`}></div>
//             <div className={`w-[20%] md:w-[20%] mx-2  border-2 rounded-full ${['Delivered'].includes(requestStatus) ?'border-green-600':'border-gray-400'}`}></div>
//             <div className={`w-6 h-6 rounded-full relative before:content-['Delivered'] before:absolute before:bottom-0 before:mb-[-30px] before:left-0 before:ml-[-30px] before:font-semibold ${['Delivered'].includes(requestStatus) ?'bg-green-600':'bg-gray-400'}`}></div>
//           </div>
//     )
//   }
  
//   export default StatusPin
  
//   w-full sm:w-[90%] 


// import React from 'react';

// const StatusPin = ({ requestStatus }) => {
//   const statuses = ['Pending', 'Approved', 'Shipped', 'Out for delivery', 'Delivered'];

//   if (requestStatus === 'Cancelled') {
//     return (
//       <div className="flex items-center justify-start w-full mt-2 px-4">
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-full bg-red-600"></div>
//           <p className="text-sm font-semibold">Cancelled</p>
//         </div>
//       </div>
//     );
//   }

//   const currentIndex = statuses.indexOf(requestStatus);

//   return (
//     <div className="w-full mt-2 px-4">
//       <div className="flex items-center justify-between">
//         {statuses.map((status, index) => (
//           <React.Fragment key={status}>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-4 h-4 rounded-full ${
//                   index <= currentIndex ? 'bg-green-600' : 'bg-gray-300'
//                 }`}
//               ></div>
//               <p className="text-xs font-semibold mt-1 text-center">
//                 {status.replace(' ', '\n')}
//               </p>
//             </div>
//             {index < statuses.length - 1 && (
//               <div
//                 className={`flex-grow h-0.5 mx-1 ${
//                   index < currentIndex ? 'bg-green-600' : 'bg-gray-300'
//                 }`}
//               ></div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatusPin;

// import React from 'react';

// const StatusPin = ({ requestStatus }) => {
//   const statuses = ['Pending', 'Approved', 'Shipped', 'Out for delivery', 'Delivered'];

//   if (requestStatus === 'Cancelled') {
//     return (
//       <div className="flex items-center justify-start w-full mt-2 px-4">
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-full bg-red-600"></div>
//           <p className="text-sm font-semibold">Cancelled</p>
//         </div>
//       </div>
//     );
//   }

//   const currentIndex = statuses.indexOf(requestStatus);

//   return (
//     <div className="w-full mt-2 px-4">
//       {/* Vertical layout for small screens */}
//       <div className="flex flex-col space-y-4 sm:hidden">
//         {statuses.map((status, index) => (
//           <div key={status} className="flex items-center">
//             <div className="flex flex-col items-center mr-4">
//               <div className="flex items-center">
//                 <div
//                   className={`w-4 h-4 rounded-full ${
//                     index <= currentIndex ? 'bg-green-600' : 'bg-gray-300'
//                   }`}
//                 ></div>
//               </div>
//               {index < statuses.length - 1 && (
//                 <div
//                   className={`w-0.5 h-full flex-grow my-1 ${
//                     index < currentIndex ? 'bg-green-600' : 'bg-gray-300'
//                   }`}
//                 ></div>
//               )}
//             </div>
//             <p className={`text-sm font-semibold ${index <= currentIndex ? 'text-green-600' : 'text-gray-500'}`}>
//               {status}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Horizontal layout for larger screens */}
//       <div className="hidden sm:flex items-center justify-between">
//         {statuses.map((status, index) => (
//           <React.Fragment key={status}>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`w-4 h-4 rounded-full ${
//                   index <= currentIndex ? 'bg-green-600' : 'bg-gray-300'
//                 }`}
//               ></div>
//               <p className={`text-xs font-semibold mt-2 text-center whitespace-nowrap ${
//                 index <= currentIndex ? 'text-green-600' : 'text-gray-500'
//               }`}>
//                 {status}
//               </p>
//             </div>
//             {index < statuses.length - 1 && (
//               <div className="flex-grow flex items-center">
//                 <div
//                   className={`h-0.5 w-full ${
//                     index < currentIndex ? 'bg-green-600' : 'bg-gray-300'
//                   }`}
//                 ></div>
//               </div>
//             )}
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StatusPin;



// import React from 'react';

// const StatusPin = ({ requestStatus }) => {
//   const statuses = [
//     { name: 'Pending', year: '' },
//     { name: 'Approved', year: '' },
//     { name: 'Shipped', year: '' },
//     { name: 'Out for delivery', year: '' },
//     { name: 'Delivered', year: '' }
//   ];

//   if (requestStatus === 'Cancelled') {
//     return (
//       <div className="flex items-center justify-start w-full mt-2 px-4">
//         <div className="flex items-center gap-2">
//           <div className="w-4 h-4 rounded-full bg-red-600"></div>
//           <p className="text-sm font-semibold">Cancelled</p>
//         </div>
//       </div>
//     );
//   }

//   const currentIndex = statuses.findIndex(status => status.name === requestStatus);

//   const TimelineItem = ({ status, index, isActive }) => (
//     <li>
//       {index > 0 && <hr className={isActive ? "bg-green-500" : ""} />}
//       <div className="timeline-middle">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill="currentColor"
//           className={`w-5 h-5 ${isActive ? "text-green-500" : "text-gray-500"}`}
//         >
//           <path
//             fillRule="evenodd"
//             d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
//             clipRule="evenodd"
//           />
//         </svg>
//       </div>
//       <div className={`timeline-box ${index % 2 === 0 ? 'timeline-start' : 'timeline-end'}`}>
//         {status.name}
//       </div>
//       {index < statuses.length - 1 && <hr className={isActive ? "bg-green-500" : ""} />}
//     </li>
//   );

//   return (
//     <div className="w-full mt-2 px-4 flex flex-col">
//       {/* Horizontal timeline for larger screens */}
//       <ul className="timeline timeline-horizontal hidden sm:timeline ">
//         {statuses.map((status, index) => (
//           <TimelineItem
//             key={status.name}
//             status={status}
//             index={index}
//             isActive={index <= currentIndex}
//           />
//         ))}
//       </ul>

//       {/* Vertical timeline for smaller screens */}
//       <ul className="timeline timeline-vertical sm:hidden border-2 ">
//         {statuses.map((status, index) => (
//           <li key={status.name}>
//             {index > 0 && <hr className={index <= currentIndex ? "bg-green-500" : ""} />}
//             <div className="timeline-middle">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//                 className={`w-5 h-5 ${index <= currentIndex ? "text-green-500" : "text-gray-500"}`}
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//             <div className="timeline-end timeline-box">{status.name}</div>
//             {index < statuses.length - 1 && <hr className={index <= currentIndex ? "bg-green-500" : ""} />}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StatusPin;


import React from 'react';

const StatusPin = ({ requestStatus }) => {
  const statuses = [
    { name: 'Pending', year: '' },
    { name: 'Approved', year: '' },
    { name: 'Shipped', year: '' },
    { name: 'Out for delivery', year: '' },
    { name: 'Delivered', year: '' }
  ];

  if (requestStatus === 'Cancelled') {
    return (
      <div className="flex items-center justify-start w-full mt-2 px-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-600"></div>
          <p className="text-sm font-semibold">Cancelled</p>
        </div>
      </div>
    );
  }

  const currentIndex = statuses.findIndex(status => status.name === requestStatus);

  const TimelineItem = ({ status, index, isActive, isVertical }) => (
    <li>
      {index > 0 && <hr className={isActive ? "bg-green-500" : ""} />}
      <div className="timeline-middle">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 ${isActive ? "text-green-500" : "text-gray-500"}`}
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className={`timeline-box ${isVertical ? (index % 2 === 0 ? 'timeline-start' : 'timeline-end') : (index % 2 === 0 ? 'timeline-start' : 'timeline-end')}`}>
        {status.name}
      </div>
      {index < statuses.length - 1 && <hr className={isActive ? "bg-green-500" : ""} />}
    </li>
  );

  return (
    <div className="w-full mt-2 px-4">
      {/* Horizontal timeline for larger screens */}
      <ul className="timeline timeline-horizontal hidden sm:timeline">
        {statuses.map((status, index) => (
          <TimelineItem
            key={status.name}
            status={status}
            index={index}
            isActive={index <= currentIndex}
            isVertical={false}
          />
        ))}
      </ul>

      {/* Vertical timeline for smaller screens */}
      <ul className="timeline timeline-vertical sm:hidden">
        {statuses.map((status, index) => (
          <TimelineItem
            key={status.name}
            status={status}
            index={index}
            isActive={index <= currentIndex}
            isVertical={true}
          />
        ))}
      </ul>
    </div>
  );
};

export default StatusPin;