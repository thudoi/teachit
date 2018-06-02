<?php


function progressive_shortcodes_block_shortcode_info(&$shortcodes)
{
    $shortcodes['block'] = array(
        'title' => t('Block'),
        'description' => t('Render block.'),
        'process callback' => 'progressive_shortcodes_shortcode_block',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_block_settings',
        'icon' => 'fa fa-file',
        'tips callback' => 'progressive_shortcodes_shortcode_block_tip',
        //'description_callback' => 'progressive_shortcodes_shortcode_block_description',
    );
}
function progressive_shortcodes_shortcode_block($attrs, $text) {
    if (strpos($attrs['admin_url'], 'admin/structure/block') !== FALSE) {
        $block_name = substr($attrs['admin_url'], strpos($attrs['admin_url'], '/manage/') + 8);
        $parts = explode('/', $block_name);
        $block = _render_block($parts[0], $parts[1]);
        $block = render($block);
    }
    $attrs_output = _progressive_shortcodes_shortcode_attributes($attrs);
    $text = $attrs_output ? '<div ' . $attrs_output  . '>' . $block . '</div>' : $block;
    return $text;
}

function progressive_shortcodes_shortcode_block_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Block:</strong><br/>[block admin_url = "admin/structure/block/manage/progressive_cms/gmap/configure"][/block]</br>';
    $output[] = '<strong>admin_url</strong> - URL of the block edit page.</p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_block_settings($attrs, $text) {
    module_load_include('inc', 'block', 'block.admin');
    $current_theme = variable_get('theme_default', 'none');
    $blocks = block_admin_display_prepare_blocks($current_theme);
    usort($blocks, '_sort_blocks'); // Andebug l?i
    $options = array();
    foreach ($blocks as $block) {
        $options['admin/structure/block/manage/' . $block['module']  .'/' . $block['delta'] . '/configure'] = check_plain($block['info']);
    }
    asort($options);
    $form['admin_url'] = array(
        '#title' => t('Block'),
        '#type' => 'select',
        '#options' => $options,
        '#default_value' => isset($attrs['admin_url']) ? $attrs['admin_url'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}
/*
function progressive_shortcodes_shortcode_block_description($attrs, $text) {
    if (strpos($attrs['admin_url'], 'admin/structure/block') !== FALSE) {
        $form = progressive_shortcodes_shortcode_block_settings($attrs, $text);
        $value = l($form['admin_url']['#options'][$attrs['admin_url']], $attrs['admin_url'], array('attributes' => array('target' => '_blank')));
        return $value;
    }
}
*/
function _sort_blocks($a, $b) {
    return $a['info'] > $b['info'];
}
function _render_block($module, $delta) {
    $block = block_load($module, $delta);
    return isset($block->theme) ? _block_get_renderable_array(_block_render_blocks(array($block))) : array();

}