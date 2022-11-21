<?php
    function getDetail($code){
        include("./connect.php");
        $products_arr["data"]=array();
        $strSQL = "SELECT * FROM thesis WHERE id='$code'";
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
        
        // echo $_POST['paper_id'];
        $response = $_POST['paper_id'];
        $code = json_decode($response);
        // print($data);
        getDetail($code);
    }else{
        echo "not allowed";
    }
?>