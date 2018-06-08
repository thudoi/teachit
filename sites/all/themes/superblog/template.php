<?php

function superblog_preprocess_html(&$variables){

  global $user;
  $header = drupal_get_http_header('status');
  if($header == '404 Not Found'){
    $variables['classes_array'][] = 'page-full-fluid error404';
  }
  /** Tools Switch Style */
  $variables['color_default']= theme_get_setting('color_default');
  drupal_add_js(array('path_theme'=> drupal_get_path('theme','superblog')),'setting');
  $query = drupal_get_query_parameters();

  $check_switch = theme_get_setting('check_switch_style');

  if($check_switch) {
    $variables['check_switch'] = $check_switch;
    drupal_add_css(drupal_get_path('theme','superblog') . '/assets/css/swticher.css',array('preprocess'=>false));
    drupal_add_css(drupal_get_path('theme','superblog').'/vendor/minicolors/jquery.minicolors.css',array('preprocess'=>false));
    drupal_add_js(drupal_get_path('theme','superblog').'/vendor/minicolors/jquery.minicolors.min.js',array('cache'=>false,'preprocess'=>false));
  }

  $font_body  = theme_get_setting('font_body');
  $font_menu  = theme_get_setting('font_menu');
  $font_title = theme_get_setting('font_title');
  $layout_style = theme_get_setting('layout_style_default');
  $type_background = theme_get_setting('check_type_background');
  if(isset($font_body) && $font_body != '--none--'){
    $variables['attributes_array']['data-fontbody'] = $font_body;
  }
  if(isset($font_menu) && $font_menu != '--none--'){
    $variables['attributes_array']['data-fontmenu'] = $font_menu;
  }
  if(isset($font_title) && $font_title != '--none--'){
    $variables['attributes_array']['data-fontheader'] = $font_title;
  }
  if(isset($layout_style)){
    $variables['classes_array'][] = $layout_style;
  }
  switch ($type_background){
    case 'type-image':
         $bg_default = theme_get_setting('background_image_default');
         $variables['classes_array'][] = isset($bg_default) ? $bg_default : '';
          break;
    case 'type-color':
         $bg_color = theme_get_setting('background_color');
         if(isset($bg_color)){
           $variables['attributes_array']['style'][] = 'background-color:'.$bg_color;
         }
          break;
  }
  if(isset($variables['page']['content']['system_main']['nodes'])) {
    $nodes = $variables['page']['content']['system_main']['nodes'];
    $view_portfolio = theme_get_setting('portfolio_detail');
    if(user_access('bypass node access',$user)){
      $view_portfolio = 'page';
    }
    if (isset($nodes) && arg(0) == 'node') {
      foreach ($nodes as $key => $element) {
        if (is_numeric($key) && isset($element['#bundle']) && $element['#bundle'] == 'portfolio' && $view_portfolio == 'popup') {
          $variables['theme_hook_suggestions'][] = 'html__node__' . $element['#bundle'] . '_popup';
        }
      }
    }

  }
}

function superblog_preprocess_page(&$variables)
{
  global $user;
  $view_portfolio  = theme_get_setting('portfolio_detail');
  if(user_access('bypass node access',$user)){
    $view_portfolio = 'page';
  }
  // Add setting view_portfolio to js
  drupal_add_js(array('view_portfolio'=> isset($view_portfolio) ? $view_portfolio : 'undefined'),'setting');
  $header = drupal_get_http_header("status");

  if(isset($variables['node']) && $variables['node']->type == 'portfolio' && $view_portfolio == 'popup'){
    $variables['theme_hook_suggestions'][] = 'page__portfolio_display_popup';
  }
  // Add js shortocodes
  drupal_add_js(drupal_get_path('module','nd_visualshortcodes').'/js/shortcodes_frontend.js');

  if($header == '404 Not Found'){
    $variables['background_404'] = file_load(variable_get('superblog_bg_404'));
    $variables['title_404'] = theme_get_setting('superblog_title_404');
    $variables['body_404']  = theme_get_setting('superblog_body_404');
    $variables['active_search_form'] = theme_get_setting('supper_search_form');
    $variables['theme_hook_suggestions'][] = 'page__404';
  }
  $logo_mobile  = file_load(variable_get('superblog_logo_mobile'));
  $variables['logo_mobile'] = isset($logo_mobile) ? $logo_mobile : '';
  if(!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])){
    $variables['content_column_class'] = ' class="col-xs-12 col-sm-6 col-md-6"';
  }
  elseif (!empty($variables['page']['sidebar_first']) || !empty($variables['page']['sidebar_second'])){
    $variables['content_column_class'] = ' class="col-xs-12 col-sm-6 col-md-9"';
  }
  else {
    $variables['content_column_class'] = ' class="col-md-12"';
  }
}

