$(document).ready(function(){  
	// var modalLayer = $('.popupWrap');
  // var viewModal = $('.view_more');
  // var closeModal = $('.popup__close');
  // modalLayer.hide();
  // viewModal.on('click', function(e){
  //   e.preventDefault();
  //   modalLayer.show();
  // });
  // closeModal.on('click', function(){
	// 	modalLayer.hide();
	// 	e.preventDefault();
	// });
	// document 클릭시 닫힘
  // $('.mask').on('click', function(){
  //   modalLayer.hide(500);
  // });

	var tab = $('#tabWrap #tab > li');
	tab.on('click', function(e) {
		var content = $('.bodyContent > .content__div');
		e.preventDefault();
		var tg = $(this);
		var tc = tg.find('a');
		tab.find('>a').removeClass('on');
		tc.addClass('on');
		i = tg.index();
		content.css('display', 'none');
		content.eq(i).css('display', 'block');
		
		//스크롤 초기화
		$("#scrollbar1").tinyscrollbar().resize();
		var $scrollbar1 = $("#scrollbar1");
		var scrollbar1 = $scrollbar1.data("plugin_tinyscrollbar");
		scrollbar1.update(0);
	}); //a에 거는거니까 preventDefault씀

	
	/*var opgtab = $('#opgtabWrap #opgtab > li');
	opgtab.on('click', function(e) {
		e.preventDefault();
		var tg = $(this);
		var tc = tg.find('a');
		if(tc.hasClass('on') == true){
			tc.removeClass('on');	
		}else{
			tc.addClass('on');	
		}
	});*/ //a에 거는거니까 preventDefault씀
//  $('.toggle').click(function(e) {
//  	e.preventDefault();
//  
//    var $this = $(this);
//  
//    if ($this.next().hasClass('show')) {
//        $this.next().removeClass('show');
//        $this.next().slideUp(350);
//    } else {
//        $this.parent().parent().find('li .inner').removeClass('show');
//        $this.parent().parent().find('li .inner').slideUp(350);
//        $this.next().toggleClass('show');
//        $this.next().slideToggle(350);
//    }
//  });
  
});
