<?php

function progressive_shortcodes_horizontal_rule_shortcode_info(&$shortcodes)
{
    $shortcodes['hr'] = array(
        'title' => t('Horizontal Rules'),
        'description' => t('Horizontal Line with spaces.'),
        'process callback' => 'progressive_shortcodes_shortcode_hr',
        'process settings callback' => 'progressive_shortcodes_shortcode_hr_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'tips callback' => 'progressive_shortcodes_shortcode_hr_tip',
        'icon' => 'fa fa-ellipsis-h',
        'description_field' => 'type',
    );
}
function progressive_shortcodes_shortcode_hr($attrs, $text) {
    $attrs['class'] = (isset($attrs['class']) ? $attrs['class'] : '') . (isset($attrs['type']) ? ' ' . $attrs['type'] : '');
    $text = '<hr ' . _progressive_shortcodes_shortcode_attributes($attrs)  . ' />';
    return $text;
}

function progressive_shortcodes_shortcode_hr_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Horizontal Rules:</strong><br/>[hr][/hr]</p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_hr_settings($attrs, $text) {
    $types = array('' => t('Default'), 'no-line' => t('No Line'), 'shadow' => t('Shadow'), 'dotted' => t('Dotted'), 'dashed' => t('Dashed'), 'double' => t('Double'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}