<?php

function progressive_shortcodes_html_shortcode_info(&$shortcodes)
{
    $shortcodes['html'] = array(
        'title' => t('HTML'),
        'description' => t('HTML code'),
        'process callback' => 'progressive_shortcodes_shortcode_html',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_html_settings',
        'icon' => 'fa fa-code',
        'description_field' => 'text',
    );
}
function progressive_shortcodes_shortcode_html_settings($attrs, $text) {
    // Name should be unical because WYSIWYG editor will conflict during multi-fields upload
    $form['text_' .time()] = array(
        '#type' => 'text_format',
        '#title' => t('HTML'),
        '#default_value' => $text,
        '#nd_visualshortcodes' => FALSE,
        '#attributes' => array('class' => array('input-settings')),
        '#format' => isset($attrs['format']) ? $attrs['format'] : variable_get('nd_visualshortcodes_html_default_format', NULL),
    );
    return $form;
}

function progressive_shortcodes_shortcode_html($attrs, $text) {
    // Made a little hack for tables which can't be controled because rendered some WYSIWYG editor, and also list styles
   // $text = str_replace(array('<table', '<ul>', '<ol>'), array('<table class = "table table-bordered table-striped"', '<ul class = "list">', '<ol class = "list">'), $text);
    $attrs_output = _progressive_shortcodes_shortcode_attributes($attrs);
    if($attrs_output) {
        return '<div ' . $attrs_output . '>' . $text . '</div>';
    }


    return $text;
}