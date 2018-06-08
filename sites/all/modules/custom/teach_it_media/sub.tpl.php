
<div class="sub-category col-md-6">
    <div class="title"><h2 class="block-title"><?php print $title; ?></h2> </div>
    <div class="main-feature">
            <?php
            $node_view = node_view($main_node,'grid');
            $alias = drupal_get_path_alias('node/'.$main_node->nid);
			if(isset($main_node->field_media_multi['und'][0]['fid'])){
			  if(isset($node_view['field_media_multi'][0]['file']['#item']['type'])&&$node_view['field_media_multi'][0]['file']['#item']['type']=='image'){
				$uri_image = $node_view['field_media_multi'][0]['file']['#item']['uri'];
				print '<div class="isthumbnail"><a href="'.$alias.'"><img src="'.image_style_url('image_750x422',$uri_image).'"></a></div>';
			  }else
				print render($node_view['field_media_multi']);
			}else{
			  print render($node_view['field_screenshot']) ;
			}
            ?>
        <div class="field-type-taxonomy-term-reference-main"><?php print render($node_view['field_category_blog']); ?></div>
        <div class="node-title"><h3><?php print l(truncate_utf8($main_node->title, 40, TRUE, TRUE),'node/'.$main_node->nid); ?></h3></div>
    </div>
    <div class="sub-fearture">
        <?php foreach ($nodes as $key=>$node): ?>
            <?php  $node_view = node_view($node,'grid'); ?>
                <div data-history-node-id="16" class="node node--type-article node--view-mode-mini smartcard dsc-mini-card media">

                    <div class="media-left ">

                        <div class="field field--name-field-image field--type-image field--label-hidden  field--item">

                            <?php
                            $node_view = node_view($node,'grid');
                            $alias = drupal_get_path_alias('node/'.$node->nid);
							if(isset($node->field_media_multi['und'][0]['fid'])){
							  if(isset($node_view['field_media_multi'][0]['file']['#item']['type'])&&$node_view['field_media_multi'][0]['file']['#item']['type']=='image'){
								$uri_image = $node_view['field_media_multi'][0]['file']['#item']['uri'];
								print '<div class="isthumbnail"><a href="'.$alias.'"><img src="'.image_style_url('232x130',$uri_image).'"></a></div>';
							  }else
								print render($node_view['field_media_multi']);
							}else{
							  print render($node_view['field_screenshot']) ;
							}
                            ?>
                        </div>

                    </div>
                    <div class="media-body ">
                        <div class="field field--name-node-title field--type-ds field--label-hidden field--item"><h3><?php print l(truncate_utf8($node->title, 40, TRUE, TRUE),'node/'.$node->nid); ?></h3></div>
                    </div>
                </div>
        <?php endforeach;?>
    </div>
</div>
