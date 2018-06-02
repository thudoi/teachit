<?php

/**
 * Implements hook_field_formatter_info().
 */
function mod_postmedia_field_formatter_info()
{
    return array(
        'mod_postmedia_formatter' => array(
            'label' => t('Show Post Media'),
            'field types' => array('media'),
            'settings' => array('image_style' => '', 'image_link' => ''),
        )
    );
}

/**
 * Implements hook_field_settings_form().
 */
/**
 * Implements hook_field_formatter_settings_form().
 */
function mod_postmedia_field_formatter_settings_form($field, $instance, $view_mode, $form, &$form_state)
{
    $display = $instance['display'][$view_mode];
    $settings = $display['settings'];

    $image_styles = image_style_options(FALSE, PASS_THROUGH);
    $element['image_style'] = array(
        '#title' => t('Image style'),
        '#type' => 'select',
        '#default_value' => $settings['image_style'],
        '#empty_option' => t('None (original image)'),
        '#options' => $image_styles,
    );

    $link_types = array(
        'content' => t('Content'),
        'file' => t('File'),
    );
    $element['image_link'] = array(
        '#title' => t('Link image to'),
        '#type' => 'select',
        '#default_value' => $settings['image_link'],
        '#empty_option' => t('Nothing'),
        '#options' => $link_types,
    );

    return $element;
}



/**
 * Implements hook_field_formatter_settings_summary().
 */
function mod_postmedia_field_formatter_settings_summary($field, $instance, $view_mode)
{

    $display = $instance['display'][$view_mode];
    $settings = $display['settings'];

    $summary = array();

    $image_styles = image_style_options(FALSE, PASS_THROUGH);
    // Unset possible 'No defined styles' option.
    unset($image_styles['']);
    // Styles could be lost because of enabled/disabled modules that defines
    // their styles in code.
    if (isset($image_styles[$settings['image_style']])) {
        $summary[] = t('Image style: @style', array('@style' => $image_styles[$settings['image_style']]));
    }
    else {
        $summary[] = t('Original image');
    }

    $link_types = array(
        'content' => t('Linked to content'),
        'file' => t('Linked to file'),
    );
    // Display this setting only if image is linked.
    if (isset($link_types[$settings['image_link']])) {
        $summary[] = $link_types[$settings['image_link']];
    }

    return implode('<br />', $summary);
}


/**
 * Implements hook_field_formatter_view().
 */
function mod_postmedia_field_formatter_view($entity_type, $entity, $field, $instance, $langcode, $items, $display)
{
  $renderitems = array();
    $element = array();
    $settings = $display['settings'];
    $style = $display['settings']['image_style'];
    $uri = '';
    // Check if the formatter involves a link.
    if ($settings['image_link'] == 'content') {
        $uri = entity_uri($entity_type, $entity);
        $uri = $uri['path'];
    }
    elseif ($settings['image_link'] == 'file') {
        $link_file = TRUE;
    }

                foreach ($items as $delta => $item) {
                    if (isset($link_file)) {
                      if($field['type'] == 'media')
                      {
                        $file = $item['file'];
                        $uri = file_create_url($file->uri);
                      }
                      elseif($field['type'] == 'image') {
                        $uri = array(
                          'path'    => file_create_url($item['uri']),
                          'options' => array(),
                        );
                      }
                    }
                    if($field['type'] == 'media')
                    {
                        $file = $item['file'];
                        if ($file->filemime == 'image/jpeg') {
                            // Generate image
                            if (!empty($style)) {
                                $image = theme_image_style(array(
                                  'style_name' => $style,
                                  'path'       => $file->uri,
                                  'alt'        => isset($file->alt) ? $file->alt : FALSE,
                                  'title'      => isset($file->title) ? $file->title : FALSE,
                                  'attributes' => array('class'=>array('img-responsive')),
                                  'height' => $file->height,
                                  'width'  => $file->width,
                                ));

                            }
                            else {
                                $image = theme_image(array(
                                  'path'       => $file->uri,
                                  'alt'        => isset($file->alt) ? $file->alt : FALSE,
                                  'title'      => isset($file->title) ? $file->title : FALSE,
                                  'attributes' => array('class'=>array('img-responsive')),
                                ));
                            }
                           // $item = l($image,$uri,array('html'=>true));
                            $renderitems[] = $image;
                        }
                        if ($file->filemime == 'video/youtube' || $file->filemime == 'video/vimeo') {
                            $display['settings']['image_style'] = $style;

                            if ($file->filemime == 'video/youtube') {
                                $video = media_youtube_file_formatter_image_view($file, $display, LANGUAGE_NONE);
                            }
                            if ($file->filemime == 'video/vimeo') {
                                $video    = media_vimeo_file_formatter_image_view($file, $display, LANGUAGE_NONE);
                            }
                            $var = array(
                              'path'       => $video['#path'],
                              'alt'        => isset($video['#alt']) ? $video['#alt'] : FALSE,
                              'title'      => isset($video['#alt']) ? $video['#alt'] : FALSE,
                              'width'      => NULL,
                              'height'     => NULL,
                              'attributes' => array('class'=>array('img-responsive')),
                            );
                            if(!empty($style))
                            {
                              $var['style_name'] = $style;
                              $image = theme_image_style($var);
                            } else{
                              $image = theme_image($var);
                            }
                          //$image = l($image,$uri,array('html'=>true));
                          $renderitems[]= $image;
                        }

                        if ($file->filemime == 'audio/soundcloud') {
                            $display['settings']['image_style'] = $style;
                            $sound = media_soundcloud_file_formatter_image_view($file, $display, $langcode);
                            $var = array(
                              'path'       => $sound['#path'],
                              'alt'        => isset($sound['#alt']) ? $sound['#alt'] : FALSE,
                              'title'      => isset($sound['#alt']) ? $sound['#alt'] : FALSE,
                              'width'      => NULL,
                              'height'     => NULL,
                              'attributes' => array('class'=>array('img-responsive')),
                            );
                          if(!empty($style))
                          {
                            $var['style_name'] = $style;
                            $image = theme_image_style($var);
                          } else{
                            $image = theme_image($var);
                          }
                         // $image = l($image,$uri,array('html'=>true));
                            $renderitems[]= $image;

                        }
                        $element[$delta] = array(
                          '#theme'       => 'mod_postmedia',
                          '#items'       => $renderitems,
                        );
                    }
                }
    return $element;
}

