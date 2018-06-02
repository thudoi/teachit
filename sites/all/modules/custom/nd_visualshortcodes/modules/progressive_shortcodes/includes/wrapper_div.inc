<?php

function progressive_shortcodes_wrapper_div_shortcode_info(&$shortcodes)
{
    $shortcodes['wrapper_div'] = array(
        'title' => t('Wrapper Div'),
        'description' => t('Wrapper HTML DIV'),
        'process callback' => 'progressive_shortcodes_shortcode_wrapper_div',
        'tips callback' => 'progressive_shortcodes_shortcode_wrapper_div_tip',
        'icon' => 'fa fa-list-alt',
        //'description_callback' => 'progressive_shortcodes_shortcode_view_description',
    );
}

function progressive_shortcodes_shortcode_wrapper_div($attrs, $text) {
    $attrs['class'] = (isset($attrs['class']) ? $attrs['class'] : '');
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) .'>' . $text . '</div>';
    return $text;
}

function progressive_shortcodes_shortcode_wrapper_div_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Wrapper HTML DIV:</strong><br/>[wrapper_div]Content[/wrapper_div]</br>';
    $output[] = 'Use this for wrapper content.</p>';
    return implode(' ', $output);
}