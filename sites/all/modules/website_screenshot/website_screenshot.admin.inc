<?php

/**
 * Implementation of hook_configure().
 *
 * @todo convert in t() functions with parameters
 */

function website_screenshot_configure() {
  $lightbox_ispresent = module_exists('lightbox2') || module_exists('jLightbox') || module_exists('colorbox');
  if ($lightbox_ispresent) {
    drupal_set_message('Lightbox is installed with '. l('Lightbox2', 'http://drupal.org/project/lightbox2') .' or '. l('jQuery Lightbox', 'http://drupal.org/project/jlightbox')  .' or '. l('Colorbox', 'http://drupal.org/project/colorbox') .' modules. You can use this functionality.', 'status', FALSE);
  }
  else {drupal_set_message('Lightbox is not present.<br />To use javascript zoom feature you should download and install '. l('Lightbox2', 'http://drupal.org/project/lightbox2') .' or '. l('jQuery Lightbox', 'http://drupal.org/project/jlightbox').' or ' .l('Colorbox', 'http://drupal.org/project/colorbox') .' module.', 'warning');}

  $form = array();

  $form['website_screenshot_clearcache'] = array(
    '#type' => 'fieldset',
    '#title' => t('Website Screenshot Clear Cache'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );
  $form['website_screenshot_clearcache']['website_screenshot_clear_imagecache'] = array(
    '#type' => 'checkbox',
    '#title' => t('Clear captured shots'),
    '#default_value' => FALSE,
    '#description' => t('By selecting this checkbox all cached thumbshots gets deleted'),
    '#disabled' => FALSE,
  );

  $form['website_screenshot_request_refresh'] = array(
    '#type' => 'fieldset',
    '#title' => t('Website Screenshot Refresh Cached Screenshots'),
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
  );
  $form['website_screenshot_request_refresh']['website_screenshot_request_refresh'] = array(
    '#type' => 'checkbox',
    '#title' => t('Refresh all screenshots'),
    '#default_value' => FALSE,
    '#description' => t('By selecting this checkbox, all sites with cached thumbnails will be re-captured and the latest screenshots downloaded automatically (if it is supported by selected engine)'),
    '#disabled' => FALSE,
  );

  $form['website_screenshot'] = array(
    '#type' => 'fieldset',
    '#title' => t('Configuration'),
    '#weight' => -10,
    '#collapsible' => FALSE,
    '#collapsed' => FALSE,
    );

  $form['website_screenshot']['website_screenshot_engine'] = array(
    '#type' => 'select',
    '#title' => t('Screenshot fallback Engine'),
    '#required' => TRUE,
    '#options' => website_screenshot_engines_list(),
    '#default_value' => variable_get('website_screenshot_engine', 'shrinktheweb'),
    '#description' => t('Select your fallback screenshot service provider.')
    );

  $form['#submit'][] = 'website_screenshot_configure_submit';

  return system_settings_form($form);
}

function website_screenshot_configure_submit($form, &$form_state) {
  $clear_imagecache = $form_state['values']['website_screenshot_clear_imagecache'];
  if (!empty($clear_imagecache) && $clear_imagecache == TRUE) {
    website_screenshot_remove_all_screenshots();
  }

  $request_refresh = $form_state['values']['website_screenshot_request_refresh'];
  if (!empty($request_refresh) && $request_refresh == TRUE) {
    website_screenshot_refresh_all_screenshots();
  }
}

