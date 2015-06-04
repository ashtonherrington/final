<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	
	$text = $_POST['inputText'];
	$username = $_SESSION['actualName'];

	
	$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "herrinas-db", "3JCPnCFTmsZs8ASZ", "herrinas-db");
	
	if($_POST['whichFeedback'] == 'feedback1'){
		if(!$mysqli || $mysqli->connect_errno){
		echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
		}
		else{
			//$lineInput = "UPDATE user_login SET feedback1='$text' WHERE actualName='$username'";
			$lineInput = $mysqli->prepare("UPDATE user_login SET feedback1=? WHERE actualName=?");
			$lineInput->bind_param("ss", $text, $username);
			$lineInput->execute();
			//$mysqli->query($lineInput);
			header("Location: myCode.html", true);
		}
		$_SESSION['feedback1'] = $text;
	}

	if($_POST['whichFeedback'] == 'feedback2'){
		if(!$mysqli || $mysqli->connect_errno){
		echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
		}
		else{			
			//$lineInput = "UPDATE user_login SET feedback2='$text' WHERE actualName='$username'";
			$lineInput = $mysqli->prepare("UPDATE user_login SET feedback2=? WHERE actualName=?");
			$lineInput->bind_param("ss", $text, $username);
			$lineInput->execute();
			//$mysqli->query($lineInput);
			header("Location: myCode.html", true);
		}
		$_SESSION['feedback2'] = $text;
	}

	if($_POST['whichFeedback'] == 'feedback3'){
		if(!$mysqli || $mysqli->connect_errno){
		echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
		}
		else{
			//$lineInput = "UPDATE user_login SET feedback3='$text' WHERE actualName='$username'";
			$lineInput = $mysqli->prepare("UPDATE user_login SET feedback3=? WHERE actualName=?");
			$lineInput->bind_param("ss", $text, $username);
			$lineInput->execute();
			//$mysqli->query($lineInput);
			header("Location: myCode.html", true);
		}
		$_SESSION['feedback3'] = $text;
	}

}

?>