function superblog_preprocess_region(&$variables){
  if($variables['region'] === 'sidebar_second' || $variables['region'] === 'sidebar_first'){
    $variables['classes_array'][] = 'sidebar';
  }
}

function superblog_preprocess_node(&$variables)
{
   $variables['theme_hook_suggestion'] = 'node__'.$variables['type'].'__'.$variables['view_mode'];
   $variables['classes_array'][] = 'view-'.$variables['view_mode'];
  /** Flippy node **/
  $block_flippy = '';
  if(module_exists('flippy')) {
    /** Render block flippy by Content Type **/
    $block_flippy = module_invoke('flippy','block_view','flippy_pager-node_type-'.$variables['type']);
    if($block_flippy)
    {
      $variables['flippy'] = render($block_flippy['content']);
    }
  }

  $fields = array_filter_key("/^field_(\w+)/",$variables['content']);
  foreach($fields as $name_field => $field)
  {
    // Filter match string 'commerce_product_reference
    if(preg_match('/^commerce_product_reference$/',$field['#field_type']))
    {
      $field_product = $field;
      // Filter element keys array is_int
      $products = array_intersect_key($field_product,array_flip(array_filter(array_keys($field_product),'is_int')));
      foreach($products as $key => $product)
      {
        unset($variables['content'][$name_field][$key]['#theme'][array_search('commerce_cart_add_to_cart_form',$variables['content'][$name_field][$key]['#theme'])]);
        $variables['content'][$name_field][$key]['#theme'][] = 'commerce_cart_add_to_cart_form_'.$variables['view_mode'];
        $variables['content'][$name_field][$key]['#view_mode'] = $variables['view_mode'];

      }
    }
  }
}

/*
 *  Implement template_preprocess_block(&$variables)
 */
function superblog_preprocess_block(&$variables)
{

  $block = $variables['block'];
  $variables['title_attributes_array']['class'][] = 'widget-title';
  if($block->module != 'commerce_cart') {
    $variables['classes_array'][] = 'widget';
  }
  if($block->module == 'md_slider')
  {
    drupal_add_css(drupal_get_path('theme','superblog').'/css/md-slide.css');
  }
}

function superblog_menu_local_tasks(&$variables){
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="element-invisible">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<div class="tab-style-1"><ul class="tablist">';
    $variables['primary']['#suffix'] = '</ul></div>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="element-invisible">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs secondary">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

function superblog_menu_tree__main_menu_mobile(&$variables){
  return '<ul class="mega-menu">'.$variables['tree'].'</ul>';
}

function superblog_menu_link__main_menu_mobile(&$variables){

  $element = &$variables['element'];
  $sub_menu = '';
  if(isset($element['#below']) && count($element['#below']) > 0){
    $sub_menu = '<span class="showsubmenu  icon-plus7"></span>'.drupal_render($element['#below']);
  }
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);

  return '<li' . drupal_attributes($element['#attributes']) . '>' . $output . $sub_menu . "</li>";
}

function superblog_language_switch_links_alter(array &$links, $type, $path) {
  foreach ($links as $key => $link) {
    unset($links[$key]['attributes']['xml:lang']);
  }
}

function superblog_preprocess_username(&$variables)
{
  unset($variables['attributes_array']['xml:lang']);
}

/** Mega Menu */
function superblog_preprocess_tb_megamenu_column(&$vars) {
  $col = $vars['col']['col_content'];
  $col_config = $vars['col']['col_config'];
  tb_megamenu_edit_col_config($col_config);
  //$vars['classes_array'][] = 'col-md-' . $col_config['width'];

}

function superblog_preprocess_tb_megamenu_item(&$vars) {
  $level = $vars['level'];
  $item = $vars['item'];
  $mlid = $item['link']['mlid'];
  $trail = $vars['trail'];
  $link_attributes = array();
  $menu_config = $vars['menu_config'];
  $item_config = isset($menu_config[$mlid]['item_config']) ? $menu_config[$mlid]['item_config'] : array();
  tb_megamenu_edit_item_config($item_config);
  $vars['item']['link']['#attributes']['class'][] = $item_config['class'];
}

