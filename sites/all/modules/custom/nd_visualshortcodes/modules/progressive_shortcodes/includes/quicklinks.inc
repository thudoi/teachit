<?php

function progressive_shortcodes_quicklinks_shortcode_info(&$shortcodes)
{
    $shortcodes['quicklinks'] = array(
        'title' => t('Quick Links'),
        'description' => t('Expandable menu links.'),
        'process callback' => 'progressive_shortcodes_shortcode_quicklinks',
        'process settings callback' => 'progressive_shortcodes_shortcode_quicklinks_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'tips callback' => 'progressive_shortcodes_shortcode_quicklinks_tip',
        'icon' => 'fa fa-th-list'
    );
}
function progressive_shortcodes_shortcode_quicklinks($attrs, $text) {
    if (isset($attrs['machine_name']) && $attrs['machine_name']) {
        $menu_tree = menu_tree_all_data($attrs['machine_name']);
        return '<div class = "sidebar"><nav class = "menu">' . _progressive_shortcodes_quicklinks($menu_tree) . '</nav></div>';
    }
    return '';
}

function _progressive_shortcodes_quicklinks($items, $class = '') {
    $output = '<ul ' . ($class ? 'class = "' . $class . '"' : ''). '>';
    foreach($items as $item) {
        $class = !empty($item['below']) ? 'class = "parent' . ($item['link']['expanded'] ? ' active' : '') . '"': '';
        $title = !empty($item['below']) ? '<span class="open-sub"></span>' : '';
        $output .= '<li ' . $class . '>' . l($title . t($item['link']['link_title']), $item['link']['link_path'], array('html' => TRUE));
        if(!empty($item['below'])) {
            $output .= _progressive_shortcodes_quicklinks($item['below'], 'sub');
        }
        $output .= '</li>';
    }
    return $output . '</ul>';
}

function progressive_shortcodes_shortcode_quicklinks_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Quick Links:</strong><br/>[quicklinks machine_name = "menu-quick-links"][/quicklinks]</br>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_quicklinks_settings($attrs, $text) {
    $menus = db_select('menu_custom', 'm')->fields('m', array('menu_name', 'title'))->orderBy('m.title')->execute()->fetchAllKeyed(0, 1);
    $form['machine_name'] = array(
        '#title' => t('Menu'),
        '#type' => 'select',
        '#options' => $menus,
        '#default_value' => isset($attrs['machine_name']) ? $attrs['machine_name'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}