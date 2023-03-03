<?php

class File {
    private $conn;

    public $orderId;
    public $fileId;
    public $fileName;
    public $fileUniqueName;
    public $filePath = '/assets/uploads/files/';


    public function __construct($db)
    {
        $this->conn = $db;
    }

    function uploadFile()
    {
        $query = "INSERT INTO files (fileName, fileUniqueName, filePath, orderId) VALUES
				(
                    :fileName,
                    :fileUniqueName,
                    :filePath,
                    :orderId
                )
                ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':fileName', $this->fileName);
        $stmt->bindParam(':fileUniqueName', $this->fileUniqueName);
        $stmt->bindParam(':filePath', $this->filePath);
        $stmt->bindParam(':orderId', $this->orderId);

        if ($stmt->execute()) {
            $fileId = $this->conn->lastInsertId();
            
            $query = "SELECT * FROM files WHERE fileId = {$fileId}";
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

    function fetchFiles()
    {
        $query = "SELECT * FROM files";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        }
        return false;
    }

    function fetchFilesByOrderID($id)
    {
        $query = "SELECT * FROM files WHERE orderId = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        }
        return false;
    }

     function deleteFile($fileId) {
        $query = "DELETE FROM files WHERE fileId = {$fileId}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}