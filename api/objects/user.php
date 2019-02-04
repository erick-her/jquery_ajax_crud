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
