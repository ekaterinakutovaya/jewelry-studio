<?php 

class User {
    private $conn;

    public $user_id;
    public $username;
    public $password;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        $query = "INSERT INTO users
                SET
                    username = :username,
                    password = :password";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(':username', $this->username);

        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        if ($stmt->execute()) {
            return true;
        }
        return false;
        
    }

    function isUserExists() {
        $query = "SELECT * FROM users WHERE username = :username";

        $stmt = $this->conn->prepare($query);

        $this->username=htmlspecialchars(strip_tags($this->username));
        $stmt->bindParam(':username', $this->username);
        $stmt->execute();
       
        $num = $stmt->rowCount();

        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $this->user_id = $row['user_id'];
            $this->username = $row['username'];
            $this->password = $row['password'];
            return $row;
        }
        return false;

    }

}

