<?php

/**
 * Context registry.
 */

function _mod_context_registry()
{
  $registry = array();

  $registry['reactions'] = array(
    'mod_region_class' => array(
      'title' => t('Regions Class'),
      'description' => t('Add Class Region using context.'),
      'plugin' => 'mod_context_reaction_region',
    ),
  );
  return $registry;
}


function _mod_context_plugins() {
  /**
   * Reactions.
   */
  $plugins['mod_context_reaction_region'] = array(
    'handler' => array(
      'path' => drupal_get_path('module', 'mod_context_region') . '/plugins',
      'file' => 'mod_context_reaction_region.inc',
      'class' => 'mod_context_reaction_region',
      'parent' => 'context_reaction',
    ),
  );

  return $plugins;
}