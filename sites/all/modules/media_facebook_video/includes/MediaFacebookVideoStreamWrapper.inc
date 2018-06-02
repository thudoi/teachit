<?php

/**
 * @file
 * Extends the MediaReadOnlyStreamWrapper class to handle Facebook videos.
 */

/**
 * Creates a "new MediaFacebookVideoStreamWrapper('facebook://v/[video-code]')".
 */
class MediaFacebookVideoStreamWrapper extends MediaReadOnlyStreamWrapper {
  protected $baseUrl = 'http://facebook.com';

  /**
   * Gets Mime Type.
   */
  public static function getMimeType($uri, $mapping = NULL) {
    return 'video/facebook';
  }

  /**
   * Interpolates URL.
   */
  public function interpolateUrl() {
    if ($parameters = $this->get_parameters()) {
      return $this->baseUrl . '/' . $parameters['v'];
    }
  }

  /**
   * Get Local Thumbnail Path.
   */
  public function getLocalThumbnailPath() {
    $parts = $this->get_parameters();
    $local_path = 'public://media-facebook-video/' . check_plain($parts['v']) . '.jpg';
                     if (!file_exists($local_path)) {
                $dirname = drupal_dirname($local_path);
                file_prepare_directory($dirname, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS);
                $response = drupal_http_request($this->getOriginalThumbnailPath());
                if (!isset($response->error)) {
                      file_unmanaged_save_data($response->data, $local_path, TRUE);
                    }
      else {
                      @copy($this->getOriginalThumbnailPath(), $local_path);
                    }
    }
    if (!file_exists($local_path)) {
      $dirname = drupal_dirname($local_path);
      file_prepare_directory($dirname, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS);
      $response = drupal_http_request($this->getOriginalThumbnailPath());
      if (!isset($response->error)) {
        file_unmanaged_save_data($response->data, $local_path, TRUE);
      }
      else {
        @copy($this->getOriginalThumbnailPath(), $local_path);
      }
    }
     return $local_path;
   }

  public function getOriginalThumbnailPath() {
    $parts = $this->get_parameters();
    $video_id = $parts['v'];
    $response = drupal_http_request('https://graph.facebook.com/'.$video_id);

    if (!isset($response->error)) {
      $data = drupal_json_decode($response->data);
                       if (isset($data['format'])) {
                               foreach ($data['format'] as $key => $format) {
                                       if ($format['filter'] == 'native') {
                                               return $format['picture'];
                                       }
                               }
                       }
      return $data['picture'];
    }
    else {
      throw new Exception("Error Processing Request. (Error: {$response->code}, {$response->error})");
      return;
    }
  }

}
