<?php

$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "herrinas-db", "3JCPnCFTmsZs8ASZ", "herrinas-db");
if(!$mysqli || $mysqli->connect_errno){
	echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
}

$username = $_GET['newUser'];
$password = $_GET['newPW'];

$nameTaken = false;
$credentials = 'SELECT DISTINCT username, password FROM user_login';

if($row = $mysqli->query($credentials)){
	while($distinctCatagory = $row->fetch_array(MYSQL_NUM)){
		if($distinctCatagory[0] == $username){
			$nameTaken = true;
		}
	}
}

if($nameTaken == true){
	echo "Selection invalid, username already in use.";
}
else{
	
	if (!($stmt = $mysqli->prepare("INSERT INTO user_login(username, password) VALUES (?, ?)"))) {
		echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
	}	
	if (!$stmt->bind_param("ss", $username, $password)) {
	    echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
	}
	if (!$stmt->execute()) {
	    echo "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
	}
	echo "New user entered successfully, click <a href='main.php?action=end'>here</a> to log in.";

}


?>