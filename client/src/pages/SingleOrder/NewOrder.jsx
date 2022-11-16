import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { categories, status } from "utils/consts";
import {
  FaTelegram,
  FaDownload,
  FaPencilAlt,
  FaBolt,
  FaExclamationCircle
} from "react-icons/fa";
import CategorySelect from "components/UI/Select/CategorySelect";
import StatusSelect from "components/UI/Select/StatusSelect";
import Button from "components/UI/Button/Button";
import UrgencyCheckbox from "components/UI/Checkbox/UrgencyCheckbox";
import GoBackButton from "components/UI/Button/GoBackButton";
import Gallery from "components/Gallery/Gallery";
// import FileList from "./FilesList/FileList";
import NewCalculation from "./Calculation/NewCalculation";

import ordersService from "services/orders.service";
import calculationService from "services/calculation.service";
import { fetchOrderImages } from "store/OrderImagesSlice";

import styles from "./OrderPage/OrderPage.module.scss";


const NewOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("");
  const [receiveDateInput, setReceiveDateInput] = useState('');
  const [handoverDateInput, setHandoverDateInput] = useState("");
  const [price1, setPrice1] = useState("");
  const [price2, setPrice2] = useState("");
  const [price3, setPrice3] = useState("");
  const [urgencyIndex, setUrgencyIndex] = useState(3);
  const [catIndex, setCatIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);

  const [imagesFromDB, setImagesFromDB] = useState([]);
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const [metallColor, setMetallColor] = useState("");
  const [earParams, setEarParams] = useState("");
  const [ringSize, setRingSize] = useState("");

  const [comments, setComments] = useState("");

  const [rhinoFiles, setRhinoFiles] = useState([]);
  const [cuttingFiles, setCuttingFiles] = useState([]);

  const [calculation, setCalculation] = useState([]);

  useEffect(() => {
    const today = new Date();
    const date = today.setDate(today.getDate());
    const defaultValue = new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd
    setReceiveDateInput(defaultValue);
  }, []);

  const onCatSelectChange = e => {
    setCatIndex(e.value);
  };

  const onStatSelectChange = e => {
    setStatIndex(e.value);
  };

  const onSubmit = () => {
    let isFileExists = 0;
    if (cuttingFiles.length != 0) {
      isFileExists = 1;
    }

    let hallmark = '';
    calculation.map(item => {
     if (item.hallmark !== '') {
       hallmark = item.hallmark
     }
    
    })
    
    const data = {
      order_name: title,
      customer: customer,
      receive_date: receiveDateInput,
      handover_date: handoverDateInput,
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

    ordersService
      .createOrder({ data })
      .then(response => {
        const lastInsertId = response.data.id;

        if (imagesToUpload.length != 0) {
          ordersService.uploadImages(imagesToUpload, lastInsertId)
            .then(() => {
              dispatch(fetchOrderImages());
            })
        }

        if (rhinoFiles != 0) {
          ordersService.uploadRhinoFiles(rhinoFiles, lastInsertId);
        }

        if (cuttingFiles != 0) {
          ordersService.uploadCuttingFiles(cuttingFiles, lastInsertId);
        }

        if (calculation.length != 0) {
          calculationService.createCalculation(calculation, lastInsertId);
        }

        return lastInsertId;
      })
      .then(() => {
          navigate(`/orders`);
      });
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="container-fluid">
      <div className="row my-5 justify-content-between">
        <div>
          <GoBackButton handleGoBack={handleGoBack} />
        </div>
        <div>
          <Button type="dark" margin={"mx-4"} onClick={onSubmit}>
            Сохранить
          </Button>
          <Button type="light" onClick={() => navigate(-1)}>
            Отмена
          </Button>
        </div>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.name}>
          <div>
            <label className="data-block__label" htmlFor="">
              Название
            </label>
            <input
              type="text"
              className="mb-3 w-100"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label className="data-block__label" htmlFor="">
              Заказчик
            </label>
            <input
              type="text"
              className="w-100"
              value={customer}
              onChange={e => setCustomer(e.target.value)}
            />
          </div>
        </div>

        <div>
          <div className="mb-4 d-flex justify-content-around">
            <div>
              <label htmlFor="handover-date_input">Дата приема</label>

              <input
                className={styles.date}
                type="date"
                value={receiveDateInput || ""}
                onChange={e => setReceiveDateInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="handover-date_input">Дата отдачи</label>
              <input
                className={styles.date}
                type="date"
                value={handoverDateInput || ""}
                onChange={e => setHandoverDateInput(e.target.value)}
              />
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
              />
            </div>
            <div>
              <label htmlFor="">Цена</label>
              <input
                className={styles.price}
                type="text"
                value={price2}
                onChange={e => setPrice2(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="">Цена</label>
              <input
                className={styles.price}
                type="text"
                value={price3}
                onChange={e => setPrice3(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-start">
          <UrgencyCheckbox
            urgencyIndex={urgencyIndex}
            setUrgencyIndex={setUrgencyIndex}
          />
        </div>

        <div className="d-flex justify-content-around">
          <div>
            <label htmlFor="order-category__select">Категория</label>
            <CategorySelect
              isDisabled={false}
              defaultValue={categories[catIndex]}
              options={categories}
              onChange={onCatSelectChange}
            />
          </div>

          <div>
            <label htmlFor="order-category__select">Состояние</label>
            <StatusSelect
              isDisabled={false}
              defaultValue={status[statIndex]}
              value={statIndex}
              options={status}
              onChange={onStatSelectChange}
            />
          </div>
        </div>

        <div>
          <Gallery
            imagesFromDB={imagesFromDB}
            setImagesFromDB={setImagesFromDB}
            imagesToUpload={imagesToUpload}
            setImagesToUpload={setImagesToUpload}
            isEditMode={true}
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
                />
              </div>
              <div>
                <label htmlFor="">Параметры уха</label>
                <input
                  type="text"
                  value={earParams}
                  onChange={e => setEarParams(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Размер кольца</label>
                <input
                  type="text"
                  value={ringSize}
                  onChange={e => setRingSize(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.inserts}>
          <div className={styles.comments}>
            <label htmlFor="">Примечание</label>
            <textarea
              rows="5"
              value={comments}
              onChange={e => setComments(e.target.value)}
            >
              {comments}
            </textarea>
          </div>
        </div>

        <div>
          {/* <FileList
            title={"Rhino файлы"}
            setFiles={setRhinoFiles}
            isDisabled={false}
          />

          <div style={{ marginTop: "50px" }}>
            <FileList
              title={"Файлы резки"}
              setFiles={setCuttingFiles}
              isDisabled={false}
            />
          </div> */}
        </div>
      </div>

      <div id="calculation" className="my-5 w-75">
        <NewCalculation
          calculation={calculation}
          setCalculation={setCalculation}
        />
      </div>
    </div>
  );
};

export default NewOrder;
