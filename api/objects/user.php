<?php
  class User {
    // Database connection and table name
    private $conn;
    private $table_name = 'user';

    // Object properties
    public $id;
    public $first_name;
    public $last_name;
    public $phone_number;
    public $email;
    public $created;

    /**
    * Constructor with database connection as parameter.
    **/
    public function __construct($db){
      $this->conn = $db;
    }

    /**
    * Create user function.
    **/
    function create(){
      // Query
      $query = 'INSERT INTO ' .
      $this->table_name .
      ' SET first_name=:first_name, last_name=:last_name, phone_number=:phone_number, email=:email, created=:created';

      // Prepare query
      $stmt = $this->conn->prepare($query);

      // Sanitize
      $this->first_name = htmlspecialchars(strip_tags($this->first_name));
      $this->last_name = htmlspecialchars(strip_tags($this->last_name));
      $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
      $this->email = htmlspecialchars(strip_tags($this->email));
      $this->created = htmlspecialchars(strip_tags($this->created));

      // Bind values
      $stmt->bindParam(':first_name', $this->first_name);
      $stmt->bindParam(':last_name', $this->last_name);
      $stmt->bindParam(':phone_number', $this->phone_number);
      $stmt->bindParam(':email', $this->email);
      $stmt->bindParam(':created', $this->created);

      // Execute query
      if($stmt->execute()){
        $this->id = $this->conn->lastInsertId();
        return true;
      }else{
        return false;
      }
    }

    /**
    * Read user function.
    **/
    function read(){
      // Query
      $query = 'SELECT user_id, first_name, last_name, phone_number, email FROM '
      . $this->table_name .
      ' ORDER BY user_id DESC';

      // Prepare query
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    /**
    * Update user function.
    **/
    function update(){

    }

    /**
    * Delete user function.
    **/
    function delete(){

    }
  }
