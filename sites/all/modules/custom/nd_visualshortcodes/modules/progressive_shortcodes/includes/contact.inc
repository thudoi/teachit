<?php

function progressive_shortcodes_contact_shotcode_info(&$shortcodes)
{
    $shortcodes['contact'] = array(
        'title' => t('Contact Form'),
        'description' => t('Contact Form'),
        'process callback' => 'progressive_shortcodes_shortcode_contact',
        'tips callback' => 'progressive_shortcodes_shortcode_contact_tip',
        'process settings callback' => 'progressive_shortcodes_shortcode_contact_settings',
        'icon' => 'fa fa-envelope-o'
    );
}

function progressive_shortcodes_shortcode_contact($attrs, $text) {
    $text = '';
    if (user_access('access site-wide contact form') && module_exists('contact')) {
        if (!flood_is_allowed('contact', variable_get('contact_hourly_threshold', 3))) {
            $text = t("You cannot send more than %number messages per hour. Please try again later.", array('%number' => variable_get('contact_hourly_threshold', 3)));
        }
        else {
            module_load_include('inc', 'contact', 'contact.pages');
            $content = drupal_get_form('contact_site_form');
            // Allow users to alter contact form fields
            $alter_fields = array('name', 'mail', 'subject', 'message');
            foreach($alter_fields as $field) {
                if(isset($attrs[$field])) {
                    $content[$field]['#title'] = t($attrs[$field]);
                    $content[$field]['#attributes']['placeholder'] = t($attrs[$field]);
                }
            }
            $title = isset($attrs['title']) ? '<h3 class="title">' . $attrs['title'] . '</h3>' : '';
            $content['name']['#prefix'] = $title;
            $text = '<div class = "login-register"><div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>' . drupal_render($content) . '</div></div>';
        }
    }
    return $text;
}

function progressive_shortcodes_shortcode_contact_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Contact Form:</strong><br/>[contact name = "Name field Title"][/contact]</br>';
    $output[] = 'Override default title for fields: <strong>name</strong>, <strong>subject</strong>, <strong>mail</strong>, <strong>message</strong></p>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_contact_settings($attrs, $text) {
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Main Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
    );
    $form['name'] = array(
        '#type' => 'textfield',
        '#title' => t('Name'),
        '#default_value' => isset($attrs['name']) ? $attrs['name'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => t('Override fields titles:') . '<div class = "row"><div class = "col-sm-6">',
    );
    $form['mail'] = array(
        '#type' => 'textfield',
        '#title' => t('Email'),
        '#default_value' => isset($attrs['mail']) ? $attrs['mail'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>'
    );
    $form['subject'] = array(
        '#type' => 'textfield',
        '#title' => t('Subject'),
        '#default_value' => isset($attrs['subject']) ? $attrs['subject'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
    );
    $form['message'] = array(
        '#type' => 'textfield',
        '#title' => t('Message'),
        '#default_value' => isset($attrs['message']) ? $attrs['message'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-6">',
        '#suffix' => '</div></div>'
    );

    return $form;
}