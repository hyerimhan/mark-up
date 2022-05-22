$(document).ready(function () {

	/*-------------------- nav 탭 버튼 ----------------------*/
	$('.nav>li').on('click', function () {

		$(this).addClass('on').siblings().removeClass('on');

	});

	var $nav_li = $(".nav>li");
	var $nav_li_a = $nav_li.children("a");

	$nav_li.on("click", function () {

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
		$nav_li_a.removeClass("on");
		$(el).children("a").addClass("on");
	}

	function activatePanel(sel) {
		$("#VisualWrap>.Visual>div").removeClass("on");
		$(sel).addClass("on");
	}

	/*-------------------- .sys_subnav ----------------------*/
	$('.nav').on('click', function () {

		if ($(this).children('li:nth-of-type(3)').hasClass('on')) {
			$('.sys_subnav').addClass('on');
		} else {
			$('.sys_subnav').removeClass('on');
		}

	});

	var $sys_subnav_li = $(".sys_subnav li");
	var $sys_subnav_li_a = $sys_subnav_li.children("a");

	$sys_subnav_li.on("click", function () {

		var abc2 = this;
		var target2 = $(this).children("a").attr("href");
		var isOn2 = $(this).children("a").hasClass("on");

		if (isOn2) {
			return;
		} else {
			activateBtn2(abc2);
			activatePanel2(target2);
		}
	});

	function activateBtn2(el2) {
		$sys_subnav_li_a.removeClass("on");
		$(el2).children("a").addClass("on");
	}

	function activatePanel2(sel2) {
		$(".System_con>li").removeClass("on");
		$(sel2).addClass("on");
	}

	/*-------------------- .panel checkbox ----------------------*/

	// 대상등록 패널
	$('.all_check1').on('click', function () {

		if ($(this).prop('checked')) {
			$('.panel>.result_con1 tr input[type=checkbox]').prop('checked', true);
		} else {
			$('.panel>.result_con1 tr input[type=checkbox]').prop('checked', false);
		}

	});

	// 리스트조회 패널
	$('.all_check2').on('click', function () {

		if ($(this).prop('checked')) {
			$('.panel>.result_con2 tr input[type=checkbox]').prop('checked', true);
		} else {
			$('.panel>.result_con2 tr input[type=checkbox]').prop('checked', false);
		}

	});

	// 시스템관리 > 사용자권한 패널
	$('.all_check3').on('click', function () {

		if ($(this).prop('checked')) {
			$('.panel>.user_attr_panel tr input[type=checkbox]').prop('checked', true);
		} else {
			$('.panel>.user_attr_panel tr input[type=checkbox]').prop('checked', false);
		}

	});

	// 시스템관리 > 권한그룹 패널
	$('.all_check4').on('click', function () {

		if ($(this).prop('checked')) {
			$('.attr_group_panel tr input[type=checkbox]').prop('checked', true);
		} else {
			$('.attr_group_panel tr input[type=checkbox]').prop('checked', false);
		}

	});

	/*-------------------- 임의저장 팝업창 ----------------------*/

	$('.extra').on('click', function () {

		$('.extra_popupWrap').fadeIn();

	});

	$('.extra_popup>.close').on('click', function () {

		$('.extra_popupWrap').fadeOut();
	});

	/*-------------------- 리스트 점검 패널 check list 탭 버튼 ----------------------*/

	$('.check_list>li').on('click', function () {

		$(this).addClass('on').siblings().removeClass('on');

	});

	var $cklist_li = $(".check_list>li");
	var $cklist_li_a = $cklist_li.children("a");

	$cklist_li.on("click", function () {

		var abc1 = this;
		var target1 = $(this).children("a").attr("href");
		var isOn1 = $(this).children("a").hasClass("on");

		if (isOn1) {
			return;
		} else {
			activateBtn1(abc1);
			activatePanel1(target1);
		}
	});

	function activateBtn1(el1) {
		$cklist_li_a.removeClass("on");
		$(el1).children("a").addClass("on");
	}

	function activatePanel1(sel1) {
		$(".check_panel>ul").removeClass("on");
		$(sel1).addClass("on");
	}

	/*-------------------- 화재안전특별조사 점검 입력창 슬라이드 ----------------------*/

	$(".check_panel>ul>li").on("click", function () {
		var target = $(this);
		target.addClass("on").siblings("li").removeClass("on");
	});

	$(".check_panel>ul>li").on("click", function () {
		$(this).children(".ck_panel_inner").addClass('on');
	});

	/*-------------------- 점검자 추가버튼 ----------------------*/

	var newList = `<tr>
		<td>
			<select>
				<option>선택</option>
				<option>총괄</option>
				<option>건축</option>
				<option>소방</option>
				<option>전기</option>
				<option>가스</option>
			</select>
		</td>
		<td>
			<input type="text">
		</td>
		<td>
			<button class="del">
				<p>삭제</p>
			</button>
		</td>
	</tr>`;

	function addDeleteEvent(){
		$('#cp1 tbody tr td button.del').on("click", function(){
			$(this).closest('tr').remove();
		});
	}

	$('#cp1 .add_inspector').on("click",function(){

		$('#cp1 table tbody').append(newList);
		addDeleteEvent();

	});

	addDeleteEvent();

	/*-------------------- 소방대상물정보 다중이용업소현황 checkbox ----------------------*/

	var ck_table = $('#cp2>div table label');

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


/*-------------------- 리스트 조회 및 점검 ----------------------*/

function List_check() {
	$('.List_into').removeClass('on');
	$('.List_check').addClass('on');
}

function back_List() {
	$('.List_check').removeClass('on');
	$('.List_into').addClass('on');
}


/*-------------------- 초기화 버튼 ----------------------*/

function reset_button() {

	if (!$(this).hasClass('on')) {
		$('.sys_button').addClass('on');
	} else {
		$('.sys_button').removeClass('on');
	}

}

/*-------------------- 엑셀다운로드 ----------------------*/

function fnExcelReport(id, title) {
	var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
	tab_text = tab_text + '<head><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
	tab_text = tab_text + '<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'
	tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
	tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
	tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
	tab_text = tab_text + "<table border='1px'>";
	var exportTable = $('#' + id).clone();
	exportTable.find('input').each(function (index, elem) {
		$(elem).remove();
	});
	tab_text = tab_text + exportTable.html();
	tab_text = tab_text + '</table></body></html>';
	var data_type = 'data:application/vnd.ms-excel';
	var ua = window.navigator.userAgent;
	var msie = ua.indexOf("MSIE ");
	var fileName = title + '.xls';
	//Explorer 환경에서 다운로드
	if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		if (window.navigator.msSaveBlob) {
			var blob = new Blob([tab_text], {
				type: "application/csv;charset=utf-8;"
			});
			navigator.msSaveBlob(blob, fileName);
		}
	} else {
		var blob2 = new Blob([tab_text], {
			type: "application/csv;charset=utf-8;"
		});
		var filename = fileName;
		var elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob2);
		elem.download = filename;
		document.body.appendChild(elem);
		elem.click();
		document.body.removeChild(elem);
	}
}