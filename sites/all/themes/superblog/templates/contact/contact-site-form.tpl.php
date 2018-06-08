<?php $param = drupal_get_query_parameters(); ?>
<?php if($contact_style == 'contact-2' || (isset($param['style']) && $param['style'] == 'contact-2')){ ?>
<section class="row-section bg-white row-icon-left" >
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <?php print drupal_render_children($form) ?>
            </div>
            <div class="col-sm-6">
                <?php if(isset($address_body)): ?>
                        <div class="widget bg-icon-color-2 <?php print $icon_address ?>">
                            <h2 class='widgettitle'><?php print t('Address') ?></h2>
                            <div class='wpb_container'>
                                <?php print check_markup($address_body['value'],$address_body['format']) ?>
                            </div>
                        </div>
                <?php endif; ?>
                <?php if(isset($phone_body)): ?>
                        <div class="widget bg-icon-color-3 <?php print $icon_phone ?>">
                            <h2 class='widgettitle'><?php print t('Phone') ?></h2>
                            <div class='wpb_container'>
                                <?php print check_markup($phone_body['value'],$phone_body['format']) ?>
                            </div>
                        </div>
                <?php endif; ?>
                <?php if(isset($email_body)): ?>
                        <div class="widget bg-icon-color-4 <?php print $icon_email ?>">
                            <h2 class='widgettitle'><?php print t('Email') ?></h2>
                            <div class='wpb_container'>
                                <?php print check_markup($email_body['value'],$email_body['format']) ?>
                            </div>
                        </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
<section class="row-section padding-0">
    <div id="address_map_contact"></div>
</section>
<?php }elseif($contact_style == 'contact-1' || (isset($param['style']) && $param['style'] == 'contact-1')){ ?>
    <section class="row-section bg-white" >
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div id="address_map_contact"></div>
                </div>
                <div class="col-md-6">
                    <?php print drupal_render_children($form) ?>
                </div>
            </div>
        </div>
    </section>
    <section class="row-section text-center">
        <div class="container">
            <div class="row">
                <?php if(isset($address_body)): ?>
                    <div class="col-md-4">
                        <div class="widget  box-white bg-icon-color-2 <?php print $icon_address ?>">
                            <h2 class='widgettitle'><?php print t('Address') ?></h2>
                            <div class='wpb_container'>
                                <?php print check_markup($address_body['value'],$address_body['format']) ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
                <?php if(isset($phone_body)): ?>
                    <div class="col-md-4"> <div class="widget  box-white bg-icon-color-3 <?php print $icon_phone ?>">
                            <h2 class='widgettitle'><?php print t('Phone') ?></h2>
                            <div class='wpb_container'>
                                <?php print check_markup($phone_body['value'],$phone_body['format']) ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
                <?php if(isset($email_body)): ?>
                    <div class="col-md-4"><div class="widget  box-white bg-icon-color-4 <?php print $icon_email ?>">
                            <h2 class='widgettitle'><?php print t('Email') ?></h2>
                            <div class='wpb_container'>
                                <?php print check_markup($email_body['value'],$email_body['format']) ?>
                            </div>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </section>
<?php } ?>
