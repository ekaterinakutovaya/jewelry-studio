<?php

class Calculation
{
    private $conn;

    public $name;
    public $hallmark;
    public $unit;
    public $size;
    public $carat;
    public $qty;
    public $price;
    public $priceId;
    public $orderId;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    function createCalculation()
    {
        $query = "INSERT INTO calculation
                    SET
                        name = :name,
                        hallmark = :hallmark,
                        unit = :unit,
                        size = :size,
                        carat = :carat,
                        qty = :qty,
                        price = :price,
                        priceId = :priceId,
                        orderId = :orderId
        ";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->hallmark = htmlspecialchars(strip_tags($this->hallmark));
        $this->unit = htmlspecialchars(strip_tags($this->unit));
        $this->size = htmlspecialchars(strip_tags($this->size));
        $this->carat = htmlspecialchars(strip_tags($this->carat));
        $this->qty = htmlspecialchars(strip_tags($this->qty));
        $this->price = htmlspecialchars(strip_tags($this->price));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':hallmark', $this->hallmark);
        $stmt->bindParam(':unit', $this->unit);
        $stmt->bindParam(':size', $this->size);
        $stmt->bindParam(':carat', $this->carat);
        $stmt->bindParam(':qty', $this->qty);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':priceId', $this->priceId);
        $stmt->bindParam(':orderId', $this->orderId);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function fetchCalculation($id)
    {
        $query = "SELECT * FROM calculation WHERE orderId = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    function deleteCalculation($id)
    {
        $query = "DELETE FROM calculation WHERE orderId = {$id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function updatePriceInCalculation()
    {
        $query = "UPDATE calculation SET price = :price WHERE priceId = :priceId";

        $stmt = $this->conn->prepare($query);

        $this->price = htmlspecialchars(strip_tags($this->price));

        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':priceId', $this->priceId);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}