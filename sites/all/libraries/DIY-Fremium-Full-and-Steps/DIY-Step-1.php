<?php 
//Set API user and password
define("API_USER","xxxxxxxxxx");
define("API_PASS","yyyyyyyyyy");

print "Created Site: " . createSite(20077);

//function to create a website
function createSite($template_id) {
    //create array with data    
    $data = array("template_id"=>$template_id);
    
    //turn data into json to pass via cURL
    $data = json_encode($data);

    print $data;
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