import { toast } from "react-toastify";

import { updateCalculation } from "@/store/CalculationSlice";
import ordersService from "@/services/orders.service";
import store from "@/store/store";

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

export function priceFormatter(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function numberFormatter(num, minimumFractionDigits, maximumFractionDigits) {
    let formatter = new Intl.NumberFormat("ru", {
        style: 'decimal',
        minimumFractionDigits,
        maximumFractionDigits
    });

    return formatter.format(num);
}


export const downloadFile = (file) => {
    let a = document.createElement("a");
    a.href = file.filePath + file.fileUniqueName;
    a.download = file.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export const sendToCutting = ({ orderImage, currentOrder, setStatIndex }) => {
    let image = "";
    if (orderImage) {
        image = orderImage.imageMin;
    }

    ordersService.sendToCutting(currentOrder, image)
        .then((response) => {
            setStatIndex(1);
            dispatch(cuttingStatusUpdate(currentOrder));

            toast.success("Отправлено на резку!", {
                position: toast.POSITION.TOP_CENTER
            });

            return response;
        });
}

export const setGemsPrice = ({ index, values, setValues }) => {
    let size = +values.size.replace(/,/g, '.');
    const hasBrilliant = /бриллиант/i;
    
    const prices = store.getState().prices.prices;
    const carats = store.getState().carats.carats;

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
        // (values.name.toLowerCase() === "бриллиант" ||
        //     values.name.toLowerCase() === "бриллианты") 
        hasBrilliant.test(values.name)
            &&
        (size > 0.9 && size <= 7) // carats data table contains sizes from 0.9 to 7

    ) {
        let price = prices.find(price => +price.diamondSize == size);
        let carat = carats.find(carat => +carat.diamondSize == size);
        
        if (!carat) {
            carat = "";
        }

        if (price) {
            setValues(values => ({
                ...values,
                carat: carat.diamondCarat,
                price: price.priceValue,
                priceId: +price.priceId
            }));
            store.dispatch(
                updateCalculation({
                    name: "carat",
                    value: carat.diamondCarat,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "price",
                    value: price.priceValue,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "priceId",
                    value: +price.priceId,
                    index: index
                })
            );

        } else {
            setValues(values => ({
                ...values,
                carat: carat.diamondCarat
            }));
            store.dispatch(
                updateCalculation({
                    name: "carat",
                    value: carat.diamondCarat,
                    index: index
                })
            );
        }
    }
}

export const setMetallPrice = ({ index, values, setValues }) => {
    const prices = store.getState().prices.prices;
    let price;
    switch (+values.hallmark) {
        case 583:
            price = prices.find(price => +price.hallmark == +values.hallmark);

            setValues(values => ({
                ...values,
                name: "Золото",
                unit: "гр.",
                price: price.priceValue,
                priceId: +price.priceId
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
                    value: price.priceValue,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "priceId",
                    value: +price.priceId,
                    index: index
                })
            )
            break;

        case 750:
            price = prices.find(price => +price.hallmark == +values.hallmark);
            setValues(values => ({
                ...values,
                name: "Золото",
                unit: "гр.",
                price: price.priceValue,
                priceId: +price.priceId
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
                    value: price.priceValue,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "priceId",
                    value: +price.priceId,
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
                price: price.priceValue,
                priceId: +price.priceId
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
                    value: price.priceValue,
                    index: index
                })
            );
            store.dispatch(
                updateCalculation({
                    name: "priceId",
                    value: +price.priceId,
                    index: index
                })
            );
            break;
    }
}