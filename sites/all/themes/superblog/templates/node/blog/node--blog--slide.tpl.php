<?php

/**
 * @file
 * Bartik's theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 */

if(isset($content['field_media_multi'][0]['file']['#item']['type']) )
{
    $file_mime = $content['field_media_multi'][0]['file']['#item']['type'];
    $uri_image = $content['field_media_multi'][0]['file']['#item']['uri'];
}else{

    $file_mime = isset($node->field_media_multi['und'][0]['file']->filemime)? $node->field_media_multi['und'][0]['file']->filemime:'';
    $uri_image = isset($node->field_media_multi['und'][0]['file']->uri)? $node->field_media_multi['und'][0]['file']->uri:'';
}
$image = '';
if($uri_image){
    $image = image_style_url('image_750x422',$uri_image);
}
$file_mime = explode('/',$file_mime);
$file_mime = $file_mime[0];
?>

<div id="node-<?php print $node->nid; ?>" class="blog-item  row_item_single <?php print $classes; ?> clearfix"<?php print $attributes; ?>>
    <div class="thumbnail_large blog-thumbnail  thumbnail_effect_slide">
        <?php if($file_mime == 'image'): ?>

        <a href="<?php print $node_url ?>" class="link-detail coloricon-picture3"><i class="icon-picture3"></i></a>
        <div class="isthumbnail"><a href="<?php print $node_url ?>"><img src="<?php print $image ?>"></a></div>
        <div class="entry-meta-thumb ItemLinksBlock ItemLinks  ">
            <span class="by-author">
                <span class="meta-label"><?php print t('By') ?></span>
                <span class="author vcard"><?php print $name ?></span>
            </span>
            <?php print render($content['field_category_blog']); ?>
            <span class="text-readmore text-center">
                <a class="btn-round50 icon-arrow-right7" href="<?php print $node_url ?>" rel="bookmark"> </a>
            </span>
        </div>
        <?php else: ?>
            <a href="<?php print $node_url ?>" class="link-detail coloricon-picture3"><i class="fa fa-file-video-o"></i></a>
         <?php print render($content['field_media_multi']); ?>
        <?php endif; ?>
    </div>
    <div class="blog-item-description is_thumbnail_large">
        <h3 class="entry-title">
            <a href="<?php print $node_url ?>" rel="bookmark"><?php print truncate_utf8($title, 40, TRUE, TRUE);  ?></a>
        </h3>
    </div>
</div>
