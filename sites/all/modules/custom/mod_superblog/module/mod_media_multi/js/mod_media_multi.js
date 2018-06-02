(function($){
        $.fn.joomlaviMasterSlider = function (opts) {
            var md_setting = Drupal.settings.mod_media_multi;
            var $self = $(this);
            var id_slider = $(this).attr('id');
                defaults = {
                    width:md_setting.width,
                    height:md_setting.height,
                    heightLimit:md_setting.heightLimit,
                    autoHeight:md_setting.autoHeight,
                    fillMode:md_setting.fillMode,
                    space:md_setting.space,
                    wheel:md_setting.wheel,
                    swipe:md_setting.swipe,
                    grabCursor:md_setting.grabCursor,
                    mouse:md_setting.mouse,
                    keyboard:md_setting.keyboard,
                    autoplay:md_setting.autoPlay,
                    loop:md_setting.loop,
                    layout:md_setting.layout,
                    fullwidth:md_setting.fullwidth,
                    endPause:md_setting.endPause,
                    smoothHeight:md_setting.smoothHeight,
                    view:md_setting.view,
                    centerControls: md_setting.centerControls,
                    speed:md_setting.speed,
                    dir:md_setting.dir,
                    controls : {
                        arrows : {autohide:false},
                        //bullets : {}
                        // more slider controls...
                    }
                },
                options = $.extend(defaults, $self.data(), opts),
                slider = new MasterSlider;

            slider.setup(id_slider, options);
            slider.control('arrows');
            slider.api.addEventListener(MSSliderEvent.RESIZE , function(){
                /* Setting audio Sound Cloud */
                if (!$self.data('settingAudio')) {
                    $self.data('settingAudio', true);
                    $('.ms-slide', $self).each( function () {


                        if ($(this).children('a').data('type') == 'sound') {
                            var $el = $(this),
                                $a = $(this).children('a'),
                                href = $el.children('a').attr('href');

                            $el.data('firstActive', true);
                            $el.on('slideActive', function (event) {
                                event.preventDefault();
                                event.stopPropagation();

                                if ($a.data('autoplay')) {
                                    if ($el.data('iframeLoaded') && ($el.index() == slider.indexActive)) {
                                        $('.ms-slide-vpbtn', $el).trigger('click');
                                        if ($el.data('firstActive')) {
                                            $el.data('firstActive', false)
                                        }
                                    }
                                }
                                if ($el.index() != slider.indexActive && $('.ms-slide-vcbtn', $el).css('display') == 'block') {
                                    $('.ms-slide-vcbtn', $el).trigger('click');

                                }
                            });
                            $el.addClass('ms-loading-audio');
                            getIdSoundCloud($el, href);
                        }
                    });
                }

                /* End Setting audio Sound Cloud */
            });

            /* Event Change Start Slide */
            slider.api.addEventListener(MSSliderEvent.CHANGE_START , function(object){
                var $selected = object.target.currentSlide.$element;

                slider.indexActive = $selected.index();
                if (slider.$previousActive) {
                    slider.$previousActive.trigger('slideActive');
                }
                $selected.trigger('slideActive');

                slider.$previousActive = $selected;
            });
            /* End Event Change Start  Slide */

            /* Get ID Sound Cloud */
            function getIdSoundCloud($el, trackUrl) {
                var Client_ID = '851ed65ddbf3f0895eb6e38b8b1a7094',
                    $buttonPlay = $('<div class="ms-slide-vpbtn"></div>'),
                    $buttonRemove = $('<div class="ms-slide-vcbtn"></div>'),
                    $iframe = $('<iframe class="ms-slide-audio" src="" width="100%" height="100%" allowfullscreen="true" scrolling="no" frameborder="no"></iframe>'),
                    id  =  'ms-audio-' + $.now(),
                    widget = SC.Widget($iframe[0]);

                $el.append($iframe);
                $el.append($buttonPlay);
                $el.append($buttonRemove);
                $buttonRemove.hide();
                $iframe.css('height', 0);
                /* Ajax query */
                $.ajax({
                    'type': 'POST',
                    'url': 'http://api.soundcloud.com/resolve.json?url=' + trackUrl + '&client_id=' + Client_ID,
                    success: function (response) {
                        var $a = $el.children('a'),
                            $img = $('img', $el),
                            trackURI = response.uri,
                            url = 'https://w.soundcloud.com/player/?url=' + trackURI;


                        $el.data('widget', widget);
                        url += '&hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"';
                        $el.data('widget', widget);
                        $el.removeClass('ms-loading-audio');
                        $iframe.attr('src', url);
                        $el.data('response', response);
                        $iframe.load( function () {
                            $el.data('iframeLoaded', true);


                            $buttonPlay.click( function () {
                                var temp = $el.data('firstActive');

                                $('.ms-slide-bgcont', $el).hide();
                                $buttonPlay.hide();
                                $buttonRemove.show();
                                $img.hide();
                                widget.play();

                                setTimeout( function () {
                                    if (($el.data('firstActive') && $a.data('time')) || (temp && $a.data('time') && $a.data('autoplay'))) {
                                        $el.data('firstActive', false);
                                        var time = parseInt($a.data('time'));
                                        if (isNaN(time)) {
                                            time = 0;
                                        }
                                        widget.seekTo(120000);
                                    }
                                }, 1000);
                                $iframe.css('height', '');

                            });
                            $buttonRemove.click( function() {
                                $('.ms-slide-bgcont', $el).show();
                                $buttonPlay.show();
                                $buttonRemove.hide();
                                widget.pause();
                                $img.show();
                                $iframe.css('height', 0);

                            });
                            $el.trigger('slideActive');
                        })
                    }
                });
                /* End Ajax query */
            }

        };
        $(document).ready( function () {
            $('.master-slider').each( function () {
                $(this).joomlaviMasterSlider();
            })
        })
 
})(jQuery);



