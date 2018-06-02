<?php

function bean_icon_link_social(&$plugins)
{
  $plugin_path = drupal_get_path('module','mod_bean') . '/plugins';
  $plugins['icon_link_social'] = array(
    'label' => t('Icon Link Social'),
    'description' => t('Create icon link social'),
    'handler' => array(
      'class' => 'IconLinkSocial',
      'parent' => 'bean',
    ),
    'path' => $plugin_path,
    'file' => 'IconLinkSocial.class.php',
  );
}

function theme_icon_link(&$variables)
{
  //krumo($variables);
}