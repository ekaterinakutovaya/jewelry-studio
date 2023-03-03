<?php

include_once 'config/db.php';
include_once 'controllers/Carat.php';

$database = new Database();
$db = $database->getConnection();

$carats = new Carat($db);
$data = $carats->fetchCarats();

if ($data) {
    http_response_code(200);
    echo json_encode(array(
        "data" => $data
    ));
} else {
    echo json_encode(array("message" => "No data found."));
}