import { API_URL } from "utils/consts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateCalculation } from "store/CalculationSlice";
import ordersService from "services/orders.service";

import { FaBolt, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";

import store from "store/store";

export function dateFormatter(date) {
    if (date !== null) {
        return new Date(date).toLocaleString("ru").slice(0, 10);
    }
    
}

export function currencyFormatter(num) {
    let formatter = new Intl.NumberFormat("ru", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return formatter.format(num);
}

export function numberFormatter(num, minimumFractionDigits, maximumFractionDigits) {
    let formatter = new Intl.NumberFormat("ru", {
        style: 'decimal',
        minimumFractionDigits,
        maximumFractionDigits
    });

    return formatter.format(num);
}

export const renderUrgency = urgencyIndex => {
    switch (urgencyIndex) {
        case 1:
            return (
                <>
                    <FaBolt style={{ fontSize: "12px" }} />
                    &nbsp;Очень срочный
          </>
            );
        case 2:
            return (
                <>
                    <FaExclamationCircle style={{ fontSize: "12px" }} />
                    &nbsp;Срочный
          </>
            );
        default:
            return "";
    }
};

export const fileDownload = ({currentOrder, setFiles, setModal}) => {
    fetch(
        API_URL + `/fetch_cutting_file_by_id.php?order_id=${currentOrder}`
    )
        .then(response => {
            return response.json();
        })
        .then(data => {
            let files = data.data;
            if (files.length > 1) {
                setFiles(files);
                setModal(true);
            } else {
                let a = document.createElement("a");
                a.href = files[0].file_path + files[0].file_unique_name;
                a.download = files[0].file_name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
}

export const sendToFraser = ({ orderImage, currentOrder, setStatIndex }) => {
    let image = "";
    if (orderImage) {
        image = orderImage.image_min;
    }

    ordersService.sendToCutting(currentOrder, image)
        .then((response) => {
            setStatIndex(1);
            // dispatch(cuttingStatusUpdate(currentOrder));

            toast.success("Отправлено на резку!", {
                position: toast.POSITION.TOP_CENTER
            });

            return response;
        });
}

export const setGemsPrice = ({ index, values, prices, carats, setValues }) => {

    if (values.size !== '') {
        setValues(values => ({
            ...values,
            unit: 'шт.',
        }));
        store.dispatch(
            updateCalculation({ name: "unit", value: "шт.", index: index })
        );
    }

    if (
        (values.name.toLowerCase() === "бриллиант" ||
            values.name.toLowerCase() === "бриллианты") &&
        (+values.size > 0.85 && +values.size <= 7) // carats data table contains sizes from 0.85 to 7
    ) {
        const price = prices.find(price => +price.diamond_size == +values.size);
        const carat = carats.find(carat => +carat.diamond_size == +values.size);

        if (!carat) {
            carat = "";
        }

        if (price) {
            setValues(values => ({
                ...values,
                carat: carat.diamond_carat,
                price: price.price_value,
                price_id: +price.price_id
            }));
            store.dispatch(
                updateCalculation({
                    name: "carat",
                    value: carat.diamond_carat,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "price",
                    value: price.price_value,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "price_id",
                    value: +price.price_id,
                    index: index
                })
            );
            
        } else {
            setValues(values => ({
                ...values,
                carat: carat.diamond_carat
            }));
            store.dispatch(
                updateCalculation({
                    name: "carat",
                    value: carat.diamond_carat,
                    index: index
                })
            );
        }
    }
}

export const setMetallPrice = ({index, values, prices, setValues}) => {
    let price;
    switch (+values.hallmark) {
        case 583:
            price = prices.find(price => +price.hallmark == +values.hallmark);

            setValues(values => ({
                ...values,
                name: "Золото",
                unit: "гр.",
                price: price.price_value,
                price_id: +price.price_id
            }));
            store.dispatch(
                updateCalculation({ name: "name", value: "Золото", index: index })
            );
            store.dispatch(
                updateCalculation({ name: "unit", value: "гр.", index: index })
            );
            store.dispatch(
                updateCalculation({
                    name: "price",
                    value: price.price_value,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "price_id",
                    value: +price.price_id,
                    index: index
                })
            );
            break;

        case 750:
            price = prices.find(price => +price.hallmark == +values.hallmark);
            setValues(values => ({
                ...values,
                name: "Золото",
                unit: "гр.",
                price: price.price_value,
                price_id: +price.price_id
            }));
            store.dispatch(
                updateCalculation({ name: "name", value: "Золото", index: index })
            );
            store.dispatch(
                updateCalculation({ name: "unit", value: "гр.", index: index })
            );
            store.dispatch(
                updateCalculation({
                    name: "price",
                    value: price.price_value,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "price_id",
                    value: +price.price_id,
                    index: index
                })
            );
            break;

        case 925:
            price = prices.find(price => +price.hallmark == +values.hallmark);

            setValues(values => ({
                ...values,
                name: "Серебро",
                unit: "гр.",
                price: price.price_value,
                price_id: +price.price_id
            }));
            store.dispatch(
                updateCalculation({ name: "name", value: "Серебро", index: index })
            );
            store.dispatch(
                updateCalculation({ name: "unit", value: "гр.", index: index })
            );
            store.dispatch(
                updateCalculation({
                    name: "price",
                    value: price.price_value,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "price_id",
                    value: +price.price_id,
                    index: index
                })
            );
            break;
    }
}