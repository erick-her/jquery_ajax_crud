<?php

  // Include database and object files
  include_once'../config/database.php';
  include_once'../objects/user.php';

  // Get database connection
  $database = new Database();
  $db = $database->getConnection();

  // Prepare user object
  $user = new User($db);

  $user->id = $_POST['id'];

  // Delete user
  if($user->delete()){
    $data = array(
      'status' => 'success',
      'id' => $user->id
    );
  }else{
    $data = array(
      'status' => 'An Error has ocurred.'
    );
  }

  print_r(json_encode($data));
