<?php

    unset($form['basic']['keys']['#title']);
    $form['basic']['keys']['#attributes']['placeholder'] = t('Search here...');
    print render($form['basic']['keys']);
?>
    <button class="btn" type="submit"><i class="icon-search8"></i></button>

    <div class="js-hide"><?php print drupal_render_children($form); ?></div>
