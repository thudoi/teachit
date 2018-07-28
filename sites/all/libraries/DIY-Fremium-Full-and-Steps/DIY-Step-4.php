<?php 
//Set API user and password
define("API_USER","xxxxxxxxxx");
define("API_PASS","yyyyyyyyyy");

echo getSSOLink('tmp_5903a16748c8c_1493410151','8c896f52','RESET_SITE');  

function getSSOLink($account,$siteName,$target) {

    $SSOAPIURL = 'https://api.dudamobile.com/api/accounts/sso/' . $account . '/link';

    if($target) {
        $SSOAPIURL .= '?target=' . $target . '&site_name=' . $siteName;
    }

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    //format URL to grant access to email and sitename passed
    curl_setopt($ch, CURLOPT_URL, $SSOAPIURL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, API_USER.':'.API_PASS);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    //execute cURL call
    $output = curl_exec($ch);

    
    //check result for correct HTTP code
    if(curl_getinfo($ch,CURLINFO_HTTP_CODE) == 200) {
        curl_close($ch);
        //decode JSON return
        $output = json_decode($output);

        //append 'asNew' URL param to change template select page messaging slightly
        return $output->url . '&asNew=true';
    } else {
        curl_close($ch);
        die('Error getting SSO link: '. $output . '<br/>');
    }
}