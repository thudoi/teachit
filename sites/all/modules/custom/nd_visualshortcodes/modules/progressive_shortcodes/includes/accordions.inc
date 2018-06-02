<?php

function progressive_shortcodes_accordions_shortcode_info(&$shortcodes)
{
    $shortcodes['accordions'] = array(
        'title' => t('Accordion container'),
        'description' => t('Animated Accordions wrapper.'),
        'process callback' => 'progressive_shortcodes_shortcode_accordions',
        'process settings callback' => 'progressive_shortcodes_shortcode_accordions_settings',
        'tips callback' => 'progressive_shortcodes_shortcode_accordions_tip',
        'child shortcode' => 'accordion',
        'icon' => 'fa fa-bars'
    );
}

function progressive_shortcodes_shortcode_accordions($attrs, $text) {
    global $accordion_id, $accordion_filter;

    $attrs['class'] = 'panel-group ' . (isset($attrs['class']) ? ' ' . $attrs['class'] : '');
    $attrs['class'] .= isset($attrs['multi_collapse']) ? ' multi-collapse' : '';
    if(!empty($accordion_filter)) {
        $attrs['class'] .= ' filter-elements';
    }
    $attrs['class'] .= isset($attrs['style_accordions']) ? ' '.$attrs['style_accordions'] : '';
    $attrs['class'] .= isset($attrs['style_row']) ? ' '.$attrs['style_row'] : '';
    $text = '<div '._progressive_shortcodes_shortcode_attributes($attrs).'><div class="panel-group">' . $text . '</div></div>';
    if(!empty($accordion_filter)) {
        $output = '<div class="filter-box accordions-filter">
      <div class="btn-group filter-buttons filter-list">
        <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
          ' . t('All') . ' <span class="caret"></span>
        </button>
        <ul class="dropdown-menu" role="menu">
          <li><a href="#" data-filter="*" class="active">' . t('All') . '</a></li>';
        foreach($accordion_filter as $plain => $title) {
            $output .= '<li><a href="#" data-filter=".' . $plain . '">' . $title .  '</a></li>';
        }
        $output .= '
        </ul>
        <div class="clearfix"></div>
      </div>';
        $text = $output . $text . '</div>';
    }
    $accordion_id++;
    $accordion_filter = array();
    return $text;
}

function progressive_shortcodes_shortcode_accordions_settings($attrs, $text) {
    $form['style_accordions'] = array(
        '#title' => 'Style',
        '#type'  => 'select',
        '#options' => array(
            'accordion-1' => t('Accordion 1'),
            'accordion-2' => t('Accordion 2')
        ),
        '#default_value' => isset($attrs['style_accordions']) ? $attrs['style_accordions'] : 'accordion-1',
        '#attributes' => array('class' => array('form-control')),
        '#prefix'     => '<div class="row"><div class="col-sm-6">'
    );
    $form['style_row'] = array(
        '#title' => 'Row',
        '#type'  => 'select',
        '#options' => array('style-arrow-1'=>'Style row 1','style-arrow-2'=>'Style row 2'),
        '#default_value' => isset($attrs['style_row']) ? $attrs['style_row'] : 'style-arrow-1',
        '#attributes' =>  array('class' => array('form-control')),
        '#prefix'     => '</div><div class="col-sm-6">',
        '#suffix'     => '</div></div>'
    );

    $form['multi_collapse'] = array(
        '#type' => 'checkbox',
        '#title' => t('Multi Collapse mode'),
        '#default_value' => isset($attrs['multi_collapse']) ? $attrs['multi_collapse'] : '',
    );
    return $form;
}

