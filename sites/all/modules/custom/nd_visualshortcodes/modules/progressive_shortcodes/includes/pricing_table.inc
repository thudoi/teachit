<?php

function progressive_shortcodes_pricing_table_shortcode_info(&$shortcodes)
{
    $shortcodes['pricing_table'] = array(
        'title' => t('Pricing Table'),
        'description' => t('Responsive Pricing Table.'),
        'process callback' => 'progressive_shortcodes_shortcode_pricing_table',
        'process settings callback' => 'progressive_shortcodes_shortcode_pricing_table_settings',
        'child shortcode'=> 'pricing_table_row',
        'icon' => 'fa fa-usd',
        'description_field' => 'title',
    );
}

function progressive_shortcodes_shortcode_pricing_table($attrs, $text) {

    $output = '';
    $rows    = array();
    $actives = array();
    $values = array();
    foreach($attrs as $name => $value) {
        if(strpos($name, 'row_value_') === 0) {
            $rows[] = $value;
        }
        if(strpos($name, 'row_active_') === 0) {
            $actives[] = $value;
        }
    }
    foreach($rows as $id => $row){
        $values[] = array(
            'row' => $row,
            'active' => $actives[$id]
        );
    }
    $currency_label = isset($attrs['currency_label']) ? $attrs['currency_label'] : '';
    $price = isset($attrs['price']) ? $attrs['price'] : '';
    $date = isset($attrs['price_text']) ? $attrs['price_text'] : '';
    $link_text = isset($attrs['read_more']) ? $attrs['read_more'] : '';
    $url = isset($attrs['read_more_link'])  ? $attrs['read_more_link'] : '#';
    $attrs['class'] = 'jv-table-pricing background text-center ';
    $attrs['style'] = isset($attrs['color']) ? 'border-color:#'.$attrs['color'] : '';
    $color_header = isset($attrs['color']) ? 'style="background-color:#'.$attrs['color'].'"' : '';
    $color_text   = (isset($attrs['color']) && $attrs['featured'] == 1 )? 'style="color:#'.$attrs['color'].'"' : '';
    $attrs['class'] .= ($attrs['featured'] == 1) ? 'feature' : '';
    $output.= '<div '._progressive_shortcodes_shortcode_attributes($attrs).' >';
        $output.='<div class="jv-table-head" '.$color_header.'>';
            $output.= isset($attrs['title']) ? '<h3 class="jv-table-title">'.$attrs['title'].'</h3>' : '';
            $output.= isset($attrs['price_icon'])  ? '<div class="jv-table-icon"><i class="'.$attrs['price_icon'].'" '.$color_text.'></i></div>' : '';
            $output.='<div class="jv-table-price-wrap"><sup class="jv-table-price-before">'.$currency_label.'</sup><span class="jv-table-price">'.$price.'</span><sub class="jv-table-price-after">'.$date.'</sub></div>';
        $output.='</div>';
        $output.='<div class="jv-table-content"><ul class="list-checked default">';
            foreach($values as $id => $value){
                $output.='<li class="item">'.$value['row'].'</li>';
            }
        $output.='</ul></div>';
        $output.='<div class="jv-table-bottom"><a href="'.$url.'" title="Get Started" class="btn btn-round btn-outline">'.$link_text.'</a></div>';
    $output.='</div>';
    return $output;

}

