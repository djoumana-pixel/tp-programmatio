<?php
$conn = new mysqli("localhost","root","","attendance_db");
$students=$conn->query("SELECT * FROM students ORDER BY firstname ASC");

if($_SERVER["REQUEST_METHOD"] === "POST"){
    foreach($_POST["status"] as $id=>$value){
        $conn->query("INSERT INTO attendance (student_id,status) VALUES ($id,'$value')");
    }
    echo "<p class='success'>Présence enregistrée !</p>";
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Prendre présence</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Prendre la présence</h2>
<form method="POST">
<table>
<tr>
<th>ID</th>
<th>Nom complet</th>
<th>Présent</th>
<th>Absent</th>
</tr>
<?php while($s=$students->fetch_assoc()): ?>
<tr>
<td><?= $s['id'] ?></td>
<td><?= htmlspecialchars($s['firstname']." ".$s['lastname']) ?></td>
<td><input type="radio" name="status[<?= $s['id'] ?>]" value="Présent" required></td>
<td><input type="radio" name="status[<?= $s['id'] ?>]" value="Absent"></td>
</tr>
<?php endwhile; ?>
</table>
<input type="submit" value="Enregistrer">
</form>
</body>
</html>













