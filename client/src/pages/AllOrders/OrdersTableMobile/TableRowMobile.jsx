import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTelegram, FaDownload, FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { dateFormatter, renderUrgency, fileDownload } from "utils/utils";
import { categories, status } from "utils/consts";
import { fetchOrders, clearState, fraserStatusUpdate, quickOrderUpdate } from "store/OrdersSlice";
import ordersService from "services/orders.service";
import noFoto from "static/icons/nophoto.png";
import UrgencyCheckbox from "components/UI/Checkbox/UrgencyCheckbox";
import ActionButton from "components/UI/Button/ActionButton";
import QuickEditBlock from "components/QuickEditBlock/QuickEditBlock";
import CategorySelect from "components/UI/Select/CategorySelect";
import StatusSelect from "components/UI/Select/StatusSelect";
import Popup from "components/UI/Popup/Popup";
import DownloadFiles from "components/DownloadFiles/DownloadFiles";

import styles from "./OrdersTableMobile.module.scss";

const TableRowMobile = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentOrder = item.order_id;
  const { category } = useSelector(state => state.filter);
  const orderImage = useSelector(state =>
    state.orderImages.orderImages.find(
      image => image.order_id === item.order_id
    )
  );
  const [image, setImage] = useState("");
  const [date, setDate] = useState(item.handover_date || "");
  const [editOrderId, setEditOrderId] = useState(null);
  const [catIndex, setCatIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);
  const [urgencyIndex, setUrgencyIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [f, setFiles] = useState([]);

  useEffect(() => {
    setImage("");

    if (orderImage) {
      setImage(prevState => `../${orderImage.image_min}`);
    } else {
      setImage(prevState => noFoto);
    }
  }, [orderImage]);

  useEffect(() => {
    setCatIndex(Number(item.cat_index));
    setStatIndex(Number(item.stat_index));
    setUrgencyIndex(Number(item.urgency));
    setDate(item.handover_date || "");
  }, []);

  const onFileDownload = () => {
    fileDownload({ currentOrder, setFiles, setModal });
  };

  const handleEditClick = e => {
    setEditOrderId(e.currentTarget.id);
  };

  const handleCancelClick = () => {
    setEditOrderId(null);
  };

  const quickUpdateHandler = () => {
    const data = {
      order_id: +currentOrder,
      handover_date: date,
      cat_index: +catIndex,
      category_name: categories[catIndex].label,
      stat_index: +statIndex,
      status_name: status[statIndex].label,
      status_rate: +status[statIndex].rate,
      urgency: +urgencyIndex
    };

    dispatch(quickOrderUpdate({ data })).then(() => {
      setEditOrderId(null);
      dispatch(fetchOrders(category));
    });
  };

  const handleNavigate = () => {
    if (editOrderId !== item.order_id) {
      navigate(`/orders/order/${currentOrder}`);
    }
  };


  const orderDeleteHandler = e => {
    ordersService.deleteOrder(currentOrder).then(response => {
      setEditOrderId(null);
      dispatch(clearState());
      dispatch(fetchOrders(category));
    });
  };

  const sendToFraserHandler = () => {
    let image = "";
    if (orderImage) {
      image = orderImage.image_min;
    }

    ordersService.sendToFraser(currentOrder, image)
      .then(() => {
        setStatIndex(1);
        dispatch(fraserStatusUpdate(currentOrder));

        toast.success("Отправлено на резку!", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  return (
    <div className={styles.row}>

      <div className={styles.nameCell} onClick={handleNavigate}>
        <div className={styles.nameBlock}>
          <div style={{ fontWeight: '500' }}>{item.order_name}</div>
          <div>{item.customer}</div>
          <div>
            {item.hallmark && item.hallmark} {item.metall_color}
          </div>
        </div>
      </div>

      <div className={styles.imageCell} onClick={handleNavigate}>
        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
      </div>
      

      <div className={styles.statusCell}>
        <div className="mb-4">
          <StatusSelect
            isDisabled={editOrderId === item.order_id ? false : true}
            defaultValue={status[statIndex]}
            options={status}
            onChange={e => setStatIndex(e.value)}
          />
        </div>

        <div className="mb-4">
          <CategorySelect
            isDisabled={editOrderId === item.order_id ? false : true}
            defaultValue={categories[catIndex]}
            options={categories}
            onChange={e => setCatIndex(e.value)}
          />
        </div>

        <div className="mb-3">
          {editOrderId === item.order_id ? (
            <UrgencyCheckbox
              urgencyIndex={urgencyIndex}
              setUrgencyIndex={setUrgencyIndex}
            // onChange={e => onCheckboxChange(e.target.value)}
            />
          ) : (
            <span className={styles.urgency}>
              <label>{renderUrgency(+item.urgency)}</label>
            </span>
          )}
        </div>

        <div>
          {editOrderId === item.order_id ? (
            <input
              className={styles.handoverDateInput}
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          ) : (
            <span>
              {dateFormatter(item.handover_date)}
            </span>
          )}
        </div>

      </div>

      <div className={styles.actionCell}>
        <ActionButton onClick={sendToFraserHandler} id={item.order_id}>
          <FaTelegram className={styles.telegram} />
        </ActionButton>

        <Popup visible={modal} setVisible={setModal}>
          <DownloadFiles setVisible={setModal} files={f} />
        </Popup>
        {item.is_file_exists == 1 && editOrderId !== item.order_id ? (
          <ActionButton onClick={onFileDownload} id={item.order_id}>
            <FaDownload className={styles.download} />
          </ActionButton>
        ) : (
          ""
        )}

        {editOrderId === item.order_id ? (
          <QuickEditBlock
            handleCancelClick={handleCancelClick}
            quickUpdateHandler={quickUpdateHandler}
            orderDeleteHandler={orderDeleteHandler}
          />
        ) : (
          <ActionButton onClick={handleEditClick} id={item.order_id}>
            <FaPencilAlt className={styles.edit} />
          </ActionButton>
        )}
      </div>

    </div>
  );
};

export default TableRowMobile;
