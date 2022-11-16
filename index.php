<?php

include_once 'config/db.php';
include_once 'api/objects/user.php';
include_once 'api/objects/order.php';
include_once 'api/objects/prices.php';
include_once 'api/objects/calculation.php';
require 'generate_token.php';
require 'vendor/autoload.php';
use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$database = new Database();
$db = $database->getConnection();

$api = "http://juliyaserver/";

$action = $_POST['action'];
$id = (int)$_POST['order_id'];
$image_id = (int)$_POST['image_id'];

// $files_path = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/files/';
// $images_path = $_SERVER['DOCUMENT_ROOT'];
$path = 'assets/uploads/images/orders/';


$files_path = 'D:/myProjects/JuliyaStudio/app/public/assets/uploads/files/';
$images_path = 'D:/myProjects/JuliyaStudio/app/public/';


switch ($action) {
    case 'register':
        $user = new User($db);
        $user->username = $_POST['username'];
        $user->password = $_POST['password'];

        if (!empty($user->username) &&
            !empty($user->password) &&
            $user->create()) {
            http_response_code(200);
            echo json_encode(array("message" => "Пользователь был создан."));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Невозможно создать пользователя."));
        }
        break;

    case 'login':
        $user = new User($db);
        $user->username = $_POST['username'];
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
                "message" => "Successful login",
                "token" => $jwt,
                "username" => $user->username,
                "expireAt" => $expire_claim
            ));
        } else {
            http_response_code(401);
            echo json_encode(array("message" => "Login failed."));
        }
        break;

    case '3':
        $secret_key = "bGS6lzFqvvSQ8ALbOxatm7";
        $jwt = null;
        $jwt = $_POST['token'];

        if ($jwt) {
            try {
                $decoded = JWT::decode($jwt, new Key($secret_key, 'HS256'));
                echo json_encode('granted');
            } catch (Exception $e) {
                http_response_code(401);
                echo json_encode('denied');
            }
        }
        break;

    case 'fetch_orders':
        $order = new Order($db);
        $data = $order->fetchOrders();

        // file_put_contents('orders.json', json_encode($data));

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
        $order->order_name = $_POST['order_name'];
        $order->customer = $_POST['customer'];
        $order->price_1 = $_POST['price_1'];
        $order->price_2 = $_POST['price_2'];
        $order->price_3 = $_POST['price_3'];
        $order->urgency = $_POST['urgency'];
        $order->cat_index = $_POST['cat_index'];
        $order->category_name = $_POST['category_name'];
        $order->stat_index = $_POST['stat_index'];
        $order->status_name = $_POST['status_name'];
        $order->status_rate = $_POST['status_rate'];
        $order->hallmark = $_POST['hallmark'];
        $order->metall_color = $_POST['metall_color'];
        $order->ear_params = $_POST['ear_params'];
        $order->ring_size = $_POST['ring_size'];
        $order->comments = $_POST['comments'];
        $order->is_file_exists = $_POST['is_file_exists'];

        if ($_POST['receive_date'] == '') {
            $order->receive_date = null;
        } else {
            $order->receive_date = $_POST['receive_date'];
        }

        if ($_POST['handover_date'] == '') {
            $order->handover_date = null;
        } else {
            $order->handover_date = $_POST['handover_date'];
        }

        
    
        // if ($order->createOrder()) {
        $id = $order->createOrder();
        http_response_code(200);
        echo json_encode(array(
            "message" => "Заказ был создан.",
            "id" => $id
        ));
        // }
        // else {
        //     http_response_code(400);
        //     echo json_encode(array("message" => "Невозможно создать заказ."));
        // }
        break;

    // case 'upload_order_images':
    //     $order = new Order($db);
    //     file_put_contents('images_upload.json', json_encode($_FILES['file']));

    //     if ($order->uploadOrderImages()) {
    //         http_response_code(200);
    //         echo json_encode(array("message" => "Заказ был создан."));
    //     }
    //     else {
    //         http_response_code(400);
    //         echo json_encode(array("message" => "Невозможно создать заказ."));
    //     }

    case 'rhino_files_upload':
        if (!isset($_FILES['rhino_file'])) {
            $error = 'Файл не загружен.';
        } else {
            $file = $_FILES['rhino_file'];

            $order = new Order($db);
            $order->rhino_filename = $file['name'];
            $order->rhino_file_unique_name = time() . '-' . $file['name'];
            $order->order_id = $id;

            move_uploaded_file($file['tmp_name'], $files_path . $order->rhino_file_unique_name);

            if ($order->uploadRhinoFiles()) {
                http_response_code(200);
                echo json_encode(array("message" => "Файл загружен."));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Невозможно загрузить файл"));
            }
        }
        break;

    case 'cutting_files_upload':
        if (!isset($_FILES['cutting_file'])) {
            $error = 'Файл не загружен.';
        } else {
            $file = $_FILES['cutting_file'];

            $order = new Order($db);
            $order->cutting_filename = $file['name'];
            $order->cutting_file_unique_name = time() . '-' . $file['name'];
            $order->order_id = $id;

            move_uploaded_file($file['tmp_name'], $files_path . $order->cutting_file_unique_name);

            if ($order->uploadCuttingFiles()) {
                http_response_code(200);
                echo json_encode(array("message" => "Файл загружен."));
            } else {
                http_response_code(400);
                echo json_encode(array("message" => "Невозможно загрузить файл"));
            }
        }
        break;



    case 'quick_update':
        $order = new Order($db);
        $order->order_id = $_POST['order_id'];
        $order->cat_index = $_POST['cat_index'];
        $order->category_name = $_POST['category_name'];
        $order->stat_index = $_POST['stat_index'];
        $order->status_name = $_POST['status_name'];
        $order->status_rate = $_POST['status_rate'];
        $order->urgency = $_POST['urgency'];

        if ($_POST['handover_date'] == '') {
            $order->handover_date = null;
        } else {
            $order->handover_date = $_POST['handover_date'];
        }
    // file_put_contents('quick2.json', json_encode($_POST['order_id']));


        if ($order->quickUpdate()) {
            http_response_code(200);
            echo json_encode(array("message" => "Data updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Data update failed"));
        }
    break;


    case 'fetch_inserts':
        $order = new Order($db);
        $data = $order->fetchInserts($id);

        // file_put_contents('inserts.json', json_encode($data));

        if ($data) {
            http_response_code(200);
            echo json_encode(array(
                "data" => $data
            ));
        } else {
            echo json_encode(array("message" => "Inserts fetch failed."));
        }

    break;

    case 'update_order':
        $order = new Order($db);
        $order->order_id = $_POST['order_id'];
        $order->order_name = $_POST['order_name'];
        $order->customer = $_POST['customer'];
        $order->price_1 = $_POST['price_1'];
        $order->price_2 = $_POST['price_2'];
        $order->price_3 = $_POST['price_3'];
        $order->urgency = $_POST['urgency'];
        $order->cat_index = $_POST['cat_index'];
        $order->category_name = $_POST['category_name'];
        $order->stat_index = $_POST['stat_index'];
        $order->status_name = $_POST['status_name'];
        $order->status_rate = $_POST['status_rate'];
        $order->hallmark = $_POST['hallmark'];
        $order->metall_color = $_POST['metall_color'];
        $order->ear_params = $_POST['ear_params'];
        $order->ring_size = $_POST['ring_size'];
        $order->comments = $_POST['comments'];
        $order->is_file_exists = $_POST['is_file_exists'];

        if ($_POST['receive_date'] == '') {
            $order->receive_date = null;
        } else {
            $order->receive_date = $_POST['receive_date'];
        }

        if ($_POST['handover_date'] == '') {
            $order->handover_date = null;
        } else {
            $order->handover_date = $_POST['handover_date'];
        }

        // file_put_contents('update_order.json', json_encode($_POST['order_name']));

        if ($order->updateOrder()) {
            http_response_code(200);
            echo json_encode(array("message" => "Order updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Order update failed"));
        }
    break;

    case 'delete_image':
        $order = new Order($db);
       
        $order->deleteImage($image_id);

        unlink($images_path . $_POST['image_src']);
        unlink($images_path . $_POST['image_min']);


        if ($order->deleteImages($image_id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Image deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Image delete failed"));
        }
    break;

    case 'delete_order':
        $order = new Order($db);

        // file_put_contents('delete_order.json', json_encode($_POST['order_id']));

        $images = $order->fetchImagesByID($id);
        $rhino_files = $order->fetchRhinoFiles($id);
        $cutting_files = $order->fetchCuttingFilesById($id);
        // file_put_contents('delete_order.json', json_encode($images));

        if ($images) {
            foreach ($images as $image) {
                unlink($images_path . $image['image_src']);
                unlink($images_path . $image['image_min']);
            }
        }

        if ($rhino_files) {
            foreach ($rhino_files as $file) {
                unlink($files_path . $file['file_unique_name']);
            }
        }

        if ($cutting_files) {
            foreach ($cutting_files as $file) {
                unlink($files_path . $file['file_unique_name']);
            }
        }
      
        if ($order->deleteOrder($id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Order has been deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Order delete failed"));
        }
    break;

    case "delete_inserts":
        $order = new Order($db);
        if ($order->deleteInserts($id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Inserts have been deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Inserts delete failed"));
        }
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
        $calculation->price_id = $_POST['price_id'];
        $calculation->order_id = $_POST['order_id'];

        // file_put_contents('calc.json', json_encode($_POST['size']));

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

    case "delete_rhino_file":
        $order = new Order($db);
        $file_id = $_POST['file_id'];
        $file_unique_name = $_POST['file_unique_name'];

        unlink($files_path . $file_unique_name);

        if ($order->deleteRhinoFile($file_id)) {
            http_response_code(200);
            echo json_encode(array("message" => "File has been deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "File delete failed"));
        }
    break;

    case "delete_cutting_file":
        $order = new Order($db);
        $file_id = $_POST['file_id'];
        $file_unique_name = $_POST['file_unique_name'];

        unlink($files_path . $file_unique_name);

        if ($order->deleteCuttingFile($file_id)) {
            http_response_code(200);
            echo json_encode(array("message" => "File has been deleted"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "File delete failed"));
        }
    break;

    case 'update_price':
        $price = new Prices($db);
        $price->price_id = $_POST['price_id'];
        $price->price_value = $_POST['price_value'];

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
        $calculation->price_id = $_POST['price_id'];

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

        // file_put_contents('search.json', json_encode($_POST['search_value']));

        http_response_code(200);
            echo json_encode(array(
                        "data" => $data
                ));

    break;


    case 'send_to_cutting':

        $data = array(
        'order_id' => $_POST['order_id'],
        'order_image' => $_POST['order_image'],
    );

    $token = "1097912671:AAH3LhRp2OyGLSri4fzgSqbYUtvcRG7ux90";
    $chat_id = "-166611128";

    $bot_url = "https://api.telegram.org/bot{$token}/";
    $url = $bot_url . "sendPhoto?chat_id=" . $chat_id;

    $image_path = $_SERVER['DOCUMENT_ROOT'] . '/' . $_POST['order_image'];
    $order_url = ((!empty($_SERVER['HTTPS'])) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . 'orders' . '/' . 'order' . '/' . $_POST['order_id'];

    // file_put_contents('telegram.json', json_encode($order_url));

    $txt = "Есть файл на резку! " . $order_url;

    $post_fields = array(
        'chat_id' => $chat_id,
        'photo' => new CURLFile($image_path),
        'caption' => $txt,
    );

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

    case 'update_fraser_status':
        $order = new Order($db);

        if ($order->updateCuttingStatus($id)) {
            http_response_code(200);
            echo json_encode(array("message" => "Status updated"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Status update failed"));
        }
    break;
}


