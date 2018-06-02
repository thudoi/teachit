(function($){
    $(document).ready(function(){
            $('.minicolors').each(function() {
                $(this).minicolors({
                    control: $(this).attr('data-control') || 'hue',
                    position: $(this).attr('data-position') || 'right',
                    theme: 'bootstrap',
                });
            });
    })
}(jQuery));