<?php

/**
 * @file
 * Default simple view template to display a list of rows.
 *
 * @ingroup views_templates
 */
?>
<?php if (!empty($title)): ?>
    <h3><?php print $title; ?></h3>
<?php endif; ?>
<?php foreach ($rows as $id => $row): ?>
        <?php print $row; ?>
<?php endforeach; ?>
<?php
    drupal_add_js(libraries_get_path('slick') . '/slick.js', array('group' => JS_THEME, 'every_page' => TRUE));
    drupal_add_css(libraries_get_path('slick'). '/slick.css');
?>
