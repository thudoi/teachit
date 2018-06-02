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
