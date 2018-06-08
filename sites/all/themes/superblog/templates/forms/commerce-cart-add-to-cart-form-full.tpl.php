<div class="variations_form cart">
    <?php if(isset($form['attributes'])): ?>
    <div class="variations">
        <?php $attributes = array_filter_key("/^field_(\w+)/",$form['attributes'])?>
        <?php foreach($attributes as $delta => $field){ ?>
            <div class="item"><?php print render($form['attributes'][$delta]); ?></div>
         <?php } ?>
    </div>
    <div class="clearfix"></div>
    <?php endif; ?>
    <div class="single_variation_wrap">
        <div class="single_wrap_button">
            <?php if(isset($form['submit'])): ?>
            <button class="addtocart btn-lg btn-primary btn-icon-left" type="submit">
                <i class="icon-cart2"></i>
                <?php print $form['submit']['#value'];  ?>
            </button>
            <?php endif; ?>
            <?php if(isset($form['quantity']) && $form['quantity']['#type'] != 'hidden'): ?>
                <?php $form['quantity']['#title'] = ''; ?>
            <div class="quantity_info">
                <a href="javascript:void(0)" class="qty-down"><span class="icon-arrow-down11"></span></a>
                <?php print render($form['quantity']) ?>
                <a href="javascript:void(0)" class="qty-up"><span class="icon-arrow-up10"></span></a>
            </div>
            <?php endif; ?>
            <?php $wishlist = _flag_wishlist($form['#nid'],'btn flag add_to_wishlist icon-heart'); print $wishlist; ?>
            <?php $compare  = _flag_compare($form['#nid'],'btn flag add_to_compare icon-spin-alt');  print $compare; ?>
        </div>
    </div>
</div>
<div class="js-hide"><?php print drupal_render_children($form); ?></div>
