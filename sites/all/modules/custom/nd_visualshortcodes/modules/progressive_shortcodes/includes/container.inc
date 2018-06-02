<?php
function progressive_shortcodes_container_shorcode_info(&$shortcodes)
{
    $shortcodes['container'] = array(
        'title' => t('Container box'),
        'description' => t('Container for content.'),
        'process callback' => 'progressive_shortcodes_shortcode_container',
        'icon' => 'fa fa-hdd-o',
        'tips callback' => 'progressive_shortcodes_shortcode_container_tip',
    );
}

function progressive_shortcodes_shortcode_container($attrs, $text) {
    $attrs['class'] = 'container ' . (isset($attrs['class']) ? $attrs['class'] : '');
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) .'>' . $text . '</div>';
    return $text;
}

function progressive_shortcodes_shortcode_container_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Responsive container:</strong><br/>[container]Content[/container]</br>';
    $output[] = 'Use this for non-full width content.</p>';
    $output[] = '<p><strong>Responsive columns:</strong><br/>[row]<br/>[col phone = 12 tablet = 12 desktop = 6 wide = 6]Content with date[/col][/row]</br>';
    $output[] = 'Describe how many rows will take col in different devices: phone, tablet, desktop, wide. From 1 to 12 rows.</p>';
    return implode(' ', $output);
}