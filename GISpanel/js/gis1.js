// 201118 추가스크립트-------------------------------------------------------------------
$(document).ready(function () {

	$('.menu').on('click', function () {
		$('.conRight').css({
			'right': '0px',
			'transition': '0.5s'
		});

		$('.quickMenu>ul>span').css({
			'right': '250px',
			'transition': '0.5s'
		});

		$('.tool').css({
			'right': '221px',
			'transition': '0.5s'
		});
	})

	$('.conRight_close').on('click', function () {
		$('.conRight').css({
			'right': '-221px',
			'transition': '0.5s'
		});

		$('.quickMenu>ul>span').css({
			'right': '80px',
			'transition': '0.5s'
		});

		$('.tool').css({
			'right': '0px',
			'transition': '0.5s'
		});
	})

	// 201228 '추가주제도' 패널 수정
	var $sub_li_a = $('.sub>li>a');

	$sub_li_a.on('click', function () {

		var isOn = $(this).hasClass('on');

		if (!isOn) {
			$(this).addClass('on');
			$(this).siblings('ul').stop().slideDown();
		} else {
			$(this).removeClass('on');
			$(this).siblings('ul').stop().slideUp();
		}
	});
});

// 201118 추가스크립트-------------------------------------------------------------------


function sizeContent() {
	var map_width = $('body').width();
	var map_height = $('body').height();

	$(function () {
		$(".conLeft,.conRight,.map").css({
			'height': map_height - 0 + 'px'
		});
		// $(".conLeft").css({
		// 	'width': map_width - 220 + 'px'
		// });

		$(".conLeft").css({
			'width': map_width - 0 + 'px'
		});

	});

	// $('.gnb_tbt1').click(
	// 	function() {
	//    $( ".gnb_tbt1" ).css({"display":"none"});
	//    $( ".gnb_tbt2" ).css({"display":"block"});
	//    $('.conRight').css({right:"-220px"});
	//    $(".conLeft,.map").css({'width': map_width + 'px'});
	// });
	// $('.gnb_tbt2').click(
	// 	function() {
	// 	$( ".gnb_tbt1" ).css({"display":"block"});
	//     $( ".gnb_tbt2" ).css({"display":"none"});
	// 	$('.conRight').css({right:"0px"});
	// 	$(".conLeft,.map").css({'width': map_width - 220 + 'px'});
	// });
}

//아코디언 메뉴
$(function () {
	$('.conRight>.rcontent>.content>dl>dt').click(function () {
		var chk_on = $(this).attr('class');
		var name = $(this).find("i").attr("class");
		if (chk_on.indexOf("down") != -1) {
			$(this).next('dd').slideDown();
			$(this).removeClass().addClass('up');
			$(this).find('i').attr("class", name.replace("fas fa-folder", "fas fa-folder-open"));
		} else if (chk_on.indexOf("up") != -1) {
			$(this).next('dd').slideUp();
			$(this).removeClass().addClass('down');
			$(this).find('i').attr("class", name.replace("fas fa-folder-open", "fas fa-folder"));
		}
	});

	// $('.popContents>dl>dt').click(function () {
	// 	var chk_on = $(this).attr('class');
	// 	var name = $(this).find("i").attr("class");
	// 	if (chk_on.indexOf("down") != -1) {
	// 		$(this).next('dd').slideDown();
	// 		$(this).removeClass().addClass('up');
	// 		$(this).find('i').attr("class", name.replace("-down", "-up"));
	// 	} else if (chk_on.indexOf("up") != -1) {
	// 		$(this).next('dd').slideUp();
	// 		$(this).removeClass().addClass('down');
	// 		$(this).find('i').attr("class", name.replace("-up", "-down"));
	// 	}
	// });

});


//스크롤 커스트마이징
function scrollSize() {
	var map_width = $('body').width();
	var map_height = $('body').height();
	$(function () {
		$("#scroll1").css({
			'height': map_height - 40 + 'px'
		});
	});
}

function scroll() {
	function changeSize() {
		Ps.update(document.getElementById('scroll1'));
	}
	$(function () {
		Ps.initialize(document.getElementById('scroll1'));
	});
}

$(function () {
	$(".popup").draggable({
		containment: '#container',
		cursor: "move",
		//stack: ".popup",
		scroll: false,
		handle: '.bar',

		opacity: 0.8
	});

	$(".popup").mousedown(function () {
		$(".popup").css('z-index', '98');
		$(this).css('z-index', '99');
		$(this).css('height', 'auto');
	});
	$(".closePop").click(function () {
		$(this).parent().parent().css('display', 'none');
	});

});