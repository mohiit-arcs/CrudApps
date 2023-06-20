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

// set default values for page and itemsPerPage
$page = isset($_GET['page']) ? (int) $_GET['page'] : 1;
$itemsPerPage = isset($_GET['itemsPerPage']) ? (int) $_GET['itemsPerPage'] : 10;

// calculate offset based on page and itemsPerPage
$offset = ($page - 1) * $itemsPerPage;

try {
    // count total number of records
    $countSql = "SELECT COUNT(*) as total FROM employee";
    $countStmt = $con->prepare($countSql);
    $countStmt->execute();
    $totalCount = $countStmt->fetch(PDO::FETCH_ASSOC)['total'];

    // select data for the current page
    $sql = "SELECT * FROM employee LIMIT :offset, :limit";
    $stmpt = $con->prepare($sql);
    $stmpt->bindParam(':offset', $offset, PDO::PARAM_INT);
    $stmpt->bindParam(':limit', $itemsPerPage, PDO::PARAM_INT);
    $stmpt->execute();

    // if records returned sending record as JSON
    if ($stmpt->rowCount() > 0) {
        $data = $stmpt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => 1,
            'data' => $data,
            'page' => $page,
            'itemsPerPage' => $itemsPerPage,
            'totalCount' => $totalCount,
            'totalPages' => ceil($totalCount / $itemsPerPage),
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