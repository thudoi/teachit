<?php

class mod_context_reaction_region extends context_reaction {

  function editor_form($context) {
  }


  function options_form($context) {
    $values = $this->fetch_from_context($context);
    $form = array();
    foreach (list_themes() as $theme) {
      if ($theme->status) {
        $regions = system_region_list($theme->name);
        $form[$theme->name] = array(
          '#type' => 'fieldset',
          '#title' => "Regions in {$theme->name} Theme",
          '#collapsible' => TRUE,
          '#collapsed' => TRUE//!array_reduce($default, create_function('$a, $b', 'return $a || $b;')),
        );
        foreach($regions as $key => $name) {
          $default = isset($values[$theme->name]) ? $values[$theme->name][$key] : '';
          $form[$theme->name][$key] = array(
            '#type'          => 'textfield',
            '#title'         => t("Class !name Region",array('!name' => $name)),
            '#default_value' => $default,
          );
        }
      }
    }
    return $form;
  }
  function execute(&$page) {

  }
  function execute_region(&$variables)
  {
    global $theme;

    foreach ($this->get_contexts() as $k => $v) {
      if (isset($v->reactions[$this->plugin][$theme])) {
        $regions = $v->reactions[$this->plugin][$theme];
        foreach($regions as $region => $class)
        {

          if ($class && isset($variables['region']) && $variables['region'] == $region ) {
            $variables['classes_array'][] = $class;
          }
        }
      }
    }
  }
}