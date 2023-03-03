<?php

include_once 'config/db.php';
include_once 'controllers/Calculation.php';


$database = new Database();
$db = $database->getConnection();


$id = $_GET['orderId'];

$calculation = new Calculation($db);
$data = $calculation->fetchCalculation($id);

if ($data) {
    http_response_code(200);
    echo json_encode(array(
        "data" => $data
    ));
} else {
    echo json_encode(array("message" => "No calculation data found."));
}