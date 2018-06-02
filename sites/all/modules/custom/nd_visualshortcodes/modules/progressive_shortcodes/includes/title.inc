<?php

function progressive_shortcodes_title_shortcode_info(&$shortcodes)
{
    $shortcodes['title'] = array(
        'title' => t('Title'),
        'description' => t('Title with optional underline.'),
        'process callback' => 'progressive_shortcodes_shortcode_title',
        'tips callback' => 'progressive_shortcodes_shortcode_title_tip',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_title_settings',
        'icon' => 'fa fa-text-width',
        'description_field' => 'title',
    );
}

function progressive_shortcodes_shortcode_title($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? ' ' . $attrs['class'] : '';
    $attrs['class'] .= isset($attrs['underline']) && $attrs['underline'] && (!isset($attrs['type']) || $attrs['type'] != 'page') ? ' title-box' : '';
    $attrs['class'] .= isset($attrs['title_align']) && $attrs['title_align']? ' ' . $attrs['title_align'] : '';
   // $attrs['class'] .= isset($attrs['position_underline']) && (!isset($attrs['type']) || $attrs['type'] != 'page') && ($attrs['position_underline'] == 'before' ) ? ' before' : ' after';
    if(isset($attrs['position_underline']) && !isset($attrs['type']) || $attrs['type'] != 'page')
    {
        if($attrs['position_underline'] == 'before')
        {
            $attrs['class'] .= ' before';
        }
        if($attrs['position_underline'] == 'after')
        {
            $attrs['class'] .= ' after';
        }
        else
        {
            $attrs['class'] .= '';
        }
    }
    $tag = isset($attrs['type']) && $attrs['type'] ? $attrs['type'] : 'h3';
    $tag = $tag == 'page' ? 'h1' : $tag;
    $text = trim($text) ? $text : (isset($attrs['title']) ? $attrs['title'] : '');
    $text = '<' . $tag . ' class = "title">' . $text . '</' . $tag . '>';
    if(isset($attrs['subtitle']))
    {
        $text.= '<p>'.$attrs['subtitle'].'</p>';
    }
    if(isset($attrs['type']) && $attrs['type'] == 'page') {
        $attrs['class'] .= ' page-header';
        $output = '<header ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '><div class = "container">' . $text . '</div></header>';
    }
    else {
        $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>' . $text . '</div>';
    }
    return $output;
}

function progressive_shortcodes_shortcode_title_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Title:</strong><br/>[title type = "h3" underline = "1"][/title]</p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_title_settings($attrs, $text) {
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => $text ? $text : (isset($attrs['title']) ? $attrs['title'] : ''),
        '#attributes' => array('class' => array('form-control'))
    );
    $types = array('h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3', 'h4' => 'H4', 'h5' => 'H5', 'h6' => 'H6', 'page' => t('Page Header'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : 'h2',
        '#attributes' => array('class' => array('form-control','select_type'))
    );
    $form['subtitle'] = array(
        '#type' => 'textfield',
        '#title' => t('Sub title'),
        '#default_value' => isset($attrs['subtitle']) ? $attrs['subtitle'] : $attrs['subtitle'],
        '#attributes' => array('class' => array('form-control'))
    );
    $form['underline'] = array(
        '#type' => 'checkbox',
        '#title' => t('Underline'),
        '#default_value' => isset($attrs['underline']) ? $attrs['underline'] : 1,
        '#attributes' => array('class'=>array('underline_title'))
    );
    $form['position_underline'] = array(
        '#type' => 'select',
        '#title' => t('Position underline'),
        '#options' => array('after'=> t('After'),'before' => t('Before')),
        '#default_value' => isset($attrs['position_underline']) ? $attrs['position_underline'] : '',
        '#states' => array(
            'visible' => array(
                '.underline_title' => array('checked' => TRUE),
            )
        )
    );
    $aligns = array('' => t('Left'), 'text-center' => t('Center'), 'text-right' => t('Right'));
    $form['title_align'] = array(
        '#type' => 'select',
        '#title' => t('Align'),
        '#options' => $aligns,
        '#default_value' => isset($attrs['title_align']) ? $attrs['title_align'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}