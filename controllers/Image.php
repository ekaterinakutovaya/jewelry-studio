<?php

class Image {
    private $conn;

    public $orderId;
    public $filename;
    public $path_for_db;
    public $path_for_db_min;
    public $imageId;
    public $imageName;
    public $imageSrc;
    public $imageMin;
    // public $filePath = '/assets/uploads/files/';


    public function __construct($db)
    {
        $this->conn = $db;
    }

    function uploadImage()
    {
        
        $query = "INSERT INTO images (imageName, imageSrc, imageMin, orderId) VALUES
				(
                    :imageName,
                    :imageSrc,
                    :imageMin,
                    :orderId
                )
				";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':imageName', $this->imageName);
        $stmt->bindParam(':imageSrc', $this->imageSrc);
        $stmt->bindParam(':imageMin', $this->imageMin);
        $stmt->bindParam(':orderId', $this->orderId);

        

        if ($stmt->execute()) {
            $imageId = $this->conn->lastInsertId();
            
            $query = "SELECT * FROM images WHERE imageId = {$imageId}";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return $result;
            }
            return false;
        }
        return false;

    }

     function fetchImages()
    {
        $query = "SELECT * FROM images";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

//        file_put_contents('image.json', json_encode($result));

        if ($result) {
            return $result;
        }
        return false;
    }

     function fetchImagesByOrderID($id)
    {
        $query = "SELECT * FROM images WHERE orderId = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        }
        return false;
    }

    function deleteImage($imageId)
    {
        $query = "DELETE FROM images WHERE imageId = {$imageId}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}