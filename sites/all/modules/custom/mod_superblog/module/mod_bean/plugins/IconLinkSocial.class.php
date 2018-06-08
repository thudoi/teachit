<?php

/*
 *  @file
 *  Icon Link Social plugin
 */
class IconLinkSocial extends BeanPlugin {

  /*
   *  Define ddefault block settings
   */
  public function values()
  {
    $values = array(
      'link_icon' => array(
        'font_icon' => '',
        'link_text' => '',
      )
    );
    return array_merge(parent::values(),$values);
  }

  /**
   *  Build extra settings for the block edit form
   */
  public function form($bean,$form,&$form_state)
  {
    $form = array();
    if (empty($form_state['num_items'])) {
      $form_state['num_items'] = 1;
    }
    $form['link_icon'] = array(
      '#type' => 'fieldset',
      '#tree' => 1,
      '#title' => t('Icon Link'),
      '#prefix' => '<div id="fieldset-add-more-wrapper">',
      '#suffix' => '</div>',
    );
     for ($i = 0; $i < $form_state['num_items']; $i++) {
      $form['link_icon']['font_icon'][$i] = array(
        '#type' => 'textfield',
        '#title' => t('Icon'),
        '#description' => t('Input name icon font Autoload ,support font Awesome'),
        '#default_value' => isset($bean->link_icon['font_icon'][$i]) ? $bean->link_icon['font_icon'][$i] : '',
      );
      $form['link_icon']['link'][$i] = array(
        '#type' => 'textfield',
        '#title' => t('Link'),
        '#description' => t('Link for icon'),
        '#default_value' => isset($bean->link_icon['link'][$i]) ? $bean->link_icon['link'][$i] :'',
        );
    }
    $form['add_more_button'] = array(
      '#type' => 'submit',
      '#value' => t('Add one more'),
      '#submit' => array('example_ajax_add_more_add_one'),

      // See the examples in ajax_example.module for more details on the
      // properties of #ajax.
      '#ajax' => array(
        'callback' => 'example_ajax_add_more_callback',
        'wrapper' => 'fieldset-add-more-wrapper',
      ),
    );
    return $form;
  }


  public function example_ajax_add_more_add_one($form, &$form_state) {
    $form_state['num_items']++;
    $form_state['rebuild'] = TRUE;
  }

  public function example_ajax_add_more_callback($form, $form_state) {
    return $form['link_icon'];
  }

  /*
   * Display The bean Icon Link Social plugin
   */
  public function view($bean,$content,$view_mode = 'default',$langcode=NULL)
  {
    krumo($content);
    //$content['icon_link']['#markup'] = theme('icon_link',array('icon' => $bean->link_icon['font_icon'],'link'=> $bean->link_icon['link']));
    //return $content;
  }
}
