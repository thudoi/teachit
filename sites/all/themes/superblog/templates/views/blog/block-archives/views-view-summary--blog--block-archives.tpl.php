<?php

/**
 * @file
 * Default simple view template to display a list of summary lines.
 *
 * @ingroup views_templates
 */
?>
<div class="item-list">
  <ul class="list-icon">
    <?php foreach ($rows as $id => $row): ?>
      <li class="cate-item"><a href="<?php print $row->url; ?>"<?php print !empty($row_classes[$id]) ? ' class="'. $row_classes[$id] .'"' : ''; ?>><?php print $row->link; ?></a>
        <?php if (!empty($options['count'])): ?>
          <span class="catCounter"><?php print $row->count?></span>
        <?php endif; ?>
      </li>
    <?php endforeach; ?>
  </ul>
</div>
