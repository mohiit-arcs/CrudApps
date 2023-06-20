<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'OPTIONS') {
    die();
}

if ($method != 'DELETE') {
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected. HTTP method should be DELETE'
    ]);
    exit;
}

require 'db_connect.php';
$database = new Operations();
$con = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

// getting id
$id = $_GET['id'];

// when id is not set
if (!isset($id)) {
    echo json_encode([
        'success' => 0,
        'message' => 'Please provide the post ID'
    ]);
    exit;
}

try {
    // selecting post with given id
    $fetch_post = "Select * from `employee` where id=:id";
    $fetch_stmt = $con->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    // if found deleting post
    if ($fetch_stmt->rowCount() > 0) {
        $delete_post = "Delete from `employee` where id=:id";
        $delete_post_stmt = $con->prepare($delete_post);
        $delete_post_stmt->bindValue(':id', $id, PDO::PARAM_INT);

        if ($delete_post_stmt->execute()) {
            echo json_encode([
                'success' => 1,
                'message' => 'Record Deleted Successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Could not delete. Something went wrong'
        ]);
        exit;
    } else {
        // when no record found with given id
        echo json_encode([
            'success' => 0,
            'message' => 'Invalid ID. No posts found by the ID'
        ]);
        exit;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}

?>