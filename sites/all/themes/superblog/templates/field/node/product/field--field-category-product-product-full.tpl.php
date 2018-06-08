<div class="product_meta">
    <span class="posted_in">
        <?php
        if(isset($label)):?>
            <?php print $label.':&nbsp;' ?>
        <?php endif; ?>
        <?php foreach ($items as $delta => $item): ?>
            <?php print render($item);
             // Add comma if not last item
                if ($delta < (count($items) - 1)) {
                    print ',';
                }
            ?>

        <?php endforeach; ?>
    </span>
</div>
