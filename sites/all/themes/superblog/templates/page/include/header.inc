<!-- Top Pannel -->
<?php
    if (!$logo = theme_get_setting('logo_path')) {
      $logo = theme_get_setting('logo');
    }
    if($page['top_ads']):
    global $base_url;
    $bg_img = variable_get('mod_superblog_header_bg');
    ?>
<div id="top_ads">
  <div class="container">
      <div class="col-xs-12 col-md-12">
        <?php print render($page['top_ads']);?>
      </div>
    </div>
  </div>
<?php endif; ?>
<?php if($page['top_panel']): ?>
    <div class="col-xs-12 col-md-12 top-panel">
        <?php print render($page['top_panel']);?>
    </div>
<?php endif; ?>
<?php if($page['panel_top_left']|| $page['panel_top_right']): ?>
<div id="top_panel" style="background-image: url(&quot;<?php print $base_url; ?>/sites/default/files/background_title/3145802274_a5471be079_o.jpg&quot;); background-position: 50% 0px; background-repeat: no-repeat;background-size: cover;" data-stellar-background-ratio="0.5">
    <div class="container">
        <div class="row">
        <?php if($page['panel_top_left']):?>
            <div class="col-xs-6 col-md-6 pull-left">
                <?php print render($page['panel_top_left']);?>
            </div>
        <?php endif; ?>
        <?php if($page['panel_top_right']):?>
            <div class="col-xs-6 col-md-6 pull-right">
                <?php  print render($page['panel_top_right']); ?>
            </div>
        <?php endif; ?>
        </div>
    </div>
</div>
<?php endif; ?>
<div class="clearfix"></div>
<!-- End Top Panel -->
<!-- Header Navigation -->
<header class="header-headroom headroom scrolling-up headroom--top" id="header">
    <?php $search = drupal_get_form('search_form');$search['#theme'][] = 'search_form_header' ?>
    <?php if(isset($search)): ?>
    <div id="top_search">
        <div class="container">
            <?php print render($search); ?>
            <a href="javascript:void(0)" class="btn-search"><i class="icon-cancel3"></i></a>
        </div>
    </div>
    <?php endif; ?>
    <div class="container">
        <a title="<?php print $site_name ?>" href="<?php print base_path() ?>" class="jvlogo logo-image" rel="home">
            <span class="logo-table">
                <span class="logo-table-cell">
                    <img class="logo-1" alt="<?php print $site_name ?>" src="<?php print image_style_url('300x100',$logo) ?>">
                    <?php if(isset($logo_mobile) && !empty($logo_mobile)): ?>
                    <img class="logo-2" alt="<?php print $site_name ?>" src="<?php print  file_create_url($logo_mobile->uri);?>">
                    <?php endif; ?>
                </span>
            </span>
        </a>
        <a href="javascript:void(0)" class="btn-search"><i class="icon-search8"></i></a>
        <?php if($page['navigation']): print render($page['navigation']); endif; ?>
        <a class="flexMenuToggle btn" href="JavaScript:void(0);">
            <span class="m1"></span>
            <span class="m2"></span>
            <span class="m3"></span>
        </a>
    </div>
</header>
<!-- End Header Navigation -->
<div id="below-mainmenu"></div>
