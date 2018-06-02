<?php

function progressive_shortcodes_row_shortcode(&$shortcodes)
{
    $shortcodes['row'] = array(
        'title' => t('Row for columns'),
        'description' => t('Container for cols.'),
        'process callback' => 'progressive_shortcodes_shortcode_row',
        'process backend callback' => 'nd_visualshortcodes_backend_row',
        'icon' => 'fa fa-th-large',
        'child shortcode' => 'col'
    );
}

function progressive_shortcodes_shortcode_row($attrs, $text) {
    $attrs['class'] = 'row ' . (isset($attrs['class']) ? $attrs['class'] : '');
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) .'>' . $text . '</div>';
    return $text;
}