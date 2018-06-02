jQuery.base64 = ( function( $ ) {

    var _PADCHAR = "=",
        _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        _VERSION = "1.0";


    function _getbyte64( s, i ) {
        // This is oddly fast, except on Chrome/V8.
        // Minimal or no improvement in performance by using a
        // object with properties mapping chars to value (eg. 'A': 0)

        var idx = _ALPHA.indexOf( s.charAt( i ) );

        if ( idx === -1 ) {
            throw "Cannot decode base64";
        }

        return idx;
    }


    function _decode(s) {
        var pads = 0,
            i,
            b10,
            imax = s.length,
            x = [];

        s = String( s );

        if ( imax === 0 ) {
            return s;
        }

        if ( imax % 4 !== 0 ) {
            throw "Cannot decode base64";
        }

        if ( s.charAt( imax - 1 ) === _PADCHAR ) {
            pads = 1;

            if ( s.charAt( imax - 2 ) === _PADCHAR ) {
                pads = 2;
            }

            // either way, we want to ignore this last block
            imax -= 4;
        }

        for ( i = 0; i < imax; i += 4 ) {
            b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 ) | _getbyte64( s, i + 3 );
            x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff, b10 & 0xff ) );
        }

        switch ( pads ) {
            case 1:
                b10 = ( _getbyte64( s, i ) << 18 ) | ( _getbyte64( s, i + 1 ) << 12 ) | ( _getbyte64( s, i + 2 ) << 6 );
                x.push( String.fromCharCode( b10 >> 16, ( b10 >> 8 ) & 0xff ) );
                break;

            case 2:
                b10 = ( _getbyte64( s, i ) << 18) | ( _getbyte64( s, i + 1 ) << 12 );
                x.push( String.fromCharCode( b10 >> 16 ) );
                break;
        }

        return x.join( "" );
    }


    function _getbyte( s, i ) {
        var x = s.charCodeAt( i );

        if ( x > 255 ) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }

        return x;
    }


    function _encode( s ) {
        if ( arguments.length !== 1 ) {
            throw "SyntaxError: exactly one argument required";
        }

        s = String( s );

        var i,
            b10,
            x = [],
            imax = s.length - s.length % 3;

        if ( s.length === 0 ) {
            return s;
        }

        for ( i = 0; i < imax; i += 3 ) {
            b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 ) | _getbyte( s, i + 2 );
            x.push( _ALPHA.charAt( b10 >> 18 ) );
            x.push( _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) );
            x.push( _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) );
            x.push( _ALPHA.charAt( b10 & 0x3f ) );
        }

        switch ( s.length - imax ) {
            case 1:
                b10 = _getbyte( s, i ) << 16;
                x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _PADCHAR + _PADCHAR );
                break;

            case 2:
                b10 = ( _getbyte( s, i ) << 16 ) | ( _getbyte( s, i + 1 ) << 8 );
                x.push( _ALPHA.charAt( b10 >> 18 ) + _ALPHA.charAt( ( b10 >> 12 ) & 0x3F ) + _ALPHA.charAt( ( b10 >> 6 ) & 0x3f ) + _PADCHAR );
                break;
        }

        return x.join( "" );
    }


    return {
        decode: _decode,
        encode: _encode,
        VERSION: _VERSION
    };

}( jQuery ) );
(function($){
    $(document).ready(function() {
        //Functions
        fullWidthBox();
        scrollMenu();
        tabs();
        accordions();
        modernGallery();
        animations();
        chart();
        //formStylization();
        addReview();
        zoom();
        paralax();
        videoBg();
        loadingButton();
        productLimited();
        blurPage();
        wordRotate();
        locationSocialFeed();
        owlcarousel_slide();
        google_map();
        Counting();
        //Menu > Sidebar
        $('.menu .parent:not(".active") a').next('.sub').css('display', 'none');
        $('.menu .parent a .open-sub').click(function(event){
            event.preventDefault();

            if ($(this).closest('.parent').hasClass('active')) {
                $(this).parent().next('.sub').slideUp(600);
                $(this).closest('.parent').removeClass('active');
            } else {
                $(this).parent().next('.sub').slideDown(600);
                $(this).closest('.parent').addClass('active');
            }
        });

    });


//Calculating The Browser Scrollbar Width
    var parent, child, scrollWidth, bodyWidth;

    if (scrollWidth === undefined) {
        parent = jQuery('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
        child = parent.children();
        scrollWidth = child.innerWidth() - child.height(99).innerWidth();
        parent.remove();
    }

//Form Stylization
    function formStylization() {
        var $        = jQuery,
            radio    = 'input[type="radio"]:not(.no-styles)',
            checkbox = 'input[type="checkbox"]:not(.no-styles)';

        $(radio).wrap('<div class="new-radio"></div>');
        $('.new-radio').append('<span></span>');
        $(checkbox).wrap('<div class="new-checkbox"></div>');
        $('.new-checkbox').append('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve"><polygon fill="#1e1e1e" points="9.298,13.391 4.18,9.237 3,10.079 9.297,17 17.999,4.678 16.324,3 "/></svg>');
        $(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
        $(radio + ':checked').parent('.new-radio').addClass('checked');
        $(checkbox + ':disabled').parent().addClass('disabled');
        $(radio + ':disabled').parent().addClass('disabled');

        $('html').click(function(){
            $(radio).parent('.new-radio').removeClass('checked');
            $(radio + ':checked').parent('.new-radio').addClass('checked');
            $(checkbox).parent('.new-checkbox').removeClass('checked');
            $(checkbox + ':checked').parent('.new-checkbox').addClass('checked');
            $(radio).parent().removeClass('disabled');
            $(checkbox).parent().removeClass('disabled');
            $(radio + ':disabled').parent().addClass('disabled');
            $(checkbox + ':disabled').parent().addClass('disabled');
        });

        if(typeof($.fn.selectBox) !== 'undefined') {
            $('select:not(".without-styles")').selectBox();
        }
    }


//Full Width Box
    function fullWidthBox() {
        var $ = jQuery;

        if ($('.full-width-box.auto-width').length) {
            var windowWidth = $('body').outerWidth(),
                containerWidth    = $('.header .container').width();

            $('.full-width-box.auto-width').each(function() {
                $(this)
                    .css({
                        left  : ( containerWidth - windowWidth) / 2,
                        width : windowWidth
                    })
                    .addClass('loaded');
            });
        }
    }

//Animations
    function animations() {
        var $ = jQuery;

        $('[data-appear-animation]').each(function() {
            var $this = $(this);

            $this.addClass('appear-animation');

            if(($('body').width() + scrollWidth) > 767) {
                $this.appear(function() {
                    var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

                    if(delay > 1) $this.css('animation-delay', delay + 'ms');
                    $this.addClass($this.attr('data-appear-animation'));

                    setTimeout(function() {
                        $this.addClass('animated');
                    }, delay);
                }, {accX: 0, accY: -150});
            } else {
                $this.addClass('animated');
            }
        });

        /* Animation Progress Bars */
        $('[data-appear-progress-animation]').each(function() {
            var $this = $(this);

            $this.appear(function() {
                var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

                if(delay > 1) $this.css('animation-delay', delay + 'ms');

                $this.find('.progress-bar').addClass($this.attr('data-appear-animation'));

                setTimeout(function() {
                    $this.find('.progress-bar').animate({
                        width: $this.attr('data-appear-progress-animation')
                    }, 500, 'easeInCirc', function() {
                        $this.find('.progress-bar').animate({
                            textIndent: 10
                        }, 1500, 'easeOutBounce');
                    });
                }, delay);
            }, {accX: 0, accY: -50});
        });
    }

    var stop_duplicate = 0;



//One Page
    function scrollMenu() {
        var $            = jQuery,
            link         = $('a.scroll'),
            header       = $('.header'),
            headerHeight = header.height();

        if(($('body').width() + scrollWidth) < 991) {
            headerHeight = 0;
        }

        $(document).on('scroll', onScroll);

        link.on('click', function(e) {
            var target = $(this).attr('href'),
                $this = $(this);

            e.preventDefault();

            link.removeClass('active');
            $this.addClass('active');

            if ($(target).length) {
                $('html, body').animate({scrollTop: $(target).offset().top - headerHeight}, 600);
            }
        });

        function onScroll(){
            var scrollPos = $(document).scrollTop();

            link.each(function () {
                var currLink   = $(this),
                    refElement = $(currLink.attr('href'));

                if (
                    refElement.position().top - headerHeight <= scrollPos &&
                    refElement.position().top + refElement.height() > scrollPos) {
                    link.removeClass('active');
                    currLink.addClass('active');
                } else {
                    currLink.removeClass('active');
                }
            });
        }
    }

//Accordion
    function accordions() {
        var $ = jQuery;

        //Some open
        $('.multi-collapse .collapse').collapse({
            toggle: false
        });

        //Always open
        $('.panel a[data-toggle="collapse"]').click( function(event){
            event.preventDefault();

            if ($(this).closest('.panel').hasClass('active')) {
                if ($(this).closest('.panel-group').hasClass('one-open')) {
                    event.stopPropagation();
                }
            }
        });

        $('.collapse').on('hide.bs.collapse', function (event) {
            event.stopPropagation();

            $(this).closest('.panel').removeClass('active');
        });
        $('.collapse').on('show.bs.collapse', function () {
            $(this).closest('.panel').addClass('active');
        });

        $('.collapse.in').closest('.panel').addClass('active');
    }

//Tabs
    function tabs() {
        var $   = jQuery,
            tab = $('.nav-tabs');

        tab.find('a').click(function (e) {
            // e.preventDefault();

            $(this).tab('show');
        });

        if (($('body').width() + scrollWidth) < 768 && (!tab.hasClass('no-responsive')))
        {
            tab.each(function(){
                var $this = $(this);

                if (!$this.next('.tab-content').hasClass('hidden') && !$this.find('li').hasClass('dropdown')) {
                    $this.addClass('accordion-tab');

                    $this.find('a').each(function(){
                        var $this = $(this),
                            id = $this.attr('href');

                        $this.prepend('<span class="open-sub"></span>');

                        $this.closest('.nav-tabs').next('.tab-content').find(id)
                            .appendTo($this.closest('li'));
                    });

                    $this.next('.tab-content').addClass('hidden');
                }
            });

            $('.accordion-tab > li.active .tab-pane').slideDown();
        }
        else
        {
            tab.find('.tab-pane').removeAttr('style', 'display');
            tab.each(function(){
                var $this = $(this);

                if ($this.next('.tab-content').hasClass('hidden')) {
                    $this.removeClass('accordion-tab');

                    $this.find('a').each(function(){
                        var $this = $(this),
                            id = $this.attr('href');

                        $($this.closest('li').find('.tab-pane'))
                            .appendTo($this.closest('.nav-tabs').next('.tab-content'));
                    });

                    $this.next('.tab-content').removeClass('hidden');
                }
            });
        }

        $('.accordion-tab > li > a').on('shown.bs.tab', function (e) {
            if (($('body').width() + scrollWidth) < 768) {
                var $this = $(this),
                    tab = $this.closest('li');

                e.preventDefault();

                $this
                    .closest('.accordion-tab')
                    .find('.tab-pane').not(tab.find('.tab-pane'))
                    .removeClass('active')
                    .slideUp();
                tab.find('.tab-pane')
                    .addClass('active')
                    .slideDown();

                $('html, body').on("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
                    $('html, body').stop();
                });

                setTimeout(function(){
                    $('html, body').animate({
                        scrollTop: $this.offset().top
                    }, 800);
                }, 500 );
            }
        });
    }


//Slider
    function openItem( $item ) {
        var $ = jQuery;

        $item.addClass('active');
        $item.stop().children('.slid-content').animate({
            opacity: 1
        });
    }
    function progressiveSlider() {
        var $ = jQuery,
            parameters,
            slider = $('.progressive-slider');

        slider.each(function () {
            var $this = $(this);

            if ($this.hasClass('progressive-slider-two')) {
                parameters = {
                    responsive : true,
                    auto       : true,
                    pagination : $(this).closest('.slider').find('.pagination'),
                    scroll     : {
                        duration : 1000,
                        pauseOnHover : true
                    },
                    items      : {
                        visible : 1,
                    },
                    swipe     : {
                        onMouse : false,
                        onTouch : true
                    },
                    onCreate  : function( data ) {
                        $this.find('.slider-wrapper').css('height', data.height)
                    }
                }
            } else if ($this.hasClass('progressive-slider-three')) {
                parameters = {
                    width      : '100%',
                    responsive : true,
                    auto       : true,
                    items      : {
                        visible : 1,
                    },
                    scroll     : {
                        fx : 'crossfade',
                        duration : 1000,
                        pauseOnHover : true
                    },
                    swipe      : {
                        onMouse: false,
                        onTouch: true
                    }
                }
            } else if ($this.hasClass('progressive-slider-four')) {
                parameters = {
                    width      : '100%',
                    responsive : true,
                    auto       : true,
                    items      : {
                        visible : 1,
                    },
                    scroll     : {
                        duration : 1000,
                        pauseOnHover : true
                    },
                    next       : $(this).closest('.slider').find('.next'),
                    prev       : $(this).closest('.slider').find('.prev'),
                    swipe      : {
                        onMouse: false,
                        onTouch: true
                    }
                }
            } else {
                parameters = {
                    width      : '100%',
                    responsive : true,
                    scroll     : {
                        fx : 'crossfade',
                        duration : 700,
                        onBefore : function( data ) {
                            data.items.old.stop().children('.slid-content').animate({
                                opacity: 0
                            });
                        },
                        onAfter  : function( data ) {
                            openItem( data.items.visible );
                        }
                    },
                    auto       : false,
                    next       : $(this).closest('.slider').find('.next'),
                    prev       : $(this).closest('.slider').find('.prev'),
                    pagination : $(this).closest('.slider').find('.pagination'),
                    items      : {
                        visible : 1,
                    },
                    swipe      : {
                        onMouse: false,
                        onTouch: true
                    },
                    onCreate   : function( data ) {
                        openItem(data.items);
                    }
                }
            }
        });

        slider.find('.sliders-box').each(function () {
            $(this).carouFredSel(parameters).parents('.slider').removeClass('load');
        });
    }

//Banner set
    function bannerSetCarousel() {
        var $ = jQuery;

        $('.banner-set .banners').each(function () {
            var bannerSet = $(this).closest('.banner-set'),
                prev = bannerSet.find('.prev'),
                next = bannerSet.find('.next'),
                height;

            $(this).carouFredSel({
                auto       : false,
                width      : '100%',
                responsive : false,
                infinite   : false,
                next       : next,
                prev       : prev,
                pagination : bannerSet.find('.pagination'),
                swipe      : {
                    onMouse : false,
                    onTouch : true
                },
                scroll: 1,
                onCreate: function () {
                    height = $(this).height();

                    $(this).find('.banner').css({
                        height : height
                    });
                    if (bannerSet.hasClass('banner-set-mini') && bannerSet.hasClass('banner-set-no-pagination')) {
                        $(this).closest('.banner-set').find('.prev, .next').css({
                            marginTop : -((height / 2) + 7)
                        });
                    }
                }
            }).parents('.banner-set').removeClass('load');
        });
    }

//Carousel
    function carousel() {
        var $ = jQuery;

        if ($('.carousel-box .carousel').length) {
            var carouselBox = $('.carousel-box .carousel');

            carouselBox.each(function () {
                var carousel = $(this).closest('.carousel-box'),
                    swipe,
                    autoplay,
                    prev,
                    next,
                    pagitation,
                    responsive = false;

                if (carousel.hasClass('no-swipe')) {
                    swipe = false;
                } else {
                    swipe = true;
                }

                if (carousel.attr('data-carousel-autoplay') == 'true') {
                    autoplay = true;
                } else {
                    autoplay = false;
                }

                if (carousel.attr('data-carousel-nav') == 'false') {
                    next = false;
                    prev = false;
                    carousel.addClass('no-nav');
                } else {
                    next = carousel.find('.next');
                    prev = carousel.find('.prev');
                    carousel.removeClass('no-nav');
                }

                if (carousel.attr('data-carousel-pagination') == 'true') {
                    pagination = carousel.find('.pagination');
                    carousel.removeClass('no-pagination');
                } else {
                    pagination = false;
                    carousel.addClass('no-pagination');
                }

                if (carousel.attr('data-carousel-one') == 'true') {
                    responsive = true;
                }

                duration_speed = carousel.attr('data-duration') ? carousel.attr('data-duration') : 1000;

                $(this).carouFredSel({
                    onCreate : function () {
                        $(window).on('resize', function(event){
                            event.stopPropagation();
                        });
                    },
                    auto       : autoplay,
                    width      : '100%',
                    infinite   : false,
                    next       : next,
                    prev       : prev,
                    pagination : pagination,
                    responsive : responsive,
                    swipe      : {
                        onMouse : false,
                        onTouch : swipe
                    },
                    scroll     : {
                        items           : 1,
                        duration        : parseInt(duration_speed),
                        pauseOnHover    : true
                    }
                }).parents('.carousel-box').removeClass('load');
            });
        }
    }

    function thumblist() {
        var $ = jQuery;

        if ($('#thumblist').length) {
            $('#thumblist').carouFredSel({
                prev  : '.thumblist-box .prev',
                next  : '.thumblist-box .next',
                width : '100%',
                auto  : false,
                swipe : {
                    onMouse : false,
                    onTouch : true
                }
            }).parents('.thumblist-box').removeClass('load');
        }
    }
// Owlcarousel
    function owlcarousel_slide()
    {

        $('.jvCarousel').each(function(index,item){
            var jv_autoplay = $(this).attr('data-autoplay');
            var jv_transition = $(this).attr('data-transitionstyle');
            var jv_items = $(this).attr('data-items');
            var jv_desktop = $(this).attr('data-itemsdesktop');
            var jv_desktopSmall = $(this).attr('data-itemsdesktopsmall');
            var jv_tablet = $(this).attr('data-itemstablet');
            var jv_mobile = $(this).attr('data-itemsmobile');
            var jv_singleItem = $(this).attr('data-singleitem');
            var jv_navigation = $(this).attr('data-navigation');
            var jv_pagination = $(this).attr('data-pagination');
            var jv_next_navi  =  ($(this).attr('data-nexttext') !== undefined) ? $.base64.decode($(this).attr('data-nexttext')) : 'undefined';
            var jv_prev_navi  =  ($(this).attr('data-prevtext') !== undefined) ? $.base64.decode($(this).attr('data-prevtext')) : 'undefined';
            $(this).owlCarousel({
                autoplay:jv_autoplay,
                loop:true,
                transitionStyle : (jv_transition !== 'undefined') ? jv_transition : false,
                items: jv_items,
                itemsDesktop: [1199,jv_desktop],
                itemsDesktopSmall: [979,jv_desktopSmall],
                itemsTablet: [768,jv_tablet],
                itemsMobile: [479,jv_mobile],

                singleItem : $.parseJSON(jv_singleItem),
                navigation: $.parseJSON(jv_navigation),
                navigationText: ( jv_next_navi !== "undefined"  && jv_prev_navi !== "undefined") ? [jv_prev_navi.split('|{').join('<').split('|}').join('>'),jv_next_navi.split('|{').join('<').split('|}').join('>')] : false,
                pagination: $.parseJSON(jv_pagination),
                mouseDrag: true,
                touchDrag: true
            });
        });
    }
//Modern Gallery
    function modernGallery() {
        var $ = jQuery;

        if(typeof($.fn.imagesLoaded) !== 'undefined') {
            var $container = $('#gallery-modern'),
                bodyWidth  = $('body').width();

            $container.imagesLoaded( function() {
                if ((bodyWidth + scrollWidth) >= 1200) {
                    $container.masonry({
                        columnWidth: 300,
                        itemSelector: '.images-box'
                    });
                } else if ((bodyWidth + scrollWidth) <= 1199 && (bodyWidth + scrollWidth) ) {
                    $container.masonry({
                        columnWidth: 242.5,
                        itemSelector: '.images-box'
                    });
                } else if ((bodyWidth + scrollWidth) <= 979 && (bodyWidth + scrollWidth) >= 768 ) {
                    $container.masonry({
                        columnWidth: 187.5,
                        itemSelector: '.images-box'
                    });
                }
            });
        }
    }

//Chart
    function chart() {
        var $ = jQuery;

        $('.chart').each(function () {
            console.log($this);
            var $this             = $(this),
                line              = [],
                type              = 'line',
                width             = '100%',
                height            = '225',
                lineColor         = '#e1e1e1',
                fillColor         = 'rgba(0, 0, 0, .05)',
                spotColor         = '#a9a8a8',
                minSpotColor      = '#c6c6c6',
                maxSpotColor      = '#727070',
                verticalLineColor = '#e1e1e1',
                spotColorHovered  = '#1e1e1e',
                lineWidth         = 2,
                barSpacing        = 8,
                barWidth          = 18,
                barColor          = 'rgba(0, 0, 0, .2)',
                offset            = 0,
                sliceColors       = [],
                colorMap          = [],
                rangeColors       = ['#d3dafe', '#a8b6ff', '#7f94ff'],
                posBarColor	      = '#c6c6c6',
                negBarColor	      = '#727070',
                zeroBarColor      = '#a9a8a8',
                performanceColor  = '#575656',
                targetWidth       = 5,
                targetColor       = '#1e1e1e';

            if ($this.attr('data-line') !== undefined && $this.attr('data-line') !== false) {
                line = $this.attr('data-line').split(/,/);
            }
            if ($this.attr('data-height') !== undefined && $this.attr('data-height') !== false) {
                height = $this.attr('data-height');
            }
            if ($this.attr('data-line-width') !== undefined && $this.attr('data-line-width') !== false) {
                lineWidth = $this.attr('data-line-width');
            }
            if ($this.attr('data-line-color') !== undefined && $this.attr('data-line-color') !== false) {
                lineColor = $this.attr('data-line-color');
            }
            if ($this.attr('data-vertical-line-color') !== undefined && $this.attr('data-vertical-line-color') !== false) {
                verticalLineColor = $this.attr('data-vertical-line-color');
            }
            if ($this.attr('data-spot-color-hovered') !== undefined && $this.attr('data-spot-color-hovered') !== false) {
                spotColorHovered = $this.attr('data-spot-color-hovered');
            }
            if ($this.attr('data-spot-color') !== undefined && $this.attr('data-spot-color') !== false) {
                spotColor = $this.attr('data-spot-color');
            }
            if ($this.attr('data-min-spot-color') !== undefined && $this.attr('data-min-spot-color') !== false) {
                minSpotColor = $this.attr('data-min-spot-color');
            }
            if ($this.attr('data-max-spot-color') !== undefined && $this.attr('data-max-spot-color') !== false) {
                maxSpotColor = $this.attr('data-max-spot-color');
            }
            if ($this.attr('data-bar-spacing') !== undefined && $this.attr('data-bar-spacing') !== false) {
                barSpacing = $this.attr('data-bar-spacing');
            }
            if ($this.attr('data-bar-width') !== undefined && $this.attr('data-bar-width') !== false) {
                barWidth = $this.attr('data-bar-width');
            }
            if ($this.attr('data-bar-color') !== undefined && $this.attr('data-bar-color') !== false) {
                barColor = $this.attr('data-bar-color');
            }
            if ($this.attr('data-color-map') !== undefined && $this.attr('data-color-map') !== false) {
                colorMap = $this.attr('data-color-map').split(/, /);
            }
            if ($this.attr('data-offset') !== undefined && $this.attr('data-offset') !== false) {
                offset = $this.attr('data-offset');
            }
            if ($this.attr('data-slice-colors') !== undefined && $this.attr('data-slice-colors') !== false) {
                sliceColors = $this.attr('data-slice-colors').split(/, /);
            }
            if ($this.attr('data-range-colors') !== undefined && $this.attr('data-range-colors') !== false) {
                rangeColors = $this.attr('data-range-colors').split(/, /);
            }
            if ($this.attr('data-target-width') !== undefined && $this.attr('data-target-width') !== false) {
                targetWidth = $this.attr('data-target-width');
            }
            if ($this.attr('data-pos-bar-color') !== undefined && $this.attr('data-pos-bar-color') !== false) {
                posBarColor = $this.attr('data-pos-bar-color');
            }
            if ($this.attr('data-neg-bar-color') !== undefined && $this.attr('data-neg-bar-color') !== false) {
                negBarColor = $this.attr('data-neg-bar-color');
            }
            if ($this.attr('data-performance-color') !== undefined && $this.attr('data-performance-color') !== false) {
                performanceColor = $this.attr('data-performance-color');
            }
            if ($this.attr('data-fill-color') !== undefined && $this.attr('data-fill-color') !== false) {
                fillColor = $this.attr('data-fill-color');
            }
            if ($this.attr('data-type') == 'bar') {
                type = 'bar';
            }
            if ($this.attr('data-type') == 'pie') {
                type = 'pie';
                width = 'auto';
            }
            if ($this.attr('data-type') == 'discrete') {
                type = 'discrete';
            }
            if ($this.attr('data-type') == 'tristate') {
                type = 'tristate';
            }
            if ($this.attr('data-type') == 'bullet') {
                type = 'bullet';
            }
            if ($this.attr('data-type') == 'box') {
                type = 'box';
            }

            $this.sparkline(line, {
                type               : type,
                width              : width,
                height             : height,
                lineColor          : lineColor,
                fillColor          : fillColor,
                lineWidth          : lineWidth,
                spotColor          : spotColor,
                minSpotColor       : minSpotColor,
                maxSpotColor       : maxSpotColor,
                highlightSpotColor : spotColorHovered,
                highlightLineColor : verticalLineColor,
                spotRadius         : 6,
                chartRangeMin      : 0,
                barSpacing         : barSpacing,
                barWidth           : barWidth,
                barColor           : barColor,
                offset             : offset,
                sliceColors        : sliceColors,
                colorMap           : colorMap,
                posBarColor	     : posBarColor,
                negBarColor	     : negBarColor,
                zeroBarColor       : zeroBarColor,
                rangeColors        : rangeColors,
                performanceColor   : performanceColor,
                targetWidth        : targetWidth,
                targetColor        : targetColor
            });
        });
    }

//Portfolio Filter
    function isotopFilter() {
        var $ = jQuery;

        $('.portfolio, .filter-box').each(function () {
            var filterBox   = $(this),
                filterElems = filterBox.find('.filter-elements'),
                buttonBox   = filterBox.find('.filter-buttons'),
                selector    = filterBox.find('.filter-buttons .active').attr('data-filter');

            if (!filterBox.hasClass('accordions-filter')) {
                filterElems.isotope({
                    filter: selector,
                    layoutMode: 'fitRows'
                });
                buttonBox.find('.dropdown-toggle').html(filterBox.find('.filter-buttons .active').text() + '<span class="caret"></span>')
            }

            buttonBox.find('a').on('click', function(e){
                var selector = $(this).attr('data-filter');
                e.preventDefault();

                if (!$(this).hasClass('active')) {
                    buttonBox.find('a').removeClass('active');
                    $(this).addClass('active');
                    buttonBox.find('.dropdown-toggle').html($(this).text() + '<span class="caret"></span>')
                    if (filterBox.hasClass('accordions-filter')) {
                        filterElems.children().children().not(selector)
                            .animate({ height : 0 })
                            .addClass('e-hidden');
                        filterElems.find(selector)
                            .animate({ height : '100%' })
                            .removeClass('e-hidden');
                    } else {
                        filterElems.isotope({
                            filter: selector,
                            layoutMode: 'fitRows'
                        });
                    }
                }
            });
        });
    }

//Add your review
    function addReview() {
        var $ = jQuery;

        $('a[href="#reviews"].add-review').click(function(){
            $('.product-tab a[href="#reviews"]').trigger('click');

            $('html, body').animate({
                scrollTop: $("#reviews").offset().top
            }, 1000);
        });
    }

// Zoomer
    function zoom() {
        var $ = jQuery;

        if ($.fn.elevateZoom) {
            var image      = $('.general-img').find('img'),
                zoomType,
                zoomWidth  = 470,
                zoomHeight = 470,
                zoomType   = 'window';

            if (($('body').width() + scrollWidth) < 992) {
                zoomWidth  = 0;
                zoomHeight = 0;
                zoomType   = 'inner';
            }

            image.removeData('elevateZoom');
            $('.zoomContainer').remove();

            image.elevateZoom({
                gallery            : 'thumblist',
                cursor             : 'crosshair',
                galleryActiveClass : 'active',
                zoomWindowWidth    : zoomWidth,
                zoomWindowHeight   : zoomHeight,
                borderSize         : 0,
                borderColor        : 'none',
                lensFadeIn         : true,
                zoomWindowFadeIn   : true,
                zoomType		     : zoomType
            });
        }
    }

//Blur
    function blur() {
        var $ = jQuery;

        $('.full-width-box .fwb-blur').each(function () {
            var blurBox = $(this),
                img     = new Image(),
                amount  = 2,
                prependBox = '<div class="blur-box"></div>';

            img.src = blurBox.attr('data-blur-image');

            if (
                blurBox.attr('data-blur-amount') !== undefined &&
                blurBox.attr('data-blur-amount') !== false
            )
                amount = blurBox.attr('data-blur-amount');

            img.onload = function() {
                Pixastic.process(img, "blurfast", {
                    amount: amount
                });
            }

            if (blurBox.hasClass('paralax')) {
                prependBox = '<div class="blur-box" data-stellar-ratio="0.5"></div>';
            }

            blurBox
                .prepend( prependBox )
                .find('.blur-box')
                .prepend( img )
            setTimeout(function(){
                $('body').addClass('blur-load');
            }, 0 );
        });
    }

    function blurPage() {
        var $ = jQuery;

        if ($('.blur-page').length) {
            var blurBox = $('.blur-page');

            blurBox.each(function () {
                var $this = $(this),
                    img     = new Image(),
                    amount  = 2,
                    prependBox = '<div class="blur-box"></div>';

                img.src = $this.attr('data-blur-image');

                if (
                    $this.attr('data-blur-amount') !== undefined &&
                    $this.attr('data-blur-amount') !== false
                )
                    amount = $this.attr('data-blur-amount');

                img.onload = function() {
                    Pixastic.process(
                        img,
                        'blurfast',
                        {
                            amount: amount
                        },
                        function(){
                            $('.blur-page').addClass('blur-load')
                        }
                    );
                }

                $this.prepend( prependBox ).find('.blur-box').prepend( img );
            });
        }
    }

//Paralax
    function paralax() {
        var $ = jQuery;

        if(typeof($.fn.stellar) !== 'undefined') {
            if(!navigator.userAgent.match(/iPad|iPhone|Android/i) && ($('body').width() + scrollWidth) >= 979) {
                $('body').stellar({
                    horizontalScrolling: false,
                    verticalOffset: 0,
                    horizontalOffset: 0,
                    responsive: true,
                    scrollProperty: 'scroll',
                    parallaxElements: false,
                });
            }
        }
    }

//Video Background
    function videoBg() {
        var $ = jQuery;

        if(typeof($.fn.tubular) !== 'undefined') {
            var id,
                options,
                poster,
                youtube = $('.fwb-youtube-video');

            if (
                youtube.attr('data-youtube-videoId') !== undefined &&
                youtube.attr('data-youtube-videoId') !== false) {
                id = youtube.attr('data-youtube-videoId');
            }

            if (
                youtube.attr('data-youtube-poster') !== undefined &&
                youtube.attr('data-youtube-poster') !== false) {
                poster = youtube.attr('data-youtube-poster');
            }

            options = {
                videoId: id,
                start: 0,
                wrapperZIndex: -1,
                mute: true,
                width: $('body').width()
            }

            if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
                youtube.css('background-image', "url('"+poster+"')");
            } else {
                youtube.tubular(options);
            }
        }
    }



    function loadingButton() {
        var $ = jQuery;

        loading = function(){
            if ($('.ladda-button.progress-button').length) {
                Ladda.bind('.ladda-button:not(.progress-button)', {
                    timeout: 2000
                });

                Ladda.bind('.ladda-button.progress-button', {
                    callback: function(instance) {
                        var interval,
                            progress;

                        progress = 0;

                        return interval = setInterval(function() {
                            progress = Math.min(progress + Math.random() * 0.1, 1);
                            instance.setProgress(progress);
                            if (progress === 1) {
                                instance.stop();
                                return clearInterval(interval);
                            }
                        }, 200);
                    }
                });
            }
        }

        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
            var ieversion = new Number(RegExp.$1);

            if (ieversion >= 9) {
                loading();
            }
        } else {
            loading();
        }
    }

    function productLimited() {
        var $ = jQuery;

        if ($('.product .limit-offer').length){
            var product = $('.product .limit-offer'),
                endDateTime = '';

            product.each(function () {
                var $this = $(this);

                if (
                    $this.attr('data-end') !== undefined &&
                    $this.attr('data-end') !== false) {
                    endDateTime = $this.attr('data-end');
                } else {
                    endDateTime = '';
                }

                $this.county({
                    endDateTime: new Date(endDateTime),
                    animation: 'scroll',
                    reflection: false
                });
            });
        }
    }

//Google Map
    function google_map() {
        var $ = jQuery,
            mapCanvas = $('.map-canvas');

        mapCanvas.each(function () {
            var $this           = $(this),
                zoom            = 8,
                lat             = -34,
                lng             = 150,
                scrollwheel     = false,
                draggable       = true,
                mapType         = google.maps.MapTypeId.ROADMAP,
                title           = '',
                contentString   = '',
                dataZoom        = $this.attr('data-zoom'),
                dataLat         = $this.attr('data-lat'),
                dataLng         = $this.attr('data-lng'),
                dataType        = $this.attr('data-type'),
                dataScrollwheel = $this.attr('data-scrollwheel'),
                dataHue         = $this.attr('data-hue'),
                dataTitle       = $this.attr('data-title'),
                dataContent     = $this.html();
            //$this.html('');

            if (dataZoom !== undefined && dataZoom !== false) {
                zoom = parseFloat(dataZoom);
            }

            if (dataLat !== undefined && dataLat !== false) {
                lat = parseFloat(dataLat);
            }

            if (dataLng !== undefined && dataLng !== false) {
                lng = parseFloat(dataLng);
            }

            if (dataScrollwheel !== undefined && dataScrollwheel !== false) {
                scrollwheel = dataScrollwheel;
            }

            if (dataType !== undefined && dataType !== false) {
                if (dataType == 'satellite') {
                    mapType = google.maps.MapTypeId.SATELLITE;
                } else if (dataType == 'hybrid') {
                    mapType = google.maps.MapTypeId.HYBRID;
                } else if (dataType == 'terrain') {
                    mapType = google.maps.MapTypeId.TERRAIN;
                }
            }

            if (dataTitle !== undefined && dataTitle !== false) {
                title = dataTitle;
            }

            if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
                draggable = false;
            }

            var mapOptions = {
                zoom        : zoom,
                scrollwheel : scrollwheel,
                draggable   : draggable,
                center      : new google.maps.LatLng(lat, lng),
                mapTypeId   : mapType
            };

            var map = new google.maps.Map($this[0], mapOptions);
            var image = Drupal.settings.basePath + Drupal.settings.pathmodule + '/images/map-mapker.png';


            if (dataContent !== undefined && dataContent !== false) {
                contentString = '<div class="map-content">' +
                    '<h3 class="title">' + title + '</h3>' +
                    dataContent +
                    '</div>';
            }

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            var marker = new google.maps.Marker({
                position : new google.maps.LatLng(lat, lng),
                map      : map,
                draggable: true,
                icon     : image,
                title    : title
            });

            if (dataContent !== undefined && dataContent !== false) {
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map,marker);
                });
            }

            if (dataHue !== undefined && dataHue !== false) {
                var styles = [
                    {
                        stylers : [
                            { hue : dataHue }
                        ]
                    }
                ];

                map.setOptions({styles: styles});
            }
        });
    }

    /*
     function loadScript() {
     var script = document.createElement('script');
     script.type = 'text/javascript';
     script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
     'callback=initialize';
     document.body.appendChild(script);
     }

     window.onload = function(){
     loadScript();
     }
     */
