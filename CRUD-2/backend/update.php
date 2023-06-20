<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$method = $_SERVER['REQUEST_METHOD'];

// when browser send options request to check CORS policy
if ($method == "OPTIONS") {
    die();
}

// when request method is other than put
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    // show error message
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected! Only PUT method is allowed'
    ]);
    exit;
}

// creating and establishing db connection
require 'db_connect.php';
$database = new Operations();
$con = $database->dbConnection();

// read raw http body by decoding
$data = json_decode(file_get_contents("php://input"));

// print_r($data);
// die();

// checking if id is set or not
if (!isset($data->id)) {
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter correct ID'
    ]);
    exit;
}

// checking if all the fields are present in data
if (!isset($data->name) || !isset($data->gender) || !isset($data->email) || !isset($data->mobile) || !isset($data->pincode) || !isset($data->state) || !isset($data->password) || !isset($data->employment_type) || !isset($data->address)) {
    http_response_code(400);
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter all the fields'
    ]);
    exit;
}
// checking fields should not be empty
else if (empty(trim($data->name)) || empty(trim($data->gender)) || empty(trim($data->email)) || empty(trim($data->mobile)) || empty(trim($data->pincode)) || empty(trim($data->state)) || empty(trim($data->password)) || empty(trim($data->employment_type)) || empty(trim($data->address))) {
    http_response_code(400);
    echo json_encode([
        'success' => 0,
        'message' => 'Fields cannot be empty'
    ]);
    exit;
}

try {
    $fetch_post = "Select * from `employee` where id=:id";
    $fetch_stmt = $con->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) {
        // retreive row data
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        // checking for updated values
        $name = isset($data->name) ? $data->name : $row['name'];
        $gender = isset($data->gender) ? $data->gender : $row['gender'];
        $email = isset($data->email) ? $data->email : $row['email'];
        $mobile = isset($data->mobile) ? $data->mobile : $row['mobile'];
        $pincode = isset($data->pincode) ? $data->pincode : $row['pincode'];
        $state = isset($data->state) ? $data->state : $row['state'];
        $password = isset($data->password) ? $data->password : $row['password'];
        $employment_type = isset($data->employment_type) ? $data->employment_type : $row['employment_type'];
        $address = isset($data->address) ? $data->address : $row['address'];

        // update query 
        $update_query = "Update `employee` SET name = :name,
        gender = :gender,
        email = :email,
        mobile = :mobile,
        pincode = :pincode,
        state = :state,
        password = :password,
        employment_type = :employment_type,
        address = :address
        where id = :id";

        $update_stmt = $con->prepare($update_query);

        $update_stmt->bindValue(':name', htmlspecialchars(strip_tags($name), PDO::PARAM_STR));
        $update_stmt->bindValue(':gender', htmlspecialchars(strip_tags($gender), PDO::PARAM_STR));
        $update_stmt->bindValue(':email', htmlspecialchars(strip_tags($email), PDO::PARAM_STR));
        $update_stmt->bindValue(':mobile', htmlspecialchars(strip_tags($mobile), PDO::PARAM_STR));
        $update_stmt->bindValue(':pincode', htmlspecialchars(strip_tags($pincode), PDO::PARAM_STR));
        $update_stmt->bindValue(':state', htmlspecialchars(strip_tags($state), PDO::PARAM_STR));
        $update_stmt->bindValue(':password', htmlspecialchars(strip_tags($password), PDO::PARAM_STR));
        $update_stmt->bindValue(':employment_type', htmlspecialchars(strip_tags($employment_type), PDO::PARAM_STR));
        $update_stmt->bindValue(':address', htmlspecialchars(strip_tags($address), PDO::PARAM_STR));
        $update_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);

        // executing query
        if ($update_stmt->execute()) {
            echo json_encode([
                'success' => 1,
                'message' => 'Record updated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not update! Something went wrong.'
        ]);
        exit;
    } else {
        echo json_encode([
            'success' => 0,
            'message' => 'Invalid ID! No record Found.'
        ]);
        exit;
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}


?>