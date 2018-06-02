(function($){
    $(document).ready(function(){
        masonry_view_animations();
        // Wow jquery
        wow = new WOW({
            animateClass: 'appear-animation',
            mobile: false,
            offset: 150
        });
        wow.init();
    });
    //Calculating The Browser Scrollbar Width
    var parent, child, scrollWidth, bodyWidth;

    if (scrollWidth === undefined) {
        parent = jQuery('<div style="width: 50px; height: 50px; overflow: auto"><div/></div>').appendTo('body');
        child = parent.children();
        scrollWidth = child.innerWidth() - child.height(99).innerWidth();
        parent.remove();
    }

    function masonry_view_animations() {
        var $ = jQuery;

        $('.masonry-item[data-appear-animation]').each(function(index,e) {

            var $this = $(this);

            $this.addClass('appear-animation');

            if(($('body').width() + scrollWidth) > 767) {
                $this.appear(function() {
                    var delay = ($this.attr('data-appear-animation-delay') ? $this.attr('data-appear-animation-delay') : 1);

                    if(delay > 1) $this.css('animation-delay', delay + 'ms');
                    $this.addClass($this.attr('data-appear-animation'));

                    setTimeout(function() {
                        $this.addClass('appear-animation-visible');
                    }, delay);
                }, {accX: 0, accY: -150});
            } else {
                $this.addClass('appear-animation-visible');
            }


        });

        /* Animation Progress Bars */

        $('.masonry-item[data-appear-progress-animation]').each(function() {
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
}(jQuery));