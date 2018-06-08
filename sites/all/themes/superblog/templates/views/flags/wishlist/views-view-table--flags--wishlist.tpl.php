<div class="table-responsive">
    <table <?php if ($classes) { print 'class="table table-wishlist table_shop_cart '. $classes . '" '; } ?><?php print $attributes; ?>>
        <?php if (!empty($title) || !empty($caption)) : ?>
            <caption><?php print $caption . $title; ?></caption>
        <?php endif; ?>
        <?php if (!empty($header)) : ?>
            <thead>
            <tr>
                <?php foreach ($header as $field => $label): ?>
                    <?php if($field == 'field_image_product' || $field == 'add_to_cart_form'){$header_classes[$field].= ' text-center' ;} ?>
                    <?php if($field != 'field_color_product' && $field != 'field_size_product'): ?>
                        <th <?php if ($header_classes[$field]) { print 'class="'. $header_classes[$field] . '" '; } ?> scope="col">
                            <?php print $label; ?>
                        </th>
                    <?php endif; ?>
                <?php endforeach; ?>
            </tr>
            </thead>
        <?php endif; ?>
        <tbody>
        <?php $i = 0; ?>
        <?php foreach ($rows as $row_count => $row): ?>
            <tr <?php if ($row_classes[$row_count]) { print 'class="' . implode(' ', $row_classes[$row_count]) .'"';  } ?>>
                <?php foreach ($row as $field => $content): ?>
                    <?php if($field == 'field_image_product'): ?>
                        <td <?php if ($field_classes[$field][$row_count]) { print 'class="product-thumbnail '. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                            <?php print $rows[$i]['field_image_product'] ?>
                        </td>
                    <?php endif; ?>
                    <?php if($field == 'title'): ?>
                        <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                            <?php print $rows[$i]['title'] ?>
                            <dl class="variation">
                                <?php if(isset($rows[$i]['field_color_product']) && !empty($rows[$i]['field_color_product']) ): ?>
                                    <dt class="variation-Color"><?php print t('Color:') ?></dt>
                                    <dd class="variation-Color">
                                        <p><?php print $rows[$i]['field_color_product'] ?></p>
                                    </dd>
                                <?php endif; ?>
                                <?php if(isset($rows[$i]['field_size_product']) && !empty($rows[$i]['field_size_product'])): ?>
                                    <dt class="variation-Size"><?php print t('Size:') ?></dt>
                                    <dd class="variation-Size">
                                        <p><?php print $rows[$i]['field_size_product'] ?></p>
                                    </dd>
                                <?php endif; ?>
                            </dl>
                        </td>
                    <?php endif; ?>
                    <?php if($field == 'commerce_price'): ?>
                        <td <?php if ($field_classes[$field][$row_count]) { print 'class="'. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                            <div class="price"><?php print $rows[$i]['commerce_price'] ?></div>
                        </td>
                    <?php endif; ?>
                    <?php if($field == 'add_to_cart_form'): ?>
                        <td <?php if ($field_classes[$field][$row_count]) { print 'class="text-center '. $field_classes[$field][$row_count] . '" '; } ?><?php print drupal_attributes($field_attributes[$field][$row_count]); ?>>
                            <?php print $rows[$i]['add_to_cart_form'] ?>
                        </td>
                <?php endif; ?>
                <?php endforeach; ?>
            </tr>
            <?php $i++; endforeach; ?>
        </tbody>
    </table>
</div>
