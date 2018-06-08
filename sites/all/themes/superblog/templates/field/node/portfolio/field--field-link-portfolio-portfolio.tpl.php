<?php if (!$label_hidden) : ?>
    <h5 class="color-main"><?php print $label ?></h5>
<?php endif; ?>
<div>
    <?php foreach($items as $delta => $item): ?>
        <a href="<?php print render($item); ?>" target="_blank" rel="nofollow"><?php print render($item); ?></a>
    <?php endforeach; ?>
</div>
