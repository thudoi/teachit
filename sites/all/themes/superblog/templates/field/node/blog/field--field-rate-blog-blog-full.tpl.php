<?php
  if(isset($label)):
?>
<label class="field-label"<?php print $title_attributes; ?>><?php print $label.':&nbsp;' ?></label>
<?php endif; ?>
<?php foreach ($items as $delta => $item): ?>
    <?php print render($item) ?>
<?php endforeach; ?>