function superblog_preprocess_list_sharepost(&$variables)
{

}
function superblog_preprocess_sharepost_facebook(&$variable) {
  $variable['text'] = '<i class="icon-facebook22"></i>';
  $variable['attributes']['attributes']['class'][] = 'hover-effect-border-right';
}
function superblog_preprocess_sharepost_google(&$variable) {
  $variable['text'] = '<i class="icon-googleplus3"></i>';
  $variable['attributes']['attributes']['class'][] = 'hover-effect-border-right';
}
function superblog_preprocess_sharepost_twitter(&$variable) {
  $variable['text'] = '<i class="icon-twitter22"></i>';
  $variable['attributes']['attributes']['class'][] = 'hover-effect-border-right';
}
function superblog_preprocess_sharepost_pinterest(&$variable) {
  $variable['text'] = '<i class=" icon-pinterest4"></i>';
  $variable['attributes']['attributes']['class'][] = 'hover-effect-border-right';
}
function superblog_preprocess_field(&$vars)
{
  if($vars['element']['#entity_type'] == 'node') {
    $vars['theme_hook_suggestions'][] = 'field__' . $vars['element']['#field_name'] . '_' . $vars['element']['#bundle'];
    $vars['theme_hook_suggestions'][] = 'field__' . $vars['element']['#field_name'] . '_' . $vars['element']['#bundle'] . '_' . $vars['element']['#view_mode'];
  }
}


function superblog_theme(){

  $items['search_form_header'] = array(
      'render element' => 'form',
      'template' => 'search-form-header',
      'path'     => drupal_get_path('theme','superblog').'/templates/search',
  );
  $items['search_form_page'] = array(
      'render element' => 'form',
      'template' => 'search-form-page',
      'path'     => drupal_get_path('theme','superblog').'/templates/search',
  );
  $items['contact_site_form'] = array(
      'render element' => 'form',
      'template' => 'contact-site-form',
      'path'     => drupal_get_path('theme','superblog').'/templates/contact'
  );

  $items['commerce_cart_add_to_cart_form'] = array(
      'render element' => 'form',
      'template' => 'commerce-cart-add-to-cart-form',
      'path' => drupal_get_path('theme','superblog') . '/templates/forms',
  );
  $items['commerce_cart_add_to_cart_form_full'] = array(
      'render element' => 'form',
      'template' => 'commerce-cart-add-to-cart-form-full',
      'path' => drupal_get_path('theme','superblog') . '/templates/forms',
  );
  $items['commerce_cart_add_to_cart_form_teaser'] = array(
    'render element' => 'form',
    'template' => 'commerce-cart-add-to-cart-form-teaser',
    'path' => drupal_get_path('theme','superblog').'/templates/forms'
  );
  $items['search_api_ranges_block_slider_view_form'] = array(
      'render element' => 'form',
      'template' => 'search-api-ranges-slider-form',
      'path'     => drupal_get_path('theme','superblog').'/templates/search-api-ranges'
  );
  $items['item_list_facetapi_links'] = array(
      'template' => 'item-list-facetapi-links',
      'variables' => isset($items['item_list']) ? $items['item_list']['variables'] : NULL,
      'path'     => drupal_get_path('theme','superblog').'/templates/item-list'
  );

  return $items;
}

function superblog_preprocess_search_form_header(&$form){
  // = '';
  //$form['basic']['keys']['#attributes']['placeholder'] = t('Search here...');
}

function superblog_form_commerce_cart_add_to_cart_form_alter(&$form,&$form_state){

  if(!isset($form_state['#nid']))
  {
    $form_state['#nid'] = get_display_node_by_product_id($form['product_id']['#value']);
  }
  if(isset($form_state['#nid']))
  {
    $form['#nid'] = get_display_node_by_product_id($form['product_id']['#value']);
  }
}

function superblog_commerce_cart_empty_block() {
  return '<ul class="sub-menu"><li><div class="cart-empty-block">' . t('Your shopping cart is empty.') . '</div></li></ul>';
}

function superblog_preprocess_commerce_line_item_summary(&$variables){

  $links = commerce_line_item_summary_links();
  if(current_path() !== 'cart'){
    if(!empty($variables['links'])) {
      if (isset($links['view_cart']) && $links['view_cart']['access']) {
        $links['view_cart']['attributes']['class'][] = 'btn pull-left btn-dark';
        $variables['view_cart'] = l($links['view_cart']['title'], $links['view_cart']['href'], array('attributes' => $links['view_cart']['attributes']));
      }
      if (isset($links['checkout']) && $links['checkout']['access']) {
        $links['checkout']['attributes']['class'][] = 'btn pull-right checkout btn-primary';
        $variables['checkout'] = l($links['checkout']['title'], $links['checkout']['href'], array('attributes' => $links['checkout']['attributes']));
      }
    }
  }
}

function superblog_form_search_api_ranges_block_slider_view_form_alter(&$form,&$form_state){
  $form['submit']['#value'] = t('Filter');
  unset($form['range-from']['#title']);
  unset($form['range-to']['#title']);
  $form['range-from']['#disabled'] = TRUE;
  $form['range-to']['#disabled']  = TRUE;
}

