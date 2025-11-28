<?php
session_start();

if (!isset($_SESSION['students'])) {
    $_SESSION['students'] = [];
}

if (!isset($_SESSION['attendance'])) {
    $_SESSION['attendance'] = [];
}
?>
