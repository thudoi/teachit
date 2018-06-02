<?php

function progressive_shortcodes_counter_shortcode_info(&$shortcodes)
{
    $shortcodes['counter'] = array(
        'title' => t('Counter'),
        'description' => t('Counter Number'),
        'process callback' => 'progressive_shortcodes_shortcode_counter',
        'process settings callback' => 'progressive_shortcodes_shortcode_counter_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'icon' => 'fa fa-sort-numeric-asc'
    );
}

function progressive_shortcodes_shortcode_counter($attr,$text)
{
    $attr['class'] = isset($attr['class']) ? ' ' . $attr['class'] : '';
    $attr['class'] .= ' counter_number';
    if(isset($attr['text_position']))
    {
        switch($attr['text_position']){
            case 'None':
                break;
            case 'Left':
                $attr['class'] .= ' text-left';
                break;
            case 'Center':
                $attr['class'] .= ' text-center';
                break;
            case 'Right':
                $attr['class'] .= ' text-right';
                break;
        }
    }
    $color = isset($attr['num_color_icon']) ? 'style="color:#'.$attr['num_color_icon'].'"' : '';
    $prefix = isset($attr['num_prefix']) ? '<span class="prefix">'.$attr['num_prefix'].'</span>' : '';
    $suffix = isset($attr['num_suffix']) ? '<span class="suffix">'.$attr['num_suffix'].'</span>' : '';
    $text = '';
    $icon_size = isset($attr['num_icon_size']) ? 'style="font-size:'.$attr['num_icon_size'].'px"' : '';
    $text .= isset($attr['num_icon']) ? '<p class="countingIcon" '.$color.'><i class="'.$attr['num_icon'].'" '.$icon_size.'></i></p>' : '';
    $text .= isset($attr['num_start']) && isset($attr['num_end']) ? '<p class="couting" data-start="'.$attr['num_start'].'" data-end="'.$attr['num_end'].'" data-speed="'.$attr['num_speed'].'">'.$prefix.'<span class="number">'.$attr['num_end'].'</span>'.$suffix.'</p>' : '';
    $text .= isset($attr['text_below']) ? '<p class="couting_text">'.$attr['text_below'].'</p>' : '';
    $output = '<div'._progressive_shortcodes_shortcode_attributes($attr).'>'.$text.'</div>';

    return $output;
}



function progressive_shortcodes_shortcode_counter_settings($attr,$text)
{
    $form['text_position'] = array(
        '#title' => t('Postion'),
        '#type'  => 'select',
        '#options' => drupal_map_assoc(array('None','Left','Center','Right')),
        '#default_value' => isset($attr['text_position']) ? $attr['text_position'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-md-6">',
        '#suffix' => '</div></div>'
    );
    $form['num_start'] = array(
        '#title' => t('Number Begin'),
        '#type'  => 'textfield',
        '#default_value' => isset($attr['num_start']) ? $attr['num_start'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-md-6">',
    );
    $form['num_end'] = array(
        '#title' => t('Number End'),
        '#type'  => 'textfield',
        '#default_value' => isset($attr['num_end']) ? $attr['num_end'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-md-6">',
        '#suffix' => '</div></div>'
     );
    $form['num_prefix'] = array(
        '#title' => t('Prefix'),
        '#type'  => 'textfield',
        '#description' => t('Input symbol or text for prefix'),
        '#default_value' => isset($attr['num_prefix']) ? $attr['num_prefix'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-md-6">',
    );
    $form['num_suffix'] = array(
        '#title' => t('Suffix'),
        '#type'  => 'textfield',
        '#description' => t('Input symbol or text for suffix'),
        '#default_value' => isset($attr['num_suffix']) ? $attr['num_suffix'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-md-6">',
        '#suffix' => '</div></div>'
    );
    $form['num_icon'] = array(
        '#title' => t('Icon'),
        '#type'  => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attr['num_icon']) ? $attr['num_icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-md-4">'
    );
    $form['num_color_icon'] = array(
        '#title' => t('Color'),
        '#type'  => 'textfield',
        '#default_value' => isset($attr['num_color_icon']) ? $attr['num_color_icon'] : '',
        '#attributes' => array('class' => array('colorpicker-enable form-control')),
        '#prefix' => '</div><div class="col-md-4">',

    );
    $form['num_icon_size'] = array(
        '#title' => t('Size'),
        '#type'  => 'textfield',
        '#default_value' => isset($attr['num_icon_size']) ? $attr['num_icon_size'] : '',
        '#description' => t('Input number size,ex: "16px" you need input number "16"'),
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-md-4">',
        '#suffix' => '</div></div>'
    );

    $form['text_below'] = array(
        '#title'  => t('Input Text Below'),
        '#type'   => 'textfield',
        '#default_value' => isset($attr['text_below']) ? $attr['text_below'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-md-6">',
    );
    $form['num_speed'] = array(
        '#title' => t('Speed'),
        '#type'  => 'textfield',
        '#description' => 'Unit 1000 = 1s (seconds)',
        '#default_value' => isset($attr['num_speed']) ? $attr['num_speed'] : '',
        '#attributes'  => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-md-6"> ',
        '#suffix' => '</div></div>'
    );
    return $form;
}