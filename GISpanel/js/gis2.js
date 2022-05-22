function sizeContent() {
	var map_width = $('body').width();
	var map_height = $('body').height();

	$(function() {		
		$(".conLeft,.conLeftStats,.map").css({'height': map_height - 50 + 'px'});
		$("#container").css({'top': 50 + 'px'});
		$(".conLeft").css({'width': map_width - 300 + 'px'});
		$(".conLeft").css({'left': 300 + 'px'});
	});

	$('.gnb_tbt3').click(
		function() {
	   $( ".gnb_tbt3" ).css({"display":"none"});
	   $( ".gnb_tbt4" ).css({"display":"block"});
	   $('.conLeftStats').css({left:"-300px"});
	   $(".conLeft").css({'left': 0 + 'px'});
	   $(".conLeft,.map").css({'width': map_width + 'px'});
	});
	$('.gnb_tbt4').click(
		function() {
		$( ".gnb_tbt3" ).css({"display":"block"});
	    $( ".gnb_tbt4" ).css({"display":"none"});
		$('.conLeftStats').css({left:"0px"});
		$(".conLeft").css({'left': 300 + 'px'});
		$(".conLeft,.map").css({'width': map_width - 300 + 'px'});
	});
}

//아코디언 메뉴
$(function(){
	$('.conRight>.rcontent>.content>dl>dt').click(function(){
		var chk_on = $(this).attr('class');
		var name = $(this).find("i").attr("class");
		if (chk_on.indexOf("down") != -1)
		{
			$(this).next('dd').slideDown();
			$(this).removeClass().addClass('up');
			$(this).find('i').attr("class", name.replace("fas fa-folder","fas fa-folder-open"));
		}
		else if (chk_on.indexOf("up") != -1)
		{
			$(this).next('dd').slideUp();
			$(this).removeClass().addClass('down');
			$(this).find('i').attr("class", name.replace("fas fa-folder-open","fas fa-folder"));
		}
	});
	$('.popContents>dl>dt').click(function(){
		var chk_on = $(this).attr('class');
		var name = $(this).find("i").attr("class");
		if (chk_on.indexOf("down") != -1)
		{
			$(this).next('dd').slideDown();
			$(this).removeClass().addClass('up');
			$(this).find('i').attr("class", name.replace("-down","-up"));
		}
		else if (chk_on.indexOf("up") != -1)
		{
			$(this).next('dd').slideUp();
			$(this).removeClass().addClass('down');
			$(this).find('i').attr("class", name.replace("-up","-down"));
		}
	});
});


//스크롤 커스트마이징
function scrollSize() { 
	var map_width = $('body').width();
	var map_height = $('body').height();
	$(function() {
		$("#scroll2").css({'height': map_height - 380 + 'px'});
	});
}
function scroll() {
      function changeSize() {
        Ps.update(document.getElementById('scroll2'));
      }
      $(function() {
        Ps.initialize(document.getElementById('scroll2'));
      });
}

$(function(){	
	$(".popup").draggable({
		containment: '#container', 
		cursor:"move",
		//stack: ".popup",
        scroll: false,
        handle: '.bar',
		
		opacity:0.8
	});
	
	$(".popup").mousedown(function(){
		$(".popup").css('z-index','98');
		$(this).css('z-index','99');
		$(this).css('height','auto');
	});
	$(".closePop").click(function(){
		$(this).parent().parent().css('display','none');
	});

});