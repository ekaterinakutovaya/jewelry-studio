<?php

include_once 'config/db.php';
include_once 'controllers/Image.php';

$database = new Database();
$db = $database->getConnection();

$image = new Image($db);
$data = $image->fetchImages();

if ($data) {
    http_response_code(200);
    echo json_encode(array(
        "data" => $data
    ));
} else {
    echo json_encode(array("message" => "Images fetch failed."));
}