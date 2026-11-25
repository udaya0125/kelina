import { useContext,useState,useEffect, useRef } from "react"
import { AdminDataContext } from "../AdminContext/AdminContext"
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import imageCompression from 'browser-image-compression'; 


const EditImages = () => {
  const apiUrl = import.meta.env.VITE_APP_URL

    const fileInputRef = useRef(null)

    const handleButtonClick = () => {
        fileInputRef.current.click();
    }

    // const handleFileChange = (e) => {
    //     console.log(e.target.files)
    // }

    const [oldImages, setOldImages] = useState([])
    const [editItemId, setEditItemId] = useState('')

    const {productImages,editItemInfo} = useContext(AdminDataContext)

    const [allProductImages,setAllProductImages] = useState([])
    const [triggerImageReload,setTriggerImageReload] = useState(false)
    
    const [imagePreviews,setImagePreviews] = useState([])

    const [newImageData, setNewImageData] = useState([])


    console.log(editItemInfo)
   
    // const relatedItems = allProductImages.filter((item)=>item.product_identifier === editItemInfo.id)
    // console.log(relatedItems)

    // useEffect(()=>{
    //     const fetchImageData = async() => {
    //         try {
    //             const response = await axios.get(
    //                 'http://localhost:3000/getallproductimages'     
    //             )
    //                 setAllProductImages(response.data)
    //         } catch (error) {
    //             console.log('Error fetching',error)
    //         }
    //     }
    //     fetchImageData()
    // },[triggerImageReload])

    const handleDelete = async (id) => {
        try {
            // Make the delete request
            const response = await axios.delete(route('productimage.destroy', { id }));
    
            if (response.status === 200) {
                toast.success('Image deleted');
                
                // Refetch the product data after successful deletion
                // const fetchItem = await axios.get(route('product.show', { id:editItemId }));
    
                // // Update localStorage with the new data
                // localStorage.setItem('editItemInfo', JSON.stringify(fetchItem.data));

                // setTriggerImageReload((prev)=>!prev)


                setOldImages(prevImages => prevImages.filter(img => img.id !== id));

                // Update localStorage with the new data
                const storedItem = JSON.parse(localStorage.getItem('editItemInfo'));
                storedItem.images = storedItem.images.filter(img => img.id !== id);
                localStorage.setItem('editItemInfo', JSON.stringify(storedItem));

            } else {
                throw new Error('Failed to delete product image');
            }
        } catch (error) {
            console.error('Error deleting product image:', error);
            toast.error('Failed to delete image');
        }
    };


    // const handleImageFileChange = (e) => {
    //     const files = e.target.files;
      
    //     if (files.length > 0) {
    //       const maxSizeInBytes = 1024 * 1024;
    //       const newImages = [];
    //       const newImagePreviews = [...imagePreviews];

    //       for (let i = 0; i < files.length; i++) {
    //         const file = files[i];
      
    //         if (file.size > maxSizeInBytes) {
    //           alert('File size exceeds the 1mb limit. Please choose smaller files.');
    //         //   e.target.value = null;
    //           return;
    //         } else {
    //           convertToBase64(file, (base64String) => {
    //             newImages.push(base64String);
    //             newImagePreviews.push(URL.createObjectURL(file))
    //             if (newImages.length === files.length) {
    //               // All files processed
                    
    //               setNewImageData([...newImageData,...newImages])
    //             //   setFormData((prevData)=>({
    //             //     ...prevData,
    //             //     images: [...prevData.images,...newImages]
    //             //   }))
    //               setImagePreviews(newImagePreviews)
    //             }
    //           });
    //         }
    //       }
    //     }
    //   };


      
    // const convertToBase64 = (file, callback) => {
    //     const reader = new FileReader();
      
    //     reader.onloadend = () => {
    //       const base64String = reader.result;
    //       callback(base64String);
    //     };
      
    //     reader.readAsDataURL(file);
    //   };



    //   const handleImageAddition = async() => {
    //     if(newImageData && editItemId) {
    //         try {
    //            const response= await axios.post(route('productImage.add'),{
    //                 id:editItemId,
    //                 images:newImageData
    //             }) 
    //             if(response.status === 200) {
    //                 toast.success('Images Added')

    //                 const fetchItem = await axios.get(route('product.show', { id:editItemId }));
    
    //             // Update localStorage with the new data
    //             localStorage.setItem('editItemInfo', JSON.stringify(fetchItem.data));

    //             setTriggerImageReload((prev)=>!prev)

                    
    //                 setNewImageData([])
    //                  setImagePreviews([])
    //             }
    //             else {
    //                 console.error('Failed to add image', response.statusText)
    //             }           
    //         } catch (error) {
    //             console.log('Error adding images',error)
    //         }
    //     }
    //   }


    const handleImageFileChange = async (e) => {
      const files = e.target.files;
    
      if (files.length > 0) {
        const maxSizeInBytes = 1024 * 1024; // 1MB
        const newImages = [];
        const newImagePreviews = [...imagePreviews];
    
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
    
          if (file.size > maxSizeInBytes) {
            toast.error('File size exceeds the 1MB limit. Please choose smaller files.');
            return;
          } else {
            try {
              // Compress the image
              const compressedFile = await imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1000,
                useWebWorker: true
              });
    
              // Convert to WebP
              const webpBlob = await convertToWebP(compressedFile);
              const base64String = await convertToBase64(webpBlob);
    
              newImages.push(base64String);
              newImagePreviews.push(URL.createObjectURL(webpBlob));
    
              if (newImages.length === files.length) {
                // All files processed
                setNewImageData([...newImageData, ...newImages]);
                setImagePreviews(newImagePreviews);
              }
            } catch (error) {
              console.error('Error processing image:', error);
              toast.error('Error processing image. Please try again.');
            }
          }
        }
      }
    };
    
    const convertToWebP = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1000;
            canvas.height = 1000;
            const ctx = canvas.getContext('2d');
            
            // Calculate dimensions to crop to square
            const size = Math.min(img.width, img.height);
            const x = (img.width - size) / 2;
            const y = (img.height - size) / 2;
            
            // Draw image as square
            ctx.drawImage(img, x, y, size, size, 0, 0, 1000, 1000);
            
            // Convert to WebP
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('WebP conversion failed'));
              }
            }, 'image/webp', 0.75);
          };
          img.onerror = reject;
          img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };
    
    const handleImageAddition = async () => {
      if (newImageData && editItemId) {
        try {
          const response = await axios.post(route('productImage.add'), {
            id: editItemId,
            images: newImageData
          });
    
          if (response.status === 200) {
            toast.success('Images Added');
    
            const fetchItem = await axios.get(route('productedit.show', { id: editItemId }));
    
            // Update localStorage with the new data
            localStorage.setItem('editItemInfo', JSON.stringify(fetchItem.data));
    
            setTriggerImageReload((prev) => !prev);
            setNewImageData([]);
            setImagePreviews([]);
          } else {
            console.error('Failed to add image', response.statusText);
            toast.error('Failed to add image. Please try again.');
          }
        } catch (error) {
          console.log('Error adding images', error);
          toast.error('Error adding images. Please try again.');
        }
      }
    };


      useEffect(()=> {
        const storedItem = JSON.parse(localStorage.getItem('editItemInfo'))
        if(storedItem) {
            setOldImages(storedItem.images)
            setEditItemId(storedItem.id)
        }

      },[triggerImageReload])

    //   console.log(oldImages)
    //   console.log(editItemId)

  return (
    <div className="w-full flex items-center mt-6  flex-col">
        <p className="text-2xl text-tertiary font-semibold ">Images</p>
        <p className="text-[0.85rem] font-medium text-tertiary ">(Clicking the delete button will permanently delete the Images. After selecting the images to add, click on the [Add Images] button to add them.)</p>
        <div className="flex gap-6 mt-6 w-full max-w-[750px] p-8 flex-wrap">
            {oldImages && oldImages.map((item)=>(
                <div key={item.id} className="relative">
                <img  src={`${apiUrl}/${item.image_path}`} className="w-44 h-44 rounded-md" />
                <button onClick={()=>handleDelete(item.id)} className="bg-red-600 p-2 rounded-md absolute top-2 right-2 tooltip tooltip-bottom" data-tip="Delete"><IoClose className="text-xl text-white"/></button>
                </div>
            ))}
            {imagePreviews && imagePreviews.map((item,index)=>(
                <img src={item} key={index} className="w-44 h-44 rounded-md"/>
            ))}
            <button className="w-44 h-44 bg-white/60 flex flex-col justify-center items-center rounded-md border-2 border-tertiary hover:scale-90 transition-transform duration-300" onClick={handleButtonClick}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageFileChange}
                    accept = "image/*"
                    style={{display: 'none'}}
                    multiple
                />
                <FaPlusCircle className="text-3xl text-tertiary"/>
                <p className="mt-2 text-tertiary font-medium">Add new Images</p>
            </button>
        </div>
        <div>
            <button className="bg-tertiary px-4 py-1.5 rounded-sm text-white border-2 border-tertiary hover:bg-white hover:text-tertiary transition duration-500" onClick={handleImageAddition}>Add Images</button>        
        </div>
    </div>
  )
}

export default EditImages



// before:content-['delete'] before:absolute before:text-white before:bg-black before:text-sm before:p-1 before:top-0 before:mt-[-20px] before:rounded-sm before:opacity-0 hover:before:opacity-100 before:z-[10]