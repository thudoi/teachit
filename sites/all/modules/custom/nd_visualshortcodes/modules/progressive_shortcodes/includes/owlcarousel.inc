<?php

function progressive_shortcodes_owlcarousels_shortcode_info(&$shortcodes)
{
    $shortcodes['owlcarousels'] = array(
        'title' => t('Owlcarousel'),
        'description' => t('Carousels Slider'),
        'process callback' => 'progressive_shortcodes_shortcode_owlcarousels',
        'tips callback' => 'progressisve_shortcodes_carousel_tips',
        'icon' => 'fa fa-arrows-h',
        'child shortcode' => 'carousel_item',
        'description_field' => 'type',
    );
}


function progressive_shortcodes_carousel_item_shortcode_info(&$shortcodes)
{
    $shortcodes['carousel_item'] = array(
        'title' => t('Owlcarousel-item'),
        'description' => t('Owlcarousel item'),
        'process callback' => 'progressive_shortcodes_shortcode_carousel_item',
        'process settings callback' => 'progressive_shortcodes_shortcode_carousel_item_settings',
        'icon' => 'fa fa-long-arrow-right',
    );
}


function progressive_shortcodes_shortcode_carousel_item($attrs,$text)
{

    $attrs['class'] = 'col-sm-12 col-md-12' . (isset($attrs['class']) ? $attrs['class'] : '');;
    return '<div class="jvCarouselItem"><div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>' . $text . '</div></div>';
}

