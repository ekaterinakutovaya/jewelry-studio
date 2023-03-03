<?php

include_once 'config/db.php';
include_once 'controllers/Price.php';


$database = new Database();
$db = $database->getConnection();

$prices = new Prices($db);
$data = $prices->fetchPrices();

if ($data) {
    http_response_code(200);
    echo json_encode(array(
        "data" => $data
    ));
} else {
    echo json_encode(array("message" => "No data found."));
}