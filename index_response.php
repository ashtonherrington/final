<?php
$_SESSION = array();
session_destroy();
session_start();
	$username = $_GET['username'];
	$password = $_GET['password'];

	$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "herrinas-db", "3JCPnCFTmsZs8ASZ", "herrinas-db");
	if(!$mysqli || $mysqli->connect_errno){
		echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
	}

	$credentials = 'SELECT DISTINCT username, password, actualName, feedback1, feedback2, feedback3 FROM user_login';
	$nameFound = false;

	if($row = $mysqli->query($credentials)){
		while($distinctCatagory = $row->fetch_array(MYSQL_NUM)){
			if($distinctCatagory[0] == $username){
				if($distinctCatagory[1] == $password){
				echo "success";
				$nameFound = true;	
				$_SESSION['regUser'] = "1";
				$_SESSION['username'] = $dinstinctCatagory[0];
				$_SESSION['actualName'] = $distinctCatagory[2];
				$_SESSION['feedback1'] = $distinctCatagory[3];
				$_SESSION['feedback2'] = $distinctCatagory[4];
				$_SESSION['feedback3'] = $distinctCatagory[5];
				}
			}
		}
	}
	if($nameFound == false){
		echo "failure";
		$_SESSION['regUser'] = "0";
	}
?>