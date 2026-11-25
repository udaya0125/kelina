// import React from 'react';
// import parse from 'html-react-parser';

// const StyledContentParser = ({ content }) => {
//   const options = {
//     replace: (domNode) => {
//       if (domNode.type === 'tag') {
//         switch (domNode.name) {
//           case 'h1':
//             return (
//               <h1 className="text-4xl font-bold mb-6 text-gray-900">
//                 {domNode.children?.[0]?.data}
//               </h1>
//             );
//           case 'h2':
//             return (
//               <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                 {domNode.children?.[0]?.data}
//               </h2>
//             );
//           case 'h3':
//             return (
//               <h3 className="text-2xl font-semibold mb-3 text-gray-700">
//                 {domNode.children?.[0]?.data}
//               </h3>
//             );
//           case 'p':
//             return (
//               <p className="mb-4 text-gray-600 leading-relaxed">
//                 {parse(domNode.children?.[0]?.data || '')}
//               </p>
//             );
//           case 'ul':
//             return (
//               <ul className="list-disc pl-6 mb-4 space-y-2">
//                 {domNode.children.map((child, index) => 
//                   React.createElement('li', { 
//                     key: index,
//                     className: 'text-gray-600'
//                   }, child.children?.[0]?.data)
//                 )}
//               </ul>
//             );
//           case 'li':
//             return (
//               <li className="text-gray-600">
//                 {domNode.children?.[0]?.data}
//               </li>
//             );
//           default:
//             return domNode;
//         }
//       }
//     },
//   };

//   return (
//     <div className="max-w-4xl mx-auto py-8 px-4">
//       {parse(content, options)}
//     </div>
//   );
// };

// export default StyledContentParser;


// import React from 'react';
// import parse from 'html-react-parser';

// const StyledContentParser = ({ content }) => {
//   const options = {
//     replace: (domNode) => {
//       if (domNode.type === 'tag') {
//         switch (domNode.name) {
//           case 'h1':
//             return (
//               <h1 className="text-4xl font-bold mb-6 text-gray-900">
//                 {domNode.children?.[0]?.data}
//               </h1>
//             );
//           case 'h2':
//             return (
//               <h2 className="text-3xl font-bold mb-4 text-gray-800">
//                 {domNode.children?.[0]?.data}
//               </h2>
//             );
//           case 'h3':
//             return (
//               <h3 className="text-2xl font-semibold mb-3 text-gray-700">
//                 {domNode.children?.[0]?.data}
//               </h3>
//             );
//           case 'p':
//             return (
//               <p className="mb-4 text-gray-600 leading-relaxed">
//                 {domNode.children.map((child, index) => 
//                   typeof child.data === 'string' 
//                     ? child.data 
//                     : parse(child.children?.[0]?.data || '')
//                 )}
//               </p>
//             );
//           case 'ul':
//             return (
//               <ul className="list-disc pl-6 mb-4 space-y-2">
//                 {domNode.children
//                   .filter(child => child.type === 'tag' && child.name === 'li')
//                   .map((child, index) => (
//                     <li key={index} className="text-gray-600">
//                       {child.children?.[0]?.data || ''}
//                     </li>
//                   ))
//                 }
//               </ul>
//             );
//             case 'a':
//             return (
//               <span
//                 style={{
//                   cursor: 'pointer',
//                   textDecoration: 'none',
//                   color: 'inherit', // Inherit the parent color
//                 }}
//                 onClick={() => window.open(domNode.attribs.href, '_blank')}
//               >
//                 {domNode.children?.[0]?.data || ''}
//               </span>
//             );
//           default:
//             return null;
//         }
//       }
//     },
//   };

//   return (
//     <div className="max-w-8xl mx-auto py-8 px-4">
//       {parse(content, options)}
//     </div>
//   );
// };

// export default StyledContentParser;


import React from 'react';
import parse from 'html-react-parser';

const StyledContentParser = ({ content }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.type === 'tag') {
        switch (domNode.name) {
          case 'h1':
            return (
              <h1 className="text-4xl font-bold mb-6 text-gray-900">
                {domNode.children?.[0]?.data}
              </h1>
            );
          case 'h2':
            return (
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                {domNode.children?.[0]?.data}
              </h2>
            );
          case 'h3':
            return (
              <h3 className="text-2xl font-semibold mb-3 text-gray-700">
                {domNode.children?.[0]?.data}
              </h3>
            );
          case 'p':
            return (
              <p className="mb-4 text-gray-600 leading-relaxed">
                {domNode.children.map((child, index) => {
                  if (child.type === 'tag' && child.name === 'a') {
                    return (
                      <a
                        key={index}
                        href={child.attribs.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          textDecoration: 'none',
                          color: 'inherit', // Inherit parent color
                        }}
                      >
                        {child.children?.[0]?.data || ''}
                      </a>
                    );
                  } else if (typeof child.data === 'string') {
                    return child.data;
                  } else {
                    return parse(child.children?.[0]?.data || '');
                  }
                })}
              </p>
            );
          case 'ul':
            return (
              <ul className="list-disc pl-6 mb-4 space-y-2">
                {domNode.children
                  .filter(child => child.type === 'tag' && child.name === 'li')
                  .map((child, index) => (
                    <li key={index} className="text-gray-600">
                      {child.children?.[0]?.data || ''}
                    </li>
                  ))
                }
              </ul>
            );
          default:
            return null;
        }
      }
    },
  };

  return (
    <div className="max-w-8xl mx-auto py-8 px-4">
      {parse(content, options)}
    </div>
  );
};

export default StyledContentParser;
