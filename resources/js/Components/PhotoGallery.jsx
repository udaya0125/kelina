import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const PhotoGallery = ({ images, apiUrl }) => {
  return (
    <Gallery>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Item
            key={image.id}
            original={`${apiUrl}/${image.image_path}`}
            thumbnail={`${apiUrl}/${image.image_path}`}
            width={1024}
            height={768}
          >
            {({ ref, open }) => (
              <div className="overflow-hidden rounded-lg cursor-pointer">
                <img
                  ref={ref}
                  onClick={open}
                  src={`${apiUrl}/${image.image_path}`}
                  alt={`Gallery image ${image.id}`}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            )}
          </Item>
        ))}
      </div>
    </Gallery>
  );
};

export default PhotoGallery;

// Usage example:
// import PhotoGallery from './PhotoGallery';
// 
// const App = () => {
//   const apiUrl = 'https://your-api-url.com';
//   const galleryImages = [
//     {
//       "id": 2,
//       "image_path": "images/1741260642.webp",
//       "created_at": "2025-03-06T11:30:42.000000Z",
//       "updated_at": "2025-03-06T11:30:42.000000Z"
//     },
//     // more images...
//   ];
//
//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Image Gallery</h1>
//       <PhotoGallery images={galleryImages} apiUrl={apiUrl} />
//     </div>
//   );
// };