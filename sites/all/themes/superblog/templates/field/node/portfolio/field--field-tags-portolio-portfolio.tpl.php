<?php if (!$label_hidden) : ?>
<h5 class="color-main"><?php print $label ?></h5>
<?php endif; ?>
<p class="gray-italic">
    <?php
    foreach($items as $delta => $item):
    print render($item);
    // Add comma if not last item
    if ($delta < (count($items) - 1)) {
        print ',';
    }
    endforeach;
    ?>
</p>
