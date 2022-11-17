import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  FaTelegram,
  FaDownload,
  FaPencilAlt,
  FaBolt,
  FaExclamationCircle
} from "react-icons/fa";

import GoBackButton from "components/UI/Button/GoBackButton";
import Button from "components/UI/Button/Button";
import UrgencyCheckbox from "components/UI/Checkbox/UrgencyCheckbox";
import CategorySelect from "components/UI/Select/CategorySelect";
import StatusSelect from "components/UI/Select/StatusSelect";
import Gallery from "components/Gallery/Gallery";
import FileList from "../FileList/FileList";
import Calculation from "../Calculation/Calculation";

import { fetchOrderByID, fraserStatusUpdate } from "store/OrdersSlice";
import { fetchCuttingFilesById } from "store/CuttingFilesSlice";
import { fetchRhinoFilesById } from "store/RhinoFilesSlice";
import { fetchOrderImages } from "store/OrderImagesSlice";
import {
  fetchCalculationByID,
  clearCalculation
} from "store/CalculationSlice";
import ordersService from "services/orders.service";
import calculationService from "services/calculation.service";
import { categories, status } from "utils/consts";
import { dateFormatter, renderUrgency } from "utils/utils";

import styles from "./OrderPageMobile.module.scss";
import CalculationMobile from "../Calculation/CalculationMobile";

