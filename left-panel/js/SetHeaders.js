
function loadJSCSSLV(root, addjsfiles){
    var cssfiles = ['/../css/common.css', '/../css/layout.css'];
    var jsfiles = ['/js/paging.js', '/js/jquery-ui.js', '/js/jquery.form.js', '/js/jquery-treeview.js', '/js/jquery.cookie.js', '/js/i18n/grid.locale-kr.js',
                   '/js/jquery.jqGrid.min.js', '/js/common.js', '/js/jwt-decode.min.js',
                   '/js/cmmn.js', '/js/RestWrapper.js', '/js/JsonManagement.js', '/js/Binder.js'];
    loadJSCSS(root,  cssfiles, jsfiles, addjsfiles)
};

