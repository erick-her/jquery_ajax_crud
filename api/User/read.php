<?php

  // Include database and object files
  include_once'../config/database.php';
  include_once'../objects/user.php';

  // Get database connection
  $database = new Database();
  $db = $database->getConnection();

  // Prepare user object
  $user = new User($db);

  // Retrieve stmt from user function read
  $stmt = $user->read();

  // Loop through all logs and store in json
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $json[] = $row;
  }

  // Store all results in data array
  $data = array(
    'status' => 'success',
    'data' => $json
  );

  // Returns data in JSON format
  print_r(json_encode($data));
