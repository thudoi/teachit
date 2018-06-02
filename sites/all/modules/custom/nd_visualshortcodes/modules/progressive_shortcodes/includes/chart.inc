<?php

function progressive_shortcodes_chart_shortcode_info(&$shortcodes)
{
    $shortcodes['chart'] = array(
        'title' => t('Chart'),
        'description' => t('Chart'),
        'process callback' => 'progressive_shortcodes_shortcode_chart',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_chart_settings',
        'icon' => 'fa fa-bar-chart-o',
        'description_field' => 'type',
    );
}

function progressive_shortcodes_shortcode_chart($attrs, $text) {
    $output = '';

    switch($attrs['type']) {
        case t('Simple Line'):
            $values = array();
            foreach($attrs as $name => $value) {
                if(strpos($name, 'chart_value_') === 0) {
                    $values[] = $value;
                }
            }
            $attrs['class'] = 'chart';
            $attrs['data-line'] = implode(', ', $values);
            $attrs['data-line-color'] = '#6bdcff';
            $attrs['data-spot-color'] = '#00c1fd';
            $attrs['data-min-spot-color'] = '#ff9d00';
            $attrs['data-max-spot-color'] = '#3e8e00';
            $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>'. t('Loading...'). '</div>';
            break;
        case t('Simple Bar'):
            $values = array();
            foreach($attrs as $name => $value) {
                if(strpos($name, 'chart_value_') === 0) {
                    $values[] = $value;
                }
            }
            $attrs['class'] = 'chart';
            $attrs['data-line'] = implode(', ', $values);
            $attrs['data-type'] = 'bar';
            $attrs['data-bar-color'] = 'rgba(255,115,0,.8)';
            $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>'. t('Loading...'). '</div>';
            break;
        case t('Bar with Titles'):
            static $bar_id = 0;
            $id = 'bar-title-' . (++$bar_id);
            $values = array();
            foreach($attrs as $name => $value) {
                if(strpos($name, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $name);
                    $values[] = (object)array(
                        'item' => $attrs['chart_item_title_' . $i],
                        'value' => (int)$value
                    );
                }
            }
            $attrs['class'] = 'graph-resize bar-with-title';
            $attrs['data-values'] = drupal_json_encode($values);
            $attrs['data-label'] = $attrs['chart_title_value'];
            $attrs['id'] = $id;
            $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '></div>';
            break;
        case t('Donut'):
            static $donut_id = 0;
            $id = 'donut-graph-' . (++$donut_id);
            $values = array();
            $colors = array();
            foreach($attrs as $name => $value) {
                if(strpos($name, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $name);
                    $values[] = (object)array(
                        'label' => $attrs['chart_item_title_' . $i],
                        'value' => (int)$value
                    );
                    $colors[] = '#' . trim(isset($attrs['chart_item_color_'. $i]) && $attrs['chart_item_color_'. $i] ? $attrs['chart_item_color_'. $i] : '000000', '#');
                    $titles[] = $attrs['chart_item_title_'. $i];
                }
            }
            $attrs['id'] = $id;
            $attrs['class'] = 'graph-resize donut-graph';
            $attrs['style'] = 'height: 245px;';
            $attrs['data-type'] = 'pie';
            $attrs['data-values'] = drupal_json_encode($values);
            $attrs['data-colors'] = drupal_json_encode($colors);
            $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>'. t('Loading...'). '</div>';
            break;
            break;
        case t('Pie'):
            $values = array();
            $colors = array();
            foreach($attrs as $name => $value) {
                if(strpos($name, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $name);
                    $values[] = $value;
                    $colors[] = '#' . trim(isset($attrs['chart_item_color_'. $i]) && $attrs['chart_item_color_'. $i] ? $attrs['chart_item_color_'. $i] : 'ff9d00', '#');
                }
            }
            $attrs['class'] = 'chart';
            $attrs['data-line'] = implode(', ', $values);
            $attrs['data-type'] = 'pie';
            $attrs['data-slice-colors'] = implode(', ', $colors);
            $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>'. t('Loading...'). '</div>';
            break;
        case t('Tristate'):
            $values = array();
            foreach($attrs as $name => $value) {
                if(strpos($name, 'chart_value_') === 0) {
                    $values[] = $value;
                }
            }
            $attrs['class'] = 'chart';
            $attrs['data-line'] = implode(', ', $values);
            $attrs['data-type'] = 'tristate';
            $attrs['data-pos-bar-color'] = '#3e8e00';
            $output = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>'. t('Loading...'). '</div>';
            break;
    }

    return $output;
}

