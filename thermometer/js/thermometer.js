$(document).ready(function(){

	var $thermoButton_li = $(".thermoButton>li");
	var $thermoButton_li_a = $thermoButton_li.children("a");

	$thermoButton_li.on("click", function (e) {
		e.preventDefault();

		var abc = this;
		var target = $(this).children("a").attr("href");
		var isOn = $(this).children("a").hasClass("on");

		if (isOn) {
			return;
		} else {
			activateBtn(abc);
			activatePanel(target);
		}
	});

	function activateBtn(el) {
		$thermoButton_li_a.removeClass("on");
		$(el).children("a").addClass("on");
	}

	function activatePanel(sel) {
		$(".thermometer>ul").removeClass("on");
		$(sel).addClass("on");
	}

	// 팝업창
	$('.popupButton').on("click",function(){

		$('.Thermo_popUp_Wrap').fadeIn(500);

	});

	$('.Thermo_close').on("click",function(){

		$('.Thermo_popUp_Wrap').fadeOut(500);

	});// 팝업창

});