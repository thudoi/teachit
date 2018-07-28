<?php 
//Set API user and password
define("API_USER","xxxxxxxx");
define("API_PASS","yyyyyyyy");

if (grantAccountAccess('tmp_5903a16748c8c_1493410151','8c896f52')) {
    echo "successfully granted access";
}


function grantAccountAccess($account,$siteName) {

    $data = '{"permissions":["INSITE",
  "RESET",
  "SEO",
  "STATS_TAB",
  "REPUBLISH",
  "EDIT",
  "BLOG",
  "PUSH_NOTIFICATIONS",
  "PUBLISH",
  "CUSTOM_DOMAIN"]
}';

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    //format URL to grant access to email and sitename passed
    curl_setopt($ch, CURLOPT_URL, 'https://api.dudamobile.com/api/accounts/'.$account.'/sites/'.$siteName.'/permissions');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, API_USER.':'.API_PASS);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    //execute cURL call
    $output = curl_exec($ch);
    //check result for correct HTTP code
    if(curl_getinfo($ch,CURLINFO_HTTP_CODE) == 204) {
        curl_close($ch);
        return true;
    } else {
        curl_close($ch);
        die('Granting access failed, error: '. $output . '<br/>');
    }
}