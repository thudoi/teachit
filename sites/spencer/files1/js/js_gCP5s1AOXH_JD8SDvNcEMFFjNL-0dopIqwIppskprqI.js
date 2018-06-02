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
