<?php

function progressive_shortcodes_shortcode_sitemap_info(&$shortcodes)
{
    $shortcodes['sitemap'] = array(
        'title' => t('Sitemap'),
        'description' => t('Website Sitemap'),
        'process callback' => 'progressive_shortcodes_shortcode_sitemap',
        'tips callback' => 'progressive_shortcodes_shortcode_sitemap_tip',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'icon' => 'fa fa-sitemap',
        'description_field' => 'machine_name',
    );
}
function progressive_shortcodes_shortcode_sitemap($attrs, $text) {
    if (isset($attrs['machine_name']) && $attrs['machine_name']) {
        $menu_tree = menu_tree_all_data($attrs['machine_name']);
        if($attrs_output = _progressive_shortcodes_shortcode_attributes($attrs)) {
            return '<div ' . $attrs_output . '>' . _progressive_shortcodes_sitemap($menu_tree, 'sitemap') . '</div>';
        }
        return _progressive_shortcodes_sitemap($menu_tree, 'sitemap');
    }
    return '';
}

function _progressive_shortcodes_sitemap($items, $class = '') {
    $output = '<ul' . ($class ? ' class = "' . $class . '"' : ''). '>';
    foreach($items as $item) {
        $output .= '<li>' . l(t($item['link']['link_title']), $item['link']['link_path']);
        if(!empty($item['below'])) {
            $output .= _progressive_shortcodes_sitemap($item['below']);
        }
        $output .= '</li>';
    }
    return $output . '</ul>';
}

function progressive_shortcodes_shortcode_sitemap_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>SiteMap:</strong><br/>[sitemap machine_name = "main-menu"][/sitemap]</br>';
    return implode(' ', $output);
}