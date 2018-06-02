<?php

function progressive_shortcodes_gmap_shortcode_info(&$shortcodes)
{
    $shortcodes['gmap'] = array(
        'title' => t('Google Map'),
        'description' => t('Google Map'),
        'process callback' => 'progressive_shortcodes_shortcode_gmap',
        'process settings callback' => 'progressive_shortcodes_shortcode_gmap_settings',
        'tips callback' => 'progressive_shortcodes_shortcode_gmap_tip',
        'icon' => 'fa fa-map-marker'
    );
}

function progressive_shortcodes_shortcode_gmap($attrs, $text) {
    $attrs['class'] = 'map-box' . (isset($attrs['class']) ? ' ' . $attrs['class'] : '');
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs) . '>' .
        (isset($attrs['tooltip']) && $attrs['tooltip'] == 'map_overlay' ? '<div class="contact-info col-sm-6 col-md-6" data-appear-animation="fadeInLeftBig">' . $text . '</div>' : '') .
        '<div style="height: ' . (isset($attrs['height']) ? $attrs['height'] : 276) . 'px;"
      class="map-canvas"
      data-zoom="' . (isset($attrs['zoom']) ? $attrs['zoom'] : 6) . '"
      data-lat="' . (isset($attrs['lat']) ? $attrs['lat'] : 0) . '"
      data-lng="' . (isset($attrs['lng']) ? $attrs['lng'] : 0) . '"
      ' . (isset($attrs['type']) ? 'data-type="' . $attrs['type'] . '"' : '') . '
      ' . (isset($attrs['title']) && $attrs['title'] ? 'data-title="' . $attrs['title'] . '"' : '') . '>' .
        (!isset($attrs['tooltip']) || $attrs['tooltip'] == 'marker_tooltip' ? $text : '') . '
    </div>
  </div>';
    return $text;
}

function progressive_shortcodes_shortcode_gmap_tip($format, $long) {
    $output = array();
    $output[] = '<p><strong>Google Map:</strong><br/>[gmap height = 300 zoom = 5 lat = "40.3456" lng = "-56.8795" title = "New York"]Tooltip text for Marker[/gmap]</br>';
    return implode(' ', $output);
}

function progressive_shortcodes_shortcode_gmap_settings($attrs, $text) {
    $form['title'] = array(
        '#type' => 'textfield',
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-9">',
    );
    $types = array('' => t('Default'), 'terrain' => t('Terrain'), 'satellite' => t('Satellite'));
    $form['type'] = array(
        '#type' => 'select',
        '#title' => t('Type'),
        '#options' => $types,
        '#default_value' => isset($attrs['type']) ? $attrs['type'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
        '#suffix' => '</div></div>'
    );
    $form['lat'] = array(
        '#type' => 'textfield',
        '#title' => t('Latitude'),
        '#default_value' => isset($attrs['lat']) ? $attrs['lat'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-3">',
    );
    $form['lng'] = array(
        '#type' => 'textfield',
        '#title' => t('Longitude'),
        '#default_value' => isset($attrs['lng']) ? $attrs['lng'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
    );
    $form['zoom'] = array(
        '#type' => 'textfield',
        '#title' => t('Zoom'),
        '#default_value' => isset($attrs['zoom']) ? $attrs['zoom'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
    );
    $form['height'] = array(
        '#type' => 'textfield',
        '#title' => t('Height'),
        '#default_value' => isset($attrs['height']) ? $attrs['height'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class = "col-sm-3">',
        '#suffix' => '</div></div>',
    );
    $types = array('marker_tooltip' => t('Marker Toolip'), 'map_overlay' => t('Map Overlay Box'));
    $form['tooltip'] = array(
        '#type' => 'select',
        '#title' => t('Append inner content to:'),
        '#options' => $types,
        '#default_value' => isset($attrs['tooltip']) ? $attrs['tooltip'] : 'marker_tooltip',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class = "row"><div class = "col-sm-6">',
        '#suffix' => '</div></div>'
    );
    return $form;
}