import React from 'react'
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import { BsSend } from 'react-icons/bs'
const ShareButtons = ({product}) => {

    const apiUrl = import.meta.env.VITE_APP_URL;



    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
//   const imageUrl = `${window.location.origin}/${product.images[0]?.image_path}`;
const imageUrl = product.images[0] ? `${window.location.origin}/${product.images[0].image_path}` : '';
  const description = product?.description?.length > 100 
    ? product.description.substring(0, 97) + '...' 
    : product.description;

    const firstImage = product.images[0] ? `${apiUrl}/${product.images[0].image_path}`: 'https://placehold.co/600x600';

  // const shareUrls = {
  //   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
  //   twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.product_name)}`,
  //   linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(product.product_name)}&summary=${encodeURIComponent(description)}`,
  //   whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${product.product_name} - ${currentUrl}`)}`,
  //   telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.product_name)}`
  // };


  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&picture=${encodeURIComponent(firstImage)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.product_name)}&via=yourTwitterHandle&image=${encodeURIComponent(firstImage)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(product.product_name)}&summary=${encodeURIComponent(description)}&source=${encodeURIComponent(firstImage)}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${product.product_name} - ${currentUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(product.product_name)}`
};

  return (
    <div>
        <p className='text-lg font-medium text-gray-500 mb-2'>Share</p>
    <div className="flex space-x-3">
      <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
        <FaFacebook size={18} />
      </a>
      <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
        <FaTwitter size={18} />
      </a>
      <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
        <FaLinkedinIn size={18} />
      </a>
      <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
      <a href={shareUrls.telegram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
        <BsSend size={18} />
      </a>
    </div>
    </div>
  )
}

export default ShareButtons