function superblog_preprocess_contact_site_form(&$form){

  $infowindow = theme_get_setting('map_infowindow');
  $icon_marker = file_load(variable_get('superblog_marker_map'));
  $longitude = variable_get('superblog_longitude_map','');
  $latitude =  variable_get('superblog_latitude_map','');
  $icon_marker->uri = file_create_url($icon_marker->uri);
  $infowindow['value'] = str_replace(array("\n", "\r"), '', $infowindow['value']);
  $form['contact_style'] = theme_get_setting('style_contact');
  $form['address_body'] = theme_get_setting('address_body');
  $form['phone_body'] = theme_get_setting('phone_body');
  $form['email_body'] = theme_get_setting('email_body');
  $form['icon_address'] = theme_get_setting('address_icon');
  $form['icon_phone'] = theme_get_setting('phone_icon');
  $form['icon_email'] = theme_get_setting('email_icon');
  drupal_add_css(drupal_get_path('theme','superblog').'/theme-settings/autoaddress-map.css');
  drupal_add_js('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&sensor=false');
  drupal_add_js(array('superblog'=>array('superblog_longitude_map'=>$longitude,'superblog_latitude_map'=>$latitude,'marker'=>$icon_marker,'infowindow'=>$infowindow)),'setting');
  drupal_add_js(drupal_get_path('theme','superblog').'/theme-settings/autoaddress-map.js',array('type'=>'file','cache'=>false,'scope'=>'footer'));

}

function superblog_preprocess_comment_wrapper(&$variables)
{

  $node = $variables['content']['#node'];
  $count_comment = db_query('SELECT COUNT(*) FROM {comment} c WHERE c.nid = :nid',array(':nid' => $node->nid))->fetchField();

  $variables['count_comment']  = $count_comment;
}
function superblog_preprocess_links__comment(&$variables)
{

    $variables['links']['comment-delete']['title'] = '<i class="icon-trashcan2"></i>';
    $variables['links']['comment-edit']['title']   = '<i class="icon-pencil3"></i>';
    $variables['links']['comment-reply']['title']  = '<i class="icon-email3"></i>';


}
function superblog_preprocess_comment(&$variables)
{

  $comment = $variables['comment'];
  if(arg(0) == 'comment' && arg(1) == 'reply')
  {
    $variables['theme_hook_suggestions'][] = 'comment__reply';
  }
}

function superblog_pager($variables)
{
  $output     = "";
  $items      = array();
  $tags       = $variables['tags'];
  $element    = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity   = $variables['quantity'];

  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // Current is the page we are currently paged to.
  $pager_current = $pager_page_array[$element] + 1;
  // First is the first page listed by this pager piece (re quantity).
  $pager_first = $pager_current - $pager_middle + 1;
  // Last is the last page listed by this pager piece (re quantity).
  $pager_last = $pager_current + $quantity - $pager_middle;
  // Max is the maximum page number.
  $pager_max = $pager_total[$element];

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i          = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i          = 1;
  }

  // End of generation loop preparation.
  $li_first    = theme('pager_first', array(
      'text'       => (isset($tags[0]) ? $tags[0] : t('first')),
      'element'    => $element,
      'parameters' => $parameters,
  ));
  $li_previous = theme('pager_previous', array(
      'text'       => (isset($tags[1]) ? $tags[1] : t('previous')),
      'element'    => $element,
      'interval'   => 1,
      'parameters' => $parameters,
  ));
  $li_next     = theme('pager_next', array(
      'text'       => (isset($tags[3]) ? $tags[3] : t('next')),
      'element'    => $element,
      'interval'   => 1,
      'parameters' => $parameters,
  ));
  $li_last     = theme('pager_last', array(
      'text'       => (isset($tags[4]) ? $tags[4] : t('last')),
      'element'    => $element,
      'parameters' => $parameters,
  ));
  if ($pager_total[$element] > 1) {

    // Only show "first" link if set on components' theme setting
    if ($li_first) {
      $items[] = array(
          'class' => array('pager-first'),
          'data'  => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
          'class' => array('prev'),
          'data'  => $li_previous,
      );
    }
    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
            'class' => array('pager-ellipsis', 'disabled'),
            'data'  => '<span>�</span>',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            // 'class' => array('pager-item'),
              'data' => theme('pager_previous', array(
                  'text'       => $i,
                  'element'    => $element,
                  'interval'   => ($pager_current - $i),
                  'parameters' => $parameters,
              )),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            // Add the active class.
              'class' => array('active'),
              'data'  => "<span>$i</span>",
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
              'data' => theme('pager_next', array(
                  'text'       => $i,
                  'element'    => $element,
                  'interval'   => ($i - $pager_current),
                  'parameters' => $parameters,
              )),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
            'class' => array('pager-ellipsis', 'disabled'),
            'data'  => '<span>�</span>',
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
          'class' => array('next'),
          'data'  => $li_next,
      );
    }
    // // Only show "last" link if set on components' theme setting
    if ($li_last) {
      $items[] = array(
          'class' => array('pager-last'),
          'data'  => $li_last,
      );
    }

    $build = array(
        '#theme_wrappers' => array('container__pager'),
        '#attributes'     => array(
            'class' => array(
                'text-center',
            ),
        ),
        'pager'           => array(
            '#theme'      => 'item_list',
            '#items'      => $items,
            '#attributes' => array(
                'class' => array('pagination'),
            ),
        ),
    );
    return drupal_render($build);
  }
  return $output;
}

