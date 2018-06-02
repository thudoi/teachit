<?php

function progressive_shortcodes_col_shortcode(&$shortcodes)
{
    $shortcodes['col'] = array(
        'title' => t('Column'),
        'description' => t('Column with size settings'),
        'process callback' => 'progressive_shortcodes_shortcode_col',
        'process backend callback' => 'nd_visualshortcodes_backend_col',
        'process settings callback' => 'nd_visualshortcodes_shortcode_col_settings',
        'icon' => 'fa fa-columns'
    );
}

function progressive_shortcodes_shortcode_col($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? $attrs['class'] : '';
    if(isset($attrs['phone'])) {
        $attrs['class'] .= ' col-xs-' . $attrs['phone'];
    }
    if(isset($attrs['tablet'])) {
        $attrs['class'] .= ' col-sm-' . $attrs['tablet'];
    }
    if(isset($attrs['desktop'])) {
        $attrs['class'] .= ' col-md-' . $attrs['desktop'];
    }
    if(isset($attrs['wide'])) {
        $attrs['class'] .= ' col-lg-' . $attrs['wide'];
    }
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>' . $text . '</div>';
    return $text;
}
