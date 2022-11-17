<?php

include_once 'config/db.php';
include_once 'api/objects/order.php';


$database = new Database();
$db = $database->getConnection();

// $path = $_SERVER['DOCUMENT_ROOT'] . '/assets/uploads/images/orders/';
// $path = 'D:/myProjects/JuliyaStudio/app/public/assets/uploads/images/orders/';
// 'D:\OpenServer\domains\JuliyaStudio\client\public\assets\uploads\images\orders'
$path = 'D:/OpenServer/domains/JuliyaStudio/client/public/assets/uploads/images/orders/';
$db_path = 'assets/uploads/images/orders/';

$id = (int)$_POST['order_id'];



if (!isset($_FILES['file'])) {
    exit;
}

$allow = array('jpg', 'jpeg', 'png', 'gif');

if (!is_dir($path)) {
	mkdir($path, 0777, true);
}

$files = array();
$diff = count($_FILES['file']) - count($_FILES['file'], COUNT_RECURSIVE);
if ($diff == 0) {
	$files = array($_FILES['file']);
} else {
	foreach ($_FILES['file'] as $k => $l) {
		foreach ($l as $i => $v) {
			$files[$i][$k] = $v;
		}
	}
}

// file_put_contents('images_upload.json', json_encode($_FILES['file']));

foreach ($files as $file) {
	$error = $data = '';

	$ext = mb_strtolower(mb_substr(mb_strrchr(@$file['name'], '.'), 1));
    // file_put_contents('images_upload.json', json_encode($ext));

	if (!empty($file['error']) || empty($file['tmp_name']) || $file['tmp_name'] == 'none') {
		$error = 'Не удалось загрузить файл.';
	} elseif (empty($file['name']) || !is_uploaded_file($file['tmp_name'])) {
		$error = 'Не удалось загрузить файл.';
	} elseif (empty($ext) || !in_array($ext, $allow)) {
		$error = 'Недопустимый тип файла';
	} else {
		$info = @getimagesize($file['tmp_name']);


		if (empty($info[0]) || empty($info[1]) || !in_array($info[2], array(1, 2, 3))) {
			$error = 'Недопустимый тип файла';
		} else {
			
			$random_name = time() . '-' . mt_rand(1, 9999999999);
			$source_image = $path . $random_name . '.' . $ext;
			$min_image = $path . $random_name . '-min.' . $ext;
			$filename = $random_name . '.' . $ext;
			$filename_min = $random_name . '-min.' . $ext;
			$path_for_db = $db_path . $filename;
			$path_for_db_min = $db_path . $filename_min;

			

			move_uploaded_file($file['tmp_name'], $source_image);

			$src_width = $info[0];
			$src_height = $info[1];

			$dst_width = 300;
			$dst_height = 300;

			switch ($info[2]) {
				case 1:
					$im = imageCreateFromGif($source_image);
					$dst_image = imagecreatetruecolor($dst_width, $dst_height);
					imageSaveAlpha($dst_image, true);
					break;
				case 2:
					$im = imageCreateFromJpeg($source_image);
					$dst_image = imagecreatetruecolor($dst_width, $dst_height);
					break;
				case 3:
					$im = imageCreateFromPng($source_image);
					$background = imagecolorallocate($dst_image, 0, 0, 0);
					imagecolortransparent($dst_image, $background);
					imagealphablending($dst_image, false);
					imagesavealpha($dst_image, true);
					break;
			}
				
				

// {"0":1024,"1":1024,"2":2,"3":"width=\"1024\" height=\"1024\"","bits":8,"channels":3,"mime":"image\/jpeg"}

			

			// $dst_image = imagecreatetruecolor($dst_width, $dst_height);
			// $background = imagecolorallocate($dst_image, 0, 0, 0);
			// imagecolortransparent($dst_image, $background);
			// imagealphablending($dst_image, false);
			// imagesavealpha($dst_image, true);

				//if the image is horizontal
			if ($src_width > $src_height) {
				imagecopyresampled(
					$dst_image, // dst_image
					$im, // src_image
					0, // dst_x
					0, // dst_y
					round((max($src_width, $src_height) - min($src_width, $src_height)) / 2), // src_x
					0, // src_y
					$dst_width,
					$dst_height,
					min($src_width, $src_height),
					min($src_width, $src_height)
				);
			}

				// if the image is vertical
			if ($src_width < $src_height) {
				imagecopyresampled(
					$dst_image,
					$im,
					0,
					0,
					0,
					round((max($src_width, $src_height) - min($src_width, $src_height)) / 2),
					$dst_width,
					$dst_width,
					min($src_width, $src_height),
					min($src_width, $src_height)
				);
			}
				
				// if the image is square
			if ($src_width == $src_height) {
				imagecopyresampled($dst_image, $im, 0, 0, 0, 0, $dst_width, $dst_width, $src_width, $src_width);
			}


			switch ($info[2]) {
				case 1:
					imagegif($dst_image, $min_image, 100);
					break;
				case 2:
					imagejpeg($dst_image, $min_image, 100);
					break;
				case 3:
					imagepng($dst_image, $min_image, 9);
					break;
			}

			// file_put_contents('images_upload.json', json_encode($filename));

			$order = new Order($db);
			$order->filename = $filename;
			$order->path_for_db = $path_for_db;
			$order->path_for_db_min = $path_for_db_min;
			$order->order_id = $id;
			$order->uploadOrderImages();
		

			

			

		}
	}
}


// if (!empty(array_filter($_FILES['file']))) {
//     // file_put_contents('images_upload.json', json_encode($_FILES['file']['name']));

//     foreach($_FILES['file'] as $key => $value) {
      
//         // $ext = mb_strtolower(mb_substr(mb_strrchr(@$original_name, '.'), 1));
//         // $randomName = time() . '-' . mt_rand(1, 9999999999);
//         // $filename       =   $_FILES['file']['name'][$key];
//         // $tempLocation   =   $_FILES['file']['tmp_name'][$key];
//         // $targetFilePath =   $uploadsDir . $filename;
//         // $originalSize = $tempLocation . $randomName . '.' . $ext;
//         // $thumb = $tempLocation . $randomName . '-thumb.' . $ext;

//         file_put_contents('images_upload.json', json_encode($value));
    
//         // if (in_array($fileType, $allowedFileType)) {
//         //     if (move_uploaded_file($tempLocation, $targetFilePath)) {
//         //         $sqlVal = "('".$filename."', '".$uploadDate."')";
//         //     } else {
//         //         $response = array(
//         //             "status" => "alert-danger",
//         //             "message" => "File could not be uploaded."
//         //         );
//         //     }
//         // } else {
//         //     $response = array(
//         //             "status" => "alert-danger",
//         //             "message" => "Only .jpg, .jpeg and .png file formats allowed."
//         //     );
//         // }
//     }
// }

