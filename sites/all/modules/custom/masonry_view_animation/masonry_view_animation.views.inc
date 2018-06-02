<?php
/**
 * @file
 * Provide views data and handlers for masonry_views.module.
 */

/**
 * Implements hook_views_plugins().
 */
function masonry_view_animation_views_plugins() {
    return array(
        'style' => array(
            'masonry_view_animation' => array(
                'title' => t('Masonry animation'),
                'handler' => 'views_plugin_style_masonry_view_animation',
                'uses options' => TRUE,
                'help' => t("Display content in a Masonry animation layout."),
                'theme' => 'views_view_masonry_view_animation',
                'uses options' => TRUE,
                'uses row plugin' => TRUE,
                'uses row class' => TRUE,
                'type' => 'normal',
            ),
        ),
    );
}

