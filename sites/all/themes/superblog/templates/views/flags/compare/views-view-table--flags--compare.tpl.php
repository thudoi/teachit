<?php
$total = count($rows);
?>
<div class="table-responsive">
    <table class="table table-compare table_shop_cart">
        <tbody>
            <tr>
                <td class="td-caption"></td>
                <?php for($i=0;$i < $total ; $i++){ ?>
                <td class="td-compare">
                    <div class="img text-center">
                        <?php print $rows[$i]['field_image_product'] ?>
                    </div>
                    <h4 class="title text-center"><?php print $rows[$i]['title'] ?></h4>
                    <div class="review_rate text-center">
                        <?php print $rows[$i]['field_rate_product'] ?>
                    </div>
                    <div class="price_wrap text-center"><?php print $rows[$i]['commerce_price']; ?></div>
                </td>
                <?php } ?>
            </tr>
            <tr>
                <td class="td-caption"><?php print t('Short Description') ?></td>
                <?php for($i = 0 ; $i < $total ; $i++){ ?>
                 <td class="td-compare-text">
                     <p>
                         <?php print !empty($rows[$i]['field_sumary_product']) ? $rows[$i]['field_sumary_product'] : '<i class="icon-close"></i>'; ?>
                     </p>
                 </td>
                <?php } ?>
            </tr>
            <tr>
                <td class="td-caption"><?php print t('Color') ?></td>
                <?php for($i = 0 ; $i < $total ; $i++){ ?>
                    <td class="text-center"><?php print !empty($rows[$i]['field_color_product']) ? $rows[$i]['field_color_product'] : '<i class="icon-close"></i>'; ?></td>
                <?php } ?>
            </tr>
            <tr>
                <td class="td-caption"><?php print t('Size') ?></td>
                <?php for($i = 0 ; $i < $total ; $i++){ ?>
                    <td class="text-center"><?php print !empty($rows[$i]['field_size_product']) ? $rows[$i]['field_size_product'] : '<i class="icon-close"></i>'; ?></td>
                <?php } ?>
            </tr>
            <tr>
                <td class="td-caption"><?php print t('Operation') ?></td>
                <?php for($i = 0 ; $i < $total ; $i++){ ?>
                <td class="text-center"><?php print $rows[$i]['add_to_cart_form']  ?></td>
                <?php } ?>
            </tr>
        </tbody>
    </table>
</div>
