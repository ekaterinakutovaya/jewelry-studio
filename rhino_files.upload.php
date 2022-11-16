<?php

include_once 'config/db.php';
include_once 'api/objects/order.php';


$database = new Database();
$db = $database->getConnection();

$path = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/files/';
$db_path = 'assets/uploads/files/';

$id = (int)$_POST['order_id'];

// file_put_contents('rhino_upload.json', json_encode($_FILES['rhino_file']));

// if (!isset($_FILES['rhino_file'])) {
//     $error = 'Файл не загружен.';
// } else {
//     $file = $_FILES['rhino_file'];
//     $name = $file['name'][0];
//     $unique_name = time() . '-' . $file['name'][0];

//     file_put_contents('rhino_upload.json', json_encode($_FILES['rhino_file']));

//     move_uploaded_file($file['tmp_name'][0], $path . $unique_name);
// }