function progressive_shortcodes_shortcode_chart_settings($attrs, $text, $form, &$form_state)  {
    if(isset($form_state['values'])) {
        $attrs = $form_state['values'];
    }

    $attrs['count_items'] = 0;
    foreach($attrs as $name => $value) {
        if(strpos($name, 'chart_title_value_') === 0) {
            $attrs['count_items']++;
        }
    }
    // Add new item
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new item')) {
            $attrs['count_items']++;
        }
    }
    $attrs['chart_value_1'] = isset($attrs['chart_value_1']) ? $attrs['chart_value_1'] : '';

    $ajax = array(
        'callback' => 'progressive_shortcodes_shortcode_chart_ajax_callback',
        'wrapper' => 'nd_visualshortcodes_chart_items',
        'effect' => 'fade',
        'method' => 'replace',
    );
    $types = array(t('Simple Line'), t('Simple Bar'), t('Bar with Titles'), t('Donut'), t('Pie'), t('Tristate'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Type'),
        '#options' => array_combine($types, $types),
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : t('Simple Line'),
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
        '#ajax' => $ajax
    );
    $form['items'] = array(
        '#type' => 'container',
        '#attributes' => array('id' => array('nd_visualshortcodes_chart_items')),
        '#theme' => 'progressive_shortcodes_shortcode_chart_settings',
        '#attrs' => $attrs
    );

    foreach($attrs as $name => $value) {
        if(strpos($name, 'chart_value_') === 0) {
            $i = str_replace('chart_value_', '', $name);
            $form['items'] += progressive_shortcodes_shortcode_chart_item($attrs, $i);
        }
    }

    // Add new row
    if(isset($form_state['values'])) {
        if (isset($form_state['values']['op']) && $form_state['values']['op'] == t('Add new row')) {
            $form['items'] += progressive_shortcodes_shortcode_chart_item($attrs, ++$i);
        }
    }

    if(isset($attrs['type']) && $attrs['type'] == t('Bar with Titles')) {
        $form['items']['chart_title_value'] = array(
            '#type' => 'textfield',
            '#default_value' => isset($attrs['chart_title_value']) ? $attrs['chart_title_value'] : '',
            '#attributes' => array('class' => array('form-control'), 'placeholder' => t('Value Title'))
        );
    }
    if(isset($attrs['type']) && $attrs['type'] == t('Multiple Lines')) {
        for($i = 1; $i <= $attrs['count_items']; $i++) {
            $form['items']['chart_title_value_' . $i] = array(
                '#type' => 'textfield',
                '#default_value' => isset($attrs['chart_title_value_' . $i]) ? $attrs['chart_title_value_' . $i] : '',
                '#attributes' => array('class' => array('form-control'), 'placeholder' => t('Value ' . $i . ' Title'))
            );
        }
        $form['add_new_item'] = array(
            '#type' => 'submit',
            '#value' => t('Add new item'),
            '#submit' => array('progressive_shortcodes_shortcode_ajax_rebuild'),
            '#ajax' => $ajax
        );
    }
    $form['add_new'] = array(
        '#type' => 'submit',
        '#value' => t('Add new row'),
        '#submit' => array('progressive_shortcodes_shortcode_ajax_rebuild'),
        '#ajax' => $ajax
    );
    return $form;
}

