$(document).ready(function(){

    $('.controller>ul').on('click',function(){

        $(this).addClass('on').siblings().removeClass('on');

    });

});