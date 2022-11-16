<?php

class Calculation {
    private $conn;

    public $name;
    public $hallmark;
    public $unit;
    public $size;
    public $carat;
    public $qty;
    public $price;
    public $price_id;
    public $order_id;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    function createCalculation() {
        $query = "INSERT INTO calculation
                    SET
                        name = :name,
                        hallmark = :hallmark,
                        unit = :unit,
                        size = :size,
                        carat = :carat,
                        qty = :qty,
                        price = :price,
                        price_id = :price_id,
                        order_id = :order_id
        ";
        $stmt = $this->conn->prepare($query);

        $this->name=htmlspecialchars(strip_tags($this->name));
        $this->hallmark=htmlspecialchars(strip_tags($this->hallmark));
        $this->unit=htmlspecialchars(strip_tags($this->unit));
        $this->size=htmlspecialchars(strip_tags($this->size));
        $this->carat=htmlspecialchars(strip_tags($this->carat));
        $this->qty=htmlspecialchars(strip_tags($this->qty));
        $this->price=htmlspecialchars(strip_tags($this->price));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':hallmark', $this->hallmark);
        $stmt->bindParam(':unit', $this->unit);
        $stmt->bindParam(':size', $this->size);
        $stmt->bindParam(':carat', $this->carat);
        $stmt->bindParam(':qty', $this->qty);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':price_id', $this->price_id);
        $stmt->bindParam(':order_id', $this->order_id);

        // file_put_contents('calculation.json', json_encode($this->size));


        if ($stmt->execute()) {
            // file_put_contents('calculation.json', json_encode($stmt->execute()));
            return true;
        }
        return false;
    }

    function fetchCalculationByID($id) {
    $query = "SELECT * FROM calculation WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    function deleteCalculation($id) {
        $query = "DELETE FROM calculation WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function updatePriceInCalculation() {
        $query = "UPDATE calculation SET price = :price WHERE price_id = :price_id";

        $stmt = $this->conn->prepare($query);

        $this->price = htmlspecialchars(strip_tags($this->price));

        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':price_id', $this->price_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}