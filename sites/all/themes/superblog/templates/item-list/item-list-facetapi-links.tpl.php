<?php $attributes['class'][] = 'product-categories' ?>
<?php if(isset($items) && is_array($items)): ?>
    <ul <?php print drupal_attributes($attributes) ?>>
        <?php foreach($items as $id => $item): ?>
            <?php
             unset($item['class'][array_search('leaf',$item['class'])]);
            if(isset($item['children']))
                $item['class'][] = 'cat-parent';
            ?>
            <li class="cate-item <?php print implode(" ",$item['class']) ?>" >
                <?php print $item['data'] ?>
                <?php if(isset($item['children']) && is_array($item['children'])){?>
                    <ul class="children">
                    <?php foreach($item['children'] as $child_id => $child): $child['class'][] = 'cat-item'; ?>
                        <li class="cate-item"><?php print $child['data'] ?></li>
                    <?php endforeach; ?>
                    </ul>
                <?php } ?>
            </li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>
