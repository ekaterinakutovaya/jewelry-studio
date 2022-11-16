<?php

class Prices {
    private $conn;

    public $price_id;
    public $price_value;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    function fetchPrices() {
        $query = "SELECT * FROM material_prices";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    function updatePrice() {
        $query = "UPDATE material_prices SET
                    price_value = :price_value
                    WHERE price_id = :price_id
                    ";

        $stmt = $this->conn->prepare($query);
        $this->price_value = htmlspecialchars(strip_tags($this->price_value));

        $stmt->bindParam(':price_value', $this->price_value);
        $stmt->bindParam(':price_id', $this->price_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}