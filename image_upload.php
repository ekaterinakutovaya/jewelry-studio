<?php

include_once 'config/db.php';
include_once 'controllers/Image.php';


$database = new Database();
$db = $database->getConnection();

// $dir = $_SERVER['DOCUMENT_ROOT'] . '/';
$dir = 'C:/OSPanel/domains/studio/jewelry-studio/client/public/';
$image_path = 'assets/uploads/images/orders/';


$orderId = (int)$_POST['orderId'];

if (!isset($_FILES['file'])) {
    exit;
}

$allow = array('jpg', 'jpeg', 'png', 'gif');

if (!is_dir($dir . $image_path)) {
	mkdir($dir . $image_path, 0777, true);
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


foreach ($files as $file) {
	$error = $data = '';

	$ext = mb_strtolower(mb_substr(mb_strrchr(@$file['name'], '.'), 1));

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
			$source_image = $dir .$image_path . $random_name . '.' . $ext;
			$min_image = $dir . $image_path . $random_name . '-min.' . $ext;
			$filename = $random_name . '.' . $ext;
			$filename_min = $random_name . '-min.' . $ext;
			$path_for_db = $image_path . $filename;
			$path_for_db_min = $image_path . $filename_min;
			

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
					$dst_image = imagecreatetruecolor($dst_width, $dst_height);
					$background = imagecolorallocate($dst_image, 255, 255, 255);
					imagecolortransparent($dst_image, $background);
					imagealphablending($dst_image, false);
					imagesavealpha($dst_image, true);
					break;
			}

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
					// file_put_contents('image.json', json_encode($dst_image));
					break;
			}

			$image = new Image($db);
			$image->imageName = $filename;
			$image->imageSrc = $path_for_db;
			$image->imageMin = $path_for_db_min;
			$image->orderId = $orderId;

			$imageUploaded = $image->uploadImage();

			if ($imageUploaded) {
				http_response_code(200);
				echo json_encode(array(
					"message" => "Image was uploaded.",
					"image" => $imageUploaded
				));
			} else {
				http_response_code(400);
                echo json_encode(array("message" => "Невозможно загрузить изображение"));
			}	
		

		}
	}
}


