<?php
    function getDetail($code){
        include("./connect.php");
        $products_arr["data"]=array();
        $strSQL = "SELECT count(id) as count, date(dt) as dt FROM download_his WHERE cmuitaccount='$code' GROUP BY date(dt) 
        ORDER BY date(dt)";
        // print($strSQL);
        $objQuery = mysqli_query($objCon, $strSQL);
        while($row = mysqli_fetch_array($objQuery, MYSQLI_ASSOC)){
            array_push($products_arr["data"], $row);
        }
        http_response_code(200);
        echo json_encode($products_arr);
    }
    
    $_POST = json_decode(file_get_contents("php://input"),true);
    if (isset($_POST) || empty($_POST)) {
        
        $code = $_POST['geo_cmuitaccount'];
        // print($code);
        getDetail($code);
    }else{
        echo "not allowed";
    }
?>