//Remove Video
    if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
        jQuery('.fwb-video').find('video').remove();
    }

//Word Rotate
    function wordRotate() {
        var $ = jQuery;

        $('.word-rotate').each(function() {
            var $this = $(this),
                wordsBox = $this.find('.words-box'),
                words = wordsBox.find('> span'),
                firstWord = words.eq(0),
                firstWordClone = firstWord.clone(),
                wordHeight,
                currentItem = 1,
                currentTop = 0;

            wordHeight = firstWord.height();

            wordsBox.append(firstWordClone);

            $this.height(wordHeight).addClass('loaded');

            setInterval(function() {
                currentTop = (currentItem * wordHeight);

                wordsBox.animate({
                    top: -(currentTop) + 'px'
                }, 300, 'easeOutQuad', function() {
                    currentItem++;

                    if(currentItem > words.length) {
                        wordsBox.css('top', 0);
                        currentItem = 1;
                    }
                });
            }, 2000);
        });
    }

//Modal Window
    function centerModal() {
        var $ = jQuery;

        $(this).css('display', 'block');

        var dialog = $(this).find('.modal-dialog'),
            offset = ($(window).height() - dialog.height()) / 2;

        if (offset < 10) {
            offset = 10;
        }
        dialog.css('margin-top', offset);
    }

//Social Feed
    function locationSocialFeed() {
        var $ = jQuery,
            socialFeed = $('.social-feed');

        if(typeof($.fn.isotope) !== 'undefined') {
            socialFeed.isotope({
                itemSelector: '.isotope-item',
            }).addClass('loaded');

            $('#load-more').click(function() {
                var item1, item2, item3, items, tmp;

                items = socialFeed.find('.item-clone');
                item1 = $(items[Math.floor(Math.random() * items.length)]).clone();
                item2 = $(items[Math.floor(Math.random() * items.length)]).clone();
                item3 = $(items[Math.floor(Math.random() * items.length)]).clone();
                tmp = $().add(item1).add(item2).add(item3);

                var images = tmp.find('img');

                images.imagesLoaded(function(){
                    return socialFeed.isotope('insert', tmp);
                });
            });
        }
    }

    jQuery(document).ready(function(){
        'use strict';
        var $ = jQuery;

        //Replace img > IE8
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
            var ieversion = new Number(RegExp.$1);

            if (ieversion < 9) {
                $('img[src*="svg"]').attr('src', function() {
                    return $(this).attr('src').replace('.svg', '.png');
                });
            }
        }

        //IE
        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){
            $('html').addClass('ie');
        }

        //Touch device
        if( navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
            $('body').addClass('touch-device');
        }

        //Meta Head
        if (document.width > 768) {
            $('.viewport').remove();
        }

        //Bootstrap Elements
        $('[data-toggle="tooltip"], .tooltip-link').tooltip();

        $("a[data-toggle=popover]")
            .popover()
            .click(function(event) {
                event.preventDefault();
            });

        $('.btn-loading').click(function () {
            var btn = $(this);

            btn.button('loading');

            setTimeout(function () {
                btn.button('reset')
            }, 3000);
        });

        $('.disabled, fieldset[disabled] .selectBox').click(function () {
            return false;
        });

        $('.modal-center').on('show.bs.modal', centerModal);

        //Bootstrap Validator
        if(typeof($.fn.bootstrapValidator) !== 'undefined') {
            $('.form-validator').bootstrapValidator({
                excluded: [':disabled', ':hidden', ':not(:visible)'],
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                message: 'This value is not valid',
                trigger: null
            });
        }

        //Bootstrap Datepicker
        if(typeof($.fn.datepicker) !== 'undefined') {
            $('.datepicker-box').datepicker({
                todayHighlight : true,
                beforeShowDay: function (date){
                    if (date.getMonth() == (new Date()).getMonth())
                        switch (date.getDate()){
                            case 4:
                                return {
                                    tooltip: 'Example tooltip',
                                    classes: 'active'
                                };
                            case 8:
                                return false;
                            case 12:
                                return "green";
                        }
                }
            });
        }

        //Revolution Slider
        if ($('.tp-banner').length) {
            var revolutionSlider = $('.tp-banner');

            if (revolutionSlider.closest('.rs-slider').hasClass('full-width')) {
                var body         = $('body'),
                    width        = body.width(),
                    topHeight    = 0,
                    headerHeight = 104,
                    height;

                if ($('#top-box').length) {
                    if (body.hasClass('hidden-top')) {
                        topHeight = $('#top-box').outerHeight() - 32;
                    }
                }

                if ((body.width() + scrollWidth) >= 1200) {
                    height = body.height() - (topHeight + headerHeight);
                } else {
                    height = 800;
                }

                revolutionSlider.revolution({
                    delay             : 6000,
                    startwidth        : 1200,
                    startheight       : height,
                    hideThumbs        : 10,
                    navigationType    : 'bullet',
                    navigationArrows  : 'solo',
                    navigationHAlign  : 'center',
                    navigationVAlign  : 'top',
                    navigationHOffset : -545,
                    navigationVOffset : 30,
                    hideTimerBar      : 'on'
                }).parents('.slider').removeClass('load');
            } else {
                revolutionSlider.revolution({
                    delay          : 6000,
                    startwidth     : 1200,
                    startheight    : 500,
                    hideThumbs     : 10,
                    navigationType : 'none',
                    onHoverStop    : 'off'
                }).parents('.slider').removeClass('load');
            }
        }

        //Royal Slider
        if(typeof($.fn.royalSlider) !== 'undefined') {
            $('.royal-slider').royalSlider({
                arrowsNav             : true,
                loop                  : false,
                keyboardNavEnabled    : true,
                controlsInside        : false,
                imageScaleMode        : 'fill',
                arrowsNavAutoHide     : false,
                autoScaleSlider       : true,
                autoScaleSliderWidth  : 960,
                autoScaleSliderHeight : 350,
                controlNavigation     : 'bullets',
                thumbsFitInViewport   : false,
                navigateByClick       : true,
                startSlideId          : 0,
                autoPlay              : false,
                transitionType        :'move',
                globalCaption         : false,
                deeplinking           : {
                    enabled : true,
                    change : true,
                    prefix : 'image-'
                },
                imgWidth              : 1920,
                imgHeight             : 700
            }).parents('.slider').removeClass('load');
        }

        //Layer Slider
        if ($('.layerslider-box').length) {
            $('.layerslider-box').layerSlider({
                skinsPath        : 'css/layerslider/skins/',
                tnContainerWidth : '100%'
            });
        }

        //Functions
        fullWidthBox();
        scrollMenu();
        tabs();
        accordions();
        modernGallery();
        animations();
        chart();
        // formStylization();
        addReview();
        zoom();
        paralax();
        videoBg();
        loadingButton();
        productLimited();
        blurPage();
        wordRotate();
        locationSocialFeed();

        //Carousel load
        $(window).on({
            load : function() {
                blur();
                progressiveSlider();
                bannerSetCarousel();
                thumblist();
                carousel();
                isotopFilter();
            }
        });

        //Language-Currency
        if( !navigator.userAgent.match(/iPad|iPhone|Android/i) ) {
            $('.language, .currency, .sort-by, .show-by').hover(function(){
                $(this).addClass('open');
            }, function(){
                $(this).removeClass('open');
            });
        }

        //Header Phone & Search
        $('.phone-header > a').click(function(event){
            event.preventDefault();
            $('.btn-group').removeClass('open');
            $('.phone-active').fadeIn().addClass('open');
        });
        $('.search-header > a').click(function(event){
            event.preventDefault();
            $('.btn-group').removeClass('open');
            $('.search-active').fadeIn().addClass('open');
        });

        $('.phone-active .close, .search-active .close').click(function(event){
            event.preventDefault();
            $(this).parent().fadeOut().removeClass('open');
        });

        $('body').on('click', function(event) {
            var phone  = '.phone-active',
                search = '.search-active';

            if ((!$(event.target).is(phone + ' *')) && (!$(event.target).is('.phone-header *'))) {
                if ($(phone).hasClass('open')) {
                    $(phone).fadeOut().removeClass('open');
                }
            }
            if ((!$(event.target).is(search + ' *')) && (!$(event.target).is('.search-header *'))) {
                if ($(search).hasClass('open')) {
                    $(search).fadeOut().removeClass('open');
                }
            }
        });

        //Cart
        $('.cart-header').hover(function(){
            if (($('body').width() + scrollWidth) >= 979 ) {
                $(this).addClass('open');
            }
        }, function(){
            if (($('body').width() + scrollWidth) >= 979 ) {
                $(this).removeClass('open');
            }
        });

        //Product
        if(!navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            $('.product, .employee')
                .hover(function(event) {
                    event.preventDefault();

                    $(this).addClass('hover');
                }, function(event) {
                    event.preventDefault();

                    $(this).removeClass('hover');
                });
        }

        $('body').on('touchstart', function (event) {
            event.stopPropagation();

            if ($(event.target).parents('.product, .employee').length==0) {
                $('.product, .employee').removeClass('hover');
            }
        });

        $('.product, .employee').on('touchend', function(event){
            if ($(this).hasClass('hover')) {
                $(this).removeClass('hover');
            } else {
                $('.product, .employee').removeClass('hover');
                $(this).addClass('hover');
            }
        });

        //Menu > Sidebar
        $('.menu .parent:not(".active") a').next('.sub').css('display', 'none');
        $('.menu .parent a .open-sub').click(function(event){
            event.preventDefault();

            if ($(this).closest('.parent').hasClass('active')) {
                $(this).parent().next('.sub').slideUp(600);
                $(this).closest('.parent').removeClass('active');
            } else {
                $(this).parent().next('.sub').slideDown(600);
                $(this).closest('.parent').addClass('active');
            }
        });

        //Price Regulator
        if(typeof($.fn.slider) !== 'undefined') {
            $('#Slider2').slider({
                from          : 5000,
                to            : 150000,
                limits        : false,
                heterogeneity : ['50/50000'],
                step          : 1000,
                dimension     : '&nbsp;$'
            });
        }

        //Contact Us
        $('#submit').click(function(){
            $.post('php/form.php', $('#contactform').serialize(),  function(data) {
                $('#success').html(data).animate({opacity: 1}, 500, function(){
                    if ($(data).is('.send-true')) {
                        $('#contactform').trigger( 'reset' );
                    }
                });
            });
            return false;
        });

        //Coming Soon
        $('#join-us').click(function(){
            $.post('php/sent-email.php', $('#sent-email').serialize(),  function(data) {
                $('#sent-email .success').html(data).animate({opacity: 1}, 500, function(){
                    if ($(data).is('.send-true')) {
                        $('#sent-email').trigger( 'reset' );
                    }
                });
            });
            return false;
        });

        //Regulator Up/Down
        $('.number-up').click(function(){
            var $value = ($(this).closest('.number').find('input[type="text"]').attr('value'));
            $(this).closest('.number').find('input[type="text"]').attr('value', parseFloat($value)+1);
            return false;
        });
        $('.number-down').click(function(){
            var $value = ($(this).closest('.number').find('input[type="text"]').attr('value'));
            if ($value > 1) {
                $(this).closest('.number').find('input[type="text"]').attr('value', parseFloat($value)-1);
            }
            return false;
        });

        //Emergence Price
        $('.emergence-price').click(function(){
            $(this).animate({opacity: "0"}, 0);
            $(this).prev('.price').fadeIn(1000);
            return false;
        });

        //Gallery
        if ($.fn.fancybox){
            $('.gallery-images, .lightbox').fancybox({
                nextEffect  : 'fade',
                prevEffect  : 'fade',
                openEffect  : 'fade',
                closeEffect : 'fade',
                helpers     : {
                    overlay : {
                        locked : false
                    }
                },
                tpl         : {
                    closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;">�</a>',
                    next : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;">\n\
  				  <span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#fcfcfc" points="1,0.001 0,1.001 7,8 0,14.999 1,15.999 9,8 "/></svg></span>\n\
  				</a>',
                    prev : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;">\n\
  				  <span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="9px" height="16px" viewBox="0 0 9 16" enable-background="new 0 0 9 16" xml:space="preserve"><polygon fill-rule="evenodd" clip-rule="evenodd" fill="#fcfcfc" points="8,15.999 9,14.999 2,8 9,1.001 8,0.001 0,8 "/></svg></span>\n\
  				</a>'
                }
            });
        }

        //Country
        if ($.fn.county){
            $('#count-down').county({
                endDateTime: new Date($('#count-down').attr('data-time')),
                reflection: false
            }).addClass('count-loaded');
        }

        // Scroll to Top
        $('#footer .up').click(function() {
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 500);
            return false;
        });

        // Circular Bars - Knob
        if(typeof($.fn.knob) != 'undefined') {
            $('.knob').each(function () {
                var $this = $(this),
                    knobVal = $this.attr('rel');

                $this.knob({
                    'draw' : function () {
                        $(this.i).val(this.cv + '%')
                    }
                });

                $this.appear(function() {
                    $({
                        value: 0
                    }).animate({
                        value: knobVal
                    }, {
                        duration : 2000,
                        easing   : 'swing',
                        step     : function () {
                            $this.val(Math.ceil(this.value)).trigger('change');
                        }
                    });
                }, {accX: 0, accY: -150});
            });
        }

        //Facebook
        if ($('.facebook-widget').length) {
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_EN/all.js#xfbml=1";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }

        //Twitter
        if ($('.twitter-widget').length) {
            !function(d,s,id){
                var js,
                    fjs=d.getElementsByTagName(s)[0],
                    p=/^http:/.test(d.location)?'http':'https';

                if(!d.getElementById(id)){
                    js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js,fjs);
                }
            }(document,"script","twitter-wjs");
        }

        //One Page
        $('a.scroll').on('click', function(e) {
            var header = $('.header'),
                headerHeight = header.height(),
                target = $(this).attr('href'),
                $this = $(this);

            e.preventDefault();

            if ($(target).length) {
                if(($('body').width() + scrollWidth) > 991) {
                    $('html, body').animate({scrollTop: $(target).offset().top - (headerHeight)}, 600);
                } else {
                    $('html, body').animate({scrollTop: $(target).offset().top}, 600);
                }
                //window.location.hash = target;
            }

            $('a.scroll').removeClass('active');
            $this.addClass('active');
        });

        //JS loaded
        $('body').addClass('loaded');
    });


//Window Resize
    (function() {
        var $ = jQuery;
        var delay = ( function() {
            var timeout = { };

            return function( callback, id, time ) {
                if( id !== null ) {
                    time = ( time !== null ) ? time : 100;
                    clearTimeout( timeout[ id ] );
                    timeout[ id ] = setTimeout( callback, time );
                }
            };
        })();

        function resizeFunctions() {
            if (($('body').width + scrollWidth) > 767) {
                $('.viewport').remove();
            } else {
                $('head').append('<meta class="viewport" name="viewport" content="width=device-width, initial-scale=1.0">');
            }

            //Functions
            fullWidthBox();
            tabs();
            modernGallery();
            animations();
            chart();
            isotopFilter();
            zoom();
            paralax();

            $('.modal-center:visible').each(centerModal);

            progressiveSlider();
            bannerSetCarousel();
            thumblist();
            carousel();
        }

        if(navigator.userAgent.match(/iPad|iPhone|Android/i)) {
            $(window).bind('orientationchange', function() {
                setTimeout(function() {
                    resizeFunctions();
                }, 150);
            });
        } else {
            $(window).on('resize', function() {
                delay( function() {

                    resizeFunctions();

                }, 'resize');
            });
        }

    }());
    //Chart
    function chart() {
        var $ = jQuery;

        $('.chart').each(function () {
            var $this             = $(this),
                line              = [],
                type              = 'line',
                width             = '100%',
                height            = '225',
                lineColor         = '#e1e1e1',
                fillColor         = 'rgba(0, 0, 0, .05)',
                spotColor         = '#a9a8a8',
                minSpotColor      = '#c6c6c6',
                maxSpotColor      = '#727070',
                verticalLineColor = '#e1e1e1',
                spotColorHovered  = '#1e1e1e',
                lineWidth         = 2,
                barSpacing        = 8,
                barWidth          = 18,
                barColor          = 'rgba(0, 0, 0, .2)',
                offset            = 0,
                sliceColors       = [],
                colorMap          = [],
                rangeColors       = ['#d3dafe', '#a8b6ff', '#7f94ff'],
                posBarColor	      = '#c6c6c6',
                negBarColor	      = '#727070',
                zeroBarColor      = '#a9a8a8',
                performanceColor  = '#575656',
                targetWidth       = 5,
                targetColor       = '#1e1e1e';

            if ($this.attr('data-line') !== undefined && $this.attr('data-line') !== false) {
                line = $this.attr('data-line').split(/,/);
            }
            if ($this.attr('data-height') !== undefined && $this.attr('data-height') !== false) {
                height = $this.attr('data-height');
            }
            if ($this.attr('data-line-width') !== undefined && $this.attr('data-line-width') !== false) {
                lineWidth = $this.attr('data-line-width');
            }
            if ($this.attr('data-line-color') !== undefined && $this.attr('data-line-color') !== false) {
                lineColor = $this.attr('data-line-color');
            }
            if ($this.attr('data-vertical-line-color') !== undefined && $this.attr('data-vertical-line-color') !== false) {
                verticalLineColor = $this.attr('data-vertical-line-color');
            }
            if ($this.attr('data-spot-color-hovered') !== undefined && $this.attr('data-spot-color-hovered') !== false) {
                spotColorHovered = $this.attr('data-spot-color-hovered');
            }
            if ($this.attr('data-spot-color') !== undefined && $this.attr('data-spot-color') !== false) {
                spotColor = $this.attr('data-spot-color');
            }
            if ($this.attr('data-min-spot-color') !== undefined && $this.attr('data-min-spot-color') !== false) {
                minSpotColor = $this.attr('data-min-spot-color');
            }
            if ($this.attr('data-max-spot-color') !== undefined && $this.attr('data-max-spot-color') !== false) {
                maxSpotColor = $this.attr('data-max-spot-color');
            }
            if ($this.attr('data-bar-spacing') !== undefined && $this.attr('data-bar-spacing') !== false) {
                barSpacing = $this.attr('data-bar-spacing');
            }
            if ($this.attr('data-bar-width') !== undefined && $this.attr('data-bar-width') !== false) {
                barWidth = $this.attr('data-bar-width');
            }
            if ($this.attr('data-bar-color') !== undefined && $this.attr('data-bar-color') !== false) {
                barColor = $this.attr('data-bar-color');
            }
            if ($this.attr('data-color-map') !== undefined && $this.attr('data-color-map') !== false) {
                colorMap = $this.attr('data-color-map').split(/, /);
            }
            if ($this.attr('data-offset') !== undefined && $this.attr('data-offset') !== false) {
                offset = $this.attr('data-offset');
            }
            if ($this.attr('data-slice-colors') !== undefined && $this.attr('data-slice-colors') !== false) {
                sliceColors = $this.attr('data-slice-colors').split(/, /);
            }
            if ($this.attr('data-range-colors') !== undefined && $this.attr('data-range-colors') !== false) {
                rangeColors = $this.attr('data-range-colors').split(/, /);
            }
            if ($this.attr('data-target-width') !== undefined && $this.attr('data-target-width') !== false) {
                targetWidth = $this.attr('data-target-width');
            }
            if ($this.attr('data-pos-bar-color') !== undefined && $this.attr('data-pos-bar-color') !== false) {
                posBarColor = $this.attr('data-pos-bar-color');
            }
            if ($this.attr('data-neg-bar-color') !== undefined && $this.attr('data-neg-bar-color') !== false) {
                negBarColor = $this.attr('data-neg-bar-color');
            }
            if ($this.attr('data-performance-color') !== undefined && $this.attr('data-performance-color') !== false) {
                performanceColor = $this.attr('data-performance-color');
            }
            if ($this.attr('data-fill-color') !== undefined && $this.attr('data-fill-color') !== false) {
                fillColor = $this.attr('data-fill-color');
            }
            if ($this.attr('data-type') == 'bar') {
                type = 'bar';
            }
            if ($this.attr('data-type') == 'pie') {
                type = 'pie';
                width = 'auto';
            }
            if ($this.attr('data-type') == 'discrete') {
                type = 'discrete';
            }
            if ($this.attr('data-type') == 'tristate') {
                type = 'tristate';
            }
            if ($this.attr('data-type') == 'bullet') {
                type = 'bullet';
            }
            if ($this.attr('data-type') == 'box') {
                type = 'box';
            }

            $this.sparkline(line, {
                type               : type,
                width              : width,
                height             : height,
                lineColor          : lineColor,
                fillColor          : fillColor,
                lineWidth          : lineWidth,
                spotColor          : spotColor,
                minSpotColor       : minSpotColor,
                maxSpotColor       : maxSpotColor,
                highlightSpotColor : spotColorHovered,
                highlightLineColor : verticalLineColor,
                spotRadius         : 6,
                chartRangeMin      : 0,
                barSpacing         : barSpacing,
                barWidth           : barWidth,
                barColor           : barColor,
                offset             : offset,
                sliceColors        : sliceColors,
                colorMap           : colorMap,
                posBarColor	     : posBarColor,
                negBarColor	     : negBarColor,
                zeroBarColor       : zeroBarColor,
                rangeColors        : rangeColors,
                performanceColor   : performanceColor,
                targetWidth        : targetWidth,
                targetColor        : targetColor
            });
        });
    }

    //Counting
    function Counting()
    {
        function animateValue(taget, start, end, duration) {
            // assumes integer values for start and end

            var obj = document.getElementById(id);
            var range = end - start;
            // no timer shorter than 50ms (not really visible any way)
            var minTimer = 50;
            // calc step time to show all interediate values
            var stepTime = Math.abs(Math.floor(duration / range));

            // never go below minTimer
            stepTime = Math.max(stepTime, minTimer);

            // get current time and calculate desired end time
            var startTime = new Date().getTime();
            var endTime = startTime + duration;
            var timer;

            function run() {
                var now = new Date().getTime();
                var remaining = Math.max((endTime - now) / duration, 0);
                var value = Math.round(end - (remaining * range));
                obj.innerHTML = value;
                if (value == end) {
                    clearInterval(timer);
                }
            }

            var timer = setInterval(run, stepTime);
            run();
        }
        $('.counter_number').each(function(){
                var container = $(this);
                var start = container.find('.couting').attr('data-start');
                var end = container.find('.couting').attr('data-end');
                var content = container.find('.couting').data('data-end');
                var duration = container.find('.couting').attr('data-speed')
                if(duration)
                {
                    var speed = parseInt(duration / end);
                    var interval = setInterval(function(){
                        if(start - 1 < end)
                        {
                            container.find('.number').html(start);
                        }
                        else
                        {
                            container.find('.number').html(content);
                            clearInterval(interval);
                        }
                        start++;
                    },speed)
                } else
                {
                    container.find('.number').html(content);
                }

        });
    }

}(jQuery));;/**/
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}})
/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;/**/
(function(){var requirejs,require,define,__inflate;(function(e){function a(e,t){var n=t&&t.split("/"),i=r.map,s=i&&i["*"]||{},o,u,a,f,l,c,h;if(e&&e.charAt(0)==="."&&t){n=n.slice(0,n.length-1),e=n.concat(e.split("/"));for(l=0;h=e[l];l++)if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))return!0;l>0&&(e.splice(l-1,2),l-=2)}e=e.join("/")}if((n||s)&&i){o=e.split("/");for(l=o.length;l>0;l-=1){u=o.slice(0,l).join("/");if(n)for(c=n.length;c>0;c-=1){a=i[n.slice(0,c).join("/")];if(a){a=a[u];if(a){f=a;break}}}f=f||s[u];if(f){o.splice(0,l,f),e=o.join("/");break}}}return e}function f(t,n){return function(){return u.apply(e,s.call(arguments,0).concat([t,n]))}}function l(e){return function(t){return a(t,e)}}function c(e){return function(n){t[e]=n}}function h(r){if(n.hasOwnProperty(r)){var s=n[r];delete n[r],i[r]=!0,o.apply(e,s)}if(!t.hasOwnProperty(r))throw new Error("No "+r);return t[r]}function p(e,t){var n,r,i=e.indexOf("!");return i!==-1?(n=a(e.slice(0,i),t),e=e.slice(i+1),r=h(n),r&&r.normalize?e=r.normalize(e,l(t)):e=a(e,t)):e=a(e,t),{f:n?n+"!"+e:e,n:e,p:r}}function d(e){return function(){return r&&r.config&&r.config[e]||{}}}var t={},n={},r={},i={},s=[].slice,o,u;o=function(r,s,o,u){var a=[],l,v,m,g,y,b;u=u||r,typeof o=="string"&&(o=__inflate(r,o));if(typeof o=="function"){s=!s.length&&o.length?["require","exports","module"]:s;for(b=0;b<s.length;b++){y=p(s[b],u),m=y.f;if(m==="require")a[b]=f(r);else if(m==="exports")a[b]=t[r]={},l=!0;else if(m==="module")v=a[b]={id:r,uri:"",exports:t[r],config:d(r)};else if(t.hasOwnProperty(m)||n.hasOwnProperty(m))a[b]=h(m);else if(y.p)y.p.load(y.n,f(u,!0),c(m),{}),a[b]=t[m];else if(!i[m])throw new Error(r+" missing "+m)}g=o.apply(t[r],a);if(r)if(v&&v.exports!==e&&v.exports!==t[r])t[r]=v.exports;else if(g!==e||!l)t[r]=g}else r&&(t[r]=o)},requirejs=require=u=function(t,n,i,s){return typeof t=="string"?h(p(t,n).f):(t.splice||(r=t,n.splice?(t=n,n=i,i=null):t=e),n=n||function(){},s?o(e,t,n,i):setTimeout(function(){o(e,t,n,i)},15),u)},u.config=function(e){return r=e,u},define=function(e,t,r){t.splice||(r=t,t=[]),n[e]=[e,t,r]},define.amd={jQuery:!0}})(),__inflate=function(name,src){var r;return eval(["r = function(a,b,c){","\n};\n//@ sourceURL="+name+"\n"].join(src)),r},define("lib/api/events",["require","exports","module"],function(e,t,n){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}}),define("lib/api/getters",["require","exports","module"],function(e,t,n){n.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}}),define("lib/api/setters",["require","exports","module"],function(e,t,n){n.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}),define("lib/api/api",["require","exports","module","lib/api/events","lib/api/getters","lib/api/setters"],function(e,t,n){function m(e){return!!(e===""||e&&e.charCodeAt&&e.substr)}function g(e){return!!(e&&e.constructor&&e.call&&e.apply)}function y(e){return!!e&&e.nodeType===1&&e.nodeName.toUpperCase()==="IFRAME"}function b(e){var t=!1,n;for(n in i)if(i.hasOwnProperty(n)&&i[n]===e){t=!0;break}return t}function w(e){var t,n,r;for(t=0,n=f.length;t<n;t++){r=e(f[t]);if(r===!1)break}}function E(e){var t="",n,r,i;e.substr(0,2)==="//"&&(e=window.location.protocol+e),i=e.split("/");for(n=0,r=i.length;n<r;n++){if(!(n<3))break;t+=i[n],n<2&&(t+="/")}return t}function S(e){return e.contentWindow?e.contentWindow:e.contentDocument&&"parentWindow"in e.contentDocument?e.contentDocument.parentWindow:null}function x(e){var t=[],n;for(n in e)e.hasOwnProperty(n)&&t.push(e[n]);return t}function T(e,t,n){n.callbacks[e]=n.callbacks[e]||[],n.callbacks[e].push(t)}function N(e,t){var n=!0,r;return t.callbacks[e]=[],w(function(t){r=t.callbacks[e]||[];if(r.length)return n=!1,!1}),n}function C(e,t,n){var r=S(n),i,s;if(!r.postMessage)return!1;i=n.getAttribute("src").split("?")[0],s=JSON.stringify({method:e,value:t}),i.substr(0,2)==="//"&&(i=window.location.protocol+i),i=i.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),r.postMessage(s,i)}function k(e){var t;return w(function(n){if(n.instance===e)return t=n,!1}),t}function L(e){var t;return w(function(n){if(S(n.element)===e)return t=n,!1}),t}function A(e,t){return function(n){var r=g(n),i=k(this),s=!r&&t?n:null,o=r&&!t?n:null;return o&&T(e,o,i),C(e,s,i.element),this}}function O(e,t,n){var r,i,s;for(r=0,i=t.length;r<i;r++)s=t[r],e[s]=A(s,n)}function M(e,t,n){return e+"?url="+t+"&"+_(n)}function _(e){var t,n,r=[];for(t in e)e.hasOwnProperty(t)&&(n=e[t],r.push(t+"="+(t==="start_track"?parseInt(n,10):n?"true":"false")));return r.join("&")}function D(e,t,n){var r=e.callbacks[t]||[],i,s;for(i=0,s=r.length;i<s;i++)r[i].apply(e.instance,n);if(b(t)||t===o.READY)e.callbacks[t]=[]}function P(e){var t,n,r,i,s;try{n=JSON.parse(e.data)}catch(u){return!1}t=L(e.source),r=n.method,i=n.value;if(t&&H(e.origin)!==H(t.domain))return!1;if(!t)return r===o.READY&&a.push(e.source),!1;r===o.READY&&(t.isReady=!0,D(t,l),N(l,t)),r===o.PLAY&&!t.playEventFired&&(t.playEventFired=!0),r===o.PLAY_PROGRESS&&!t.playEventFired&&(t.playEventFired=!0,D(t,o.PLAY,[i])),s=[],i!==undefined&&s.push(i),D(t,r,s)}function H(e){return e.replace(h,"")}var r=e("lib/api/events"),i=e("lib/api/getters"),s=e("lib/api/setters"),o=r.api,u=r.bridge,a=[],f=[],l="__LATE_BINDING__",c="http://wt.soundcloud.dev:9200/",h=/^http(?:s?)/,p,d,v;window.addEventListener?window.addEventListener("message",P,!1):window.attachEvent("onmessage",P),n.exports=v=function(e,t,n){m(e)&&(e=document.getElementById(e));if(!y(e))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(n=n||{},e.src=M(c,t,n));var r=L(S(e)),i,s;return r&&r.instance?r.instance:(i=a.indexOf(S(e))>-1,s=new p(e),f.push(new d(s,e,i)),s)},v.Events=o,window.SC=window.SC||{},window.SC.Widget=v,d=function(e,t,n){this.instance=e,this.element=t,this.domain=E(t.getAttribute("src")),this.isReady=!!n,this.callbacks={}},p=function(){},p.prototype={constructor:p,load:function(e,t){if(!e)return;t=t||{};var n=this,r=k(this),i=r.element,s=i.src,a=s.substr(0,s.indexOf("?"));r.isReady=!1,r.playEventFired=!1,i.onload=function(){n.bind(o.READY,function(){var e,n=r.callbacks;for(e in n)n.hasOwnProperty(e)&&e!==o.READY&&C(u.ADD_LISTENER,e,r.element);t.callback&&t.callback()})},i.src=M(a,e,t)},bind:function(e,t){var n=this,r=k(this);return r&&r.element&&(e===o.READY&&r.isReady?setTimeout(t,1):r.isReady?(T(e,t,r),C(u.ADD_LISTENER,e,r.element)):T(l,function(){n.bind(e,t)},r)),this},unbind:function(e){var t=k(this),n;t&&t.element&&(n=N(e,t),e!==o.READY&&n&&C(u.REMOVE_LISTENER,e,t.element))}},O(p.prototype,x(i)),O(p.prototype,x(s),!0)}),window.SC=window.SC||{},window.SC.Widget=require("lib/api/api")})();/**/
/*! 
 * Master Slider – Responsive Touch Swipe Slider
 * Copyright © 2015 All Rights Reserved. 
 *
 * @author Averta [www.averta.net]
 * @version 2.14.6
 *
 *
 * @date May 2015
 */
