<?php

class Prices
{
    private $conn;

    public $priceId;
    public $priceValue;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function fetchPrices()
    {
        $query = "SELECT * FROM prices";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    function updatePrice()
    {
        $query = "UPDATE prices SET
                    priceValue = :priceValue
                    WHERE priceId = :priceId
                    ";

        $stmt = $this->conn->prepare($query);
        $this->priceValue = htmlspecialchars(strip_tags($this->priceValue));

        $stmt->bindParam(':priceValue', $this->priceValue);
        $stmt->bindParam(':priceId', $this->priceId);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}