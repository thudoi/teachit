<?php

function progressive_shortcodes_accordions_item_shortcode_info(&$shortcodes)
{
    $shortcodes['accordion'] = array(
        'title' => t('Accordion item'),
        'description' => t('Accordion item.'),
        'process callback' => 'progressive_shortcodes_shortcode_accordion',
        'process settings callback' => 'progressive_shortcodes_shortcode_accordion_settings',
        'icon' => 'fa fa-minus',
        'description_field' => 'title',
    );
}

function progressive_shortcodes_shortcode_accordion($attrs, $text) {
    global $accordion_count, $accordion_id, $accordion_filter;
    $style_heading = '';
    
    if (empty($accordion_id)) {
        $accordion_id = 1;
    }
    if(!isset($accordion_filter)) {
        $accordion_filter = array();
    }
    $accordion_count++;
    $icon = isset($attrs['icon']) ? '<i class="'.$attrs['icon'].'"></i>' : '';
    $attrs['class'] = (isset($attrs['class']) ? $attrs['class'] . ' ': '') . 'panel ';

    if(isset($attrs['accordions_bg']) && $attrs['accordions_bg'] == 1){
        $attrs['class'] .=  ' accordion-background ';
        if(isset($attrs['color']) && !empty($attrs['color'])){
            $style_heading = 'style="background-color:#'.$attrs['color'].'""';
        }
    }
    $attrs['class'] .= isset($attrs['active']) && $attrs['active'] ? ' active' : '';
    if(isset($attrs['filter_category'])) {
        $filter_category = isset($attrs['filter_category']) ? strtolower(preg_replace('/[^\w]/', '-', $attrs['filter_category'])) : '';
        $attrs['class'] .= ' ' . $filter_category;
        $accordion_filter[$filter_category] = $attrs['filter_category'];
    }
    $collapsed = (!isset($attrs['active']) || $attrs['active'] == 0) ? 'collapsed' : '';
    $text = '<div ' . _progressive_shortcodes_shortcode_attributes($attrs)  . '>
    <div class="panel-heading" '.$style_heading.'>
         <a class="panel-title '.$collapsed.'" data-toggle="collapse" data-parent="#accordion' . $accordion_id . '" href="#accordion-' .  $accordion_count . '" >
          <h5>'.$icon. $attrs['title'] . '</h5>
        </a>
    </div>
    <div id="accordion-' . $accordion_count . '" class="panel-collapse collapse' . (isset($attrs['active']) && $attrs['active'] ? ' in' : '') . '">
      <div class="panel-body">
        ' . $text . '
      </div>
    </div>
  </div>';
    return $text;
}

function progressive_shortcodes_shortcode_accordion_settings($attrs, $text) {
    $form['title'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Title'),
        '#default_value' => isset($attrs['title']) ? $attrs['title'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-md-6">',
    );
    $form['active'] = array(
        '#title' => t('Active'),
        '#type' => 'checkbox',
        '#default_value' => isset($attrs['active']) ? $attrs['active'] : '',
        '#prefix' => '</div><div class="col-md-6">',
        '#suffix' => '</div></div>'
    );
    $form['accordions_bg'] = array(
        '#title' => 'Background Accordion',
        '#type'  => 'checkbox',
        '#attributes' => array('class'=>array('accordions_bg')),
        '#default_value' => isset($attrs['accordions_bg']) ? $attrs['accordions_bg'] : '',
        '#prefix' => '<div class="row"><div class="col-sm-6">'
    );
    $form['color'] = array(
        '#type' => 'textfield',
        '#title' => t('Color'),
        '#description' => t('Default color defined in CSS theme'),
        '#default_value' => isset($attrs['color']) ? $attrs['color'] : '',
        '#attributes' => array('class' => array('form-control colorpicker-enable')),
        '#states' => array(
            'visible' => array(
                '.accordions_bg' => array('checked' => true)
            )
        ),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>',
    );
    $form['icon'] = array(
        '#type'  => 'textfield',
        '#title' => t('Icon'),
        '#default_value' => isset($attrs['icon']) ? $attrs['icon'] : '',
        '#autocomplete_path' => 'admin/ajax/nd_visualshortcodes/icons_autocomplete/all',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '<div class="row"><div class="col-sm-6">'
    );
    $form['filter_category'] = array(
        '#type' => 'textfield' ,
        '#title' => t('Filter Category'),
        '#default_value' => isset($attrs['filter_category']) ? $attrs['filter_category'] : '',
        '#attributes' => array('class' => array('form-control')),
        '#prefix' => '</div><div class="col-sm-6">',
        '#suffix' => '</div></div>'
    );

    return $form;
}