$(document).ready(function(){

    $('#start_layer_content>li>a').on('click',function(){

        if(!$(this).hasClass('on')){
            $(this).addClass('on');
        }else {
            $(this).removeClass('on');
        }
        
    })

});

function sizeContent() {
	var map_width = $('body').width();
	var map_height = $('body').height();

	$(function() {	
		
		if($( ".gnb_tbt1" ).css("display") == "none"){
			$(".conLeft,.conRight,.map").css({'height': map_height - 0 + 'px'});
			$(".conLeft").css({'width': map_width - 0 + 'px'});
			$(".map").css({'width': map_width - 0 + 'px'});
			map.setSize([map_width - 0,map_height - 0]);
			fn_change_viewmode(map_mode);
		}else{
			$(".conLeft,.conRight,.map").css({'height': map_height - 0 + 'px'});
			$(".conLeft").css({'width': map_width - 220 + 'px'});
			$(".map").css({'width': map_width - 220 + 'px'});
			map.setSize([map_width - 220,map_height - 0]);
			fn_change_viewmode(map_mode);
		}
	
	});

	$('.gnb_tbt1').click(
		function() {
	   $( ".gnb_tbt1" ).css({"display":"none"});
	   $( ".gnb_tbt2" ).css({"display":"block"});
	   $('.conRight').css({right:"-220px"});
	   $(".conLeft,.map").css({'width': map_width + 'px'});
	   map.setSize([map_width - 0,map_height - 0]);
	   fn_change_viewmode(map_mode);
	});
	$('.gnb_tbt2').click(
		function() {
		$( ".gnb_tbt1" ).css({"display":"block"});
	    $( ".gnb_tbt2" ).css({"display":"none"});
		//$('.conRight').css({right:"0px"});
		$('.gnb_tbt1').css({right:"0px"});
		$(".conLeft,.map").css({'width': map_width - 220 + 'px'});
	
		map.setSize([map_width - 220,map_height - 0]);
		fn_change_viewmode(map_mode);
	});

	
	$('#gnb_tbt3').click(
			
		function() {
			if($( ".gnb_tbt1" ).css("display") == "none"){
				$('.gnb_tbt2').click();
			}else{
				$('.gnb_tbt1').click();
			}
	});
	
	$('.conRight_close').click(
			function() {
		   $( ".gnb_tbt1" ).css({"display":"none"});
		   $( ".gnb_tbt2" ).css({"display":"block"});
		   $('.conRight').css({right:"-220px"});
		   $(".conLeft,.map").css({'width': map_width + 'px'});
		   map.setSize([map_width - 0,map_height - 0]);
	});

	
	
}

//아코디언 메뉴
$(function(){
	//$('.conRight>.rcontent>.content>dl>dt').click(function(){
	$(document).on("click",".conRight>.rcontent>.content>dl>dt",function(){
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
	$(document).on("click",".sub>li>a",function(){

		var isOn = $(this).hasClass('on');

		if (!isOn) {
			$(this).addClass('on');
			$(this).siblings('ul').stop().slideDown();
		} else {
			$(this).removeClass('on');
			$(this).siblings('ul').stop().slideUp();
		}
	});
	
	$('#cctv_btn').click(function() {
		  if($('#cctv_btn').hasClass('on')){
			  $('#cctv_btn').removeClass('on');
			  map.removeByLayerName("cctv_vector_layer");
		  }else{
			  $('#cctv_btn').addClass('on');
			  map.addLayer(cctv_vector_layer);
			  cctv_vector_layer.setZIndex(99);
		  }
	});
});


//스크롤 커스트마이징
function scrollSize() { 
	var map_width = $('body').width();
	var map_height = $('body').height();
	$(function() {
		$("#scroll1").css({'height': map_height - 40 + 'px'});
	});
}
function scroll() {
      function changeSize() {
        Ps.update(document.getElementById('scroll1'));
      }
      $(function() {
        Ps.initialize(document.getElementById('scroll1'));
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

