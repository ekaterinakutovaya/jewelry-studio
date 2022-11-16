<?php

header('Access-Control-Allow-Origin: *');

include_once 'config/db.php';
include_once 'api/objects/order.php';


$database = new Database();
$db = $database->getConnection();



    $order = new Order($db);
        $order->order_id = $_POST['order_id'];
        $order->handover_date = $_POST['handover_date'];
    
        if ($order->quickUpdate()) {
            http_response_code(200);
            echo json_encode(array("message" => "Data updated"));
        }
        else {
            http_response_code(400);
            echo json_encode(array("message" => "Data update failed"));
        }