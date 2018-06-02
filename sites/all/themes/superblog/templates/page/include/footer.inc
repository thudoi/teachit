<?php if($page['footer_first'] || $page['footer_second'] || $page['footer_third'] || $page['footer_four']): ?>
<section id="Bottom">
      <div class="container">
          <div class="row">

            <?php if($page['footer_first']){ ?>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <?php print render($page['footer_first']) ?>
              </div>
            <?php } ?>
            <?php if($page['footer_second']){ ?>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <?php print render($page['footer_second']) ?>
              </div>
            <?php } ?>
            <?php if($page['footer_third']){ ?>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <?php print render($page['footer_third']) ?>
              </div>
            <?php } ?>
            <?php if($page['footer_four']){ ?>
              <div class="col-md-3 col-sm-3 col-xs-12">
                <?php print render($page['footer_four']); ?>
              </div>
            <?php } ?>
          </div>
      </div>
</section>
<?php endif; ?>
<?php if($page['copyright']): ?>
<footer id="Footer">
  <div class="container">
        <?php print render($page['copyright']); ?>
  </div>
</footer>
<?php endif; ?>