<?php

function progressive_shortcodes_sequence_item_shortcode_info(&$shortcodes)
{
    $shortcodes['sequence_item'] = array(
        'title' => t('Sequence'),
        'description' => t('Sequence item'),
        'process callback' => 'progressive_shortcodes_shortcode_sequence_item',
        'process settings callback' => 'progressive_shortcodes_shortcode_sequence_item_settings',
        'icon' => 'fa fa-long-arrow-down',
        'description_field' => 'type',
    );
}

function progressive_shortcodes_shortcode_sequence_item($attrs, $text, $parent_attrs) {
    $attrs['class'] = 'step ' . (isset($attrs['class']) ? $attrs['class'] : '');
    $attrs['class'] .= 'border-' . $attrs['color'];
    $attrs['class'] .= in_array($attrs['type'], array('background', 'image_background')) ? ' white bg-' . $attrs['color'] : '';
    $bg_img = '';
    if($attrs['type'] == 'image_background' && isset($attrs['image_fid']) && $attrs['image_fid']) {
        $inner_attrs = array(
            'class' => 'bg-image',
            'style_background_image' => $attrs['image_fid']
        );
        $bg_img = '<div ' . _progressive_shortcodes_shortcode_attributes($inner_attrs)  . '></div>';
    }
    return '<div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>' . $bg_img . '<div class = "step-wrapper">' . $text . '</div></div>';
}

function progressive_shortcodes_shortcode_sequence_item_settings($attrs, $text) {
    $colors = array('warning' => t('Orange'), 'error' => t('Red'), 'success' => t('Green'), 'info' => t('Blue'), 'grey' => t('Grey'));
    $form['color'] = array(
        '#type' => 'radios',
        '#title' => t('Color'),
        '#options' => $colors,
        '#default_value' => isset($attrs['color']) ? $attrs['color'] : 'warning',
        '#attributes' => array('class' => array('color-radios')),
        '#prefix' => '</div><div class = "col-sm-6">',
    );
    $types = array('background' => t('Background'), 'border' => t('Border'), 'image_background' => t('Image Background'));
    $form['type'] = array(
        '#type' => 'select',
        '#options' => $types,
        '#title' => t('Type'),
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : 'background',
        '#attributes' => array('class' => array('form-control type-sequence-select')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $filename = isset($attrs['image_fid']) && !empty($attrs['image_fid']) ? file_load($attrs['image_fid'])->uri : '';
    $image = $filename ? theme('image_style', array('style_name' => 'media_thumbnail', 'path' => $filename)) : '';
    $form['image_fid'] = array(
        '#type' => 'textfield',
        '#title' => t('Image'),
        '#default_value' => isset($attrs['image_fid']) ? $attrs['image_fid'] : '',
        '#states' => array(
            'visible' => array(
                '.type-sequence-select' => array('value' => 'image_background'),
            ),
        ),
        '#attributes' => array('class' => array('image-media-upload hidden')),
        '#field_suffix' => '<div class = "preview-image">' . $image . '</div><a href = "#" class = "media-upload button">' . t('Upload Image') .'</a><a href = "#" class = "media-remove button">' . t('Remove Image') .'</a>',
    );

    return $form;
}