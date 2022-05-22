(function ($) {
    $.fn.renderBaseTop = function (titleNm) {
        $.ajaxSetup({async: false});
//        this.load('/rest/fss/web/baseTop');
        $.ajaxSetup({async: true});
        $('#headerTitleName').html(titleNm);
        var token = localStorage.getItem("epsav_token");
     	if(token !== null){
            var decoded = jwt_decode(token);
            $('#loginedUserNm').html(decoded.korNm);
         };
         
    };
})(jQuery);