function superblog_facetapi_count(&$variables) {
  return '<span class="counter">(' .(int)$variables['count'] . ')</span>';
}

/**
 * Return HTML for deactivate widget
 * @param $variables
 * theme_facetapi_deactive_widget();
 * @return string
 */

function superblog_facetapi_deactivate_widget(&$variables) {
  return '<span class=deactive">(-)</span>';
}

/**
 * theme_facetapi_link_active()
 * @param $variables
 *
 * @return string
 */

function superblog_facetapi_link_active(&$variables)
{
  // Sanitizes the link text if necessary.
  $sanitize = empty($variables['options']['html']);
  $link_text = ($sanitize) ? check_plain($variables['text']) : $variables['text'];

  // Theme function variables fro accessible markup.
  // @see http://drupal.org/node/1316580
  $accessible_vars = array(
      'text' => $variables['text'],
      'active' => TRUE,
  );

  // Builds link, passes through t() which gives us the ability to change the
  // position of the widget on a per-language basis.
  $replacements = array(
      '!facetapi_deactivate_widget' => theme('facetapi_deactivate_widget', $variables),
      '!facetapi_accessible_markup' => theme('facetapi_accessible_markup', $accessible_vars),
      '!facetapi_text_link'         => '<span class="active">'.$link_text.'</span>',
  );
  $variables['text'] = t('!facetapi_deactivate_widget !facetapi_accessible_markup !facetapi_text_link', $replacements);
  $variables['options']['html'] = TRUE;
  return theme_link($variables);
}

/*
 *  theme_link__locale_block()
 *  @param $variabels
 */

function superblog_links__locale_block(&$variables){
  global  $language_url;
  $links = $variables['links'];
  $attributes = $variables['attributes'];
  $attributes['class'][0] = 'sub-menu';
  $heading = $variables['heading'];
  $output = '';
  if (count($links) > 0) {
    $output = '';

    // Treat the heading first if it is present to prepend it to the
    // list of links.
    if (!empty($heading)) {
      if (is_string($heading)) {
        // Prepare the array that will be used when the passed heading
        // is a string.
        $heading = array(
            'text' => $heading,
          // Set the default level of the heading.
            'level' => 'h2',
        );
      }
      $output .= '<' . $heading['level'];
      if (!empty($heading['class'])) {
        $output .= drupal_attributes(array('class' => $heading['class']));
      }
      $output .= '>' . check_plain($heading['text']) . '</' . $heading['level'] . '>';
    }

    $output .= '<ul' . drupal_attributes($attributes) . '>';

    $num_links = count($links);
    $i = 1;

    foreach ($links as $key => $link) {
      unset($link['attributes']['class']);
      $class = array($key);

      // Add first, last and active classes to the list of links to help out themers.
      if ($i == 1) {
        $class[] = 'first';
      }
      if ($i == $num_links) {
        $class[] = 'last';
      }
      if (isset($link['href']) && ($link['href'] == $_GET['q'] || ($link['href'] == '<front>' && drupal_is_front_page()))
          && (empty($link['language']) || $link['language']->language == $language_url->language)) {
        $class[] = 'active';
      }
      $output .= '<li' . drupal_attributes(array('class' => $class)) . '>';

      if (isset($link['href'])) {
        // Pass in $link as $options, they share the same keys.
        $output .= l($link['title'], $link['href'], $link);
      }
      elseif (!empty($link['title'])) {
        // Some links are actually not links, but we wrap these in <span> for adding title and class attributes.
        if (empty($link['html'])) {
          $link['title'] = check_plain($link['title']);
        }
        $span_attributes = '';
        if (isset($link['attributes'])) {
          $span_attributes = drupal_attributes($link['attributes']);
        }
        $output .= '<span' . $span_attributes . '>' . $link['title'] . '</span>';
      }

      $i++;
      $output .= "</li>\n";
    }

    $output .= '</ul>';
  }

  return $output;
}


function superblog_preprocess_media_soundcloud_audio(&$variables)
{
  $variables['classes_array'][] = 'thumbnail_large';
}

function superblog_preprocess_views_view_summary(&$vars)
{
  $view = $vars['view'];
  $vars['theme_hook_suggestions'][] = 'views_view_summary__'.$view->name.'__'.$view->current_display;
}

function superblog_form_newsletter_subscribe_form_alter(&$form,&$form_state)
{
  $form['newsletter-submit']['#attributes']['class'][] = 'btn-primary';
}

