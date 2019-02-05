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

    }

    /**
    * Read user function.
    **/
    function read(){
      // Query
      $query = 'SELECT first_name, last_name, phone_number, email FROM '
      . $this->table_name;

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
