;(function ($) {

    $(document).on('click', '.nav-link', function () {
        let $section = $(this).data('section');
        $('.navbar-collapse').collapse('hide');
        $('html, body').animate({
            scrollTop: $('.' + $section).offset().top - 100
        }, 500);
    });

    console.log(1111);

})(jQuery);