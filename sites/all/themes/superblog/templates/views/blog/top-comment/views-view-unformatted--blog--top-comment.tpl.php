<div class="line-dark-item-top recent-posts-extended">
  <div class="jvpost-div jv-posts">
    <?php foreach ($rows as $id => $row): ?>
      <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id] .' item"';  } else { print 'class="item"'; } ?>>
        <?php print $row; ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
