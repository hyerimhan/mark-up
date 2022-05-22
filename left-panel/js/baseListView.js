(function ($) {
    $.fn.renderBaseJqList = function (titleNm) {
        $.ajaxSetup({async: false});
//        this.load('/rest/fss/web/baseListView');
        $.ajaxSetup({async: true});
//        $('#listTitleName').html(titleNm);
    };
})(jQuery);