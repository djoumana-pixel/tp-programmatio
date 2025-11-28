<?php
$conn = new mysqli("localhost","root","","attendance_db");
if($conn->connect_error) die("Erreur connexion: ".$conn->connect_error);

if(isset($_GET["delete"])){
    $id=intval($_GET["delete"]);
    $conn->query("DELETE FROM students WHERE id=$id");
    header("Location: manage_students.php");
    exit;
}

$students=$conn->query("SELECT * FROM students ORDER BY firstname ASC");
?>
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Gérer les étudiants</title>
<link rel="stylesheet" href="style.css">
</head>
<body>
<h2>Liste des étudiants</h2>
<table>
<tr>
<th>ID</th>
<th>Prénom</th>
<th>Nom</th>
<th>Email</th>
<th>Action</th>
</tr>
<?php while($s=$students->fetch_assoc()): ?>
<tr>
<td><?= $s['id'] ?></td>
<td><?= htmlspecialchars($s['firstname']) ?></td>
<td><?= htmlspecialchars($s['lastname']) ?></td>
<td><?= htmlspecialchars($s['email']) ?></td>
<td><a class="delete-btn" href="?delete=<?= $s['id'] ?>" onclick="return confirm('Supprimer cet étudiant ?');">Supprimer</a></td>
</tr>
<?php endwhile; ?>
</table>
</body>
</html>














