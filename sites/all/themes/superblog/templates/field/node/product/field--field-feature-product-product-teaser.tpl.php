<?php foreach($items as $id => $item){ ?>
    <?php $featured = render($item); ?>
    <?php if($featured == 'Sale'){?> <span class="onsale"><?php print t('Sale!')?></span>  <?php } ?>
    <?php if($featured == 'Hot'){?> <span class="onhot"><?php print t('Hot')?></span>  <?php } ?>
    <?php if($featured == 'New'){?> <span class="onnew"><?php print t('New')?></span>  <?php } ?>
<?php } ?>
