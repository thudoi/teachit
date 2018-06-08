<div class="innerItem">
    <div class="wrap-thumb">
        <a class="jvpost-aligncenter jvpost-thumb" href="<?php print $fields['path']->content ?>"  rel="bookmark">
            <?php print $fields['field_media_multi']->content; ?>
        </a>
    </div>
    <div class="content-item-desc">
        <h4 class="post-title"><?php print $fields['title']->content ?></h4>
        <div class="line-dark"></div>
        <div class="moduleItemIntrotext">
            <?php print $fields['body']->content; ?>
        </div>
        <div class="readmore"><a class="btn-outline btn radius50 btn-icon-inset-right" href="<?php print $fields['path']->content ?>"><?php print t('Read More') ?><i class="icon-angle-double-right"></i></a></div>
    </div>
</div>
