<?php

function progressive_shortcodes_piechart_shortcode_info(&$shortcodes)
{
    $shortcodes['piechart'] = array(
        'title' => t('PieChart'),
        'description' => t('Piechart'),
        'process callback' => 'progressive_shortcodes_shortcode_piechart',
        'process settings callback' => 'progressive_shortcodes_piechart_settings',
        'icon' => 'icon-circle',
    );
}

function progressive_shortcodes_piechart_settings($attrs,$text,$form,&$form_state){
    if(isset($form_state['values'])) {
        $attrs = $form_state['values'];
    }
    $form['type_chart'] = array(
        '#title' => t('Type Chart'),
        '#type'  => 'select',
        '#options' => array('icon'=>'Icon','percent'=>'Value Percent'),
        '#attributes' => array('class' => array('form-control type_chart')),
        '#prefix' => '<div class="row"><div class="col-sm-6">',
        '#default_value' => isset($attrs['type_chart']) ? $attrs['type_chart'] : 'percent',

    );
    $animtion_options = array(
        'bounce',
        'bouncePast',
        'easeInQuad',
        'easeOutQuad',
        'easeInOutQuad',
        'easeInCubic',
        'easeOutCubic',
        'easeInOutCubic',
        'easeInQuart',
        'easeOutQuart',
        'easeInOutQuart',
        'easeInQuint',
        'easeOutQuint',
        'easeInOutQuint',
        'easeInSine',
        'easeOutSine',
        'easeInOutSine',
        'easeInExpo',
        'easeOutExpo',
        'easeInOutExpo',
        'easeInCirc',
        'easeOutCirc',
        'easeInOutCirc',
        'easeOutBounce',
        'easeInBack',
        'easeOutBack',
        'easeInOutBack',
        'elastic',
        'swingFromTo',
        'swingFrom',
        'swingTo',
        'easeFromTo',
        'easeFrom',
        'easeTo'
    );
    $form['chart_animation'] = array(
        '#type' => 'select',
        '#title' => t('Animation'),
        '#description' => 'Choose animation pieachart, default "bounce"',
        '#options' => array_combine($animtion_options,$animtion_options),
        '#default_value' => isset($attrs['chart_animation']) ? $attrs['chart_animation'] : '',
        '#prefix' => '</div><div class = "col-xs-6 centered">',
        '#suffix' => '</div></div>',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['custom_style'] = array(
        '#title' => t('Custom Style'),
        '#type'  => 'checkbox',
        '#attributes' => array('class' => array('checkbox-custom-style')),
        '#default_value' => isset($attrs['custom_style']) ? $attrs['custom_style'] : '',
        '#prefix' => '<div class="row"><div class="col-sm-12" >',
        '#suffix' => '</div></div>',
    );
    $form['icon_chart'] = array(
        '#title' => t('Icon'),
        '#type'  => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['icon_chart']) ? $attrs['icon_chart'] : '',
        '#attributes' => array(
            'class' => array('form-control')

        ),
        '#states' => array(
            'visible' => array(
                '.type_chart' => array('value' => 'icon'),
            ),
        ),
        '#prefix' => '<div class="row"><div class="col-sm-6">',
    );

    $form['icon_color'] = array(
        '#title' => t('Icon Color'),
        '#type'  => 'textfield',
        '#description' => t('Choose color'),
        '#default_value' => isset($attrs['icon_color']) ? $attrs['icon_color'] : '',
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#states' => array(
            'visible' => array(
                '.type_chart' => array('value' => 'icon'),
            ),
        ),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );
    $form['wrapper_value'] = array(
        '#type' => 'container',
        '#attributes' => array(
            'id' => 'wrapper_value_pie'
        )
    );
    $form['wrapper_value']['value_chart'] = array(
        '#title' => t('Value'),
        '#type'  => 'textfield',
        '#description' => t('Input value 1 to 100'),
        '#default_value' => isset($attrs['value_chart']) ? $attrs['value_chart'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">',

    );
    $form['wrapper_value']['value_color'] = array(
        '#title' => t('Color Value'),
        '#type'  => 'textfield',
        '#description' => t('Choose color'),
        '#default_value' => isset($attrs['value_color']) ? $attrs['value_color'] : '',
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#states' => array(
            'visible' => array(
                '.checkbox-custom-style' => array('checked' => TRUE),
            ),
        ),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );

    $form['stroke_color'] = array(
        '#title' => t('Stroke Color'),
        '#type'  => 'textfield',
        '#description' => t('Choose color for stroke'),
        '#default_value' => isset($attrs['stroke_color']) ? $attrs['stroke_color'] : '',
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#prefix' => '<div class="row"><div class="col-sm-6">',
        '#states' => array(
            'visible' => array(
                '.checkbox-custom-style' => array('checked' => TRUE),
            ),
        ),

    );
    $form['trail_color'] = array(
        '#title' => t('Lighter trail stroke'),
        '#type'  => 'textfield',
        '#description' => t('Choose lighter trail stroke color'),
        '#default_value' => isset($attrs['trail_color']) ? $attrs['trail_color'] : '',
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>',
        '#states' => array(
            'visible' => array(
                '.checkbox-custom-style' => array('checked' => true),
            ),
        ),
    );
    $form['title'] = array(
        '#title' => t('Title'),
        '#type'  => 'textfield',
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">'
    );

    $form['title_align'] = array(
        '#title' => t('Text align'),
        '#type'  => 'select',
        '#options' => array('text-center'=>'Center','text-left'=>'Left','text-right' => 'Right'),
        '#default_value' => isset($attrs['title_align']) ? $attrs['title_align'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );
    /*
    $form['review'] = array(
        '#type' => 'button',
        '#value' => t('Review'),
        '#ajax' => array(
            'callback' => 'review_shortcodes_piechart',
            'wrapper' => 'review_shortcod_pie',
            'method' => 'replace',
            'effect' => 'fade',
        ),
        //'#submit' => array('review_shortcodes_piechart')
    );
    */
    return $form;
}

