<?php
/**
 * @file
 * teach_it_feature.features.field_instance.inc
 */

/**
 * Implements hook_field_default_field_instances().
 */
function teach_it_feature_field_default_field_instances() {
  $field_instances = array();

  // Exported field_instance: 'taxonomy_term-category_blog-field_frontpage'.
  $field_instances['taxonomy_term-category_blog-field_frontpage'] = array(
    'bundle' => 'category_blog',
    'default_value' => array(
      0 => array(
        'value' => 0,
      ),
    ),
    'deleted' => 0,
    'description' => 'Check it to remove this Term on homepage',
    'display' => array(
      'default' => array(
        'label' => 'above',
        'module' => 'list',
        'settings' => array(),
        'type' => 'list_default',
        'weight' => 0,
      ),
    ),
    'entity_type' => 'taxonomy_term',
    'field_name' => 'field_frontpage',
    'label' => 'Frontpage',
    'required' => 0,
    'settings' => array(
      'user_register_form' => FALSE,
    ),
    'widget' => array(
      'active' => 1,
      'module' => 'options',
      'settings' => array(
        'display_label' => 1,
      ),
      'type' => 'options_onoff',
      'weight' => 31,
    ),
  );

  // Translatables
  // Included for use with string extractors like potx.
  t('Check it to remove this Term on homepage');
  t('Frontpage');

  return $field_instances;
}
