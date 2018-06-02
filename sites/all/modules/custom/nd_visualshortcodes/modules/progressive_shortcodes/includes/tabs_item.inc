<?php

function progressive_shortcodes_tabs_item_shortcode_info(&$shortcodes)
{
    $shortcodes['tab'] = array(
        'title' => t('Tab'),
        'description' => t('Tab content.'),
        'process callback' => 'progressive_shortcodes_shortcode_tab',
        'process settings callback' => 'progressive_shortcodes_shortcode_tab_settings',
        'icon' => 'fa fa-folder',
        'description_field' => 'title',
    );
}
function progressive_shortcodes_shortcode_tab($attrs, $text) {
    global $tab_counter;
    global $tab_content;
    $tab_counter++;
    $attrs['class'] = isset($attrs['class']) ? $attrs['class'] : '';
    $attrs['class'] .= $tab_content == '' ? ' active' : '';
    $attrs['role'] = 'presentation';
    $class = shortcode_add_class($attrs['class']);
    $icon = isset($attrs['icon']) ? '<i class = "' . $attrs['icon'] .'"></i>' : '';
    $output = '<li' . _progressive_shortcodes_shortcode_attributes($attrs)  . '><a aria-controls="tab-'.$tab_counter.'" href="#tab-' . $tab_counter . '" role="tab" data-toggle="tab">' . $icon . (isset($attrs['title']) ? $attrs['title'] : '') . '</a></li>';

    if($tab_content == '') {
        $class .= ' in';
    }
    $tab_content .= '<div class="tab-pane fade ' . $class .  '" id="tab-' . $tab_counter . '">' . $text . '</div>';

    return $output;
}

function progressive_shortcodes_shortcode_tab_settings($attrs, $text) {
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-9">',
    );
    $form['icon'] = array(
        '#title' => t('Icon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['icon']) ? $attrs['icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
        '#suffix' => '</div></div>'
    );
    return $form;
}