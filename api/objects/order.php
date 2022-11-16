<?php 

class Order
{
    private $conn;

    public $order_id;
    public $order_name;
    public $customer;
    public $receive_date;
    public $handover_date;
    public $price_1;
    public $price_2;
    public $price_3;
    public $urgency;
    public $cat_index;
    public $category_name;
    public $stat_index;
    public $status_name;
    public $status_rate;
    // public $gold_583;
    // public $gold_750;
    // public $silver;
    // public $gold_583_weight;
    // public $gold_750_weight;
    // public $silver_weight;
    public $metall_color;
    public $ear_params;
    public $ring_size;
    public $comments;
    public $hallmark;

    public $filename;
    public $path_for_db;
    public $path_for_db_min;

    public $insert_name;
    public $insert_size;
    public $insert_qty;

    public $file_path = '/assets/uploads/files/';

    public $rhino_file_id;
    public $rhino_filename;
    public $rhino_file_unique_name;

    public $cutting_file_id;
    public $cutting_filename;
    public $cutting_file_unique_name;

    public $is_file_exists;
    public $search_value;




    public function __construct($db)
    {
        $this->conn = $db;
    }


    function createOrder()
    {
        $query = "INSERT INTO orders
                SET
                    order_name = :order_name,
                    customer = :customer,
                    receive_date = :receive_date,
                    handover_date = :handover_date,
                    price_1 = :price_1,
                    price_2 = :price_2,
                    price_3 = :price_3,
                    urgency = :urgency,
                    cat_index = :cat_index,
                    category_name = :category_name,
                    stat_index = :stat_index,
                    status_name = :status_name,
                    status_rate = :status_rate,
                    hallmark = :hallmark,
                    metall_color = :metall_color,
                    ear_params= :ear_params,
                    ring_size = :ring_size,
                    comments = :comments,
                    is_file_exists = :is_file_exists
                ";

        $stmt = $this->conn->prepare($query);

        $this->order_name = htmlspecialchars(strip_tags($this->order_name));
        $this->customer = htmlspecialchars(strip_tags($this->customer));
        $this->price_1 = htmlspecialchars(strip_tags($this->price_1));
        $this->price_2 = htmlspecialchars(strip_tags($this->price_2));
        $this->price_3 = htmlspecialchars(strip_tags($this->price_3));
        $this->hallmark = htmlspecialchars(strip_tags($this->hallmark));
        $this->metall_color = htmlspecialchars(strip_tags($this->metall_color));
        $this->ear_params = htmlspecialchars(strip_tags($this->ear_params));
        $this->ring_size = htmlspecialchars(strip_tags($this->ring_size));
        $this->comments = htmlspecialchars(strip_tags($this->comments));


        $stmt->bindParam(':order_name', $this->order_name);
        $stmt->bindParam(':customer', $this->customer);
        $stmt->bindParam(':receive_date', $this->receive_date);
        $stmt->bindParam(':handover_date', $this->handover_date);
        $stmt->bindParam(':price_1', $this->price_1);
        $stmt->bindParam(':price_2', $this->price_2);
        $stmt->bindParam(':price_3', $this->price_3);
        $stmt->bindParam(':urgency', $this->urgency);
        $stmt->bindParam(':cat_index', $this->cat_index);
        $stmt->bindParam(':category_name', $this->category_name);
        $stmt->bindParam(':stat_index', $this->stat_index);
        $stmt->bindParam(':status_name', $this->status_name);
        $stmt->bindParam(':status_rate', $this->status_rate);
        $stmt->bindParam(':hallmark', $this->hallmark);
        $stmt->bindParam(':metall_color', $this->metall_color);
        $stmt->bindParam(':ear_params', $this->ear_params);
        $stmt->bindParam(':ring_size', $this->ring_size);
        $stmt->bindParam(':comments', $this->comments);
        $stmt->bindParam(':is_file_exists', $this->is_file_exists);

        if ($stmt->execute()) {
            $id = $this->conn->lastInsertId();
            
            return $id;
        }
        return false;
    }


