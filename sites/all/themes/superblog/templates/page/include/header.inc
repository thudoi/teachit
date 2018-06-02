<!-- Top Pannel -->
<?php
    if (!$logo = theme_get_setting('logo_path')) {
      $logo = theme_get_setting('logo');
    }
    if($page['top_ads']):
    global $base_url;
    $bg_img = variable_get('mod_superblog_header_bg');
      if(strpos( $_SERVER['HTTP_HOST'], 'education') !== false){
        $brand =  "/sites/all/themes/superblog/assets/images/edu_brand.png";
        $nav = '
        <li ><a class="color-white" href="http://ell.teachit.education/">ELL</a></li>
        <li ><a class="color-white" href="http://ela.teachit.education/">ELA</a></li>
        <li ><a class="color-white" href="http://civics.teachit.education/">Civics</a></li>
        <li ><a class="color-white" href="http://socialjustice.teachit.education/">Social Justice</a></li>
        <li ><a class="color-white" href="http://math.teachit.education/">Math</a></li>
        <li ><a class="color-white" href="http://science.teachit.education/">Science</a></li>
        ';
      }else{
        $brand =  "/sites/all/themes/superblog/assets/images/brand.png";
        $nav = '
                            <li ><a class="color-white" href="http://black.teachit.media">Black Thoughts Today</a></li>
                            <li><a class="color-white" href="http://iamreal.hiphop">I Am Real Hip Hop</a></li>
                            <li><a class="color-white" href="http://live.teachit.media">Live Life Outloud</a></li>
                            <li><a class="color-white" href="http://offyear.teachit.media">Off Year</a></li>
                            <li><a class="color-white" href="http://oliver.teachit.media">Oliver\'s Twist</a></li>
                            <li><a class="color-white" href="http://brothers.teachit.media">The Brothers Brunch</a></li>
                            <li><a class="color-white" href="http://dopedads.teachit.media">We Are Dope Dads</a></li>
                            <li><a class="color-white" href="http://arianna.teachit.media">Arianna</a></li>
                            <li><a class="color-white" href="http://spencer.teachit.media">Spencer </a></li>';
      }
    ?>
<div class="top-nav">
    <div class="container-fluid">
        <div class="priority-nav">
            <nav class="navbar mg-bt-0">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle bg-white" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="true">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar bg-black"></span>
                            <span class="icon-bar bg-black"></span>
                            <span class="icon-bar bg-black"></span>
                        </button>
                        <span class="logo-table navbar-brand color-white">
                            <span class="logo-table-cell">
                                <img class="logo" alt="<?php print $site_name ?>" src="<?php print $brand ?>">
                            </span>
                        </span>
                    </div>
                    <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1" aria-expanded="true" style="">
                        <ul class="nav navbar-nav">
                          <?php print $nav ?>
                        </ul>
                        <ul class="nav navbar-nav float-right">
                          <?php if(user_is_logged_in()): ?>
                            <?php global $user; ?>
                              <li><a href="<?php print base_path().'user/'.$user->uid ?>"><i class="icon-user color-white"></i></a></li>
                          <?php else: ?>
                              <li><a href="<?php print base_path().'modal_forms/nojs/login' ?>" class="ctools-use-modal ctools-modal-modal-popup-medium"><i class="icon-user11 color-white"></i></a></li>
                          <?php endif; ?>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</div>
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