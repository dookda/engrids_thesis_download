<?php
	$db_config=array(
    "host"=>"mysql",  
    "user"=>"admin", 
    "pass"=>"1234",
    "dbname"=>"thesis",  
    "charset"=>"utf8" 
);
$objCon = @new mysqli($db_config["host"], $db_config["user"], $db_config["pass"], $db_config["dbname"]);

if(mysqli_connect_error()) {
    die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
    exit;
}

$objCon->set_charset("utf8");
?>