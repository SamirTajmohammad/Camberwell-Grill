$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    if (scrollTop <= 70)
        $('.sidebar-wrapper').css('top', 70 - scrollTop);
    else
        $('.sidebar-wrapper').css('top', 0);
});