    function uploadOrderImages()
    {
        $query = "INSERT INTO order_images (image_name, image_src, image_min, order_id) VALUES
				(
                    :filename,
                    :path_for_db,
                    :path_for_db_min,
                    :order_id
                )
				";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':filename', $this->filename);
        $stmt->bindParam(':path_for_db', $this->path_for_db);
        $stmt->bindParam(':path_for_db_min', $this->path_for_db_min);
        $stmt->bindParam(':order_id', $this->order_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;

    }

    function uploadOrderInserts()
    {
        $query = "INSERT INTO order_inserts (insert_name, insert_size, insert_qty, order_id) VALUES
				(
                    :insert_name,
                    :insert_size,
                    :insert_qty,
                    :order_id
                )
				";

        $stmt = $this->conn->prepare($query);

        $this->insert_name = htmlspecialchars(strip_tags($this->insert_name));
        $this->insert_size = htmlspecialchars(strip_tags($this->insert_size));
        $this->insert_qty = htmlspecialchars(strip_tags($this->insert_qty));

        $stmt->bindParam(':insert_name', $this->insert_name);
        $stmt->bindParam(':insert_size', $this->insert_size);
        $stmt->bindParam(':insert_qty', $this->insert_qty);
        $stmt->bindParam(':order_id', $this->order_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;

    }

    function uploadRhinoFiles()
    {
        $query = "INSERT INTO order_rhino_files (file_name, file_unique_name, file_path, order_id) VALUES
				(
                    :file_name,
                    :file_unique_name,
                    :file_path,
                    :order_id
                )
                ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':file_name', $this->rhino_filename);
        $stmt->bindParam(':file_unique_name', $this->rhino_file_unique_name);
        $stmt->bindParam(':file_path', $this->file_path);
        $stmt->bindParam(':order_id', $this->order_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }


    function uploadCuttingFiles()
    {
        $query = "INSERT INTO order_cutting_files (file_name, file_unique_name, file_path, order_id) VALUES
				(
                    :file_name,
                    :file_unique_name,
                    :file_path,
                    :order_id
                )
                ";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':file_name', $this->cutting_filename);
        $stmt->bindParam(':file_unique_name', $this->cutting_file_unique_name);
        $stmt->bindParam(':file_path', $this->file_path);
        $stmt->bindParam(':order_id', $this->order_id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function fetchOrders($category)
    {
        // $page = (isset($currentPage) && $currentPage > 0) ? intval($currentPage) : 1;
        // $offset = ($page > 1) ? (10 * ($page - 1)) : 0;
        // $query = "SELECT * FROM orders WHERE cat_index = {$category} ORDER BY urgency ASC, status_rate ASC, order_id DESC LIMIT {$offset}, 10";
        $query = "SELECT * FROM orders WHERE cat_index = {$category} ORDER BY urgency ASC, status_rate ASC, order_id DESC";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // file_put_contents('orders.json', json_encode($category));
       
        // if ($result) {
        //     return $result;
        // }
        // return false;
        // file_put_contents('orders.json', json_encode($result));
        return $result;
    }

    function search() {
        $query = "SELECT * FROM orders WHERE order_id LIKE :search_value OR order_name LIKE :search_value OR customer like :search_value";

        $stmt = $this->conn->prepare($query);

        $this->search_value = htmlspecialchars(strip_tags($this->search_value));
         $stmt->bindParam(':search_value', $this->search_value);

         $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }

    // function fetchOrders() {
    //     $query = "SELECT * FROM orders";
    //     $stmt = $this->conn->prepare($query);
    //     $stmt->execute();
    //     $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
       
    //     if ($result) {
    //         return $result;
    //     }
    //     return false;
    // }

    function fetchRhinoFiles($id)
    {
        $query = "SELECT * FROM order_rhino_files WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function fetchCuttingFilesById($id)
    {
        $query = "SELECT * FROM order_cutting_files WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result) {
            return $result;
        }
        return false;

    }

    function fetchCuttingFiles()
    {
        $query = "SELECT * FROM order_cutting_files";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function quickUpdate()
    {

        $query = "UPDATE orders SET handover_date = :handover_date, cat_index = :cat_index, category_name = :category_name, stat_index = :stat_index, status_name = :status_name, status_rate = :status_rate, urgency = :urgency WHERE order_id = :order_id";
        $stmt = $this->conn->prepare($query);

        // $this->order_id=htmlspecialchars(strip_tags($this->order_id));
        // $this->handover_date=htmlspecialchars(strip_tags($this->handover_date));
        // $this->cat_index=htmlspecialchars(strip_tags($this->cat_index));
        // $this->stat_index=htmlspecialchars(strip_tags($this->stat_index));
        // $this->order_urgency=htmlspecialchars(strip_tags($this->order_urgency));


        $stmt->bindParam(':order_id', $this->order_id);
        $stmt->bindParam(':handover_date', $this->handover_date);
        $stmt->bindParam(':cat_index', $this->cat_index);
        $stmt->bindParam(':category_name', $this->category_name);
        $stmt->bindParam(':stat_index', $this->stat_index);
        $stmt->bindParam(':status_name', $this->status_name);
        $stmt->bindParam(':status_rate', $this->status_rate);
        $stmt->bindParam(':urgency', $this->urgency);


        if ($stmt->execute()) {
            return true;
        }
        return false;

    }

    function fetchOrderById($id)
    {
        $query = "SELECT * FROM orders WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function fetchImages()
    {
        $query = "SELECT * FROM order_images";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function fetchImagesByID($id)
    {
        $query = "SELECT * FROM order_images WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function fetchInserts($id)
    {
        $query = "SELECT * FROM order_inserts WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function updateOrder()
    {
        $query = "UPDATE orders SET 
                    order_name = :order_name,
                    customer = :customer,
                    receive_date = :receive_date,
                    handover_date = :handover_date,
                    price_1 = :price_1,
                    price_2 = :price_2,
                    price_3 = :price_3,
                    urgency = :urgency,
                    cat_index = :cat_index,
                    category_name = :category_name,
                    stat_index = :stat_index,
                    status_name = :status_name,
                    status_rate = :status_rate,
                    hallmark = :hallmark,
                    metall_color = :metall_color,
                    ear_params= :ear_params,
                    ring_size = :ring_size,
                    comments = :comments,
                    is_file_exists = :is_file_exists
            WHERE order_id = :order_id";

        $stmt = $this->conn->prepare($query);

        $this->order_name = htmlspecialchars(strip_tags($this->order_name));
        $this->customer = htmlspecialchars(strip_tags($this->customer));
        $this->price_1 = htmlspecialchars(strip_tags($this->price_1));
        $this->price_2 = htmlspecialchars(strip_tags($this->price_2));
        $this->price_3 = htmlspecialchars(strip_tags($this->price_3));
        $this->hallmark = htmlspecialchars(strip_tags($this->hallmark));
        $this->metall_color = htmlspecialchars(strip_tags($this->metall_color));
        $this->ear_params = htmlspecialchars(strip_tags($this->ear_params));
        $this->ring_size = htmlspecialchars(strip_tags($this->ring_size));
        $this->comments = htmlspecialchars(strip_tags($this->comments));


        $stmt->bindParam(':order_id', $this->order_id);
        $stmt->bindParam(':order_name', $this->order_name);
        $stmt->bindParam(':customer', $this->customer);
        $stmt->bindParam(':receive_date', $this->receive_date);
        $stmt->bindParam(':handover_date', $this->handover_date);
        $stmt->bindParam(':price_1', $this->price_1);
        $stmt->bindParam(':price_2', $this->price_2);
        $stmt->bindParam(':price_3', $this->price_3);
        $stmt->bindParam(':urgency', $this->urgency);
        $stmt->bindParam(':cat_index', $this->cat_index);
        $stmt->bindParam(':category_name', $this->category_name);
        $stmt->bindParam(':stat_index', $this->stat_index);
        $stmt->bindParam(':status_name', $this->status_name);
        $stmt->bindParam(':status_rate', $this->status_rate);
        $stmt->bindParam(':hallmark', $this->hallmark);
        $stmt->bindParam(':metall_color', $this->metall_color);
        $stmt->bindParam(':ear_params', $this->ear_params);
        $stmt->bindParam(':ring_size', $this->ring_size);
        $stmt->bindParam(':comments', $this->comments);
        $stmt->bindParam(':is_file_exists', $this->is_file_exists);
        
        
        // file_put_contents('update_order.json', json_encode($this->order_name));

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }


    function deleteImage($image_id)
    {
        $query = "DELETE FROM order_images WHERE image_id = {$image_id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function deleteOrder($id) {
        $query = "DELETE FROM orders WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function deleteInserts($id) {
        $query = "DELETE FROM order_inserts WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function fetchCarats() {
        $query = "SELECT * FROM carats";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($result) {
            return $result;
        }
        return false;
    }

    function deleteRhinoFile($file_id) {
        $query = "DELETE FROM order_rhino_files WHERE file_id = {$file_id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function deleteCuttingFile($file_id) {
        $query = "DELETE FROM order_cutting_files WHERE file_id = {$file_id}";
        $stmt = $this->conn->prepare($query);
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function updateCuttingStatus($id) {
        $query = "UPDATE orders SET 
                        stat_index = 1,
                        status_name = 'На резке',
                        status_rate = 0
                WHERE order_id = {$id}";
        $stmt = $this->conn->prepare($query);
        // file_put_contents('debug.json', json_encode($id));

        if ($stmt->execute()) {
            return true;
        }
        return false;

    }

    
}

