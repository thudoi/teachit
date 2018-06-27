(function($){
	"use strict";
	$(document).ready(function(){
      if ($(".view-home-slider-responsive")[0]){
          // Do something if class exists
          $('.view-home-slider-responsive').slick({
              dots: false,
              arrows: true,
              infinite: false,
              slidesToShow: 4,
              slidesToScroll: 2,
              responsive: [
                  {
                      breakpoint: 1024,
                      settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          infinite: true,
                          arrows: true,
                          dots: false
                      }
                  },
                  {
                      breakpoint: 768,
                      settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                          arrows: true,
                          dots: false
                      }
                  },
                  {
                      breakpoint: 480,
                      settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                          arrows: true,
                          dots: false
                      }
                  }
              ]
          });
          JvPiechart();
          JvProgressbarActive();
          load_portfolio();
          setHeighSlider();
      }

		// Scrolling Portfolio

		if( Drupal.settings.views !== undefined &&  Drupal.settings.views.ajaxViews !== undefined) {
			var views = Drupal.settings.views.ajaxViews[Object.keys(Drupal.settings.views.ajaxViews)];
			if (views.view_name == 'portfolio') {
				$(window).ajaxComplete(function () {
					if (views.view_display_id == 'scrolling' || views.view_display_id == 'load_more') {
						$('.portfolioContainer').isotope('destroy');
						load_portfolio();
						$('.portfolioContainer').css('height', $('.portfolioContainer').height() + 100);
					}
				});
			}
		}

		//console.log(views);
		$body = $('body'),
		// Menu Mobile
		$('.flexMenuToggle').click(function(){
			if($body.hasClass('show-menu-mobile')){
				$body.removeClass('show-menu-mobile');
			}else{
				$body.addClass('show-menu-mobile');
			}
		});


		$('.showsubmenu').toggle(function(){
			$(this).next('ul').slideDown(300,function(){
				$(this).closest('li').addClass('parent-showsub');
			});
		},function(){
			$(this).next('ul').slideUp(300,function(){
				$(this).closest('li').removeClass('parent-showsub');
			});
		})
		/** Mini cart **/
		$('.cart_list.product_list_widget .remove_line_item').each(function(){
				var parent = $(this).closest('li.mini_cart_item');
				$(this).click(function(){
					parent.find('input[id*="edit-delete"]').trigger('click');
				});
		});
		/* Menu categories */
        $('ul.product-categories li.cat-parent').each(function() {

            var p = $(this),
                btn = $('<span>', {
                    'class': 'showsubcategories  icon-angle-down',
                    text: ''
                }).click(function() {
                    if (p.hasClass('parent-showsub')) {
                        menu.slideUp(300, function() {
                            p.removeClass('parent-showsub');
                        });

                    } else {
                        menu.slideDown(300, function() {
                            p.addClass('parent-showsub');
                        });
                    };
                }),

            menu = p.children('ul');
			if(menu.find('a').hasClass('facetapi-active')){
				menu.closest('li.cat-parent').addClass('parent-showsub');
			}
            p.prepend(btn) // append : trong - duoi, prepend : trong - tren, after : duoi, before : tren

        });

        $('ul.product-categories li.active').parents('.current-cat-parent').addClass('parent-showsub');

    	/* bpopup */
		if(Drupal.settings.view_portfolio != 'undefined' && Drupal.settings.view_portfolio == 'popup') {
			$('[data-rel="portfolio-popup"]').each(function () {
				var $this = $(this);
				$this.magnificPopup({
					type: "ajax",
					//removalDelay: 160,
					//preloader: true,
					closeBtnInside: true,

				});
			});
		}

		/* search */
		var $body= $('body');
		$('.btn-search').click(function(){
			if($body.hasClass('show-search')){
				$body.removeClass('show-search');
			}else{
				$body.addClass('show-search');
			}
		});

		/* tooltip */
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="popover"]').on('click', function(e){ e.preventDefault();}).popover();



		/* Parallax  */
		var $window = $(window);
		var GSparallax = function(){
			if ($window.width() > 768) {
				$window.stellar({
					horizontalScrolling: false,
					verticalOffset: 40
				});
			}
		};

		GSparallax();

		var load_quantity = function(){
			//Qty Up-Down
			$('.quantity_info,.quantity_lin_item_table_cart').each(function(){
				console.log($(this));
				var qtyval = parseInt($(this).find('input[id*="edit-quantity"]').val());
				var input_qty = $(this).find('input[id*="edit-quantity"]');
				$(this).find('.qty-up').click(function(event){

					event.preventDefault();
					qtyval=qtyval+1;
					//$('.qty-val').text(qtyval);
					input_qty.val(qtyval);
				});
				$(this).find('.qty-down').click(function(event){
					event.preventDefault();
					qtyval=qtyval-1;
					if(qtyval>0){
						//$('.qty-val').text(qtyval);
						input_qty.val(qtyval);
					}else{
						qtyval=1;
						//$('.qty-val').text(qtyval);
						input_qty.val(qtyval);
					}
				});
			});
		};
		load_quantity();
		$(document).ajaxComplete(function(){
			load_quantity();
		})


		/* Headroom  */
	   $(".header-headroom").headroom({
		   // vertical offset in px before element is first unpinned
		   offset : 40,
		   // or you can specify tolerance individually for up/down scroll
		   tolerance : {
			   up : 0,
			   down : 0
		   },           classes : {               // when element is initialised
			 //  initial : "",
			   // when scrolling up
			   pinned : "scrolling-up",
			   // when scrolling down
			   unpinned : "scrolling-down",
		   }
	   });



	/////////////////////// owl Slider

	jQuery.fn.owlCarousel && jQuery(function($) {
		if($.fn.imagesLoaded) {
			$('.logoSlider ').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 6,
					pagination: false,
					navigation: false,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: true,
					itemsDesktopSmall: [1199, 4],
					itemsTablet: [991, 3],
					itemsMobile: [479, 2]
				});
			});
			$('.slider-products .product_list_widget').hide().imagesLoaded(function () {
				var item = 4;
				if($('body').hasClass('one-sidebar'))
				{
					item = 3;
				}
				$(this).show().owlCarousel({
					items: item,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: false,
					itemsDesktopSmall: [1199, 3],
					itemsTablet: [991, 2],
					itemsMobile: [479, 1]
				});
			});
			$('.slider-subcategories').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 4,
					pagination: false,
					navigation: false,
					autoPlay: true,
					itemsTablet: [768, 3],
					itemsMobile: [479, 2]
				});
			});
			$('.slider-latest-6 .jv-posts').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 6,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: false,
					itemsDesktopSmall: [979, 3],
					itemsTablet: [768, 2],
					itemsMobile: [479, 1]
				});
			});
			$('.slider-latest-4 .jv-posts').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 4,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: false,
					itemsDesktopSmall: [1199, 3],
					itemsTablet: [991, 2],
					itemsMobile: [479, 1]
				});
			});
			$('.slider-latest-3 .jv-posts').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 3,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					itemsDesktopSmall: [1199, 3],
					itemsTablet: [991, 2],
					itemsMobile: [479, 1]
				});
			});
			$('.slider-latest-2 .jv-posts, .slider-2-items .jvpost-div.slider').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 2,
					navigation: false,
					autoPlay: false,
					itemsDesktop: [1199, 2],
					itemsDesktopSmall: [979, 2],
					itemsTablet: [768, 2],
					itemsMobile: [479, 1]
				});
			});
			$('.slider-1-items .slider, .page-blog-gellary').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					navigation: false,
					pagination: true,
					autoPlay: false,
					singleItem: true,
					autoHeight: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					transitionStyle: 'fade'
				});
			});
			$('#block-title .single-blog-gellary').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					navigation: true,
					pagination: true,
					autoPlay: false,
					singleItem: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					transitionStyle: 'fadeUp'
				});
			});
			$('.slider-3-items .slider ').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 3,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"]
				});
			});

			$('.wrap-portfolio').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 5,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: false,
					itemsTablet: [768, 2],
					itemsMobile: [479, 1]
				});
			});

			$('.you-might-also-like .related-posts').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 3,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: false,
					itemsTablet: [768, 3],
					itemsMobile: [479, 1]
				});
			});
			$('.wtestimonials.slider-1-item').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					navigation: false,
					pagination: false,
					autoPlay: true,
					singleItem: true,
					autoHeight: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					transitionStyle: 'fade'
				});
			});
			$('.wtestimonials.slider-2-item').hide().imagesLoaded(function () {
				$(this).show().owlCarousel({
					items: 2,
					pagination: false,
					navigation: true,
					navigationText: ["<i class='icon-angle-left'></i>", "<i class='icon-angle-right'></i>"],
					autoPlay: false,
					itemsDesktop: [1199, 2],
					itemsDesktopSmall: [979, 2],
					itemsTablet: [768, 2],
					itemsMobile: [479, 1]
				});
			});
		}
	});

	/////////////////////// to top


	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#back-top').addClass('show');
		} else {
			$('#back-top').removeClass('show');
		}
	});

	$('#back-top').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

		$('.addtocart-teaser').each(function(){
			var this_cart  = $(this);
			this_cart.click(function(){
				$(this).closest('form').submit();
			});
		});


		// Masonry Item Product

	});
	// Pieachart JV
	function JvPiechart() {
		$('.piechart').each(function () {

			var $this = $(this);
			var value = Number($this.attr("data-value")) / 100;
			var color_value =  $this.attr('data-color-value');
			var stroke_color = $this.attr('data-stroke-color');
			var trail_color  = $this.attr('data-trail-color');
			var animation = $this.attr('data-animation');
			var option;

			if ($this.hasClass('piechart-icon')) {
				option = {
					color:(stroke_color !== undefined) ? '#'+stroke_color : '#3a3a3a',
					trailColor:(trail_color !== undefined) ? '#'+trail_color : '#f4f4f4',
					strokeWidth: 6,
					trailWidth: 6,
					duration: 1500,
					easing: animation,
					text: {
						style: {
							color: (color_value !== undefined) ? '#' + color_value : '#000',
						},
					}
				};
			}
			else {
				option = {
					color:(stroke_color !== undefined) ? '#'+stroke_color : '#3a3a3a',
					trailColor:(trail_color !== undefined) ? '#'+trail_color : '#f4f4f4',
					strokeWidth: 5,
					trailWidth: 5,
					duration: 1500,
					easing: animation,
					text: {
						style:{
						color:(color_value !== undefined) ? '#'+color_value : '#000',
						},
						value: '0%'
					},
					step: function (state, bar) {
						bar.setText((bar.value() * 100).toFixed(0) + "%");
					}
				}
			}

			var circle = new ProgressBar.Circle($(this)[0], option);

			$this.waypoint({
				handler: function (direction) {
					circle.animate(value);
				},
				offset: "68%"
			});

		});

	}

    function setHeighSlider() {
        jQuery('#block-views-home-slider-block ').imagesLoaded(function(){
            var height = jQuery('#block-views-home-slider-block .blog-thumbnail img').height();

            jQuery('#block-views-home-slider-block .blog-thumbnail img').height(height);
            jQuery('#block-views-home-slider-block .thumbnail_large ').height(height);
        })
    }
    window.onresize = function() {
        var height = jQuery('#block-views-home-slider-block .blog-thumbnail img').height();
        jQuery('.thumbnail_large iframe').height(height);
    };
	/**
	 * Progress bar
	 */
	function JvProgressbar($container) {
		$container.find('.progressbar').progressbar({display_text: 'center'});
	}

	/**
	 * Active Progress bar
	 */
	function JvProgressbarActive() {
		$('.progressbar-wrapper').each(function () {
			var $this = $(this);
			$this.waypoint({
				handler: function (direction) {
					JvProgressbar($this);
				},
				offset: "68%"
			});
		})
	}

	var load_portfolio = function(){
		var $container = $('.portfolioContainer');
		//$container.removeAttr('style');
		//$container.isotope('destroy');
		$container.isotope({
			filter: '*',
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});

		$('.portfolioFilter a').click(function(){
			$('.portfolioFilter .active').removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			$container.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				}
			});
			return false;
		});

	};
	function scrolling_portfolio(element_view,ItemSelector,NavSelector,NextSelector)
	{
		var $container = $(element_view);
		$container.find('.portfolioContainer').infinitescroll({
			// selector for all items you'll retrieve
			itemSelector: ItemSelector,
			debug: false,
			animate: true,
			state:{
				currPage: 0,
			},
			//extraScrollPx:$(document).height() - $(window).height(),
			navSelector: NavSelector,
			// selector for the paged navigation (it will be hidden)
			nextSelector: NextSelector,
			// selector for the NEXT link (to page 2)
			loading: {
				finishedMsg: 'No more pages to load.',
				img: Drupal.settings.basePath + '/sites/all/themes/superblog/assets/images/ajax-loader.gif'
			},

		},function(arrayOfNewElems){
			//console.log(arrayOfNewElems);
			if(arrayOfNewElems == ''){
				return false;
			}
			$('.portfolioContainer').isotope('destroy');
			load_portfolio();

		});
	}


  Drupal.behaviors.frontend = {
    attach:function (context,settings) {
      var height_sub = jQuery('.region-sub .main-feature img').height();
      var height_main = jQuery('.main-category .sub-fearture img').height();
      var height_sub_sub = jQuery('.region-sub .sub-fearture .media-left').width();
      height_sub_sub = (height_sub_sub*130)/232;
      console.log(height_main);
      jQuery('.main-category .sub-fearture .field-type-media iframe').height(height_main);
      jQuery('.main-category .sub-fearture .media-facebook-video .fb_iframe_widget_fluid_desktop').height(height_main);
      jQuery('.main-category .sub-fearture .file-video-youtube .media-youtube-player').height(height_main);
      jQuery('.main-category .sub-fearture .media-soundcloud-audio iframe').height(height_main);
      jQuery('.region-sub .main-feature .field-type-media').height(height_sub);
      jQuery('.region-sub .sub-fearture .field-type-media').height(height_sub_sub);
      jQuery('.region-sub .main-feature .field-type-media iframe').height(height_sub);
      jQuery('.fb_iframe_widget_fluid_desktop iframe').height(height_sub);
      jQuery('.region-sub .sub-fearture .field-type-media iframe').height(height_sub_sub);
    }
  }

})(jQuery);

