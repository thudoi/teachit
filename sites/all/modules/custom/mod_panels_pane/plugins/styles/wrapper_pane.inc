<?php

// Plugin wrapper raw for pane

// Plugin definition

$plugin = array(
    'title' => t('Wrapper: Region'),
    'description' => t('Wrap regions and pane with raw HTML'),
    'render region' => 'mod_panels_pane_wrapper_render_region',
    'render pane'   => 'mod_panels_pane_wrapper_render_pane',
    'pane settings form' => 'mod_panels_pane_wrapper_raw_pane_settings_form',
    'settings form' =>  'mod_panels_pane_wrapper_raw_region_settings_form'
);

function mod_panels_pane_wrapper_raw_region_settings_form($style_settings){
    $form['region'] = array(
        '#type' => 'fieldset',
        '#title' => t('Region Panel'),
    );
    $form['region']['prefix'] = array(
        '#type' => 'textarea',
        '#title' => t('Prefix'),
        '#description' => t('HTML code to go <em>before</em> the region panel'),
        '#default_value' => isset($style_settings['region']['prefix']) ? $style_settings['region']['prefix'] : '',
    );

    $form['region']['suffix'] = array(
        '#type' => 'textarea',
        '#title' => t('Suffix'),
        '#description' => t('HTML code to go <em>after</em> the region panel'),
        '#default_value' => isset($style_settings['region']['suffix']) ? $style_settings['region']['suffix'] : '',
    );
    return $form;
}


function mod_panels_pane_wrapper_raw_pane_settings_form($style_settings){

    $form['panel'] = array(
        '#type' => 'fieldset',
        '#title' => t('Region Panel'),
    );
    $form['panel']['prefix'] = array(
        '#type' => 'textarea',
        '#title' => t('Prefix'),
        '#description' => t('HTML code to go <em>before</em> the region panel'),
        '#default_value' => isset($style_settings['panel']['prefix']) ? $style_settings['panel']['prefix'] : '',
    );

    $form['panel']['suffix'] = array(
        '#type' => 'textarea',
        '#title' => t('Suffix'),
        '#description' => t('HTML code to go <em>after</em> the region panel'),
        '#default_value' => isset($style_settings['panel']['suffix']) ? $style_settings['panel']['suffix'] : '',
    );

    return $form;

}

function theme_mod_panels_pane_wrapper_render_pane($vars){

    $content = $vars['content'];
    $pane = $vars['pane'];
    $display = $vars['display'];
    $settings = $vars['settings'];
    $plugin = $vars['style'];
    if (!isset($content->css_class)) {
        $content->css_class = '';
    }
    if(isset($settings['panel']['prefix']) && isset($settings['panel']['suffix'])){
        return $settings['panel']['prefix'].theme('panels_pane', array('content' => $content, 'pane' => $pane, 'display' => $display)).$settings['panel']['suffix'];
    }
    else {
        return theme('panels_pane', array('content' => $content, 'pane' => $pane, 'display' => $display));
    }
}

function theme_mod_panels_pane_wrapper_render_region($vars){
    $display = $vars['display'];
    $region_id = $vars['region_id'];
    $panes = $vars['panes'];
    $settings = $vars['settings'];
    $output = '';
    if(isset($settings['region']['prefix']) && isset($settings['region']['suffix'])){
        $output .= $settings['region']['prefix'];
        $output .= '<div class="region region-' . $vars['region_id'] . ' donate-button">';
        $output .= implode('<div class="panel-separator"></div>', $panes);
        $output .= '</div>';
        $output .= $settings['region']['suffix'];
    }
    else {
        $output .= '<div class="region region-' . $vars['region_id'] . ' donate-button">';
        $output .= implode('<div class="panel-separator"></div>', $panes);
        $output .= '</div>';
    }
    return $output;
}