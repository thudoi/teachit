<?php

function progressive_shortcodes_progress_shortcode_info(&$shortcodes)
{
    $shortcodes['process_bar'] = array(
        'title' => t('Progress Bar'),
        'process callback' => 'progressive_shortcodes_shortcode_progress',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_progress_settings',
        'icon' => 'fa fa-tasks',
    );

}

function progressive_shortcodes_shortcode_progress($attrs, $text) {
    $output = '';
    $rows = array();
    $title_arr   = array();
    $percent_arr = array();
    $bg_percent_arr = array();
    $process_color = array();
    foreach($attrs as $name => $value) {
        if(strpos($name, 'title_') === 0) {
            $title_arr[] = $value;
        }
        if(strpos($name, 'percent_') === 0) {
            $percent_arr[] = $value;
        }
        if(strpos($name, 'background_color_') === 0) {
            $bg_percent_arr[] = $value;
        }
        if(strpos($name, 'process_color_') === 0) {
            $process_color[] = $value;
        }
    }
    if(isset($title_arr)) {
        foreach ($title_arr as $id => $title) {
            $rows[] = array(
                'title' => $title,
                'percent' => isset($percent_arr[$id]) ? $percent_arr[$id] : '',
                'bg_color' => isset($bg_percent_arr[$id]) ? $bg_percent_arr[$id] : '',
                'process_color' => isset($process_color[$id]) ? $process_color[$id] : '',
            );
        }
    }

    $style  = isset($attrs['style']) ? $attrs['style'] : '';
    $output.='<div class="progressbar-wrapper">';
            foreach($rows as $key => $row){
                $bg_color = isset($row['bg_color']) ? 'style="background-color:#'.$row['bg_color'].'"'  : '';
                $process_color = isset($row['process_color']) ? 'style="background-color:#'.$row['process_color'].'"' : '';
                $output.='<div class="progressbar-container '.$style.'">';
                    $output.='<h5 class="progressbar-title">'.$row['title'].'</h5>';
                    $output.=' <div class="wrap-progressbar" '.$bg_color.'><div role="progressbar" data-transitiongoal="'.$row['percent'].'" class="progressbar" '.$process_color.' ></div></div>';
                $output.='</div>';
            }
    $output.='</div>';

    return $output;
}

function progressive_shortcodes_shortcode_progress_settings($attrs, $text,$form, &$form_state) {
   
    if(isset($form_state['values'])) {
        $attrs = $form_state['values'];
    }
    $attrs['count_items'] = 0;
    foreach($attrs as $name => $value) {
        if(strpos($name, 'process_value_') === 0) {
            $attrs['count_items']++;
        }
    }
    // Add new item
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new process line')) {
            $attrs['count_items']++;
        }
    }
    $ajax = array(
        'callback' => 'progressive_shortcodes_shortcode_process_ajax_callback',
        'wrapper' => 'nd_visualshortcodes_process',
        'effect' => 'fade',
        'method' => 'replace',
    );
    $attrs['percent_1'] = isset($attrs['percent_1']) ? $attrs['percent_1'] : '';
    $form['style'] = array(
        '#type' => 'select',
        '#title' => t('Style'),
        '#options'=> array('basic'=>'Basic','style-tooltip' => 'Tooltip','fill-text' => 'Fill text'),
        '#default_value' => isset($attrs['style']) ? $attrs['style'] : 'style_1'
    );

    $form['items'] = array(
        '#type' => 'container',
        '#attributes' => array('id' => array('nd_visualshortcodes_process')),
        '#theme' => 'progressive_shortcodes_shortcode_precessbar_setting',
        '#attrs' => $attrs
    );
    foreach($attrs as $name => $value) {
        if(strpos($name,'percent_') === 0) {
            $i = str_replace('percent_','', $name);
            $form['items'] += progressive_shortcodes_shortcode_process_line($attrs, $i);
        }
    }
    // Add new row
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new process line')) {

            $form['items'] += progressive_shortcodes_shortcode_process_line($attrs, ++$i);
        }
    }
    $form['add_new'] = array(
        '#type' => 'submit',
        '#value' => t('Add new process line'),
        '#submit' => array('_shortcodes_pricing_process_ajax_rebuild'),
        '#ajax' => $ajax
    );
    return $form;
}

function progressive_shortcodes_shortcode_process_line($attrs,$i){
    $form['title_'.$i] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title_'.$i]) ? $attrs['title_'.$i] : '',
        '#attributes' => array('class' => array('form-control')),
    );

    $form['percent_'.$i] = array(
        '#type' => 'textfield',
        '#title' => t('Percent'),
        '#default_value' => isset($attrs['percent_'.$i]) ? $attrs['percent_'.$i] : '',
        '#attributes' => array('class' => array('form-control')),

    );
    $form['background_color_'.$i] = array(
        '#type' =>'textfield',
        '#title' => 'Background color',
        '#attributes'=>array(
            'class' => array('form-control colorpicker-enable')
        ),
        '#default_value' => isset($attrs['background_color_'.$i]) ? $attrs['background_color_'.$i] : '',

    );
    $form['process_color_'.$i] = array(
        '#type' =>'textfield',
        '#title' => 'Process color',
        '#attributes'=>array(
            'class' => array('form-control colorpicker-enable')
        ),
        '#default_value' => isset($attrs['process_color_'.$i]) ? $attrs['process_color_'.$i] : '',

    );
    return $form;
}
function progressive_shortcodes_shortcode_process_ajax_callback($form,&$form_state){
    return $form['shortcode']['settings']['items'];
}

function _shortcodes_pricing_process_ajax_rebuild($form, &$form_state) {
    $form_state['rebuild'] = TRUE;
}

function theme_progressive_shortcodes_shortcode_precessbar_setting($form){
    $output = '';
    $rows = array();
    $output .= render($form['form']['settings']);
    $header = array(t('Title'), t('Percent Value'),t('Background Color'),t('Process Color'));

    foreach (element_children($form['form']) as $key) {
        if(strpos($key,'title_') === 0) {
            $i = str_replace('title_', '', $key);
            $row = array(
                render($form['form']['title_' . $i]),
                render($form['form']['percent_' . $i]),
                render($form['form']['background_color_'.$i]),
                render($form['form']['process_color_'.$i]),
            );
            $rows[] = $row;
        }
    }
    $output .= theme('table', array('rows' => $rows, 'header' => $header));
    return $output;
}