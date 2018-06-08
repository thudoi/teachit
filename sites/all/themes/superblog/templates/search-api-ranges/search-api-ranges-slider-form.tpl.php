<?php
unset($form['range-from']['#attributes']['disabled']);
unset($form['range-to']['#attributes']['disabled']);
?>
<div class="widget_price_filter">
    <?php print render($form['range-slider']); ?>
    <div class="info-price-filter">
        <?php print render($form['submit']) ?>
        <div class="group_range_price">
            <label><?php print t('Price:'); ?></label>
            <?php print render($form['range-from']) ?>
            <?php print render($form['range-to']) ?>
        </div>
    </div>
    <div class="js-hide"><?php print drupal_render_children($form) ?></div>
</div>
