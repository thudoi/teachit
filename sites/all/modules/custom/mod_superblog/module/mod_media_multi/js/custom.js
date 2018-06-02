(function ($) {
    $(document).ready(function () {
        $('.jQuery-Sortable').sortablePhotos({
            selector: '> .ms-slide',
            sortable: true,
            padding: 2
        });
    });
})(jQuery);