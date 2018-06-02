<?php

function progressive_shortcodes_image_shortcode_info(&$shortcodes)
{
    $shortcodes['image'] = array(
        'title' => t('Image with caption'),
        'description' => t('Image with caption'),
        'process callback' => 'progressive_shortcodes_shortcode_image',
        'process settings callback' => 'progressive_shortcodes_shortcode_image_settings',
        'tips callback' => 'progressive_shortcodes_shortcode_image_tip',
        'icon' => 'fa fa-file-image-o'
    );
}

function progressive_shortcodes_shortcode_image($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? ' ' . $attrs['class'] : '';
    $attrs['class'] = ' ' . (isset($attrs['type']) && $attrs['type'] == 'title_overlay' ? 'image_overlay' : 'caption');
    $img_class = isset($attrs['img_rounded']) && $attrs['img_rounded'] ? 'class="img-rounded"' : '';
    $attrs['caption'] = isset($attrs['caption']) && $attrs['caption'] ? $attrs['caption'] : $text;
    $file = isset($attrs['fid']) && !empty($attrs['fid']) ? file_load($attrs['fid']) : $attrs['path'];
    $filename = isset($file->uri) ? file_create_url($file->uri) : $file;
    $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
    <img src="' . $filename . '" ' . $img_class . ' alt="' . (isset($attrs['alt']) ? $attrs['alt'] : '') . '" title="' . (isset($attrs['title']) ? $attrs['title'] : '') . '">
    ' . (!empty($attrs['caption']) ? '<div class = "description">' . $attrs['caption'] . '</div>' : '') . '
  </div>';
    return $output;
}

function progressive_shortcodes_shortcode_image_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Image with caption:</strong><br/>[image path="image.png" fid="" caption = "Image caption" type = "title_overlay" img_rounded = 1][/image]</br>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_image_settings($attrs, $text) {

    $filename = (isset($attrs['fid']) ? file_load($attrs['fid'])->uri : '');
    $image = $filename ? theme('image_style', array('style_name' => 'media_thumbnail', 'path' => $filename)) : '';
    $form['fid'] = array(
        '#type' => 'textfield',
        '#title' => t('Image'),
        '#default_value' => isset($attrs['fid']) ? $attrs['fid'] : '',
        '#attributes' => array('class' => array('image-media-upload hidden')),
        '#field_suffix' => '<div class = "preview-image">' . $image . '</div><a href = "#" class = "media-upload button">' . t('Upload Image') .'</a><a href = "#" class = "media-remove button">' . t('Remove Image') .'</a>',
        '#suffix' => '<div class = "clearfix"></div>',
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['img_rounded'] = array(
        '#type' => 'checkbox',
        '#title' => t('Rounded Image'),
        '#default_value' => isset($attrs['img_rounded']) ? $attrs['img_rounded'] : '',
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );

    $form['caption'] = array(
        '#type' => 'textfield',
        '#title' => t('Caption'),
        '#default_value' => isset($attrs['caption']) ? $attrs['caption'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $types = array('title_overlay' => t('Overlay'), 'caption' => t('Caption'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Title type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    return $form;
}