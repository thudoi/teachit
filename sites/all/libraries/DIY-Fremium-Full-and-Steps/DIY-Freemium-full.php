<?php 
//Set API user and password
define("API_USER","xxxxxxxxxx");
define("API_PASS","yyyyyyyyyy");

//create site
$siteName = createSite(20077);

//create account
$date = new DateTime();
$tempAcctName = 'tmp_' . uniqid() . '_' . $date->getTimestamp();
$account = createCustomerAccount($tempAcctName);

//grant access
grantAccountAccess($account,$siteName);

//generate & print sso link
echo getSSOLink($account,$siteName,'RESET_SITE');  

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

function createSite($template_id) {
    //create array with data    
    $data = array("template_id"=>$template_id);
    
    //turn data into json to pass via cURL
    $data = json_encode($data);

    //Set cURL parameters
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL,'https://api.dudamobile.com/api/sites/multiscreen/create');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, API_USER.':'.API_PASS);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    //execute cURL call and get template_idte data
    $output = curl_exec($ch);
    //check for errors in cURL call
    if(curl_errno($ch)) {
        die('Curl error: ' . curl_error($ch));
    }
    //decode result
    $output = json_decode($output);
    //return unique site_name
    return $output->site_name;
}
function createCustomerAccount($account) {
    $data = array("account_name"=>$account);

    $data = json_encode($data);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_URL,'https://api.dudamobile.com/api/accounts/create');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_USERPWD, API_USER.':'.API_PASS);
    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    //execute cURL call
    $output = curl_exec($ch);

    //check result
    if(curl_getinfo($ch,CURLINFO_HTTP_CODE) == 204) {
        curl_close($ch);
        return $account;
    } else {
        curl_close($ch);
        die('Account creation failed, error: '. $output . '<br/>');
    }
}