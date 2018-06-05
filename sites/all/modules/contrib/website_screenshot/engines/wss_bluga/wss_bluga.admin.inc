<?php

/**
 * Implementation of hook_configure().
 *
 * @todo convert in t() functions with parameters
 */

function wss_bluga_settings() {
  $form = array();

  $form['wss_bluga_api_key'] = array(
      '#type' => 'textfield',
      '#title' => t('API key'),
      '#default_value' => variable_get('wss_bluga_api_key', ''),
      '#required' => TRUE,
      '#description' => t('Your Bluga API key. If you don\'t have one yet, you can get one !link.', array('!link' => l(t('here'), 'http://webthumb.bluga.net/register'))),
  );

  $form['wss_bluga_width'] = array(
      '#type' => 'textfield',
      '#title' => t('Width'),
      '#default_value' => variable_get('wss_thumbalizr_width', '300'),
      '#description' => 'NOT IN USE',

  );
  $form['wss_bluga_delay'] = array(
      '#type' => 'select',
      '#title' => t('Delay'),
      '#options' => array(1=>1, 2=>2, 3=>3, 4=>4, 5=>5, 6=>6, 7=>7, 8=>8, 9=>9, 10=>10, 11=>11, 12=>12, 13=>13, 14=>14, 15=>15),
      '#default_value' => variable_get('wss_bluga_delay', '3'),
      '#description' => t('Wait before taking the snapshot (1 to 15 seconds)') .'<br/>'.  t('Default: %default', array('%default' => 3)),

  );

  $form['wss_bluga_debug'] = array(
      '#type' => 'select',
      '#title' => t('Debug'),
      '#options' => array(0 => t('Disabled') , 1 => t('Enabled') ),
      '#default_value' => variable_get('wss_bluga_debug', 0),
      '#description' => t('A ton of logs'),
  );
/* NOT WORK the download image are always jpg!!!
  $form['wss_bluga_image_type'] = array(
      '#type' => 'select',
      '#title' => t('Image type'),
      '#options' => array('jpg' => t('JPG'), 'png' => t('PNG'),'png8' => t('PNG8') ),
      '#default_value' => variable_get('wss_bluga_image_type', 'jpg'),
      '#description' => t('The type of image to generate.') .'<br/>'. t('Default: %default', array('%default' => t('JPG'))),
  );
*/
  return system_settings_form($form);
}


/** implementation of hook_screenshot_settings_validate
    **/
function wss_bluga_settings_validate($form_id, &$form_state) {
  $width = $form_state['values']['wss_bluga_width'];

  if ($width < 300 || $width > 1024 ){
      form_set_error('website_screenshot_width', t('Width must be an integer between 300 and 1024'));
  }

}


/** implementation of hook_screenshot_settings_submit
    **/
/*
function wss_bluga_settings_submit($form_id, &$form_state) {

}*/