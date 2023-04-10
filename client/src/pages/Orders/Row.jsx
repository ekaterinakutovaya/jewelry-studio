import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBolt, FaExclamationCircle, FaTelegram, FaDownload, FaPencilAlt } from "react-icons/fa";

import noPhoto from "@/assets/nophoto.png";
import { dateFormatter, downloadFile } from "@/utils/utils";
import { categories, status } from "@/utils/consts";
import ordersService from "@/services/orders.service";
import { orderStatusUpdate, quickOrderUpdate, deleteOrder } from "@/store/OrdersSlice";

import { Modal, CategorySelect, StatusSelect, DatePicker, Button, QuickEditButtons, QuickEditButtonsMobile, UrgencyCheckbox, Highlighted } from '@/components';

const urgency = [
  { index: 0, label: <><FaBolt />&nbsp;Очень срочный</> },
  { index: 1, label: <><FaExclamationCircle />&nbsp;Срочный</> },
  { index: 2, label: '' }
]

const Row = ({ order }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { files } = useSelector(state => state.files);
  const { searchValue } = useSelector(state => state.filter);
  const orderImage = useSelector(state => state.images.images.find(image => image.orderId === order.orderId));

  const [image, setImage] = useState('');
  const [handoverDate, setHandoverDate] = useState('');
  const [editOrderId, setEditOrderId] = useState(null);
  const [urgencyIndex, setUrgencyIndex] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState(0);
  const [filesData, setFilesData] = useState([]);
  const [modal, setModal] = useState(false);

  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFilesData(files && files.filter(file => file.orderId === order.orderId));
  }, [files])

  useEffect(() => {
    setUrgencyIndex(+order.urgencyIndex);
  }, [order])

  useEffect(() => {
    setHandoverDate(order.handoverDate || "")
    setUrgencyIndex(+order.urgencyIndex)
    setSelectedCategory(+order.catIndex)
    setSelectedStatus(+order.statIndex)
  }, [editOrderId]);


  useEffect(() => {
    if (orderImage) {
      setImage(`../${orderImage.imageMin}`)
    } else {
      setImage(noPhoto);
    }
  }, [orderImage]);


  const fileDownloadHandler = () => {
    filesData.length > 1
      ? setModal(true)
      : downloadFile(filesData[0]);
  }

  const editModeHandler = () => {
    setEditOrderId(order.orderId);
  };

  const cancelEditModeHandler = () => {
    setEditOrderId(null);
  };

  const saveHandler = () => {
    setSaving(true);
    const data = {
      orderId: order.orderId,
      handoverDate,
      catIndex: selectedCategory,
      categoryName: categories[selectedCategory].label,
      statIndex: selectedStatus,
      statusName: status[selectedStatus].label,
      statusRate: status[selectedStatus].rate,
      urgencyIndex
    }

    dispatch(quickOrderUpdate({ data }))
      .then(() => {
        setTimeout(() => {
          setSaving(false);
          setEditOrderId(null);
        }, 500)
      });

    
  }

  const navigateHandler = () => {
    if (editOrderId !== order.orderId) {
      navigate(`/orders/order/${order.orderId}`);
    }
  }

  const deleteHandler = () => {
    dispatch(deleteOrder(order.orderId))
      .then(() => {
          toast.success("Запись удалена!", {
            position: toast.POSITION.TOP_CENTER
          });
          setEditOrderId(null);
      })
  }

  // Send order for cutting via Telegram bot and change order status
  const sendToCuttingHandler = () => {
    setSending(true);
    ordersService.sendToCutting(order.orderId, image)
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

  // if there is no cutting file, don't show button
  const fileButton = filesData && filesData.length ?
    <div onClick={e => e.stopPropagation()}>
      <Button type="icon" onClick={fileDownloadHandler}>
        <FaDownload className="text-lg md:text-base lg:text-sm xl:text-base" />
      </Button>
    </div> : '';

  return (
    <div className="relative grid gap-2.5 lg:gap-0 grid-cols-2 md:grid-cols-[0.2fr,0.7fr,1.1fr,1.1fr,1.1fr,1.1fr,1.1fr,1.1fr,0.5fr,0.5fr,0.5fr] bg-white md:border-b border-border-main mb-10 md:mb-0 rounded-[20px] md:rounded-none shadow-2xl md:shadow-none px-4 sm:px-10 md:px-8 lg:px-4 py-10 sm:py-12 lg:py-8 md:hover:bg-gray-50 md:cursor-pointer"
      onClick={navigateHandler}
    >
      <div className="hidden md:flex items-center lg:text-[8px] xl:text-[10px] md:order-0 xl:cursor-pointer"
      >
        <Highlighted text={order.orderId} highlight={searchValue} />
      </div>

      <div className="flex items-left md:items-center justify-center order-0 md:order-1 mb-6 md:mb-0 xl:cursor-pointer">
        <div className="max-w-[95px] max-h-[95px] sm:max-w-[150px] sm:max-h-fit lg:max-w-[75px] xl:max-w-[95px] flex items-center rounded-lg overflow-hidden border border-border-main">
          <img src={image} alt="order" />
        </div>
      </div>

      <div className="flex items-center md:col-span-1 order-1 md:order-2 mb-6 md:mb-0 xl:cursor-pointer">
        <div className="md:ml-4 xl:ml-4 flex flex-col justify-around md:h-full">
          <div className="mb-3 md:mb-0 font-semibold text-base md:text-sm lg:text-xs xl:text-sm">
            <Highlighted text={order.orderName} highlight={searchValue}/>
          </div>
          <div className="text-sm sm:text-base lg:text-xs xl:text-sm">
            <Highlighted text={order.customer} highlight={searchValue} />
          </div>
        </div>
      </div>


      <div className="flex items-center md:justify-center  text-sm sm:text-base md:text-xs xl:text-sm col-span-2 md:col-span-1 order-3 md:order-3 md:px-0 mb-6 md:mb-0 xl:cursor-pointer">
        <label htmlFor="" className="block md:hidden w-1/2 text-xs sm:text-sm font-medium text-gray-700 text-right mr-2 sm:mr-4" >
          Проба/цвет металла:
        </label>
        <div className="w-1/2 md:w-auto">
          {order.hallmark && order.hallmark} {order.metallColor}
        </div>
      </div>

      <div className="flex items-center md:justify-center col-span-2 md:col-span-1 order-4 md:order-4 mb-6 md:mb-0 xl:cursor-pointer">
        <label htmlFor="" className="block md:hidden w-1/2 text-xs sm:text-sm font-medium text-gray-700 text-right mr-2 sm:mr-4" >
          Дата отдачи:
        </label>
        {editOrderId === order.orderId ? (
          <div className="w-1/2 md:w-auto">
            <DatePicker
              value={handoverDate}
              onChange={e => setHandoverDate(e.target.value)}
            />
          </div>

        ) : (
          <span className="w-1/2 md:w-auto text-sm sm:text-base md:text-xs xl:text-sm">
            {dateFormatter(order.handoverDate)}
          </span>
        )}
      </div>


      {editOrderId === order.orderId ? (
        <div className="flex items-center justify-center col-span-2 md:col-span-1 order-5 md:order-5 mb-6 md:mb-0">
          <UrgencyCheckbox
            urgencyIndex={urgencyIndex}
            setUrgencyIndex={setUrgencyIndex}
          />
        </div>
      ) : (
        <div className="absolute top-2 right-3 md:static md:flex items-center justify-center col-span-2 md:col-span-1 order-5 md:order-5 mb-6 md:mb-0 xl:cursor-pointer"
        // onClick={navigateHandler}
        >
          <span className=" flex items-center text-base md:text-xs xl:text-sm text-red-500">
            {urgency && urgency[+order.urgencyIndex].label}
          </span>
        </div>
      )}

      <div
        className="flex items-center justify-center col-span-2 md:col-span-1 order-6 md:order-7 mb-6 md:mb-0 sm:px-4"
      >
        <CategorySelect
          isDisabled={editOrderId === order.orderId ? false : true}
          selectedCategory={categories[selectedCategory]}
          setSelectedCategory={e => setSelectedCategory(e.value)}
        />
      </div>
      <div className="flex items-center md:border-r justify-center col-span-2 md:col-span-1 order-7 md:order-8 mb-6 md:mb-0 sm:px-4">
        <StatusSelect
          isDisabled={editOrderId === order.orderId ? false : true}
          selectedStatus={status[selectedStatus]}
          setSelectedStatus={e => setSelectedStatus(e.value)}
        />
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-evenly sm:mx-auto w-full sm:w-2/3 col-span-2 md:col-span-1  border-0 md:border-r order-8 md:order-9" onClick={e => e.stopPropagation()}>

        {editOrderId === order.orderId ? (
          <QuickEditButtonsMobile
            cancelEditModeHandler={cancelEditModeHandler}
            saveHandler={saveHandler}
            deleteHandler={deleteHandler}
            saving={saving}
          />
        ) : (
          <>
            <Button type="icon" onClick={sendToCuttingHandler}>
                {sending ? (
                  <FaTelegram className="text-lg md:text-base lg:text-sm xl:text-base animate-bounce" />
                ) : (
                  <FaTelegram className="text-lg md:text-base lg:text-sm xl:text-base" />
                )}
            </Button>
            <div className="flex md:hidden items-center justify-center order-9 md:order-10">
              {fileButton}
            </div>

            <div className="flex md:hidden items-center justify-center order-10 md:order-11">
              <Button type="icon" onClick={editModeHandler}>
                <FaPencilAlt className="text-lg md:text-base" />
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center justify-center md:order-8 md:border-r" onClick={e => e.stopPropagation()}>
        <Button type="icon" onClick={sendToCuttingHandler}>
          {sending ? (
            <FaTelegram className="text-lg md:text-base lg:text-sm xl:text-base animate-bounce" />
          ) : (
            <FaTelegram className="text-lg md:text-base lg:text-sm xl:text-base" />
          )}

        </Button>
      </div>

      {editOrderId === order.orderId ? (
        <>
          <QuickEditButtons
            cancelEditModeHandler={cancelEditModeHandler}
            saveHandler={saveHandler}
            deleteHandler={deleteHandler}
            saving={saving}
          />
        </>
      ) : (
        <>
          <div className="hidden md:flex items-center justify-center border-r order-9 md:order-10"
            onClick={editModeHandler}
          >
            {fileButton}
          </div>

          <div className="hidden md:flex items-center justify-center order-10 md:order-11"
            onClick={e => e.stopPropagation()}
          >
            <Button type="icon" onClick={editModeHandler}>
              <FaPencilAlt className="text-lg md:text-base lg:text-sm xl:text-base" />
            </Button>
          </div>
        </>
      )}



      <Modal modal={modal} setModal={setModal} files={filesData} />
    </div>
  );
};

export default Row;