$(document).ready(function(){

    	/*-------------------- 소방대상물정보 다중이용업소현황 checkbox ----------------------*/

	var ck_table = $('.Object_Wrap>div table label');

	$(ck_table).on("click",function(){
		if($(this).children('input').is(":checked")){
			$(this).children('span').children('input').attr("disabled",false);
			$(this).siblings('select').attr("disabled",false);
			$(this).children('span').children('input').focus();
		} else {
			$(this).children('span').children('input').attr("disabled",true);
			$(this).siblings('select').attr("disabled",true);
		}
	});

});