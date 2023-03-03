<?php

include_once 'config/db.php';
include_once 'controllers/Order.php';

$database = new Database();
$db = $database->getConnection();


$order = new Order($db);
$data = $order->fetchOrders($_GET['category']);

if ($data) {
    http_response_code(200);
    echo json_encode(array(
            "data" => $data
        ));
} else {
    echo json_encode(array("message" => "Orders fetch failed."));
}