<?php

/**
 * @file
 * simple-timeline-fields.tpl.php
 * Created by JetBrains PhpStorm.
 * User: alan
 *
 * @var $simple_timeline_image
 * @var $simple_timeline_date
 * @var $simple_timeline_text
 */

?>
<div class="thumbnail_large blog-gallery">
    <div class="inner_timeline">
      <?php if(isset($fields['field_media_multi'])): ?>
        <?php $type_file = file_get_type($row->field_field_media_multi[0]['raw']['file']);
              switch($type_file){
                case 'video':
                  $class = 'icon-film8';
                  break;
                case 'image':
                  $class = 'icon-pictures7';
                  break;
                case 'audio':
                  $class = 'icon-soundcloud';
                  break;
              }
        ?>
        <a href="#" class="link-detail"><i class="fa <?php print $class .' '. $type_file?> "></i></a>
      <?php endif; ?>
      <?php print $fields['field_media_multi'];?>
    </div>
</div>
<div class="blog-item-description is_thumbnail_large slideInLeft-30">
    <div class="inner_timeline">
      <?php if(isset($fields['created'])): ?>
        <?php $date = array_combine(array('date','month','year'),explode(" ",$fields['created'])); ?>
      <div class="post-meta-date">
		<span class="date"><?php print $date['date']; ?></span>
		<span class="month"><?php print $date['month']; ?></span>
		<span class="year"><?php print $date['year']; ?></span>
      </div>
      <?php endif; ?>

      <?php if(isset($fields['title'])): ?><h3 class="entry-title"><?php print $fields['title'] ?></h3> <?php endif;?>
      <?php if(isset($fields['body'])): ?><div class="entry-summary"><?php print $fields['body'] ?></div><?php endif; ?>
    </div>
</div>
