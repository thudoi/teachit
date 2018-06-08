<div class="wrap-portfolio owl-carousel">
    <?php foreach($rows as $id => $row): ?>
    <div<?php if ($classes_array[$id]) { print ' class="item ' . $classes_array[$id] .'"';  } ?>>
        <?php print $row; ?>
    </div>
    <?php endforeach; ?>
</div>
