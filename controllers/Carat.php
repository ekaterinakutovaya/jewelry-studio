<?php

class Carat
{
    private $conn;

    public $caratId;
    public $diamondSize;
    public $diamondCarat;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function fetchCarats()
    {
        $query = "SELECT * FROM carats";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }
}