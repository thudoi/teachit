<?php
/**
 * @file
 * teach_it_feature.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function teach_it_feature_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_frontpage'.
  $field_bases['field_frontpage'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_frontpage',
    'indexes' => array(
      'value' => array(
        0 => 'value',
      ),
    ),
    'locked' => 0,
    'module' => 'list',
    'settings' => array(
      'allowed_values' => array(
        0 => '',
        1 => '',
      ),
      'allowed_values_function' => '',
    ),
    'translatable' => 0,
    'type' => 'list_boolean',
  );

  return $field_bases;
}
