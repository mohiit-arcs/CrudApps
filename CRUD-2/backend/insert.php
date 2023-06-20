<?php
// * allows requests from anywhere
header("Access-Control-Allow-Origin: *");
// used for authorization tokens
header("Access-Control-Allow-Headers: access");
// allow POST requests
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// used for using json
header("Content-Type: application/json; charset=UTF-8");

$method = $_SERVER['REQUEST_METHOD'];

if($method == 'OPTIONS') {
    die();
}


// when request method is not POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    // show error message
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request! Only POST method is allowed'
    ]);
    exit;
}

// including php file
require 'db_connect.php';

// creating object
$database = new Operations();
// calling method to establish connection
$con = $database->dbConnection();

// decoding json data sent in the request
$data = json_decode(file_get_contents("php://input"));

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
    // convert special characters into html entities to avoid XSS attack
    // (XSS) Cross-Site Scripting attacks are a type of injection
    // in which malicious scripts are injected
    $name = htmlspecialchars(trim($data->name));
    $gender = htmlspecialchars(trim($data->gender));
    $email = htmlspecialchars(trim($data->email));
    $mobile = htmlspecialchars(trim($data->mobile));
    $pincode = htmlspecialchars(trim($data->pincode));
    $state = htmlspecialchars(trim($data->state));
    $password = htmlspecialchars(trim($data->password));
    $employment_type = htmlspecialchars(trim($data->employment_type));
    $address = htmlspecialchars(trim($data->address));

    // query for insertion of data
    $query = "Insert Into `employee` (name, gender, email, mobile, pincode, state, password, employment_type, address)
    values(
        :name,
        :gender,
        :email,
        :mobile,
        :pincode,
        :state,
        :password,
        :employment_type,
        :address
    )";

    $stmt = $con->prepare($query);

    // binding the placholder string with corresponding values to avoid injection
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':gender', $gender, PDO::PARAM_STR);
    $stmt->bindValue(':email', $email, PDO::PARAM_STR);
    $stmt->bindValue(':mobile', $mobile, PDO::PARAM_STR);
    $stmt->bindValue(':pincode', $pincode, PDO::PARAM_STR);
    $stmt->bindValue(':state', $state, PDO::PARAM_STR);
    $stmt->bindValue(':password', $password, PDO::PARAM_STR);
    $stmt->bindValue(':employment_type', $employment_type, PDO::PARAM_STR);
    $stmt->bindValue(':address', $address, PDO::PARAM_STR);

    // finally execiting prepared statements
    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully'
        ]);
        exit;
    }

    // when execution failed
    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in inserting data'
    ]);
    exit;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}





?>