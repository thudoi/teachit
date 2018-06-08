<?php //print $wrapper_prefix; ?>
<?php foreach ($rows as $id => $row): ?>
  <?php print render($row); ?>
<?php endforeach; ?>
<?php print $wrapper_suffix; ?>
