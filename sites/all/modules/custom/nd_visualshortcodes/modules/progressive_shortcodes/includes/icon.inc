<?php

function progressive_shortcodes_icon_shortcode_info(&$shortcodes)
{
    $shortcodes['icon'] = array(
        'title' => t('Icon'),
        'description' => t('FontAwesome or LivIcon'),
        'process callback' => 'progressive_shortcodes_shortcode_icon',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_icon_settings',
        'icon' => 'fa fa-rocket'
    );
}
function progressive_shortcodes_shortcode_icon($attrs, $text) {
    $attrs['class'] = isset($attrs['shadow']) ? ' ' . $attrs['shadow'] : '';
    $text = isset($attrs['title']) && $attrs['title'] ? $attrs['title'] : '';
    $attrs['link'] = isset($attrs['link']) ? $attrs['link'] : '#';
    $attrs['href'] = strpos($attrs['link'], '#') === FALSE ? url($attrs['link']) : $attrs['link'];
    if($attrs['type'] == 'fontawesome') {
        if(!isset($attrs['style_color'])) {
            $attrs['style_color'] = '#f89406';
        }
        $attrs['class'] = 'icon icon-' . $attrs['fontawesome_size'] . (isset($attrs['class']) ? ' ' . $attrs['class'] : '');
        $text = '<i class = "' . $attrs['fontawesome_icon'] . '"></i>' . $text;
        return '<a ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>' . $text . '</a>';
    }
    elseif($attrs['type'] == 'livicon') {
        $attrs['class'] .= 'livicon block';
        $attrs['class'] .= isset($attrs['livicon_shadow']) && $attrs['livicon_shadow'] ? ' shadowed': '';
        $text = '<a ' . _progressive_shortcodes_shortcode_attributes($attrs) . ' data-n="' . $attrs['livicon'] . '" data-s="' . $attrs['livicon_size'] . '"
    ' . (isset($attrs['color_type']) && $attrs['color_type'] && isset($attrs['style_color']) && $attrs['style_color'] ? 'data-c="#' . trim($attrs['style_color'], '#'). '"': '') .
            (isset($attrs['livicon_type']) && $attrs['livicon_type'] == 'static' ? ' data-a="0"': '') .
            (!isset($attrs['livicon_hover']) || !$attrs['livicon_hover'] ? ' data-hc="0"': '') .
            (isset($attrs['livicon_type']) && $attrs['livicon_type'] == 'click_animation' ? ' data-et="click"': '') .
            (isset($attrs['livicon_type']) && $attrs['livicon_type'] == 'click_loop' ? ' data-et="click" data-l = "1"': '') .
            (isset($attrs['livicon_parent_trigger']) && $attrs['livicon_parent_trigger'] ? '': ' data-op="0"') .
            '></a>' . $text;
        unset($attrs['style_color']);
        return $text;
    }
}

function progressive_shortcodes_shortcode_icon_settings($attrs, $text) {
    $form['fontawesome'] = array(
        '#type' => 'container',
        '#states' => array(
            'visible' => array(
                '.icon-type-select' => array('value' => 'fontawesome')
            )
        )
    );
    $form['fontawesome']['fontawesome_icon'] = array(
        '#title' => t('FontAwesome Icon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['fontawesome_icon']) ? $attrs['fontawesome_icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $sizes = array('24' => '24px', '32' => '32px', '40' => '40px', '60' => '60px', '100' => '100px');
    $form['fontawesome']['fontawesome_size'] = array(
        '#title' => t('Font Size'),
        '#type' => 'select',
        '#options' => $sizes,
        '#default_value' => isset($attrs['fontawesome_size']) ? $attrs['fontawesome_size'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );

    $form['livicon'] = array(
        '#type' => 'container',
        '#states' => array(
            'visible' => array(
                '.icon-type-select' => array('value' => 'livicon')
            )
        )
    );
    $form['livicon']['livicon'] = array(
        '#title' => t('Livicon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/progressive_shortcodes/livicons_autocomplete',
        '#default_value' => isset($attrs['livicon']) ? $attrs['livicon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-3">',
    );
    $sizes = array('16' => '16px', '24' => '24px', '32' => '32px', '48' => '48px', '56' => '56px', '64' => '64px', '96' => '96px');
    $form['livicon']['livicon_size'] = array(
        '#title' => t('Font Size'),
        '#type' => 'select',
        '#options' => $sizes,
        '#default_value' => isset($attrs['livicon_size']) ? $attrs['livicon_size'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
    );
    $types = array('' => t('Animate on hover'), 'static' => t('Static'), 'click_animation' => t('Animate on click'), 'click_loop' => t('Click Start/Stop'));
    $form['livicon']['livicon_type'] = array(
        '#title' => t('Type'),
        '#type' => 'select',
        '#options' => $types,
        '#default_value' => isset($attrs['livicon_type']) ? $attrs['livicon_type'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
    );
    $form['livicon']['livicon_hover'] = array(
        '#title' => t('Hover color effect'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['livicon_hover']) ? $attrs['livicon_hover'] : '',
        '#prefix' => '</div><div class = "col-sm-3">',
    );
    $form['livicon']['livicon_parent_trigger'] = array(
        '#title' => t('Parent hover'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['livicon_parent_trigger']) ? $attrs['livicon_parent_trigger'] : '',
    );
    $form['livicon']['livicon_shadow'] = array(
        '#title' => t('Shadow'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['livicon_shadow']) ? $attrs['livicon_shadow'] : '',
        '#suffix' => '</div></div>',
    );

    $types = array('fontawesome' => t('FontAwesome'), 'livicon' => t('LivIcon'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Icon Type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : 'fontawesome',
        '#attributes' => array('class' => array('form-control icon-type-select')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['title'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['color_type'] = array(
        '#title' => t('Custom Color'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['color_type']) ? $attrs['color_type'] : '',
        '#attributes' => array('class' => array('color-type-select')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['style_color'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Color'),
        '#default_value' => isset($attrs['style_color']) ? $attrs['style_color'] : '',
        '#states' => array(
            'visible' => array(
                '.color-type-select' => array('checked' => TRUE),
            ),
        ),
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
    );
    $form['link'] = array(
        '#type' => 'textfield',
        '#title' => t('Link'),
        '#default_value' => isset($attrs['link']) ? $attrs['link'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    return $form;
}