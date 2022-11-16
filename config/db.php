<?php

class Database {
    // private $host = 'localhost';
    // private $db_name = 'tyusha_studio';
    // private $username = 'tyusha_studio';
    // private $password = '00c*LVC0';
    // public $conn;

    private $host = 'localhost';
    private $db_name = 'yuliya_db';
    private $username = 'root';
    private $password = '';
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

}



// try {
//     $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
// } catch (PDOException $e) {
//     echo 'connection failed' . $e->getMessage();
// }

