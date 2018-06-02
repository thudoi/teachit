<?php

function progressive_shortcodes_spacer_shortcode_info(&$shortcodes)
{
    $shortcodes['spacer'] = array(
        'title' => t('Spacer'),
        'description' => t('Spacer without any content.'),
        'process callback' => 'progressive_shortcodes_shortcode_spacer',
        'process settings callback' => 'progressive_shortcodes_shortcode_spacer_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'tips callback' => 'progressive_shortcodes_shortcode_spacer_tip',
        'icon' => 'fa fa-square-o',
        'description_field' => 'height',
    );
}

function progressive_shortcodes_shortcode_spacer($attrs, $text) {
    $attrs['class'] = 'spacer ' . (isset($attrs['class']) ? $attrs['class'] : '');
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '></div>';
    return $text;
}

function progressive_shortcodes_shortcode_spacer_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Spacer:</strong><br/>[spacer][/spacer]</br>';
    $output[] = '<strong>Available classes:</strong> <strong>xs</strong> - 10px <strong>sm</strong> - 20px <strong>md</strong> - 40px <strong>lg</strong> - 60px <strong>xlg</strong> - 80px</p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_spacer_settings($attrs, $text) {
    $form['style_height'] = array(
        '#type' => 'textfield',
        '#title' => t('Height'),
        '#default_value' => isset($attrs['style_height']) ? $attrs['style_height'] : '',
        '#attributes' => array('class' => array('form-control')),
    );
    return $form;
}