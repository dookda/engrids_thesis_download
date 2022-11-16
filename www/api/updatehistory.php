<?php
    function insertHistory($student_id, $cmuitaccount, $firstname_th, $lastname_th, $org_name_th, $paper_id){
        include("./connect.php");
        $products_arr["data"]=array();
        $strSQL = "INSERT INTO download_his(student_id,cmuitaccount,firstname_th,lastname_th,org_name_th,paper_id,dt)VALUES('$student_id','$cmuitaccount','$firstname_th','$lastname_th','$org_name_th','$paper_id',now())";
        // print($strSQL);
        mysqli_query($objCon, $strSQL);
        http_response_code(200);
        echo json_encode("insert ok");
    }
    
    $_POST = json_decode(file_get_contents("php://input"),true);
    // print($_POST);
    if (isset($_POST) || empty($_POST)) {
        $student_id = $_POST['geo_student_id'];
        $cmuitaccount = $_POST['geo_cmuitaccount'];
        $firstname_th = $_POST['geo_firstname_TH'];
        $lastname_th = $_POST['geo_lastname_TH'];
        $org_name_th = $_POST['geo_organization_name_TH'];
        $paper_id = $_POST['paper_id'];
        insertHistory($student_id, $cmuitaccount, $firstname_th, $lastname_th, $org_name_th, $paper_id);
    }else{
        echo "not allowed";
    }
?>