<?php

function progressive_shortcodes_view_shortcode_info(&$shortcodes)
{
    $shortcodes['view'] = array(
        'title' => t('View'),
        'description' => t('Embed content - rendered View.'),
        'process callback' => 'progressive_shortcodes_shortcode_view',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_view_settings',
        'tips callback' => 'progressive_shortcodes_shortcode_view_tip',
        'icon' => 'fa fa-sun-o',
        //'description_callback' => 'progressive_shortcodes_shortcode_view_description',
    );
}

function progressive_shortcodes_shortcode_view($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? $attrs['class'] : '';
    $view = '';
    if (strpos($attrs['admin_url'], 'admin/structure/views/view') !== FALSE) {
        $view_name = substr($attrs['admin_url'], strpos($attrs['admin_url'], 'view/') + 5);
        $parts = explode('/', $view_name);
        $view_name = $parts[0];
        $view = isset($parts[2]) ? views_embed_view($view_name, $parts[2]) : views_embed_view($view_name);
    }
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>' . $view . '</div>';
    return $text;
}

function progressive_shortcodes_shortcode_view_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>View embed:</strong><br/>[view admin_url="admin/structure/views/view/blog"][/view]</br>';
    $output[] = '<strong>admin_url</strong> - Administrative url of required view display.</p>';
    return implode(' ', $output);
}
/*
function progressive_shortcodes_shortcode_view_description($attrs, $text) {

    if (strpos($attrs['admin_url'], 'admin/structure/views/view') !== FALSE) {
        $form = progressive_shortcodes_shortcode_view_settings($attrs, $text);
        $value = l($form['admin_url']['#options'][$attrs['admin_url']], $attrs['admin_url'], array('attributes' => array('target' => '_blank')));
        return $value;
    }

}
 */
function progressive_shortcodes_shortcode_view_settings($attrs, $text) {
    $query = db_select('views_display', 'v');
    $query->leftJoin('views_view', 'vv', 'vv.vid = v.vid');
    $return = $query
        ->fields('v', array('id', 'display_title'))
        ->fields('vv', array('name', 'human_name'))
        ->condition('v.display_title', 'Master', '<>')
        ->execute();
    $views = array();
    foreach ($return as $row) {
        $views['admin/structure/views/view/' . $row->name . '/edit/' . $row->id] = check_plain($row->human_name . ': ' . $row->display_title);
    }
    asort($views);
    $form['admin_url'] = array(
        '#title' => t('View'),
        '#type' => 'select',
        '#options' => $views,
        '#default_value' => isset($attrs['admin_url']) ? $attrs['admin_url'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}