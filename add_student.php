<?php
$conn = new mysqli("localhost","root","","attendance_db");
if($conn->connect_error) die("Erreur connexion: ".$conn->connect_error);

if($_SERVER["REQUEST_METHOD"] === "POST"){
    $firstname = $_POST["firstname"];
    $lastname  = $_POST["lastname"];
    $email     = $_POST["email"];
    $stmt = $conn->prepare("INSERT INTO students (firstname, lastname, email) VALUES (?, ?, ?)");
    $stmt->bind_param("sss",$firstname,$lastname,$email);
    $stmt->execute();
    $stmt->close();
    echo "<p class='success'>Étudiant ajouté avec succès !</p>";
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Ajouter Étudiant</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Ajouter un étudiant</h2>
<form method="POST" class="form-box">
    <label>Prénom :</label>
    <input type="text" name="firstname" required>
    <label>Nom :</label>
    <input type="text" name="lastname" required>
    <label>Email :</label>
    <input type="email" name="email" required>
    <input type="submit" value="Ajouter">
</form>
</body>
</html>














