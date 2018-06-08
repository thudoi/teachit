<?php
/** Order Line Item Cart */
global $user;
$quantity = 0;
if(module_exists('commerce_cart')) {
    $order = commerce_cart_order_load($user->uid);
    if ($order) :
        $wrapper                    = entity_metadata_wrapper('commerce_order', $order);
        $line_items                 = $wrapper->commerce_line_items;
        $quantity                   = commerce_line_items_quantity($line_items, commerce_product_line_item_types());
        $total                      = commerce_line_items_total($line_items);
        $currency                   = commerce_currency_load($total['currency_code']);
        $quantity_cart = isset($quantity) ? $quantity : '';
        $total_cart       = isset($total) ? commerce_currency_format($total['amount'],$total['currency_code']) : '';

    endif;
}

?>
<?php if(isset($prefix_block)): print $prefix_block; endif; ?>
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>
    <?php if(isset($title_raw_check) && isset($title_raw) && $title_raw_check == 1){ ?>
        <?php print check_markup($title_raw['value'],$title_raw['markup'])?>
    <?php } else{ ?>
        <?php print render($title_prefix); ?>
        <?php if ($block->subject): ?>
            <h2<?php print $title_attributes; ?>><?php print $block->subject ?></h2>
        <?php endif;?>
        <?php print render($title_suffix); ?>
    <?php } ?>
    <div class="content"<?php print $content_attributes; ?>>
        <div class="widget_shopping_cart_content">
            <ul class="menu">
                <li>
                    <a href="javascript:void(0)" class="showtotal">
                        <i class="icon-suitcase"></i>
                        <?php print (isset($quantity_cart) && $quantity_cart > 0 ) ? $quantity_cart : '0' ?> items - <span class="amount"><?php print isset($total_cart) ? $total_cart : '' ?></span> <i class="icon-arrow-down10"></i>
                    </a>
                    <?php print $content ?>
                </li>
            </ul>
        </div>
    </div>
</div>
<?php if(isset($suffix_block)): print $suffix_block; endif; ?>
