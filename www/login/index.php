<?php
    
    if (isset($_GET) || empty($_GET)) {
        $code = $_GET['code'];
        getAccessToken($code);
    }else{
        echo "not allowed";
    }

    function getAccessToken($code){
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://oauth.cmu.ac.th/v1/GetToken.aspx',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => 'code='.$code.'&redirect_uri=http%3A%2F%2Flocalhost%2Flogin%2Findex.php&client_id=vfue5sa0rvFkqkxQyj3KEjjqhrVrphFQBd2Mf0Nz&client_secret=g07dxSNJN48n6WXk6d7RGWNgZ1UkuXJJGECQnf2B&grant_type=authorization_code',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/x-www-form-urlencoded'
            ),
        ));     
        $response = curl_exec($curl);
        if($response){
            // echo $response;
            $data = json_decode($response);
            $accessToken = $data->access_token;
            getUserInfo($accessToken);
        }else{
            echo "not allowed";
        }
        curl_close($curl);
    }

    function getUserInfo($accessToken){
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://misapi.cmu.ac.th/cmuitaccount/v1/api/cmuitaccount/basicinfo',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
            CURLOPT_HTTPHEADER => array(
              'Authorization: Bearer '.$accessToken,
              'Cookie: BIGipServermisapi_pool=536964618.20480.0000'
            ),
          ));
          
        $response = curl_exec($curl);    
        
        if($response){
            $paper_id = $_GET['state'];
            $data = json_decode($response);
            $student_id = $data->student_id;
            $cmuitaccount = $data->cmuitaccount;
            $firstname_TH = $data->firstname_TH;
            $lastname_TH = $data->lastname_TH;
            $organization_name_TH = $data->organization_name_TH;
            // print($student_id);
            $expire = time() + (60 * 5); // 1 hour
            setcookie("geo_student_id", $student_id, $expire, "/");
            setcookie("geo_cmuitaccount", $cmuitaccount, $expire, "/");
            setcookie("geo_firstname_TH", $firstname_TH, $expire, "/");
            setcookie("geo_lastname_TH", $lastname_TH, $expire, "/");
            setcookie("geo_organization_name_TH", $organization_name_TH, $expire, "/");
            // header('Location: ./../../download/index.html?paper_id='.$paper_id);
            // print($paper_id);
            if($paper_id != null){
                header('Location: ./../../download/index.html?paper_id='.$paper_id);
            }else{
                header('Location: ./../index.html');
            }
        }else{
            echo "not allowed";
        }
        curl_close($curl);
    }
?>