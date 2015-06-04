<?php
session_start();

if(isset($_GET['action']) && $_GET['action'] == 'end'){
	$_SESSION = array();
	session_destroy();
    header("Location: index.html", true);
	die();
}
else{

	$userType = $_SESSION['regUser'];
	$userName = $_SESSION['actualName'];

	if($userType == "1"){
		echo "$userType $userName";
	}
	else{
		echo "$userType $userName";
	}
}
