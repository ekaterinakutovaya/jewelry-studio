<?php 

class User {
    private $conn;
    private $table_name = 'users';

    public $user_id;
    public $username;
    public $password;
    public $role;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    username = :username,
                    password = :password,
                    role = 'USER'";

        $stmt = $this->conn->prepare($query);

        $this->username=htmlspecialchars(strip_tags($this->username));
        $this->password=htmlspecialchars(strip_tags($this->password));

        $stmt->bindParam(':username', $this->username);

        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);

        if ($stmt->execute()) {
            return true;
        }
        return false;
        
    }

    function isUserExists() {
        $query = "SELECT * FROM " . $this->table_name . " WHERE username = :username";

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
            $this->role = $row['role'];
            return $row;
        }
        return false;

    }

}