function review_shortcodes_piechart($attrs,$text,$form,&$form_state)
{
   $output = '';
   $values = $form_state['values'];
   $element = $form['review_shortcode'];
   return  $element['#markup'] = $form_state;

}
function progressive_shortcodes_shortcode_piechart($attrs,$text){
    $data_value  = '';
    $ouput = '';
    $color_icon ='';
    $attrs['class'] = 'block-piechart stroke-dark trail-light';
    $class_piechart = '';
    $data_value .= isset($attrs['chart_animation']) ? 'data-animation="'.$attrs['chart_animation'].'"' : 'data-animation="bounce" ';
    if($attrs['custom_style'] !=0) {
        $data_value .= isset($attrs['value_color']) ? 'data-color-value="' . $attrs['value_color'] . '"' : '';
        $data_value .= isset($attrs['stroke_color']) ? 'data-stroke-color="' . $attrs['stroke_color'] . '"' : '';
        $data_value .= isset($attrs['trail_color']) ? 'data-trail-color="' . $attrs['trail_color'] . '"' : '';
    }
    else{
        $class_piechart = 'default';
    }
    $title_algin = 'class="'.$attrs['title_align'].'"';
    $title = isset($attrs['title']) ? '<h5 '.$title_algin.' >'.$attrs['title'].'</h5>' : '';
    $data_value .= isset($attrs['value_chart']) ? 'data-value="'.$attrs['value_chart'].'"' : '';
    $text_long = isset($attrs['text_long']) ? $attrs['text_long'] : '';
    $ouput.='<div '._progressive_shortcodes_shortcode_attributes($attrs).' >';
            if($attrs['type_chart'] == 'icon'){
                $color_icon = isset($attrs['icon_color']) ? 'style="color:#'.$attrs['icon_color'].'"' : '';
                $ouput.= '<div class="piechart '.$class_piechart.' piechart-icon" '.$data_value.'>';
                $ouput.= isset($attrs['icon_chart']) ? '<div class="icon '.$attrs['icon_chart'].'" '.$color_icon.'></div>' : '';
                $ouput.= '</div>';
            }
            else{
                $ouput.= '<div class="piechart '.$class_piechart.'" '.$data_value.'></div>';
            }
            $ouput.= $title;
            $ouput.= $text;
    $ouput.= '</div>';

    return $ouput;
}