import { API_URL } from "utils/consts";
import ordersService from "services/orders.service";
import {
    FaTelegram,
    FaDownload,
    FaPencilAlt,
    FaBolt,
    FaExclamationCircle
} from "react-icons/fa";
import { toast } from "react-toastify";

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