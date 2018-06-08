<div class="pageBlog page-grid">
  <div class="row">
    <?php foreach ($rows as $id => $row): ?>
      <div class="masonry-item<?php if ($classes_array[$id]) print ' ' . $classes_array[$id]; ?>" <?php print drupal_attributes($attributes_array[$id]); ?>>
        <?php print $row; ?>
      </div>
    <?php endforeach; ?>
  </div>
</div>
