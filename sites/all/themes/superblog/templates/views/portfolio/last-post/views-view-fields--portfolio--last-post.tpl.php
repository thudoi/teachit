
<div class="innerItem">
    <a  data-rel="portfolio-popup" class="jvpost-alignleft jvpost-thumb width50" href="<?php print $fields['path']->content; ?>" rel="bookmark">
       <?php print $fields['field_image_portfolio']->content; ?>
    </a>
    <div class="content-item-desc">
        <h4 class="post-title">
            <a data-rel="portfolio-popup" href="<?php print $fields['path']->content; ?>"><?php print $fields['title']->content; ?></a>
        </h4>
        <div class="entry-meta ItemLinks ItemLinksInline ItemLinksTop margin-0">
            <?php $created = array_combine(array('d','m','y'),explode(' ',format_date($fields['created']->content,'custom','d M Y')));
            ?>
            <?php if(isset($created)): ?>
            <span>
                <span class="meta-label"><?php print t('Date') ?></span>
                <span class="d"><?php print $created['d'] ?></span>
                <span class="m"><?php print $created['m'] ?></span>
                <span class="y"><?php print $created['y'] ?></span>
            </span>
            <?php endif; ?>
        </div>
    </div>
</div>
