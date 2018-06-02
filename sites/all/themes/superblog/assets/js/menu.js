(function($){
	"use strict";
	$(function(){
		var
			responsive = 1199,
			$body = $('body'),
			menuPanel = $('#nav-mainmenu'),
			isMobile = false,
			wraper =  $('#page'),
			afterMenu = menuPanel.next(),
			mainsite = $('#mainsite')
			
			

		;


		$('.flexMenuToggle').click(function(){
			if($body.hasClass('show-menu-mobile')){
				$body.removeClass('show-menu-mobile');
			}else{
				$body.addClass('show-menu-mobile');
			}
		});

		
		var $window = $(window).resize(function(){
			if($window.width() <= responsive){
				if(!isMobile){
					menuPanel.attr('id','nav-mainmenu-mobile');
					$('#nav-mainmenu-mobile li[class*="menu-item-has-children"]').each(function(){
						 var 
							p = $(this),
							btn = $('<span>',{'class':'showsubmenu  icon-plus7', text : '' }).click(function(){
								if(p.hasClass('parent-showsub')){
									menu.slideUp(300,function(){
										p.removeClass('parent-showsub');
									});        										
								}else{
									menu.slideDown(300,function(){
										p.addClass('parent-showsub');
									});        										
								};	
							}),
							menu = p.children('ul')
						 ;
						 p.append(btn)  // append : trong - duoi, prepend : trong - tren, after : duoi, before : tren
					});
					$('#nav-mainmenu-mobile li[class*="current-"], #nav-mainmenu-mobile li[class*="-current"]').addClass('parent-showsub');
					$('#nav-mainmenu-mobile a.col-showsub').parent().addClass('parent-showsub');	
					wraper.prepend(menuPanel);
					isMobile = true;
				}
				
			}else{
				if(isMobile){
					menuPanel.attr('id','nav-mainmenu');
					afterMenu.before(menuPanel);
					isMobile = false;
				}
			}
		});
		$window.resize();



		
		var toggle = $('.flexMenuToggle').click(function(){
			if ($body.hasClass('showmenu')) hideMenu();
			else showMenu();
		});

	});
})(jQuery);