const OrderPageMobile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { order } = useSelector(state => state.orders);
  const { rhinoFiles } = useSelector(state => state.rhinoFiles);
  const { cuttingFiles } = useSelector(state => state.cuttingFiles);
  const orderImagesByID = useSelector(state =>
    state.orderImages.orderImages.filter(image => image.order_id == id)
  );

  const [orderName, setOrderName] = useState('');
  const [customer, setCustomer] = useState('');
  const [receiveDateInput, setReceiveDateInput] = useState('');
  const [receiveDateText, setReceiveDateText] = useState('');
  const [handoverDateInput, setHandoverDateInput] = useState('');
  const [handoverDateText, setHandoverDateText] = useState('');
  const [price1, setPrice1] = useState('');
  const [price2, setPrice2] = useState('');
  const [price3, setPrice3] = useState('');
  const [urgencyIndex, setUrgencyIndex] = useState(0);
  const [catIndex, setCatIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);

  const [metallColor, setMetallColor] = useState('');
  const [earParams, setEarParams] = useState('');
  const [ringSize, setRingSize] = useState('');
  const [comments, setComments] = useState('');
  const [isEditMode, setEditMode] = useState(false);

  const [imagesFromDB, setImagesFromDB] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [rhinoFilesFromDB, setRhinoFilesFromDB] = useState([]);
  const [rhinoFilesToUpload, setRhinoFilesToUpload] = useState([]);
  const [rhinoFilesToDelete, setRhinoFilesToDelete] = useState([]);

  const [cuttingFilesFromDB, setCuttingFilesFromDB] = useState([]);
  const [cuttingFilesToUpload, setCuttingFilesToUpload] = useState([]);
  const [cuttingFilesToDelete, setCuttingFilesToDelete] = useState([]);

  const [calculation, setCalculation] = useState([]);
  console.log(urgencyIndex);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    // console.log(cuttingFilesToDelete);

  }, [cuttingFilesToDelete]);

  useEffect(() => {
    dispatch(fetchOrderByID(id));
    dispatch(fetchRhinoFilesById(id));
    dispatch(fetchCuttingFilesById(id));
    dispatch(fetchOrderImages());
    dispatch(fetchCalculationByID(id));

    return () => {
      dispatch(clearCalculation());
    }
  }, [isEditMode]);

  useEffect(() => {
    cuttingFiles &&
      cuttingFiles.map(file => {
        setCuttingFilesFromDB(prevState => [
          ...prevState,
          {
            file_id: file.file_id,
            file_name: file.file_name,
            file_unique_name: file.file_unique_name,
            file_path: file.file_path
          }
        ]);
      });

    return () => {
      setCuttingFilesFromDB([]);
    }
  }, [cuttingFiles, isEditMode])

  useEffect(() => {
    rhinoFiles &&
      rhinoFiles.map(file => {
        setRhinoFilesFromDB(prevState => [
          ...prevState,
          {
            file_id: file.file_id,
            file_name: file.file_name,
            file_unique_name: file.file_unique_name,
            file_path: file.file_path
          }
        ]);
      });

    return () => {
      setRhinoFilesFromDB([]);
    }
  }, [rhinoFiles, isEditMode]);

  useEffect(() => {
    setImagesFromDB(prevSate => orderImagesByID);

    setOrderName(order.order_name);
    setCustomer(order.customer);
    setPrice1(order.price_1);
    setPrice2(order.price_2);
    setPrice3(order.price_3);

    setReceiveDateText(dateFormatter(order.receive_date));
    setHandoverDateText(dateFormatter(order.handover_date));
    setReceiveDateInput(order.receive_date || "");
    setHandoverDateInput(order.handover_date || "");
    setUrgencyIndex(+order.urgency);
    setCatIndex(+order.cat_index);
    setStatIndex(+order.stat_index);
    setMetallColor(order.metall_color);
    setEarParams(order.ear_params);
    setRingSize(order.ring_size);
    setComments(order.comments);

  }, [isEditMode, order]);


  const onCatSelectChange = e => {
    setCatIndex(e.value);
  };

  const onStatSelectChange = e => {
    setStatIndex(e.value);
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const handleCancelEditMode = () => {
    setEditMode(false);
  };

  const updateOrderHandler = () => {
    // console.log(cuttingFilesFromDB);
    // console.log(cuttingFilesToUpload);

    let isFileExists = 0;
    if (cuttingFilesToUpload.length != 0 || cuttingFilesFromDB != 0) {
      isFileExists = 1;
      console.log('file exists');
    }

    let hallmark = '';
    calculation.map(item => {
      if (item.hallmark !== '') {
        hallmark = item.hallmark
      }
    })

    const data = {
      id,
      orderName,
      customer,
      receiveDateInput,
      handoverDateInput,
      price1,
      price2,
      price3,
      urgencyIndex,
      catIndex,
      categoryName: categories[catIndex].label,
      statIndex,
      statusName: status[statIndex].label,
      statusRate: status[statIndex].rate,
      hallmark,
      metallColor,
      earParams,
      ringSize,
      comments,
      isFileExists
    };

    if (imagesToDelete.lenght != 0) {
      ordersService.deleteImages(imagesToDelete);
    }

    if (rhinoFilesToDelete.length != 0) {
      ordersService.deleteRhinoFiles(rhinoFilesToDelete);
    }

    if (rhinoFilesToUpload != 0) {
      ordersService.uploadRhinoFiles(rhinoFilesToUpload, id);
    }

    if (cuttingFilesToDelete.length != 0) {
      // console.log(cuttingFilesToDelete);

      ordersService.deleteCuttingFiles(cuttingFilesToDelete);
    }

    if (cuttingFilesToUpload != 0) {
      ordersService.uploadCuttingFiles(cuttingFilesToUpload, id);
    }

    ordersService.updateOrder(data)
      .then(() => {
        if (imagesToUpload.length != 0) {
          ordersService.uploadImages(imagesToUpload, id)
            .then(() => {
              dispatch(fetchOrderImages());
            })
        }
        calculationService.updateCalculation(calculation, id);
      })
      .then(() => {
        setImagesFromDB([]);
        setImagesToDelete([]);
        setImagesToUpload([]);

        setRhinoFilesFromDB([]);
        setRhinoFilesToDelete([]);
        setRhinoFilesToUpload([]);

        setCuttingFilesFromDB([]);
        setCuttingFilesToDelete([]);
        setCuttingFilesToUpload([]);

        setEditMode(false);
      })

  };

  const handleGoBack = () => {
    navigate(-1);
  }

  const sendToFraserHandler = () => {
    console.log(orderImagesByID[0].image_min);

    let image = "";
    if (orderImagesByID[0]) {
      image = orderImagesByID[0].image_min;
    }

    ordersService.sendToFraser(id, image)
      .then(() => {
        setStatIndex(1);
        dispatch(fraserStatusUpdate(id));
        toast.success("Отправлено на резку!", {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  return (
    <div className="container-fluid">
      <div style={{ margin: '20px 0 40px 0' }}>
        {isEditMode ? (
          <div>
            <Button type="dark" onClick={updateOrderHandler} margin={"my-4"}>
              Сохранить
            </Button>
            <Button type="light" onClick={handleCancelEditMode}>
              Отмена
            </Button>
          </div>
        ) : (
          <div>
            <Button type="dark" onClick={handleEditMode} margin={"my-4"}>
              Редактировать
            </Button>
            <Button type="light" onClick={sendToFraserHandler}>
              На резку
            </Button>
          </div>
        )}
      </div>

      <div className={styles.wrapper}>
        {urgencyIndex === 3 ? (
          ''
        ) : (
          <div className="d-flex justify-content-center align-items-start">
            {isEditMode ? (
              <UrgencyCheckbox
                urgencyIndex={urgencyIndex}
                setUrgencyIndex={setUrgencyIndex}
              />
            ) : (
              <span className={styles.urgency}>
                <label>{renderUrgency(urgencyIndex)}</label>
              </span>
            )}
          </div>
        )}




        <div className={styles.name}>
          <label className="data-block__label" htmlFor="">
            Название
          </label>
          <input
            type="text"
            className="mb-3 w-100"
            value={orderName}
            onChange={e => setOrderName(e.target.value)}
            disabled={isEditMode ? false : true}
          />
          <label className="data-block__label" htmlFor="">
            Заказчик
          </label>
          <input
            type="text"
            className="w-100"
            value={customer}
            onChange={e => setCustomer(e.target.value)}
            disabled={isEditMode ? false : true}
          />
        </div>

        <div className="d-flex justify-content-around">
          <div>
            <label htmlFor="order-category__select">Категория</label>
            <CategorySelect
              isDisabled={isEditMode ? false : true}
              defaultValue={categories[catIndex]}
              options={categories}
              onChange={onCatSelectChange}
            />
          </div>

          <div>
            <label htmlFor="order-category__select">Состояние</label>
            <StatusSelect
              isDisabled={isEditMode ? false : true}
              defaultValue={status[statIndex]}
              value={statIndex}
              options={status}
              onChange={onStatSelectChange}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 d-flex justify-content-around">
            <div>
              <label htmlFor="handover-date_input">Дата приема</label>
              {isEditMode ? (
                <input
                  className={styles.date}
                  type="date"
                  value={receiveDateInput || ""}
                  onChange={e => setReceiveDateInput(e.target.value)}
                />
              ) : (
                <input
                  className={styles.date}
                  type="text"
                  value={receiveDateText || ""}
                  disabled
                />
              )}
            </div>
            <div>
              <label htmlFor="handover-date_input">Дата отдачи</label>
              {isEditMode ? (
                <input
                  className={styles.date}
                  type="date"
                  value={handoverDateInput || ""}
                  onChange={e => setHandoverDateInput(e.target.value)}
                />
              ) : (
                <input
                  className={styles.date}
                  type="text"
                  value={handoverDateText || ""}
                  disabled
                />
              )}
            </div>
          </div>

          <div className="d-flex justify-content-around">
            <div>
              <label htmlFor="">Цена</label>
              <input
                className={styles.price}
                type="text"
                value={price1}
                onChange={e => setPrice1(e.target.value)}
                disabled={isEditMode ? false : true}
              />
            </div>
            <div>
              <label htmlFor="">Цена</label>
              <input
                className={styles.price}
                type="text"
                value={price2}
                onChange={e => setPrice2(e.target.value)}
                disabled={isEditMode ? false : true}
              />
            </div>
            <div>
              <label htmlFor="">Цена</label>
              <input
                className={styles.price}
                type="text"
                value={price3}
                onChange={e => setPrice3(e.target.value)}
                disabled={isEditMode ? false : true}
              />
            </div>
          </div>
        </div>

        <div>
          <Gallery
            isEditMode={isEditMode}
            imagesFromDB={orderImagesByID}
            setImagesFromDB={setImagesFromDB}
            imagesToUpload={imagesToUpload}
            setImagesToUpload={setImagesToUpload}
            imagesToDelete={imagesToDelete}
            setImagesToDelete={setImagesToDelete}
          />
        </div>

        <div className={styles.otherInfo}>
          <div style={{ alignSelf: "start" }}>
            <div className={styles.otherParams}>
              <div>
                <label htmlFor="">Цвет металла</label>
                <input
                  type="text"
                  value={metallColor}
                  onChange={e => setMetallColor(e.target.value)}
                  disabled={isEditMode ? false : true}
                />
              </div>
              <div>
                <label htmlFor="">Параметры уха</label>
                <input
                  type="text"
                  value={earParams}
                  onChange={e => setEarParams(e.target.value)}
                  disabled={isEditMode ? false : true}
                />
              </div>
              <div>
                <label htmlFor="">Размер кольца</label>
                <input
                  type="text"
                  value={ringSize}
                  onChange={e => setRingSize(e.target.value)}
                  disabled={isEditMode ? false : true}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.comments}>
          <label htmlFor="">Примечание</label>
          <textarea
            rows="8"
            value={comments}
            onChange={e => setComments(e.target.value)}
            disabled={isEditMode ? false : true}
          >
            {comments}
          </textarea>
        </div>

        <div>
          <FileList
            title={"Rhino файлы"}
            files={rhinoFilesFromDB}
            setFilesToDelete={setRhinoFilesToDelete}
            setFiles={setRhinoFilesToUpload}
            isDisabled={isEditMode ? false : true}
          />
          <div style={{ marginTop: "30px" }}>
            <FileList
              title={"Файлы резки"}
              files={cuttingFilesFromDB}
              setFilesToDelete={setCuttingFilesToDelete}
              setFiles={setCuttingFilesToUpload}
              isDisabled={isEditMode ? false : true}
            />
          </div>
        </div>

      </div>

      <div id="calculation" className="my-5">
        <CalculationMobile
          calculation={calculation}
          setCalculation={setCalculation}
          isDisabled={isEditMode ? false : true}
        />
      </div>

      <div style={{ height: '50vh' }}>
        {isEditMode ? (
          <div>
            <Button type="dark" onClick={updateOrderHandler} margin={"my-4"}>
              Сохранить
            </Button>
            <Button type="light" onClick={handleCancelEditMode}>
              Отмена
            </Button>
          </div>
        ) : (
          <div>
            <Button type="dark" onClick={handleEditMode} margin={"my-4"}>
              Редактировать
            </Button>
            <Button type="light" onClick={sendToFraserHandler}>
              На резку
            </Button>
          </div>
        )}
      </div>

    </div>
  );
};

export default OrderPageMobile;
