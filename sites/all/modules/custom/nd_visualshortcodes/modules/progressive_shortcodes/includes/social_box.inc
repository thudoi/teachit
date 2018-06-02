<?php

function progressive_shortcodes_social_box_shortcode_info(&$shortcodes)
{
    $shortcodes['social_box'] = array(
        'title' => t('Social Icon Box'),
        'description' => t('Social Icon Link with text.'),
        'process callback' => 'progressive_shortcodes_shortcode_socialbox',
        'process settings callback' => 'progressive_shortcodes_shortcode_socialbox_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'tips callback' => 'progressive_shortcodes_shortcode_socialbox_tip',
        'icon' => 'fa fa-facebook'
    );
}

function progressive_shortcodes_shortcode_socialbox($attrs, $text) {
    $attrs['class'] = (isset($attrs['class']) ? $attrs['class'] : '') . 'sbtnf sbtnf-rounded color color-hover ' . $attrs['icon'];
    $link = strpos($attrs['link'], '#') === FALSE ? url($attrs['link']) : $attrs['link'];
    $text = '<span class = "social"><a target="_blank" href="' . $link . '" ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '></a></span>';
    return $text;
}

function progressive_shortcodes_shortcode_socialbox_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Social Icon Box:</strong><br/>[social_box icon = "icon-facebook" link = "http://facebook.com"][/social_box]</br>';
    $output[] = 'Available icons: <a href = "http://shalinguyen.github.io/socialicious/">http://shalinguyen.github.io/socialicious/</a></p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_socialbox_settings($attrs, $text) {
    $form['icon'] = array(
        '#title' => t('Icon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/progressive_shortcodes/socialbox_autocomplete',
        '#default_value' => isset($attrs['icon']) ? $attrs['icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['link'] = array(
        '#type' => 'textfield',
        '#title' => t('Link'),
        '#default_value' => isset($attrs['link']) ? $attrs['link'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    return $form;
}