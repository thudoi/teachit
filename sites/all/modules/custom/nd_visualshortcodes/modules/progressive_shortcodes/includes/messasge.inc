<?php

function progressive_shortcodes_messasge_shortcode_info(&$shortcodes)
{
    $shortcodes['message'] = array(
        'title' => t('Notification'),
        'description' => t('Dismissable Message.'),
        'process callback' => 'progressive_shortcodes_shortcode_message',
        'process settings callback' => 'progressive_shortcodes_shortcode_message_settings',
        'icon' => 'fa fa-info-circle',
        'description_field' => 'icon',
        'child shortcode' => 'html',
    );
}

function progressive_shortcodes_shortcode_message($attrs, $text) {
    $output = '';
    //krumo($attrs);
    $attrs['class'] = 'message ';
    if($attrs['size'] == 'large'){
        $attrs['class'].= ' messagefull ';
    }
    $attrs['class'].= $attrs['type'];
    $icon = '<i class="'.$attrs['icon'].'"></i>';

    $output .= '<div '._progressive_shortcodes_shortcode_attributes($attrs).'>';
        switch ($attrs['size']){
            case 'small':
                $output .= $icon.'&nbsp;';
                $output .= t('!type Message !',array('!type' => ucfirst($attrs['type'])));
                if(isset($text) && !empty($text)){
                    $output .= $text;
                    $output .= '<a href="javascript:void(0)" class="cancel icon-cancel"></a>';
                }
                break;
            case 'large';
                $output .= $text;
                $output .='<div class="content">';
                     $output .= '<h5>'.t('!type Message !',array('!type' => ucfirst($attrs['type']))).'</h5>';
                     $output .= '<a href="javascript:void(0)" class="cancel icon-cancel"></a>';
                     $output .= $text;
                $output .= '</div>';
                break;
        }
    $output .= '</div>';
    return $output;
}
function progressive_shortcodes_shortcode_message_settings($attrs, $text) {
    $form['type'] = array(
        '#title' => t('Type'),
        '#type' => 'select',
        '#options' => array('notice' => t('Notice'),'error'=>t('Error'),'warning'=>t('Warning'),'success'=>t('Success'),'info'=>t('Info')),
        '#default_value' => isset($attrs['color_type']) ? $attrs['color_type'] : FALSE,
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-4">',
    );
    $form['size'] = array(
        '#title' => t('Style'),
        '#type'  => 'select',
        '#options' =>  drupal_map_assoc(array('small','large')),
        '#attributes' => array('class' => array('form-control')),
        '#default_value' => isset($attrs['size']) ? $attrs['size'] : 'small',
        '#prefix'   => '</div><div class="col-sm-4">',
    );
    $form['icon'] = array(
        '#title' => t('Icon'),
        '#type' => 'textfield',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#default_value' => isset($attrs['icon']) ? $attrs['icon'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix'   => '</div><div class="col-sm-4">',
        '#suffix'   => '</div></div>'
    );


    return $form;
}