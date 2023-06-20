<?php
// die();
// show notice when errors occured only
error_reporting(E_ERROR);
// * allows requests from anywhere
header("Access-Control-Allow-Origin: *");
// used for authorization tokens
header("Access-Control-Allow-Headers: access");
// allow GET requests
header("Access-Control-Allow-Methods: GET");
// allow cookies to sent with the request
header("Access-Control-Allow-Credentials: true");
// used for using json
header("Content-Type: application/json; charset=UTF-8");

// when request method is not GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    // sends error message
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request Detected! Only get method is allowed',
    ]);
    exit;
}

// including php file
require 'db_connect.php';

// creating object
$database = new Operations();
// calling method to establish connection
$con = $database->dbConnection();

// getting id value
$employee_id = $_GET['id'];

try {
    // if id passed then id data otherwise all the data
    $sql = is_numeric($employee_id) ? "Select * from `employee` where id='$employee_id'" : "Select * from `employee`";

    // preparing query for execution
    $stmpt = $con->prepare(($sql));
    // executing query
    $stmpt->execute();

    // if records returned sending record as JSON
    if ($stmpt->rowCount() > 0) {
        $data = null;
        if (is_numeric($employee_id)) {
            // returns associative array , column name as key and corresonding value
            $data = $stmpt->fetch(PDO::FETCH_ASSOC);
        } else {
            $data = $stmpt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            'success' => 1,
            'data' => $data
        ]);
    } else {
        // sending error message as JSON response
        echo json_encode([
            'success' => 0,
            'message' => 'No Record Found!'
        ]);
    }
} catch (PDOException $e) {
    // set response status code to 405 Not Allowed
    http_response_code(405);
    // sending error message
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}

?>


