<?php

function progressive_shortcodes_node_shortcode_info(&$shortcodes)
{
    $shortcodes['node'] = array(
        'title' => t('Node'),
        'description' => t('Render node'),
        'process callback' => 'progressive_shortcodes_shortcode_node',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_node_settings',
        'tips callback' => 'progressive_shortcodes_shortcode_node_tip',
        'icon' => 'fa fa-file-o',
        //'description_callback' => 'progressive_shortcodes_shortcode_node_description',
    );
}

function progressive_shortcodes_shortcode_node($attrs, $text) {
    if (isset($attrs['admin_url']) && strpos($attrs['admin_url'], 'node/') !== FALSE) {
        $node_name = substr($attrs['admin_url'], strpos($attrs['admin_url'], 'node/') + 5);
        $parts = explode('/', $node_name);
        $node = node_load($parts[0]);
        if($node->nid) {
            $node = node_view($node);
            $output = render($node);
            $attrs = _progressive_shortcodes_shortcode_attributes($attrs);
            $text = $attrs ? '<div ' . $attrs  . '>' . $output . '</div>' : $output;
            return $text;
        }
    }
}

function progressive_shortcodes_shortcode_node_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Node:</strong><br/>[node admin_url = "node/1/edit"][/node]</br>';
    $output[] = '<strong>admin_url</strong> - URL of the node edit page.</p>';
    return implode(' ', $output);
}
/*
function progressive_shortcodes_shortcode_node_description($attrs, $text) {
    if (strpos($attrs['admin_url'], 'node/') !== FALSE) {
        $node_name = substr($attrs['admin_url'], strpos($attrs['admin_url'], 'node/') + 5);
        $parts = explode('/', $node_name);
        $nid = $parts[0];
        if(is_numeric($nid)) {
            $node = node_load($nid);
            return l($node->title, 'node/' . $nid . '/edit', array('attributes' => array('target' => '_blank')));
        }
    }
}
*/
function progressive_shortcodes_shortcode_node_settings($attrs, $text) {

    $form['admin_url'] = array(
        '#title' => t('Node Title'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/node_autocomplete',
        '#default_value' => isset($attrs['admin_url']) ? $attrs['admin_url'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}