<?php

function progressive_shortcodes_sequence_shortcode_info(&$shortcodes)
{
    $shortcodes['sequence'] = array(
        'title' => t('Sequence container'),
        'description' => t('Sequence for any content'),
        'process callback' => 'progressive_shortcodes_shortcode_sequence',
        'icon' => 'fa fa-sort-numeric-asc',
        'child shortcode' => 'sequence_item',
    );
}

function progressive_shortcodes_shortcode_sequence($attrs, $text) {
    $attrs['class'] = 'steps ' . (isset($attrs['class']) ? $attrs['class'] : '');
    return '<div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>
    ' . $text . '
  </div>';
}

