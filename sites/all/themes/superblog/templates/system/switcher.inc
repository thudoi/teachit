<?php if(isset($check_switch) && $check_switch): ?>
    <div id="switcher" class="hidden-xs"> <span class="show-switcher-icon "></span>
        <div class="inner-switcher">
            <div>
                <script type="text/javascript">
                    (function($){
                        $(document).ready(function(){
                            $item1 = $('body');

                            $defaul_color = $('#default_color');
                            $('.themecolor .color').each(function(){
                               var color = $(this).click(function(e){
                                   $('.themecolor .color').removeClass('active');
                                   color.addClass('active');
                                   $defaul_color.attr('href',Drupal.settings.basePath+Drupal.settings.path_theme+'/assets/css/colors/'+color.attr('data-color')+'/color.css');
                               });
                            });
                            $('#demo-list-bg,#demo-list-box').each(function(){
                                var $btns = $(this).find('a').click(function(){
                                    $item1
                                        .removeClass($btns.filter('.active').removeClass('active').data('value'))
                                        .addClass($(this).addClass('active').data('value'));
                                });
                            });

                            $('#demo-fonts').find('select').each(function(){
                                var
                                    select = $(this).change(function(){
                                        $item1.attr('data-font' + name,select.val());
                                    }),
                                    name = select.data('assign')
                                    ;
                            });

                            //////////////////////////// switcher
                            $switcher = $('#switcher')
                            $('.show-switcher-icon').click(function(){
                                if($switcher.hasClass('show-switcher')){
                                    $switcher.removeClass('show-switcher');
                                }else{
                                    $switcher.addClass('show-switcher');
                                }
                            });

                        });

                    })(jQuery);
                </script>
                <ul class="switcher">


                    <li class="themecolor switcher-box">

                        <h5>Color theme</h5>
                        <a href="javascript:void(0)" data-color="color-1" class="color color-1">
                            <span class="color-list"><img alt="color-1" title="color-1" src="<?php print base_path().drupal_get_path('theme','superblog') ?>/assets/css/colors/color-1/thumbnail.jpg"></span>
                        </a>
                        <a href="javascript:void(0)" data-color="color-2" class="color color-2">
                            <span class="color-list"><img alt="color-2" title="color-2" src="<?php print base_path().drupal_get_path('theme','superblog') ?>/assets/css/colors/color-2/thumbnail.jpg"></span>
                        </a>
                        <a href="javascript:void(0)" data-color="color-3" class="color color-3">
                            <span class="color-list"><img alt="color-3" title="color-3" src="<?php print base_path().drupal_get_path('theme','superblog') ?>/assets/css/colors/color-3/thumbnail.jpg"></span>
                        </a>
                        <a href="javascript:void(0)" data-color="color-4" class="color color-4">
                            <span class="color-list"><img alt="color-4" title="color-4" src="<?php print base_path().drupal_get_path('theme','superblog') ?>/assets/css/colors/color-4/thumbnail.jpg"></span>
                        </a>
                        <a href="javascript:void(0)" data-color="color-5" class="color color-5">
                            <span class="color-list"><img alt="color-5" title="color-5" src="<?php print base_path().drupal_get_path('theme','superblog') ?>/assets/css/colors/color-5/thumbnail.jpg"></span>
                        </a>
                        <a href="javascript:void(0)" data-color="color-6" class="color color-6">
                            <span class="color-list"><img alt="color-6" title="color-6" src="<?php print base_path().drupal_get_path('theme','superblog') ?>/assets/css/colors/color-6/thumbnail.jpg"></span>
                        </a>
                    </li>

                    <li class="switcher-box selectbox" id="demo-fonts">
                        <h5>Font</h5>
                        <label class="rowlabel">
                            <span class="title">Body:</span>
                        <span class="wrap-input">
                        <select data-assign="body">
                            <option value="f1">Raleway</option>
                            <option value="f2">Roboto Slab</option>
                            <option value="f3">Open Sans</option>
                            <option value="f4">Oswald</option>
                            <option value="f5">Lato</option>
                            <option value="f6">Montserrat</option>
                            <option value="f7">Source Sans Pro</option>
                            <option value="f8">PT Sans</option>
                            <option value="f9">Droid Serif</option>
                        </select>
                      </span>
                        </label>
                        <label class="rowlabel">
                            <span class="title">Menu:</span>
                        <span class="wrap-input">
                        <select data-assign="menu">
                            <option value="f1">Raleway</option>
                            <option value="f2">Roboto Slab</option>
                            <option value="f3">Open Sans</option>
                            <option value="f4">Oswald</option>
                            <option value="f5">Lato</option>
                            <option value="f6">Montserrat</option>
                            <option value="f7">Source Sans Pro</option>
                            <option value="f8">PT Sans</option>
                            <option value="f9">Droid Serif</option>
                        </select>
                      </span>
                        </label>
                        <label class="rowlabel">


                            <span class="title">Title:</span>
                        <span class="wrap-input">
                        <select data-assign="header">
                            <option value="f1">Raleway</option>
                            <option value="f2">Roboto Slab</option>
                            <option value="f3">Open Sans</option>
                            <option value="f4">Oswald</option>
                            <option value="f5">Lato</option>
                            <option value="f6">Montserrat</option>
                            <option value="f7">Source Sans Pro</option>
                            <option value="f8">PT Sans</option>
                            <option value="f9">Droid Serif</option>
                        </select>
                      </span>
                        </label>

                        <div class="font-note">* Fonts are used to example. You able to use 600+ google web fonts in the backend.</div>
                    </li>
                    <li class="switcher-box ">
                        <h5>Layout Style</h5>
                        <ul class="demo-list-box row" id="demo-list-box">

                            <li class="col-sm-6"><a class=" btn wide-style" data-value="body-wide" href="javascript:void(0)">Wide</a></li>
                            <li class="col-sm-6"><a class=" btn boxed-style" data-value="body-boxed" href="javascript:void(0)">Boxed</a></li>
                            <li class="col-sm-6"><a class=" btn framed-style" data-value="body-framed" href="javascript:void(0)">Framed</a></li>
                            <li class="col-sm-6"><a class=" btn rounded-style" data-value="body-rounded" href="javascript:void(0)">Rounded</a></li>

                        </ul>
                    </li>
                    <li class="switcher-box">

                        <script>
                            jQuery(function ($){
                                var b = $('body');
                                $('.minicolors').each(function() {
                                    $(this).minicolors({
                                        control: $(this).attr('data-control') || 'hue',
                                        position: $(this).attr('data-position') || 'right',
                                        theme: 'bootstrap',
                                        change: function(v){
                                            b.css({backgroundColor: v});
                                        }
                                    });
                                });
                            });
                        </script>

                        <h5>Background  <small>Texture for Boxed, Framed, Rounded</small></h5>



                        <p class="bgcolor">
                            <input type="text" class="minicolors" placeholder="" value="" size="7" maxlength="7">
                        </p>
                        <ul class="demo-list-bg" id="demo-list-bg">
                            <li><a class=" body-bg-0" data-value="body-bg-0" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-1" data-value="body-bg-1" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-2" data-value="body-bg-2" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-3" data-value="body-bg-3" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-4" data-value="body-bg-4" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-5" data-value="body-bg-5" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-6" data-value="body-bg-6" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-7" data-value="body-bg-7" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-8" data-value="body-bg-8" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-9" data-value="body-bg-9" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-10" data-value="body-bg-10" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-11" data-value="body-bg-11" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-12" data-value="body-bg-12" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-13" data-value="body-bg-13" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-14" data-value="body-bg-14" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-15" data-value="body-bg-15" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-16" data-value="body-bg-16" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-17" data-value="body-bg-17" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-18" data-value="body-bg-18" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-19" data-value="body-bg-19" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-20" data-value="body-bg-20" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-21" data-value="body-bg-21" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-22" data-value="body-bg-22" href="javascript:void(0)"></a></li>
                            <li><a class=" body-bg-23" data-value="body-bg-23" href="javascript:void(0)"></a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
<?php endif; ?>