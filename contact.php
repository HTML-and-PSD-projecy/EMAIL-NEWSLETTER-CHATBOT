<?php
// Database configuration
$servername = "localhost";
$username = "root"; // Default XAMPP username
$password = ""; // Default XAMPP password (usually empty)
$dbname = "contact_form_db"; // Use underscores instead of spaces for database names

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $firstName = htmlspecialchars(trim($_POST['fname']));
    $lastName = htmlspecialchars(trim($_POST['lname']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contacts (first_name, last_name, email, message) VALUES (?, ?, ?, ?)");
    
    // Check if the statement was prepared successfully 
    if ($stmt === false) {
        die("Prepare failed: " . htmlspecialchars($conn->error));
    }

    $stmt->bind_param("ssss", $firstName, $lastName, $email, $message);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Thank you for contacting us, $firstName. We will get back to you shortly.";
    } else {
        echo "Error: " . htmlspecialchars($stmt->error);
    }

    // Close the statement
    $stmt->close();
} else {
    echo "Invalid request method.";
}

// Close the connection
$conn->close();
?>
