<?php
    class Food {
        private $db;

        function __construct($servername, $username, $password, $db) {
            
            // Create connection
            $conn = new mysqli($servername, $username, $password,$db);
            
            // Check connection
            if ($conn->connect_error) {
              die("Connection failed: " . $conn->connect_error);
            }
            $this->conn = $conn;
        }       

        function getAll(){
            $sql = "SELECT
            UNIX_TIMESTAMP(d.dt) `sort`,
            DATE_FORMAT(d.dt, '%c/%d/%y %h:%i%p') `dt`,
            f.foodtype,
            d.food_desc,
            d.id,
            DATE_FORMAT(d.dt, '%Y-%m-%d') `date`,
            DATE_FORMAT(d.dt, '%H:%i') `time`,
            d.foodtype_id
        FROM diary d
            JOIN foodtype_lookup f ON d.foodtype_id = f.id
            order by d.dt desc
        ";
            $result = $this->conn-> query($sql);
            $rows = $result->fetch_all(MYSQLI_ASSOC);
            return $rows;
        }

        function newFood($dt, $type, $food){
            $stmt = $this->conn->prepare("INSERT INTO diary (dt, foodtype_id, food_desc) VALUES (?,?,?)");
            $stmt->bind_param("sis", $dt, $type, $food);
            $stmt->execute();
            $stmt->close();            
            return true;
        }

        function delFood($id){
            $stmt = $this->conn->prepare("delete from diary where id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $stmt->close();
            return true;
        }

        function updateFood($id, $dt, $type, $food){
            $stmt = $this->conn->prepare("update diary set dt = ?, foodtype_id = ?, food_desc = ? where id = ?");
            $stmt->bind_param("sisi", $dt, $type, $food, $id);
            $stmt->execute();
            $stmt->close();            
            return true;            
        }
    }
?>