function progressive_shortcodes_shortcode_chart_item($attrs, $i) {
    $form['chart_value_' . $i] = array(
        '#type' => 'textfield',
        '#default_value' => isset($attrs['chart_value_' . $i]) ? $attrs['chart_value_' . $i] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    if(isset($attrs['type'])) {
        switch ($attrs['type']) {
            case t('Donut'):
                $form['chart_item_color_' . $i] = array(
                    '#type' => 'textfield',
                    '#default_value' => isset($attrs['chart_item_color_' . $i]) ? $attrs['chart_item_color_' . $i] : '',
                    '#attributes' => array('class' => array('form-control colorpicker-enable')),
                );
            // No break, go to next code
            case t('Bar with Titles'):
                $form['chart_item_title_' . $i] = array(
                    '#type' => 'textfield',
                    '#default_value' => isset($attrs['chart_item_title_' . $i]) ? $attrs['chart_item_title_' . $i] : '',
                    '#attributes' => array('class' => array('form-control'))
                );
                break;
            case t('Pie'):
                $form['chart_item_color_' . $i] = array(
                    '#type' => 'textfield',
                    '#default_value' => isset($attrs['chart_item_color_' . $i]) ? $attrs['chart_item_color_' . $i] : '',
                    '#attributes' => array('class' => array('form-control colorpicker-enable')),
                );
                break;
            case t('Multiple Lines'):
                $form['chart_timeline_' . $i] = array(
                    '#type' => 'textfield',
                    '#default_value' => isset($attrs['chart_timeline_' . $i]) ? $attrs['chart_timeline_' . $i] : '',
                    '#attributes' => array('class' => array('form-control'))
                );

                for ($j = 1; $j <= $attrs['count_items']; $j++) {
                    $form['chart_timeline_' . $j] = array(
                        '#type' => 'textfield',
                        '#default_value' => isset($attrs['chart_item_title_' . $j]) ? $attrs['chart_item_title_' . $j] : '',
                        '#attributes' => array('class' => array('form-control'))
                    );
                }
                break;
        }
    }
    return $form;
}

function progressive_shortcodes_shortcode_chart_ajax_callback($form, $form_state) {
    return $form['shortcode']['settings']['items'];
}

function theme_progressive_shortcodes_shortcode_chart_settings($form) {

    $type = isset($form['form']['#attrs']['type']) ? $form['form']['#attrs']['type'] : '' ;

    $output = '';
    $rows = array();

    switch($type) {
        case t('Bar with Titles'):
            $output .= render($form['form']['settings']);
            $header = array(t('Item Title'), t('Item Value') . render($form['form']['chart_title_value']));
            foreach (element_children($form['form']) as $key) {
                if(strpos($key, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $key);
                    $row = array(
                        render($form['form']['chart_item_title_' . $i]),
                        render($form['form'][$key]),
                    );
                    $rows[] = $row;
                }
            }
            break;
        case t('Donut'):
            $output .= render($form['form']['settings']);
            $header = array(t('Title'), t('Color'), t('Value %'),);
            foreach (element_children($form['form']) as $key) {
                if(strpos($key, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $key);
                    $row = array(
                        render($form['form']['chart_item_title_' . $i]),
                        render($form['form']['chart_item_color_' . $i]),
                        render($form['form'][$key]),
                    );
                    $rows[] = $row;
                }
            }
            break;
        case t('Pie'):
            $output .= render($form['form']['settings']);
            $header = array(t('Color'), t('Value'));
            foreach (element_children($form['form']) as $key) {
                if(strpos($key, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $key);
                    $row = array(
                        render($form['form']['chart_item_color_' . $i]),
                        render($form['form'][$key]),
                    );
                    $rows[] = $row;
                }
            }
            break;
        case t('Multiple Lines'):
            $output .= render($form['form']['settings']);
            $header = array(t('TimeLine'), t('Item Value') . render($form['form']['chart_title_value']));
            foreach (element_children($form['form']) as $key) {
                if(strpos($key, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $key);
                    $row = array(
                        render($form['form']['chart_item_title_' . $i]),
                        render($form['form'][$key]),
                    );
                    $rows[] = $row;
                }
            }
            break;
        default:
            $header = array(t('Values'));
            foreach (element_children($form['form']) as $key) {
                if(strpos($key, 'chart_value_') === 0) {
                    $i = str_replace('chart_value_', '', $key);
                    $element = &$form['form'][$key];
                    $row = array(render($element));
                    $rows[] = $row;
                }
            }
            break;
    }

    $output .= theme('table', array('rows' => $rows, 'header' => $header));

    return $output;
}