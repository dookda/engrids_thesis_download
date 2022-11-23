<?php
    $statusMsg = '';
    $targetDir = "./../files/";
    $fileName = basename($_FILES["file"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    // print($fileName);
    $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

    function insertThesis($std_id,$std_name,$advisor,$thesis_title,$file_name){
        include("./../api/connect.php");
        $strSQL = "INSERT INTO thesis(std_id,std_name,advisor,thesis_title,file_name,dt)VALUES($std_id,'$std_name','$advisor','$thesis_title','$file_name',now())";
        // print($strSQL);
        mysqli_query($objCon, $strSQL);
    }

    if(isset($_POST) && !empty($_FILES["file"]["name"])) {
        $allowTypes = array('pdf');
        if(in_array($fileType, $allowTypes)){
            if(move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)){
                // $_POST = json_decode(file_get_contents("php://input"),true);
                $std_id = ($_POST['std_id'] ? $_POST['std_id'] : 9999);
                $std_name = $_POST['std_name'];
                $advisor = $_POST['advisor'];
                $thesis_title = $_POST['thesis_title'];
                
                insertThesis((int)$std_id,$std_name,$advisor,$thesis_title,$fileName);
                $status = "อัพโหลดสำเร็จ";
                $statusMsg = "อัพโหลดไฟล์ ".$fileName. " สำเร็จ";
            }else{
                $status = "อัพโหลดไม่สำเร็จ";
                $statusMsg = "เกิดข้อผิดพลาด กรุณาอัพโหลดไฟล์ขนาดไม่เกิน 8 Mb อีกครั้ง ";
            }
        }else{
            $status = "อัพโหลดไม่สำเร็จ";
            $statusMsg = 'กรุณาอัพโหลดไฟล์ PDF เท่านั้น';
        }
    }else{
        $status = "อัพโหลดไม่สำเร็จ";
        $statusMsg = 'กรุณาเลือกไฟล์ PDF เพื่ออัพโหลด';
    }
    // echo $statusMsg;
    header('Location: ./../upload/index.html?statusMsg='.$statusMsg.'&status='.$status);
?>