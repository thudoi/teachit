
<div class="shopImages">
    <div class="imgMainProduct  owl-carousel">
            <?php foreach($items as $delta => $item){ ?>
                <div class="item">
                <?php print render($item); ?>
                <a class="zoom zoom-item" href="<?php print file_create_url($item['#item']['uri']) ?>" rel="prettyPhoto[gallery2]"><i class="icon-expand4"></i></a>
                </div>
            <?php } ?>
    </div>
    <br />
    <div class="imgsubproduct  owl-carousel space10">
        <?php foreach($items as $delta => $item){ ?>
        <div class="item">
            <img src="<?php print file_create_url($item['#item']['uri']) ?>" alt="product" />
        </div>
        <?php } ?>
    </div>
</div>
