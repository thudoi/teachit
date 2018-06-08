<?php $wishlist = _flag_wishlist($form['#nid'],'add_to_wishlist icon-heart');?>
<?php $compare  = _flag_compare($form['#nid'],'add_to_compare icon-spin-alt');?>
<div class="product-action ">
    <div class="item-btn item-btn-wishlist"><?php print $wishlist; ?></div>
    <div class="item-btn item-btn-addtocart"> <a href="javascript:void(0)" rel="nofollow" title="addtocart" class="addtocart-teaser addtocart icon-cart2"> </a> </div>
    <div class="item-btn item-btn-compare"><?php print $compare; ?></div>
</div>
<div class="js-hide"><?php print drupal_render_children($form) ?></div>
