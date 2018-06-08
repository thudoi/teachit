<div class="jvpost-block space20 slider-latest-3">
    <div class="jvpost-div jv-posts  posts_jvpost-aligncenter">
        <?php foreach ($rows as $id => $row): ?>
            <div class="<?php if ($classes_array[$id]) print ' ' . $classes_array[$id]; ?> item  text-center">
                <?php print $row; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>
