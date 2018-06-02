<?php

function progressive_shortcodes_button_shortcode_info(&$shortcodes)
{
    $shortcodes['button'] = array(
        'title' => t('Button link'),
        'description' => t('Button linked to any page or content.'),
        'process callback' => 'progressive_shortcodes_shortcode_button',
        'tips callback' => 'progressive_shortcodes_shortcode_button_tip',
        'process settings callback' => 'progressive_shortcodes_shortcode_button_settings',
        'icon' => 'fa fa-bold',
        'description_field' => 'text',
    );
}

function progressive_shortcodes_shortcode_button($attrs, $text) {
    $attrs['extra_classes'] = isset($attrs['extra_classes']) ? $attrs['extra_classes'] : '';
    $attrs['extra_classes'] .= isset($attrs['color']) && (!isset($attrs['color_type']) || !$attrs['color_type']) ? ' ' . $attrs['color'] : '';
    $attrs['extra_classes'] .= isset($attrs['size']) ? ' ' . $attrs['size'] : '';
    $attrs['type'] = isset($attrs['type']) ? $attrs['type'] : 'default';
    $styles = array(
        'default' => 'btn',
        'outlined' => 'btn btn-border',
        'social_squared' => 'sbtnf sbtnf-squere sbtnf-icon-white sbtnf-icon-bg-black color',
        'social_rounded' => 'sbtnf sbtnf-rounded sbtnf-icon-white sbtnf-icon-bg-black color',
        'social_heavily_rounded' => 'sbtnf sbtnf-circle sbtnf-icon-white sbtnf-icon-bg-black color',
        'block' => 'btn btn-block'
    );
    $attrs['extra_classes'] .= ' btn-oss ' . $styles[$attrs['type']];
    if(isset($attrs['color_type']) && $attrs['color_type'] && isset($attrs['custom_color']) && $attrs['custom_color']) {
        $attrs['style_background_color'] = trim($attrs['custom_color'], '#');
        if(strtolower($attrs['style_background_color']) == 'ffffff') {
            $attrs['extra_classes'] .= ' btn-white';
        }
    }
    $attrs['link'] = isset($attrs['link']) ? $attrs['link'] : '#';
    $attrs['href'] = strpos($attrs['link'], '#') === FALSE ? url($attrs['link']) : $attrs['link'];
    $attrs['target'] = isset($attrs['new_tab']) && $attrs['new_tab'] ? '_blank' : '';
    $text .= isset($attrs['text']) ? $attrs['text'] : '';
    $text = isset($attrs['icon']) ? '<i class = "' . $attrs['icon'] . '"></i>&nbsp; ' . $text : $text;
    $text = '<a ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>' . $text . '</a>';
    return $text;
}

function progressive_shortcodes_shortcode_button_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Button Link:</strong><br/>[button class="btn-lg btn-default" link = "contact"]Text[/button]</br>';
    $output[] = '<strong>link</strong> - URL to linked content.</br>';
    $output[] = 'Available size classes: <strong>btn-lg</strong> - Big, <strong>btn-sm</strong> - Small, by default - Medium.</br>';
    $output[] = 'Available color classes: <strong>btn-default</strong>, <strong>btn-primary</strong>, <strong>btn-info</strong>, <strong>btn-success</strong>, <strong>btn-warning</strong>, <strong>btn-danger</strong></p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_button_settings($attrs, $text) {
    $form['icon'] = array(
        '#title' => t('Icon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['icon']) ? $attrs['icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $styles = array('default' => t('Default'),  'outlined' => t('Outlined'), 'social_squared' => t('Social Squared'), 'social_rounded' => t('Social Smoothly Rounded'), 'social_heavily_rounded' => t('Social Heavily Rounded'), 'block' => t('Block button'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Style'),
        '#options' => $styles,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['color_type'] = array(
        '#title' => t('Custom Color'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['color_type']) ? $attrs['color_type'] : FALSE,
        '#attributes' => array('class' => array('color-type-select')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $colors = array('btn-danger' => t('Red'), 'btn-info' => t('Blue'), 'btn-warning' => t('Orange'), 'btn-success' => t('Green'), 'btn-primary' => t('Dark Blue'), 'btn-inverse' => t('Inverse'));
    $form['color'] = array(
        '#type' => 'radios',
        '#title' => t('Color'),
        '#options' => $colors,
        '#default_value' => isset($attrs['color']) ? $attrs['color'] : 'btn-info',
        '#attributes' => array('class' => array('color-radios')),
        '#states' => array(
            'visible' => array(
                '.color-type-select' => array('checked' => FALSE),
            ),
        ),
    );
    $form['custom_color'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Color'),
        '#default_value' => isset($attrs['custom_color']) ? $attrs['custom_color'] : '',
        '#states' => array(
            'visible' => array(
                '.color-type-select' => array('checked' => TRUE),
            ),
        ),
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
    );
    $sizes = array('btn-xs' => t('Small'),  'btn-sm' => t('Medium'), '' => t('Default'), 'btn-lg' => t('Large'));
    $form['size'] = array(
        '#type' => 'select',
        '#title' => t('Size'),
        '#options' => $sizes,
        '#default_value' => isset($attrs['size']) ? $attrs['size'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['text'] = array(
        '#title' => t('Text'),
        '#type' => 'textfield',
        '#default_value' => isset($attrs['text']) ? $attrs['text'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['link'] = array(
        '#type' => 'textfield',
        '#title' => t('Link'),
        '#default_value' => isset($attrs['link']) ? $attrs['link'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['new_tab'] = array(
        '#title' => t('Open link in new tab'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['new_tab']) ? $attrs['new_tab'] : FALSE,
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
        '#suffix' => '</div></div>'
    );
    return $form;
}