<?php

function progressive_shortcodes_textrotation_shortcode_info(&$shortcodes)
{
    $shortcodes['textrotation'] = array(
        'title' => t('Text Rotation'),
        'description' => t('FontAwesome or LivIcon'),
        'process callback' => 'progressive_shortcodes_shortcode_textrotation',
        'process backend callback' => 'nd_visualshortcodes_backend_nochilds',
        'process settings callback' => 'progressive_shortcodes_shortcode_textrotation_settings',
        'icon' => 'fa fa-rotate-right',
        'description_field' => 'title',
    );
}
function progressive_shortcodes_shortcode_textrotation($attrs, $text) {
    $attrs['class'] = 'word-rotate loaded' . (isset($attrs['class']) ? ' ' . $attrs['class'] : '');
    $words = '';
    foreach($attrs as $name => $value) {
        if(strpos($name, 'word_') === 0) {
            $words .= '<span>' . $value . '</span>';
        }
    }
    $attrs['tag'] = isset($attrs['tag']) ? $attrs['tag'] : 'div';
    $attrs['prefix'] = isset($attrs['prefix']) ? $attrs['prefix'] : '';
    $attrs['suffix'] = isset($attrs['title']) ? $attrs['title'] : '';
    return '<'. $attrs['tag'] .'>'.
    $attrs['prefix'] . '
    <span ' . _progressive_shortcodes_shortcode_attributes($attrs) . ' >
      <span class = "words-box">' . $words . '</span>
    </span>' .
    $attrs['suffix'] . '
  </'. $attrs['tag'] .'>';
}

function progressive_shortcodes_shortcode_textrotation_settings($attrs, $text, $form, &$form_state)  {
    $form['prefix'] = array(
        '#type' => 'textfield',
        '#title' => t('Prefix text'),
        '#default_value' => isset($attrs['prefix']) ? $attrs['prefix'] : '',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Suffix text'),
        '#default_value' => $text ? $text : (isset($attrs['title']) ? $attrs['title'] : ''),
        '#attributes' => array('class' => array('form-control'))
    );
    $types = array('div' => 'Div', 'p' => 'P', 'strong' => t('Strong'), 'span' => 'Span', 'h1' => 'H1', 'h2' => 'H2', 'h3' => 'H3', 'h4' => 'H4', 'h5' => 'H5', 'h6' => 'H6');
    $form['tag'] = array(
        '#type' => 'select',
        '#title' => t('Tag Type'),
        '#options' => $types,
        '#default_value' => isset($attrs['tag']) ? $attrs['tag'] : 'div',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['words'] = array(
        '#type' => 'container',
        '#attributes' => array('id' => array('nd_visualshortcodes_textrotation_words'))
    );
    // If AJAX was submited
    if (isset($form_state['values']['add_new'])) {
        $attrs = $form_state['values'];
        foreach($form_state['values'] as $name => $value) {
            if(strpos($name, 'word_') === 0) {
                $i = str_replace('word_', '', $name);
                $form['words']['word_' . $i] = progressive_shortcodes_shortcode_textrotation_item($attrs, $i);
            }
        }
        // Add new row
        $form['words']['word_' . ++$i] = progressive_shortcodes_shortcode_textrotation_item($attrs, $i);
    }
    // Default attrs
    else {
        $attrs['word_1'] = isset($attrs['word_1']) ? $attrs['word_1'] : '';
        foreach($attrs as $name => $value) {
            if(strpos($name, 'word_') === 0) {
                $i = str_replace('word_', '', $name);
                $form['words']['word_' . $i] = progressive_shortcodes_shortcode_textrotation_item($attrs, $i);
            }
        }
    }
    $form['add_new'] = array(
        '#type' => 'submit',
        '#value' => t('Add new item'),
        '#submit' => array('progressive_shortcodes_shortcode_ajax_rebuild'),
        '#ajax' => array(
            'callback' => 'progressive_shortcodes_shortcode_textrotation_ajax_callback',
            'wrapper' => 'nd_visualshortcodes_textrotation_words',
            'effect' => 'fade',
            'method' => 'replace',
        )
    );
    return $form;
}

function progressive_shortcodes_shortcode_textrotation_item($attrs, $i) {
    return array(
        '#title' => t('Phrase ' . $i),
        '#type' => 'textfield',
        '#default_value' => isset($attrs['word_' . $i]) ? $attrs['word_' . $i] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
        '#suffix' => '</div></div>',
    );
}

function progressive_shortcodes_shortcode_ajax_rebuild($form, &$form_state) {
    $form_state['rebuild'] = TRUE;
}

function progressive_shortcodes_shortcode_textrotation_ajax_callback($form, $form_state) {
    return $form['shortcode']['settings']['words'];
}