function superblog_preprocess_simple_timeline_fields(&$vars) {
  $view = & $vars['view'];
  $options = $vars['options'];
  foreach ($view->field as $id => $field) {
    $field_output = $view->field[$id]->theme($vars['row']);
    $vars['fields'][$id] = $field_output;
  }
}

function superblog_preprocess_item_list(&$variables){
  if(isset($variables['attributes']['id']) && strpos($variables['attributes']['id'],'facetapi-facet-search') !== false){
    $variables['theme_hook_suggestions'][] = 'item_list_facetapi_links';
  }
}

function superblog_commerce_price_savings_formatter_formatter(&$variables){
  $output = '<div class="price">';
  $prices = $variables['prices'];
  if(isset($prices['price']))
  {
    $output.= '<span class="price-sale">'.$prices['price']['#markup'].'</span>';
  }
  if(isset($prices['list']))
  {
    $output.= '<span class="old-price">'.$prices['list']['#markup'].'</span>';
  }
  if(isset($prices['savings']))
  {
    $output.='<span class="discount">-'.$prices['savings']['#markup'].'</span>';
  }
  $output .= '</div>';
  return $output;
}

function superblog_commerce_price_savings_formatter_inline(&$variables)
{
  $output = '<div class="price">';
  $prices = $variables['prices'];
  if(isset($prices['price']))
  {
    $output.= '<span class="price-sale">'.$prices['price']['#markup'].'</span>';
  }
  if(isset($prices['list']))
  {
    $output.= '<span class="old-price">'.$prices['list']['#markup'].'</span>';
  }
  if(isset($prices['savings']))
  {
    $output.='<span class="discount">-'.$prices['savings']['#markup'].'</span>';
  }
  $output .= '</div>';
  return $output;
}


function _process_path_page_match(){
  //$paths = explode("\n",theme_get_setting('path_page'));
  $flag_path = false;
  if(isset($paths) && count($paths) > 0){
    foreach($paths as $key => $page){
      $page = drupal_strtolower($page);
      $path = drupal_strtolower(drupal_get_path_alias($_GET['q']));
      $page_match = drupal_match_path($path, $page);
      if($path !== $_GET['q']){
        $page_match = $page_match || drupal_match_path($_GET['q'],$page);
        if($page_match){
          $flag_path = true;
        }
      }
      elseif ($page === $path) {
        $flag_path = true;
      }
      else{
        $flag_path = false;
      }
    }
  }
  return $flag_path;
}

function superblog_render_block($module, $delta) {
  $block = block_load($module, $delta);
  if(!superblog_block_visibility($block))
  {
    unset($block);
    return false;
  }
  elseif($block->theme){
    return _block_get_renderable_array(_block_render_blocks(array($block)));
  }
}

function superblog_block_visibility($block)
{
  global $user,$theme_key;
  // Build an array of roles for each block.
  $block_roles = array();
  $result = db_query('SELECT module, delta, rid FROM {block_role}');
  foreach ($result as $record) {
    $block_roles[$record->module][$record->delta][] = $record->rid;
  }
  // If a block has no roles associated, it is displayed for every role.
  // For blocks with roles associated, if none of the user's roles matches
  // the settings from this block, remove it from the block list.
  if (isset($block_roles[$block->module][$block->delta]) && !array_intersect($block_roles[$block->module][$block->delta], array_keys($user->roles))) {
    // No match.
    unset($block);

  }

  // Use the user's block visibility setting, if necessary.
  if ($block->custom != BLOCK_CUSTOM_FIXED) {
    if ($user->uid && isset($user->data['block'][$block->module][$block->delta])) {
      $enabled = $user->data['block'][$block->module][$block->delta];
    }
    else {
      $enabled = ($block->custom == BLOCK_CUSTOM_ENABLED);
    }
  }
  else {
    $enabled = TRUE;
  }

  // Limited visibility blocks must list at least one page.
  if ($block->visibility == BLOCK_VISIBILITY_LISTED && empty($block->pages)) {
    $enabled = FALSE;
  }

  if (!$enabled) {
    unset($block);

  }

  // Match path if necessary.
  if ($block->pages) {
    // Convert path to lowercase. This allows comparison of the same path
    // with different case. Ex: /Page, /page, /PAGE.
    $pages = drupal_strtolower($block->pages);
    if ($block->visibility < BLOCK_VISIBILITY_PHP) {
      // Convert the Drupal path to lowercase
      $path = drupal_strtolower(drupal_get_path_alias($_GET['q']));
      // Compare the lowercase internal and lowercase path alias (if any).
      $page_match = drupal_match_path($path, $pages);
      if ($path != $_GET['q']) {
        $page_match = $page_match || drupal_match_path($_GET['q'], $pages);
      }
      // When $block->visibility has a value of 0 (BLOCK_VISIBILITY_NOTLISTED),
      // the block is displayed on all pages except those listed in $block->pages.
      // When set to 1 (BLOCK_VISIBILITY_LISTED), it is displayed only on those
      // pages listed in $block->pages.
      $page_match = !($block->visibility xor $page_match);
    }
    elseif (module_exists('php')) {
      $page_match = php_eval($block->pages);
    }
    else {
      $page_match = FALSE;
    }
  }
  else {
    $page_match = TRUE;
  }

  return $page_match;
}