function progressive_shortcodes_shortcode_owlcarousels_settings($attrs,$text)
{
    $form['wrapper_item'] = array(
        '#type' => 'container',
        '#prefix' => '<div class = "row col-settings">',
        '#suffix' => '</div>'
    );
    $form['wrapper_item']['items'] = array(
        '#type' => 'textfield',
        '#title' => t('Number Item'),
        '#description' => t('This variable allows you to set the maximum amount of items displayed at a time with the widest browser width'),
        '#default_value' => isset($attrs['items']) ? $attrs['items'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="col-xs-6">',
        '#suffix' => '</div>'
    );
    $form['container'] = array(
        '#type' => 'container',
        '#prefix' => '<div class = "row col-settings device-icons-wrap">',
        '#suffix' => '</div>'
    );
    $options = array(1 => 1, 2 => 2, 3 => 3, 4 => 4, 5 => 5, 6 => 6, 7 => 7, 8 => 8, 9 => 9, 10 => 10, 11 => 11, 12 => 12);
    $form['container']['itemsmobile'] = array(
        '#type' => 'select',
        '#options' => $options,
        '#description' => t('This allows you to preset the number of slides visible with a particular browser width.'),
        '#default_value' => isset($attrs['itemsmobile']) ? $attrs['itemsmobile'] : 0,
        '#prefix' => '<div class = "col-xs-3 centered"><label class="sr-only" for="col-xs"><i class="fa fa-mobile fa-5x"></i></label>',
        '#suffix' => '</div>',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['container']['itemstablet'] = array(
        '#type' => 'select',
        '#options' => $options,
        '#description' => t('This allows you to preset the number of slides visible with a particular browser width.'),
        '#default_value' => isset($attrs['itemstablet']) ? $attrs['itemstablet'] : 0,
        '#prefix' => '<div class = "col-xs-3 centered"><label class="sr-only" for="col-xs"><i class="fa fa-tablet fa-5x"></i></label>',
        '#suffix' => '</div>',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['container']['itemsdesktopsmall'] = array(
        '#type' => 'select',
        '#options' => $options,
        '#description' => t('This allows you to preset the number of slides visible with a particular browser width.'),
        '#default_value' => isset($attrs['itemsdesktopsmall']) ? $attrs['itemsdesktopsmall'] : 0,
        '#prefix' => '<div class = "col-xs-3 centered"><label class="sr-only" for="col-xs"><i class="fa fa-laptop fa-5x"></i></label>',
        '#suffix' => '</div>',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['container']['itemsdesktop'] = array(
        '#type' => 'select',
        '#options' => $options,
        '#description' => t('This allows you to preset the number of slides visible with a particular browser width.'),
        '#default_value' => isset($attrs['itemsdesktop']) ? $attrs['itemsdesktop'] : 0,
        '#prefix' => '<div class = "col-xs-3 centered"><label class="sr-only" for="col-xs"><i class="fa fa-desktop fa-5x"></i></label>',
        '#suffix' => '</div>',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['settings'] = array(
        '#type' => 'fieldset',
        '#title' => t('Settings'),
        '#collapsible' => TRUE,
        '#collapsed' => FALSE,
    );
    $form['settings']['row_one'] = array(
        '#type' => 'container',
        '#prefix' => '<div class="row">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_one']['singleitem'] = array(
        '#type' => 'checkbox',
        '#title' => t('Single item'),
        '#description' => t('Display only one item.'),
        '#default_value' => isset($attrs['singleitem']) ? $attrs['singleitem'] : 0,
        '#attributes' => array('class' => array('owl_singleitem')),
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_one']['autoplay_owl'] = array(
        '#type' => 'checkbox',
        '#title' => t('AutoPlay'),
        '#description' => t('AutoPlay Slide'),
        '#default_value' => isset($attrs['autoplay_owl']) ? $attrs['autoplay_owl'] : 0,
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_one']['stoponhover'] = array(
        '#type' => 'checkbox',
        '#title' => t('Stop On Hover'),
        '#description' => t('When hover slide to stop'),
        '#default_value' => isset($attrs['stoponhover']) ? $attrs['stoponhover'] : 0,
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_two'] = array(
        '#type' => 'container',
        '#prefix' => '<div class="row">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_one']['navigation'] = array(
        '#type' => 'checkbox',
        '#title' => t('Navigation'),
        '#description' => t('Show navigation slide'),
        '#default_value' => isset($attrs['navigation']) ? $attrs['navigation'] : 0,
        '#attributes' => array(
            'class' => array('navigation_owl')
        ),
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_one']['pagination_owl'] = array(
        '#type' => 'checkbox',
        '#title' => t('Pagination'),
        '#description' => t('Show Pagination slide'),
        '#default_value' => isset($attrs['pagination_owl']) ? $attrs['pagination_owl'] : 0,
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>'
    );
    $form['settings']['row_two']['prev_navigation'] = array(
      '#type' => 'textfield',
      '#title' => t('Prev Navigation'),
      '#description' => t('You can cusomize your own text for navigation. Also HTML can be used here'),
      '#default_value' => isset($attrs['prev_navigation']) ? $attrs['prev_navigation'] : '',
      '#prefix'   => '<div class="col-xs-6">',
      '#suffix'   => '</div>',
      '#states' => array(
        'visible' => array(
          '.navigation_owl' => array('checked' => TRUE),
        ),
      ),

    );
    $form['settings']['row_two']['next_navigation'] = array(
        '#type' => 'textfield',
        '#title' => t('Next Navigation'),
        '#description' => t('You can cusomize your own text for navigation. Also HTML can be used here'),
        '#default_value' => isset($attrs['next_navigation']) ? $attrs['next_navigation'] : '',
        '#prefix'   => '<div class="col-xs-6">',
        '#suffix'   => '</div>',
        '#states' => array(
          'visible' => array(
            '.navigation_owl' => array('checked' => TRUE),
          ),
        ),
    );
    $form['settings']['row_two']['slidespeed'] = array(
        '#type' => 'textfield',
        '#title' => 'Slide Speed',
        '#description' => t('Slide speed in milliseconds.'),
        '#default_value' => isset($attrs['slidespeed']) ? $attrs['slidespeed'] : 200,
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>',
        '#attributes' => array('class' => array('form-control'))
    );
    $form['settings']['row_two']['transition_style'] =  array(
        '#type' => 'select',
        '#title' => t('transitionStyle'),
        '#description' => t('Select transition style'),
        '#options' => array('null' => '--Null--','fade'=>'Fade','backSlide'=>'backSlide','goDown'=>'goDown','scaleUp'=>'scaleUp'),
        '#default_value' => isset($attrs['transition_style']) ? $attrs['transition_style'] : '',
        '#prefix' => '<div class="col-xs-4">',
        '#suffix' => '</div>',
        '#attributes' => array('class' => array('form-control')),
        '#states' => array(
            'visible' => array(
              '.owl_singleitem' => array('checked' => TRUE),
            ),
        )
    );
    return $form;
}

function progressive_shortcodes_shortcode_owlcarousels($attr,$text)
{

    $id = drupal_html_id('jvCarousel');
    $option_carousel = '';
    $attr['class'] = 'jvCarousel' . (isset($attr['class']) ? ' ' . $attr['class'] : '');
    $option_carousel .= ' data-items="' . $attr['items'] . '" ';
    $option_carousel .= ( isset($attr['transition_style']) && $attr['transition_style'] != 'null' ? ' data-transitionstyle="'. $attr['transition_style'] .'" ' : '');
    $option_carousel .= ' data-itemsdesktop="' . $attr['itemsdesktop'] . '" ';
    $option_carousel .= ' data-itemsdesktopsmall="' . $attr['itemsdesktopsmall'] . '" ';
    $option_carousel .= ' data-itemstablet="' . $attr['itemstablet'] . '" ';
    $option_carousel .= ' data-itemsmobile="' . $attr['itemsmobile'] . '" ';
    $option_carousel .= ($attr['singleitem'] == 1  ? ' data-singleitem="true" ' : ' data-singleitem="false" ');
    $option_carousel .= ' data-slideSpeed="'.$attr['slidespeed'].'" ';
    $option_carousel .= ($attr['autoplay_owl'] == 1 ? ' data-auto-play="true" ' : ' data-auto-play="false" ');
    $option_carousel .= ($attr['stoponhover'] == 1 ? ' data-stopOnHover="true" ' : ' data-stopOnHover="false" ');
    $option_carousel .= ($attr['pagination_owl'] == 1 ? ' data-pagination="true" ' : ' data-pagination="false" ');
    $option_carousel .= ($attr['navigation'] == 1 ? ' data-navigation="true" ' : ' data-navigation="false" ');
    $option_carousel .= (isset($attr['prev_navigation']) ? ' data-prevText="'. base64_encode($attr['prev_navigation']) .'" ': '');
    $option_carousel .= (isset($attr['next_navigation']) ? ' data-nextText="'. base64_encode($attr['next_navigation']) .'" ': '');
    $option_carousel .= ' data-autoHeight="false" data-mouseDrag="true" data-touchDrag="true" ';
    $output ='<div'._progressive_shortcodes_shortcode_attributes($attr).' id="'.$id.'" '.$option_carousel.'>'.$text.'</div>';
    return $output;
    
}
