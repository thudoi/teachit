<?php
//Set API user and password
define("API_USER","xxxxxxxxxx");
define("API_PASS","yyyyyyyyyy");

$date = new DateTime();
$tempAcctName = 'tmp_' . uniqid() . '_' . $date->getTimestamp();

$createdAccount = createCustomerAccount($tempAcctName);

print "Created account: " . $createdAccount;

//function to create a website
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
