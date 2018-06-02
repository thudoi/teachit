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

}(jQuery));;
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
;
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
;
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

})(jQuery);;
var adminSettings={BrandName:"Social9",domain:"share.social9.com/",facebookappid:"1067474659931390",gaugeCdn:"gaugecdn.social9.com"}
if(!document.getElementsByClassName){document.getElementsByClassName=function(search){var d=document,elements,pattern,i,results=[];if(d.querySelectorAll){return d.querySelectorAll("."+search);}
if(d.evaluate){pattern=".//*[contains(concat(' ', @class, ' '), ' "+search+" ')]";elements=d.evaluate(pattern,d,null,0,null);while((i=elements.iterateNext())){results.push(i);}}else{elements=d.getElementsByTagName("*");pattern=new RegExp("(^|\\s)"+search+"(\\s|$)");for(i=0;i<elements.length;i++){if(pattern.test(elements[i].className)){results.push(elements[i]);}}}
return results;}}
function OpenSocialShare(){var util=this.util={};this.global=window;var context=this;var imagePopupdiv='';var constants={domain:adminSettings.domain};util.extend=function(a,b){for(var key in b)
if(b.hasOwnProperty(key))
a[key]=b[key];return a;}
util.getMetaContent=function(propName,attributeName){attributeName=attributeName||'name';var metas=document.getElementsByTagName('meta');for(i=0;i<metas.length;i++){if(metas[i].getAttribute(attributeName)==propName){return metas[i].getAttribute("content");}}
return "";}
util.arrayContains=function(arr,obj){for(var i=0;i<arr.length;i++){if(arr[i]===obj){return true;}}
return false;}
util.getOnlyValidProviders=function(all,select){var validProviders=[];for(var i=0;i<select.length;i++){for(var j=0;j<all.length;j++){if(all[j].toLowerCase()===util.getProviderNameFromObject(select[i]).toLowerCase()){validProviders.push(select[i]);break;}
if('print'===util.getProviderNameFromObject(select[i]).toLowerCase()){validProviders.push(select[i]);break;}}}
return validProviders;}
util.getElementInsideContainer=function(container,childID){var elm={};var elms=container.getElementsByTagName("*");for(var i=0;i<elms.length;i++){if(elms[i].id===childID){elm=elms[i];break;}}
return elm;}
util.closestByClass=function(el,clazz){while(!util.arrayContains(el.classList,clazz)){el=el.parentNode;if(!el){return null;}}
return el;}
util.addJavascriptFile=function(url,context){context=context||document;var head=context.getElementsByTagName('head')[0];var js=context.createElement('script');js.src=url;js.type="text/javascript";head.appendChild(js);return js;}
util.isMobile=((navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)&&!navigator.userAgent.match(/iPod|iPad/i))?true:false);util.jsonpGet=function(url,handle){var func='IAJSONP'+Math.floor((Math.random()*1000000000000000000)+1);window[func]=function(data){handle(data);window[func]=function(){};document.head.removeChild(js);}
var endurl=url.indexOf('?')!=-1?url+'&callback='+func:url+'?callback='+func;var js=util.addJavascriptFile(endurl);}
util.stringHtmlToDom=function(html){if(html){var d=document.createElement('div');d.innerHTML=html;return d.firstChild;}}
util.serialize=function(obj){var str=[];for(var p in obj)
if(obj.hasOwnProperty(p)){str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));}
return str.join("&");}
util.openWindow=function(url,isSingleChildWindow,size){url=url||this.href;var windowname=isSingleChildWindow?"opensocialsharingpopupchildwindow":"";var win=window.open(url,windowname,'menubar=1,resizable=1,width='+size.width+',height='+size.height+',scrollbars=yes');openWindowRef=win;win.focus();return win;};util.getThisObjectName=function(){for(var name in context.global)
if(name!=="webkitStorageInfo"&&name!="webkitIndexedDB"&&context.global[name]===context){return name;}}
util.addEvent=function(type,element,handle){var elements=[];if(element instanceof Array){elements=element;}else{elements.push(element);}
for(i=0;i<elements.length;i++){if(elements[i].attachEvent){elements[i].attachEvent("on"+type,function(){handle.call(elements[i]);});}else if(elements[i].addEventListener){elements[i].addEventListener(type,handle,false);}}}
util.getAllElementsWithAttribute=function(attribute,parent){var matchingElements=[];parent=parent||document;var allElements=parent.getElementsByTagName('*');for(var i=0,n=allElements.length;i<n;i++){if(allElements[i].getAttribute(attribute)!==null){matchingElements.push(allElements[i]);}}
return matchingElements;}
util.getProviderNameFromObject=function(arr){if(arr){if(typeof arr=='string')
return arr;else if(typeof arr=='object'&&arr.name)
return arr.name;else return "";}else{return "";}};util.containsProviderNameArray=function(arr,q){for(var j=0;j<arr.length;j++){if((typeof arr[j]=='string'&&arr[j].indexOf(q)!=-1)||(typeof arr[j]!='string'&&arr[j].name&&arr[j].name.indexOf(q)!=-1))return true;}
return false;};util.getResponsiveColumnClass=function(){var numberOfProviders=options.providers.top.length+1;if(options.isTotalShare)numberOfProviders++;var columnClass;columnClass="os-col-"+numberOfProviders;if(numberOfProviders>6){columnClass+=" os-responsive-icon-only";}
return columnClass;}
util.toggleElementDisplay=function(element){var displayValue=element.style.display;if(displayValue==="block"){element.style.display="none";}else if(displayValue==="none"||displayValue===""){element.style.display="block";}}
util.toggleElementDisplay=function(id,withOverlay,overlayId,childElement){var container=document;if(childElement){container=util.closestByClass(childElement,"share-container");}
var element=util.getElementInsideContainer(container,id);var displayValue=element.style.display;if(displayValue==="block"){var text=element.style.cssText||'';element.style.cssText=text+';display:none !important;';}else if(displayValue==="none"||displayValue===""){element.style.display="block";}
if(withOverlay){var element=util.getElementInsideContainer(container,overlayId);var displayValue=element.style.display;if(displayValue==="block"){var text=element.style.cssText||'';element.style.cssText=text+';display:none !important;';}else if(displayValue==="none"||displayValue===""){element.style.display="block";}}}
util.toggle_show=function appendStyle(id){var e=document.getElementById(id);e.style.display='block';};util.toggle_hide=function appendStyle(id){var e=document.getElementById(id);e.style.display='none';};util.toggle_visibility=function appendStyle(id){var e=document.getElementById(id);if(e.style.display=='block')e.style.display='none';else e.style.display='block';};var themeCssElement;util.addThemeCss=function(cssFilePath){var head=document.getElementsByTagName('head')[0];themeCssElement=document.createElement('link');themeCssElement.rel='stylesheet';themeCssElement.type='text/css';themeCssElement.href=cssFilePath;themeCssElement.media='all';head.appendChild(themeCssElement);}
util.getPos=function getPos(el){for(var lx=0,ly=0;el!=null;lx+=el.offsetLeft,ly+=el.offsetTop,el=el.offsetParent){}
return{x:lx,y:ly};};util.keysToLowerCase=function(obj){if(!typeof(obj)==="object"||typeof(obj)==="string"||typeof(obj)==="number"||typeof(obj)==="boolean"){return obj;}
var keys=Object.keys(obj);var n=keys.length;var lowKey;while(n--){var key=keys[n];if(key===(lowKey=key.toLowerCase()))
continue;obj[lowKey]=util.keysToLowerCase(obj[key]);delete obj[key];}
return(obj);}
util.getscreensize=function getscreensize(){var ly;var lx;if(typeof window.innerWidth!='undefined'){ly=window.innerWidth,lx=window.innerHeight}
else if(typeof document.documentElement!='undefined'&&typeof document.documentElement.clientWidth!='undefined'&&document.documentElement.clientWidth!=0){ly=document.documentElement.clientWidth,lx=document.documentElement.clientHeight}
else{ly=document.getElementsByTagName('body')[0].clientWidth,lx=document.getElementsByTagName('body')[0].clientHeight}
return{x:lx,y:ly};};var _private={};var moreTimeout;_private.setShareEvent=function(elem){var providerNodes=util.getAllElementsWithAttribute('data-provider',elem);for(var j=0;j<providerNodes.length;j++){util.addEvent('click',providerNodes[j],function(event){event=event||window.event;eventTarget=(event.target||event.srcElement);var providerName=eventTarget.getAttribute('data-provider');module.share(providerName,eventTarget);});}}
_private.setEvent=function(elem,handle,event){util.addEvent(event,elem,handle);}
_private.setClickEvent=function(){var closeButton=document.getElementById("os-share-even-close");var overlay=document.getElementById("os-share-overlay");var evenMoreBox=document.getElementById("os-share-even-more");var showEvenMore=document.getElementById("more-sharing-options");var showMore=document.getElementsByClassName("more")[0];var followingBar=document.getElementById("os-share-follow-bar");util.addEvent("click",overlay,function(){if(followingBar.style.display==="none"||followingBar.style.display===""){util.toggleElementDisplay(evenMoreBox);}else if(followingBar.style.display==="block"){followingBar.style.display="none";}
util.toggleElementDisplay(overlay);});}
_private.createFollowBar=function(provider,element,win){var shareFollowMappings={Facebook:"Facebook Like",GooglePlus:"Google+ Follow",Pinterest:"Pinterest Follow",Twitter:"Twitter Follow"}
var supportsFollowBar=false;for(name in shareFollowMappings){if(name===provider){supportsFollowBar=true;}}
if(options.isFollowBarEnabled&&supportsFollowBar){var providerFormatted=provider.toLowerCase();var overlayDiv=document.getElementById("os-share-overlay");document.getElementById("os-share-follow-bar").style.display="block";document.getElementById("os-share-even-more").style.display="none";if(overlayDiv.style.display===""||overlayDiv.style.display==="none"){overlayDiv.style.display="block";}
if(!options.isCounterWidgetTheme){options.widgets.top=[{name:shareFollowMappings[provider]}]}
renderedHtml=theme.renderSingleWidget(_private.getAllSelectedButtons(options.isHorizontalCounter,_private.widgetConfig),provider);module.injectInterface("#os-share-follow-content");}}
_private.setResponsiveClass=function(interfaceContainer){var width=interfaceContainer.parentNode.offsetWidth;var responsiveClass;if(width<835){interfaceContainer.className+=" os-responsive-icon-only "+util.getResponsiveColumnClass();}else{interfaceContainer.className+=" os-responsive "+util.getResponsiveColumnClass();}
window.addEventListener("resize",function(){width=interfaceContainer.parentNode.offsetWidth;if(width<835){if(util.arrayContains(interfaceContainer.classList,"os-responsive-icon-only")){return;}else{interfaceContainer.className+=" os-responsive-icon-only "+util.getResponsiveColumnClass();}}else{if(util.arrayContains(interfaceContainer.classList,"os-responsive")){return;}else{interfaceContainer.className+=" os-responsive "+util.getResponsiveColumnClass();}}},false);}
_private.extractCustomAttributes=function(elem){var tempElem=elem;while(true){tempElem=tempElem.parentNode;if(tempElem==document.body){break;}
if(tempElem.getAttribute('data-share-url')!=null||tempElem.getAttribute('data-share-title')!=null||tempElem.getAttribute('data-share-description')!=null||tempElem.getAttribute('data-share-imageurl')!=null||tempElem.getAttribute('data-share-twittermention')!=null||tempElem.getAttribute('data-share-isvideourl')!=null||tempElem.getAttribute('data-share-twitterhashtag')!=null){break;}}
var result={};if(tempElem.getAttribute('data-share-url')!=null)
result["url"]=tempElem.getAttribute('data-share-url');if(tempElem.getAttribute('data-share-title')!=null)
result["title"]=tempElem.getAttribute('data-share-title');if(tempElem.getAttribute('data-share-description')!=null)
result["description"]=tempElem.getAttribute('data-share-description');if(tempElem.getAttribute('data-share-imageurl')!=null)
result["imageUrl"]=tempElem.getAttribute('data-share-imageurl');if(tempElem.getAttribute('data-share-twittermention')!=null)
result["twittermention"]=tempElem.getAttribute('data-share-twittermention');if(tempElem.getAttribute('data-share-twitterhashtag')!=null)
result["twitterhashtags"]=tempElem.getAttribute('data-share-twitterhashtag');if(tempElem.getAttribute('data-share-isvideourl')!=null)
result["IsVideoUrl"]=tempElem.getAttribute('data-share-isvideourl');return result;}
_private.getPopupWindowSize=function(_default,providerwise,provider){if(providerwise.hasOwnProperty(provider.toLowerCase())){return providerwise[provider.toLowerCase()];}
return _default;}
_private.getAllButtonName=function(providerConfig){var arr=[];for(var provider in providerConfig){if(providerConfig.hasOwnProperty(provider)){for(var button in providerConfig[provider].buttons){if(providerConfig[provider].buttons.hasOwnProperty(button)){arr.push(providerConfig[provider].buttons[button].name);}}}}
return arr;}
_private.widgetConfig={facebook:{id:"facebook-jssdk",src:"https://connect.facebook.net/en_US/all.js#xfbml=1&appId=1783538088526692&version=v2.0",buttons:{like:{html:'<div class="fb-like fb-like-#layout#" data-send="false" data-layout="#layout#"  data-show-faces="false" data-href="#url#"></div>',name:'Facebook Like',version:'v1',type:'share'},recommend:{html:'<div class="fb-like" data-send="false" data-layout="#layout#"  data-show-faces="false" data-action="recommend"  data-href="#url#"></div>',name:'Facebook Recommend',version:'v1',type:'share'},send:{html:'<div class="fb-send fb_edge_widget_with_comment fb_iframe_widget"  data-href="#url#" callback="facebooksendcallback" ></div>',name:'Facebook Send',version:'v1',type:'share'},share:{html:'<div class="fb-share-button" data-href="#url#" data-layout="#layout#"></div>',name:'Facebook Share',version:'v2',type:'share'},follow:{html:'<div class="fb-follow" data-href="#url#" data-colorscheme="light" data-layout="#layout#" data-show-faces="false"></div>',name:'Facebook Follow',version:'v2',type:'follow'}},layouts:{horizontal:"button_count",verticle:"box_count"}},twitter:{id:"twitter-wjs",src:"https://platform.twitter.com/widgets.js",buttons:{share:{html:'<a href="#url#" class="twitter-share-button"  data-url="#url#" data-show-count="true" data-count="#layout#">Tweet</a>',name:'Twitter Tweet',version:'v1',type:'share'},follow:{html:'<a href="#url#" class="twitter-follow-button" data-show-count="true" data-show-screen-name="true"></a>',name:'Twitter Follow',version:'v2',type:'follow'},hashtag:{html:'<a href="https://twitter.com/intent/tweet?button_hashtag=#url#" class="twitter-hashtag-button">Tweet ##url#</a>',name:'Twitter Hashtag',version:'v2',type:'share'},mention:{html:'<a href="https://twitter.com/intent/tweet?screen_name=#url#" class="twitter-mention-button">Tweet to @#url#</a>',name:'Twitter Mention',version:'v2',type:'share'}},layouts:{horizontal:"horizontal",verticle:"vertical"}},pinterest:{id:"pinterest-wjs",src:"https://assets.pinterest.com/js/pinit.js",buttons:{share:{html:'<div id="pinterestId"> <a data-pin-count="#layout#" href="https://pinterest.com/pin/create/button/?#url#"  data-pin-do="buttonPin"   data-pin-color="white"  ><img src="https://assets.pinterest.com/images/pidgets/pin_it_button.png" /></a> </div>',name:'Pinterest Pin it',version:'v1',type:'share'},follow:{html:'<a data-pin-do="buttonFollow" href="#url#">Pinterest</a>',name:'Pinterest Follow',version:'v2',type:'follow'}},layouts:{horizontal:"beside",verticle:"above"}},linkedin:{id:"linkedin-wjs",src:"https://platform.linkedin.com/in.js",buttons:{share:{html:'<script type="IN/Share" data-counter="#layout#" data-url="#url#" data-onSuccess="tracklinkedin"></script>',name:'LinkedIn Share',version:'v1',type:'share'},follow:{html:'<script type="IN/FollowCompany" data-counter="#layout#" data-id="#url#"></script>',name:'LinkedIn Follow',version:'v2',type:'follow'}},layouts:{horizontal:"right",verticle:"top"}},stumbleupon:{id:"stumbleupon-wjs",src:"https://platform.stumbleupon.com/1/widgets.js",buttons:{share:{html:'<su:badge layout="#layout#" location="#url#"></su:badge>',name:'StumbleUpon Badge',version:'v1',type:'share'}},layouts:{horizontal:"1",verticle:"5"}},reddit:{buttons:{share:{html:'<iframe src="https://redditstatic.s3.amazonaws.com/button/button#layout# scrolling="no" frameborder="0" class="reddit_width" style="float:none;"></iframe>',name:'Reddit',version:'v1',type:'share'}},layouts:{horizontal:'1.html?width=120&url=#url#&newwindow=1" height="22" width="120" align="left"',verticle:'2.html?width=51&url=#url#&newwindow=1" height="69" width="51"'}},google:{id:"google-plusone",src:"https://apis.google.com/js/platform.js",buttons:{plusone:{html:'<div class="g-plusone"  style="width: 50px ! important; height: 25px ! important; vertical-align: bottom ! important;"  data-size="#layout#" data-callback="trackgoogle" data-href="#url#"></div>',name:'Google+ +1',version:'v1',type:'share'},share:{html:'<div class="g-plus" data-action="share"  data-annotation="#layout#" data-href="#url#" data-callback="trackgoogle" ></div>',name:'Google+ Share',version:'v1',type:'share'},follow:{html:'<div class="g-follow" data-annotation="#layout#" data-height="20" data-href="#url#" data-rel="publisher"></div>',name:'Google+ Follow',version:'v2',type:'follow'}},layouts:{horizontal:"medium",verticle:"tall",sharehorizontal:"bubble",shareverticle:"vertical-bubble"}},youtube:{id:"youtube subscribe",src:"https://apis.google.com/js/platform.js",buttons:{subscribe:{html:'<div class="g-ytsubscribe" data-channel="#url#" data-layout="default" data-count="default"></div>',name:'Youtube Subscribe',version:'v2',type:'follow'}},layouts:{horizontal:"default"}},tumblr:{id:"tumblr post",src:"https://secure.assets.tumblr.com/share-button.js",buttons:{subscribe:{html:'<a class="tumblr-share-button" data-color="blue" data-notes="#layout#" href="#url#" data-href="#url#"></a>',name:'Tumblr Post',version:'v2',type:'share'}},layouts:{horizontal:"right",verticle:"top"}},foursquare:{id:"foursquare follow",src:"https://platform.foursquare.com/js/widgets.js",buttons:{follow:{html:'<a href="https://foursquare.com/user/#url#" class="fourSq-widget" data-type="follow" data-fuid="#url#">Follow us on Foursquare</a>',name:'Foursquare Follow',version:'v2',type:'follow'}},layouts:{horizontal:"default"}},vkontakte:{id:"Vk widgets",src:"http://vkontakte.ru/js/api/share.js?9",buttons:{share:{html:'<div id="vk_share_button" class="vksharebtn" >#content#</div>',name:'Vkontakte Share',version:'v2',type:'share'}},layouts:{horizontal:"default"}},xing:{src:"https://www.xing-share.com/js/external/share.js",buttons:{share:{html:'<div style="#xingbtnsize#"><div data-type="XING/Share" data-counter="#layout#"  data-url="#url#"></div></div>',name:'Xing Share',version:'v2',type:'share'}},layouts:{horizontal:"right",verticle:"top"}},hybridshare:{id:"hybridshare-wjs",buttons:{share:{html:'<div class="lrshare_hybrid_share" ></div>',name:'Hybridshare',version:'v1',type:'share'}},layouts:{horizontal:"horizontal",verticle:"vertical"}}};_private.getProviderUrl=function(name){for(var index in options.widgets.top){if(options.widgets.top[index].name&&options.widgets.top[index].name==name){return options.widgets.top[index].url;;}}}
_private.getProvidersArray=function(){var providers=[];for(var i in options.providers.top){if(typeof options.providers.top[i]=='string'){providers.push(options.providers.top[i]);}else{if(options.providers.top[i].name){providers.push(options.providers.top[i].name);}}}
return providers;}
_private.getProviderContent=function(provider,allProviders){for(var i in allProviders){if(allProviders[i]==provider||allProviders[i].name==provider){if(typeof allProviders[i]=='string'){return{};}else{return allProviders[i];}}}
return{};}
_private.widgetScriptLoad=function(d,s,id,p,handler){if(p){var js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src=p;fjs.parentNode.insertBefore(js,fjs);handler(0);}}
_private.getAllSelectedButtons=function(isHorizontal,providerConfig){var buttons=[];var layout;for(var provider in providerConfig){if(providerConfig.hasOwnProperty(provider)){for(var button in providerConfig[provider].buttons){if(providerConfig[provider].buttons.hasOwnProperty(button)){if(util.containsProviderNameArray(options.widgets.top,providerConfig[provider].buttons[button].name)){if(providerConfig[provider].buttons[button].name==providerConfig.google.buttons.share.name||providerConfig[provider].buttons[button].name==providerConfig.google.buttons.follow.name){layout=isHorizontal?providerConfig[provider].layouts.sharehorizontal:providerConfig[provider].layouts.shareverticle;}else{layout=isHorizontal?providerConfig[provider].layouts.horizontal:providerConfig[provider].layouts.verticle;}
if(providerConfig[provider].buttons[button].name==providerConfig.xing.buttons.share.name){if(isHorizontal){providerConfig[provider].buttons[button].html1=providerConfig[provider].buttons[button].html.replace('#xingbtnsize#','width:90px !important');}else{providerConfig[provider].buttons[button].html=providerConfig[provider].buttons[button].html.replace('#xingbtnsize#','width:60px !important');}}
var customUrl=_private.getProviderUrl(providerConfig[provider].buttons[button].name);if(customUrl){providerConfig[provider].buttons[button].html=providerConfig[provider].buttons[button].html.replace(/\#url#/g,customUrl);}
buttons.push({name:providerConfig[provider].buttons[button].name,html:providerConfig[provider].buttons[button].html.replace(/\#layout#/g,layout).replace(/\#apikey#/g,options.serviceProviderKey).replace(/\#scounttype#/g,'url')});if(providerConfig[provider].src){if(providerConfig[provider].buttons[button].name==providerConfig.vkontakte.buttons.share.name){_private.widgetScriptLoad(document,'script',providerConfig[provider].id,providerConfig[provider].src,function(d){setTimeout(function(){document.getElementById('vk_share_button').innerHTML=VK.Share.button(window.location.href,{type:'button'});},1000);});}else{_private.widgetScriptLoad(document,'script',providerConfig[provider].id,providerConfig[provider].src,function(d){});}}}}}}}
var buttons1=[];for(var j=0,jLen=options.widgets.top.length;j<jLen;j++){for(var i=0,iLen=buttons.length;i<iLen;i++){if(buttons[i].name==util.getProviderNameFromObject(options.widgets.top[j])){buttons1.push(buttons[i].html);break;}}}
return buttons1;}
_private.setUrlForWidgets=function(elem,renderedHtml){var customShareParameters=_private.extractCustomAttributes(elem);renderedHtml=renderedHtml.replace(/\#url#/g,(customShareParameters.url||options.url));return renderedHtml;}
var module=this;var options={isMorePopup:true,isEvenMorePopup:true,facebookPrivacyShare:false,protocolNeutral:false,serviceProviderKey:'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',countQuery:'url',emailMessage:'Hey! Here\'s some great content to read.',emailSubject:'A URL shared with you!',isEmailContentReadOnly:false,isGoogleAnalyticsEnabled:false,isFollowBarEnabled:false,isCounterWidgetTheme:0,widgetIconSize:'32',widgetStyle:"square",isHorizontalCounter:0,isHorizontalLayout:0,theme:'OpenSocialShareDefaultTheme',isShortenUrl:true,providers:{top:["Facebook","Twitter","LinkedIn","GooglePlus","Pinterest","Email","Print"]},supportedProviders:{all:["Facebook","Pinterest","BarraPunto","Blogmarks","Delicious","Digg","Diigo","Email","Google","GooglePlus","HackerNews","Haohao","LinkArena","LinkedIn","Linkter","Meneame","Muti","MyShare","Netvibes","NewsVine","Netvouz","NuJIJ","PDF","Reddit","Segnalo","StumbleUpon","ThisNext","Tumblr","Twitter","Vkontakte","Whatsapp","Wykop","Xerpi","Diggita","MySpace"],more:["Facebook","GooglePlus","LinkedIn","Twitter","Pinterest","Email","Google","Digg","Reddit","Vkontakte","Tumblr","Delicious"]},providerSpecificShortUrl:[{"pinterest":false},{"digg":false}],widgets:{all:_private.getAllButtonName(_private.widgetConfig),top:["Facebook Like","Facebook Send","Facebook Recommend","Twitter Tweet","Google+ +1","Google+ Share","Pinterest Pin it","LinkedIn Share","Reddit","StumbleUpon Badge","Tumblr Post"]},url:window.location.href,title:util.getMetaContent('og:title','property')||document.title,description:util.getMetaContent('og:description','property')||util.getMetaContent("description"),imageUrl:'',facebookAppId:adminSettings.facebookappid,facebookCallbackUrl:'http://'+adminSettings.domain+'/share/finish',isTotalShare:true,isOpenSingleWindow:true,isTrackReferralsEnabled:true,trackingParameter:"lrstc",twittermention:'',twitterhashtag:'',twitterrelated:'',customShortner:false,isMobileFriendly:false,popupWindowSize:{height:530,width:530},popupWindowSizeProviderWise:'',onShare:function(provider,element,win){_private.createFollowBar(provider,element,win)},getIsShortUrl:function(provider){if(provider)
provider=provider.toLowerCase();for(var o=0;o<this.providerSpecificShortUrl.length;o++){this.providerSpecificShortUrl[o]=util.keysToLowerCase(this.providerSpecificShortUrl[o]);if(this.providerSpecificShortUrl[o].hasOwnProperty(provider)){return this.providerSpecificShortUrl[o][provider];}}
return this.isShortenUrl;}};var intervalmorehide;this.global.showMore=function(that,popupContainer){var osMore=document.getElementById(popupContainer);var pos=util.getPos(that);var sy=window.screen.availHeight;var sx=window.screen.availWidth;var y=that.offsetHeight+pos.y+5;var x=pos.x;x=x+288>=sx?x=pos.x-210-10:x;y=y+288>=sy?y=pos.y-288+10:y;if(osMore.style.setProperty){osMore.style.setProperty("position","absolute","important");osMore.style.setProperty("visibility","visible");osMore.style.setProperty("opacity","1");}else if(osMore.style.setAttribute){osMore.style.setAttribute("position","absolute !important");osMore.style.setAttribute("visibility","visible");osMore.style.setAttribute("opacity","1");}
osMore.style.display='block';osMore.style.left=x+"px";osMore.style.top=y+"px";clearTimeout(intervalmorehide);util.addEvent('mouseout',that,function(){});util.addEvent('mouseout',osMore,function(){setMoreHideTimeout(osMore);});util.addEvent('mouseover',osMore,function(){clearTimeout(intervalmorehide);});}
function osHideMore(widget){if(widget.style.setProperty){widget.style.setProperty("position","absolute","important");widget.style.setProperty("visibility","hidden");widget.style.setProperty("opacity","1");}else if(osMore.style.setAttribute){widget.style.setAttribute("visibility","hidden");widget.style.setAttribute("opacity","0");}
widget.style.display='none';}
function setMoreHideTimeout(elem){intervalmorehide=setTimeout(osHideMore(elem),10000);}
var theme=window[options.theme];var renderedHtml=module.init=function(inputOptions){module.trackReferral();options=util.extend(options,inputOptions);theme.isMorePopup=options.isMorePopup;theme.isEvenMorePopup=options.isEvenMorePopup;util.addThemeCss(theme.cssFilePath);options.providers.top=util.getOnlyValidProviders(options.supportedProviders.all,options.providers.top);if(options.isCounterWidgetTheme){if(options.isHorizontalCounter){if(options.isHorizontalLayout){renderedHtml=theme.renderHorizontalSideCounter(_private.getAllSelectedButtons(options.isHorizontalCounter,_private.widgetConfig),options.supportedProviders.more,options.supportedProviders.all,util.getThisObjectName());}else{renderedHtml=theme.renderVerticalSideCounter(_private.getAllSelectedButtons(options.isHorizontalCounter,_private.widgetConfig),options.supportedProviders.more,options.supportedProviders.all,util.getThisObjectName());}}else{if(options.isHorizontalLayout){renderedHtml=theme.renderHorizontalTopCounter(_private.getAllSelectedButtons(options.isHorizontalCounter,_private.widgetConfig),options.supportedProviders.more,options.supportedProviders.all,util.getThisObjectName());}else{renderedHtml=theme.renderVerticalTopCounter(_private.getAllSelectedButtons(options.isHorizontalCounter,_private.widgetConfig),options.supportedProviders.more,options.supportedProviders.all,util.getThisObjectName());}}}else{if(util.isMobile&&options.isMobileFriendly){renderedHtml=theme.renderMobileInterface(options.providers.top,options.supportedProviders.more,options.supportedProviders.all,util.getThisObjectName(),options.isTotalShare);}else{renderedHtml=theme.renderInterface(options.providers.top,options.supportedProviders.more,options.supportedProviders.all,util.getThisObjectName(),options.isTotalShare,options.widgetStyle);}}}
module.setWidgetTheme=function(selector,style){if(selector.indexOf('.')==0){var elems=document.getElementsByClassName(selector.replace('.',''));if(elems&&elems.length>0){for(var i=0;i<elems.length;i++){module.setThemeOnWidgetContainer(elems[i],style);}}}else if(selector.indexOf('#')==0){var elem=document.getElementById(selector.replace('#',''));if(elem){module.setThemeOnWidgetContainer(elem,style);}}}
module.setThemeOnWidgetContainer=function(widget){widget.className+=" "+"share-container";if(!util.isMobile){var whatsappContainer=widget.querySelectorAll("[data-provider='Whatsapp'],[data-provider='whatsapp'],[data-provider='WhatsApp'],[data-provider='WHATSAPP'],[data-provider='whatsApp']");if(whatsappContainer&&whatsappContainer.length>0){for(var i=0;i<whatsappContainer.length;i++){whatsappContainer[i].style.display="none";}}}
if(!options.isCounterWidgetTheme){var widgetLinks=widget.getElementsByTagName("a");var widgetClassList="share-provider";switch(options.widgetStyle){case "square":widgetClassList+=" "+"flat square";break;case "responsive":widgetClassList+=" "+"flat responsive";_private.setResponsiveClass(widget);break;case "image":widgetClassList+=" "+"os-image";widget.className+=" "+"share-bar";break;}
if(options.widgetStyle==="square"){options.widgetIconSize==="16"?widgetClassList+=" size-16":widgetClassList+=" size-32";options.isHorizontalLayout===0?widgetClassList+=" vertical":widgetClassList+=" horizontal";}else if(options.widgetStyle==="responsive"){options.isHorizontalLayout===0?widgetClassList+=" vertical":widgetClassList+=" horizontal";}else if(options.widgetStyle==="image"){options.widgetIconSize==="16"?widgetClassList+=" size-16":widgetClassList+=" size-32";}
for(var i=0;i<options.providers.top.length+1;i++){if(widgetLinks[i]){widgetLinks[i].className+=" "+widgetClassList;}}
module.setTotalShareCount(widget);}else{module.setTotalShareCount(widget);}}
module.injectInterface=function(selector){if(selector.indexOf('.')==0){var elems=document.getElementsByClassName(selector.replace('.',''));if(elems&&elems.length>0){for(var i=0;i<elems.length;i++){elems[i].innerHTML=_private.setUrlForWidgets(elems[i],renderedHtml);_private.setShareEvent(elems[i]);if(util.isMobile&&options.isMobileFriendly){break;}}}}else if(selector.indexOf('#')==0){var elem=document.getElementById(selector.replace('#',''));if(elem){elem.innerHTML=_private.setUrlForWidgets(elem,renderedHtml);_private.setShareEvent(elem);}}}
module.showImagePopup=function(elem){elem.style.display='block';}
module.hideImagePopup=function(elem){elem.style.display='none';}
module.createImagesPopup=function(renderPopupTemplate){var imagesfrompage=document.createElement("div");imagesfrompage.className="osshare_imagepoup";imagesfrompage.style.display='none';imagesfrompage.innerHTML='';imagesfrompage.innerHTML=renderPopupTemplate;document.body.appendChild(imagesfrompage);_private.setShareEvent(imagesfrompage);var elems=document.getElementsByClassName('osshare_close_imageshare');if(elems&&elems.length>0){for(var i=0;i<=elems.length;i++){if(elems[i]){_private.setEvent(elems[i],function(event){module.hideImagePopup(imagesfrompage)},'click');}}}
imagePopupdiv=imagesfrompage;}
module.share=function(provider,elem){if(provider.toLowerCase()=='print'){window.print();}else if(provider.toLowerCase()=='pinterest'){if(imagePopupdiv==''){var template=theme.renderAllImageinPopup();module.createImagesPopup(template);module.showImagePopup(imagePopupdiv);}else{module.showImagePopup(imagePopupdiv);}}else{var url="//"+constants.domain+"/share/"+options.serviceProviderKey+"?";if(provider.indexOf("media")>-1){url=url+provider+"&";module.hideImagePopup(imagePopupdiv);provider="Pinterest";}
var providerContent=_private.getProviderContent(provider,options.providers.top);if(adminSettings.BrandName.toLowerCase()==="social9"&&provider.toLowerCase()==="email"){provider="email2";}
if(options.facebookPrivacyShare){options.facebookAppId='';}
var shareParameters={"IsVideoUrl":"false","providerId":provider.toLowerCase(),"url":providerContent.url||options.url,"countType":options.countQuery,"title":providerContent.title||options.title,"description":providerContent.description||options.description,"facebookAppId":options.facebookAppId,"redirectUri":options.facebookCallbackUrl,"t":document.title,"imageUrl":providerContent.imageUrl||options.imageUrl,"emailMessage":options.emailMessage,"emailSubject":options.emailSubject,"isEmailContentReadOnly":options.isEmailContentReadOnly,"isFullUrl":providerContent.isFullUrl||!options.getIsShortUrl(provider),"isTrackReferralsEnabled":options.isTrackReferralsEnabled,"IsCustomShortner":options.customShortner,"twittermention":options.twittermention,"twitterhashtags":options.twitterhashtag,"twitterrelated":options.twitterrelated,"trackingParameter":"lrstc","client":"web"};if(window.localStorage&&localStorage.getItem("__lsuid")){shareParameters.gaugeId=localStorage.getItem("__lsuid");}
var customShareParameters=_private.extractCustomAttributes(elem);util.extend(shareParameters,customShareParameters);shareParameters.description=shareParameters.description.substring(0,2000);var popupWindowSize=_private.getPopupWindowSize(options.popupWindowSize,options.popupWindowSizeProviderWise,provider);if(provider.toLowerCase()=='whatsapp'){window.location.href="whatsapp://send?text="+shareParameters.title+" "+shareParameters.url}else{var win=util.openWindow(url+util.serialize(shareParameters),options.isOpenSingleWindow,popupWindowSize);}
options.onShare(provider,elem,win);}}
module.getCount=function(url,func){util.jsonpGet('//'+constants.domain+'/apidata/'+options.serviceProviderKey+'?url='+url+'&counttype='+options.countQuery+'&protocolNeutral='+options.protocolNeutral,func);}
module.setTotalShareCount=function(widget){if(options.isTotalShare){container=options.totalShareContainer||'.os-share-count';var _totalShare=0;try{var countUrl=options.url;if(widget.getAttribute('data-share-url')!=null){countUrl=widget.getAttribute('data-share-url');}
module.getCount(countUrl,function(data){_totalShare=data[0].loginradiussharecount;if(container.indexOf('.')==0){var elems=widget.getElementsByClassName(container.replace('.',''));if(elems&&elems.length>0){for(var i=0;i<elems.length;i++){elems[i].textContent=_totalShare;}}}else if(container.indexOf('#')==0){var elem=widget.getElementById(container.replace('#',''));if(elem){elem.textContent=_totalShare;}}})}catch(err){console.log(err);};}}
function getParameterByName(name){name=name.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var regex=new RegExp("[\\?&]"+name+"=([^&#]*)"),results=regex.exec(location.search);return results==null?"":decodeURIComponent(results[1].replace(/\+/g," ").replace("/",""));}
module.trackReferral=function(trackUrlId,trackReferralId){if(options.isTrackReferralsEnabled){if(trackUrlId==null)
trackUrlId=window.location.href;if(trackReferralId==null)
trackReferralId=getParameterByName(options.trackingParameter);if(trackReferralId!=null&&trackReferralId!=""){var parametersProcedding=window.location.href.substring(window.location.href.indexOf(options.trackingParameter+"="));if(parametersProcedding.indexOf("&")>0)
trackUrlId=trackUrlId.replace(window.location.href.substring(window.location.href.indexOf(parametersProcedding),window.location.href.indexOf(parametersProcedding)+parametersProcedding.indexOf("&")+1),"");else if(window.location.search!="?"+parametersProcedding){trackUrlId=trackUrlId.replace("&"+parametersProcedding,"");}
else
trackUrlId=window.location.protocol+'//'+window.location.host+window.location.pathname;window.history.replaceState({},null,trackUrlId);options.url=encodeURIComponent(trackUrlId);util.jsonpGet('//'+constants.domain+'/Refferal/'+encodeURIComponent(trackReferralId.trim())+'/',function(refdata){});}}}
return module;};/*!Sizzle v2.0.1-pre | (c) 2008, 2014 jQuery Foundation, Inc. | jquery.org/license*/!function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+-new Date,v=a.document,w=0,x=0,y=fb(),z=fb(),A=fb(),B=function(a,b){return a===b&&(l=!0),0},C="undefined",D=1<<31,E={}.hasOwnProperty,F=[],G=F.pop,H=F.push,I=F.push,J=F.slice,K=F.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},L="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",M="[\\x20\\t\\r\\n\\f]",N="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",O="\\["+M+"*("+N+")(?:"+M+"*([*^$|!~]?=)"+M+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+M+"*\\]",P=":("+N+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp("^"+M+"+|((?:^|[^\\\\])(?:\\\\.)*)"+M+"+$","g"),R=new RegExp("^"+M+"*,"+M+"*"),S=new RegExp("^"+M+"*([>+~]|"+M+")"+M+"*"),T=new RegExp("="+M+"*([^\\]'\"]*?)"+M+"*\\]","g"),U=new RegExp(P),V=new RegExp("^"+N+"$"),W={ID:new RegExp("^#("+N+")"),CLASS:new RegExp("^\\.("+N+")"),TAG:new RegExp("^("+N+"|[*])"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+M+"*(even|odd|(([+-]|)(\\d*)n|)"+M+"*(?:([+-]|)"+M+"*(\\d+)|))"+M+"*\\)|)","i"),bool:new RegExp("^(?:"+L+")$","i"),needsContext:new RegExp("^"+M+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+M+"*((?:-\\d)?\\d*)"+M+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,ab=/'|\\/g,bb=new RegExp("\\\\([\\da-f]{1,6}"+M+"?|("+M+")|.)","ig"),cb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{I.apply(F=J.call(v.childNodes),v.childNodes),F[v.childNodes.length].nodeType}catch(db){I={apply:F.length?function(a,b){H.apply(a,J.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function eb(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],!a||"string"!=typeof a)return d;if(1!==(k=b.nodeType)&&9!==k)return[];if(p&&!e){if(f=$.exec(a))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return I.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return I.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=9===k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ab,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+pb(o[l]);w=_.test(a)&&nb(b.parentNode)||b,x=o.join(",")}if(x)try{return I.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function fb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function gb(a){return a[u]=!0,a}function hb(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ib(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function jb(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||D)-(~a.sourceIndex||D);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return "input"===c&&b.type===a}}function lb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function mb(a){return gb(function(b){return b=+b,gb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function nb(a){return a&&typeof a.getElementsByTagName!==C&&a}c=eb.support={},f=eb.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=eb.setDocument=function(a){var b,e=a?a.ownerDocument||a:v,g=e.defaultView;return e!==n&&9===e.nodeType&&e.documentElement?(n=e,o=e.documentElement,p=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){m()},!1):g.attachEvent&&g.attachEvent("onunload",function(){m()})),c.attributes=hb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=hb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(e.getElementsByClassName),c.getById=hb(function(a){return o.appendChild(a).id=u,!e.getElementsByName||!e.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==C&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(bb,cb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(bb,cb);return function(a){var c=typeof a.getAttributeNode!==C&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==C?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(e.querySelectorAll))&&(hb(function(a){a.innerHTML="<select msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+M+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+M+"*(?:value|"+L+")"),a.querySelectorAll(":checked").length||q.push(":checked")}),hb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+M+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&hb(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===v&&t(v,a)?-1:b===e||b.ownerDocument===v&&t(v,b)?1:k?K.call(k,a)-K.call(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],i=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:k?K.call(k,a)-K.call(k,b):0;if(f===g)return jb(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?jb(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},e):n},eb.matches=function(a,b){return eb(a,null,null,b)},eb.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return eb(b,n,null,[a]).length>0},eb.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},eb.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&E.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},eb.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},eb.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=eb.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=eb.selectors={cacheLength:50,createPseudo:gb,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(bb,cb),a[3]=(a[3]||a[4]||a[5]||"").replace(bb,cb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||eb.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&eb.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(bb,cb).toLowerCase();return "*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+M+")"+a+"("+M+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==C&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=eb.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||eb.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?gb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=K.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:gb(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?gb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:gb(function(a){return function(b){return eb(a,b).length>0}}),contains:gb(function(a){return a=a.replace(bb,cb),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:gb(function(a){return V.test(a||"")||eb.error("unsupported lang: "+a),a=a.replace(bb,cb).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return "input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return "input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return "input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:mb(function(){return[0]}),last:mb(function(a,b){return[b-1]}),eq:mb(function(a,b,c){return[0>c?c+b:c]}),even:mb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:mb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:mb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:mb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=kb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=lb(b);function ob(){}ob.prototype=d.filters=d.pseudos,d.setFilters=new ob,g=eb.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=R.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?eb.error(a):z(a,i).slice(0)};function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c){for(var d=0,e=b.length;e>d;d++)eb(a,b[d],c);return c}function tb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function ub(a,b,c,d,e,f){return d&&!d[u]&&(d=ub(d)),e&&!e[u]&&(e=ub(e,f)),gb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||sb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:tb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=tb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?K.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=tb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):I.apply(g,r)})}function vb(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=qb(function(a){return a===b},h,!0),l=qb(function(a){return K.call(b,a)>-1},h,!0),m=[function(a,c,d){return!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>i;i++)if(c=d.relative[a[i].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return ub(i>1&&rb(m),i>1&&pb(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&vb(a.slice(i,e)),f>e&&vb(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function wb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=G.call(i));s=tb(s)}I.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&eb.uniqueSort(i)}return k&&(w=v,j=t),r};return c?gb(f):f}h=eb.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=vb(b[c]),f[u]?d.push(f):e.push(f);f=A(a,wb(e,d)),f.selector=a}return f},i=eb.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(bb,cb),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(bb,cb),_.test(j[0].type)&&nb(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&pb(j),!a)return I.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,_.test(a)&&nb(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=hb(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),hb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ib("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&hb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ib("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),hb(function(a){return null==a.getAttribute("disabled")})||ib(L,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),"function"==typeof define&&define.amd?define(function(){return eb}):"undefined"!=typeof module&&module.exports?module.exports=eb:a.Sizzle=eb}(window);/*!elementQuery | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT*/(function(n,t,i){"use strict";var o=n.Sizzle||jQuery.find,r={},u=null,v=function(){t.styleSheets[0]&&(u=t.styleSheets[0].cssRules!==i?"cssRules":"rules")},s=function(n,t,u,f,s){if(n=e(n),n!=""){var h;f||s||(h=/^([0-9]*.?[0-9]+)(px|em)$/.exec(u),h!=null&&(f=Number(h[1]),f+""!="NaN"&&(s=h[2]))),s&&(o.compile&&o.compile(n),r[n]===i&&(r[n]={}),r[n][t]===i&&(r[n][t]={}),r[n][t][u]=[f,s])}},y=function(n,t){var i,r,u;for(i in n)for(r in n[i])if(typeof n[i][r]=="string")s(i,r,n[i][r]);else if(typeof n[i][r]=="object")for(u=0;u<n[i][r].length;u++)s(i,r,n[i][r][u]);t==!0&&f()},c=function(n){if(n)for(var a=/(\[(min\-width|max\-width|min\-height|max\-height)\~\=(\'|\")([0-9]*.?[0-9]+)(px|em)(\'|\")\])(\[(min\-width|max\-width|min\-height|max\-height)\~\=(\'|\")([0-9]*.?[0-9]+)(px|em)(\'|\")\])?/gi,e=n.split(","),u,t,h,c,l,r,o,f=0;f<e.length;f++)for(u=null,c=0,l=0;l==0||t!=null;)t=a.exec(e[f]),t!=null&&(h=Number(t[4]),h+""!="NaN"&&(u==null&&(u=e[f].substring(c,t.index),r=e[f].substring(t.index+t[1].length),r.length>0&&(o=r.indexOf(" "),o!=0&&(o>0&&(r=r.substring(0,o)),r=r.replace(/(\[(min\-width|max\-width|min\-height|max\-height)\~\=(\'|\")([0-9]*.?[0-9]+)(px|em)(\'|\")\])/gi,""),u+=r))),s(u,t[2],t[4]+t[5],h,t[5])),t[7]===i||t[7]==""?(c=t.index+t[1].length,u=null):a.lastIndex=t.index+t[1].length),l++},l=function(n,t){var r,f,e,i;try{n[u].length}catch(n){return}if(u==null&&v(),n[u]&&n[u].length>0&&(r=n.ownerNode||n.owningElement,t||r.getAttribute("data-elementquery-bypass")===null&&r.getAttribute("data-elementquery-processed")===null)){for(f=0;f<n[u].length;f++)if(i=n[u][f],i[u]&&i[u].length>0)for(e=0;e<i[u].length;e++)c(i[u][e].selectorText);else c(i.selectorText);r.setAttribute("data-elementquery-processed","")}},e=function(n){if(n==null)return "";var t="".trim;return t&&!t.call("﻿ ")?t.call(n):(n+"").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},a=function(n,t){var i=n.getAttribute(t);return i?(" "+i+" ").replace(/[\t\r\n]/g," "):" "},p=function(n,t,i){var r,u;n.nodeType===1&&(r=e(i),r!=""&&(u=a(n,t),u.indexOf(" "+r+" ")<0&&n.setAttribute(t,e(u+r))))},w=function(n,t,i){var u,r,f;if(n.nodeType===1&&(u=e(i),u!="")){for(r=a(n,t),f=!1;r.indexOf(" "+u+" ")>=0;)r=r.replace(" "+u+" "," "),f=!0;f&&n.setAttribute(t,e(r))}},h=function(){for(var n=0;n<t.styleSheets.length;n++)l(t.styleSheets[n]);f()},f=function(){var e,h,i,s,c,u,f,l;for(e in r)if(c=o(e),c.length>0)for(h=0;h<c.length;h++){u=c[h];for(i in r[e])for(s in r[e][i])f=r[e][i][s][0],r[e][i][s][1]=="em"&&(f=f*(n.getEmPixels?getEmPixels(u):16)),i=="min-width"&&u.offsetWidth>=f||i=="max-width"&&u.offsetWidth<=f||i=="min-height"&&u.offsetHeight>=f||i=="max-height"&&u.offsetHeight<=f?p(u,i,s):w(u,i,s)}!n.addEventListener&&n.attachEvent&&(l=t.documentElement.className,t.documentElement.className=" "+l,t.documentElement.className=l)};n.elementQuery=function(n,t){n&&typeof n=="object"?n.cssRules||n.rules?(l(n,!0),t==!0&&f()):y(n,t):n||t||f()},n.elementQuery.selectors=function(){var t={},n,u,f;for(n in r)for(u in r[n])for(f in r[n][u])t[n]===i&&(t[n]={}),t[n][u]===i&&(t[n][u]=[]),t[n][u][t[n][u].length]=f;return t},n.addEventListener?(n.addEventListener("resize",f,!1),n.addEventListener("DOMContentLoaded",h,!1),n.addEventListener("load",h,!1)):n.attachEvent&&(n.attachEvent("onresize",f),n.attachEvent("onload",h))})(this,document,undefined);/*!getEmPixels | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT*/(function(n,t){"use strict";var i="!important;",r="position:absolute"+i+"visibility:hidden"+i+"width:1em"+i+"font-size:1em"+i+"padding:0"+i;window.getEmPixels=function(u){var f,e,o;return u||(u=f=n.createElement("body"),f.style.cssText="font-size:1em"+i,t.insertBefore(f,n.body)),e=n.createElement("i"),e.style.cssText=r,u.appendChild(e),o=e.clientWidth,f?t.removeChild(f):u.removeChild(e),o}})(document,document.documentElement);elementQuery({".os-responsive":{"max-width":["125px"]}});;
var OpenSocialShareDefaultTheme=(function(){var adminSettings={altLogo:"Social9",domain:"http://www.social9.com",poweredByImageUrl:"sharecdn.social9.com/v2/images/poweredby-social9.png"};var theme={};theme.isMorePopup=true;theme.isEvenMorePopup=true;theme.isHorizontalCounter=0;theme.isHorizontalLayout=1;theme.cssFilePath="";theme.renderInterface=function(providers,providersMore,providersAll,objectName,isTotalShare,widgetStyle){var template='';var providersNames=[];template+="<div id='os-share-overlay'></div><div id='os-share-follow-bar'><div class='os-share-header'><h3>Follow us on social media!</h3></div><div id='os-share-follow-content'></div></div>";if(widgetStyle!="image"){for(var i=0;i<providers.length;i++){if(typeof providers[i]==="object"){providersNames.push(providers[i].name);}else{providersNames.push(providers[i]);}
template+="<a class='"+providersNames[i].toLowerCase()+"' data-provider='"+providersNames[i]+"' title='"+providersNames[i]+"''></a>";}}
if(theme.isMorePopup||theme.isEvenMorePopup){if(widgetStyle==="responsive"){template+="<div style=\"display: inline !important;width:100%;position:relative;\">";}else{template+="<div style=\"display: inline-block;position:relative;\">";}
template+="<a class='more' title='More Sharing Options' "+(theme.isEvenMorePopup?"onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);":"")+" ></a>";if(theme.isMorePopup){template+="<div id='os-share-more'>";for(var i=0;i<providersMore.length;i++){template+="<div class= 'os-share-container' data-provider='"+providersMore[i]+"'><a class='"+providersMore[i].toLowerCase()+" share-provider' data-provider='"+providersMore[i]+"' title='"+providersMore[i]+
"' ></a>"+providersMore[i]+"</div>";}
if(theme.isEvenMorePopup){template+="<div class='os-share-container' id='more-sharing-options' onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><a class='share-provider evenmore' title='Even More Sharing Options'></a>More...</div>";}
template+="<div class='os-share-more-footer'><a href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"'  style='height: 18px;'></a></div></div>";}
template+="</div>";}
if(isTotalShare){template+="<div id='os-share-count' class='os-share-count share-provider' ></div>";}
if(theme.isEvenMorePopup){template+="<div id='os-share-even-more'><div class='os-share-header'><h2>Share & Bookmark</h2><div id='os-share-even-close' onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><span>&times;</span></div></div>";for(var i=0;i<providersAll.length;i++){template+="<div class= 'os-share-container' data-provider='"+providersAll[i]+"'><a class='"+providersAll[i].toLowerCase()+" share-provider' data-provider='"+providersAll[i]+"' title='"+providersAll[i]+
"' ></a>"+providersAll[i]+"</div>";}
template+="<div class='os-share-more-footer'><a href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"' style='height: 22px;'></a></div>";template+="</div>";}
return template;};theme.renderVHMoreInterface=function(providersMore,providersAll,objectName){var template='';template+="<div id='os-share-count' class='os-share-count share-provider' style=\"margin-bottom: 0px;border-radius: 3px;padding: 5px;text-align: center;\"></div>";if(theme.isMorePopup||theme.isEvenMorePopup){template+="<div><a class='lrshare_hybrid_share' title='More Sharing Options' "+(theme.isEvenMorePopup?"onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);":"")+" ></a>";if(theme.isMorePopup){template+="<div id='os-share-more'>";for(var i=0;i<providersMore.length;i++){template+="<div class= 'os-share-container' style=\"display:inline-block !important;\" data-provider='"+providersMore[i]+"'><a  style=\"display:inline-block !important;\"class='"+providersMore[i].toLowerCase()+" share-provider' data-provider='"+providersMore[i]+"' title='"+providersMore[i]+
"' ></a>"+providersMore[i]+"</div>";}
if(theme.isEvenMorePopup){template+="<div class='os-share-container' id='more-sharing-options' style=\"display:inline-block !important;\" onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><a style=\"display:inline-block !important;\" class='share-provider evenmore' title='Even More Sharing Options'></a>More...</div>";}
template+="<div class='os-share-more-footer'><a style=\"display:inline-block !important;\" href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"' style='height: 18px;display:inline-block !important;'></a></div></div>";}
template+="</div>";}
return template;};theme.renderHVMoreInterface=function(providersMore,providersAll,objectName){var template='';if(theme.isMorePopup||theme.isEvenMorePopup){template+="<div style=\"display: inline-block;\"><a class='lrshare_hybrid_share' style=\"display: inline-block;\" title='More Sharing Options' "+(theme.isEvenMorePopup?"onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);":"")+" ></a>";if(theme.isMorePopup){template+="<div id='os-share-more'>";for(var i=0;i<providersMore.length;i++){template+="<div class= 'os-share-container' style=\"display:inline-block !important;\" data-provider='"+providersMore[i]+"'><a  style=\"display:inline-block !important;\"class='"+providersMore[i].toLowerCase()+" share-provider' data-provider='"+providersMore[i]+"' title='"+providersMore[i]+
"' ></a>"+providersMore[i]+"</div>";}
if(theme.isEvenMorePopup){template+="<div class='os-share-container' id='more-sharing-options' style=\"display:inline-block !important;\" onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><a style=\"display:inline-block !important;\" class='share-provider evenmore' title='Even More Sharing Options'></a>More...</div>";}
template+="<div class='os-share-more-footer'><a style=\"display:inline-block !important;\" href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"' style='height: 18px;display:inline-block !important;'></a></div></div>";}
template+="</div>";}
template+="<div id='os-share-count' class='os-share-count share-provider' style=\"margin-bottom: 0px;border-radius: 3px;padding: 0px 4px 0px 4px;text-align: center;display: inline-block;margin-left: 1px;\"></div>";return template;};theme.renderVVMoreInterface=function(providersMore,providersAll,objectName){var template='';template+="<div id='os-share-count' class='os-share-count share-provider' style=\"margin-bottom: 0px;border-radius: 3px;padding: 5px;text-align: center;width: 59px;display: block;\"></div>";if(theme.isMorePopup||theme.isEvenMorePopup){template+="<div><a style=\"display: block;\" class='lrshare_hybrid_share' title='More Sharing Options' "+(theme.isEvenMorePopup?"onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);":"")+" ></a>";if(theme.isMorePopup){template+="<div id='os-share-more'>";for(var i=0;i<providersMore.length;i++){template+="<div class= 'os-share-container' style=\"display:inline-block !important;\" data-provider='"+providersMore[i]+"'><a  style=\"display:inline-block !important;\"class='"+providersMore[i].toLowerCase()+" share-provider' data-provider='"+providersMore[i]+"' title='"+providersMore[i]+
"' ></a>"+providersMore[i]+"</div>";}
if(theme.isEvenMorePopup){template+="<div class='os-share-container' id='more-sharing-options' style=\"display:inline-block !important;\" onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><a style=\"display:inline-block !important;\" class='share-provider evenmore' title='Even More Sharing Options'></a>More...</div>";}
template+="<div class='os-share-more-footer'><a style=\"display:inline-block !important;\" href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"' style='height: 18px;display:inline-block !important;'></a></div></div>";}
template+="</div>";}
return template;};theme.renderHHMoreInterface=function(providersMore,providersAll,objectName){var template='';if(theme.isMorePopup||theme.isEvenMorePopup){template+="<div style=\"display: inline-block;\"><a class='lrshare_hybrid_share' style=\"display: inline-block;\" title='More Sharing Options' "+(theme.isEvenMorePopup?"onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);":"")+" ></a>";if(theme.isMorePopup){template+="<div id='os-share-more'>";for(var i=0;i<providersMore.length;i++){template+="<div class= 'os-share-container' style=\"display:inline-block !important;\" data-provider='"+providersMore[i]+"'><a  style=\"display:inline-block !important;\"class='"+providersMore[i].toLowerCase()+" share-provider' data-provider='"+providersMore[i]+"' title='"+providersMore[i]+
"' ></a>"+providersMore[i]+"</div>";}
if(theme.isEvenMorePopup){template+="<div class='os-share-container' id='more-sharing-options' style=\"display:inline-block !important;\" onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><a style=\"display:inline-block !important;\" class='share-provider evenmore' title='Even More Sharing Options'></a>More...</div>";}
template+="<div class='os-share-more-footer'><a style=\"display:inline-block !important;\" href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"' style='height: 18px;display:inline-block !important;'></a></div></div>";}
template+="</div>";}
template+="<div id='os-share-count' class='os-share-count share-provider' style=\"margin-bottom: 0px;border-radius: 3px;padding: 0px 4px 0px 4px;text-align: center;display: inline-block;margin-left: 1px;\"></div>";return template;};theme.renderEvenMoreInterface=function(providersMore,providersAll,objectName){var template='';if(theme.isEvenMorePopup){template+="<div id=\"os-share-overlay\" style=\"display: none!important;\"></div><div id='os-share-even-more' style=\"display:none !important;\"><div class='os-share-header'><h2>Share & Bookmark</h2><div id='os-share-even-close' onclick="+objectName+".util.toggleElementDisplay('os-share-even-more',true,'os-share-overlay',this);><span>&times;</span></div></div>";for(var i=0;i<providersAll.length;i++){template+="<div class= 'os-share-container' data-provider='"+providersAll[i]+"'><a class='"+providersAll[i].toLowerCase()+" share-provider' data-provider='"+providersAll[i]+"' title='"+providersAll[i]+
"' ></a>"+providersAll[i]+"</div>";}
template+="<div class='os-share-more-footer'><a href='"+adminSettings.domain+"' target='_blank'>Social Share by<img src='//"+adminSettings.poweredByImageUrl+"' alt='"+adminSettings.altLogo+"' style='height: 22px;'></a></div>";template+="</div>";}
return template;}
theme.renderMobileInterface=function(providers,providersMore,providersAll,objectName,isTotalShare){var template='';var providersNames=[];template+="<div class='osshare_button'><div class='os-mobile-top-wrap osshare_flat'>";for(var i=0;i<providers.length;i++){if(typeof providers[i]==="object"){providersNames.push(providers[i].name);}
else{providersNames.push(providers[i]);}
template+="<span data-provider='"+providersNames[i]+"' title='"+providersNames[i]+"' data-provider='"+providersNames[i]+"'><span class=' os-ss-icon-"+providersNames[i].toLowerCase()+" osshare_"+providersNames[i].toLowerCase()+"' data-provider='"+providersNames[i]+"'></span></span>";}
template+="<span onclick='"+objectName+".util.toggle_show(\"os_sharing_mobile_menu\")';><span class=' os-ss-icon-more osshare_more more'></span></span>";template+="</div><div class='os_menu osshare_flat' id='os_sharing_mobile_menu' style='display: none;'><div class='osmenu_inner'><div class='osmenu_header'>";template+="<div class='osmenu_headerinner'>";template+="<div class='osmenu_head'>Share</div>";template+="<a id='' class='osmenu_headercancel' onclick='"+objectName+".util.toggle_hide(\"os_sharing_mobile_menu\");'>Close</a>";template+="</div>";template+="</div>";template+="<div class='osmenu_body osmenu_overflow'>";template+="<div class='osmenu_scroller'>";template+="<div class='osmenu_search' style='display:none;'>";template+="<input type='text' placeholder='Find a service'>";template+="<input type='submit'>";template+="<input type='cancel'>";template+="</div>";template+="<div class=\"osmenu_content\"><os class='osmenu_content cf'>";for(var i=0;i<providersMore.length;i++){template+="<osc class=\"cf cf1\">";template+="<div class='cf'  class='' title='"+providersMore[i]+"'>";template+="<span class='osmenu_contenticon os-ss-icon-"+providersMore[i].toLowerCase()+" osshare_"+providersMore[i].toLowerCase()+" '   data-provider='"+providersMore[i]+"'></span>";template+="<span class='osmenu_contentlabel'>"+providersMore[i]+"</span>";template+="</div>";template+="</osc>";}
template+="</os>";template+="</div>";template+="</div>";template+="</div></div></div>";return template;};theme.renderCounter=function(providers,providersMore,providersAll,objectName,type,callback){var template="";template+="<div class='os-share-counter-widgets-container' id='os-share-counter-"+type+"'>";for(var i=0;i<providers.length;i++){if(providers[i].indexOf("lrshare_hybrid_share")>=0){template+="<div class='os-share-counter-widget'>"+(callback?callback():theme.renderMoreInterface(providersMore,providersAll,objectName))+"</div>";template+=theme.renderEvenMoreInterface(providersMore,providersAll,objectName);}else{template+="<div class='os-share-counter-widget'>"+providers[i]+"</div>";}};template+="</div>";return template;};theme.renderHorizontalSideCounter=function(providers,providersMore,providersAll,objectName){return theme.renderCounter(providers,providersMore,providersAll,objectName,"horz-side",function(){return theme.renderHHMoreInterface(providersMore,providersAll,objectName);});};theme.renderHorizontalTopCounter=function(providers,providersMore,providersAll,objectName){return theme.renderCounter(providers,providersMore,providersAll,objectName,"horz-top",function(){return theme.renderVHMoreInterface(providersMore,providersAll,objectName);});};theme.renderVerticalSideCounter=function(providers,providersMore,providersAll,objectName){return theme.renderCounter(providers,providersMore,providersAll,objectName,"vert-side",function(){return theme.renderHVMoreInterface(providersMore,providersAll,objectName);});};theme.renderVerticalTopCounter=function(providers,providersMore,providersAll,objectName){return theme.renderCounter(providers,providersMore,providersAll,objectName,"vert-top",function(){return theme.renderVVMoreInterface(providersMore,providersAll,objectName);});};theme.renderSingleWidget=function(providers,match){var template="";console.log(match);template+="<div class='os-share-follow-bar-widget'>"+providers[0]+"</div>";return template;};theme.renderAllImageinPopup=function(){var imgSrcs=document.getElementsByTagName("img");var allowedImages=[];for(var index in imgSrcs){try{if(imgSrcs[index]){var nopin=imgSrcs[index].getAttribute("nopin");if(nopin!="nopin"){allowedImages.push(imgSrcs[index]);}}}catch(e){}}
var template="";template+="<div class='osshare_heading'><div class='osshare_heading_title'><h2><span class='osshare_imageshare_icon osshare_iconsprite32 osshare_pinterest'> </span>Select an image to pin.</h2></div><div class='osshare_close_imageshare'>X</div></div></div>";template+='<div class="osshare_contents">';template+='<div class="osshare_imagelist"><os>';for(var i=0;i<allowedImages.length;i++){if(parseInt(allowedImages[i].width)>32&&parseInt(allowedImages[i].height)>32){template+='<osc><span class="div_pinimages_spanouter loginradius_pinsharing_style">';template+='<span class="div_pinimages_spaninner">';template+='<img data-provider="media='+allowedImages[i].src+'" title="'+allowedImages[i].title+'" alt="'+allowedImages[i].alt+'" src="'+allowedImages[i].src+'" height="190px" width="190px" style="opacity: 1;">';template+='<div style="display: none;"></div></span><span class="atImgSpanSize">'+allowedImages[i].width+' x '+allowedImages[i].height+'</span></span></osc>';}}
template+='</os></div>';template+='</div>';return template;};return theme;})();;
