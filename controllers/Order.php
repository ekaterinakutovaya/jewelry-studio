<?php 

class Order
{
    private $conn;

    public $orderId;
    public $orderName;
    public $customer;
    public $receiveDate;
    public $handoverDate;
    public $priceStart;
    public $priceMiddle;
    public $priceFinal;
    public $urgencyIndex;
    public $catIndex;
    public $categoryName;
    public $statIndex;
    public $statusName;
    public $statusRate;
    public $metallColor;
    public $earParams;
    public $ringSize;
    public $comments;
    public $hallmark;
    public $search_value;

    public function __construct($db)
    {
        $this->conn = $db;
    }


    function createOrder()
    {
        $query = "INSERT INTO orders
                SET
                    orderName = :orderName,
                    customer = :customer,
                    receiveDate = :receiveDate,
                    handoverDate = :handoverDate,
                    priceStart = :priceStart,
                    priceMiddle = :priceMiddle,
                    priceFinal = :priceFinal,
                    urgencyIndex = :urgencyIndex,
                    catIndex = :catIndex,
                    categoryName = :categoryName,
                    statIndex = :statIndex,
                    statusName = :statusName,
                    statusRate = :statusRate,
                    hallmark = :hallmark,
                    metallColor = :metallColor,
                    earParams= :earParams,
                    ringSize = :ringSize,
                    comments = :comments
                ";

        // file_put_contents('order.json', json_encode($this->priceStart));

        $stmt = $this->conn->prepare($query);

        $this->orderName = htmlspecialchars(strip_tags($this->orderName));
        $this->customer = htmlspecialchars(strip_tags($this->customer));
        $this->priceStart = htmlspecialchars(strip_tags($this->priceStart));
        $this->priceMiddle = htmlspecialchars(strip_tags($this->priceMiddle));
        $this->priceFinal = htmlspecialchars(strip_tags($this->priceFinal));
        $this->hallmark = htmlspecialchars(strip_tags($this->hallmark));
        $this->metallColor = htmlspecialchars(strip_tags($this->metallColor));
        $this->earParams = htmlspecialchars(strip_tags($this->earParams));
        $this->ringSize = htmlspecialchars(strip_tags($this->ringSize));
        $this->comments = htmlspecialchars(strip_tags($this->comments));


        $stmt->bindParam(':orderName', $this->orderName);
        $stmt->bindParam(':customer', $this->customer);
        $stmt->bindParam(':receiveDate', $this->receiveDate);
        $stmt->bindParam(':handoverDate', $this->handoverDate);
        $stmt->bindParam(':priceStart', $this->priceStart);
        $stmt->bindParam(':priceMiddle', $this->priceMiddle);
        $stmt->bindParam(':priceFinal', $this->priceFinal);
        $stmt->bindParam(':urgencyIndex', $this->urgencyIndex);
        $stmt->bindParam(':catIndex', $this->catIndex);
        $stmt->bindParam(':categoryName', $this->categoryName);
        $stmt->bindParam(':statIndex', $this->statIndex);
        $stmt->bindParam(':statusName', $this->statusName);
        $stmt->bindParam(':statusRate', $this->statusRate);
        $stmt->bindParam(':hallmark', $this->hallmark);
        $stmt->bindParam(':metallColor', $this->metallColor);
        $stmt->bindParam(':earParams', $this->earParams);
        $stmt->bindParam(':ringSize', $this->ringSize);
        $stmt->bindParam(':comments', $this->comments);

        if ($stmt->execute()) {
            $id = $this->conn->lastInsertId();

            return $id;
        }
        return false;
    }

    function fetchOrders($category)
    {
        $query = "SELECT * FROM orders WHERE catIndex = {$category} ORDER BY urgencyIndex ASC, statusRate ASC, orderId DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        }
        return false;

    }

    function search()
    {
        $query = "SELECT * FROM orders WHERE orderId LIKE :search_value OR orderName LIKE :search_value OR customer like :search_value";

        

        $stmt = $this->conn->prepare($query);

        $this->search_value = htmlspecialchars(strip_tags($this->search_value));
        $stmt->bindParam(':search_value', $this->search_value);

        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $result;
    }


