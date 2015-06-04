<?php
session_start();

if($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['formType'] == 'company'){
	echo "Company worked";
}
echo "TEST TEST";

?>