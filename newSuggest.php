<?php
session_start();

$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "herrinas-db", "3JCPnCFTmsZs8ASZ", "herrinas-db");
if(!$mysqli || $mysqli->connect_errno){
	echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
}

$day = $_GET['day'];
$day = (string)$day;
$month = $_GET['month'];
$month = (string)$month;
$year = $_GET['year'];
$year = (string)$year;
$totaldate = $month . "/" . $day . "/" . $year;
$suggestion = $_GET['suggestion'];
$name = $_SESSION['actualName'];
$fixed = strtotime($totaldate);
$fixedDate = date("Y-m-d",$fixed);

if (!($stmt = $mysqli->prepare("INSERT INTO suggestions(currentdate, name, comments) VALUES (?, ?, ?)"))) {
	echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}	
if (!$stmt->bind_param("sss", $fixedDate, $name, $suggestion)) {
    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}
if (!$stmt->execute()) {
    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
}


?>