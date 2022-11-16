<?php

include_once 'config/db.php';
include_once 'api/objects/order.php';


$database = new Database();
$db = $database->getConnection();


$id = $_GET['order_id'];
// file_put_contents('id.json', json_encode($id));

$order = new Order($db);
        $data = $order->fetchCuttingFilesById($id);

        // file_put_contents('cutting.json', json_encode($data));

        if ($data) {
            http_response_code(200);
            echo json_encode(array(
                        "data" => $data
                ));
        } else {
            echo json_encode(array("message" => "No data found."));
        }