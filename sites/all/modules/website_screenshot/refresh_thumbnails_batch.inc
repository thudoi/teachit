<?php

/**
 * Request refresh batch process callback.
 */
function request_thumbnails_refresh($url, $function, &$context) {
  $context['results'][] = $url;
  $function($url);
  $context['message'] = 'Refresh for thumbnail for domain <em>' . $url . '</em> was requested';
}

/**
 * Request refresh batch finish callback.
 */
function request_thumbnails_refresh_finished($success, $results, $operations) {
  if ($success) {
    drupal_set_message('Thumbnails for ' . count($results) . ' domains requested to be refreshed');
  }
  else {
    drupal_set_message('An error has occurred.', 'error');
  }
}