function progressive_shortcodes_shortcode_pricing_table_settings($attrs, $text,$form, &$form_state) {
    if(isset($form_state['values'])) {
        $attrs = $form_state['values'];
    }

    $attrs['count_items'] = 0;
    foreach($attrs as $name => $value) {
        if(strpos($name, 'row_value_') === 0) {
            $attrs['count_items']++;
        }
    }
    // Add new item
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new item')) {
            $attrs['count_items']++;
        }
    }
    $attrs['row_value_1'] = isset($attrs['row_value_1']) ? $attrs['row_value_1'] : '';
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-4">',
    );
    $form['color'] = array(
        '#type' => 'textfield',
        '#title' => 'Color Table',
        '#default_value' => isset($attrs['color']) ? $attrs['color'] : '',
        '#attributes'    => array('class' => array('form-control colorpicker-enable')),
        '#prefix'        => '</div><div class="col-sm-4">'
    );
    $form['featured'] = array(
        '#type' => 'checkbox',
        '#title' => t('Feature'),
        '#default_value' => isset($attrs['featured']) ? $attrs['featured'] : false,
        '#prefix' => '</div><div class = "col-sm-4">',
        '#suffix' => '</div></div>',
    );
    $form['description'] = array(
        '#type' => 'textarea',
        '#rows' => 3,
        '#title' => t('Short Description'),
        '#default_value' => isset($attrs['description']) ? $attrs['description'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    $ajax = array(
        'callback' => 'progressive_shortcodes_shortcode_table_ajax_callback',
        'wrapper' => 'nd_visualshortcodes_table_rows',
        'effect' => 'fade',
        'method' => 'replace',
    );
    $form['items'] = array(
        '#type' => 'container',
        '#attributes' => array('id' => array('nd_visualshortcodes_table_rows')),
        '#theme' => 'progressive_shortcodes_shortcode_pricing_settings',
        '#attrs' => $attrs
    );

    foreach($attrs as $name => $value) {
        if(strpos($name,'row_value_') === 0) {
            $i = str_replace('row_value_','', $name);
            $form['items'] += progressive_shortcodes_shortcode_table_row($attrs, $i);
        }
    }

    // Add new row
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new row')) {

            $form['items'] += progressive_shortcodes_shortcode_table_row($attrs, ++$i);
        }
    }
    $form['add_new'] = array(
        '#type' => 'submit',
        '#value' => t('Add new row'),
        '#submit' => array('_shortcodes_pricing_table_ajax_rebuild'),
        '#ajax' => $ajax
    );
    $form['currency_label'] = array(
        '#type' => 'textfield',
        '#title' => t('Currency'),
        '#default_value' => isset($attrs['currency_label']) ? $attrs['currency_label'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-4">'
    );
    $form['price'] = array(
        '#type' => 'textfield',
        '#title' => t('Price'),
        '#default_value' => isset($attrs['price']) ? $attrs['price'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-4">',
    );
    $form['price_text'] = array(
        '#type' => 'textfield',
        '#title' => t('Date'),
        '#default_value' => isset($attrs['price_text']) ? $attrs['price_text'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-4">',
        '#suffix' => '</div></div>',
    );
    $form['price_icon'] = array(
        '#type' => 'textfield',
        '#title' => t('Icon'),
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['price_icon']) ? $attrs['price_icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-12">',
        '#suffix' => '</div></div>',
    );

    $form['read_more'] = array(
        '#type' => 'textfield',
        '#title' => t('Read More text'),
        '#default_value' => isset($attrs['read_more']) ? $attrs['read_more'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['read_more_link'] = array(
        '#type' => 'textfield',
        '#title' => t('Read More link'),
        '#default_value' => isset($attrs['read_more_link']) ? $attrs['read_more_link'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    return $form;
}

function progressive_shortcodes_shortcode_table_ajax_callback($form,&$form_state)
{
    return $form['shortcode']['settings']['items'];
}

function progressive_shortcodes_shortcode_table_row($attrs,$i){
    $form['row_value_'.$i] = array(
        '#type' => 'textfield',
        '#default_value' => isset($attrs['row_value_'.$i]) ? $attrs['row_value_'.$i] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">',
    );
    $form['row_active_'.$i] = array(
        '#type' => 'checkbox',
        '#title' => t('Active'),
        '#default_value' => isset($attrs['row_active_'.$i]) ? $attrs['row_active_'.$i] : '',
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );
    return $form;
}
function _shortcodes_pricing_table_ajax_rebuild($form, &$form_state) {
    $form_state['rebuild'] = TRUE;
}

function theme_progressive_shortcodes_shortcode_pricing_settings($form){
    $output = '';
    $rows = array();
    $output .= render($form['form']['settings']);
    $header = array(t('Row'), t('Active'));

    foreach (element_children($form['form']) as $key) {
        if(strpos($key,'row_value_') === 0) {
            $i = str_replace('row_value_', '', $key);
            $row = array(
                render($form['form']['row_value_' . $i]),
                render($form['form']['row_active_' . $i]),
            );
            $rows[] = $row;
        }
    }
    $output .= theme('table', array('rows' => $rows, 'header' => $header));
    return $output;
}