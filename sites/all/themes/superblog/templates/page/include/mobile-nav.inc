<?php  $menu_tree = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
$menu_tree['#theme_wrappers'] =  array('menu_tree__main_menu_mobile');
$menu_keys = array_filter_key('/^[0-9]/',$menu_tree);
foreach($menu_keys as $keys => $menu ){
    $menu_tree[$keys]['#theme'] = 'menu_link__main_menu_mobile';
    if($menu_tree[$keys]['#below']){
        foreach($menu_tree[$keys]['#below'] as $child_key => $sub_menu){
            if(is_int($child_key)){
                $menu_tree[$keys]['#below'][$child_key]['#theme'] = 'menu_link__main_menu_mobile';

            }
        }
    }
}
?>

<nav id="nav-mainmenu-mobile">
    <?php print render($menu_tree); ?>
</nav>
