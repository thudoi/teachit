
<?php $tags = ''; ?>
<?php if (!empty($title)): ?>
    <h3><?php print $title; ?></h3>
<?php endif; ?>
    <?php $term_portfolio = taxonomy_get_tree(4); //vid = 4 is Vocabulary Portfolio Tags ?>
    <div class="portfolioFilter">
        <div class="filter-link"><a href="#" data-filter="*" class="active"><?php print t('All Portfolio'); ?></a></div>
        <?php foreach($term_portfolio as $key => $term ): ?>
        <div class="filter-link"><a href="#" data-filter="<?php print '.term-'.$term->tid ?>"><?php print $term->name; ?></a> </div>
        <?php endforeach; ?>
    </div>
<div class="portfolioContainer row">
<?php foreach ($rows as $id => $row): ?>
    <?php
    foreach($view->result[$id]->field_field_tags_portolio as $key => $raw){
        $tags.= ' term-'.$raw['raw']['tid'];
    }
    ?>
    <div<?php if ($classes_array[$id]) { print ' class="' . $classes_array[$id].$tags.'"';  } ?>>
        <?php print $row; ?>
        <?php $tags = ''; ?>
    </div>
<?php endforeach; ?>
</div>
