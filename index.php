<?php

include_once 'config/db.php';
include_once 'controllers/User.php';
include_once 'controllers/Order.php';
include_once 'controllers/Image.php';
include_once 'controllers/File.php';
include_once 'controllers/Price.php';
include_once 'controllers/Calculation.php';
require 'generate_token.php';
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$database = new Database();
$db = $database->getConnection();

$action = $_POST['action'];
$id = (int)$_POST['orderId'];
$imageId = $_POST['imageId'];

$image_path = 'assets/uploads/images/';
$files_path = 'assets/uploads/files/';

$dir = $_SERVER['DOCUMENT_ROOT'] . '/';
//$dir = 'D:/OpenServer/domains/JuliyaStudioTailwind/client/public/';
//$dir = 'C:/OSPanel/domains/studio/jewelry-studio/client/public/';

switch ($action) {
    case 'register':
        $user = new User($db);
        $user->username = htmlspecialchars(strip_tags($_POST['username']));
        $user->password = htmlspecialchars(strip_tags($_POST['password']));

        if ($user->create()) {
            http_response_code(200);
            echo json_encode(array("message" => "Регистрация прошла успешно."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Невозможно создать пользователя."));
        }
        break;

    case 'login':
        $user = new User($db);
        $user->username = htmlspecialchars(strip_tags($_POST['username']));
        $password = htmlspecialchars(strip_tags($_POST['password']));
        $user_exists = $user->isUserExists();

        if ($user_exists && password_verify($password, $user_exists['password'])) {

            $secret_key = 'bGS6lzFqvvSQ8ALbOxatm7';
            $issuer_claim = $api;
            $issuedat_claim = time();
            $notbefore_claim = $issuedat_claim + 10;
            $expire_claim = $issuedat_claim + 360;
            $token = array(
                "iss" => $issuer_claim,
                "iat" => $issuedat_claim,
                "nbf" => $notbefore_claim,
                "exp" => $expire_claim,
                "data" => array(
                    "username" => $user->username
                )
            );

            http_response_code(200);
            $jwt = JWT::encode($token, $secret_key, 'HS256');
            echo json_encode(array(
                "message" => "Авторизация прошла успешно.",
                "token" => $jwt,
                "username" => $user->username,
                "expireAt" => $expire_claim
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Не удалось авторизоваться."));
        }
        break;

    case 'fetch_orders':
        $order = new Order($db);
        $data = $order->fetchOrders();

        if ($data) {
            http_response_code(200);
            echo json_encode(array(
                "data" => $data
            ));
        } else {
            echo json_encode(array("message" => "Orders fetch failed."));
        }

        break;

    case 'create_order':
        $order = new Order($db);
        $order->orderName = $_POST['orderName'];
        $order->customer = $_POST['customer'];
        $order->priceStart = $_POST['priceStart'];
        $order->priceMiddle = $_POST['priceMiddle'];
        $order->priceFinal = $_POST['priceFinal'];
        $order->urgencyIndex = $_POST['urgencyIndex'];
        $order->catIndex = $_POST['catIndex'];
        $order->categoryName = $_POST['categoryName'];
        $order->statIndex = $_POST['statIndex'];
        $order->statusName = $_POST['statusName'];
        $order->statusRate = $_POST['statusRate'];
        $order->hallmark = $_POST['hallmark'];
        $order->metallColor = $_POST['metallColor'];
        $order->earParams = $_POST['earParams'];
        $order->ringSize = $_POST['ringSize'];
        $order->fastenerType = $_POST['fastenerType'];
        $order->comments = $_POST['comments'];
        $order->isFileExists = $_POST['isFileExists'];

        if ($_POST['receiveDate'] == 'null' || $_POST['receiveDate'] == '') {
            $order->receiveDate = null;
        } else {
            $order->receiveDate = $_POST['receiveDate'];
        }

        if ($_POST['handoverDate'] == 'null' || $_POST['handoverDate'] == '') {
            $order->handoverDate = null;

        } else {
            $order->handoverDate = $_POST['handoverDate'];
        }

        $orderCreated = $order->createOrder();
        if ($orderCreated) {
            http_response_code(200);
            echo json_encode(array(
                "message" => "Заказ был создан.",
                "orderId" => $orderCreated
            ));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Невозможно создать заказ."));
        }
        break;

    case 'file_upload':
        if (!isset($_FILES['file'])) {
            $error = 'Файл не загружен.';
        } else {
            $fileData = $_FILES['file'];

            $file = new File($db);
            $file->fileName = $fileData['name'];
            $file->fileUniqueName = time() . '-' . $fileData['name'];
            $file->orderId = $id;

            move_uploaded_file($fileData['tmp_name'], $dir . $files_path . $file->fileUniqueName);

            $fileUploaded = $file->uploadFile();
            if ($fileUploaded) {
                http_response_code(200);
                echo json_encode(array("message" => "Файл загружен.", "fileUploaded" => $fileUploaded));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Невозможно загрузить файл"));
            }
        }
        break;

    case 'quick_update':
        $order = new Order($db);
        $order->orderId = $_POST['orderId'];
        $order->catIndex = $_POST['catIndex'];
        $order->categoryName = $_POST['categoryName'];
        $order->statIndex = $_POST['statIndex'];
        $order->statusName = $_POST['statusName'];
        $order->statusRate = $_POST['statusRate'];
        $order->urgencyIndex = $_POST['urgencyIndex'];

        if ($_POST['handoverDate'] == 'null' || $_POST['handoverDate'] == '') {
            $order->handoverDate = null;

        } else {
            $order->handoverDate = $_POST['handoverDate'];
        }

        if ($order->quickUpdate()) {
            http_response_code(200);
            echo json_encode(array("message" => "Data updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Data update failed"));
        }
        break;

    case 'update_order':
        $order = new Order($db);
        $order->orderId = $_POST['orderId'];
        $order->orderName = $_POST['orderName'];
        $order->customer = $_POST['customer'];
        $order->receiveDate = $_POST['receiveDate'];
        $order->handoverDate = $_POST['handoverDate'];
        $order->priceStart = $_POST['priceStart'];
        $order->priceMiddle = $_POST['priceMiddle'];
        $order->priceFinal = $_POST['priceFinal'];
        $order->urgencyIndex = $_POST['urgencyIndex'];
        $order->catIndex = $_POST['catIndex'];
        $order->categoryName = $_POST['categoryName'];
        $order->statIndex = $_POST['statIndex'];
        $order->statusName = $_POST['statusName'];
        $order->statusRate = $_POST['statusRate'];
        $order->hallmark = $_POST['hallmark'];
        $order->metallColor = $_POST['metallColor'];
        $order->earParams = $_POST['earParams'];
        $order->ringSize = $_POST['ringSize'];
        $order->fastenerType = $_POST['fastenerType'];
        $order->comments = $_POST['comments'];

        if ($_POST['receiveDate'] == 'null' || $_POST['receiveDate'] == '') {
            $order->receiveDate = null;
        } else {
            $order->receiveDate = $_POST['receiveDate'];
        }

        if ($_POST['handoverDate'] == 'null' || $_POST['handoverDate'] == '') {
            $order->handoverDate = null;

        } else {
            $order->handoverDate = $_POST['handoverDate'];
        }

        if ($order->updateOrder()) {
            http_response_code(200);
            echo json_encode(array("message" => "Order updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Order update failed"));
        }
        break;

    case 'delete_image':
        $image = new Image($db);

        unlink($dir . $_POST['imageSrc']);
        unlink($dir . $_POST['imageMin']);


        if ($image->deleteImage($imageId)) {
            http_response_code(200);

            echo json_encode(array("message" => "Image was deleted", "imageId" => $imageId));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Image delete failed"));
        }
        
        break;

    case 'delete_order':
        $order = new Order($db);
        $image = new Image($db);
        $file = new File($db);

        $images = $image->fetchImagesByOrderID($id);
        $files = $file->fetchFilesByOrderID($id);

        /******* Disabled for demo *******************************************/
         if ($images) {
             foreach ($images as $image) {
                 unlink($dir . $image['imageSrc']);
                 unlink($dir . $image['imageMin']);
             }
         }

         if ($files) {
             foreach ($files as $file) {
                 unlink($dir . $files_path . $file['fileUniqueName']);
             }
         }

         if ($order->deleteOrder($id)) {
             http_response_code(200);
             echo json_encode(array("message" => "Order has been deleted", "orderId" => $id));
         } else {
             http_response_code(400);
             echo json_encode(array("message" => "Order delete failed"));
         }

        http_response_code(200);
        echo json_encode(array("message" => "Order has been deleted", "orderId" => $id));
        break;

    case "create_calculation":
        $calculation = new Calculation($db);
        $calculation->name = $_POST['name'];
        $calculation->hallmark = $_POST['hallmark'];
        $calculation->unit = $_POST['unit'];
        $calculation->size = $_POST['size'];
        $calculation->carat = $_POST['carat'];
        $calculation->qty = $_POST['qty'];
        $calculation->price = $_POST['price'];
        $calculation->priceId = $_POST['priceId'];
        $calculation->orderId = $_POST['orderId'];

        if ($calculation->createCalculation()) {
            http_response_code(200);
            echo json_encode(array("message" => "Calculation has been created"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Calculation create failed"));
        }
        break;

    case "delete_calculation":
        $calculation = new Calculation($db);

        if ($calculation->deleteCalculation($id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Calculation has been deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Calculation delete failed"));
        }
        break;

    case "delete_file":
        $file = new File($db);
        $fileId = $_POST['fileId'];
        $fileUniqueName = $_POST['fileUniqueName'];

        unlink($dir . $files_path . $fileUniqueName);

        if ($file->deleteFile($fileId)) {
            http_response_code(200);
            echo json_encode(array("message" => "File has been deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "File delete failed"));
        }
        break;

    case 'update_price':
        $price = new Prices($db);
        $price->priceId = $_POST['priceId'];
        $price->priceValue = $_POST['priceValue'];

        if ($price->updatePrice()) {
            http_response_code(200);
            echo json_encode(array("message" => "Price has been updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Price update failed"));
        }

        break;

    case 'update_prices_in_calculation':
        $calculation = new Calculation($db);
        $calculation->price = $_POST['price'];
        $calculation->priceId = $_POST['priceId'];

        if ($calculation->updatePriceInCalculation()) {
            http_response_code(200);
            echo json_encode(array("message" => "Price has been updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Price update failed"));
        }

        break;

    case 'search_order':
        $order = new Order($db);
        $order->search_value = $_POST['search_value'];

        $data = $order->search();

        http_response_code(200);
        echo json_encode(array(
            "data" => $data
        ));

        break;


    case 'send_to_cutting':

        $data = array(
            'orderId' => $_POST['orderId'],
            'order_image' => $_POST['order_image'],
        );

        $token = $_ENV["TELEGRAM_TOKEN"];
        $chat_id = $_ENV["CHAT_ID"];

        $bot_url = "https://api.telegram.org/bot{$token}/";
        $url = $bot_url . "sendPhoto?chat_id=" . $chat_id;

        $image = $_SERVER['DOCUMENT_ROOT'] . '/' . $_POST['order_image'];
        $order_url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . 'orders' . '/' . 'order' . '/' . $_POST['orderId'];

        $txt = "Есть файл на резку! " . $order_url;

        $post_fields = array(
            'chat_id' => $chat_id,
            'photo' => new CURLFile($image),
            'caption' => $txt,
        );

        file_put_contents('tg.json', json_encode($post_fields));

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "Content-Type:multipart/form-data"
        ));
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_fields);
        $output = curl_exec($ch);
        echo json_encode($_POST);

        break;

    case 'update_status':
        $order = new Order($db);

        if ($order->updateStatus($id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Status updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Status update failed"));
        }
        break;
}


