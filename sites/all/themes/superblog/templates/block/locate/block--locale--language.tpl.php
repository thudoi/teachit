<?php
global $language;
$path  = drupal_is_front_page() ? '<front>' : $_GET['q'];
$list_language = language_negotiation_get_switch_links('language', $path);
$current_lang = $list_language->links[$language->language];
$current_lang['attributes']['class'][] = 'lang_sel_sel';
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
    <div class="dropdownMenu ">
        <div class="textwidget">
            <div class="lang_sel">
             <ul class="menu">
                <li> <?php print l($current_lang['title'],$current_lang['href'],array('html'=>$current_lang['html'],'attributes'=> $current_lang['attributes'])) ?>
                <?php print $content; ?>
                 </li>
             </ul>
            </div>
        </div>
    </div>
    </div>
</div>
<?php if(isset($suffix_block)): print $suffix_block; endif; ?>
