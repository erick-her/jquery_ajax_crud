<?php

  // Include database and object files
  include_once'../config/database.php';
  include_once'../objects/user.php';

  // Get database connection
  $database = new Database();
  $db = $database->getConnection();

  // Prepare user object
  $user = new User($db);

  // Set user property values
  $user->first_name = $_POST['first_name'];
  $user->last_name = $_POST['last_name'];
  $user->phone_number = $_POST['phone_number'];
  $user->email = $_POST['email'];
  $user->created = date('Y-m-d H:i:s');

  // Create user
  if($user->create()){
    echo 'success';
  }else{
    echo 'An error has occured.';
  }