function get_display_node_by_product_id($product_id) {

  $fields = field_info_fields();
  $query = new EntityFieldQuery;
  $result = $query->entityCondition('entity_type', 'node', '=');
  foreach($fields as $name_field => $field)
  {
    if(isset($field['columns']['product_id']) && $field['type'] == 'commerce_product_reference' && preg_match('/field/',$field['field_name'])) {
      $result = $query->fieldCondition('field_products','product_id',$product_id,'=');
    }
  }
  $result = $query->range(0,1)->execute();

  if (empty($result['node'])) {
    return FALSE;
  }
  return reset($result['node'])->nid;
}

function array_filter_key($matches,array $array)
{
  $matchedKeys = preg_grep($matches, array_keys($array));
  return array_intersect_key($array, array_flip($matchedKeys));
}
function _flag_compare($nid,$classes = null)
{
  if(module_enable(array('flag')) && module_exists('flag')) {
    $flag_compare  = flag_load('compare');;
    $class_flag = '';
    if ($flag_compare) {
      if (flag_get_entity_flags('node',$nid, 'compare')) {
        $compare = flag_flag_link($flag_compare, 'unflag',$nid);
        $class_flag   = 'actived';
      }
      else {
        $compare = flag_flag_link($flag_compare, 'flag',$nid);
      }
      $link_compare = l('', $compare['href'], array(
          'query'      => $compare['query'],
          'html'       => TRUE,
          'attributes' => array('class' => array($classes .' '. $class_flag)) //'btn flag add_to_compare icon-spin-alt'
      ));
    }
    return $link_compare;
  }
}

function _flag_wishlist($nid,$classes = null)
{
  if(module_enable(array('flag')) && module_exists('flag')) {
    $flag_wishlist  = flag_load('wishlist');
    $class_flag = '';
    if ($flag_wishlist) {
      if (flag_get_entity_flags('node', $nid, 'wishlist')) {
        $wishlist = flag_flag_link($flag_wishlist, 'unflag',$nid);
        $class_flag    = 'actived';
      }
      else {
        $wishlist = flag_flag_link($flag_wishlist, 'flag',$nid);
      }
      $link_wishlist = l('', $wishlist['href'], array(
          'query'      => $wishlist['query'],
          'html'       => TRUE,
          'attributes' => array('class' => array($classes .' '. $class_flag)) //btn flag  add_to_wishlist icon-heart
      ));
    }
    return $link_wishlist;
  }
}


function superblog_qt_quicktabs($variables) {
  $element = $variables['element'];
  $element['#options']['attributes']['class'].= ' tab-section-01 tab-style-1 jv_tabs_fix';
  $output = '<div '. drupal_attributes($element['#options']['attributes']) .'>';
  $output .= drupal_render($element['tabs']);

  $output .= drupal_render($element['container']);

  $output .= '</div>';
  return $output;
}

function superblog_qt_quicktabs_tabset($vars) {
  $variables = array(
      'attributes' => array(
          'class' => 'tablist quicktabs-tabs quicktabs-style-' . $vars['tabset']['#options']['style'],
      ),
      'items' => array(),
  );
  foreach (element_children($vars['tabset']['tablinks']) as $key) {
    $item = array();
    if (is_array($vars['tabset']['tablinks'][$key])) {
      $tab = $vars['tabset']['tablinks'][$key];
      $tab['#options']['html'] = TRUE;
      if ($key == $vars['tabset']['#options']['active']) {
        $item['class'] = array('active');
      }
      $item['data'] = drupal_render($tab);
      $variables['items'][] = $item;
    }
  }
  return theme('item_list',$variables);
}

function superblog_preprocess_panels_pane(&$vars) {
  $content_system = &$vars['content_system'];
  if(module_exists('mod_block_title_raw') && isset($content_system->module) && isseT($content_system->delta)){
    $title_raw_check = _mod_block_variable_get($content_system->module,$content_system->delta,'mod_block_title_raw_check');
    $title_raw = _mod_block_variable_get($content_system->module,$content_system->delta,'mod_block_title_raw_text');
    if(isset($title_raw_check) && $title_raw_check == 1 && isset($title_raw)){
      $vars['title_raw_check'] = $title_raw_check;
      $vars['title_raw'] = $title_raw;
    }

  }
}

