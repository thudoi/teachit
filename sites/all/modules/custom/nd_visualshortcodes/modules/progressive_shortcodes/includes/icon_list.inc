<?php

function progressive_shortcodes_icon_list_shortcode_info(&$shortcodes)
{
    $shortcodes['icon_list'] = array(
        'title' => t('Icon List'),
        'description' => t('Icon List'),
        'process callback' => 'progressive_shortcodes_shortcode_icon_list',
        'process settings callback' => 'progressive_shortcodes_shortcode_icon_list_settings',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'icon' => 'fa fa-list-ul',
        'description_field' => 'type',
    );

}

function progressive_shortcodes_shortcode_icon_list($attr,$text)
{
    $attr['class'] = isset($attr['class']) ? ' ' . $attr['class'] : '';
    $attr['class'] .= ' icon_list';
    $values = array();
    foreach($attr as $name => $value) {
        if(strpos($name, 'line_value_') === 0) {
            $values[] = $value;
        }
    }
    $color = isset($attr['color']) ? 'style="color:#'.$attr['color'].'"' : '';
    $icon['class'][] = isset($attr['fontawesome_icon']) ? $attr['fontawesome_icon'] : '';
    $font_size = isset($attr['fontawesome_size']) ? $attr['fontawesome_size'] : '';
    $icon['style'][] = isset($attr['color'])? "color:#".$attr['color'].";" : '';
    $icon['style'][] = "font-size:".$font_size."px;";
    $text .= '<ul'._progressive_shortcodes_shortcode_attributes($attr).'>';
    foreach($values as $value)
    {
        $text.= '<li> <i '.drupal_attributes($icon).'></i>'.$value.'</li>';
    }
    $text .= '</ul>';
    return $text;
}

function progressive_shortcodes_shortcode_icon_list_settings($attrs,$text,$form, &$form_state)
{
    if(isset($form_state['values'])) {
        $attrs = $form_state['values'];
    }

    // Add new item
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new item')) {
            $attrs['count_items']++;
        }
    }

    $attrs['line_value_1'] = isset($attrs['line_value_1']) ? $attrs['line_value_1'] : '';
    $ajax = array(
        'callback' => 'progressive_shortcodes_shortcode_icon_list_ajax_callback',
        'wrapper' => 'nd_visualshortcodes_icon_list',
        'effect' => 'fade',
        'method' => 'replace',
    );

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
    $sizes = array('12'=> '12px','16'=> '16px','24' => '24px', '32' => '32px', '40' => '40px', '60' => '60px', '100' => '100px');
    $form['fontawesome']['fontawesome_size'] = array(
        '#title' => t('Font Size'),
        '#type' => 'select',
        '#options' => $sizes,
        '#default_value' => isset($attrs['fontawesome_size']) ? $attrs['fontawesome_size'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['color'] = array(
        '#title' => t('Colors'),
        '#type'  => 'textfield',
        '#default_value' => isset($attrs['color']) ? $attrs['color'] : '',
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#prefix' => '<div class="row"> <div class="col-md-6" >',
        '#suffix' => '</div></div>'
    );

    $attrs['count_items'] = 0;
    foreach($attrs as $name => $value) {
        if(strpos($name, 'chart_title_value_') === 0) {
            $attrs['count_items']++;
        }
    }

    $form['line_items'] = array(
        '#type' => 'container',
        '#attributes' => array('id' => array('nd_visualshortcodes_icon_list')),
        '#theme' => 'progressive_shortcodes_shortcode_icon_list_settings',
        '#attrs' => $attrs
    );

    // Process show line item
    foreach($attrs as $name => $value) {
        if(strpos($name, 'line_value_') === 0) {
            $i = str_replace('line_value_', '', $name);
            $form['line_items'] += progressive_shortcodes_shortcode_icon_list_item($attrs, $i);
        }
    }

    // Add new row
    if(isset($form_state['values'])) {

        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new row')) {

            $form['line_items'] += progressive_shortcodes_shortcode_icon_list_item($attrs, ++$i);
        }

    }
    $form['add_new'] = array(
        '#type' => 'submit',
        '#value' => t('Add new row'),
        '#submit' => array('progressive_shortcodes_icon_list_ajax_rebuild'),
        '#ajax' => $ajax
    );
    return $form;
}


function progressive_shortcodes_icon_list_ajax_rebuild($form,&$form_state)
{
    $form_state['rebuild'] = TRUE;
}

function progressive_shortcodes_shortcode_icon_list_ajax_callback($form,$form_state)
{
     return $form['shortcode']['settings']['line_items'];
}

function progressive_shortcodes_shortcode_icon_list_item($attrs,$i)
{

    $form['line_value_' . $i] = array(
        '#type' => 'textfield',
        '#default_value' => isset($attrs['line_value_' . $i]) ? $attrs['line_value_' . $i] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    return $form;
}

function theme_progressive_shortcodes_shortcode_icon_list_settings($form)
{
    $header  = array(t('Line Item'));
    $output  = '';
    $rows = array();
   // $header = array(t('Values'));
    foreach (element_children($form['form']) as $key) {
        if(strpos($key, 'line_value_') === 0) {
            $i = str_replace('line_value_', '', $key);
            $element = &$form['form'][$key];
            $row = array(render($element));
            $rows[] = $row;
        }
    }
    $output .= theme('table', array('rows' => $rows, 'header' => $header));

    return $output;
}