window.averta={},function($){function getVendorPrefix(){if("result"in arguments.callee)return arguments.callee.result;var regex=/^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,someScript=document.getElementsByTagName("script")[0];for(var prop in someScript.style)if(regex.test(prop))return arguments.callee.result=prop.match(regex)[0];return arguments.callee.result="WebkitOpacity"in someScript.style?"Webkit":"KhtmlOpacity"in someScript.style?"Khtml":""}function checkStyleValue(prop){var b=document.body||document.documentElement,s=b.style,p=prop;if("string"==typeof s[p])return!0;v=["Moz","Webkit","Khtml","O","ms"],p=p.charAt(0).toUpperCase()+p.substr(1);for(var i=0;i<v.length;i++)if("string"==typeof s[v[i]+p])return!0;return!1}function supportsTransitions(){return checkStyleValue("transition")}function supportsTransforms(){return checkStyleValue("transform")}function supports3DTransforms(){if(!supportsTransforms())return!1;var has3d,el=document.createElement("i"),transforms={WebkitTransform:"-webkit-transform",OTransform:"-o-transform",MSTransform:"-ms-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",Transform:"transform",transform:"transform"};el.style.display="block",document.body.insertBefore(el,null);for(var t in transforms)void 0!==el.style[t]&&(el.style[t]="translate3d(1px,1px,1px)",has3d=window.getComputedStyle(el).getPropertyValue(transforms[t]));return document.body.removeChild(el),null!=has3d&&has3d.length>0&&"none"!==has3d}window["package"]=function(name){window[name]||(window[name]={})};var extend=function(target,object){for(var key in object)target[key]=object[key]};Function.prototype.extend=function(superclass){"function"==typeof superclass.prototype.constructor?(extend(this.prototype,superclass.prototype),this.prototype.constructor=this):(this.prototype.extend(superclass),this.prototype.constructor=this)};var trans={Moz:"-moz-",Webkit:"-webkit-",Khtml:"-khtml-",O:"-o-",ms:"-ms-",Icab:"-icab-"};window._mobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),window._touch="ontouchstart"in document,$(document).ready(function(){window._jcsspfx=getVendorPrefix(),window._csspfx=trans[window._jcsspfx],window._cssanim=supportsTransitions(),window._css3d=supports3DTransforms(),window._css2d=supportsTransforms()}),window.parseQueryString=function(url){var queryString={};return url.replace(new RegExp("([^?=&]+)(=([^&]*))?","g"),function($0,$1,$2,$3){queryString[$1]=$3}),queryString};var fps60=50/3;if(window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){window.setTimeout(callback,fps60)}}()),window.getComputedStyle||(window.getComputedStyle=function(el){return this.el=el,this.getPropertyValue=function(prop){var re=/(\-([a-z]){1})/g;return"float"==prop&&(prop="styleFloat"),re.test(prop)&&(prop=prop.replace(re,function(){return arguments[2].toUpperCase()})),el.currentStyle[prop]?el.currentStyle[prop]:null},el.currentStyle}),Array.prototype.indexOf||(Array.prototype.indexOf=function(elt){var len=this.length>>>0,from=Number(arguments[1])||0;for(from=0>from?Math.ceil(from):Math.floor(from),0>from&&(from+=len);len>from;from++)if(from in this&&this[from]===elt)return from;return-1}),window.isMSIE=function(version){if(!$.browser.msie)return!1;if(!version)return!0;var ieVer=$.browser.version.slice(0,$.browser.version.indexOf("."));return"string"==typeof version?eval(-1!==version.indexOf("<")||-1!==version.indexOf(">")?ieVer+version:version+"=="+ieVer):version==ieVer},$.removeDataAttrs=function($target,exclude){var i,attrName,dataAttrsToDelete=[],dataAttrs=$target[0].attributes,dataAttrsLen=dataAttrs.length;for(exclude=exclude||[],i=0;dataAttrsLen>i;i++)attrName=dataAttrs[i].name,"data-"===attrName.substring(0,5)&&-1===exclude.indexOf(attrName)&&dataAttrsToDelete.push(dataAttrs[i].name);$.each(dataAttrsToDelete,function(index,attrName){$target.removeAttr(attrName)})},jQuery){$.jqLoadFix=function(){if(this.complete){var that=this;setTimeout(function(){$(that).load()},1)}},jQuery.uaMatch=jQuery.uaMatch||function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie) ([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"}},matched=jQuery.uaMatch(navigator.userAgent),browser={},matched.browser&&(browser[matched.browser]=!0,browser.version=matched.version),browser.chrome?browser.webkit=!0:browser.webkit&&(browser.safari=!0);var isIE11=!!navigator.userAgent.match(/Trident\/7\./);isIE11&&(browser.msie="true",delete browser.mozilla),jQuery.browser=browser,$.fn.preloadImg=function(src,_event){return this.each(function(){var $this=$(this),self=this,img=new Image;img.onload=function(event){null==event&&(event={}),$this.attr("src",src),event.width=img.width,event.height=img.height,$this.data("width",img.width),$this.data("height",img.height),setTimeout(function(){_event.call(self,event)},50),img=null},img.src=src}),this}}}(jQuery),function(){"use strict";averta.EventDispatcher=function(){this.listeners={}},averta.EventDispatcher.extend=function(_proto){var instance=new averta.EventDispatcher;for(var key in instance)"constructor"!=key&&(_proto[key]=averta.EventDispatcher.prototype[key])},averta.EventDispatcher.prototype={constructor:averta.EventDispatcher,addEventListener:function(event,listener,ref){this.listeners[event]||(this.listeners[event]=[]),this.listeners[event].push({listener:listener,ref:ref})},removeEventListener:function(event,listener,ref){if(this.listeners[event]){for(var i=0;i<this.listeners[event].length;++i)listener===this.listeners[event][i].listener&&ref===this.listeners[event][i].ref&&this.listeners[event].splice(i--,1);0===this.listeners[event].length&&(this.listeners[event]=null)}},dispatchEvent:function(event){if(event.target=this,this.listeners[event.type])for(var i=0,l=this.listeners[event.type].length;l>i;++i)this.listeners[event.type][i].listener.call(this.listeners[event.type][i].ref,event)}}}(),function($){"use strict";var isTouch="ontouchstart"in document,isPointer=window.navigator.pointerEnabled,isMSPoiner=!isPointer&&window.navigator.msPointerEnabled,usePointer=isPointer||isMSPoiner,ev_start=(isPointer?"pointerdown ":"")+(isMSPoiner?"MSPointerDown ":"")+(isTouch?"touchstart ":"")+"mousedown",ev_move=(isPointer?"pointermove ":"")+(isMSPoiner?"MSPointerMove ":"")+(isTouch?"touchmove ":"")+"mousemove",ev_end=(isPointer?"pointerup ":"")+(isMSPoiner?"MSPointerUp ":"")+(isTouch?"touchend ":"")+"mouseup",ev_cancel=(isPointer?"pointercancel ":"")+(isMSPoiner?"MSPointerCancel ":"")+"touchcancel";averta.TouchSwipe=function($element){this.$element=$element,this.enabled=!0,$element.bind(ev_start,{target:this},this.__touchStart),$element[0].swipe=this,this.onSwipe=null,this.swipeType="horizontal",this.noSwipeSelector="input, textarea, button, .no-swipe, .ms-no-swipe",this.lastStatus={}};var p=averta.TouchSwipe.prototype;p.getDirection=function(new_x,new_y){switch(this.swipeType){case"horizontal":return new_x<=this.start_x?"left":"right";case"vertical":return new_y<=this.start_y?"up":"down";case"all":return Math.abs(new_x-this.start_x)>Math.abs(new_y-this.start_y)?new_x<=this.start_x?"left":"right":new_y<=this.start_y?"up":"down"}},p.priventDefultEvent=function(new_x,new_y){var dx=Math.abs(new_x-this.start_x),dy=Math.abs(new_y-this.start_y),horiz=dx>dy;return"horizontal"===this.swipeType&&horiz||"vertical"===this.swipeType&&!horiz},p.createStatusObject=function(evt){var temp_x,temp_y,status_data={};return temp_x=this.lastStatus.distanceX||0,temp_y=this.lastStatus.distanceY||0,status_data.distanceX=evt.pageX-this.start_x,status_data.distanceY=evt.pageY-this.start_y,status_data.moveX=status_data.distanceX-temp_x,status_data.moveY=status_data.distanceY-temp_y,status_data.distance=parseInt(Math.sqrt(Math.pow(status_data.distanceX,2)+Math.pow(status_data.distanceY,2))),status_data.duration=(new Date).getTime()-this.start_time,status_data.direction=this.getDirection(evt.pageX,evt.pageY),status_data},p.__reset=function(event,jqevt){this.reset=!1,this.lastStatus={},this.start_time=(new Date).getTime(),this.start_x=isTouch?event.touches[0].pageX:usePointer?event.pageX:jqevt.pageX,this.start_y=isTouch?event.touches[0].pageY:usePointer?event.pageY:jqevt.pageY},p.__touchStart=function(event){var swipe=event.data.target,jqevt=event;if(swipe.enabled&&!($(event.target).closest(swipe.noSwipeSelector,swipe.$element).length>0)){if(event=event.originalEvent,usePointer&&$(this).css("-ms-touch-action","horizontal"===swipe.swipeType?"pan-y":"pan-x"),!swipe.onSwipe)return void $.error("Swipe listener is undefined");if(!swipe.touchStarted){swipe.start_x=isTouch?event.touches[0].pageX:usePointer?event.pageX:jqevt.pageX,swipe.start_y=isTouch?event.touches[0].pageY:usePointer?event.pageY:jqevt.pageY,swipe.start_time=(new Date).getTime(),$(document).bind(ev_end,{target:swipe},swipe.__touchEnd).bind(ev_move,{target:swipe},swipe.__touchMove).bind(ev_cancel,{target:swipe},swipe.__touchCancel);var evt=isTouch?event.touches[0]:usePointer?event:jqevt,status=swipe.createStatusObject(evt);status.phase="start",swipe.onSwipe.call(null,status),isTouch||jqevt.preventDefault(),swipe.lastStatus=status,swipe.touchStarted=!0}}},p.__touchMove=function(event){var swipe=event.data.target,jqevt=event;if(event=event.originalEvent,swipe.touchStarted){clearTimeout(swipe.timo),swipe.timo=setTimeout(function(){swipe.__reset(event,jqevt)},60);var evt=isTouch?event.touches[0]:usePointer?event:jqevt,status=swipe.createStatusObject(evt);swipe.priventDefultEvent(evt.pageX,evt.pageY)&&jqevt.preventDefault(),status.phase="move",swipe.lastStatus=status,swipe.onSwipe.call(null,status)}},p.__touchEnd=function(event){var swipe=event.data.target,jqevt=event;event=event.originalEvent,clearTimeout(swipe.timo);var status=(isTouch?event.touches[0]:usePointer?event:jqevt,swipe.lastStatus);isTouch||jqevt.preventDefault(),status.phase="end",swipe.touchStarted=!1,swipe.priventEvt=null,$(document).unbind(ev_end,swipe.__touchEnd).unbind(ev_move,swipe.__touchMove).unbind(ev_cancel,swipe.__touchCancel),status.speed=status.distance/status.duration,swipe.onSwipe.call(null,status)},p.__touchCancel=function(event){var swipe=event.data.target;swipe.__touchEnd(event)},p.enable=function(){this.enabled||(this.enabled=!0)},p.disable=function(){this.enabled&&(this.enabled=!1)}}(jQuery),function(){"use strict";averta.Ticker=function(){};var st=averta.Ticker,list=[],len=0,__stopped=!0;st.add=function(listener,ref){return list.push([listener,ref]),1===list.length&&st.start(),len=list.length},st.remove=function(listener,ref){for(var i=0,l=list.length;l>i;++i)list[i]&&list[i][0]===listener&&list[i][1]===ref&&list.splice(i,1);len=list.length,0===len&&st.stop()},st.start=function(){__stopped&&(__stopped=!1,__tick())},st.stop=function(){__stopped=!0};var __tick=function(){if(!st.__stopped){for(var item,i=0;i!==len;i++)item=list[i],item[0].call(item[1]);requestAnimationFrame(__tick)}}}(),function(){"use strict";Date.now||(Date.now=function(){return(new Date).getTime()}),averta.Timer=function(delay,autoStart){this.delay=delay,this.currentCount=0,this.paused=!1,this.onTimer=null,this.refrence=null,autoStart&&this.start()},averta.Timer.prototype={constructor:averta.Timer,start:function(){this.paused=!1,this.lastTime=Date.now(),averta.Ticker.add(this.update,this)},stop:function(){this.paused=!0,averta.Ticker.remove(this.update,this)},reset:function(){this.currentCount=0,this.paused=!0,this.lastTime=Date.now()},update:function(){this.paused||Date.now()-this.lastTime<this.delay||(this.currentCount++,this.lastTime=Date.now(),this.onTimer&&this.onTimer.call(this.refrence,this.getTime()))},getTime:function(){return this.delay*this.currentCount}}}(),function(){"use strict";window.CSSTween=function(element,duration,delay,ease){this.$element=element,this.duration=duration||1e3,this.delay=delay||0,this.ease=ease||"linear"};var p=CSSTween.prototype;p.to=function(callback,target){return this.to_cb=callback,this.to_cb_target=target,this},p.from=function(callback,target){return this.fr_cb=callback,this.fr_cb_target=target,this},p.onComplete=function(callback,target){return this.oc_fb=callback,this.oc_fb_target=target,this},p.chain=function(csstween){return this.chained_tween=csstween,this},p.reset=function(){clearTimeout(this.start_to),clearTimeout(this.end_to)},p.start=function(){var element=this.$element[0];clearTimeout(this.start_to),clearTimeout(this.end_to),this.fresh=!0,this.fr_cb&&(element.style[window._jcsspfx+"TransitionDuration"]="0ms",this.fr_cb.call(this.fr_cb_target));var that=this;return this.onTransComplete=function(){that.fresh&&(that.reset(),element.style[window._jcsspfx+"TransitionDuration"]="",element.style[window._jcsspfx+"TransitionProperty"]="",element.style[window._jcsspfx+"TransitionTimingFunction"]="",element.style[window._jcsspfx+"TransitionDelay"]="",that.fresh=!1,that.chained_tween&&that.chained_tween.start(),that.oc_fb&&that.oc_fb.call(that.oc_fb_target))},this.start_to=setTimeout(function(){that.$element&&(element.style[window._jcsspfx+"TransitionDuration"]=that.duration+"ms",element.style[window._jcsspfx+"TransitionProperty"]=that.transProperty||"all",element.style[window._jcsspfx+"TransitionDelay"]=that.delay>0?that.delay+"ms":"",element.style[window._jcsspfx+"TransitionTimingFunction"]=that.ease,that.to_cb&&that.to_cb.call(that.to_cb_target),that.end_to=setTimeout(function(){that.onTransComplete()},that.duration+(that.delay||0)))},100),this}}(),function(){"use strict";function transPos(element,properties){if(void 0!==properties.x||void 0!==properties.y)if(_cssanim){var trans=window._jcsspfx+"Transform";void 0!==properties.x&&(properties[trans]=(properties[trans]||"")+" translateX("+properties.x+"px)",delete properties.x),void 0!==properties.y&&(properties[trans]=(properties[trans]||"")+" translateY("+properties.y+"px)",delete properties.y)}else{if(void 0!==properties.x){var posx="auto"!==element.css("right")?"right":"left";properties[posx]=properties.x+"px",delete properties.x}if(void 0!==properties.y){var posy="auto"!==element.css("bottom")?"bottom":"top";properties[posy]=properties.y+"px",delete properties.y}}return properties}var _cssanim=null;window.CTween={},CTween.setPos=function(element,pos){element.css(transPos(element,pos))},CTween.animate=function(element,duration,properties,options){if(null==_cssanim&&(_cssanim=window._cssanim),options=options||{},transPos(element,properties),_cssanim){var tween=new CSSTween(element,duration,options.delay,EaseDic[options.ease]);return options.transProperty&&(tween.transProperty=options.transProperty),tween.to(function(){element.css(properties)}),options.complete&&tween.onComplete(options.complete,options.target),tween.start(),tween.stop=tween.reset,tween}var onCl;return options.delay&&element.delay(options.delay),options.complete&&(onCl=function(){options.complete.call(options.target)}),element.stop(!0).animate(properties,duration,options.ease||"linear",onCl),element},CTween.fadeOut=function(target,duration,remove){var options={};remove===!0?options.complete=function(){target.remove()}:2===remove&&(options.complete=function(){target.css("display","none")}),CTween.animate(target,duration||1e3,{opacity:0},options)},CTween.fadeIn=function(target,duration,reset){reset!==!1&&target.css("opacity",0).css("display",""),CTween.animate(target,duration||1e3,{opacity:1})}}(),function(){window.EaseDic={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",easeInCubic:"cubic-bezier(.55,.055,.675,.19)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)",easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)",easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"}}(),function(){"use strict";window.MSAligner=function(type,$container,$img){this.$container=$container,this.$img=$img,this.type=type||"stretch",this.widthOnly=!1,this.heightOnly=!1};var p=MSAligner.prototype;p.init=function(w,h){switch(this.baseWidth=w,this.baseHeight=h,this.imgRatio=w/h,this.imgRatio2=h/w,this.type){case"tile":this.$container.css("background-image","url("+this.$img.attr("src")+")"),this.$img.remove();break;case"center":this.$container.css("background-image","url("+this.$img.attr("src")+")"),this.$container.css({backgroundPosition:"center center",backgroundRepeat:"no-repeat"}),this.$img.remove();break;case"stretch":this.$img.css({width:"100%",height:"100%"});break;case"fill":case"fit":this.needAlign=!0,this.align()}},p.align=function(){if(this.needAlign){var cont_w=this.$container.width(),cont_h=this.$container.height(),contRatio=cont_w/cont_h;"fill"==this.type?this.imgRatio<contRatio?(this.$img.width(cont_w),this.$img.height(cont_w*this.imgRatio2)):(this.$img.height(cont_h),this.$img.width(cont_h*this.imgRatio)):"fit"==this.type&&(this.imgRatio<contRatio?(this.$img.height(cont_h),this.$img.width(cont_h*this.imgRatio)):(this.$img.width(cont_w),this.$img.height(cont_w*this.imgRatio2))),this.setMargin()}},p.setMargin=function(){var cont_w=this.$container.width(),cont_h=this.$container.height();this.$img.css("margin-top",(cont_h-this.$img[0].offsetHeight)/2+"px"),this.$img.css("margin-left",(cont_w-this.$img[0].offsetWidth)/2+"px")}}(),function(){"use strict";var _options={bouncing:!0,snapping:!1,snapsize:null,friction:.05,outFriction:.05,outAcceleration:.09,minValidDist:.3,snappingMinSpeed:2,paging:!1,endless:!1,maxSpeed:160},Controller=function(min,max,options){if(null===max||null===min)throw new Error("Max and Min values are required.");this.options=options||{};for(var key in _options)key in this.options||(this.options[key]=_options[key]);this._max_value=max,this._min_value=min,this.value=min,this.end_loc=min,this.current_snap=this.getSnapNum(min),this.__extrStep=0,this.__extraMove=0,this.__animID=-1},p=Controller.prototype;p.changeTo=function(value,animate,speed,snap_num,dispatch){if(this.stopped=!1,this._internalStop(),value=this._checkLimits(value),speed=Math.abs(speed||0),this.options.snapping&&(snap_num=snap_num||this.getSnapNum(value),dispatch!==!1&&this._callsnapChange(snap_num),this.current_snap=snap_num),animate){this.animating=!0;var self=this,active_id=++self.__animID,amplitude=value-self.value,timeStep=0,targetPosition=value,animFrict=1-self.options.friction,timeconst=animFrict+(speed-20)*animFrict*1.3/self.options.maxSpeed,tick=function(){if(active_id===self.__animID){var dis=value-self.value;if(!(Math.abs(dis)>self.options.minValidDist&&self.animating))return self.animating&&(self.value=value,self._callrenderer()),self.animating=!1,active_id!==self.__animID&&(self.__animID=-1),void self._callonComplete("anim");window.requestAnimationFrame(tick),self.value=targetPosition-amplitude*Math.exp(-++timeStep*timeconst),self._callrenderer()}};return void tick()}this.value=value,this._callrenderer()},p.drag=function(move){this.start_drag&&(this.drag_start_loc=this.value,this.start_drag=!1),this.animating=!1,this._deceleration=!1,this.value-=move,!this.options.endless&&(this.value>this._max_value||this.value<0)?this.options.bouncing?(this.__isout=!0,this.value+=.6*move):this.value=this.value>this._max_value?this._max_value:0:!this.options.endless&&this.options.bouncing&&(this.__isout=!1),this._callrenderer()},p.push=function(speed){if(this.stopped=!1,this.options.snapping&&Math.abs(speed)<=this.options.snappingMinSpeed)return void this.cancel();if(this.__speed=speed,this.__startSpeed=speed,this.end_loc=this._calculateEnd(),this.options.snapping){var snap_loc=this.getSnapNum(this.value),end_snap=this.getSnapNum(this.end_loc);if(this.options.paging)return snap_loc=this.getSnapNum(this.drag_start_loc),this.__isout=!1,void(speed>0?this.gotoSnap(snap_loc+1,!0,speed):this.gotoSnap(snap_loc-1,!0,speed));if(snap_loc===end_snap)return void this.cancel();this._callsnapChange(end_snap),this.current_snap=end_snap}this.animating=!1,this.__needsSnap=this.options.endless||this.end_loc>this._min_value&&this.end_loc<this._max_value,this.options.snapping&&this.__needsSnap&&(this.__extraMove=this._calculateExtraMove(this.end_loc)),this._startDecelaration()},p.bounce=function(speed){this.animating||(this.stopped=!1,this.animating=!1,this.__speed=speed,this.__startSpeed=speed,this.end_loc=this._calculateEnd(),this._startDecelaration())},p.stop=function(){this.stopped=!0,this._internalStop()},p.cancel=function(){this.start_drag=!0,this.__isout?(this.__speed=4e-4,this._startDecelaration()):this.options.snapping&&this.gotoSnap(this.getSnapNum(this.value),!0)},p.renderCallback=function(listener,ref){this.__renderHook={fun:listener,ref:ref}},p.snappingCallback=function(listener,ref){this.__snapHook={fun:listener,ref:ref}},p.snapCompleteCallback=function(listener,ref){this.__compHook={fun:listener,ref:ref}},p.getSnapNum=function(value){return Math.floor((value+this.options.snapsize/2)/this.options.snapsize)},p.nextSnap=function(){this._internalStop();var curr_snap=this.getSnapNum(this.value);!this.options.endless&&(curr_snap+1)*this.options.snapsize>this._max_value?(this.__speed=8,this.__needsSnap=!1,this._startDecelaration()):this.gotoSnap(curr_snap+1,!0)},p.prevSnap=function(){this._internalStop();var curr_snap=this.getSnapNum(this.value);!this.options.endless&&(curr_snap-1)*this.options.snapsize<this._min_value?(this.__speed=-8,this.__needsSnap=!1,this._startDecelaration()):this.gotoSnap(curr_snap-1,!0)},p.gotoSnap=function(snap_num,animate,speed){this.changeTo(snap_num*this.options.snapsize,animate,speed,snap_num)},p.destroy=function(){this._internalStop(),this.__renderHook=null,this.__snapHook=null,this.__compHook=null},p._internalStop=function(){this.start_drag=!0,this.animating=!1,this._deceleration=!1,this.__extrStep=0},p._calculateExtraMove=function(value){var m=value%this.options.snapsize;return m<this.options.snapsize/2?-m:this.options.snapsize-m},p._calculateEnd=function(step){for(var temp_speed=this.__speed,temp_value=this.value,i=0;Math.abs(temp_speed)>this.options.minValidDist;)temp_value+=temp_speed,temp_speed*=this.options.friction,i++;return step?i:temp_value},p._checkLimits=function(value){return this.options.endless?value:value<this._min_value?this._min_value:value>this._max_value?this._max_value:value},p._callrenderer=function(){this.__renderHook&&this.__renderHook.fun.call(this.__renderHook.ref,this,this.value)},p._callsnapChange=function(targetSnap){this.__snapHook&&targetSnap!==this.current_snap&&this.__snapHook.fun.call(this.__snapHook.ref,this,targetSnap,targetSnap-this.current_snap)},p._callonComplete=function(type){this.__compHook&&!this.stopped&&this.__compHook.fun.call(this.__compHook.ref,this,this.current_snap,type)},p._computeDeceleration=function(){if(this.options.snapping&&this.__needsSnap){var xtr_move=(this.__startSpeed-this.__speed)/this.__startSpeed*this.__extraMove;this.value+=this.__speed+xtr_move-this.__extrStep,this.__extrStep=xtr_move}else this.value+=this.__speed;if(this.__speed*=this.options.friction,this.options.endless||this.options.bouncing||(this.value<=this._min_value?(this.value=this._min_value,this.__speed=0):this.value>=this._max_value&&(this.value=this._max_value,this.__speed=0)),this._callrenderer(),!this.options.endless&&this.options.bouncing){var out_value=0;this.value<this._min_value?out_value=this._min_value-this.value:this.value>this._max_value&&(out_value=this._max_value-this.value),this.__isout=Math.abs(out_value)>=this.options.minValidDist,this.__isout&&(this.__speed*out_value<=0?this.__speed+=out_value*this.options.outFriction:this.__speed=out_value*this.options.outAcceleration)}},p._startDecelaration=function(){if(!this._deceleration){this._deceleration=!0;var self=this,tick=function(){self._deceleration&&(self._computeDeceleration(),Math.abs(self.__speed)>self.options.minValidDist||self.__isout?window.requestAnimationFrame(tick):(self._deceleration=!1,self.__isout=!1,self.value=self.__needsSnap&&self.options.snapping&&!self.options.paging?self._checkLimits(self.end_loc+self.__extraMove):Math.round(self.value),self._callrenderer(),self._callonComplete("decel")))};tick()}},window.Controller=Controller}(),function(window,document,$){window.MSLayerController=function(slide){this.slide=slide,this.slider=slide.slider,this.layers=[],this.layersCount=0,this.preloadCount=0,this.$layers=$("<div></div>").addClass("ms-slide-layers"),this.$staticLayers=$("<div></div>").addClass("ms-static-layers"),this.$fixedLayers=$("<div></div>").addClass("ms-fixed-layers"),this.$animLayers=$("<div></div>").addClass("ms-anim-layers")};var p=MSLayerController.prototype;p.addLayer=function(layer){switch(layer.slide=this.slide,layer.controller=this,layer.$element.data("position")){case"static":this.hasStaticLayer=!0,layer.$element.appendTo(this.$staticLayers);break;case"fixed":this.hasFixedLayer=!0,layer.$element.appendTo(this.$fixedLayers);break;default:layer.$element.appendTo(this.$animLayers)}layer.create(),this.layers.push(layer),this.layersCount++,layer.parallax&&(this.hasParallaxLayer=!0),layer.needPreload&&this.preloadCount++},p.create=function(){this.slide.$element.append(this.$layers),this.$layers.append(this.$animLayers),this.hasStaticLayer&&this.$layers.append(this.$staticLayers),"center"==this.slider.options.layersMode&&(this.$layers.css("max-width",this.slider.options.width+"px"),this.hasFixedLayer&&this.$fixedLayers.css("max-width",this.slider.options.width+"px"))},p.loadLayers=function(callback){if(this._onReadyCallback=callback,0===this.preloadCount)return void this._onlayersReady();for(var i=0;i!==this.layersCount;++i)this.layers[i].needPreload&&this.layers[i].loadImage()},p.prepareToShow=function(){this.hasParallaxLayer&&this._enableParallaxEffect(),this.hasFixedLayer&&this.$fixedLayers.prependTo(this.slide.view.$element)},p.showLayers=function(){this.layersHideTween&&this.layersHideTween.stop(!0),this.fixedLayersHideTween&&this.fixedLayersHideTween.stop(!0),this._resetLayers(),this.$animLayers.css("opacity","").css("display",""),this.hasFixedLayer&&this.$fixedLayers.css("opacity","").css("display",""),this.ready&&(this._initLayers(),this._locateLayers(),this._startLayers())},p.hideLayers=function(){if(this.slide.selected||this.slider.options.instantStartLayers){var that=this;that.layersHideTween=CTween.animate(this.$animLayers,500,{opacity:0},{complete:function(){that._resetLayers()}}),this.hasFixedLayer&&(this.fixedLayersHideTween=CTween.animate(this.$fixedLayers,500,{opacity:0},{complete:function(){that.$fixedLayers.detach()}})),this.hasParallaxLayer&&this._disableParallaxEffect()}},p.animHideLayers=function(){if(this.ready)for(var i=0;i!==this.layersCount;++i)this.layers[i].hide()},p.setSize=function(width,height,hard){if(this.ready&&(this.slide.selected||this.hasStaticLayer)&&(hard&&this._initLayers(!0),this._locateLayers(!this.slide.selected)),this.slider.options.autoHeight&&this.updateHeight(),"center"==this.slider.options.layersMode){var left=Math.max(0,(width-this.slider.options.width)/2)+"px";this.$layers[0].style.left=left,this.$fixedLayers[0].style.left=left}},p.updateHeight=function(){var h=this.slide.getHeight()+"px";this.$layers[0].style.height=h,this.$fixedLayers[0].style.height=h},p._onlayersReady=function(){this.ready=!0,this.hasStaticLayer&&!this.slide.isSleeping&&this._initLayers(!1,!0),this._onReadyCallback.call(this.slide)},p.onSlideSleep=function(){},p.onSlideWakeup=function(){this.hasStaticLayer&&this.ready&&this._initLayers(!1,!0)},p.destroy=function(){this.slide.selected&&this.hasParallaxLayer&&this._disableParallaxEffect();for(var i=0;i<this.layersCount;++i)this.layers[i].$element.stop(!0).remove();this.$layers.remove(),this.$staticLayers.remove(),this.$fixedLayers.remove(),this.$animLayers.remove()},p._startLayers=function(){for(var i=0;i!==this.layersCount;++i)this.layers[i].start()},p._initLayers=function(force,onlyStatics){if(!(this.init&&!force||this.slider.init_safemode)){this.init=onlyStatics!==!0;var i=0;if(onlyStatics&&!this.staticsInit)for(this.staticsInit=!0;i!==this.layersCount;++i)this.layers[i].staticLayer&&this.layers[i].init();else if(this.staticsInit&&!force)for(;i!==this.layersCount;++i)this.layers[i].staticLayer||this.layers[i].init();else for(;i!==this.layersCount;++i)this.layers[i].init()}},p._locateLayers=function(onlyStatics){var i=0;if(onlyStatics)for(;i!==this.layersCount;++i)this.layers[i].staticLayer&&this.layers[i].locate();else for(;i!==this.layersCount;++i)this.layers[i].locate()},p._resetLayers=function(){this.$animLayers.css("display","none").css("opacity",1);for(var i=0;i!==this.layersCount;++i)this.layers[i].reset()},p._applyParallax=function(x,y,fast){for(var i=0;i!==this.layersCount;++i)null!=this.layers[i].parallax&&this.layers[i].moveParallax(x,y,fast)},p._enableParallaxEffect=function(){"swipe"===this.slider.options.parallaxMode?this.slide.view.addEventListener(MSViewEvents.SCROLL,this._swipeParallaxMove,this):this.slide.$element.on("mousemove",{that:this},this._mouseParallaxMove).on("mouseleave",{that:this},this._resetParalax)},p._disableParallaxEffect=function(){"swipe"===this.slider.options.parallaxMode?this.slide.view.removeEventListener(MSViewEvents.SCROLL,this._swipeParallaxMove,this):this.slide.$element.off("mousemove",this._mouseParallaxMove).off("mouseleave",this._resetParalax)},p._resetParalax=function(e){var that=e.data.that;that._applyParallax(0,0)},p._mouseParallaxMove=function(e){var that=e.data.that,os=that.slide.$element.offset(),slider=that.slider;if("mouse:y-only"!==slider.options.parallaxMode)var x=e.pageX-os.left-that.slide.__width/2;else var x=0;if("mouse:x-only"!==slider.options.parallaxMode)var y=e.pageY-os.top-that.slide.__height/2;else var y=0;that._applyParallax(-x,-y)},p._swipeParallaxMove=function(){var value=this.slide.position-this.slide.view.__contPos;"v"===this.slider.options.dir?this._applyParallax(0,value,!0):this._applyParallax(value,0,!0)}}(window,document,jQuery),function($){window.MSLayerEffects={};var installed,_fade={opacity:0};MSLayerEffects.setup=function(){if(!installed){installed=!0;var st=MSLayerEffects,transform_css=window._jcsspfx+"Transform",transform_orig_css=window._jcsspfx+"TransformOrigin",o=$.browser.opera;_2d=window._css2d&&window._cssanim&&!o,st.defaultValues={left:0,top:0,opacity:isMSIE("<9")?1:"",right:0,bottom:0},st.defaultValues[transform_css]="",st.rf=1,st.presetEffParams={random:"30|300","long":300,"short":30,"false":!1,"true":!0,tl:"top left",bl:"bottom left",tr:"top right",br:"bottom right",rt:"top right",lb:"bottom left",lt:"top left",rb:"bottom right",t:"top",b:"bottom",r:"right",l:"left",c:"center"},st.fade=function(){return _fade},st.left=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateX("+-dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};return r.left=-dist*st.rf+"px",r},st.right=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateX("+dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};
return r.left=dist*st.rf+"px",r},st.top=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateY("+-dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};return r.top=-dist*st.rf+"px",r},st.bottom=_2d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateY("+dist*st.rf+"px)",r}:function(dist,fade){var r=fade===!1?{}:{opacity:0};return r.top=dist*st.rf+"px",r},st.from=_2d?function(leftdis,topdis,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="translateX("+leftdis*st.rf+"px) translateY("+topdis*st.rf+"px)",r}:function(leftdis,topdis,fade){var r=fade===!1?{}:{opacity:0};return r.top=topdis*st.rf+"px",r.left=leftdis*st.rf+"px",r},st.rotate=_2d?function(deg,orig){var r={opacity:0};return r[transform_css]=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(){return _fade},st.rotateleft=_2d?function(deg,dist,orig,fade){var r=st.left(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.left(dist,fade)},st.rotateright=_2d?function(deg,dist,orig,fade){var r=st.right(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.right(dist,fade)},st.rotatetop=_2d?function(deg,dist,orig,fade){var r=st.top(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.top(dist,fade)},st.rotatebottom=_2d?function(deg,dist,orig,fade){var r=st.bottom(dist,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,dist,orig,fade){return st.bottom(dist,fade)},st.rotatefrom=_2d?function(deg,leftdis,topdis,orig,fade){var r=st.from(leftdis,topdis,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,leftdis,topdis,orig,fade){return st.from(leftdis,topdis,fade)},st.skewleft=_2d?function(deg,dist,fade){var r=st.left(dist,fade);return r[transform_css]+=" skewX("+deg+"deg)",r}:function(deg,dist,fade){return st.left(dist,fade)},st.skewright=_2d?function(deg,dist,fade){var r=st.right(dist,fade);return r[transform_css]+=" skewX("+-deg+"deg)",r}:function(deg,dist,fade){return st.right(dist,fade)},st.skewtop=_2d?function(deg,dist,fade){var r=st.top(dist,fade);return r[transform_css]+=" skewY("+deg+"deg)",r}:function(deg,dist,fade){return st.top(dist,fade)},st.skewbottom=_2d?function(deg,dist,fade){var r=st.bottom(dist,fade);return r[transform_css]+=" skewY("+-deg+"deg)",r}:function(deg,dist,fade){return st.bottom(dist,fade)},st.scale=_2d?function(x,y,orig,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,orig,fade){return fade===!1?{}:{opacity:0}},st.scaleleft=_2d?function(x,y,dist,orig,fade){var r=st.left(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.left(dist,fade)},st.scaleright=_2d?function(x,y,dist,orig,fade){var r=st.right(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.right(dist,fade)},st.scaletop=_2d?function(x,y,dist,orig,fade){var r=st.top(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.top(dist,fade)},st.scalebottom=_2d?function(x,y,dist,orig,fade){var r=st.bottom(dist,fade);return r[transform_css]=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,dist,orig,fade){return st.bottom(dist,fade)},st.scalefrom=_2d?function(x,y,leftdis,topdis,orig,fade){var r=st.from(leftdis,topdis,fade);return r[transform_css]+=" scaleX("+x+") scaleY("+y+")",orig&&(r[transform_orig_css]=orig),r}:function(x,y,leftdis,topdis,orig,fade){return st.from(leftdis,topdis,fade)},st.rotatescale=_2d?function(deg,x,y,orig,fade){var r=st.scale(x,y,orig,fade);return r[transform_css]+=" rotate("+deg+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(deg,x,y,orig,fade){return st.scale(x,y,orig,fade)},st.front=window._css3d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+dist+"px ) rotate(0.001deg)",r}:function(){return _fade},st.back=window._css3d?function(dist,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+-dist+"px ) rotate(0.001deg)",r}:function(){return _fade},st.rotatefront=window._css3d?function(deg,dist,orig,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+dist+"px ) rotate("+(deg||.001)+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(){return _fade},st.rotateback=window._css3d?function(deg,dist,orig,fade){var r=fade===!1?{}:{opacity:0};return r[transform_css]="perspective(2000px) translate3d(0 , 0 ,"+-dist+"px ) rotate("+(deg||.001)+"deg)",orig&&(r[transform_orig_css]=orig),r}:function(){return _fade},st.rotate3dleft=window._css3d?function(x,y,z,dist,orig,fade){var r=st.left(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.left(dist,fade)},st.rotate3dright=window._css3d?function(x,y,z,dist,orig,fade){var r=st.right(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.right(dist,fade)},st.rotate3dtop=window._css3d?function(x,y,z,dist,orig,fade){var r=st.top(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.top(dist,fade)},st.rotate3dbottom=window._css3d?function(x,y,z,dist,orig,fade){var r=st.bottom(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.bottom(dist,fade)},st.rotate3dfront=window._css3d?function(x,y,z,dist,orig,fade){var r=st.front(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.front(dist,fade)},st.rotate3dback=window._css3d?function(x,y,z,dist,orig,fade){var r=st.back(dist,fade);return r[transform_css]+=(x?" rotateX("+x+"deg)":" ")+(y?" rotateY("+y+"deg)":"")+(z?" rotateZ("+z+"deg)":""),orig&&(r[transform_orig_css]=orig),r}:function(x,y,z,dist,orig,fade){return st.back(dist,fade)},st.t=window._css3d?function(fade,tx,ty,tz,r,rx,ry,rz,scx,scy,skx,sky,ox,oy,oz){var _r=fade===!1?{}:{opacity:0},transform="perspective(2000px) ";"n"!==tx&&(transform+="translateX("+tx*st.rf+"px) "),"n"!==ty&&(transform+="translateY("+ty*st.rf+"px) "),"n"!==tz&&(transform+="translateZ("+tz*st.rf+"px) "),"n"!==r&&(transform+="rotate("+r+"deg) "),"n"!==rx&&(transform+="rotateX("+rx+"deg) "),"n"!==ry&&(transform+="rotateY("+ry+"deg) "),"n"!==rz&&(transform+="rotateZ("+rz+"deg) "),"n"!==skx&&(transform+="skewX("+skx+"deg) "),"n"!==sky&&(transform+="skewY("+sky+"deg) "),"n"!==scx&&(transform+="scaleX("+scx+") "),"n"!==scy&&(transform+="scaleY("+scy+")"),_r[transform_css]=transform;var trans_origin="";return trans_origin+="n"!==ox?ox+"% ":"50% ",trans_origin+="n"!==oy?oy+"% ":"50% ",trans_origin+="n"!==oz?oz+"px":"",_r[transform_orig_css]=trans_origin,_r}:function(fade,tx,ty,tz,r){var r=fade===!1?{}:{opacity:0};return"n"!==tx&&(r.left=tx*st.rf+"px"),"n"!==ty&&(r.top=ty*st.rf+"px"),r}}}}(jQuery),function($){window.MSLayerElement=function(){this.start_anim={name:"fade",duration:1e3,ease:"linear",delay:0},this.end_anim={duration:1e3,ease:"linear"},this.type="text",this.resizable=!0,this.minWidth=-1,this.isVisible=!0,this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-left","margin-right","padding-right","margin-left","padding-bottom","font-size","line-height","width","left","right","top","bottom"],this.baseStyle={}};var p=MSLayerElement.prototype;p.setStartAnim=function(anim){$.extend(this.start_anim,anim),$.extend(this.start_anim,this._parseEff(this.start_anim.name)),this.$element.css("visibility","hidden")},p.setEndAnim=function(anim){$.extend(this.end_anim,anim)},p.create=function(){if(this.$element.css("display","none"),this.resizable=this.$element.data("resize")!==!1,this.fixed=this.$element.data("fixed")===!0,void 0!==this.$element.data("widthlimit")&&(this.minWidth=this.$element.data("widthlimit")),this.end_anim.name||(this.end_anim.name=this.start_anim.name),this.end_anim.time&&(this.autoHide=!0),this.staticLayer="static"===this.$element.data("position"),this.fixedLayer="fixed"===this.$element.data("position"),this.layersCont=this.controller.$layers,this.staticLayer&&this.$element.css("display","").css("visibility",""),void 0!==this.$element.data("action")){var slideController=this.slide.slider.slideController;this.$element.on("click",function(event){slideController.runAction($(this).data("action")),event.preventDefault()}).addClass("ms-action-layer")}$.extend(this.end_anim,this._parseEff(this.end_anim.name)),this.slider=this.slide.slider;var layerOrigin=this.layerOrigin=this.$element.data("origin");if(layerOrigin){var vOrigin=layerOrigin.charAt(0),hOrigin=layerOrigin.charAt(1),offsetX=this.$element.data("offset-x"),offsetY=this.$element.data("offset-y");switch(void 0===offsetY&&(offsetY=0),vOrigin){case"t":this.$element[0].style.top=offsetY+"px";break;case"b":this.$element[0].style.bottom=offsetY+"px";break;case"m":this.$element[0].style.top=offsetY+"px",this.middleAlign=!0}switch(void 0===offsetX&&(offsetX=0),hOrigin){case"l":this.$element[0].style.left=offsetX+"px";break;case"r":this.$element[0].style.right=offsetX+"px";break;case"c":this.$element[0].style.left=offsetX+"px",this.centerAlign=!0}}this.parallax=this.$element.data("parallax"),null!=this.parallax&&(this.parallax/=100,this.$parallaxElement=$("<div></div>").addClass("ms-parallax-layer"),this.link?(this.link.wrap(this.$parallaxElement),this.$parallaxElement=this.link.parent()):(this.$element.wrap(this.$parallaxElement),this.$parallaxElement=this.$element.parent()),this._lastParaX=0,this._lastParaY=0,this._paraX=0,this._paraY=0,this.alignedToBot=this.layerOrigin&&-1!==this.layerOrigin.indexOf("b"),this.alignedToBot&&this.$parallaxElement.css("bottom",0),this.parallaxRender=window._css3d?this._parallaxCSS3DRenderer:window._css2d?this._parallaxCSS2DRenderer:this._parallax2DRenderer,"swipe"!==this.slider.options.parallaxMode&&averta.Ticker.add(this.parallaxRender,this)),$.removeDataAttrs(this.$element,["data-src"])},p.init=function(){this.initialized=!0;var value;this.$element.css("visibility","");for(var i=0,l=this.__cssConfig.length;l>i;i++){var key=this.__cssConfig[i];"text"===this.type&&"width"===key?value=this.$element[0].style.width:(value=this.$element.css(key),"width"!==key&&"height"!==key||"0px"!==value||(value=this.$element.data(key)+"px")),"auto"!=value&&""!=value&&"normal"!=value&&(this.baseStyle[key]=parseInt(value))}this.middleAlign&&(this.baseHeight=this.$element.outerHeight(!1)),this.centerAlign&&(this.baseWidth=this.$element.outerWidth(!1))},p.locate=function(){if(this.slide.ready){var factor,isPosition,width=parseFloat(this.layersCont.css("width")),height=parseFloat(this.layersCont.css("height"));!this.staticLayer&&"none"===this.$element.css("display")&&this.isVisible&&this.$element.css("display","").css("visibility","hidden"),factor=this.resizeFactor=width/this.slide.slider.options.width;for(var key in this.baseStyle)isPosition="top"===key||"left"===key||"bottom"===key||"right"===key,factor=this.fixed&&isPosition?1:this.resizeFactor,(this.resizable||isPosition)&&("top"===key&&this.middleAlign?(this.$element[0].style.top="0px",this.baseHeight=this.$element.outerHeight(!1),this.$element[0].style.top=this.baseStyle.top*factor+(height-this.baseHeight)/2+"px"):"left"===key&&this.centerAlign?(this.$element[0].style.left="0px",this.baseWidth=this.$element.outerWidth(!1),this.$element[0].style.left=this.baseStyle.left*factor+(width-this.baseWidth)/2+"px"):this.$element.css(key,this.baseStyle[key]*factor+"px"));this.visible(this.minWidth<width)}},p.start=function(){if(!this.isShowing&&!this.staticLayer){this.isShowing=!0;var key,base;MSLayerEffects.rf=this.resizeFactor;var effect_css=MSLayerEffects[this.start_anim.eff_name].apply(null,this._parseEffParams(this.start_anim.eff_params)),start_css_eff={};for(key in effect_css)this._checkPosKey(key,effect_css)||(null!=MSLayerEffects.defaultValues[key]&&(start_css_eff[key]=MSLayerEffects.defaultValues[key]),key in this.baseStyle&&(base=this.baseStyle[key],this.middleAlign&&"top"===key&&(base+=(parseInt(this.layersCont.height())-this.$element.outerHeight(!1))/2),this.centerAlign&&"left"===key&&(base+=(parseInt(this.layersCont.width())-this.$element.outerWidth(!1))/2),effect_css[key]=base+parseFloat(effect_css[key])+"px",start_css_eff[key]=base+"px"),this.$element.css(key,effect_css[key]));var that=this;clearTimeout(this.to),this.to=setTimeout(function(){that.$element.css("visibility",""),that._playAnimation(that.start_anim,start_css_eff)},that.start_anim.delay||.01),this.clTo=setTimeout(function(){that.show_cl=!0},(this.start_anim.delay||.01)+this.start_anim.duration),this.autoHide&&(clearTimeout(this.hto),this.hto=setTimeout(function(){that.hide()},that.end_anim.time))}},p.hide=function(){if(!this.staticLayer){this.isShowing=!1;var effect_css=MSLayerEffects[this.end_anim.eff_name].apply(null,this._parseEffParams(this.end_anim.eff_params));for(key in effect_css)this._checkPosKey(key,effect_css)||(key===window._jcsspfx+"TransformOrigin"&&this.$element.css(key,effect_css[key]),key in this.baseStyle&&(effect_css[key]=this.baseStyle[key]+parseFloat(effect_css[key])+"px"));this._playAnimation(this.end_anim,effect_css),clearTimeout(this.to),clearTimeout(this.hto),clearTimeout(this.clTo)}},p.reset=function(){this.staticLayer||(this.isShowing=!1,this.$element[0].style.display="none",this.$element.css("opacity",""),this.$element[0].style.transitionDuration="",this.show_tween&&this.show_tween.stop(!0),clearTimeout(this.to),clearTimeout(this.hto))},p.destroy=function(){this.reset(),this.$element.remove()},p.visible=function(value){this.isVisible!=value&&(this.isVisible=value,this.$element.css("display",value?"":"none"))},p.moveParallax=function(x,y,fast){this._paraX=x,this._paraY=y,fast&&(this._lastParaX=x,this._lastParaY=y,this.parallaxRender())},p._playAnimation=function(animation,css){var options={};animation.ease&&(options.ease=animation.ease),options.transProperty=window._csspfx+"transform,opacity",this.show_tween=CTween.animate(this.$element,animation.duration,css,options)},p._randomParam=function(value){var min=Number(value.slice(0,value.indexOf("|"))),max=Number(value.slice(value.indexOf("|")+1));return min+Math.random()*(max-min)},p._parseEff=function(eff_name){var eff_params=[];if(-1!==eff_name.indexOf("(")){var value,temp=eff_name.slice(0,eff_name.indexOf("(")).toLowerCase();eff_params=eff_name.slice(eff_name.indexOf("(")+1,-1).replace(/\"|\'|\s/g,"").split(","),eff_name=temp;for(var i=0,l=eff_params.length;l>i;++i)value=eff_params[i],value in MSLayerEffects.presetEffParams&&(value=MSLayerEffects.presetEffParams[value]),eff_params[i]=value}return{eff_name:eff_name,eff_params:eff_params}},p._parseEffParams=function(params){for(var eff_params=[],i=0,l=params.length;l>i;++i){var value=params[i];"string"==typeof value&&-1!==value.indexOf("|")&&(value=this._randomParam(value)),eff_params[i]=value}return eff_params},p._checkPosKey=function(key,style){return"left"===key&&!(key in this.baseStyle)&&"right"in this.baseStyle?(style.right=-parseInt(style.left)+"px",delete style.left,!0):"top"===key&&!(key in this.baseStyle)&&"bottom"in this.baseStyle?(style.bottom=-parseInt(style.top)+"px",delete style.top,!0):!1},p._parallaxCalc=function(){var x_def=this._paraX-this._lastParaX,y_def=this._paraY-this._lastParaY;this._lastParaX+=x_def/12,this._lastParaY+=y_def/12,Math.abs(x_def)<.019&&(this._lastParaX=this._paraX),Math.abs(y_def)<.019&&(this._lastParaY=this._paraY)},p._parallaxCSS3DRenderer=function(){this._parallaxCalc(),this.$parallaxElement[0].style[window._jcsspfx+"Transform"]="translateX("+this._lastParaX*this.parallax+"px) translateY("+this._lastParaY*this.parallax+"px) translateZ(0)"},p._parallaxCSS2DRenderer=function(){this._parallaxCalc(),this.$parallaxElement[0].style[window._jcsspfx+"Transform"]="translateX("+this._lastParaX*this.parallax+"px) translateY("+this._lastParaY*this.parallax+"px)"},p._parallax2DRenderer=function(){this._parallaxCalc(),this.alignedToBot?this.$parallaxElement[0].style.bottom=this._lastParaY*this.parallax+"px":this.$parallaxElement[0].style.top=this._lastParaY*this.parallax+"px",this.$parallaxElement[0].style.left=this._lastParaX*this.parallax+"px"}}(jQuery),function($){window.MSImageLayerElement=function(){MSLayerElement.call(this),this.needPreload=!0,this.__cssConfig=["width","height","margin-top","padding-top","margin-bottom","padding-left","margin-right","padding-right","margin-left","padding-bottom","left","right","top","bottom"],this.type="image"},MSImageLayerElement.extend(MSLayerElement);var p=MSImageLayerElement.prototype,_super=MSLayerElement.prototype;p.create=function(){if(this.link){var p=this.$element.parent();p.append(this.link),this.link.append(this.$element),this.link.removeClass("ms-layer"),this.$element.addClass("ms-layer"),p=null}if(_super.create.call(this),void 0!=this.$element.data("src"))this.img_src=this.$element.data("src"),this.$element.removeAttr("data-src");else{var that=this;this.$element.on("load",function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()}).each($.jqLoadFix)}$.browser.msie&&this.$element.on("dragstart",function(event){event.preventDefault()})},p.loadImage=function(){var that=this;this.$element.preloadImg(this.img_src,function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()})}}(jQuery),function($){window.MSVideoLayerElement=function(){MSLayerElement.call(this),this.__cssConfig.push("height"),this.type="video"},MSVideoLayerElement.extend(MSLayerElement);var p=MSVideoLayerElement.prototype,_super=MSLayerElement.prototype;p.__playVideo=function(){this.img&&CTween.fadeOut(this.img,500,2),CTween.fadeOut(this.video_btn,500,2),this.video_frame.attr("src","about:blank").css("display","block"),-1==this.video_url.indexOf("?")&&(this.video_url+="?"),this.video_frame.attr("src",this.video_url+"&autoplay=1")},p.start=function(){_super.start.call(this),this.$element.data("autoplay")&&this.__playVideo()},p.reset=function(){return _super.reset.call(this),(this.needPreload||this.$element.data("btn"))&&(this.video_btn.css("opacity",1).css("display","block"),this.video_frame.attr("src","about:blank").css("display","none")),this.needPreload?void this.img.css("opacity",1).css("display","block"):void this.video_frame.attr("src",this.video_url)},p.create=function(){_super.create.call(this),this.video_frame=this.$element.find("iframe").css({width:"100%",height:"100%"}),this.video_url=this.video_frame.attr("src");var has_img=0!=this.$element.has("img").length;if(has_img||this.$element.data("btn")){this.video_frame.attr("src","about:blank").css("display","none");var that=this;if(this.video_btn=$("<div></div>").appendTo(this.$element).addClass("ms-video-btn").click(function(){that.__playVideo()}),has_img){if(this.needPreload=!0,this.img=this.$element.find("img:first").addClass("ms-video-img"),void 0!==this.img.data("src"))this.img_src=this.img.data("src"),this.img.removeAttr("data-src");else{var that=this;this.img.attr("src",this.img_src).on("load",function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()}).each($.jqLoadFix)}$.browser.msie&&this.img.on("dragstart",function(event){event.preventDefault()})}}},p.loadImage=function(){var that=this;this.img.preloadImg(this.img_src,function(){that.controller.preloadCount--,0===that.controller.preloadCount&&that.controller._onlayersReady()})}}(jQuery),function($){"use strict";window.MSHotspotLayer=function(){MSLayerElement.call(this),this.__cssConfig=["margin-top","padding-top","margin-bottom","padding-left","margin-right","padding-right","margin-left","padding-bottom","left","right","top","bottom"],this.ease="Expo",this.hide_start=!0,this.type="hotspot"},MSHotspotLayer.extend(MSLayerElement);var p=MSHotspotLayer.prototype,_super=MSLayerElement.prototype;p._showTT=function(){this.show_cl&&(clearTimeout(this.hto),this._tween&&this._tween.stop(!0),this.hide_start&&(this.align=this._orgAlign,this._locateTT(),this.tt.css({display:"block"}),this._tween=CTween.animate(this.tt,900,this.to,{ease:"easeOut"+this.ease}),this.hide_start=!1))},p._hideTT=function(){if(this.show_cl){this._tween&&this._tween.stop(!0);var that=this;clearTimeout(this.hto),this.hto=setTimeout(function(){that.hide_start=!0,that._tween=CTween.animate(that.tt,900,that.from,{ease:"easeOut"+that.ease,complete:function(){that.tt.css("display","none")}})},200)}},p._updateClassName=function(name){this._lastClass&&this.tt.removeClass(this._lastClass),this.tt.addClass(name),this._lastClass=name},p._alignPolicy=function(){{var w=(this.tt.outerHeight(!1),Math.max(this.tt.outerWidth(!1),parseInt(this.tt.css("max-width")))),ww=window.innerWidth;window.innerHeight}switch(this.align){case"top":if(this.base_t<0)return"bottom";break;case"right":if(this.base_l+w>ww||this.base_t<0)return"bottom";break;case"left":if(this.base_l<0||this.base_t<0)return"bottom"}return null},p._locateTT=function(){var os=this.$element.offset(),os2=this.slide.slider.$element.offset(),dist=50,space=15;this.pos_x=os.left-os2.left-this.slide.slider.$element.scrollLeft(),this.pos_y=os.top-os2.top-this.slide.slider.$element.scrollTop(),this.from={opacity:0},this.to={opacity:1},this._updateClassName("ms-tooltip-"+this.align),this.tt_arrow.css("margin-left","");var arrow_w=15,arrow_h=15;switch(this.align){case"top":var w=Math.min(this.tt.outerWidth(!1),parseInt(this.tt.css("max-width")));this.base_t=this.pos_y-this.tt.outerHeight(!1)-arrow_h-space,this.base_l=this.pos_x-w/2,this.base_l+w>window.innerWidth&&(this.tt_arrow.css("margin-left",-arrow_w/2+this.base_l+w-window.innerWidth+"px"),this.base_l=window.innerWidth-w),this.base_l<0&&(this.base_l=0,this.tt_arrow.css("margin-left",-arrow_w/2+this.pos_x-this.tt.outerWidth(!1)/2+"px")),window._css3d?(this.from[window._jcsspfx+"Transform"]="translateY(-"+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.top=this.base_t-dist+"px",this.to.top=this.base_t+"px");break;case"bottom":var w=Math.min(this.tt.outerWidth(!1),parseInt(this.tt.css("max-width")));this.base_t=this.pos_y+arrow_h+space,this.base_l=this.pos_x-w/2,this.base_l+w>window.innerWidth&&(this.tt_arrow.css("margin-left",-arrow_w/2+this.base_l+w-window.innerWidth+"px"),this.base_l=window.innerWidth-w),this.base_l<0&&(this.base_l=0,this.tt_arrow.css("margin-left",-arrow_w/2+this.pos_x-this.tt.outerWidth(!1)/2+"px")),window._css3d?(this.from[window._jcsspfx+"Transform"]="translateY("+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.top=this.base_t+dist+"px",this.to.top=this.base_t+"px");break;case"right":this.base_l=this.pos_x+arrow_w+space,this.base_t=this.pos_y-this.tt.outerHeight(!1)/2,window._css3d?(this.from[window._jcsspfx+"Transform"]="translateX("+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.left=this.base_l+dist+"px",this.to.left=this.base_l+"px");break;case"left":this.base_l=this.pos_x-arrow_w-this.tt.outerWidth(!1)-space,this.base_t=this.pos_y-this.tt.outerHeight(!1)/2,window._css3d?(this.from[window._jcsspfx+"Transform"]="translateX(-"+dist+"px)",this.to[window._jcsspfx+"Transform"]=""):(this.from.left=this.base_l-dist+"px",this.to.left=this.base_l+"px")}var policyAlign=this._alignPolicy();return null!==policyAlign?(this.align=policyAlign,void this._locateTT()):(this.tt.css("top",parseInt(this.base_t)+"px").css("left",parseInt(this.base_l)+"px"),void this.tt.css(this.from))},p.start=function(){_super.start.call(this),this.tt.appendTo(this.slide.slider.$element),this.tt.css("display","none")},p.reset=function(){_super.reset.call(this),this.tt.detach()},p.create=function(){var that=this;this._orgAlign=this.align=void 0!==this.$element.data("align")?this.$element.data("align"):"top",this.data=this.$element.html(),this.$element.html("").on("mouseenter",function(){that._showTT()}).on("mouseleave",function(){that._hideTT()}),this.point=$('<div><div class="ms-point-center"></div><div class="ms-point-border"></div></div>').addClass("ms-tooltip-point").appendTo(this.$element);var link=this.$element.data("link"),target=this.$element.data("target");link&&this.point.on("click",function(){window.open(link,target||"_self")}),this.tt=$("<div></div>").addClass("ms-tooltip").css("display","hidden").css("opacity",0),void 0!==this.$element.data("width")&&this.tt.css("width",this.$element.data("width")).css("max-width",this.$element.data("width")),this.tt_arrow=$("<div></div>").addClass("ms-tooltip-arrow").appendTo(this.tt),this._updateClassName("ms-tooltip-"+this.align),this.ttcont=$("<div></div>").addClass("ms-tooltip-cont").html(this.data).appendTo(this.tt),this.$element.data("stay-hover")===!0&&this.tt.on("mouseenter",function(){that.hide_start||(clearTimeout(that.hto),that._tween.stop(!0),that._showTT())}).on("mouseleave",function(){that._hideTT()}),_super.create.call(this)}}(jQuery),function(){window.MSButtonLayer=function(){MSLayerElement.call(this),this.type="button"},MSButtonLayer.extend(MSLayerElement);var p=MSButtonLayer.prototype,_super=MSLayerElement.prototype,positionKies=["top","left","bottom","right"];p.create=function(){_super.create.call(this),this.$element.wrap('<div class="ms-btn-container"></div>').css("position","relative"),this.$container=this.$element.parent()},p.locate=function(){_super.locate.call(this);for(var key,tempValue,i=0;4>i;i++)key=positionKies[i],key in this.baseStyle&&(tempValue=this.$element.css(key),this.$element.css(key,""),this.$container.css(key,tempValue));this.$container.width(this.$element.outerWidth(!0)).height(this.$element.outerHeight(!0))}}(jQuery),window.MSSliderEvent=function(type){this.type=type},MSSliderEvent.CHANGE_START="ms_changestart",MSSliderEvent.CHANGE_END="ms_changeend",MSSliderEvent.WAITING="ms_waiting",MSSliderEvent.AUTOPLAY_CHANGE="ms_autoplaychange",MSSliderEvent.VIDEO_PLAY="ms_videoPlay",MSSliderEvent.VIDEO_CLOSE="ms_videoclose",MSSliderEvent.INIT="ms_init",MSSliderEvent.HARD_UPDATE="ms_hard_update",MSSliderEvent.RESIZE="ms_resize",MSSliderEvent.RESERVED_SPACE_CHANGE="ms_rsc",MSSliderEvent.DESTROY="ms_destroy",function(window,document,$){"use strict";window.MSSlide=function(){this.$element=null,this.$loading=$("<div></div>").addClass("ms-slide-loading"),this.view=null,this.index=-1,this.__width=0,this.__height=0,this.fillMode="fill",this.selected=!1,this.pselected=!1,this.autoAppend=!0,this.isSleeping=!0,this.moz=$.browser.mozilla};var p=MSSlide.prototype;p.onSwipeStart=function(){this.link&&(this.linkdis=!0),this.video&&(this.videodis=!0)},p.onSwipeMove=function(e){var move=Math.max(Math.abs(e.data.distanceX),Math.abs(e.data.distanceY));this.swipeMoved=move>4},p.onSwipeCancel=function(){return this.swipeMoved?void(this.swipeMoved=!1):(this.link&&(this.linkdis=!1),void(this.video&&(this.videodis=!1)))},p.setupLayerController=function(){this.hasLayers=!0,this.layerController=new MSLayerController(this)},p.assetsLoaded=function(){this.ready=!0,this.slider.api._startTimer(),(this.selected||this.pselected&&this.slider.options.instantStartLayers)&&(this.hasLayers&&this.layerController.showLayers(),this.vinit&&(this.bgvideo.play(),this.autoPauseBgVid||(this.bgvideo.currentTime=0))),this.isSleeping||this.setupBG(),CTween.fadeOut(this.$loading,300,!0),(0===this.slider.options.preload||"all"===this.slider.options.preload)&&this.index<this.view.slideList.length-1?this.view.slideList[this.index+1].loadImages():"all"===this.slider.options.preload&&this.index===this.view.slideList.length-1&&this.slider._removeLoading()},p.setBG=function(img){this.hasBG=!0;var that=this;this.$imgcont=$("<div></div>").addClass("ms-slide-bgcont"),this.$element.append(this.$loading).append(this.$imgcont),this.$bg_img=$(img).css("visibility","hidden"),this.$imgcont.append(this.$bg_img),this.bgAligner=new MSAligner(that.fillMode,that.$imgcont,that.$bg_img),this.bgAligner.widthOnly=this.slider.options.autoHeight,that.slider.options.autoHeight&&(that.pselected||that.selected)&&that.slider.setHeight(that.slider.options.height),void 0!==this.$bg_img.data("src")?(this.bg_src=this.$bg_img.data("src"),this.$bg_img.removeAttr("data-src")):this.$bg_img.one("load",function(event){that._onBGLoad(event)}).each($.jqLoadFix)},p.setupBG=function(){!this.initBG&&this.bgLoaded&&(this.initBG=!0,this.$bg_img.css("visibility",""),this.bgWidth=this.bgNatrualWidth||this.$bg_img.width(),this.bgHeight=this.bgNatrualHeight||this.$bg_img.height(),CTween.fadeIn(this.$imgcont,300),this.slider.options.autoHeight&&this.$imgcont.height(this.bgHeight*this.ratio),this.bgAligner.init(this.bgWidth,this.bgHeight),this.setSize(this.__width,this.__height),this.slider.options.autoHeight&&(this.pselected||this.selected)&&this.slider.setHeight(this.getHeight()))},p.loadImages=function(){if(!this.ls){if(this.ls=!0,this.bgvideo&&this.bgvideo.load(),this.hasBG&&this.bg_src){var that=this;this.$bg_img.preloadImg(this.bg_src,function(event){that._onBGLoad(event)})}this.hasLayers&&this.layerController.loadLayers(this._onLayersLoad),this.hasBG||this.hasLayers||this.assetsLoaded()}},p._onLayersLoad=function(){this.layersLoaded=!0,(!this.hasBG||this.bgLoaded)&&this.assetsLoaded()},p._onBGLoad=function(event){this.bgNatrualWidth=event.width,this.bgNatrualHeight=event.height,this.bgLoaded=!0,$.browser.msie&&this.$bg_img.on("dragstart",function(event){event.preventDefault()}),(!this.hasLayers||this.layerController.ready)&&this.assetsLoaded()},p.setBGVideo=function($video){if($video[0].play){if(window._mobile)return void $video.remove();this.bgvideo=$video[0];var that=this;$video.addClass("ms-slide-bgvideo"),$video.data("loop")!==!1&&this.bgvideo.addEventListener("ended",function(){that.bgvideo.play()}),$video.data("mute")!==!1&&(this.bgvideo.muted=!0),$video.data("autopause")===!0&&(this.autoPauseBgVid=!0),this.bgvideo_fillmode=$video.data("fill-mode")||"fill","none"!==this.bgvideo_fillmode&&(this.bgVideoAligner=new MSAligner(this.bgvideo_fillmode,this.$element,$video),this.bgvideo.addEventListener("loadedmetadata",function(){that.vinit||(that.vinit=!0,that.video_aspect=that.bgVideoAligner.baseHeight/that.bgVideoAligner.baseWidth,that.bgVideoAligner.init(that.bgvideo.videoWidth,that.bgvideo.videoHeight),that._alignBGVideo(),CTween.fadeIn($(that.bgvideo),200),that.selected&&that.bgvideo.play())})),$video.css("opacity",0),this.$bgvideocont=$("<div></div>").addClass("ms-slide-bgvideocont").append($video),this.hasBG?this.$imgcont.before(this.$bgvideocont):this.$bgvideocont.appendTo(this.$element)}},p._alignBGVideo=function(){this.bgvideo_fillmode&&"none"!==this.bgvideo_fillmode&&this.bgVideoAligner.align()},p.setSize=function(width,height,hard){this.__width=width,this.slider.options.autoHeight&&(this.bgLoaded?(this.ratio=this.__width/this.bgWidth,height=Math.floor(this.ratio*this.bgHeight),this.$imgcont.height(height)):(this.ratio=width/this.slider.options.width,height=this.slider.options.height*this.ratio)),this.__height=height,this.$element.width(width).height(height),this.hasBG&&this.bgLoaded&&this.bgAligner.align(),this._alignBGVideo(),this.hasLayers&&this.layerController.setSize(width,height,hard)
},p.getHeight=function(){return this.hasBG&&this.bgLoaded?this.bgHeight*this.ratio:Math.max(this.$element[0].clientHeight,this.slider.options.height*this.ratio)},p.__playVideo=function(){this.vplayed||this.videodis||(this.vplayed=!0,this.slider.api.paused||(this.slider.api.pause(),this.roc=!0),this.vcbtn.css("display",""),CTween.fadeOut(this.vpbtn,500,!1),CTween.fadeIn(this.vcbtn,500),CTween.fadeIn(this.vframe,500),this.vframe.css("display","block").attr("src",this.video+"&autoplay=1"),this.view.$element.addClass("ms-def-cursor"),this.view.swipeControl&&this.view.swipeControl.disable(),this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_PLAY)))},p.__closeVideo=function(){if(this.vplayed){this.vplayed=!1,this.roc&&this.slider.api.resume();var that=this;CTween.fadeIn(this.vpbtn,500),CTween.animate(this.vcbtn,500,{opacity:0},{complete:function(){that.vcbtn.css("display","none")}}),CTween.animate(this.vframe,500,{opacity:0},{complete:function(){that.vframe.attr("src","about:blank").css("display","none")}}),this.view.swipeControl&&this.view.swipeControl.enable(),this.view.$element.removeClass("ms-def-cursor"),this.slider.slideController.dispatchEvent(new MSSliderEvent(MSSliderEvent.VIDEO_CLOSE))}},p.create=function(){var that=this;this.hasLayers&&this.layerController.create(),this.link&&this.link.addClass("ms-slide-link").html("").click(function(e){that.linkdis&&e.preventDefault()}),this.video&&(-1===this.video.indexOf("?")&&(this.video+="?"),this.vframe=$("<iframe></iframe>").addClass("ms-slide-video").css({width:"100%",height:"100%",display:"none"}).attr("src","about:blank").attr("allowfullscreen","true").appendTo(this.$element),this.vpbtn=$("<div></div>").addClass("ms-slide-vpbtn").click(function(){that.__playVideo()}).appendTo(this.$element),this.vcbtn=$("<div></div>").addClass("ms-slide-vcbtn").click(function(){that.__closeVideo()}).appendTo(this.$element).css("display","none"),window._touch&&this.vcbtn.removeClass("ms-slide-vcbtn").addClass("ms-slide-vcbtn-mobile").append('<div class="ms-vcbtn-txt">Close video</div>').appendTo(this.view.$element.parent())),!this.slider.options.autoHeight&&this.hasBG&&(this.$imgcont.css("height","100%"),("center"===this.fillMode||"stretch"===this.fillMode)&&(this.fillMode="fill")),this.slider.options.autoHeight&&this.$element.addClass("ms-slide-auto-height"),this.sleep(!0)},p.destroy=function(){this.hasLayers&&(this.layerController.destroy(),this.layerController=null),this.$element.remove(),this.$element=null},p.prepareToSelect=function(){this.pselected||this.selected||(this.pselected=!0,(this.link||this.video)&&(this.view.addEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.view.addEventListener(MSViewEvents.SWIPE_MOVE,this.onSwipeMove,this),this.view.addEventListener(MSViewEvents.SWIPE_CANCEL,this.onSwipeCancel,this),this.linkdis=!1,this.swipeMoved=!1),this.loadImages(),this.hasLayers&&this.layerController.prepareToShow(),this.ready&&(this.bgvideo&&this.bgvideo.play(),this.hasLayers&&this.slider.options.instantStartLayers&&this.layerController.showLayers()),this.moz&&this.$element.css("margin-top",""))},p.select=function(){this.selected||(this.selected=!0,this.pselected=!1,this.$element.addClass("ms-sl-selected"),this.hasLayers&&(this.slider.options.autoHeight&&this.layerController.updateHeight(),this.slider.options.instantStartLayers||this.layerController.showLayers()),this.ready&&this.bgvideo&&this.bgvideo.play(),this.videoAutoPlay&&(this.videodis=!1,this.vpbtn.trigger("click")))},p.unselect=function(){this.pselected=!1,this.moz&&this.$element.css("margin-top","0.1px"),(this.link||this.video)&&(this.view.removeEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.view.removeEventListener(MSViewEvents.SWIPE_MOVE,this.onSwipeMove,this),this.view.removeEventListener(MSViewEvents.SWIPE_CANCEL,this.onSwipeCancel,this)),this.bgvideo&&(this.bgvideo.pause(),!this.autoPauseBgVid&&this.vinit&&(this.bgvideo.currentTime=0)),this.hasLayers&&this.layerController.hideLayers(),this.selected&&(this.selected=!1,this.$element.removeClass("ms-sl-selected"),this.video&&this.vplayed&&(this.__closeVideo(),this.roc=!1))},p.sleep=function(force){(!this.isSleeping||force)&&(this.isSleeping=!0,this.autoAppend&&this.$element.detach(),this.hasLayers&&this.layerController.onSlideSleep())},p.wakeup=function(){this.isSleeping&&(this.isSleeping=!1,this.autoAppend&&this.view.$slideCont.append(this.$element),this.moz&&this.$element.css("margin-top","0.1px"),this.setupBG(),this.hasBG&&this.bgAligner.align(),this.hasLayers&&this.layerController.onSlideWakeup())}}(window,document,jQuery),function($){"use strict";var SliderViewList={};window.MSSlideController=function(slider){this._delayProgress=0,this._timer=new averta.Timer(100),this._timer.onTimer=this.onTimer,this._timer.refrence=this,this.currentSlide=null,this.slider=slider,this.so=slider.options,averta.EventDispatcher.call(this)},MSSlideController.registerView=function(name,_class){if(name in SliderViewList)throw new Error(name+", is already registered.");SliderViewList[name]=_class},MSSlideController.SliderControlList={},MSSlideController.registerControl=function(name,_class){if(name in MSSlideController.SliderControlList)throw new Error(name+", is already registered.");MSSlideController.SliderControlList[name]=_class};var p=MSSlideController.prototype;p.setupView=function(){var that=this;this.resize_listener=function(){that.__resize()};var viewOptions={spacing:this.so.space,mouseSwipe:this.so.mouse,loop:this.so.loop,autoHeight:this.so.autoHeight,swipe:this.so.swipe,speed:this.so.speed,dir:this.so.dir,viewNum:this.so.inView,critMargin:this.so.critMargin};this.so.viewOptions&&$.extend(viewOptions,this.so.viewOptions),this.so.autoHeight&&(this.so.heightLimit=!1);var viewClass=SliderViewList[this.slider.options.view]||MSBasicView;if(!viewClass._3dreq||window._css3d&&!$.browser.msie||(viewClass=viewClass._fallback||MSBasicView),this.view=new viewClass(viewOptions),this.so.overPause){var that=this;this.slider.$element.mouseenter(function(){that.is_over=!0,that._stopTimer()}).mouseleave(function(){that.is_over=!1,that._startTimer()})}},p.onChangeStart=function(){this.change_started=!0,this.currentSlide&&this.currentSlide.unselect(),this.currentSlide=this.view.currentSlide,this.currentSlide.prepareToSelect(),this.so.endPause&&this.currentSlide.index===this.slider.slides.length-1&&(this.pause(),this.skipTimer()),this.so.autoHeight&&this.slider.setHeight(this.currentSlide.getHeight()),this.so.deepLink&&this.__updateWindowHash(),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_START))},p.onChangeEnd=function(){if(this.change_started=!1,this._startTimer(),this.currentSlide.select(),this.so.preload>1){var loc,i,slide,l=this.so.preload-1;for(i=1;l>=i;++i){if(loc=this.view.index+i,loc>=this.view.slideList.length){if(!this.so.loop){i=l;continue}loc-=this.view.slideList.length}slide=this.view.slideList[loc],slide&&slide.loadImages()}for(l>this.view.slideList.length/2&&(l=Math.floor(this.view.slideList.length/2)),i=1;l>=i;++i){if(loc=this.view.index-i,0>loc){if(!this.so.loop){i=l;continue}loc=this.view.slideList.length+loc}slide=this.view.slideList[loc],slide&&slide.loadImages()}}this.dispatchEvent(new MSSliderEvent(MSSliderEvent.CHANGE_END))},p.onSwipeStart=function(){this.skipTimer()},p.skipTimer=function(){this._timer.reset(),this._delayProgress=0,this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))},p.onTimer=function(){if(this._timer.getTime()>=1e3*this.view.currentSlide.delay&&(this.skipTimer(),this.view.next(),this.hideCalled=!1),this._delayProgress=this._timer.getTime()/(10*this.view.currentSlide.delay),this.so.hideLayers&&!this.hideCalled&&1e3*this.view.currentSlide.delay-this._timer.getTime()<=300){var currentSlide=this.view.currentSlide;currentSlide.hasLayers&&currentSlide.layerController.animHideLayers(),this.hideCalled=!0}this.dispatchEvent(new MSSliderEvent(MSSliderEvent.WAITING))},p._stopTimer=function(){this._timer&&this._timer.stop()},p._startTimer=function(){this.paused||this.is_over||!this.currentSlide||!this.currentSlide.ready||this.change_started||this._timer.start()},p.__appendSlides=function(){var slide,loc,i=0,l=this.view.slideList.length-1;for(i;l>i;++i)slide=this.view.slideList[i],slide.detached||(slide.$element.detach(),slide.detached=!0);for(this.view.appendSlide(this.view.slideList[this.view.index]),l=3,i=1;l>=i;++i){if(loc=this.view.index+i,loc>=this.view.slideList.length){if(!this.so.loop){i=l;continue}loc-=this.view.slideList.length}slide=this.view.slideList[loc],slide.detached=!1,this.view.appendSlide(slide)}for(l>this.view.slideList.length/2&&(l=Math.floor(this.view.slideList.length/2)),i=1;l>=i;++i){if(loc=this.view.index-i,0>loc){if(!this.so.loop){i=l;continue}loc=this.view.slideList.length+loc}slide=this.view.slideList[loc],slide.detached=!1,this.view.appendSlide(slide)}},p.__resize=function(hard){this.created&&(this.width=this.slider.$element[0].clientWidth||this.so.width,this.so.fullwidth||(this.width=Math.min(this.width,this.so.width)),this.so.fullheight?(this.so.heightLimit=!1,this.so.autoHeight=!1,this.height=this.slider.$element[0].clientHeight):this.height=this.width/this.slider.aspect,this.so.autoHeight?(this.currentSlide.setSize(this.width,null,hard),this.view.setSize(this.width,this.currentSlide.getHeight(),hard)):this.view.setSize(this.width,Math.max(this.so.minHeight,this.so.heightLimit?Math.min(this.height,this.so.height):this.height),hard),this.slider.$controlsCont&&this.so.centerControls&&this.so.fullwidth&&this.view.$element.css("left",Math.min(0,-(this.slider.$element[0].clientWidth-this.so.width)/2)+"px"),this.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESIZE)))},p.__dispatchInit=function(){this.dispatchEvent(new MSSliderEvent(MSSliderEvent.INIT))},p.__updateWindowHash=function(){var hash=window.location.hash,dl=this.so.deepLink,dlt=this.so.deepLinkType,eq="path"===dlt?"/":"=",sep="path"===dlt?"/":"&",sliderHash=dl+eq+(this.view.index+1),regTest=new RegExp(dl+eq+"[0-9]+","g");window.location.hash=""===hash?sep+sliderHash:regTest.test(hash)?hash.replace(regTest,sliderHash):hash+sep+sliderHash},p.__curentSlideInHash=function(){var hash=window.location.hash,dl=this.so.deepLink,dlt=this.so.deepLinkType,eq="path"===dlt?"/":"=",regTest=new RegExp(dl+eq+"[0-9]+","g");if(regTest.test(hash)){var index=Number(hash.match(regTest)[0].match(/[0-9]+/g).pop());if(!isNaN(index))return index-1}return-1},p.__onHashChanged=function(){var index=this.__curentSlideInHash();-1!==index&&this.gotoSlide(index)},p.setup=function(){this.created=!0,this.paused=!this.so.autoplay,this.view.addEventListener(MSViewEvents.CHANGE_START,this.onChangeStart,this),this.view.addEventListener(MSViewEvents.CHANGE_END,this.onChangeEnd,this),this.view.addEventListener(MSViewEvents.SWIPE_START,this.onSwipeStart,this),this.currentSlide=this.view.slideList[this.so.start-1],this.__resize();var slideInHash=this.__curentSlideInHash(),startSlide=-1!==slideInHash?slideInHash:this.so.start-1;if(this.view.create(startSlide),0===this.so.preload&&this.view.slideList[0].loadImages(),this.scroller=this.view.controller,this.so.wheel){var that=this,last_time=(new Date).getTime();this.wheellistener=function(event){var e=window.event||event.orginalEvent||event;e.preventDefault();var current_time=(new Date).getTime();if(!(400>current_time-last_time)){last_time=current_time;var delta=Math.abs(e.detail||e.wheelDelta);$.browser.mozilla&&(delta*=100);var scrollThreshold=15;return e.detail<0||e.wheelDelta>0?delta>=scrollThreshold&&that.previous(!0):delta>=scrollThreshold&&that.next(!0),!1}},$.browser.mozilla?this.slider.$element[0].addEventListener("DOMMouseScroll",this.wheellistener):this.slider.$element.bind("mousewheel",this.wheellistener)}0===this.slider.$element[0].clientWidth&&(this.slider.init_safemode=!0),this.__resize();var that=this;this.so.deepLink&&$(window).on("hashchange",function(){that.__onHashChanged()})},p.index=function(){return this.view.index},p.count=function(){return this.view.slidesCount},p.next=function(checkLoop){this.skipTimer(),this.view.next(checkLoop)},p.previous=function(checkLoop){this.skipTimer(),this.view.previous(checkLoop)},p.gotoSlide=function(index){index=Math.min(index,this.count()-1),this.skipTimer(),this.view.gotoSlide(index)},p.destroy=function(reset){this.dispatchEvent(new MSSliderEvent(MSSliderEvent.DESTROY)),this.slider.destroy(reset)},p._destroy=function(){this._timer.reset(),this._timer=null,$(window).unbind("resize",this.resize_listener),this.view.destroy(),this.view=null,this.so.wheel&&($.browser.mozilla?this.slider.$element[0].removeEventListener("DOMMouseScroll",this.wheellistener):this.slider.$element.unbind("mousewheel",this.wheellistener),this.wheellistener=null),this.so=null},p.runAction=function(action){var actionParams=[];if(-1!==action.indexOf("(")){var temp=action.slice(0,action.indexOf("("));actionParams=action.slice(action.indexOf("(")+1,-1).replace(/\"|\'|\s/g,"").split(","),action=temp}action in this?this[action].apply(this,actionParams):console},p.update=function(hard){this.slider.init_safemode&&hard&&(this.slider.init_safemode=!1),this.__resize(hard),hard&&this.dispatchEvent(new MSSliderEvent(MSSliderEvent.HARD_UPDATE))},p.locate=function(){this.__resize()},p.resume=function(){this.paused&&(this.paused=!1,this._startTimer())},p.pause=function(){this.paused||(this.paused=!0,this._stopTimer())},p.currentTime=function(){return this._delayProgress},averta.EventDispatcher.extend(p)}(jQuery),function($){"use strict";var LayerTypes={image:MSImageLayerElement,text:MSLayerElement,video:MSVideoLayerElement,hotspot:MSHotspotLayer,button:MSButtonLayer};window.MasterSlider=function(){this.options={autoplay:!1,loop:!1,mouse:!0,swipe:!0,grabCursor:!0,space:0,fillMode:"fill",start:1,view:"basic",width:300,height:150,inView:15,critMargin:1,heightLimit:!0,smoothHeight:!0,autoHeight:!1,minHeight:-1,fullwidth:!1,fullheight:!1,autofill:!1,layersMode:"center",hideLayers:!1,endPause:!1,centerControls:!0,overPause:!0,shuffle:!1,speed:17,dir:"h",preload:0,wheel:!1,layout:"boxed",autofillTarget:null,fullscreenMargin:0,instantStartLayers:!1,parallaxMode:"mouse",rtl:!1,deepLink:null,deepLinkType:"path",disablePlugins:[]},this.slides=[],this.activePlugins=[],this.$element=null,this.lastMargin=0,this.leftSpace=0,this.topSpace=0,this.rightSpace=0,this.bottomSpace=0,this._holdOn=0;var that=this;this.resize_listener=function(){that._resize()},$(window).bind("resize",this.resize_listener)},MasterSlider.author="Averta Ltd. (www.averta.net)",MasterSlider.version="2.14.6",MasterSlider.releaseDate="May 2015",MasterSlider._plugins=[];var MS=MasterSlider;MS.registerPlugin=function(plugin){-1===MS._plugins.indexOf(plugin)&&MS._plugins.push(plugin)};var p=MasterSlider.prototype;p.__setupSlides=function(){var new_slide,that=this,ind=0;this.$element.children(".ms-slide").each(function(){var $slide_ele=$(this);new_slide=new MSSlide,new_slide.$element=$slide_ele,new_slide.slider=that,new_slide.delay=void 0!==$slide_ele.data("delay")?$slide_ele.data("delay"):3,new_slide.fillMode=void 0!==$slide_ele.data("fill-mode")?$slide_ele.data("fill-mode"):that.options.fillMode,new_slide.index=ind++;var slide_img=$slide_ele.children("img:not(.ms-layer)");slide_img.length>0&&new_slide.setBG(slide_img[0]);var slide_video=$slide_ele.children("video");if(slide_video.length>0&&new_slide.setBGVideo(slide_video),that.controls)for(var i=0,l=that.controls.length;l>i;++i)that.controls[i].slideAction(new_slide);$slide_ele.children("a").each(function(){var $this=$(this);"video"===this.getAttribute("data-type")?(new_slide.video=this.getAttribute("href"),new_slide.videoAutoPlay=$this.data("autoplay"),$this.remove()):$this.hasClass("ms-layer")||(new_slide.link=$(this))});that.__createSlideLayers(new_slide,$slide_ele.find(".ms-layer")),that.slides.push(new_slide),that.slideController.view.addSlide(new_slide)})},p.__createSlideLayers=function(slide,layers){0!=layers.length&&(slide.setupLayerController(),layers.each(function(index,domEle){var $parent_ele,$layer_element=$(this);"A"===domEle.nodeName&&"image"===$layer_element.find(">img").data("type")&&($parent_ele=$(this),$layer_element=$parent_ele.find("img"));var layer=new(LayerTypes[$layer_element.data("type")||"text"]);layer.$element=$layer_element,layer.link=$parent_ele;var eff_parameters={},end_eff_parameters={};void 0!==$layer_element.data("effect")&&(eff_parameters.name=$layer_element.data("effect")),void 0!==$layer_element.data("ease")&&(eff_parameters.ease=$layer_element.data("ease")),void 0!==$layer_element.data("duration")&&(eff_parameters.duration=$layer_element.data("duration")),void 0!==$layer_element.data("delay")&&(eff_parameters.delay=$layer_element.data("delay")),$layer_element.data("hide-effect")&&(end_eff_parameters.name=$layer_element.data("hide-effect")),$layer_element.data("hide-ease")&&(end_eff_parameters.ease=$layer_element.data("hide-ease")),void 0!==$layer_element.data("hide-duration")&&(end_eff_parameters.duration=$layer_element.data("hide-duration")),void 0!==$layer_element.data("hide-time")&&(end_eff_parameters.time=$layer_element.data("hide-time")),layer.setStartAnim(eff_parameters),layer.setEndAnim(end_eff_parameters),slide.layerController.addLayer(layer)}))},p._removeLoading=function(){$(window).unbind("resize",this.resize_listener),this.$element.removeClass("before-init").css("visibility","visible").css("height","").css("opacity",0),CTween.fadeIn(this.$element),this.$loading.remove(),this.slideController&&this.slideController.__resize()},p._resize=function(){if(this.$loading){var h=this.$loading[0].clientWidth/this.aspect;h=this.options.heightLimit?Math.min(h,this.options.height):h,this.$loading.height(h),this.$element.height(h)}},p._shuffleSlides=function(){for(var r,slides=this.$element.children(".ms-slide"),i=0,l=slides.length;l>i;++i)r=Math.floor(Math.random()*(l-1)),i!=r&&(this.$element[0].insertBefore(slides[i],slides[r]),slides=this.$element.children(".ms-slide"))},p._setupSliderLayout=function(){this._updateSideMargins(),this.lastMargin=this.leftSpace;var lo=this.options.layout;"boxed"!==lo&&"partialview"!==lo&&(this.options.fullwidth=!0),("fullscreen"===lo||"autofill"===lo)&&(this.options.fullheight=!0,"autofill"===lo&&(this.$autofillTarget=$(this.options.autofillTarget),0===this.$autofillTarget.length&&(this.$autofillTarget=this.$element.parent()))),"partialview"===lo&&this.$element.addClass("ms-layout-partialview"),("fullscreen"===lo||"fullwidth"===lo||"autofill"===lo)&&($(window).bind("resize",{that:this},this._updateLayout),this._updateLayout()),$(window).bind("resize",this.slideController.resize_listener)},p._updateLayout=function(event){var that=event?event.data.that:this,lo=that.options.layout,$element=that.$element,$win=$(window);if("fullscreen"===lo)document.body.style.overflow="hidden",$element.height($win.height()-that.options.fullscreenMargin-that.topSpace-that.bottomSpace),document.body.style.overflow="";else if("autofill"===lo)return void $element.height(that.$autofillTarget.height()-that.options.fullscreenMargin-that.topSpace-that.bottomSpace).width(that.$autofillTarget.width()-that.leftSpace-that.rightSpace);$element.width($win.width()-that.leftSpace-that.rightSpace);var margin=-$element.offset().left+that.leftSpace+that.lastMargin;$element.css("margin-left",margin),that.lastMargin=margin},p._init=function(){if(!(this._holdOn>0)&&this._docReady){if(this.initialized=!0,"all"!==this.options.preload&&this._removeLoading(),this.options.shuffle&&this._shuffleSlides(),MSLayerEffects.setup(),this.slideController.setupView(),this.view=this.slideController.view,this.$controlsCont=$("<div></div>").addClass("ms-inner-controls-cont"),this.options.centerControls&&this.$controlsCont.css("max-width",this.options.width+"px"),this.$controlsCont.prepend(this.view.$element),this.$msContainer=$("<div></div>").addClass("ms-container").prependTo(this.$element).append(this.$controlsCont),this.controls)for(var i=0,l=this.controls.length;l>i;++i)this.controls[i].setup();if(this._setupSliderLayout(),this.__setupSlides(),this.slideController.setup(),this.controls)for(i=0,l=this.controls.length;l>i;++i)this.controls[i].create();if(this.options.autoHeight&&this.slideController.view.$element.height(this.slideController.currentSlide.getHeight()),this.options.swipe&&!window._touch&&this.options.grabCursor&&this.options.mouse){var $view=this.view.$element;$view.mousedown(function(){$view.removeClass("ms-grab-cursor"),$view.addClass("ms-grabbing-cursor"),$.browser.msie&&window.ms_grabbing_curosr&&($view[0].style.cursor="url("+window.ms_grabbing_curosr+"), move")}).addClass("ms-grab-cursor"),$(document).mouseup(function(){$view.removeClass("ms-grabbing-cursor"),$view.addClass("ms-grab-cursor"),$.browser.msie&&window.ms_grab_curosr&&($view[0].style.cursor="url("+window.ms_grab_curosr+"), move")})}this.slideController.__dispatchInit()}},p.setHeight=function(value){this.options.smoothHeight?(this.htween&&(this.htween.reset?this.htween.reset():this.htween.stop(!0)),this.htween=CTween.animate(this.slideController.view.$element,500,{height:value},{ease:"easeOutQuart"})):this.slideController.view.$element.height(value)},p.reserveSpace=function(side,space){var sideSpace=side+"Space",pos=this[sideSpace];return this[sideSpace]+=space,this._updateSideMargins(),pos},p._updateSideMargins=function(){this.$element.css("margin",this.topSpace+"px "+this.rightSpace+"px "+this.bottomSpace+"px "+this.leftSpace+"px")},p._realignControls=function(){this.rightSpace=this.leftSpace=this.topSpace=this.bottomSpace=0,this._updateSideMargins(),this.api.dispatchEvent(new MSSliderEvent(MSSliderEvent.RESERVED_SPACE_CHANGE))},p.control=function(control,options){if(control in MSSlideController.SliderControlList){this.controls||(this.controls=[]);var ins=new MSSlideController.SliderControlList[control](options);return ins.slider=this,this.controls.push(ins),this}},p.holdOn=function(){this._holdOn++},p.release=function(){this._holdOn--,this._init()},p.setup=function(target,options){if(this.$element="string"==typeof target?$("#"+target):target.eq(0),this.setupMarkup=this.$element.html(),0!==this.$element.length){this.$element.addClass("master-slider").addClass("before-init"),$.browser.msie?this.$element.addClass("ms-ie").addClass("ms-ie"+$.browser.version.slice(0,$.browser.version.indexOf("."))):$.browser.webkit?this.$element.addClass("ms-wk"):$.browser.mozilla&&this.$element.addClass("ms-moz");var ua=navigator.userAgent.toLowerCase(),isAndroid=ua.indexOf("android")>-1;isAndroid&&this.$element.addClass("ms-android");var that=this;$.extend(this.options,options),this.aspect=this.options.width/this.options.height,this.$loading=$("<div></div>").addClass("ms-loading-container").insertBefore(this.$element).append($("<div></div>").addClass("ms-loading")),this.$loading.parent().css("position","relative"),this.options.autofill&&(this.options.fullwidth=!0,this.options.fullheight=!0),this.options.fullheight&&this.$element.addClass("ms-fullheight"),this._resize(),this.slideController=new MSSlideController(this),this.api=this.slideController;for(var i=0,l=MS._plugins.length;i!==l;i++){var plugin=MS._plugins[i];-1===this.options.disablePlugins.indexOf(plugin.name)&&this.activePlugins.push(new plugin(this))}return $(document).ready(function(){that._docReady=!0,that._init()}),this}},p.destroy=function(insertMarkup){for(var i=0,l=this.activePlugins.length;i!==l;i++)this.activePlugins[i].destroy();if(this.controls)for(i=0,l=this.controls.length;i!==l;i++)this.controls[i].destroy();this.slideController&&this.slideController._destroy(),this.$loading&&this.$loading.remove(),insertMarkup?this.$element.html(this.setupMarkup).css("visibility","hidden"):this.$element.remove();var lo=this.options.layout;("fullscreen"===lo||"fullwidth"===lo)&&$(window).unbind("resize",this._updateLayout),this.view=null,this.slides=null,this.options=null,this.slideController=null,this.api=null,this.resize_listener=null,this.activePlugins=null}}(jQuery),function($,window,document,undefined){function MasterSliderPlugin(element,options){this.element=element,this.$element=$(element),this.settings=$.extend({},defaults,options),this._defaults=defaults,this._name=pluginName,this.init()}var pluginName="masterslider",defaults={controls:{}};$.extend(MasterSliderPlugin.prototype,{init:function(){var self=this;this._slider=new MasterSlider;for(var control in this.settings.controls)this._slider.control(control,this.settings.controls[control]);this._slider.setup(this.$element,this.settings);var _superDispatch=this._slider.api.dispatchEvent;this._slider.api.dispatchEvent=function(event){self.$element.trigger(event.type),_superDispatch.call(this,event)}},api:function(){return this._slider.api},slider:function(){return this._slider}}),$.fn[pluginName]=function(options){var args=arguments,plugin="plugin_"+pluginName;if(options===undefined||"object"==typeof options)return this.each(function(){$.data(this,plugin)||$.data(this,plugin,new MasterSliderPlugin(this,options))});if("string"==typeof options&&"_"!==options[0]&&"init"!==options){var returns;return this.each(function(){var instance=$.data(this,plugin);instance instanceof MasterSliderPlugin&&"function"==typeof instance[options]&&(returns=instance[options].apply(instance,Array.prototype.slice.call(args,1))),instance instanceof MasterSliderPlugin&&"function"==typeof instance._slider.api[options]&&(returns=instance._slider.api[options].apply(instance._slider.api,Array.prototype.slice.call(args,1))),"destroy"===options&&$.data(this,plugin,null)}),returns!==undefined?returns:this}}}(jQuery,window,document),window.MSViewEvents=function(type,data){this.type=type,this.data=data},MSViewEvents.SWIPE_START="swipeStart",MSViewEvents.SWIPE_END="swipeEnd",MSViewEvents.SWIPE_MOVE="swipeMove",MSViewEvents.SWIPE_CANCEL="swipeCancel",MSViewEvents.SCROLL="scroll",MSViewEvents.CHANGE_START="slideChangeStart",MSViewEvents.CHANGE_END="slideChangeEnd",function($){"use strict";window.MSBasicView=function(options){this.options={loop:!1,dir:"h",autoHeight:!1,spacing:5,mouseSwipe:!0,swipe:!0,speed:17,minSlideSpeed:2,viewNum:20,critMargin:1},$.extend(this.options,options),this.dir=this.options.dir,this.loop=this.options.loop,this.spacing=this.options.spacing,this.__width=0,this.__height=0,this.__cssProb="h"===this.dir?"left":"top",this.__offset="h"===this.dir?"offsetLeft":"offsetTop",this.__dimension="h"===this.dir?"__width":"__height",this.__translate_end=window._css3d?" translateZ(0px)":"",this.$slideCont=$("<div></div>").addClass("ms-slide-container"),this.$element=$("<div></div>").addClass("ms-view").addClass("ms-basic-view").append(this.$slideCont),this.currentSlide=null,this.index=-1,this.slidesCount=0,this.slides=[],this.slideList=[],this.viewSlidesList=[],this.css3=window._cssanim,this.start_buffer=0,this.firstslide_snap=0,this.slideChanged=!1,this.controller=new Controller(0,0,{snapping:!0,snapsize:100,paging:!0,snappingMinSpeed:this.options.minSlideSpeed,friction:(100-.5*this.options.speed)/100,endless:this.loop}),this.controller.renderCallback("h"===this.dir?this._horizUpdate:this._vertiUpdate,this),this.controller.snappingCallback(this.__snapUpdate,this),this.controller.snapCompleteCallback(this.__snapCompelet,this),averta.EventDispatcher.call(this)};var p=MSBasicView.prototype;p.__snapCompelet=function(){this.slideChanged&&(this.slideChanged=!1,this.__locateSlides(),this.start_buffer=0,this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))},p.__snapUpdate=function(controller,snap,change){if(this.loop){var target_index=this.index+change;this.updateLoop(target_index),target_index>=this.slidesCount&&(target_index-=this.slidesCount),0>target_index&&(target_index=this.slidesCount+target_index),this.index=target_index}else{if(0>snap||snap>=this.slidesCount)return;this.index=snap}this._checkCritMargins(),$.browser.mozilla&&(this.slideList[this.index].$element[0].style.marginTop="0.1px",this.currentSlide&&(this.currentSlide.$element[0].style.marginTop=""));var new_slide=this.slideList[this.index];new_slide!==this.currentSlide&&(this.currentSlide=new_slide,this.autoUpdateZIndex&&this.__updateSlidesZindex(),this.slideChanged=!0,this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)))},p._checkCritMargins=function(){if(!this.normalMode){var hlf=Math.floor(this.options.viewNum/2),inView=this.viewSlidesList.indexOf(this.slideList[this.index]),size=this[this.__dimension]+this.spacing,cm=this.options.critMargin;return this.loop?void((cm>=inView||inView>=this.viewSlidesList.length-cm)&&(size*=inView-hlf,this.__locateSlides(!1,size+this.start_buffer),this.start_buffer+=size)):void((cm>inView&&this.index>=cm||inView>=this.viewSlidesList.length-cm&&this.index<this.slidesCount-cm)&&this.__locateSlides(!1))}},p._vertiUpdate=function(controller,value){return this.__contPos=value,this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)),this.css3?void(this.$slideCont[0].style[window._jcsspfx+"Transform"]="translateY("+-value+"px)"+this.__translate_end):void(this.$slideCont[0].style.top=-value+"px")},p._horizUpdate=function(controller,value){return this.__contPos=value,this.dispatchEvent(new MSViewEvents(MSViewEvents.SCROLL)),this.css3?void(this.$slideCont[0].style[window._jcsspfx+"Transform"]="translateX("+-value+"px)"+this.__translate_end):void(this.$slideCont[0].style.left=-value+"px")},p.__updateViewList=function(){if(this.normalMode)return void(this.viewSlidesList=this.slides);var temp=this.viewSlidesList.slice();this.viewSlidesList=[];var l,i=0,hlf=Math.floor(this.options.viewNum/2);if(this.loop)for(;i!==this.options.viewNum;i++)this.viewSlidesList.push(this.slides[this.currentSlideLoc-hlf+i]);else{for(i=0;i!==hlf&&this.index-i!==-1;i++)this.viewSlidesList.unshift(this.slideList[this.index-i]);for(i=1;i!==hlf&&this.index+i!==this.slidesCount;i++)this.viewSlidesList.push(this.slideList[this.index+i])}for(i=0,l=temp.length;i!==l;i++)-1===this.viewSlidesList.indexOf(temp[i])&&temp[i].sleep();temp=null,this.currentSlide&&this.__updateSlidesZindex()},p.__locateSlides=function(move,start){this.__updateViewList(),start=this.loop?start||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing);for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++){var pos=start+i*(this[this.__dimension]+this.spacing);slide=this.viewSlidesList[i],slide.wakeup(),slide.position=pos,slide.$element[0].style[this.__cssProb]=pos+"px"}move!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},p.__createLoopList=function(){var return_arr=[],i=0,count=this.slidesCount/2,before_count=this.slidesCount%2===0?count-1:Math.floor(count),after_count=this.slidesCount%2===0?count:Math.floor(count);for(this.currentSlideLoc=before_count,i=1;before_count>=i;++i)return_arr.unshift(this.slideList[this.index-i<0?this.slidesCount-i+this.index:this.index-i]);for(return_arr.push(this.slideList[this.index]),i=1;after_count>=i;++i)return_arr.push(this.slideList[this.index+i>=this.slidesCount?this.index+i-this.slidesCount:this.index+i]);return return_arr},p.__getSteps=function(index,target){var right=index>target?this.slidesCount-index+target:target-index,left=Math.abs(this.slidesCount-right);return left>right?right:-left},p.__pushEnd=function(){var first_slide=this.slides.shift(),last_slide=this.slides[this.slidesCount-2];if(this.slides.push(first_slide),this.normalMode){var pos=last_slide.$element[0][this.__offset]+this.spacing+this[this.__dimension];first_slide.$element[0].style[this.__cssProb]=pos+"px",first_slide.position=pos}},p.__pushStart=function(){var last_slide=this.slides.pop(),first_slide=this.slides[0];if(this.slides.unshift(last_slide),this.normalMode){var pos=first_slide.$element[0][this.__offset]-this.spacing-this[this.__dimension];last_slide.$element[0].style[this.__cssProb]=pos+"px",last_slide.position=pos}},p.__updateSlidesZindex=function(){{var slide,l=this.viewSlidesList.length;Math.floor(l/2)}if(this.loop)for(var loc=this.viewSlidesList.indexOf(this.currentSlide),i=0;i!==l;i++)slide=this.viewSlidesList[i],this.viewSlidesList[i].$element.css("z-index",loc>=i?i+1:l-i);
else{for(var beforeNum=this.currentSlide.index-this.viewSlidesList[0].index,i=0;i!==l;i++)this.viewSlidesList[i].$element.css("z-index",beforeNum>=i?i+1:l-i);this.currentSlide.$element.css("z-index",l)}},p.addSlide=function(slide){slide.view=this,this.slides.push(slide),this.slideList.push(slide),this.slidesCount++},p.appendSlide=function(slide){this.$slideCont.append(slide.$element)},p.updateLoop=function(index){if(this.loop)for(var steps=this.__getSteps(this.index,index),i=0,l=Math.abs(steps);l>i;++i)0>steps?this.__pushStart():this.__pushEnd()},p.gotoSlide=function(index,fast){this.updateLoop(index),this.index=index;var target_slide=this.slideList[index];this._checkCritMargins(),this.controller.changeTo(target_slide.position,!fast,null,null,!1),target_slide!==this.currentSlide&&(this.slideChanged=!0,this.currentSlide=target_slide,this.autoUpdateZIndex&&this.__updateSlidesZindex(),this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_START)),fast&&this.dispatchEvent(new MSViewEvents(MSViewEvents.CHANGE_END)))},p.next=function(checkLoop){return checkLoop&&!this.loop&&this.index+1>=this.slidesCount?void this.controller.bounce(10):void this.gotoSlide(this.index+1>=this.slidesCount?0:this.index+1)},p.previous=function(checkLoop){return checkLoop&&!this.loop&&this.index-1<0?void this.controller.bounce(-10):void this.gotoSlide(this.index-1<0?this.slidesCount-1:this.index-1)},p.setupSwipe=function(){this.swipeControl=new averta.TouchSwipe(this.$element),this.swipeControl.swipeType="h"===this.dir?"horizontal":"vertical";var that=this;this.swipeControl.onSwipe="h"===this.dir?function(status){that.horizSwipeMove(status)}:function(status){that.vertSwipeMove(status)}},p.vertSwipeMove=function(status){var phase=status.phase;if("start"===phase)this.controller.stop(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START,status));else if("move"===phase&&(!this.loop||Math.abs(this.currentSlide.position-this.controller.value+status.moveY)<this.cont_size/2))this.controller.drag(status.moveY),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE,status));else if("end"===phase||"cancel"===phase){var speed=status.distanceY/status.duration*50/3;Math.abs(speed)>.1?(this.controller.push(-speed),speed>this.controller.options.snappingMinSpeed&&this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END,status))):(this.controller.cancel(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL,status)))}},p.horizSwipeMove=function(status){var phase=status.phase;if("start"===phase)this.controller.stop(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_START,status));else if("move"===phase&&(!this.loop||Math.abs(this.currentSlide.position-this.controller.value+status.moveX)<this.cont_size/2))this.controller.drag(status.moveX),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_MOVE,status));else if("end"===phase||"cancel"===phase){var speed=status.distanceX/status.duration*50/3;Math.abs(speed)>.1?(this.controller.push(-speed),speed>this.controller.options.snappingMinSpeed&&this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_END,status))):(this.controller.cancel(),this.dispatchEvent(new MSViewEvents(MSViewEvents.SWIPE_CANCEL,status)))}},p.setSize=function(width,height,hard){if(this.lastWidth!==width||height!==this.lastHeight||hard){this.$element.width(width).height(height);for(var i=0;i<this.slidesCount;++i)this.slides[i].setSize(width,height,hard);this.__width=width,this.__height=height,this.__created&&(this.__locateSlides(),this.cont_size=(this.slidesCount-1)*(this[this.__dimension]+this.spacing),this.loop||(this.controller._max_value=this.cont_size),this.controller.options.snapsize=this[this.__dimension]+this.spacing,this.controller.changeTo(this.currentSlide.position,!1,null,null,!1),this.controller.cancel(),this.lastWidth=width,this.lastHeight=height)}},p.create=function(index){this.__created=!0,this.index=Math.min(index||0,this.slidesCount-1),this.lastSnap=this.index,this.loop&&(this.slides=this.__createLoopList()),this.normalMode=this.slidesCount<=this.options.viewNum;for(var i=0;i<this.slidesCount;++i)this.slides[i].create();this.__locateSlides(),this.controller.options.snapsize=this[this.__dimension]+this.spacing,this.loop||(this.controller._max_value=(this.slidesCount-1)*(this[this.__dimension]+this.spacing)),this.gotoSlide(this.index,!0),this.options.swipe&&(window._touch||this.options.mouseSwipe)&&this.setupSwipe()},p.destroy=function(){if(this.__created){for(var i=0;i<this.slidesCount;++i)this.slides[i].destroy();this.slides=null,this.slideList=null,this.$element.remove(),this.controller.destroy(),this.controller=null}},averta.EventDispatcher.extend(p),MSSlideController.registerView("basic",MSBasicView)}(jQuery),function(){"use strict";window.MSWaveView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-wave-view"),this.$slideCont.css(window._csspfx+"transform-style","preserve-3d"),this.autoUpdateZIndex=!0},MSWaveView.extend(MSBasicView),MSWaveView._3dreq=!0,MSWaveView._fallback=MSBasicView;var p=MSWaveView.prototype,_super=MSBasicView.prototype;p._horizUpdate=function(controller,value){_super._horizUpdate.call(this,controller,value);for(var slide,distance,cont_scroll=-value,i=0;i<this.slidesCount;++i)slide=this.slideList[i],distance=-cont_scroll-slide.position,this.__updateSlidesHoriz(slide,distance)},p._vertiUpdate=function(controller,value){_super._vertiUpdate.call(this,controller,value);for(var slide,distance,cont_scroll=-value,i=0;i<this.slidesCount;++i)slide=this.slideList[i],distance=-cont_scroll-slide.position,this.__updateSlidesVertic(slide,distance)},p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);slide.$element.css(window._csspfx+"transform","translateZ("+3*-value+"px) rotateY(0.01deg)")},p.__updateSlidesVertic=function(slide,distance){this.__updateSlidesHoriz(slide,distance)},MSSlideController.registerView("wave",MSWaveView)}(jQuery),function(){window.MSFadeBasicView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-fade-basic-view")},MSFadeBasicView.extend(MSWaveView);{var p=MSFadeBasicView.prototype;MSFadeBasicView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(.6*distance/this.__width);value=1-Math.min(value,.6),slide.$element.css("opacity",value)},p.__updateSlidesVertic=function(slide,distance){this.__updateSlidesHoriz(slide,distance)},MSSlideController.registerView("fadeBasic",MSFadeBasicView),MSWaveView._fallback=MSFadeBasicView}(),function(){window.MSFadeWaveView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-fade-wave-view")},MSFadeWaveView.extend(MSWaveView),MSFadeWaveView._3dreq=!0,MSFadeWaveView._fallback=MSFadeBasicView;{var p=MSFadeWaveView.prototype;MSWaveView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);value=Math.min(value,100),slide.$element.css("opacity",1-value/300),slide.$element[0].style[window._jcsspfx+"Transform"]="scale("+(1-value/800)+") rotateY(0.01deg) "},p.__updateSlidesVertic=function(slide,distance){this.__updateSlidesHoriz(slide,distance)},MSSlideController.registerView("fadeWave",MSFadeWaveView)}(),function(){"use strict";window.MSFlowView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-flow-view")},MSFlowView.extend(MSWaveView),MSFlowView._3dreq=!0,MSFlowView._fallback=MSFadeBasicView;{var p=MSFlowView.prototype;MSWaveView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width),rvalue=Math.min(.3*value,30)*(0>distance?-1:1),zvalue=1.2*value;slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+5*-zvalue+"px) rotateY("+rvalue+"deg) "},p.__updateSlidesVertic=function(slide,distance){var value=Math.abs(100*distance/this.__width),rvalue=Math.min(.3*value,30)*(0>distance?-1:1),zvalue=1.2*value;slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+5*-zvalue+"px) rotateX("+-rvalue+"deg) "},MSSlideController.registerView("flow",MSFlowView)}(jQuery),function(){window.MSFadeFlowView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-fade-flow-view")},MSFadeFlowView.extend(MSWaveView),MSFadeFlowView._3dreq=!0;{var p=MSFadeFlowView.prototype;MSWaveView.prototype}p.__calculate=function(distance){var value=Math.min(Math.abs(100*distance/this.__width),100),rvalue=Math.min(.5*value,50)*(0>distance?-1:1);return{value:value,rvalue:rvalue}},p.__updateSlidesHoriz=function(slide,distance){var clc=this.__calculate(distance);slide.$element.css("opacity",1-clc.value/300),slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+-clc.value+"px) rotateY("+clc.rvalue+"deg) "},p.__updateSlidesVertic=function(slide,distance){var clc=this.__calculate(distance);slide.$element.css("opacity",1-clc.value/300),slide.$element[0].style[window._jcsspfx+"Transform"]="translateZ("+-clc.value+"px) rotateX("+-clc.rvalue+"deg) "},MSSlideController.registerView("fadeFlow",MSFadeFlowView)}(),function($){"use strict";window.MSMaskView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-mask-view")},MSMaskView.extend(MSBasicView);var p=MSMaskView.prototype,_super=MSBasicView.prototype;p.addSlide=function(slide){slide.view=this,slide.$frame=$("<div></div>").addClass("ms-mask-frame").append(slide.$element),slide.$element[0].style.position="relative",slide.autoAppend=!1,this.slides.push(slide),this.slideList.push(slide),this.slidesCount++},p.setSize=function(width,height){for(var slider=this.slides[0].slider,i=0;i<this.slidesCount;++i)this.slides[i].$frame[0].style.width=width+"px",slider.options.autoHeight||(this.slides[i].$frame[0].style.height=height+"px");_super.setSize.call(this,width,height)},p._horizUpdate=function(controller,value){_super._horizUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateX("+(value-this.slideList[i].position)+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.left=value-this.slideList[i].position+"px"},p._vertiUpdate=function(controller,value){_super._vertiUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateY("+(value-this.slideList[i].position)+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.top=value-this.slideList[i].position+"px"},p.__pushEnd=function(){var first_slide=this.slides.shift(),last_slide=this.slides[this.slidesCount-2];if(this.slides.push(first_slide),this.normalMode){var pos=last_slide.$frame[0][this.__offset]+this.spacing+this[this.__dimension];first_slide.$frame[0].style[this.__cssProb]=pos+"px",first_slide.position=pos}},p.__pushStart=function(){var last_slide=this.slides.pop(),first_slide=this.slides[0];if(this.slides.unshift(last_slide),this.normalMode){var pos=first_slide.$frame[0][this.__offset]-this.spacing-this[this.__dimension];last_slide.$frame[0].style[this.__cssProb]=pos+"px",last_slide.position=pos}},p.__updateViewList=function(){if(this.normalMode)return void(this.viewSlidesList=this.slides);var temp=this.viewSlidesList.slice();this.viewSlidesList=[];var l,i=0,hlf=Math.floor(this.options.viewNum/2);if(this.loop)for(;i!==this.options.viewNum;i++)this.viewSlidesList.push(this.slides[this.currentSlideLoc-hlf+i]);else{for(i=0;i!==hlf&&this.index-i!==-1;i++)this.viewSlidesList.unshift(this.slideList[this.index-i]);for(i=1;i!==hlf&&this.index+i!==this.slidesCount;i++)this.viewSlidesList.push(this.slideList[this.index+i])}for(i=0,l=temp.length;i!==l;i++)-1===this.viewSlidesList.indexOf(temp[i])&&(temp[i].sleep(),temp[i].$frame.detach());temp=null},p.__locateSlides=function(move,start){this.__updateViewList(),start=this.loop?start||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing);for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++){var pos=start+i*(this[this.__dimension]+this.spacing);if(slide=this.viewSlidesList[i],this.$slideCont.append(slide.$frame),slide.wakeup(!1),slide.position=pos,slide.selected&&slide.bgvideo)try{slide.bgvideo.play()}catch(e){}slide.$frame[0].style[this.__cssProb]=pos+"px"}move!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},MSSlideController.registerView("mask",MSMaskView)}(jQuery),function(){"use strict";window.MSParallaxMaskView=function(options){MSMaskView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-parallax-mask-view")},MSParallaxMaskView.extend(MSMaskView),MSParallaxMaskView.parallaxAmount=.5;var p=MSParallaxMaskView.prototype,_super=MSBasicView.prototype;p._horizUpdate=function(controller,value){_super._horizUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateX("+(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.left=(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px"},p._vertiUpdate=function(controller,value){_super._vertiUpdate.call(this,controller,value);var i=0;if(this.css3)for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style[window._jcsspfx+"Transform"]="translateY("+(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px)"+this.__translate_end;else for(i=0;i<this.slidesCount;++i)this.slideList[i].$element[0].style.top=(value-this.slideList[i].position)*MSParallaxMaskView.parallaxAmount+"px"},MSSlideController.registerView("parallaxMask",MSParallaxMaskView)}(jQuery),function(){"use strict";window.MSFadeView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-fade-view"),this.controller.renderCallback(this.__update,this)},MSFadeView.extend(MSBasicView);var p=MSFadeView.prototype,_super=MSBasicView.prototype;p.__update=function(controller,value){for(var slide,distance,cont_scroll=-value,i=0;i<this.slidesCount;++i)slide=this.slideList[i],distance=-cont_scroll-slide.position,this.__updateSlides(slide,distance)},p.__updateSlides=function(slide,distance){var value=Math.abs(distance/this[this.__dimension]);0>=1-value?slide.$element.fadeTo(0,0).css("visibility","hidden"):slide.$element.fadeTo(0,1-value).css("visibility","")},p.__locateSlides=function(move,start){this.__updateViewList(),start=this.loop?start||0:this.slides.indexOf(this.viewSlidesList[0])*(this[this.__dimension]+this.spacing);for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++){var pos=start+i*this[this.__dimension];slide=this.viewSlidesList[i],slide.wakeup(),slide.position=pos}move!==!1&&this.controller.changeTo(this.slideList[this.index].position,!1,null,null,!1)},p.__pushEnd=function(){var first_slide=this.slides.shift(),last_slide=this.slides[this.slidesCount-2];this.slides.push(first_slide),first_slide.position=last_slide.position+this[this.__dimension]},p.__pushStart=function(){var last_slide=this.slides.pop(),first_slide=this.slides[0];this.slides.unshift(last_slide),last_slide.position=first_slide.position-this[this.__dimension]},p.create=function(index){_super.create.call(this,index),this.spacing=0,this.controller.options.minValidDist=10},MSSlideController.registerView("fade",MSFadeView)}(jQuery),function(){"use strict";window.MSScaleView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-scale-view"),this.controller.renderCallback(this.__update,this)},MSScaleView.extend(MSFadeView);var p=MSScaleView.prototype,_super=MSFadeView.prototype;p.__updateSlides=function(slide,distance){var value=Math.abs(distance/this[this.__dimension]),element=slide.$element[0];0>=1-value?(element.style.opacity=0,element.style.visibility="hidden",element.style[window._jcsspfx+"Transform"]=""):(element.style.opacity=1-value,element.style.visibility="",element.style[window._jcsspfx+"Transform"]="perspective(2000px) translateZ("+value*(0>distance?-.5:.5)*300+"px)")},p.create=function(index){_super.create.call(this,index),this.controller.options.minValidDist=.03},MSSlideController.registerView("scale",MSScaleView)}(jQuery),function(){"use strict";window.MSStackView=function(options){MSBasicView.call(this,options),this.$element.removeClass("ms-basic-view").addClass("ms-stack-view"),this.controller.renderCallback(this.__update,this),this.autoUpdateZIndex=!0},MSStackView.extend(MSFadeView),MSStackView._3dreq=!0,MSStackView._fallback=MSFadeView;var p=MSStackView.prototype,_super=MSFadeView.prototype;p.__updateSlidesZindex=function(){for(var slide,l=this.viewSlidesList.length,i=0;i!==l;i++)slide=this.viewSlidesList[i],this.viewSlidesList[i].$element.css("z-index",l-i)},p.__updateSlides=function(slide,distance){var value=Math.abs(distance/this[this.__dimension]),element=slide.$element[0];0>=1-value?(element.style.opacity=1,element.style.visibility="hidden",element.style[window._jcsspfx+"Transform"]=""):(element.style.visibility="",element.style[window._jcsspfx+"Transform"]=0>distance?"perspective(2000px) translateZ("+-300*value+"px)":this.__translate+"("+-value*this[this.__dimension]+"px)")},p.create=function(index){_super.create.call(this,index),this.controller.options.minValidDist=.03,this.__translate="h"===this.dir?"translateX":"translateY"},MSSlideController.registerView("stack",MSStackView)}(jQuery),function(){"use strict";var perspective=2e3;window.MSFocusView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-focus-view"),this.options.centerSpace=this.options.centerSpace||1},MSFocusView.extend(MSWaveView),MSFocusView._3dreq=!0,MSFocusView._fallback=MSFadeBasicView;{var p=MSFocusView.prototype;MSWaveView.prototype}p.__calcview=function(z,w){var a=w/2*z/(z+perspective);return a*(z+perspective)/perspective},p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);value=15*-Math.min(value,100),slide.$element.css(window._csspfx+"transform","translateZ("+(value+1)+"px) rotateY(0.01deg) translateX("+(0>distance?1:-1)*-this.__calcview(value,this.__width)*this.options.centerSpace+"px)")},p.__updateSlidesVertic=function(slide,distance){var value=Math.abs(100*distance/this.__width);value=15*-Math.min(value,100),slide.$element.css(window._csspfx+"transform","translateZ("+(value+1)+"px) rotateY(0.01deg) translateY("+(0>distance?1:-1)*-this.__calcview(value,this.__width)*this.options.centerSpace+"px)")},MSSlideController.registerView("focus",MSFocusView)}(),function(){window.MSPartialWaveView=function(options){MSWaveView.call(this,options),this.$element.removeClass("ms-wave-view").addClass("ms-partial-wave-view")},MSPartialWaveView.extend(MSWaveView),MSPartialWaveView._3dreq=!0,MSPartialWaveView._fallback=MSFadeBasicView;{var p=MSPartialWaveView.prototype;MSWaveView.prototype}p.__updateSlidesHoriz=function(slide,distance){var value=Math.abs(100*distance/this.__width);slide.hasBG&&slide.$bg_img.css("opacity",(100-Math.abs(120*distance/this.__width/3))/100),slide.$element.css(window._csspfx+"transform","translateZ("+3*-value+"px) rotateY(0.01deg) translateX("+.75*distance+"px)")},p.__updateSlidesVertic=function(slide,distance){var value=Math.abs(100*distance/this.__width);slide.hasBG&&slide.$bg_img.css("opacity",(100-Math.abs(120*distance/this.__width/3))/100),slide.$element.css(window._csspfx+"transform","translateZ("+3*-value+"px) rotateY(0.01deg) translateY("+.75*distance+"px)")},MSSlideController.registerView("partialWave",MSPartialWaveView)}(),function($){"use strict";var BaseControl=function(){this.options={prefix:"ms-",autohide:!0,overVideo:!0,customClass:null}},p=BaseControl.prototype;p.slideAction=function(){},p.setup=function(){this.cont=this.options.insertTo?$(this.options.insertTo):this.slider.$controlsCont,this.options.overVideo||this._hideOnvideoStarts()},p.checkHideUnder=function(){this.options.hideUnder&&(this.needsRealign=!this.options.insetTo&&("left"===this.options.align||"right"===this.options.align)&&this.options.inset===!1,$(window).bind("resize",{that:this},this.onResize),this.onResize())},p.onResize=function(event){var that=event&&event.data.that||this,w=window.innerWidth;w<=that.options.hideUnder&&!that.detached?(that.hide(!0),that.detached=!0,that.onDetach()):w>=that.options.hideUnder&&that.detached&&(that.detached=!1,that.visible(),that.onAppend())},p.create=function(){this.options.autohide&&(this.hide(!0),this.slider.$controlsCont.mouseenter($.proxy(this._onMouseEnter,this)).mouseleave($.proxy(this._onMouseLeave,this)).mousedown($.proxy(this._onMouseDown,this)),this.$element&&this.$element.mouseenter($.proxy(this._onMouseEnter,this)).mouseleave($.proxy(this._onMouseLeave,this)).mousedown($.proxy(this._onMouseDown,this)),$(document).mouseup($.proxy(this._onMouseUp,this))),this.options.align&&this.$element.addClass("ms-align-"+this.options.align),this.options.customClass&&this.$element&&this.$element.addClass(this.options.customClass)},p._onMouseEnter=function(){this._disableAH||this.mdown||this.visible(),this.mleave=!1},p._onMouseLeave=function(){this.mdown||this.hide(),this.mleave=!0},p._onMouseDown=function(){this.mdown=!0},p._onMouseUp=function(){this.mdown&&this.mleave&&this.hide(),this.mdown=!1},p.onAppend=function(){this.needsRealign&&this.slider._realignControls()},p.onDetach=function(){this.needsRealign&&this.slider._realignControls()},p._hideOnvideoStarts=function(){var that=this;this.slider.api.addEventListener(MSSliderEvent.VIDEO_PLAY,function(){that._disableAH=!0,that.hide()}),this.slider.api.addEventListener(MSSliderEvent.VIDEO_CLOSE,function(){that._disableAH=!1,that.visible()})},p.hide=function(fast){if(fast)this.$element.css("opacity",0),this.$element.css("display","none");else{clearTimeout(this.hideTo);var $element=this.$element;this.hideTo=setTimeout(function(){CTween.fadeOut($element,400,!1)},20)}this.$element.addClass("ms-ctrl-hide")},p.visible=function(){this.detached||(clearTimeout(this.hideTo),this.$element.css("display",""),CTween.fadeIn(this.$element,400,!1),this.$element.removeClass("ms-ctrl-hide"))},p.destroy=function(){this.options&&this.options.hideUnder&&$(window).unbind("resize",this.onResize)},window.BaseControl=BaseControl}(jQuery),function($){"use strict";var MSArrows=function(options){BaseControl.call(this),$.extend(this.options,options)};MSArrows.extend(BaseControl);var p=MSArrows.prototype,_super=BaseControl.prototype;p.setup=function(){var that=this;this.$next=$("<div></div>").addClass(this.options.prefix+"nav-next").bind("click",function(){that.slider.api.next(!0)}),this.$prev=$("<div></div>").addClass(this.options.prefix+"nav-prev").bind("click",function(){that.slider.api.previous(!0)}),_super.setup.call(this),this.cont.append(this.$next),this.cont.append(this.$prev),this.checkHideUnder()},p.hide=function(fast){return fast?(this.$prev.css("opacity",0).css("display","none"),void this.$next.css("opacity",0).css("display","none")):(CTween.fadeOut(this.$prev,400,!1),CTween.fadeOut(this.$next,400,!1),this.$prev.addClass("ms-ctrl-hide"),void this.$next.addClass("ms-ctrl-hide"))},p.visible=function(){this.detached||(CTween.fadeIn(this.$prev,400),CTween.fadeIn(this.$next,400),this.$prev.removeClass("ms-ctrl-hide").css("display",""),this.$next.removeClass("ms-ctrl-hide").css("display",""))},p.destroy=function(){_super.destroy(),this.$next.remove(),this.$prev.remove()},window.MSArrows=MSArrows,MSSlideController.registerControl("arrows",MSArrows)}(jQuery),function($){"use strict";var MSThumblist=function(options){BaseControl.call(this),this.options.dir="h",this.options.wheel="v"===options.dir,this.options.arrows=!1,this.options.speed=17,this.options.align=null,this.options.inset=!1,this.options.margin=10,this.options.space=10,this.options.width=100,this.options.height=100,this.options.type="thumbs",this.options.hover=!1,$.extend(this.options,options),this.thumbs=[],this.index_count=0,this.__dimen="h"===this.options.dir?"width":"height",this.__alignsize="h"===this.options.dir?"height":"width",this.__jdimen="h"===this.options.dir?"outerWidth":"outerHeight",this.__pos="h"===this.options.dir?"left":"top",this.click_enable=!0};MSThumblist.extend(BaseControl);var p=MSThumblist.prototype,_super=BaseControl.prototype;p.setup=function(){if(this.$element=$("<div></div>").addClass(this.options.prefix+"thumb-list"),"tabs"===this.options.type&&this.$element.addClass(this.options.prefix+"tabs"),this.$element.addClass("ms-dir-"+this.options.dir),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),this.$thumbscont=$("<div></div>").addClass("ms-thumbs-cont").appendTo(this.$element),this.options.arrows){var that=this;this.$fwd=$("<div></div>").addClass("ms-thumblist-fwd").appendTo(this.$element).click(function(){that.controller.push(-15)}),this.$bwd=$("<div></div>").addClass("ms-thumblist-bwd").appendTo(this.$element).click(function(){that.controller.push(15)})}if(!this.options.insetTo&&this.options.align){var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.detach().prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()),"v"===this.options.dir?this.$element.width(this.options.width):this.$element.height(this.options.height)}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,this.options[this.__alignsize]+2*this.options.margin);this.$element.css(align,-pos-this.options[this.__alignsize]-this.options.margin)}},p.slideAction=function(slide){var thumb_ele=slide.$element.find(".ms-thumb"),that=this,thumb_frame=$("<div></div>").addClass("ms-thumb-frame").append(thumb_ele).append($('<div class="ms-thumb-ol"></div>')).bind(this.options.hover?"hover":"click",function(){that.changeSlide(thumb_frame)});if(this.options.align&&thumb_frame.width(this.options.width-("v"===this.options.dir&&"tabs"===this.options.type?12:0)).height(this.options.height).css("margin-"+("v"===this.options.dir?"bottom":"right"),this.options.space),thumb_frame[0].index=this.index_count++,this.$thumbscont.append(thumb_frame),this.options.fillMode&&thumb_ele.is("img")){var aligner=new window.MSAligner(this.options.fillMode,thumb_frame,thumb_ele);thumb_ele[0].aligner=aligner,thumb_ele.one("load",function(){var $this=$(this);$this[0].aligner.init($this.width(),$this.height()),$this[0].aligner.align()}).each($.jqLoadFix)}$.browser.msie&&thumb_ele.on("dragstart",function(event){event.preventDefault()}),this.thumbs.push(thumb_frame)},p.create=function(){_super.create.call(this),this.__translate_end=window._css3d?" translateZ(0px)":"",this.controller=new Controller(0,0,{snappingMinSpeed:2,friction:(100-.5*this.options.speed)/100}),this.controller.renderCallback("h"===this.options.dir?this._hMove:this._vMove,this);var that=this;this.resize_listener=function(){that.__resize()},$(window).bind("resize",this.resize_listener),this.thumbSize=this.thumbs[0][this.__jdimen](!0),this.setupSwipe(),this.__resize();var that=this;this.options.wheel&&(this.wheellistener=function(event){var e=window.event||event.orginalEvent||event,delta=Math.max(-1,Math.min(1,e.wheelDelta||-e.detail));return that.controller.push(10*-delta),!1},$.browser.mozilla?this.$element[0].addEventListener("DOMMouseScroll",this.wheellistener):this.$element.bind("mousewheel",this.wheellistener)),this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.slider.api.addEventListener(MSSliderEvent.HARD_UPDATE,this.realignThumbs,this),this.cindex=this.slider.api.index(),this.select(this.thumbs[this.cindex])},p._hMove=function(controller,value){return this.__contPos=value,window._cssanim?void(this.$thumbscont[0].style[window._jcsspfx+"Transform"]="translateX("+-value+"px)"+this.__translate_end):void(this.$thumbscont[0].style.left=-value+"px")},p._vMove=function(controller,value){return this.__contPos=value,window._cssanim?void(this.$thumbscont[0].style[window._jcsspfx+"Transform"]="translateY("+-value+"px)"+this.__translate_end):void(this.$thumbscont[0].style.top=-value+"px")},p.setupSwipe=function(){this.swipeControl=new averta.TouchSwipe(this.$element),this.swipeControl.swipeType="h"===this.options.dir?"horizontal":"vertical";var that=this;this.swipeControl.onSwipe="h"===this.options.dir?function(status){that.horizSwipeMove(status)}:function(status){that.vertSwipeMove(status)}},p.vertSwipeMove=function(status){if(!this.dTouch){var phase=status.phase;if("start"===phase)this.controller.stop();else if("move"===phase)this.controller.drag(status.moveY);else if("end"===phase||"cancel"===phase){var speed=Math.abs(status.distanceY/status.duration*50/3);speed>.1?this.controller.push(-status.distanceY/status.duration*50/3):(this.click_enable=!0,this.controller.cancel())}}},p.horizSwipeMove=function(status){if(!this.dTouch){var phase=status.phase;if("start"===phase)this.controller.stop(),this.click_enable=!1;else if("move"===phase)this.controller.drag(status.moveX);else if("end"===phase||"cancel"===phase){var speed=Math.abs(status.distanceX/status.duration*50/3);speed>.1?this.controller.push(-status.distanceX/status.duration*50/3):(this.click_enable=!0,this.controller.cancel())}}},p.update=function(){var nindex=this.slider.api.index();this.cindex!==nindex&&(null!=this.cindex&&this.unselect(this.thumbs[this.cindex]),this.cindex=nindex,this.select(this.thumbs[this.cindex]),this.dTouch||this.updateThumbscroll())},p.realignThumbs=function(){this.$element.find(".ms-thumb").each(function(index,thumb){thumb.aligner&&thumb.aligner.align()})},p.updateThumbscroll=function(){var pos=this.thumbSize*this.cindex;if(0/0==this.controller.value&&(this.controller.value=0),pos-this.controller.value<0)return void this.controller.gotoSnap(this.cindex,!0);if(pos+this.thumbSize-this.controller.value>this.$element[this.__dimen]()){var first_snap=this.cindex-Math.floor(this.$element[this.__dimen]()/this.thumbSize)+1;return void this.controller.gotoSnap(first_snap,!0)}},p.changeSlide=function(thumb){this.click_enable&&this.cindex!==thumb[0].index&&this.slider.api.gotoSlide(thumb[0].index)},p.unselect=function(ele){ele.removeClass("ms-thumb-frame-selected")},p.select=function(ele){ele.addClass("ms-thumb-frame-selected")},p.__resize=function(){var size=this.$element[this.__dimen]();if(this.ls!==size){this.ls=size,this.thumbSize=this.thumbs[0][this.__jdimen](!0);var len=this.slider.api.count()*this.thumbSize;this.$thumbscont[0].style[this.__dimen]=len+"px",size>=len?(this.dTouch=!0,this.controller.stop(),this.$thumbscont[0].style[this.__pos]=.5*(size-len)+"px",this.$thumbscont[0].style[window._jcsspfx+"Transform"]=""):(this.dTouch=!1,this.click_enable=!0,this.$thumbscont[0].style[this.__pos]="",this.controller._max_value=len-size,this.controller.options.snapsize=this.thumbSize,this.updateThumbscroll())}},p.destroy=function(){_super.destroy(),this.options.wheel&&($.browser.mozilla?this.$element[0].removeEventListener("DOMMouseScroll",this.wheellistener):this.$element.unbind("mousewheel",this.wheellistener),this.wheellistener=null),$(window).unbind("resize",this.resize_listener),this.$element.remove(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this)},window.MSThumblist=MSThumblist,MSSlideController.registerControl("thumblist",MSThumblist)}(jQuery),function($){"use strict";
var MSBulltes=function(options){BaseControl.call(this),this.options.dir="h",this.options.inset=!0,this.options.margin=10,this.options.space=10,$.extend(this.options,options),this.bullets=[]};MSBulltes.extend(BaseControl);var p=MSBulltes.prototype,_super=BaseControl.prototype;p.setup=function(){if(_super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"bullets").addClass("ms-dir-"+this.options.dir).appendTo(this.cont),this.$bullet_cont=$("<div></div>").addClass("ms-bullets-count").appendTo(this.$element),!this.options.insetTo&&this.options.align){var align=this.options.align;this.options.inset&&this.$element.css(align,this.options.margin)}this.checkHideUnder()},p.create=function(){_super.create.call(this);var that=this;this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index();for(var i=0;i<this.slider.api.count();++i){var bullet=$("<div></div>").addClass("ms-bullet");bullet[0].index=i,bullet.on("click",function(){that.changeSlide(this.index)}),this.$bullet_cont.append(bullet),this.bullets.push(bullet),"h"===this.options.dir?bullet.css("margin",this.options.space/2):bullet.css("margin",this.options.space)}"h"===this.options.dir?this.$element.width(bullet.outerWidth(!0)*this.slider.api.count()):this.$element.css("margin-top",-this.$element.outerHeight(!0)/2),this.select(this.bullets[this.cindex])},p.update=function(){var nindex=this.slider.api.index();this.cindex!==nindex&&(null!=this.cindex&&this.unselect(this.bullets[this.cindex]),this.cindex=nindex,this.select(this.bullets[this.cindex]))},p.changeSlide=function(index){this.cindex!==index&&this.slider.api.gotoSlide(index)},p.unselect=function(ele){ele.removeClass("ms-bullet-selected")},p.select=function(ele){ele.addClass("ms-bullet-selected")},p.destroy=function(){_super.destroy(),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.$element.remove()},window.MSBulltes=MSBulltes,MSSlideController.registerControl("bullets",MSBulltes)}(jQuery),function($){"use strict";var MSScrollbar=function(options){BaseControl.call(this),this.options.dir="h",this.options.autohide=!0,this.options.width=4,this.options.color="#3D3D3D",this.options.margin=10,$.extend(this.options,options),this.__dimen="h"===this.options.dir?"width":"height",this.__jdimen="h"===this.options.dir?"outerWidth":"outerHeight",this.__pos="h"===this.options.dir?"left":"top",this.__translate_end=window._css3d?" translateZ(0px)":"",this.__translate_start="h"===this.options.dir?" translateX(":"translateY("};MSScrollbar.extend(BaseControl);var p=MSScrollbar.prototype,_super=BaseControl.prototype;p.setup=function(){if(this.$element=$("<div></div>").addClass(this.options.prefix+"sbar").addClass("ms-dir-"+this.options.dir),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),this.$bar=$("<div></div>").addClass(this.options.prefix+"bar").appendTo(this.$element),this.slider.options.loop&&(this.disable=!0,this.$element.remove()),"v"===this.options.dir?this.$bar.width(this.options.width):this.$bar.height(this.options.width),this.$bar.css("background-color",this.options.color),!this.options.insetTo&&this.options.align){this.$element.css("v"===this.options.dir?{right:"auto",left:"auto"}:{top:"auto",bottom:"auto"});var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align())}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,2*this.options.margin+this.options.width);this.$element.css(align,-pos-this.options.margin-this.options.width)}},p.create=function(){if(!this.disable){this.scroller=this.slider.api.scroller,this.slider.api.view.addEventListener(MSViewEvents.SCROLL,this._update,this),this.slider.api.addEventListener(MSSliderEvent.RESIZE,this._resize,this),this._resize(),this.options.autohide&&this.$bar.css("opacity","0")}},p._resize=function(){this.vdimen=this.$element[this.__dimen](),this.bar_dimen=this.slider.api.view["__"+this.__dimen]*this.vdimen/this.scroller._max_value,this.$bar[this.__dimen](this.bar_dimen)},p._update=function(){var value=this.scroller.value*(this.vdimen-this.bar_dimen)/this.scroller._max_value;if(this.lvalue!==value){if(this.lvalue=value,this.options.autohide){clearTimeout(this.hto),this.$bar.css("opacity","1");var that=this;this.hto=setTimeout(function(){that.$bar.css("opacity","0")},150)}return 0>value?void(this.$bar[0].style[this.__dimen]=this.bar_dimen+value+"px"):(value>this.vdimen-this.bar_dimen&&(this.$bar[0].style[this.__dimen]=this.vdimen-value+"px"),window._cssanim?void(this.$bar[0].style[window._jcsspfx+"Transform"]=this.__translate_start+value+"px)"+this.__translate_end):void(this.$bar[0].style[this.__pos]=value+"px"))}},p.destroy=function(){_super.destroy(),this.slider.api.view.removeEventListener(MSViewEvents.SCROLL,this._update,this),this.slider.api.removeEventListener(MSSliderEvent.RESIZE,this._resize,this),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.$element.remove()},window.MSScrollbar=MSScrollbar,MSSlideController.registerControl("scrollbar",MSScrollbar)}(jQuery),function($){"use strict";var MSTimerbar=function(options){BaseControl.call(this),this.options.autohide=!1,this.options.width=4,this.options.color="#FFFFFF",this.options.inset=!0,this.options.margin=0,$.extend(this.options,options)};MSTimerbar.extend(BaseControl);var p=MSTimerbar.prototype,_super=BaseControl.prototype;p.setup=function(){if(_super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"timerbar"),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),this.$bar=$("<div></div>").addClass("ms-time-bar").appendTo(this.$element),"v"===this.options.dir?(this.$bar.width(this.options.width),this.$element.width(this.options.width)):(this.$bar.height(this.options.width),this.$element.height(this.options.width)),this.$bar.css("background-color",this.options.color),!this.options.insetTo&&this.options.align){this.$element.css({top:"auto",bottom:"auto"});var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align())}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,2*this.options.margin+this.options.width);this.$element.css(align,-pos-this.options.margin-this.options.width)}},p.create=function(){_super.create.call(this),this.slider.api.addEventListener(MSSliderEvent.WAITING,this._update,this),this._update()},p._update=function(){this.$bar[0].style.width=this.slider.api._delayProgress+"%"},p.destroy=function(){_super.destroy(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.WAITING,this._update,this),this.$element.remove()},window.MSTimerbar=MSTimerbar,MSSlideController.registerControl("timebar",MSTimerbar)}(jQuery),function($){"use strict";var MSCircleTimer=function(options){BaseControl.call(this),this.options.color="#A2A2A2",this.options.stroke=10,this.options.radius=4,this.options.autohide=!1,$.extend(this.options,options)};MSCircleTimer.extend(BaseControl);var p=MSCircleTimer.prototype,_super=BaseControl.prototype;p.setup=function(){return _super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"ctimer").appendTo(this.cont),this.$canvas=$("<canvas></canvas>").addClass("ms-ctimer-canvas").appendTo(this.$element),this.$bar=$("<div></div>").addClass("ms-ctimer-bullet").appendTo(this.$element),this.$canvas[0].getContext?(this.ctx=this.$canvas[0].getContext("2d"),this.prog=0,this.__w=2*(this.options.radius+this.options.stroke/2),this.$canvas[0].width=this.__w,this.$canvas[0].height=this.__w,void this.checkHideUnder()):(this.destroy(),void(this.disable=!0))},p.create=function(){if(!this.disable){_super.create.call(this),this.slider.api.addEventListener(MSSliderEvent.WAITING,this._update,this);var that=this;this.$element.click(function(){that.slider.api.paused?that.slider.api.resume():that.slider.api.pause()}),this._update()}},p._update=function(){var that=this;$(this).stop(!0).animate({prog:.01*this.slider.api._delayProgress},{duration:200,step:function(){that._draw()}})},p._draw=function(){this.ctx.clearRect(0,0,this.__w,this.__w),this.ctx.beginPath(),this.ctx.arc(.5*this.__w,.5*this.__w,this.options.radius,1.5*Math.PI,1.5*Math.PI+2*Math.PI*this.prog,!1),this.ctx.strokeStyle=this.options.color,this.ctx.lineWidth=this.options.stroke,this.ctx.stroke()},p.destroy=function(){_super.destroy(),this.disable||($(this).stop(!0),this.slider.api.removeEventListener(MSSliderEvent.WAITING,this._update,this),this.$element.remove())},window.MSCircleTimer=MSCircleTimer,MSSlideController.registerControl("circletimer",MSCircleTimer)}(jQuery),function($){"use strict";window.MSLightbox=function(options){BaseControl.call(this,options),this.options.autohide=!1,$.extend(this.options,options),this.data_list=[]},MSLightbox.fadeDuratation=400,MSLightbox.extend(BaseControl);var p=MSLightbox.prototype,_super=BaseControl.prototype;p.setup=function(){_super.setup.call(this),this.$element=$("<div></div>").addClass(this.options.prefix+"lightbox-btn").appendTo(this.cont),this.checkHideUnder()},p.slideAction=function(slide){$("<div></div>").addClass(this.options.prefix+"lightbox-btn").appendTo(slide.$element).append($(slide.$element.find(".ms-lightbox")))},p.create=function(){_super.create.call(this)},MSSlideController.registerControl("lightbox",MSLightbox)}(jQuery),function($){"use strict";window.MSSlideInfo=function(options){BaseControl.call(this,options),this.options.autohide=!1,this.options.align=null,this.options.inset=!1,this.options.margin=10,this.options.size=100,this.options.dir="h",$.extend(this.options,options),this.data_list=[]},MSSlideInfo.fadeDuratation=400,MSSlideInfo.extend(BaseControl);var p=MSSlideInfo.prototype,_super=BaseControl.prototype;p.setup=function(){if(this.$element=$("<div></div>").addClass(this.options.prefix+"slide-info").addClass("ms-dir-"+this.options.dir),_super.setup.call(this),this.$element.appendTo(this.slider.$controlsCont===this.cont?this.slider.$element:this.cont),!this.options.insetTo&&this.options.align){var align=this.options.align;this.options.inset?this.$element.css(align,this.options.margin):"top"===align?this.$element.prependTo(this.slider.$element).css({"margin-bottom":this.options.margin,position:"relative"}):"bottom"===align?this.$element.css({"margin-top":this.options.margin,position:"relative"}):(this.slider.api.addEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.align()),"v"===this.options.dir?this.$element.width(this.options.size):this.$element.css("min-height",this.options.size)}this.checkHideUnder()},p.align=function(){if(!this.detached){var align=this.options.align,pos=this.slider.reserveSpace(align,this.options.size+2*this.options.margin);this.$element.css(align,-pos-this.options.size-this.options.margin)}},p.slideAction=function(slide){var info_ele=$(slide.$element.find(".ms-info"));info_ele.detach(),this.data_list[slide.index]=info_ele},p.create=function(){_super.create.call(this),this.slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.update,this),this.cindex=this.slider.api.index(),this.switchEle(this.data_list[this.cindex])},p.update=function(){var nindex=this.slider.api.index();this.switchEle(this.data_list[nindex]),this.cindex=nindex},p.switchEle=function(ele){if(this.current_ele){this.current_ele[0].tween&&this.current_ele[0].tween.stop(!0),this.current_ele[0].tween=CTween.animate(this.current_ele,MSSlideInfo.fadeDuratation,{opacity:0},{complete:function(){this.detach(),this[0].tween=null,ele.css("position","relative")},target:this.current_ele}),ele.css("position","absolute")}this.__show(ele)},p.__show=function(ele){ele.appendTo(this.$element).css("opacity","0"),this.current_ele&&ele.height(Math.max(ele.height(),this.current_ele.height())),clearTimeout(this.tou),this.tou=setTimeout(function(){CTween.fadeIn(ele,MSSlideInfo.fadeDuratation),ele.css("height","")},MSSlideInfo.fadeDuratation),ele[0].tween&&ele[0].tween.stop(!0),this.current_ele=ele},p.destroy=function(){_super.destroy(),clearTimeout(this.tou),this.current_ele&&this.current_ele[0].tween&&this.current_ele[0].tween.stop("true"),this.$element.remove(),this.slider.api.removeEventListener(MSSliderEvent.RESERVED_SPACE_CHANGE,this.align,this),this.slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.update,this)},MSSlideController.registerControl("slideinfo",MSSlideInfo)}(jQuery),function($){window.MSGallery=function(id,slider){this.id=id,this.slider=slider,this.telement=$("#"+id),this.botcont=$("<div></div>").addClass("ms-gallery-botcont").appendTo(this.telement),this.thumbcont=$("<div></div>").addClass("ms-gal-thumbcont hide-thumbs").appendTo(this.botcont),this.playbtn=$("<div></div>").addClass("ms-gal-playbtn").appendTo(this.botcont),this.thumbtoggle=$("<div></div>").addClass("ms-gal-thumbtoggle").appendTo(this.botcont),slider.control("thumblist",{insertTo:this.thumbcont,autohide:!1,dir:"h"}),slider.control("slidenum",{insertTo:this.botcont,autohide:!1}),slider.control("slideinfo",{insertTo:this.botcont,autohide:!1}),slider.control("timebar",{insertTo:this.botcont,autohide:!1}),slider.control("bullets",{insertTo:this.botcont,autohide:!1})};var p=MSGallery.prototype;p._init=function(){var that=this;this.slider.api.paused||this.playbtn.addClass("btn-pause"),this.playbtn.click(function(){that.slider.api.paused?(that.slider.api.resume(),that.playbtn.addClass("btn-pause")):(that.slider.api.pause(),that.playbtn.removeClass("btn-pause"))}),this.thumbtoggle.click(function(){that.vthumbs?(that.thumbtoggle.removeClass("btn-hide"),that.vthumbs=!1,that.thumbcont.addClass("hide-thumbs")):(that.thumbtoggle.addClass("btn-hide"),that.thumbcont.removeClass("hide-thumbs"),that.vthumbs=!0)})},p.setup=function(){var that=this;$(document).ready(function(){that._init()})}}(jQuery),function($){var getPhotosetURL=function(key,id,count){return"https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+key+"&photoset_id="+id+"&per_page="+count+"&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?"},getUserPublicURL=function(key,id,count){return"https://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key="+key+"&user_id="+id+"&per_page="+count+"&extras=url_o,description,date_taken,owner_name,views&format=json&jsoncallback=?"},getImageSource=function(fid,server,id,secret,size,data){return"_o"===size&&data?data.url_o:"https://farm"+fid+".staticflickr.com/"+server+"/"+id+"_"+secret+size+".jpg"};window.MSFlickrV2=function(slider,options){var _options={count:10,type:"photoset",thumbSize:"q",imgSize:"c"};if(this.slider=slider,this.slider.holdOn(),!options.key)return void this.errMsg("Flickr API Key required. Please add it in settings.");$.extend(_options,options),this.options=_options;var that=this;"photoset"===this.options.type?$.getJSON(getPhotosetURL(this.options.key,this.options.id,this.options.count),function(data){that._photosData(data)}):$.getJSON(getUserPublicURL(this.options.key,this.options.id,this.options.count),function(data){that.options.type="photos",that._photosData(data)}),""!==this.options.imgSize&&"-"!==this.options.imgSize&&(this.options.imgSize="_"+this.options.imgSize),this.options.thumbSize="_"+this.options.thumbSize,this.slideTemplate=this.slider.$element.find(".ms-slide")[0].outerHTML,this.slider.$element.find(".ms-slide").remove()};var p=MSFlickrV2.prototype;p._photosData=function(data){if("fail"===data.stat)return void this.errMsg("Flickr API ERROR#"+data.code+": "+data.message);{var that=this;this.options.author||this.options.desc}$.each(data[this.options.type].photo,function(i,item){var slide_cont=that.slideTemplate.replace(/{{[\w-]+}}/g,function(match){return match=match.replace(/{{|}}/g,""),shortCodes[match]?shortCodes[match](item,that):"{{"+match+"}}"});$(slide_cont).appendTo(that.slider.$element)}),that._initSlider()},p.errMsg=function(msg){this.slider.$element.css("display","block"),this.errEle||(this.errEle=$('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading)),this.errEle.html(msg)},p._initSlider=function(){this.slider.release()};var shortCodes={image:function(data,that){return getImageSource(data.farm,data.server,data.id,data.secret,that.options.imgSize,data)},thumb:function(data,that){return getImageSource(data.farm,data.server,data.id,data.secret,that.options.thumbSize)},title:function(data){return data.title},"owner-name":function(data){return data.ownername},"date-taken":function(data){return data.datetaken},views:function(data){return data.views},description:function(data){return data.description._content}}}(jQuery),function($){window.MSFacebookGallery=function(slider,options){var _options={count:10,type:"photostream",thumbSize:"320",imgSize:"orginal",https:!1};this.slider=slider,this.slider.holdOn(),$.extend(_options,options),this.options=_options,this.graph=this.options.https?"https://graph.facebook.com":"http://graph.facebook.com";var that=this;"photostream"===this.options.type?$.getJSON(this.graph+"/"+this.options.username+"/photos/uploaded/?fields=source,name,link,images,from&limit="+this.options.count,function(data){that._photosData(data)}):$.getJSON(this.graph+"/"+this.options.albumId+"/photos?fields=source,name,link,images,from&limit="+this.options.count,function(data){that._photosData(data)}),this.slideTemplate=this.slider.$element.find(".ms-slide")[0].outerHTML,this.slider.$element.find(".ms-slide").remove()};var p=MSFacebookGallery.prototype;p._photosData=function(content){if(content.error)return void this.errMsg("Facebook API ERROR#"+content.error.code+"("+content.error.type+"): "+content.error.message);for(var that=this,i=(this.options.author||this.options.desc,0),l=content.data.length;i!==l;i++){var slide_cont=that.slideTemplate.replace(/{{[\w-]+}}/g,function(match){return match=match.replace(/{{|}}/g,""),shortCodes[match]?shortCodes[match](content.data[i],that):"{{"+match+"}}"});$(slide_cont).appendTo(that.slider.$element)}that._initSlider()},p.errMsg=function(msg){this.slider.$element.css("display","block"),this.errEle||(this.errEle=$('<div style="font-family:Arial; color:red; font-size:12px; position:absolute; top:10px; left:10px"></div>').appendTo(this.slider.$loading)),this.errEle.html(msg)},p._initSlider=function(){this.slider.release()};var getImageSource=function(images,size){if("orginal"===size)return images[0].source;for(var i=0,l=images.length;i!==l;i++)if(-1!==images[i].source.indexOf(size+"x"+size))return images[i].source;return images[l-3].source},shortCodes={image:function(data,that){return getImageSource(data.images,that.options.imgSize)},thumb:function(data,that){return getImageSource(data.images,that.options.thumbSize)},name:function(data){return data.name},"owner-name":function(data){return data.from.name},link:function(data){return data.link}}}(jQuery),function($){"use strict";window.MSScrollParallax=function(slider,parallax,bgparallax,fade){this.fade=fade,this.slider=slider,this.parallax=parallax/100,this.bgparallax=bgparallax/100,slider.api.addEventListener(MSSliderEvent.INIT,this.init,this),slider.api.addEventListener(MSSliderEvent.DESTROY,this.destory,this),slider.api.addEventListener(MSSliderEvent.CHANGE_END,this.resetLayers,this),slider.api.addEventListener(MSSliderEvent.CHANGE_START,this.updateCurrentSlide,this)},window.MSScrollParallax.setup=function(slider,parallax,bgparallax,fade){return window._mobile?void 0:(null==parallax&&(parallax=50),null==bgparallax&&(bgparallax=40),new MSScrollParallax(slider,parallax,bgparallax,fade))};var p=window.MSScrollParallax.prototype;p.init=function(){this.slider.$element.addClass("ms-scroll-parallax"),this.sliderOffset=this.slider.$element.offset().top,this.updateCurrentSlide();for(var slide,slides=this.slider.api.view.slideList,i=0,l=slides.length;i!==l;i++)slide=slides[i],slide.hasLayers&&(slide.layerController.$layers.wrap('<div class="ms-scroll-parallax-cont"></div>'),slide.$scrollParallaxCont=slide.layerController.$layers.parent());$(window).on("scroll",{that:this},this.moveParallax).trigger("scroll")},p.resetLayers=function(){if(this.lastSlide){var layers=this.lastSlide.$scrollParallaxCont;window._css2d?(layers&&(layers[0].style[window._jcsspfx+"Transform"]=""),this.lastSlide.hasBG&&(this.lastSlide.$imgcont[0].style[window._jcsspfx+"Transform"]="")):(layers&&(layers[0].style.top=""),this.lastSlide.hasBG&&(this.lastSlide.$imgcont[0].style.top="0px"))}},p.updateCurrentSlide=function(){this.lastSlide=this.currentSlide,this.currentSlide=this.slider.api.currentSlide,this.moveParallax({data:{that:this}})},p.moveParallax=function(e){var that=e.data.that,slider=that.slider,offset=that.sliderOffset,scrollTop=$(window).scrollTop(),layers=that.currentSlide.$scrollParallaxCont,out=offset-scrollTop;0>=out?(layers&&(window._css3d?layers[0].style[window._jcsspfx+"Transform"]="translateY("+-out*that.parallax+"px) translateZ(0.4px)":window._css2d?layers[0].style[window._jcsspfx+"Transform"]="translateY("+-out*that.parallax+"px)":layers[0].style.top=-out*that.parallax+"px"),that.updateSlidesBG(-out*that.bgparallax+"px",!0),layers&&that.fade&&layers.css("opacity",1-Math.min(1,-out/slider.api.height))):(layers&&(window._css2d?layers[0].style[window._jcsspfx+"Transform"]="":layers[0].style.top=""),that.updateSlidesBG("0px",!1),layers&&that.fade&&layers.css("opacity",1))},p.updateSlidesBG=function(pos,fixed){for(var slides=this.slider.api.view.slideList,position=!fixed||$.browser.msie||$.browser.opera?"":"fixed",i=0,l=slides.length;i!==l;i++)slides[i].hasBG&&(slides[i].$imgcont[0].style.position=position,slides[i].$imgcont[0].style.top=pos),slides[i].$bgvideocont&&(slides[i].$bgvideocont[0].style.position=position,slides[i].$bgvideocont[0].style.top=pos)},p.destory=function(){slider.api.removeEventListener(MSSliderEvent.INIT,this.init,this),slider.api.removeEventListener(MSSliderEvent.DESTROY,this.destory,this),slider.api.removeEventListener(MSSliderEvent.CHANGE_END,this.resetLayers,this),slider.api.removeEventListener(MSSliderEvent.CHANGE_START,this.updateCurrentSlide,this),$(window).off("scroll",this.moveParallax)}}(jQuery),function($,document,window){var PId=0;if(window.MasterSlider){var KeyboardNav=function(slider){this.slider=slider,this.PId=PId++,this.slider.options.keyboard&&slider.api.addEventListener(MSSliderEvent.INIT,this.init,this)};KeyboardNav.name="MSKeyboardNav";var p=KeyboardNav.prototype;p.init=function(){var api=this.slider.api;$(document).on("keydown.kbnav"+this.PId,function(event){var which=event.which;37===which||40===which?api.previous(!0):(38===which||39===which)&&api.next(!0)})},p.destroy=function(){$(document).off("keydown.kbnav"+this.PId),this.slider.api.removeEventListener(MSSliderEvent.INIT,this.init,this)},MasterSlider.registerPlugin(KeyboardNav)}}(jQuery,document,window),function($,document,window){var PId=0,$window=$(window),$doc=$(document);if(window.MasterSlider){var StartOnAppear=function(slider){this.PId=PId++,this.slider=slider,this.$slider=slider.$element,this.slider.options.startOnAppear&&(slider.holdOn(),$doc.ready($.proxy(this.init,this)))};StartOnAppear.name="MSStartOnAppear";var p=StartOnAppear.prototype;p.init=function(){this.slider.api;$window.on("scroll.soa"+this.PId,$.proxy(this._onScroll,this)).trigger("scroll")},p._onScroll=function(){var vpBottom=$window.scrollTop()+$window.height(),top=this.$slider.offset().top;vpBottom>top&&($window.off("scroll.soa"+this.PId),this.slider.release())},p.destroy=function(){},MasterSlider.registerPlugin(StartOnAppear)}}(jQuery,document,window),function(document,window){var filterUnits={"hue-rotate":"deg",blur:"px"},initialValues={opacity:1,contrast:1,brightness:1,saturate:1,"hue-rotate":0,invert:0,sepia:0,blur:0,grayscale:0};if(window.MasterSlider){var Filters=function(slider){this.slider=slider,this.slider.options.filters&&slider.api.addEventListener(MSSliderEvent.INIT,this.init,this)};Filters.name="MSFilters";var p=Filters.prototype;p.init=function(){var api=this.slider.api,view=api.view;this.filters=this.slider.options.filters,this.slideList=view.slideList,this.slidesCount=view.slidesCount,this.dimension=view[view.__dimension],this.target="slide"===this.slider.options.filterTarget?"$element":"$bg_img",this.filterName=$.browser.webkit?"WebkitFilter":"filter";var superFun=view.controller.__renderHook.fun,superRef=view.controller.__renderHook.ref;view.controller.renderCallback(function(controller,value){superFun.call(superRef,controller,value),this.applyEffect(value)},this),this.applyEffect(view.controller.value)},p.applyEffect=function(value){for(var factor,slide,i=0;i<this.slidesCount;++i)slide=this.slideList[i],factor=Math.min(1,Math.abs(value-slide.position)/this.dimension),slide[this.target]&&($.browser.msie?null!=this.filters.opacity&&slide[this.target].opacity(1-this.filters.opacity*factor):slide[this.target][0].style[this.filterName]=this.generateStyle(factor))},p.generateStyle=function(factor){var unit,style="";for(var filter in this.filters)unit=filterUnits[filter]||"",style+=filter+"("+(initialValues[filter]+(this.filters[filter]-initialValues[filter])*factor)+") ";return style},p.destroy=function(){this.slider.api.removeEventListener(MSSliderEvent.INIT,this.init,this)},MasterSlider.registerPlugin(Filters)}}(document,window,jQuery),function($,document,window){if(window.MasterSlider){var ScrollToAction=function(slider){this.slider=slider,slider.api.addEventListener(MSSliderEvent.INIT,this.init,this)};ScrollToAction.name="MSScrollToAction";var p=ScrollToAction.prototype;p.init=function(){var api=this.slider.api;api.scrollToEnd=_scrollToEnd,api.scrollTo=_scrollTo},p.destroy=function(){};var _scrollTo=function(target,duration){var target=(this.slider.$element,$(target).eq(0));0!==target.length&&(null==duration&&(duration=1.4),$("html, body").animate({scrollTop:target.offset().top},1e3*duration,"easeInOutQuad"))},_scrollToEnd=function(duration){var sliderEle=this.slider.$element;null==duration&&(duration=1.4),$("html, body").animate({scrollTop:sliderEle.offset().top+sliderEle.outerHeight(!1)},1e3*duration,"easeInOutQuad")};MasterSlider.registerPlugin(ScrollToAction)}}(jQuery,document,window);
//# sourceMappingURL=masterslider.min.js.map;/**/
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



;/**/
/**
 * @file
 *
 * Fivestar JavaScript behaviors integration.
 */

/**
 * Create a degradeable star rating interface out of a simple form structure.
 *
 * Originally based on the Star Rating jQuery plugin by Wil Stuckey:
 * http://sandbox.wilstuckey.com/jquery-ratings/
 */
(function($){ // Create local scope.

Drupal.behaviors.fivestar = {
  attach: function (context) {
    $(context).find('div.fivestar-form-item').once('fivestar', function() {
      var $this = $(this);
      var $container = $('<div class="fivestar-widget clearfix"></div>');
      var $select = $('select', $this);

      // Setup the cancel button
      var $cancel = $('option[value="0"]', $this);
      if ($cancel.length) {
        $('<div class="cancel"><a href="#0" title="' + $cancel.text() + '">' + $cancel.text() + '</a></div>')
          .appendTo($container);
      }

      // Setup the rating buttons
      var $options = $('option', $this).not('[value="-"], [value="0"]');
      var index = -1;
      $options.each(function(i, element) {
        var classes = 'star-' + (i+1);
        classes += (i + 1) % 2 == 0 ? ' even' : ' odd';
        classes += i == 0 ? ' star-first' : '';
        classes += i + 1 == $options.length ? ' star-last' : '';
        $('<div class="star"><a href="#' + element.value + '" title="' + element.text + '">' + element.text + '</a></div>')
          .addClass(classes)
          .appendTo($container);
        if (element.value == $select.val()) {
          index = i + 1;
        }
      });

      if (index != -1) {
        $container.find('.star').slice(0, index).addClass('on');
      }
      $container.addClass('fivestar-widget-' + ($options.length));
      $container.find('a')
        .bind('click', $this, Drupal.behaviors.fivestar.rate)
        .bind('mouseover', $this, Drupal.behaviors.fivestar.hover);

      $container.bind('mouseover mouseout', $this, Drupal.behaviors.fivestar.hover);

      // Attach the new widget and hide the existing widget.
      $select.after($container).css('display', 'none');

      // Allow other modules to modify the widget.
      Drupal.attachBehaviors($this);
    });
  },
  rate: function(event) {
    var $this = $(this);
    var $widget = event.data;
    var value = this.hash.replace('#', '');
    $('select', $widget).val(value).change();
    var $this_star = (value == 0) ? $this.parent().parent().find('.star') : $this.closest('.star');
    $this_star.prevAll('.star').andSelf().addClass('on');
    $this_star.nextAll('.star').removeClass('on');
    if(value==0){
      $this_star.removeClass('on');
    }

    event.preventDefault();
  },
  hover: function(event) {
    var $this = $(this);
    var $widget = event.data;
    var $target = $(event.target);
    var $stars = $('.star', $this);

    if (event.type == 'mouseover') {
      var index = $stars.index($target.parent());
      $stars.each(function(i, element) {
        if (i <= index) {
          $(element).addClass('hover');
        } else {
          $(element).removeClass('hover');
        }
      });
    } else {
      $stars.removeClass('hover');
    }
  }
};

})(jQuery);
;/**/
/*
 * jQuery.appear
 * https://github.com/bas2k/jquery.appear/
 * http://code.google.com/p/jquery-appear/
 *
 * Copyright (c) 2009 Michael Hixson
 * Copyright (c) 2012 Alexander Brovikov
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php)
 */
(function($) {
    $.fn.appear = function(fn, options) {

        var settings = $.extend({

            //arbitrary data to pass to fn
            data: undefined,

            //call fn only on the first appear?
            one: true,

            // X & Y accuracy
            accX: 0,
            accY: 0

        }, options);

        return this.each(function() {

            var t = $(this);

            //whether the element is currently visible
            t.appeared = false;

            if (!fn) {

                //trigger the custom event
                t.trigger('appear', settings.data);
                return;
            }

            var w = $(window);

            //fires the appear event when appropriate
            var check = function() {

                //is the element hidden?
                if (!t.is(':visible')) {

                    //it became hidden
                    t.appeared = false;
                    return;
                }

                //is the element inside the visible window?
                var a = w.scrollLeft();
                var b = w.scrollTop();
                var o = t.offset();
                var x = o.left;
                var y = o.top;

                var ax = settings.accX;
                var ay = settings.accY;
                var th = t.height();
                var wh = w.height();
                var tw = t.width();
                var ww = w.width();

                if (y + th + ay >= b &&
                    y <= b + wh + ay &&
                    x + tw + ax >= a &&
                    x <= a + ww + ax) {

                    //trigger the custom event
                    if (!t.appeared) t.trigger('appear', settings.data);

                } else {

                    //it scrolled out of view
                    t.appeared = false;
                }
            };

            //create a modified fn with some additional logic
            var modifiedFn = function() {

                //mark the element as visible
                t.appeared = true;

                //is this supposed to happen only once?
                if (settings.one) {

                    //remove the check
                    w.unbind('scroll', check);
                    var i = $.inArray(check, $.fn.appear.checks);
                    if (i >= 0) $.fn.appear.checks.splice(i, 1);
                }

                //trigger the original fn
                fn.apply(this, arguments);
            };

            //bind the modified fn to the element
            if (settings.one) t.one('appear', settings.data, modifiedFn);
            else t.bind('appear', settings.data, modifiedFn);

            //check whenever the window scrolls
            w.scroll(check);

            //check whenever the dom changes
            $.fn.appear.checks.push(check);

            //check now
            (check)();
        });
    };

    //keep a queue of appearance checks
    $.extend($.fn.appear, {

        checks: [],
        timeout: null,

        //process the queue
        checkAll: function() {
            var length = $.fn.appear.checks.length;
            if (length > 0) while (length--) ($.fn.appear.checks[length])();
        },

        //check the queue asynchronously
        run: function() {
            if ($.fn.appear.timeout) clearTimeout($.fn.appear.timeout);
            $.fn.appear.timeout = setTimeout($.fn.appear.checkAll, 20);
        }
    });

    //run checks when these methods are called
    $.each(['append', 'prepend', 'after', 'before', 'attr',
        'removeAttr', 'addClass', 'removeClass', 'toggleClass',
        'remove', 'css', 'show', 'hide'], function(i, n) {
        var old = $.fn[n];
        if (old) {
            $.fn[n] = function() {
                var r = old.apply(this, arguments);
                $.fn.appear.run();
                return r;
            }
        }
    });

})(jQuery);;/**/
jQuery(document).ready(function($){
  var ua = navigator.userAgent, isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
  if(isMobileWebkit){
    $(".block-animate").addClass('animated');
  }else{
    $(".block-animate").each(function(){
      var $this = $(this);
      var animate_class = $this.data('animate');
      $this.addClass('appear-animation');
      $this.appear(function(){
				setTimeout(function(){
					$this.addClass(animate_class);
					$this.addClass('animated');
				},300);
      },{
        accX: 0,
        accY: 0,
        one:false
      });
    });
  }
})
;/**/
/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.5",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.5",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.5",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",f))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.5",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger("shown.bs.dropdown",h)}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.5",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.5",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.5",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),
d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.5",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.5",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);;/**/
/*! bootstrap-progressbar v0.9.0 | Copyright (c) 2012-2015 Stephan Groß | MIT license | http://www.minddust.com */
!function(t){"use strict";var e=function(n,s){this.$element=t(n),this.options=t.extend({},e.defaults,s)};e.defaults={transition_delay:300,refresh_speed:50,display_text:"none",use_percentage:!0,percent_format:function(t){return t+"%"},amount_format:function(t,e){return t+" / "+e},update:t.noop,done:t.noop,fail:t.noop},e.prototype.transition=function(){var n=this.$element,s=n.parent(),a=this.$back_text,r=this.$front_text,i=this.options,o=parseInt(n.attr("data-transitiongoal")),h=parseInt(n.attr("aria-valuemin"))||0,d=parseInt(n.attr("aria-valuemax"))||100,f=s.hasClass("vertical"),p=i.update&&"function"==typeof i.update?i.update:e.defaults.update,u=i.done&&"function"==typeof i.done?i.done:e.defaults.done,c=i.fail&&"function"==typeof i.fail?i.fail:e.defaults.fail;if(isNaN(o))return void c("data-transitiongoal not set");var l=Math.round(100*(o-h)/(d-h));if("center"===i.display_text&&!a&&!r){this.$back_text=a=t("<span>").addClass("progressbar-back-text").prependTo(s),this.$front_text=r=t("<span>").addClass("progressbar-front-text").prependTo(n);var g;f?(g=s.css("height"),a.css({height:g,"line-height":g}),r.css({height:g,"line-height":g}),t(window).resize(function(){g=s.css("height"),a.css({height:g,"line-height":g}),r.css({height:g,"line-height":g})})):(g=s.css("width"),r.css({width:g}),t(window).resize(function(){g=s.css("width"),r.css({width:g})}))}setTimeout(function(){var t,e,c,g,_;f?n.css("height",l+"%"):n.css("width",l+"%");var x=setInterval(function(){f?(c=n.height(),g=s.height()):(c=n.width(),g=s.width()),t=Math.round(100*c/g),e=Math.round(h+c/g*(d-h)),t>=l&&(t=l,e=o,u(n),clearInterval(x)),"none"!==i.display_text&&(_=i.use_percentage?i.percent_format(t):i.amount_format(e,d,h),"fill"===i.display_text?n.text(_):"center"===i.display_text&&(a.text(_),r.text(_))),n.attr("aria-valuenow",e),p(t,n)},i.refresh_speed)},i.transition_delay)};var n=t.fn.progressbar;t.fn.progressbar=function(n){return this.each(function(){var s=t(this),a=s.data("bs.progressbar"),r="object"==typeof n&&n;a&&r&&t.extend(a.options,r),a||s.data("bs.progressbar",a=new e(this,r)),a.transition()})},t.fn.progressbar.Constructor=e,t.fn.progressbar.noConflict=function(){return t.fn.progressbar=n,this}}(window.jQuery);;/**/
