<?php

function progressive_shortcodes_progress_shortcode_info(&$shortcodes)
{
    $shortcodes['progress'] = array(
        'title' => t('Progress Line'),
        'description' => t('Progress line with title and percents.'),
        'process callback' => 'progressive_shortcodes_shortcode_progress',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_progress_settings',
        'icon' => 'fa fa-tasks',
        'tips callback' => 'progressive_shortcodes_shortcode_progress_tip',
        'description_field' => 'title',
    );
}

function progressive_shortcodes_shortcode_progress($attrs, $text) {
    $attrs['class'] = isset($attrs['class']) ? $attrs['class'] : '';
    $attrs['class'] .= isset($attrs['animated']) && $attrs['animated']? ' active' : '';
    $attrs['class'] .= isset($attrs['striped']) && $attrs['striped']? ' progress-striped' : '';
    $attrs['class'] .= isset($attrs['hover']) && $attrs['hover']? ' hover' : '';

    $colors = array('blue' => 'info', 'green' => 'success', 'orange' => 'warning', 'red' => 'danger', 'black' => '');
    $color = (isset($attrs['color']) && isset($colors[$attrs['color']])) ? $attrs['color'] : '';
    $text = isset($attrs['title']) && $attrs['title'] ? $attrs['title'] : $text;
    if(isset($attrs['type']) && $attrs['type'] == 'circle') {
        $attrs['class'] .= ' progress-circular';
        $line_color = isset($attrs['custom_color']) && $attrs['custom_color'] ? '#' . trim($attrs['custom_color'], '#') : '#f2f2f2';
        $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>
       <input type="text" class="knob" value="0" rel="' . $attrs['percent'] . '" data-linecap="round" data-width="200" data-bgColor="#f2f2f2" data-fgColor="' . $line_color . '" data-thickness=.15 data-readOnly=true disabled>
      </div>';
    }
    else {
        $attrs['class'] .= ' progress';
        $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . ' data-appear-progress-animation="' . $attrs['percent'] .'%">
      <div class="progress-bar progress-bar-' . $colors[$color] . '">' . $text . ' <span class = "progress-percent">' . $attrs['percent'] .'%</span></div>
    </div>';
    }
    return $text;
}

function progressive_shortcodes_shortcode_progress_settings($attrs, $text) {
    $attrs['title'] = isset($attrs['title']) && $attrs['title'] ? $attrs['title'] : '';
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-7">',
        '#states' => array(
            'invisible' => array(
                '.progess-type-select' => array('value' => 'circle'),
            ),
        ),
    );
    $colors = array('blue' => t('Blue'), 'green' => t('Green'), 'orange' => t('Orange'), 'red' => t('Red'), 'black' => t('Black'));
    $form['color'] = array(
        '#type' => 'radios',
        '#title' => t('Color'),
        '#options' => $colors,
        '#default_value' => isset($attrs['color']) ? $attrs['color'] : 'blue',
        '#attributes' => array('class' => array('color-radios')),
        '#prefix' => '</div><div class = "col-sm-3">',
        '#states' => array(
            'visible' => array(
                '.progess-type-select' => array('value' => 'line'),
            ),
        ),
    );
    $form['percent'] = array(
        '#type' => 'textfield',
        '#title' => t('Percent'),
        '#default_value' => isset($attrs['percent']) ? $attrs['percent'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-2">',
        '#suffix' => '</div></div>',
    );
    $types = array('line' => t('Line'), 'circle' => t('Circle'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : 'line',
        '#attributes' => array('class' => array('form-control progess-type-select')),
        '#prefix' => '<div class = "row"><div class = "col-sm-3">',
    );
    $form['striped'] = array(
        '#type' => 'checkbox',
        '#title' => t('Striped'),
        '#default_value' => isset($attrs['striped']) ? $attrs['striped'] : '',
        '#prefix' => '</div><div class = "col-sm-3">',
        '#states' => array(
            'visible' => array(
                '.progess-type-select' => array('value' => 'line'),
            ),
        ),
    );
    $form['animated'] = array(
        '#type' => 'checkbox',
        '#title' => t('Animated'),
        '#default_value' => isset($attrs['animated']) ? $attrs['animated'] : '',
        '#prefix' => '</div><div class = "col-sm-3">',
        '#states' => array(
            'visible' => array(
                '.progess-type-select' => array('value' => 'line'),
            ),
        ),
    );
    $form['hover'] = array(
        '#type' => 'checkbox',
        '#title' => t('Hover Animation'),
        '#default_value' => isset($attrs['hover']) ? $attrs['hover'] : '',
        '#prefix' => '</div><div class = "col-sm-3">',
        '#states' => array(
            'visible' => array(
                '.progess-type-select' => array('value' => 'line'),
            ),
        ),
    );
    $form['custom_color'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Color'),
        '#default_value' => isset($attrs['custom_color']) ? $attrs['custom_color'] : '',
        '#states' => array(
            'invisible' => array(
                '.progess-type-select' => array('value' => 'line'),
            ),
        ),
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#prefix' => '</div><div class = "col-sm-3">',
        '#suffix' => '</div></div>',
    );
    return $form;
}

function progressive_shortcodes_shortcode_progress_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Progress bar:</strong><br/>[progress percent = "90" color = "blue"]Design[/progress]</br>';
    return implode(' ', $output);
}