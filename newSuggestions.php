<?php
session_start();

$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "herrinas-db", "3JCPnCFTmsZs8ASZ", "herrinas-db");
if(!$mysqli || $mysqli->connect_errno){
	echo "Connection error ".$mysqli->connect_errno . "".$mysqli->connect_error;
}

$selection = "SELECT currentdate, name, comments FROM suggestions";

$queryResults = $mysqli->query($selection);

echo "Suggestion log: <br><br>";

while($row = $queryResults->fetch_row()){

	echo "$row[0]<br>\"$row[2]\" -$row[1]<br><br>";

}

?>