    function quickUpdate()
    {

        $query = "UPDATE orders SET handoverDate = :handoverDate, catIndex = :catIndex, categoryName = :categoryName, statIndex = :statIndex, statusName = :statusName, statusRate = :statusRate, urgencyIndex = :urgencyIndex WHERE orderId = :orderId";
        $stmt = $this->conn->prepare($query);

        // $this->orderId=htmlspecialchars(strip_tags($this->orderId));
        // $this->handoverDate=htmlspecialchars(strip_tags($this->handoverDate));
        // $this->catIndex=htmlspecialchars(strip_tags($this->catIndex));
        // $this->statIndex=htmlspecialchars(strip_tags($this->statIndex));
        // $this->order_urgencyIndex=htmlspecialchars(strip_tags($this->order_urgencyIndex));


        $stmt->bindParam(':orderId', $this->orderId);
        $stmt->bindParam(':handoverDate', $this->handoverDate);
        $stmt->bindParam(':catIndex', $this->catIndex);
        $stmt->bindParam(':categoryName', $this->categoryName);
        $stmt->bindParam(':statIndex', $this->statIndex);
        $stmt->bindParam(':statusName', $this->statusName);
        $stmt->bindParam(':statusRate', $this->statusRate);
        $stmt->bindParam(':urgencyIndex', $this->urgencyIndex);


        if ($stmt->execute()) {
            return true;
        }
        return false;

    }

    function updateOrder()
    {
        $query = "UPDATE orders SET 
                            orderName = :orderName,
                            customer = :customer,
                            receiveDate = :receiveDate,
                            handoverDate = :handoverDate,
                            priceStart = :priceStart,
                            priceMiddle = :priceMiddle,
                            priceFinal = :priceFinal,
                            urgencyIndex = :urgencyIndex,
                            catIndex = :catIndex,
                            categoryName = :categoryName,
                            statIndex = :statIndex,
                            statusName = :statusName,
                            statusRate = :statusRate,
                            hallmark = :hallmark,
                            metallColor = :metallColor,
                            earParams= :earParams,
                            ringSize = :ringSize,
                            comments = :comments
                    WHERE orderId = :orderId";

        $stmt = $this->conn->prepare($query);

        $this->orderName = htmlspecialchars(strip_tags($this->orderName));
        $this->customer = htmlspecialchars(strip_tags($this->customer));
        $this->priceStart = htmlspecialchars(strip_tags($this->priceStart));
        $this->priceMiddle = htmlspecialchars(strip_tags($this->priceMiddle));
        $this->priceFinal = htmlspecialchars(strip_tags($this->priceFinal));
        $this->hallmark = htmlspecialchars(strip_tags($this->hallmark));
        $this->metallColor = htmlspecialchars(strip_tags($this->metallColor));
        $this->earParams = htmlspecialchars(strip_tags($this->earParams));
        $this->ringSize = htmlspecialchars(strip_tags($this->ringSize));
        $this->comments = htmlspecialchars(strip_tags($this->comments));


        $stmt->bindParam(':orderId', $this->orderId);
        $stmt->bindParam(':orderName', $this->orderName);
        $stmt->bindParam(':customer', $this->customer);
        $stmt->bindParam(':receiveDate', $this->receiveDate);
        $stmt->bindParam(':handoverDate', $this->handoverDate);
        $stmt->bindParam(':priceStart', $this->priceStart);
        $stmt->bindParam(':priceMiddle', $this->priceMiddle);
        $stmt->bindParam(':priceFinal', $this->priceFinal);
        $stmt->bindParam(':urgencyIndex', $this->urgencyIndex);
        $stmt->bindParam(':catIndex', $this->catIndex);
        $stmt->bindParam(':categoryName', $this->categoryName);
        $stmt->bindParam(':statIndex', $this->statIndex);
        $stmt->bindParam(':statusName', $this->statusName);
        $stmt->bindParam(':statusRate', $this->statusRate);
        $stmt->bindParam(':hallmark', $this->hallmark);
        $stmt->bindParam(':metallColor', $this->metallColor);
        $stmt->bindParam(':earParams', $this->earParams);
        $stmt->bindParam(':ringSize', $this->ringSize);
        $stmt->bindParam(':comments', $this->comments);


        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function deleteOrder($id)
    {
        $query = "DELETE FROM orders WHERE orderId = {$id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }


    function updateStatus($id)
    {
        $query = "UPDATE orders SET 
                        statIndex = 1,
                        statusName = 'На резке',
                        statusRate = 0
                WHERE orderId = {$id}";
        $stmt = $this->conn->prepare($query);

        if ($stmt->execute()) {
            return true;
        }
        return false;

    }


}

