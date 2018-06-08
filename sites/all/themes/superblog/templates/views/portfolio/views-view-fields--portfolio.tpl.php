<div class="pfo-item-inner">
    <div class="pfo-overaly">
        <div class="overaly-top">
            <div class="overaly-top-inner">
                <h3> <?php print $fields['title']->content; ?></h3>
                <p class="desc"><?php print $fields['field_detail_portfolio']->content; ?></p>
            </div>
        </div>
        <div class="overaly-bottom"> <a class="btn " data-rel="portfolio-popup"  href="<?php print $fields['path']->content; ?>"> <?php print t('Details') ?></a> </div>
    </div>
    <?php print $fields['field_image_portfolio']->content; ?>
</div>
