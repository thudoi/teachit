<?php

function progressive_shortcodes_tabs_shortcode_info(&$shortcodes)
{
    $shortcodes['tabs'] = array(
        'title' => t('Tabs container'),
        'description' => t('jQuery Tabs.'),
        'process callback' => 'progressive_shortcodes_shortcode_tabs',
        'process settings callback' => 'progressive_shortcodes_shortcode_tabs_settings',
        'icon' => 'fa fa-folder-open',
        'child shortcode' => 'tab',
        'description_field' => 'type',
    );
}

function progressive_shortcodes_shortcode_tabs($attrs, $text) {
    global $tab_content;
    $attrs['id'] = drupal_html_class('tab');
    $attrs['class'] = 'tab-section-01 ' . (isset($attrs['class']) ? $attrs['class'] : '') . (isset($attrs['tab_style']) ? $attrs['tab_style'] : '');
    if(isset($attrs['position'])) {
        $attrs['class'] .= ' position-'.$attrs['position'];
        $class_tab = $attrs['position'] ? $attrs['position'] : '';
        switch ($attrs['position']) {
            case 'tabs-left':
                $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '><div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-12"><ul class="tablist '.$class_tab.'" role="tablist">' . $text . '</ul></div>
                    <div class="col-md-9 col-sm-9 col-xs-12"><div class="tab-content">' . $tab_content . '</div>
                    <div class="clearfix"></div></div>
                    </div></div>';
                break;
            case 'tabs-right':
                $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '><div class="row">
                    <div class="col-md-9 col-sm-9 col-xs-12"><div class="tab-content">' . $tab_content . '</div>
                    <div class="clearfix"></div></div>
                    <div class="col-md-3 col-sm-3 col-xs-12"><ul class="tablist '.$class_tab.'" role="tablist">' . $text . '</ul></div>
                    </div></div>';
                break;
        }
    }else{
        $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
                <ul class="tablist" role="tablist">' . $text . '</ul>
                <div class="tab-content">' . $tab_content . '</div>
                <div class="clearfix"></div>
            </div>';
    }

    $tab_content = '';
    return $text;
}


function progressive_shortcodes_shortcode_tabs_settings($attrs, $text) {
    $types = array('' => t('Horizontal'), 'tabs-left' => t('Vertical Left'), 'tabs-right' => t('Vertical Right'));
    $form['tab_style'] = array(
        '#title' => t('Tab style'),
        '#type' => 'select',
        '#options' => array('tab-style-1'=>'Style 1','tab-style-2'=>'Style 2'),
        '#default_value' => $attrs['tab_style'],
        '#attributes' => array('class'=>array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">',

    );
    $form['position'] = array(
        '#type' => 'select',
        '#title' => t('Postion'),
        '#options' => $types,
        '#default_value' => isset($attrs['position']) ? $attrs['position'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );

    return $form;
}