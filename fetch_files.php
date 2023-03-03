<?php

include_once 'config/db.php';
include_once 'controllers/File.php';

$database = new Database();
$db = $database->getConnection();

$file = new File($db);
$data = $file->fetchFiles();

if ($data) {
    http_response_code(200);
    echo json_encode(array(
        "data" => $data
    ));
} else {
    echo json_encode(array(
        "data" => []
    ));
}
