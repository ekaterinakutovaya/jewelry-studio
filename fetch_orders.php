<?php

include_once 'config/db.php';
include_once 'api/objects/order.php';


$database = new Database();
$db = $database->getConnection();



$category = $_GET['category'];
$currentPage = $_GET['page'];


$order = new Order($db);
        $data = $order->fetchOrders($category);
        // $data = $order->fetchOrders();

        file_put_contents('orders.json', json_encode($data));

        // if ($data) {
            http_response_code(200);
            echo json_encode(array(
                        "data" => $data
                ));
        // } else {
            // echo json_encode(array("message" => "Orders fetch failed."));
        // }