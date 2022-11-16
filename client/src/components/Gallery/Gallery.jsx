import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
import { BsArrowsFullscreen } from "react-icons/bs";
import { BsFullscreenExit } from "react-icons/bs";
import times from "../../static/icons/times.png";
import ImagesUploader from "components/UI/ImagesUploader/ImagesUploader";
import noFoto from "static/icons/nophoto.png";

import styles from "./Gallery.module.scss";

const Gallery = ({
  imagesFromDB,
  setImagesFromDB,
  isEditMode,
  imagesToUpload,
  setImagesToUpload,
  setImagesToDelete,
  imagesToDelete
}) => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [preview, setPreview] = useState([]);
  const filesInputRef = useRef(null);
  const [exist, setExist] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 599px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  let imageSize;

  useEffect(() => {
    if (isMobile) {
      imageSize = { width: 250, height: 250 }
    }
    if (isTablet) {
      imageSize = { width: 400, height: 400 }
    }
  }, [])

  const orderImagesByID = useSelector(state =>
    state.orderImages.orderImages.filter(image => image.order_id == id)
  );

  useEffect(() => {
    if (imagesFromDB.length === 0) {
      setItems([{ src: noFoto, thumbnail: noFoto }]);
    } else {
      imagesFromDB.map(image => {
        setItems(prevState => [
          ...prevState,
          {
            src: `/${image.image_min}`,
            thumbnail: `/${image.image_min}`
          }
        ]);
      });
    }

    return () => {
      setItems([]);
    };
  }, [imagesFromDB]);

  useEffect(() => {
    imagesFromDB &&
      imagesFromDB.map(image => {
        setExist(prevState => [
          ...prevState,
          {
            src: `/${image.image_min}`,
            thumbnail: `/${image.image_min}`
          }
        ]);
      });

    return () => {
      setExist([]);
    };
  }, []);

  useEffect(() => {
    return () => {
      setPreview([]);
    };
  }, [isEditMode]);

  const readURI = e => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImagesToUpload(files);

      Promise.all(
        files.map(file => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.addEventListener("load", ev => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        img => {
          setPreview(img);
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  const removeImageFromInput = (e, index) => {
    setPreview(preview.filter((obj, i) => i != index));

    let newFiles = Array.from(filesInputRef.current.files);
    newFiles.splice(index, 1);

    setImagesToUpload(newFiles);
  };

  const removeImageFromDB = (e, index) => {
    setExist(exist.filter((obj, i) => i !== index));
    setImagesToDelete(prevState => [
      ...prevState,
      imagesFromDB.filter((obj, i) => i == index)
    ]);
  };

  return (
    <div className={styles.wrapper}>
      {isEditMode ? (
        <div className={styles.image}>
          <div className={styles.previewWrapper}>
            {exist &&
              exist.map((image, index) => (
                <div key={index} className={styles.preview}>
                  <img src={image.thumbnail} alt="preview" />
                  <button
                    onClick={e => removeImageFromDB(e, index)}
                    className={styles.removeBtn}
                  >
                    <img
                      src={times}
                      alt="times"
                      className={styles.removeIcon}
                    />
                  </button>
                </div>
              ))}

            {preview.map((imageURI, index) => (
              <div key={index} className={styles.preview}>
                <img src={imageURI} alt="photo uploaded" />
                <button
                  onClick={e => removeImageFromInput(e, index)}
                  className={styles.removeBtn}
                >
                  <img src={times} alt="times" className={styles.removeIcon} />
                </button>
              </div>
            ))}
          </div>

          <ImagesUploader onChange={readURI} filesInputRef={filesInputRef} />
        </div>
      ) : (
        <Carousel
          images={items}
          style={imageSize}
          hasMediaButton={false}
          hasIndexBoard={false}
          leftIcon={<BsChevronCompactLeft className={styles.chevron} />}
          rightIcon={<BsChevronCompactRight className={styles.chevron} />}
          // minIcon={<BsFullscreenExit className={styles.fullscreen} />}
          // maxIcon={<BsArrowsFullscreen className={styles.fullscreen} />}
          thumbnailWidth="70px"
          thumbnailHeight="70px"
          hasThumbnails={items.length > 1 ? true : false}
          hasLeftButton={items.length > 1 ? "centerLeft" : false}
          hasRightButton={items.length > 1 ? "centerRight" : false}
            hasSizeButton={false}
        />
      )}
    </div>
  );
};

export default Gallery;
