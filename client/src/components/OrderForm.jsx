import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaBolt, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import { categories, status } from "@/utils/consts";
import { dateFormatter, priceFormatter } from "@/utils/utils";

import ordersService from "@/services/orders.service";
import calculationService from "@/services/calculation.service";

import { createOrder, updateOrder, orderStatusUpdate } from "@/store/OrdersSlice";
import { uploadImages, deleteSingleImage } from "@/store/ImagesSlice";
import { setFile, uploadFile, deleteFile } from "@/store/FilesSlice";
import { fetchCalculationByID } from "@/store/CalculationSlice";
import { setEditMode } from "@/store/EditModeSlice";

import { Button, Calculation, FilelistEditable, CategorySelect, StatusSelect, Gallery, Spinner, UrgencyCheckbox } from "@/components";


export const urgency = [
  { index: 0, label: <><FaBolt />&nbsp;Очень срочный</> },
  { index: 1, label: <><FaExclamationCircle />&nbsp;Срочный</> },
  { index: 2, label: '' }
]

const today = new Date();
const date = today.setDate(today.getDate());
const defaultReceiveDate = new Date(date).toISOString().split('T')[0];

export const OrderForm = ({ order, images }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isEditMode } = useSelector(state => state.editMode);
  const { calculation } = useSelector(state => state.calculation);
  const files = useSelector(state => state.files.files.filter(file => file.orderId === order.orderId));

  const [data, setData] = useState({ orderId: '', orderName: '', customer: '', receiveDate: defaultReceiveDate, handoverDate: null, priceStart: '', priceMiddle: '', priceFinal: '', hallmark: '', metallColor: '', earParams: '', ringSize: '', fastenerType: '', comments: '' });
  const [urgencyIndex, setUrgencyIndex] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);

  const [imagesFromDB, setImagesFromDB] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [filesToUpload, setFilesToUpload] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);

  const [calculationData, setCalculationData] = useState([]);

  const [loadingStatus, setLoadingStatus] = useState(false);
  const [sending, setSending] = useState(false);


  useEffect(() => {
    dispatch(fetchCalculationByID(order.orderId))

    return () => {
    }
  }, [])

  useEffect(() => {
    return () => {
      setFilesToDelete([]);
      setFilesToUpload([]);
    }
  }, [isEditMode])


  useEffect(() => {
    return () => {
      dispatch(setEditMode(false))
    }
  }, [])


  useEffect(() => {
    if (Object.entries(order).length !== 0) {
      setData(prevState => ({ ...prevState, ...order || {} }));
      setUrgencyIndex(Number(order.urgencyIndex));
      setSelectedCategory(Number(order.catIndex));
      setSelectedStatus(Number(order.statIndex));
      setCalculationData(calculation || []);
    }

    return () => {
      setImagesToUpload([]);
      setImagesToDelete([]);
    }
  }, [order, isEditMode])

  useEffect(() => {
    setImagesFromDB(images || []);

    return () => {
      setImagesFromDB([]);
    }
  }, [images])

  const editModeHandler = () => {
    dispatch(setEditMode(true))
  }

  const cancelEditModeHandler = () => {

    if (!data.orderId) { // undo new order adding
      navigate(`/orders`);
      return;
    }

    if (filesToDelete.length) { //undo file deletion
      filesToDelete.map(file => {
        dispatch(setFile(file));
      })
      dispatch(setEditMode(false));
      return;
    }

    dispatch(fetchCalculationByID(order.orderId))
    dispatch(setEditMode(false));
  }

  const onSubmit = () => {
    setLoadingStatus(true);
    const { orderId } = data;
    
    const dataToAdd = {
      orderId: data.orderId || '',
      orderName: data.orderName || '',
      customer: data.customer || '',
      receiveDate: data.receiveDate || '',
      handoverDate: data.handoverDate || null,
      priceStart: data.priceStart || '',
      priceMiddle: data.priceMiddle || '',
      priceFinal: data.priceFinal || '',
      urgencyIndex,
      catIndex: selectedCategory,
      categoryName: categories[selectedCategory].label,
      statIndex: selectedStatus,
      statusName: status[selectedStatus].label,
      statusRate: status[selectedStatus].rate,
      hallmark: data.hallmark || '',
      metallColor: data.metallColor || '',
      earParams: data.earParams || '',
      ringSize: data.ringSize || '',
      fastenerType: data.fastenerType || '',
      comments: data.comments || ''
    }

    if (!orderId) { // Create order
      dispatch(createOrder({ dataToAdd }))
        .then((response) => {
          const orderId = response.payload;

          if (imagesToUpload.length) {
            function upload(index) {
              if (index >= imagesToUpload.length) return;
              let image = imagesToUpload[index];

              dispatch(uploadImages({ image, orderId }))
                .then(() => {
                  upload.call(this, index + 1);
                });
            }
            upload.call(this, 0);
          }

          if (filesToUpload.length) {
            // for the files are saved in the same sequence they were uploaded
            function upload(index) {
              if (index >= filesToUpload.length) return;
              let file = filesToUpload[index];
              dispatch(uploadFile({ file, orderId }))
                .then(() => {
                  upload.call(this, index + 1);
                });
            }
            upload.call(this, 0);
          }

          calculationService.createCalculation(calculationData, orderId)
        })
        .then(() => {
          setTimeout(() => {
            setLoadingStatus(false);
            dispatch(setEditMode(false));
            navigate(`/orders`);
          }, 500)

        })

      return;
    }

    if (imagesToUpload.length) {
      // for the images are saved in the same sequence they were uploaded
      function upload(index) {
        if (index >= imagesToUpload.length) return;
        let image = imagesToUpload[index];
        dispatch(uploadImages({ image, orderId }))
          .then(() => {
            upload.call(this, index + 1);
          });
      }
      upload.call(this, 0);
    }

    if (imagesToDelete.length) {
      imagesToDelete.map(image => {
        dispatch(deleteSingleImage(image));
      })
    }

    if (filesToUpload.length) {
      // for the files are saved in the same sequence they were uploaded
      function upload(index) {
        if (index >= filesToUpload.length) return;
        let file = filesToUpload[index];
        console.log(file)
        dispatch(uploadFile({ file, orderId }))
          .then(() => {
            upload.call(this, index + 1);
          });
      }
      upload.call(this, 0);
    }

    if (filesToDelete.length) {
      filesToDelete.map(file => {
        dispatch(deleteFile(file));
      })
    }

    calculationService.updateCalculation(calculationData, orderId)

    dispatch(updateOrder({ dataToAdd }))
      .then(() => {
        setTimeout(() => {
          setLoadingStatus(false);
          dispatch(setEditMode(false));
        }, 500)

      })
  }

  // Send order for cutting via Telegram bot and change order status
  const sendToCuttingHandler = () => {
    setSending(true);
    ordersService.sendToCutting(order.orderId, imagesFromDB[0])
      .then(() => {
        dispatch(orderStatusUpdate(order.orderId));

        setTimeout(() => {
          setSending(false);
          setSelectedStatus(1);
          toast.success("Отправлено на резку!", {
            position: toast.POSITION.TOP_CENTER
          });
        }, 1000)

      });
  }


  return (
    <>
      <div className="lg:flex justify-end py-10 w-full text-center">
        {isEditMode ? (
          <div className="lg:flex">
            <div className="pb-5 lg:pb-0 lg:pr-5">
              <Button type="dark" onClick={onSubmit}>
                {loadingStatus ? (
                  <>
                    <Spinner color={'text-white'} />
                    Сохранение
                  </>
                ) : (
                  <>
                    Сохранить
                  </>
                )}
              </Button>
            </div>
            <div>
              <Button type="light" onClick={cancelEditModeHandler}>
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <div className="lg:flex">
            <div className="pb-5 lg:pb-0 lg:pr-5">
              <Button type="light" onClick={editModeHandler}>
                Редактировать
              </Button>
            </div>
            <div>
              <Button type="dark" onClick={sendToCuttingHandler}>
                {sending ? <Spinner color={'text-white'} /> : ''}
                На резку
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="grid sm:gap-2 md:gap-1 lg:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 grid-flow-row ">

        {/* Name & Customer */}
        <div className="bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md mb-2 sm:mb-0">
          <div className="pb-4">
            <label htmlFor="" className="block text-xs font-medium text-gray-700" >
              Название
            </label>
            <input
              type="text"
              className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
              value={data.orderName || ''}
              onChange={e => setData({ ...data, orderName: e.target.value })}
              disabled={isEditMode ? false : true}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700" htmlFor="">
              Заказчик
            </label>
            <input
              type="text"
              className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
              value={data.customer || ''}
              onChange={e => setData({ ...data, customer: e.target.value })}
              disabled={isEditMode ? false : true}
            />
          </div>
        </div>

        {/* Date & Price */}
        <div className="bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md mb-2 sm:mb-0">
          <div className="pb-4">
            <div className="flex justify-around">
              <div className="w-[40%] md:w-[45%]">
                <label htmlFor="" className="block text-xs font-medium text-gray-700 mb-1" >
                  Дата приема
                </label>
                {isEditMode ? (
                  <input
                    type="date"
                    className="block w-full px-3 py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm xl:text-center"
                    value={data.receiveDate || ''}
                    onChange={e => setData({ ...data, receiveDate: e.target.value })}
                  />

                ) : (
                  <input
                    type="text"
                    className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm text-center"
                    value={dateFormatter(data.receiveDate) || ''}
                    onChange={e => setData({ ...data, receiveDate: e.target.value })}
                    disabled
                  />
                )}
              </div>

              <div className="w-[40%] md:w-[45%]">
                <label htmlFor="" className="block text-xs font-medium text-gray-700 mb-1" >
                  Дата отдачи
                </label>
                {isEditMode ? (
                  <input
                    type="date"
                    className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm xl:text-center"
                    value={data.handoverDate || ''}
                    onChange={e => setData({ ...data, handoverDate: e.target.value })}
                  />

                ) : (
                  <input
                    type="text"
                    className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm text-center"
                    value={dateFormatter(data.handoverDate) || ''}
                    onChange={e => setData({ ...data, handoverDate: e.target.value })}
                    disabled
                  />

                )}
              </div>
            </div>


            <div className="flex justify-around pt-4">
              <div className="px-2 xl:px-4">
                <label className="block text-[10px] xl:text-xs font-medium text-gray-700" htmlFor="">
                  Цена старт. $
                </label>
                <input
                  type="text"
                  className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm text-center"
                  value={data.priceStart || ''}
                  onChange={e => setData({ ...data, priceStart: priceFormatter(e.target.value) })}
                  disabled={isEditMode ? false : true}
                />
              </div>

              <div className="px-2 xl:px-4">
                {/*Enable for DEMO*/}
                {/*<label className="block text-[10px] xl:text-xs font-medium text-gray-700" htmlFor="">*/}
                {/*  Торг $*/}
                {/*</label>*/}
                {/*<input*/}
                {/*  type="text"*/}
                {/*  className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm text-center"*/}
                {/*  value={data.priceMiddle || ''}*/}
                {/*  onChange={e => setData({ ...data, priceMiddle: priceFormatter(e.target.value) })}*/}
                {/*  disabled={isEditMode ? false : true}*/}
                {/*/>*/}
              </div>
              <div className="px-2 xl:px-4">
                <label className="block text-[10px] xl:text-xs font-medium text-gray-700" htmlFor="">
                  Цена оконч. $
                </label>
                <input
                  type="text"
                  className="block w-full py-3 md:py-2 mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm text-center"
                  value={data.priceFinal || ''}
                  onChange={e => setData({ ...data, priceFinal: priceFormatter(e.target.value) })}
                  disabled={isEditMode ? false : true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Urgency */}
        {isEditMode ? (
          <div className="flex justify-center items-start bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md mb-2 sm:mb-0">
            <UrgencyCheckbox
              urgencyIndex={urgencyIndex}
              setUrgencyIndex={setUrgencyIndex}
            />
          </div>
        ) : (
          urgencyIndex !== 2 ? (
            <div className="flex justify-center items-start bg-white border border-border-main rounded-xl p-5 shadow-md mb-2 sm:mb-0">
              <span className="flex items-center text-base md:text-xs xl:text-sm text-red-500">
                {urgency && urgency[+urgencyIndex].label}
              </span>
            </div>
          ) : (
            <div className="hidden sm:flex justify-center items-start bg-white border border-border-main rounded-xl p-5 shadow-md mb-2 sm:mb-0">
              <span className="flex items-center text-base md:text-xs xl:text-sm text-red-500">
                {urgency && urgency[+urgencyIndex].label}
              </span>
            </div>
          )

        )}

        {/* Category & Status */}
        <div className="flex flex-col justify-evenly items-center bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md mb-2 sm:mb-0">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="">
              Категория
            </label>
            <CategorySelect
              isDisabled={isEditMode ? false : true}
              selectedCategory={categories[selectedCategory]}
              setSelectedCategory={e => setSelectedCategory(e.value)}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <label className="block text-xs font-medium text-gray-700 mb-1" htmlFor="">
              Состояние
            </label>
            <StatusSelect
              isDisabled={isEditMode ? false : true}
              selectedStatus={status[selectedStatus]}
              setSelectedStatus={e => setSelectedStatus(e.value)}
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md mb-2 sm:mb-0">
          <label className="block text-xs font-medium text-gray-700 mb-3" htmlFor="">
            Фото
          </label>
          <Gallery
            imagesFromDB={imagesFromDB}
            setImagesToUpload={setImagesToUpload}
            setImagesToDelete={setImagesToDelete}
          />

          {isEditMode ?
            (
              <>
                <p className="text-[10px] text-gray-500 mt-1">* Размер загружаемых изображений не должен превышать 2MB</p>
                <p className="text-[10px] text-gray-500 mt-1">** Допустимые форматы изображений .jpg, .jpeg, .png</p>
              </>
            )
            : ''
          }
        </div>

        {/* Other info */}
        <div className="bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md flex flex-col items-center mb-2 sm:mb-0">
          <div className="pb-4 ">
            <label htmlFor="" className="block text-xs font-medium text-gray-700" >
              Цвет металла
            </label>
            <input
              type="text"
              className="block mt-1 py-3 md:py-2 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
              value={data.metallColor || ''}
              onChange={e => setData({ ...data, metallColor: e.target.value })}
              disabled={isEditMode ? false : true}
            />
          </div>
          <div className="pb-4 ">
            <label htmlFor="" className="block text-xs font-medium text-gray-700" >
              Проба
            </label>
            <input
                type="text"
                className="block mt-1 py-3 md:py-2 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
                value={data.hallmark || ''}
                onChange={e => setData({ ...data, hallmark: e.target.value })}
                disabled={isEditMode ? false : true}
            />
          </div>
          <div className="pb-4">
            <label htmlFor="" className="block text-xs font-medium text-gray-700" >
              Параметры уха
            </label>
            <input
              type="text"
              className="block mt-1 py-3 md:py-2 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
              value={data.earParams || ''}
              onChange={e => setData({ ...data, earParams: e.target.value })}
              disabled={isEditMode ? false : true}
            />
          </div>
          <div className="pb-4">
            <label htmlFor="" className="block text-xs font-medium text-gray-700" >
              Размер кольца
            </label>
            <input
              type="text"
              className="block mt-1 py-3 md:py-2 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
              value={data.ringSize || ''}
              onChange={e => setData({ ...data, ringSize: e.target.value })}
              disabled={isEditMode ? false : true}
            />
          </div>
          <div className="pb-4">
            <label htmlFor="" className="block text-xs font-medium text-gray-700" >
              Вид швензы
            </label>
            <input
              type="text"
              className="block mt-1 py-3 md:py-2 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
              value={data.fastenerType || ''}
              onChange={e => setData({ ...data, fastenerType: e.target.value })}
              disabled={isEditMode ? false : true}
            />
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md mb-2 sm:mb-0">
          <label htmlFor="" className="block text-xs font-medium text-gray-700" >
            Примечание
          </label>
          <textarea
            type="text"
            rows="7"
            className="block w-full mt-1 rounded-md shadow-sm border-gray-300 focus:border-purple-600 focus:ring-purple-600 text-sm"
            value={data.comments || ''}
            onChange={e => setData({ ...data, comments: e.target.value })}
            disabled={isEditMode ? false : true}
          >
            {data.comments}
          </textarea>
        </div>

        {/* Files */}
        <div className="bg-white border border-border-main rounded-xl p-3 xl:p-5 shadow-md">
          <label htmlFor="" className="block text-xs font-medium text-gray-700 mb-1" >
            Файлы резки
          </label>
          <FilelistEditable
            files={files}
            setFilesToDelete={setFilesToDelete}
            setFilesToUpload={setFilesToUpload}
          />
        </div>


      </div >

      {/* Calculation */}
      <div className="my-5 w-full xl:w-3/4">
        <Calculation
          calculationData={calculationData}
          setCalculationData={setCalculationData}
        />
      </div>

      <div className="flex justify-start py-10">
        {isEditMode ? (
          <div className="flex">
            <div className="pr-5">
              <Button type="dark" onClick={onSubmit}>
                {loadingStatus ? (
                  <>
                    <Spinner color={'text-white'} />
                    Сохранение
                  </>
                ) : (
                  <>
                    Сохранить
                  </>
                )}
              </Button>
            </div>
            <div>
              <Button type="light" onClick={cancelEditModeHandler}>
                Отмена
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="pr-5">
              <Button type="light" onClick={editModeHandler}>
                Редактировать
              </Button>
            </div>
            <Button type="dark" onClick={sendToCuttingHandler}>
              {sending ? <Spinner color={'text-white'} /> : ''}
              На резку
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
