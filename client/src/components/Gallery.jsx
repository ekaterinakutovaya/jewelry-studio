import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { toast } from "react-toastify";

import times from "@/assets/times.png";
import noPhoto from "@/assets/nophoto.png";
import { ImagesUploadInput } from "@/components";


export const Gallery = ({ imagesFromDB, setImagesToUpload, setImagesToDelete }) => {
  const { isEditMode } = useSelector(state => state.editMode);
  const [carouselItems, setCarouselItems] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const imagesInputRef = useRef(null);


  useEffect(() => {
    if (imagesFromDB.length === 0) {
      setCarouselItems([{ src: noPhoto, thumbnail: noPhoto }]);
    } else {
      imagesFromDB.map(image => {
        setCarouselItems(prevState => [
          ...prevState,
          {
            src: `${image.imageMin}`,
            thumbnail: `${image.imageMin}`
          }
        ]);
      });
    }

    return () => {
      setCarouselItems([]);
    };
  }, [isEditMode, imagesFromDB])

  useEffect(() => {
    imagesFromDB &&
      imagesFromDB.map(image => {
        setExistingImages(prevState => [
          ...prevState,
          {
            src: `${image.imageMin}`,
            thumbnail: `${image.imageMin}`
          }
        ]);
      });

    return () => {
      setExistingImages([]);
      setPreviewImages([]);
    };
  }, [isEditMode]);

  const readURI = e => {
    console.log('test');
    if (e.target.files) {
      const images = Array.from(e.target.files);
      const filteredImages = images.filter(img => {        
        if (img.type === "image/jpg" || img.type === "image/jpeg" || img.type === "image/png") {
          if (img.size < 2097152) {
            return true;
          } else {
            toast.error(`Файл ${img.name} превышает 2MB`, {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 10000
            });
            return false;
          }
        }
        toast.error(`Файл ${img.name} имеет недопустимый формат`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 10000
        });
        return false;
      })

      setImagesToUpload(filteredImages);

      Promise.all(
        filteredImages.map(image => {          
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                resolve(reader.result);
                // setImagesToUpload(prevState => [...prevState, image])
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(image);
          });
        })
      ).then(
        img => {
          setPreviewImages(img);
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  const removeImageFromInput = (e, index) => {
    setPreviewImages(previewImages.filter((obj, i) => i != index));

    let newFiles = Array.from(imagesInputRef.current.files);
    newFiles.splice(index, 1);

    setImagesToUpload(newFiles);
  };

  const removeImageFromDB = (e, index) => {
    setExistingImages(prevState => prevState.filter((obj, i) => i !== index));
    setImagesToDelete(prevState => [
      ...prevState,
      imagesFromDB.filter((obj, i) => i == index)
    ]);
  };

  return (
    <div className="flex justify-center">
      {isEditMode ? (
        <div className="w-full block">
          <div className="mb-6">
            <div className="w-full grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-0 lg:gap-3 flex justify-center items-center">
              {existingImages && existingImages.map((image, index) => (
                <div key={index} className="w-full aspect-square relative">
                  <div className="w-full aspect-square rounded-md shadow-sm border border-border-main overflow-hidden">
                    <img src={image.thumbnail} alt="preview" className="w-full h-full object-cover" />
                    <button
                      onClick={e => removeImageFromDB(e, index)}
                      className="absolute -top-2 -right-2"
                    >
                      <img src={times} alt="remove" className="w-5 h-5 " />
                    </button>
                  </div>
                </div>
              ))}

              {previewImages.map((imageURI, index) => (
                <div key={index} className="w-full aspect-square relative">
                  <div className="w-full aspect-square rounded-md shadow-sm border border-border-main overflow-hidden">
                    <img src={imageURI} alt="preview" className="w-full h-full block my-0 mx-auto object-cover" />
                    <button
                      onClick={e => removeImageFromInput(e, index)}
                      className="absolute -top-2 -right-2"
                    >
                      <img src={times} alt="remove" className="w-5 h-5 " />
                    </button>
                  </div>
                </div>
              ))}
                
              
            </div>
          </div>

          <ImagesUploadInput onChange={readURI} imagesInputRef={imagesInputRef} />
        </div>
      ) : (
        <Carousel
          images={carouselItems}
          className="rounded-[10px] overflow-hidden cursor-default bg-white border border-border-main"
          hasMediaButton={false}
          hasIndexBoard={false}
          hasSizeButton={false}
          leftIcon={<BsChevronCompactLeft className="w-10 h-10 text-white opacity-60" />}
          rightIcon={<BsChevronCompactRight className="w-10 h-10 text-white opacity-60" />}
          thumbnailWidth="70px"
          thumbnailHeight="70px"
          hasThumbnails={carouselItems.length > 1 ? true : false}
          hasLeftButton={carouselItems.length > 1 ? "centerLeft" : false}
          hasRightButton={carouselItems.length > 1 ? "centerRight" : false}
        />
      )}

    </div>
  );
};