/**
 *  theme_boostrap_threecol_stacked()
 * @param $variables
 */

function superblog_preprocess_bootstrap_threecol_stacked(&$variables){

  $page = page_manager_get_current_page();
  if(isset($page)) {
    $variables['theme_hook_suggestions'][] = 'bootstrap_threecol_stacked__' . str_replace('-', '_', $page['name']);
  }

}

function superblog_preprocess_textfield(&$variables){
  $element = $variables['element'];
  $variables['element']['#attributes']['class'][] = 'form-control';
}

function superblog_preprocess_textarea(&$variables){
  $variables['element']['#attributes']['class'][] = 'form-control';
}
function superblog_preprocess_button(&$variables){
  $variables['element']['#attributes']['class'][] = 'btn';
}
function superblog_preprocess_password(&$variables){
  $variables['element']['#attributes']['class'][] = 'form-control';
}

function superblog_form_views_form_commerce_cart_form_default_alter(&$form, &$form_state) {

  $form['actions']['#attributes']['class'][] = 'clearfix';
  $form['actions']['submit']['#attributes']['class'][] = 'btn-dark btn-md pull-left';
  $form['actions']['submit']['#theme'][] =' commerce_cart_form_button';
  $form['actions']['submit']['#value'] = t('Update Cart');

  $form['actions']['checkout']['#attributes']['class'][] = 'btn-primary btn-md pull-right';
  $form['actions']['checkout']['#value'] = t('Process to Checkout');

}

function superblog_commerce_price_formatted_components($variables) {
  // Add the CSS styling to the table.
  drupal_add_css(drupal_get_path('module', 'commerce_price') . '/theme/commerce_price.theme.css');

  // Build table rows out of the components.
  $rows = array();

  foreach ($variables['components'] as $name => $component) {
    $rows[] = array(
        'data' => array(
            array(
                'data' => $component['title'],
                'class' => array('component-title'),
            ),
            array(
                'data' => $component['formatted_price'],
                'class' => array('component-total'),
            ),
        ),
        'class' => array(drupal_html_class('component-type-' . $name)),
    );
  }

  return '<div class="table-responsive">'.theme('table', array('rows' => $rows, 'attributes' => array('class' => array('table commerce-price-formatted-components')))).'</div>';
}

function superblog_form_commerce_checkout_form_checkout_alter(&$form, &$form_state) {

  $form['#attributes']['class'][] = 'form' ;
  $customer_address = $form['customer_profile_billing']['commerce_customer_address']['und'];
  $form['customer_profile_billing']['commerce_customer_address']['#prefix'] ='<div class="row"><div class="col-md-12">';
  $form['customer_profile_billing']['commerce_customer_address']['#suffix'] ='</div></div>';
  $customer_address['country']['#attributes']['class'][] = 'form-control';
  $customer_address['name_block']['name_line']['#attributes']['class'][] = 'form-submit';
  $form['buttons']['continue']['#attributes']['class'][] = 'btn-submit-form form-submit pull-left';
  $form['buttons']['cancel']['#prefix'] = '&nbsp;';
  $form['buttons']['cancel']['#attributes']['class'][] = 'btn-13 text-uppercase pull-right';

}

function superblog_commerce_checkout_review($variables) {
  $form = $variables['form'];

  // Turn the review data array into table rows.
  $rows = array();

  foreach ($form['#data'] as $pane_id => $data) {
    // First add a row for the title.
    $rows[] = array(
        'data' => array(
            array('data' => $data['title'], 'colspan' => 2),
        ),
        'class' => array('pane-title', 'odd'),
    );

    // Next, add the data for this particular section.
    if (is_array($data['data'])) {
      // If it's an array, treat each key / value pair as a 2 column row.
      foreach ($data['data'] as $key => $value) {
        $rows[] = array(
            'data' => array(
                array('data' => $key .':', 'class' => array('pane-data-key')),
                array('data' => $value, 'class' => array('pane-data-value')),
            ),
            'class' => array('pane-data', 'even'),
        );
      }
    }
    else {
      // Otherwise treat it as a block of text in its own row.
      $rows[] = array(
          'data' => array(
              array('data' => $data['data'], 'colspan' => 2, 'class' => array('pane-data-full')),
          ),
          'class' => array('pane-data', 'even'),
      );
    }
  }

  return '<div class="table-responsive">'.theme('table', array('rows' => $rows, 'attributes' => array('class' => array('table checkout-review')))).'</div>';
}

function superblog_form_commerce_checkout_form_review_alter(&$form, &$form_state) {
  $form['buttons']['continue']['#attributes']['class'][] = 'btn-submit-form pull-left';
  $form['buttons']['back']['#prefix'] = '&nbsp;';
  $form['buttons']['back']['#attributes']['class'][] = 'pull-right';
}
