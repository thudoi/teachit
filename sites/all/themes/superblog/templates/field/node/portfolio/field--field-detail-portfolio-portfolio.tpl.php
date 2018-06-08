<?php if (!$label_hidden) : ?>
    <h5 class="color-main"><?php print $label ?></h5>
<?php endif; ?>
<p>
<?php foreach($items as $item): ?>
    <?php print render($item); ?>
<?php endforeach; ?>
</p>
