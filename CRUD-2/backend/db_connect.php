<?php
class Operations
{
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "crud";

    public function dbConnection()
    {
        try {
            // creating new PDO object for representing connections
            // PDO is PHP extension which helps to access database
            $con = new PDO('mysql:host=' . $this->servername . ';dbname=' . $this->dbname, $this->username, $this->password);
            // setting error mode if any error occured to throw exception
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // returning PDO object so that caller can perform quering methods
            return $con;
        } catch (PDOException $e) {
            // echos error message
            echo "Connection error" . $e->getMessage();
            exit;
        }
    }
}
?>