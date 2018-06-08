<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1">
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-7327551032865446",
            enable_page_level_ads: true
        });
    </script>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <?php if(isset($color_default)){ ?>
    <link id="default_color" rel="stylesheet" href="<?php print base_path().drupal_get_path('theme','superblog')?>/assets/css/colors/<?php print $color_default ?>/color.css" media="all">
 <?php } ?>
</head>
<body class="<?php print $classes; ?>" <?php print $attributes;?>>
<?php print $page_top; ?>
<?php print $page; ?>
<?php print $page_bottom; ?>
<?php include_once 'switcher.inc';?>
<a id="back-top" class="icon-arrow-up82 show" href="#"></a>
</body>
</html>
