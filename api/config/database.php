<?php
  class Database {
    // Database credentials
    private $host = '';
    private $db_name = '';
    private $user_name = '';
    private $password = '';
    public $conn;

    /**
    * Get database connection.
    **/
    public function getConnection(){
      $this->conn = null;

      try {
        $this->conn = new PDO('mysql:host='.$this->host.';dbname='.$this->db_name, $this->user_name, $this->password);
        $this->conn->exec('set names utf8');
      }catch(PDOException $exception){
        echo 'connection error: '.$exception->getMessage();
      }
      return $this->conn;
    }
  }
