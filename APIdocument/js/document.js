$(document).ready(function () {

    $('.controller>ul').on('click', function () {

        $(this).addClass('on').siblings().removeClass('on');

    });

    var $moGnb_li = $(".controller>ul");

    $moGnb_li.click(function (e) {

        var isOn = $(this).children("a").hasClass("on");
        if (isOn) {
            $(this).children("a").removeClass("on");
            $(this).children(".sub").stop().slideUp();
        } else {
            $moGnb_li.children("a").removeClass("on");
            $moGnb_li.children(".sub").stop().slideUp();
            $(this).children("a").addClass("on");
            $(this).children(".sub").stop().slideDown();
        }
    });

});