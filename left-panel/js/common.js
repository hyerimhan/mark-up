// 그리드 관련 변수 선언
var COL_LEFT_TAG = "{";		//그리드 생성시 컬럼의 시작 태그
var COL_RIGHT_TAG = "}";	//그리드 생성시 컬럼의 마지막 태그
var COL_NAME = "COL_NAME_";	//그리드 생성시 컬럼명 내이밍 값
var JSON_LIST_DATA = "data";	//AJAX 리스트형태의 json 키값
var JSON_COUNT_DATA = "count";	//AJAX 카운트값의 json 키값
var PARAM_CURPAGE = "CurPage";		// 그리드 페이징처리에 사용되는 현재페이지 파라메터 키값
var PARAM_ROWCOUNT = "RowCount";	// 그리드 페이징처리에 사용되는 보여줄 ROW수의 키값
var DATABASE_TYPE = true;	// DB에 따른 페이징 파라메터 값 설정 변수
var AJAX_TRANS_COUNT = 0;		//AJAX 현재 진행중인 통신 수
var PREV_BTN_IMG = "/images/prev.gif"; // "/images/common/paging_prev.gif";	//이전장 img
var NEXT_BTN_IMG = "/images/next.gif"; // "/images/common/paging_next.gif";	//다음장 img
var FIRST_BTN_IMG = "/images/first.gif"; // "/images/common/paging_first.gif";	//첫장 img
var LAST_BTN_IMG = "/images/last.gif"; // "/images/common/paging_last.gif";	//마지막장 img
var NO_DATA_MESSGE = "조회 데이터가 없습니다.";		//그리드 조회 데이터가 없을때 그리드에 표현될 문구
var GRID_JSON_DATA = "jsonDataSource";	//그리드에 저장되는 JSON 정보
var LOG_MODE = true;	//로그보이기 여부
var LOG_DISP_ID = "logContents";	//js로그 화면 id값

var EventOnDocComplete = 0; //그리드 로드 후 이벤트
var EventOnGridCnt     = 0; //화면 그리드 개수

/*$.ajaxSetup( {
    beforeSend: function ( xhr ) {
      xhr.setRequestHeader(  $("meta[name='_csrf_header']").attr("content"), $('meta[name="_csrf"]').attr('content') );
    }
});*/

var isGetLog = true;
	//로그인
	function login(){
		$.ajax({
			url:'/login.proc',
			dataType:"json",
			data : { "user_id" : $("#login_id").val() , "user_pwd" : $("#login_pwd").val() } ,
			type:"POST",
			async:false,
		   	success:function( data ) {

		   	},
		   	error : function( jqXHR, textStatus, errorThrown ) {
	    		//alert( jqXHR.responseText );
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    	}
		});
	}
	//달력
	function datePicker( idName ) {
		$( "#"+idName ).datepicker({
			//showOn: "both",
			//buttonImage: "/images/sample/common/cal.gif",
			//buttonImageOnly: true,
			changeMonth: true,
			changeYear: true,
			minDate: '-20y',
			nextText: '다음 달',
			prevText: '이전 달',
			numberOfMonths: [1,1],
			yearRange: 'c-20:c+10',
			showButtonPanel: true,
			currentText: '오늘 날짜' ,
			closeText: '닫기',
			dateFormat: "yy-mm-dd",
			showAnim: "slide",
			showMonthAfterYear: true ,
			dayNamesMin: ['일' , '월', '화', '수', '목', '금', '토'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']
		});

	}

	//달력 2
	function datePicker2( idName ) {
		$( "#"+idName ).datepicker({
			//showOn: "both",
			//buttonImage: "/images/sample/common/cal.gif",
			//buttonImageOnly: true,
			changeMonth: true,
			changeYear: true,
			minDate: '-20y',
			nextText: '다음 달',
			prevText: '이전 달',
			numberOfMonths: [1,1],
			yearRange: 'c-20:c+10',
			showButtonPanel: true,
			currentText: '오늘 날짜' ,
			closeText: '닫기',
			dateFormat: "yymmdd",
			showAnim: "slide",
			showMonthAfterYear: true ,
			dayNamesMin: ['일' , '월', '화', '수', '목', '금', '토'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		});

	}

	//달력 날짜 컨트롤
	function datePickerFuc( startDate , endDate ){
		//달력 기능 출발이 끝보다 작고 끝이 출발보다 크게
		$( "#" + startDate ).datepicker("option", "maxDate", $( "#"+endDate ).val());
		$( "#" + startDate ).datepicker("option", "onClose", function ( selectedDate ) {
			$( "#" + endDate ).datepicker( "option", "minDate", selectedDate );
	    });
	    $( "#"+endDate ).datepicker("option", "minDate", $( "#" + startDate ).val());
	    $( "#"+endDate ).datepicker("option", "onClose", function ( selectedDate ) {
	        $( "#" + startDate ).datepicker( "option", "maxDate", selectedDate );
	    });
	}

	//IE 날짜 오류 컨트롤
	function datePickerIE(nowDate){
		//IE 날짜 오류 컨트롤
		$( "#" + nowDate ).datepicker("option", "onClose", function ( selectedDate ) {
			 $( "#" + nowDate ).datepicker( "option", "", selectedDate );
	    });
	}

	//날짜 변환 (String)
	function convertDateToString(dt){
		return dt.getFullYear() + addZero(eval(dt.getMonth()+1))  + addZero(dt.getDate())+ addZero(dt.getHours())+addZero(dt.getMinutes());
	}
	//날짜 변환 (date)
	function convertStringToDate(date){
		return new Date( Number(date.substr(0,4)),Number(date.substr(4,2))-1 , Number(date.substr(6,2)) , Number(date.substr(8,2)), Number(date.substr(10,2)));
	}
	//로그 찍기
	function getLog(data){
		if (navigator.appName.indexOf('Microsoft Internet Explorer') !=-1 || navigator.appName.indexOf('IE') !=-1) {
			window.console && console.log(data);
			return;
		}
		if(isGetLog){
			console.log(data);
		}
	}
	//페이지 폼이동 기능
	function fromPageMove( fromId , url ){
		$('#' + fromId ).attr('target','_self');
		$('#' + fromId ).attr('action', url );
		$('#' + fromId ).submit();
	}
	// 시간 세팅
	function getHour(){
		var html = "";
		for (var i = 0 ; i < 24 ; i++) {
			if( i < 10 ){
				i = "0" + i ;
			}
			html += "<option value='"+i+"'>"+i+"시</option>";
		}
		$("#disaster_hour_param").html(html);
	}
	// 분 세팅
	function getMin(){
		var html = "";
		for (var i = 0 ; i < 60 ; i++) {
			if( i < 10 ){
				i = "0" + i ;
			}
			html += "<option value='"+i+"'>"+i+"분</option>";
		}
		$("#disaster_min_param").html(html);
	}
	function ajaxError(xhr_status){  								//ajax 에러처리
		  // alert(xhr.status) ; //  xhr.staus 값이 1091
		  if  ( xhr_status== '1090' ) {
		    	alert ("세션이 종료되었거나 로그인이 필요합니다.\다시 로그인하여 주십시요") ;
		    	top.location.href="<c:url value='/main.do' />" ;
		  }
	}
	function getSidoNameList( type ){	//체크박스 시도 리스트
		$.ajax({
			url : "/common/getSidoNameList.ajax" ,
			type : "post",
			dataType : "json",
			async: false,
			success : function( data ) {
				if ( data.str=="O" ){
					var html = "";
					if( type == 'all' ){
						html = "<option  value=''>전체(시도)</option>";
					}
					for (var i = 0; i < data.SidoNameList.length; i++) {
						html += "<option value="+data.SidoNameList[i].bjc_cde+" >"+data.SidoNameList[i].si_nam+"</option>";
					}
					$("#sido").html( html );
				} else {
					alert( "시도데이터를 가져오는데 실패 하였습니다. 다시 시도해주세요" );
				}
			},
			error : function( jqXHR, textStatus, errorThrown ) {
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    		ajaxError( jqXHR.status );
	    	}
		});
	}


	function getSelectList(gcode,hid){
		$.ajax({
			url:"/select/getSelectList.proc",
			dataType:"json",
			data : {paramGrpCd : gcode},
			type:"POST",
			async:false,
	    	success:function( data ) {

	    		var innerHTML="";
	    		if(data && data.length>0){
		    		for (var i = 0; i < data.length; i++){
					 	innerHTML+= "<option value="+data[i].cd+">"+data[i].cd_nm+"</option>";
		    		}
	    		}
	    		$('#'+hid).html("<option value='' selected=\"selected\">전체</option>");
	    		$('#'+hid).append(innerHTML);
	    	},
	    	error : function( jqXHR, textStatus, errorThrown ) {
	    		//alert( jqXHR.responseText );
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    	}
	    });
	};

	function getSelectListSelected(selId, data){
		$('#'+selId +' > option').each(function(){
		    var selVal = $(this).val();
		    if(selVal == data){
		        $(this).attr("selected","true");
		    }
		});
	};

	function getRadioCheckedValue(radioId){
		var radioVal ="";
		radioVal = $("input:radio[name='"+radioId+"']:checked").val();
		return radioVal;
	}

	function setRadioChecked(radioId, data){
		if(radioId != "" && data != ""){
			$("input:radio[name="+radioId+"][value="+data+"]").prop("checked", true);
		}
	}

	function getSigungooNameList( type ){		//체크박스 시군구리스트(시도코드)
		$.ajax({
			url : "/common/getSigungooNameList.ajax" ,
			type : "post",
			data : { sidoCode : $("#sido option:selected").val() },
			dataType : "json",
			async: false,
			success : function(data) {
				if ( data.str=="O" ){
					var html = "";
					if( type == 'all' ){
						html = "<option  value=''>전체(시/군/구)</option>";
					}
					for (var i = 0; i < data.SigungooNameList.length; i++) {

						html += "<option value="+data.SigungooNameList[i].bjc_cde+">"+data.SigungooNameList[i].gu_nam+"</option>";
					}
					$("#sigungoo").html( html );
				} else {
					alert( "시군구데이터를 가져오는데 실패 하였습니다. 다시 시도해주세요" );
				}
			},
			error : function( jqXHR, textStatus, errorThrown ) {
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    		ajaxError( jqXHR.status );
	    	}
		});
	}
	function getEmdNameList(){		//체크박스 읍면동리스트(시도코드)
		$.ajax({
			url : "/common/getEmdNameList.ajax" ,
			type : "post",
			data : { sigunCode : $("#sigungoo option:selected").val() },
			dataType : "json",
			async: false,
			success : function(data) {
				if ( data.str=="O" ){
					var html = "";
//					html = "<option  value=''>전체</option>";
					for (var i = 0; i < data.emdNameList.length; i++) {
						html += "<option value="+data.emdNameList[i].bjc_cde+">"+data.emdNameList[i].emd_nam+"</option>";
					}
					$("#emd").html( html );
				}
			},
			error : function( jqXHR, textStatus, errorThrown ) {
	    		console.log("getEmdNameList ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    		ajaxError( jqXHR.status );
	    	}
		});
	}
	function layerOpen(){
		$('a.layer[href^=#]').off("click");
		$('a.layer[href^=#]').click(function(){
			var popID = $(this).attr('rel');
			var popURL = $(this).attr('href');

			var query= popURL.split('?');
			var dim= query[1].split('&');
			var popWidth = dim[0].split('=')[1];


			if ( popID == "law" ) {
				setInitLawTable2( $("#tb_related_law").val() ) ;
			} else if ( popID == "manual" ) {
				setInitManualTable2( $("#tb_manual").val() ) ;
			}

			$('#' + popID).fadeIn().css({ 'width': Number( popWidth ) });

			var popMargTop = $('#' + popID).height() / 2;
			var popMargLeft = $('#' + popID).width() / 2;

			$('#' + popID).css({
				'margin-top' : -popMargTop,
				'margin-left' : -popMargLeft
			});
			$('body').append('<div id="fade"></div>');
			$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
			layerType( popID , $(this) );	// 레이어별 테이블 세팅
			return false;
		});
	}
	// 레이어별 테이블 세팅
	function layerType( popID , $this ){
		switch (popID) {
		case "law":																// 관련법령 레이어
			if( setLawTableFirstRun ){
				setLawTable();
				setLawTableFirstRun = false;  // 1번만 실행하기 위한 변수
			}
			break;
		case "map":																// 발생지역 지도위치 선정 레이어
			mapLonLatStyleChange();		    //좌표스타일 변경
			markerLonLatSaveClickFnc();		//마커생성 클릭 기능
			if( $("#lon").val() != "" && $("#lat").val() != "" ){	// 좌표가 지정되어 있을경우 해당좌표로 지도 이동
				 // 지도 마커 생성
				var markerInfo = {
					"lon" : $("#lon").val() , 																	// 좌표 lon
					"lat" : $("#lat").val() ,																	// 좌표 lat
					"img" : "/resources/img/common/marker.png",												// 마커 이미지
					"graphicHeight" : 40,																	// height 크기
					"graphicWidth" : 40,																	// width 크기
					"description" : "위치"
				};
				if( map.getLayersByName("마커")[0] != undefined ){
					map.removeLayer( map.getLayersByName("마커")[0] );
					marker = new OpenLayers.Layer.Vector( "마커" );
				}
				markerCreate( markerInfo );														// 마커 생성
				map.setCenter(new OpenLayers.LonLat(Number($("#lon").val()),Number($("#lat").val())).transform( EPSG4326 , EPSG900913 ) , 10 ); // 좌표이동
			} else {
				map.setCenter(new OpenLayers.LonLat(Number(127.34058),Number(35.99384)).transform( EPSG4326 , EPSG900913 ) , 7 );
			}
			break;
		case "disaster":														// 재난유형 레이어
			disasterTypeTableGreenBtInitialization(); 							// 버튼 초기화
			disasterTypeTableGreenBtSelect( $("#disaster_type_code").val() );	// 선택된값 색깔변화
			break;
		case "manual":															// 메뉴얼 레이어 테이블 세팅
			if( setManualTableFirstRun ){
				setManualTable();
				setManualTableFirstRun = false;  // 1번만 실행하기 위한 변수
			}
			break;
		case "researcher1":														// 보고서
			if( setResearcher1FirstRun ){
				datePicker( "researcher1_date1" );
				setResearcher1FirstRun = false;	  // 1번만 실행하기 위한 변수
			}
			break;
		case "researcher2":														// 보고서(외부수집)
			if( setResearcher2FirstRun ){
				datePicker( "researcher2_date1" );
				setResearcher2FirstRun = false;	  // 1번만 실행하기 위한 변수
			}
			break;
		case "researcher3":														// 백서
			if( setResearcher3FirstRun ){
				datePicker( "researcher3_date1" );
				setResearcher3FirstRun = false;	  // 1번만 실행하기 위한 변수
			}
			break;
		case "researcher4":														// 언론자료
			if( setResearcher4FirstRun ){
				datePicker( "researcher4_date1" );
				//체크박스 기능
				$("#researcher4Rad1").click(function(){
					$("#rad1").show();
					$("#rad2").hide();
				});
				$("#researcher4Rad2").click(function(){
					$("#rad1").hide();
					$("#rad2").show();
				});
				setResearcher4FirstRun = false;	  // 1번만 실행하기 위한 변수
			}
			break;
		case "researcher5":														// 언론자료
			if( setResearcher5FirstRun ){
				datePicker( "researcher5_date1" );
				setResearcher5FirstRun = false;	  								// 1번만 실행하기 위한 변수
			}
			break;
		case "media":															// 영상
			break;
		case "satellite":														// 위성영상
			break;
		case "cause":															// 위성영상
			var seq = $this.attr( "seq" );
			var code = $this.attr( "code" );
			var codeList = code.split( '|' );
			var $disasterCauseCodeList = $("#disasterCauseCode").find('.greenBt'); // 버튼 리스트
			var disaster_cause_textList = new Array();
			$("#disaster_cause_code").val( $this.attr( "code" ) );
			$("#disasterCauseCode").attr( "seq" , seq );							// 테이블 구분 seq 생성
			// 버튼 색깔 초기화
			$("#disasterCauseCode").find('.greenBt').removeClass("on");
			// 버튼 색깔 비교후 변화
			for (var i = 0; i < codeList.length; i++) {
				for (var x = 0; x < $disasterCauseCodeList.length; x++) {
					if( $disasterCauseCodeList.eq(x).attr("code") == codeList[i] ){
						$disasterCauseCodeList.eq(x).addClass("on");
						disaster_cause_textList.push( $disasterCauseCodeList.eq(x).find("span").html() );
					}
				}
			}
			// 텍스트 저장
			$("#disaster_cause_text").val( disaster_cause_textList.join(", ") );
			$(".footTxt > span").html( disaster_cause_textList.join(", ") );
			break;
		default:
			break;
		}
	}
	// 레이어 닫기 기능
	function layerClose(){
		$('#fade, .layer_block').fadeOut(function(){
			$('#fade').remove();
		});
		return false;
	}
	//파일 다운로드 기능 ( 보여지는 파일 이름 , 실제 파일이름 )
	function fileDown( fileDownName , fileRealName ){
		fileDownName = encodeURI ( encodeURIComponent ( fileDownName ) );
		fileRealName = encodeURI ( encodeURIComponent ( fileRealName ) );
		location.href="/common/fileDown.do?fileSaveVal="+fileRealName +"&fileDownVal="+fileDownName ;
	}

	function attackFileDown( fileDownName , fileRealName ){
		fileDownName = encodeURI ( encodeURIComponent ( fileDownName ) );
		fileRealName = encodeURI ( encodeURIComponent ( fileRealName ) );
		location.href="/common/attackFileDown.do?fileSaveVal="+fileRealName +"&fileDownVal="+fileDownName ;
	}
	function manualFileDown( seq ){
		var fileRealName = $( "input[ name= 'maunalCheckBox' ][value='"+seq+"']" ).attr("filereal");
		var fileDownName = $( "input[ name= 'maunalCheckBox' ][value='"+seq+"']" ).attr("filedown");
		fileDown( fileDownName , fileRealName );
	}
	// ajax 페이징 함수
	function paging( functionName , paging ){	//페이징 (페이징 적용 실행함수이름, 페이징위한 값 , 넘길 파라미터값)
		var pageNum = paging.pageNum;
		var startScope = paging.startScope;
		var endScope = paging.endScope;
		var scopeCount = paging.scopeCount;
		var totalScopePage = paging.totalScopePage;
		$("#paging").empty();
		var pagehtml = "";
		if ( startScope != 1 ){
			pagehtml += "<a href=\"#\" class=\"next_page\" title=\""+(startScope-scopeCount)+" 페이지로 이동\" " +
			"onclick='"+functionName+"("+(startScope-scopeCount)+")'> 이전 </a>";
		}
		for ( var i = startScope; i <= endScope; i++ ) {
			if ( i==pageNum ){
				pagehtml += "<a href=\"#\" title=\"1 페이지로 이동\"><span class=\"link\">"+i+"</span></a>";
			} else {
				pagehtml += "<a href=\"#\" title=\""+i+" 페이지로 이동\" onclick='"+functionName+"("+i+")'><span>"+i+"</span></a>";
			}
		}
		if (  endScope != totalScopePage ){
			pagehtml += "<a href=\"#\" class=\"prev_page\" title=\""+(endScope+scopeCount)+" 페이지로 이동\" " +
					"onclick='"+functionName+"("+(startScope+scopeCount)+")'> 다음 </a>";
		}
		$("#paging").html(pagehtml);
	}
	// 문자열 전체 교체
	function replaceAll(str, searchStr, replaceStr) {
	    return str.split(searchStr).join(replaceStr);
	}
	//글자수 체크
	function fnChkByte(obj, maxByte){
		var str = trim(obj.value);
		var str_len = str.length;
		var rbyte = 0;
		var rlen = 0;
		var one_char = "";
		var str2 = "";
		for(var i=0; i<str_len; i++){
			one_char = str.charAt(i);
			 if(escape(one_char).length > 4){
			     rbyte += 2;                    //한글2Byte
			}else{
			     rbyte++;                       //영문 등 나머지 1Byte
			}
			if(rbyte <= maxByte){
			     rlen = i+1;                    //return할 문자열 갯수
			}
		}
		if(rbyte > maxByte){
		     alert("한글 "+(maxByte/2)+"자 / 영문 "+maxByte+"자를 초과 입력할 수 없습니다.");
		     str2 = str.substr(0,rlen);         //문자열 자르기
		     obj.value = str2;
		     fnChkByte(obj, maxByte);
		}
	}
	// 공백 제거
	function trim(value) {
		 return value.replace(/^\s+|\s+$/g,"");
	}
	//숫자 체크
	function numberCheck( obj ) {
		var val = obj.value ;
		var regId = /^[0-9]{0,20}$/;
		if ( ! regId.test( val ) ){
			alert("숫자만 입력하실수 있습니다.");
			obj.value = "" ;
			obj.focus();
			return false;
		}
	}
	//한글, 영어 숫자 체크
	function onlyEng( obj ) {
		var inText = obj.value;
		var deny_char = /^[가-힣a-zA-Z0-9]{1,15}$/;
		if (! deny_char.test(inText)) {
			alert("영문자와 한글,숫자만을 입력하세요");
			obj.value = "";
			obj.focus();
			return false;
		}
		return true;
	}
	/*
	 * 숫자와 콤마만 입력 가능 , x : this , y : 소수점 자리 , 전체 자리수
	 * */
	function checkDecimals(x, y , z) {
		var decallowed = y; // 소숫점이하숫자의 갯수
		if (isNaN(x.value) ) {
		        alert("숫자를 입력하세요");
		     x.value = "" ;
		        x.focus();
		        return;
		}
		if (x.value.indexOf('.') > -1) {
			dectext = x.value.substring(x.value.indexOf('.')+1, x.value.length);
		    if (dectext.length > decallowed) {
		    	alert ("소수점 " + decallowed + " 자리까지만 입력할 수 있습니다");
		        x.value = "" ;
		        x.focus();
		        return ;
		    }
		}
		if (  x.value.indexOf('.') < 0 && x.value.length > z  - y ) {
			alert ( "정수는 " +( z-y ) + "자리까지만 입력 가능합니다." ) ;
			x.value = x.value.substring( 0 , z-y ) ;
			x.focus();
			return ;
		}
		// alert(x.value.indexOf('.') ) ;
		if (  x.value.indexOf('.') > -1  ) {
			var n = x.value.substring(0 , x.value.indexOf('.') ) ;
			if ( n.length > z-y ) {
				alert ( "정수는 " +( z-y ) + "자리까지만 입력 가능합니다." ) ;
				x.value = x.value.substring( 0 , z-y ) ;
				x.focus();
				return ;
			}
		}
		return true
	}
	// 유효성 체크
	function validationFuc( param ){
		var $check = $( param.type );
		if( $check.filter("[name='"+param.name+"']").val().trim() == "" ){
			$check.filter("[name='"+param.name+"']").focus();
			return false;
		}
		return true;
	}

	//숫자만 입력하는 기능
	$(document).on("keyup", "input:text[numberOnly]", function() {

		numberCheck(this);

	});

	//HashMap 객체
	var Map = function(){
		this.map = {};
	};

	Map.prototype = {
		put : function(key, value) {
			this.map[key] = value;
		},
		get : function(key) {
			return this.map[key];
		},
		containsKey : function(key) {
			for(var prop in this.map){
				if(key == prop){
					return true;
				}
			}
			return false;
		},
		containsValue : function(value){
			for(var key in this.map){
				if(value == this.map[key])
				{
					return true;
				}
			}
			return false;
		},
		size : function(){
			var count = 0;
			for(var prop in this.map){
				count++;
			}
			return count;
		},
		clear : function(){
			this.map = {};
		}
	};


	// 그리드 jQGrid

	// grid resize
	function resizeJqGridWidth(grid_id, div_id, width, tf){

		var winHeight = window.innerHeight;
        var wHeight = winHeight - 1000;
        console.log("wHeight : " + wHeight);

        // window에 resize 이벤트를 바인딩 한다.
	    $(window).on('resize', function() {

	    	 //$('#' + grid_id).setGridWidth(width, tf); //Back to original width
	         //$('#' + grid_id).setGridWidth($('#' + div_id).width(), tf); //Resized to new width as per window

	         var gridWidth = $('#gbox_' + grid_id).parent().width();

	         if(gridWidth != undefined){
	        	 $('#' + grid_id).jqGrid('setGridWidth', gridWidth);
	         }

	         if(wHeight < 213){  //Height of five rows in grid is 110 pixels.
	             wHeight = 213;
	         }

	         console.log("wHeight : " + wHeight);

	         $('#'+ grid_id).jqGrid('setGridHeight', wHeight);

	     }).trigger('resize');
	}

	/*
	* data-listBind을 스캔하여 그리드에서 사용될 row의 html태그를 저장
	*/
	function initJsonGrid(){
		var $selecter = $("[data-listBind='true']");
		$selecter.each(function(){
			var gridId = this.id;  			//그리드가 표현될 태그의 ID
			var gridRowTag = document.getElementById(gridId).innerHTML;	//그리드가 표현될 ROW 태그
			$.data(document, gridId, gridRowTag);			//key, value로 저장하여 원본태그 값을 저장한다.
			$("#"+gridId).children().remove();
		});
	}

	//그리드 페이징
	function initPage(gridId,totalSize,currentPage,board,paginate){
		// 변수로 그리드아이디, 총 데이터 수, 현재 페이지를 받는다

		var gridList = "'" + gridId +"'";

		if(currentPage==""){
			var currentPage = $('#'+gridId).getGridParam('page');
		}
		// 한 페이지에 보여줄 페이지 수 (ex:1 2 3 4 5)
		var pageCount = 10;
		// 그리드 데이터 전체의 페이지 수
		var totalPage = Math.ceil(totalSize/$('#'+gridId).getGridParam('rowNum'));
		// 전체 페이지 수를 한화면에 보여줄 페이지로 나눈다.
		var totalPageList = Math.ceil(totalPage/pageCount);
		// 페이지 리스트가 몇번째 리스트인지
		var pageList=Math.ceil(currentPage/pageCount);

		//alert("currentPage="+currentPage+"/ totalPage="+totalSize);
		//alert("pageCount="+pageCount+"/ pageList="+pageList);

		// 페이지 리스트가 1보다 작으면 1로 초기화
		if(pageList<1) pageList=1;
		// 페이지 리스트가 총 페이지 리스트보다 커지면 총 페이지 리스트로 설정
		if(pageList>totalPageList) pageList = totalPageList;
		// 시작 페이지
		var startPageList=((pageList-1)*pageCount)+1;
		// 끝 페이지
		var endPageList=startPageList+pageCount-1;

		//alert("startPageList="+startPageList+"/ endPageList="+endPageList);

		// 시작 페이지와 끝페이지가 1보다 작으면 1로 설정
		// 끝 페이지가 마지막 페이지보다 클 경우 마지막 페이지값으로 설정
		if(startPageList<1) startPageList=1;
		if(endPageList>totalPage) endPageList=totalPage;
		if(endPageList<1) endPageList=1;

		// 페이징 DIV에 넣어줄 태그 생성변수
		var pageInner="";

		// 페이지 리스트가 1이나 데이터가 없을 경우 (링크 빼고 흐린 이미지로 변경)
		if(pageList<2){

			//pageInner+="<img src='firstPage2.gif'>";
			//pageInner+="<img src='prePage2.gif'>";

		}
		// 이전 페이지 리스트가 있을 경우 (링크넣고 뚜렷한 이미지로 변경)
		if(pageList>1){
//			pageInner+="<a class=\"pg_btn first\" href='javascript:firstPage(\""+gridId+"\");'><span class=\"ir\">맨 앞으로</span></a>";
//			pageInner+="<a class=\"pg_btn prev\" href='javascript:prePage("+totalSize+",\""+gridId+"\",\""+board+"\",\""+paginate+"\");'><span class=\"ir\">이전</span></a> ";
			pageInner+="<a class=\"prevend\" href='javascript:firstPage(\""+gridId+"\");'><span>&lt;&lt;</span></a>";
			pageInner+="<a class=\"prev\" href='javascript:prePage("+totalSize+",\""+gridId+"\",\""+board+"\",\""+paginate+"\");'><span>&lt;</span></a> ";
		}

//		pageInner = pageInner + "<div class=\"inwrap\">";
		// 페이지 숫자를 찍으며 태그생성 (현재페이지는 강조태그)
//		for(var i=startPageList; i<=endPageList; i++){
//			if(i==currentPage){
//				pageInner = pageInner +"<a class=\"pg_num active\" href='javascript:goPage("+(i)+",\""+gridId+"\");' id='"+(i)+"'><span>"+(i)+"</span></a> ";
//			}else{
//				pageInner = pageInner +"<a class=\"pg_num\" href='javascript:goPage("+(i)+",\""+gridId+"\");' id='"+(i)+"'><span>"+(i)+"</span></a> ";
//			}
//		}
//		pageInner = pageInner + "</div>";

		for(var i=startPageList; i<=endPageList; i++){
			if(i==currentPage){
				pageInner = pageInner +"<strong>"+(i)+"</strong></a> ";
			}else{
				pageInner = pageInner +"<a href='javascript:goPage("+(i)+",\""+gridId+"\");' id='"+(i)+"'>"+(i)+"</a> ";
			}

		}

		//alert("총페이지 갯수"+totalPageList);
		//alert("현재페이지리스트 번호"+pageList);

		// 다음 페이지 리스트가 있을 경우
		//if(totalPageList>pageList){

//			pageInner+="<a class='pg_btn next' href='javascript:nextPage("+totalSize+",\""+gridId+"\",\""+board+"\",\""+paginate+"\");'><span class=\"ir\">다음</span></a> ";
//			pageInner+="<a class='pg_btn last' href='javascript:lastPage("+totalPage+",\""+gridId+"\");'><span class=\"ir\">맨 끝으로</span></a>";

		//}
		if(totalPageList>pageList){

			pageInner+="<a class='next' href='javascript:nextPage("+totalSize+",\""+gridId+"\",\""+board+"\",\""+paginate+"\");'><span>&gt;</span></a> ";
			pageInner+="<a class='nextend' href='javascript:lastPage("+totalPage+",\""+gridId+"\");'><span>&gt;&gt;</span></a>";
		}

		// 현재 페이지리스트가 마지막 페이지 리스트일 경우
		if(totalPageList==pageList){

			//pageInner+="<img src='nextPage2.gif'>";
			//pageInner+="<img src='lastPage2.gif'>";
		}
		//alert(pageInner);
		// 페이징할 DIV태그에 우선 내용을 비우고 페이징 태그삽입
		$('#'+paginate).html("");
		$('#'+paginate).append(pageInner);
		if(totalSize > 0 ){
			$("#"+board).html("전체 <strong>"+totalSize+"</strong> 개 (페이지 <strong>"+currentPage+"</strong>/"+totalPage+")");
		}
	}

	// 그리드 첫페이지로 이동
	function firstPage(grid){

			if(!chkModifyRow()) { return;}

			$("#"+grid).jqGrid('setGridParam', {
								page:1
							}).trigger("reloadGrid");

	}
	// 그리드 이전페이지 이동
	function prePage(totalSize,grid,board,paginate){

			if(!chkModifyRow()) { return;}

			var currentPage = $('#'+grid).getGridParam('page');
			var pageCount = 10;

			currentPage-=pageCount;
			pageList=Math.ceil(currentPage/pageCount);
			currentPage=(pageList-1)*pageCount+pageCount;

			initPage(grid,totalSize,currentPage,board,paginate);

			$("#"+grid).jqGrid('setGridParam', {
								page:currentPage
							}).trigger("reloadGrid");

	}
	// 그리드 다음페이지 이동
	function nextPage(totalSize,grid,board,paginate){

			if(!chkModifyRow()) { return;}

			var currentPage = $('#'+grid).getGridParam('page');
			var pageCount = 10;

			currentPage+=pageCount;

			pageList=Math.ceil(currentPage/pageCount);
			currentPage=(pageList-1)*pageCount+1;

			initPage(grid,totalSize,currentPage,board,paginate);

			$("#"+grid).jqGrid('setGridParam', {
								page:currentPage
							}).trigger("reloadGrid");
	}
	// 그리드 마지막페이지 이동
	function lastPage(totalSize, grid){

			if(!chkModifyRow()) { return;}
			$("#"+grid).jqGrid('setGridParam', {
								page:totalSize
							}).trigger("reloadGrid");
	}
	// 그리드 페이지 이동
	function goPage(num, grid){
			if(!chkModifyRow()) { return;}
			$("#"+grid).jqGrid('setGridParam', {
								page:num
							}).trigger("reloadGrid");

	}

	//화면에서 수정된ROW가 존재할시 페이지이동 제한처리
	function chkModifyRow() {
		try {
			if(typeof programId !== "undefined" && typeof eval(programId).selIdxes !== "undefined") {
				eval(programId).addSelIdxes();
			}
			//chageCnt변수가 없는 화면은 패스.
			if(typeof changeCnt !== "undefined" && changeCnt > 0) {
				alert("수정된 DATA가 있습니다. 처리 후 진행하여 주십시오.");
				return false;
			}
		}
		catch(err) {
			console.log("err");
			return true;
		}
		return true;
	}

	//팝업호출
	var popupGate;
	function callPopup(width, height, url, title, parentWin) {
/*
			try{
				if(programId != "channelView"){
					eval(programId).setGridValue();
				}
			}catch(e){
				console.log(e);
			}
*/
		//팝업창 width, heigth 지정
		var w    = width;
		var h    = height;
		var name = "";

		//화면중앙위치 좌표
		var winWidth  = document.body.clientWidth;                 // 현재창의 너비
		var winHeight = document.body.clientHeight;                // 현재창의 높이
		var winX      = window.screenX || window.screenLeft || 0;  // 현재창의 x좌표
		var winY      = window.screenY || window.screenTop || 0;   // 현재창의 y좌표
		var lp        = winX + (winWidth -  w) / 2 + 100;
		var tp        = winY + (winHeight - h) / 2 + 100;

		window.name = parentWin;

		//팝업호출
		popupGate = window.open(   url
	              , title
	              ,     "  width       =" + w
	              	   +", height      =" + h
	              	   +", scrollbars  = no"
	              	   +", resizable   = yes"
	              	   +", toolbar     = no"
	              	   +", location    = no"
	                   +", directories = no"
	                   +", menubar     = no"
	                   +", status      = no"
	                   +", left        =" + lp
	                   +", top         =" + tp
                 );
	}

	//팝업닫기
	function closePopupGate() {
		//parent.close();
		//window.close();
		self.close();
	}

	//시간 마스크
	function assistDate(event){
	    var time = new Date()
	      , y = String(time.getFullYear())
	      , m = time.getMonth()
	      , d = time.getDate()
	      , h = '-'
	      , lists = {
	               keyup : [
					     // 숫자, - 외 제거
					     [/[^\d\-]/, '']
					     // 0000 > 00-00
					     , [/^(\d\d)(\d\d)$/, '$1-$2']
					     // 00-000 > 00-00-0
					     , [/^(\d\d\-\d\d)(\d+)$/, '$1-$2']
					     // 00-00-000 > 0000-00-0
					     , [/^(\d\d)-(\d\d)-(\d\d)(\d+)$/, '$1$2-$3-$4']
					     // 00-00-0-0 > 0000-0-0
					     , [/^(\d\d)-(\d\d)-(\d\d?)(-\d+)$/, '$1$2-$3$4']
					     // 0000-0000 > 0000-00-00
					     , [/^(\d{4}-\d\d)(\d\d)$/, '$1-$2']
					     // 00000000 > 0000-00-00
					     , [/^(\d{4})(\d\d)(\d\d)$/, '$1-$2-$3']
					     // 이탈 제거
					     , [/(\d{4}-\d\d?-\d\d).+/, '$1']
					     ]
					     , blur : [
					       // 날짜만 있을 때 월 붙이기
					     [/^(0?[1-9]|[1-2][0-9]|3[0-1])$/, m+'-$1', 1]
					     // 월-날짜 만 있을 때 연도 붙이기
					     , [/^(0?[1-9]|1[0-2])\-?(0[1-9]|[1-2][0-9]|3[01])$/, y+'-$1-$2']
					     , [/^((?:0m?[1-9]|1[0-2])\-[1-9])$/, y+'-$1']
					     // 연도 4 자리로
					     , [/^(\d\-\d\d?\-\d\d?)$/, y.substr(0, 3)+'$1', 1]
					     , [/^(\d\d\-\d\d?\-\d\d?)$/, y.substr(0, 2)+'$1', 1]
					     // 0 자리 붙이기
					     , [/(\d{4}-)(\d-\d\d?)$/, '$10$2', 1]
					     , [/(\d{4}-\d\d-)(\d)$/, '$10$2']
					     ]
				    }

	    event = event || window.event;
	    var input = event.target || event.srcElement
	      , value = input.value
	      , list = lists[event.type]
	      ;

	    for(var i=0, c=list.length, match; i<c; i++){
	        match = list[i];
	        if(match[0].test(value)){
	            input.value = value.replace(match[0], match[1]);
	            if(!match[2])
	                break;
	        }
	    }
	}

	//시간 마스크
	function assistTime(event){
	    var lists = {
	               keyup : [
					     // 숫자, : 외 제거
					     [/[^\d\:]/, '']
					     // 000 > 00:0
					     , [/^(\d\d)(\d)$/, '$1:$2']
					     // 0000 > 00:00
					     , [/^(\d\d)(\d\d)$/, '$1:$2']
					     // 00000 > 00:00
					     , [/^(\d\d)(\d\d)(\d)$/, '$1:$2']
					     // 이탈 제거
					     , [/(\d\d?:\d\d).+/, '$1']
					     ]
					     , blur : [
					     // 0 자리 붙이기
					      [/^(\d:)(\d\d)$/, '0$1$2', 1]
					     , [/(\d\d:)(\d)$/, '$10$2']
					     ]
				    }

	    event = event || window.event;
	    var input = event.target || event.srcElement
	      , value = input.value
	      , list = lists[event.type]
	      ;

	    for(var i=0, c=list.length, match; i<c; i++){
	           match = list[i];

	   		if(value.length == 2){
	   	        if(value > 23){
	   	            alert("시간은 23을 초과할 수 없습니다.");
	   	            input.value = input.value.substring(0,input.value.length-2);
	   	            return false;
	   	        }
	   	    }

	   	    if(value.length == 5){
	   	        var tempValue = value;
	   	        tempValue = value.substring(3,tempValue.length);
	   	        if(tempValue > 59){
	   	            alert("분은 59을 초과할 수 없습니다.");
	   	            input.value = input.value.substring(0,input.value.length-2);
	   	            return false;
	   	        }
	   	    }

	        if(match[0].test(value)){
	            input.value = value.replace(match[0], match[1]);
	            if(!match[2])
	                break;
	        }
	    }
	}

	//분 마스크
	function assistSecond(event){
		var lists = {
				keyup : [
				         // 숫자, : 외 제거
				         [/[^\d\:]/, '']
				         // 000 > 00:0
				         , [/^(\d\d)(\d)$/, '$1:$2']
				         // 0000 > 00:00
				         , [/^(\d\d)(\d\d)$/, '$1:$2']
				         // 00000000 > 00:00
				         , [/^(\d\d)(\d\d)(\d\d)(\d\d)$/, '$1:$2:$3']
				         // 00000 > 00:00:0
				         , [/^(\d\d:\d\d)(\d)$/, '$1:$2']
				         // 000000 > 00:00:00
				         , [/^(\d\d:\d\d)(\d\d)$/, '$1:$2']
				         // 이탈 제거
				         , [/(\d\d:\d\d?:\d\d).+/, '$1']
				         ]
		, blur : [
		          // 0 자리 붙이기
		          [/^(\d:)(\d\d:\d\d)$/, '0$1$2', 1]
		          , [/^(\d\d:)(\d:\d\d)$/, '$10$2']
		          , [/^(\d\d:\d\d:)(\d)$/, '$10$2']
		          , [/^(\d:)(\d\d:\d\d)$/, '0$1$2']
		          , [/^(\d\d:)(\d:\d\d)$/, '$10$2']
		          , [/^(\d:)(\d:)(\d\d)$/, '0$10$2$3']
		          , [/^(\d:)(\d:)(\d)$/, '0$10$20$3']
		          , [/^(\d\d:)(\d:)(\d)$/, '$10$20$3']
		          , [/^(\d:\d\d:)(\d)$/, '0$10$2']
		          , [/^([3-9][0-9])(:\d\d:\d\d)$/, '00$2']
		          , [/^(\d)$/, '00:00:0$1']
		          , [/^(\d\d)$/, '00:00:$1']
		          , [/^(\d\d:)(\d)$/, '00:$10$2']
		          , [/^(\d\d:\d\d)$/, '00:$1']
		          ]
		}

		event = event || window.event;
		var input = event.target || event.srcElement
		  , value = input.value
		  , list = lists[event.type]
		;

		for(var i=0, c=list.length, match; i<c; i++){
			match = list[i];

			if(value.length == 2){
		        if(value > 23){
		            alert("시간은 23을 초과할 수 없습니다.");
		            input.value = input.value.substring(0,input.value.length-2);
		            return false;
		        }
		    }

		    if(value.length == 5){
		        var tempValue = value;
		        tempValue = value.substring(3,tempValue.length);
		        if(tempValue > 59){
		            alert("분은 59을 초과할 수 없습니다.");
		            input.value = input.value.substring(0,input.value.length-2);
		            return false;
		        }
		    }

		    if(value.length == 8){
		        var tempValue = value;
		        tempValue = value.substring(6,tempValue.length);
		        if(tempValue > 59){
		            alert("초은 59을 초과할 수 없습니다.");
		            input.value = input.value.substring(0,input.value.length-2);
		            return false;
		        }
		    }

			if(match[0].test(value)){
				input.value = value.replace(match[0], match[1]);
				if(!match[2])
					break;
			}
		}
	}

	// XSS replace
	function replaceXss(str){
		var content;
	   if(str != null) {
	    	content = str + "";
	    	content = content.replace(/&/g  , "&amp;")
	                     .replace(/</g  , "&lt;")
	                     .replace(/>/g  , "&gt;")
	                     .replace(/\"/g , "&quot;")
	                     .replace(/\\/g , "&apos;");
	    }
	    return content;
	}

	//html 문자 제거
	function tagChange(val) {
		var str;
	    if(val == null) {
	    	str = "";
	    } else {
	    	str = val + "";
	    	str = str.replace(/&amp;/gi  , "&")
	                 .replace(/&lt;/gi   , "<")
	                 .replace(/&gt;/gi   , ">")
	                 .replace(/&quot;/gi , "\"")
	                 .replace(/&apos;/gi , "\'")
	                 .replace(/#40;/gi   , "(")
	                 .replace(/#41;/gi   , ")");
	    }
	    return str;
	}

	// 비밀번호 패턴
	function fn_pwPtnChk(val) {
		var ptn1 = /[a-zA-Z0-9+]/;
		var ptn2 = /[~!@#$%^&*]/;

		var checkNumber  = val.search(/[0-9]/g);
		var checkEnglish = val.search(/[a-zA-Z]/ig);

		if(checkNumber < 0 || checkEnglish < 0){
			return false;
		}

		if(!ptn1.test(val) || !ptn2.test(val) || val.length < 9 || val.length > 50) {
			return false;
		}
		return true;
	}

	// 기간 체크
	function fn_dateChk(fr, to) {

		var frVal = $("#"+fr).val();
		var toVal = $("#"+to).val();

		if(frVal != "" && toVal != "") {
			if(frVal > toVal){
				alert("시작일자가 종료일자보다 클 수 없습니다.");
				var lnow     = new Date();
				var lday     = ("0" + lnow.getDate()).slice(-2);
				var lmonth   = ("0" + (lnow.getMonth() + 1)).slice(-2);
				var linitDay = lnow.getFullYear()+"-"+(lmonth)+"-"+(lday) ;
				var lbeforeMonthDay = new Date(Date.parse(lnow) - 30 * 1000 * 60 * 60 * 24);
				    lday            = ("0" + lbeforeMonthDay.getDate()).slice(-2);
				    lmonth          = ("0" + (lbeforeMonthDay.getMonth() + 1)).slice(-2);
				    lbeforeMonthDay = lbeforeMonthDay.getFullYear()+"-"+(lmonth)+"-"+(lday);

				$("#"+to).val(linitDay);
				$("#"+fr).val(lbeforeMonthDay);
				$("#"+to).trigger(jQuery.Event("change"));
				$("#"+fr).trigger(jQuery.Event("change"));
				return false;
			}
		}
		return true;
	}

	//ENTER KEY SEARCH
	function gfn_keypress(fnName) {

		$('.kSearch').keypress(function( event ) {
			if ( event.which == 13 ) {
				event.preventDefault();
				fnName();
			}
		});
	}

//	ajax json으로 그리드 바인딩 처리
	var ListBind = function(tagId, pagingMode, scrollMode){
		this.tagId = tagId;
		this.param = {};	// 컨트롤러쪽으로 보낼 파라메터
		this.callbackFunction;	//그리드 생성후 콜백함수
		this.option = {
			url : '', //그리드 바인딩시 호출할 컨트롤러 주소
			currentPage : 1, //페이징 처리시에 현재페이지 기본값
			rowCount : 10, //그리드에 보여줄 row 수 기본값
			pagingSupport : pagingMode, //그리드의 페이징기능 사용유무 true, false
			pagingDispId : '', //페이징처리 할때 페이지번호 보여줄 태그 id 값
			scrollSupport : scrollMode, //그리드의 스크롤, 사이즈변경시 (데이터 append처리) 사용우무 true, false
			headerFixSupport : false, //그리드의 헤더고정 후 스크롤 기능 처리 유무
			headerFixState : false, //그리드의 헤더고정 처리 유무 상태값
			height : 500, //그리드 헤더고정 스크롤 기능 처리시 그리드의 기본 높이 값
			excelColumn : '', //그리드 엑셀 다운로드 컬럼명(영어) a,b,c
			excelLabel : '', //그리드 엑셀 다운로드 라벨명(한글) 번호,제목,작성자
			pdfColumn : '', //그리드 PDF 다운로드 컬럼명(영어) a,b,c
			pdfLabel : '', //그리드 PDF 다운로드 라벨명(한글) 번호,제목,작성자
			pdfTitle : '', //그리드 PDF에 보여줄 제목
			notFoundMsg : ''
		};
	};

	ListBind.prototype = {
		controller : function(url){
			this.option["url"] = url;
		},
		setRowCount : function(count){
			this.option["rowCount"] = count;
		},
		setParam : function(param){
			this.param = param;
		},
		setPageId : function(pageDisId){
			this.option["pagingDispId"] = pageDisId;
		},
		setHeaderFix : function(supportMode, heigth){
			this.option["headerFixSupport"] = supportMode;
			this.option["height"] = heigth;
		},
		setCallBack : function(funcName){
			this.callbackFunction = funcName;
		},
		bindGrid : function(json){
			var _tagId = this.tagId;
			var _option = this.option;

			if(_option.headerFixSupport && !_option.headerFixState){
				gridHeaderFixed(_tagId, _option.height);
				_option.headerFixState = true;
			}

			jsonGridBind(_tagId, json[JSON_LIST_DATA]);

			if(_option.headerFixSupport){
				gridWidthSync(_tagId);
			}
			gridDataSort(); //헤더클릭시 정렬기능 이벤트 처리
		},
		sendAjax : function(){
			this.option.currentPage = 1; //조회시 1부터 초기화
			var _tagId = this.tagId;
			var _option = this.option;
			var _function = this.callbackFunction;
			var _curPage = this.option.currentPage;	//현재 페이지
			var _rowCnt = this.option.rowCount;	//그리드에 보여줄 row수
			var paramMap = this.param["map"];
			var notFoundMsg = this.option.notFoundMsg;


			if(document.location.hash){
				_curPage =  document.location.hash.replace("#","");
			}


			//헤더 고정 처리
			if(_option.headerFixSupport && !_option.headerFixState){
				gridHeaderFixed(_tagId, _option.height);
				_option.headerFixState = true;
			}

			if(DATABASE_TYPE){
				paramMap[PARAM_CURPAGE] = (_curPage -1) * _rowCnt + 1 ;  /* 오라클 */
			}else{
				paramMap[PARAM_CURPAGE] = (_curPage == 1)?0:(_curPage -1) * _rowCnt;  /* 프레임웤 */
			}

			paramMap[PARAM_ROWCOUNT] = _rowCnt;
			sendGridAjax(_tagId, paramMap, _option, _function, notFoundMsg);

			//페이징 버튼 클릭시 처리
			/*
			if(_option.pagingSupport){

				$("#"+_option.pagingDispId).off("click").on("click", "a, img",function(){
					_curPage = $(this).attr("data-pageNo");
					_option.currentPage = _curPage;

					if(DATABASE_TYPE){
						paramMap[PARAM_CURPAGE] = (_curPage -1) * _rowCnt + 1 ;
					}else{
						paramMap[PARAM_CURPAGE] = (_curPage == 1)?0:(_curPage -1) * _rowCnt;
					}
					sendGridAjax(_tagId, paramMap, _option, _function);
				});

			}
			*/

			//스크롤 이벤트 처리
			if(_option.scrollSupport){
				var _docHeight = 0;
				var _winHeight = 0;
				var _scrollTop = 0;

				$(window).scroll(function(){

					_docHeight = $(document).height();
					_winHeight = $(this).height();
					_scrollTop = $(this).scrollTop();

					var _sumHeight = _winHeight+_scrollTop;
					if(_docHeight == _sumHeight){
						_curPage++;
						if(DATABASE_TYPE){
							paramMap[PARAM_CURPAGE] = (_curPage -1) * _rowCnt + 1 ;
						}else{
							paramMap[PARAM_CURPAGE] = (_curPage == 1)?0:(_curPage -1) * _rowCnt;
						}
						sendGridAjax(_tagId, paramMap, _option, _function);
					}

				}).resize(function(){
					_docHeight = $(document).height();
					_winHeight = $(this).height();
					_scrollTop = $(this).scrollTop();

					var _sumHeight = _winHeight+_scrollTop;
					if(_docHeight == _sumHeight){
						_curPage++;
						if(DATABASE_TYPE){
							paramMap[PARAM_CURPAGE] = (_curPage -1) * _rowCnt + 1 ;
						}else{
							paramMap[PARAM_CURPAGE] = (_curPage == 1)?0:(_curPage -1) * _rowCnt;
						}
						sendGridAjax(_tagId, paramMap, _option, _function);
					}
				});
			}


		},
		setExcelColumn : function(column){
			this.option["excelColumn"] = column;
		},
		setExcelLabel : function(label){
			this.option["excelLabel"] = label;
		},
		excelDownLoad : function(){
			var url = "/common/json/download.excel";
			var strJson = JSON.stringify($("#"+this.tagId).data(GRID_JSON_DATA));
			var strColumn = this.option.excelColumn.trim();
			var strLabel = this.option.excelLabel.trim();
			var formHtml = [];

			formHtml.push("<form id='jsonExcelForm' method='post' action='"+url+"' >");
			formHtml.push("<input type='text' name='jsonExcelData' value='"+strJson+"' /> ");
			formHtml.push("<input type='text' name='jsonExcelColumn' value='"+strColumn+"' /> ");
			formHtml.push("<input type='text' name='jsonExcelLabel' value='"+strLabel+"' /> ");
			formHtml.push("</form>");

			$("body").append(formHtml.join(""));
			$("#jsonExcelForm").submit().remove();
		},
		setPdfColumn : function(column){
			this.option["pdfColumn"] = column;
		},
		setPdfLabel : function(label){
			this.option["pdfLabel"] = label;
		},
		setPdfTitle : function(title){
			this.option["pdfTitle"] = title;
		},
		pdfDownload : function(){
			var url = "/common/json/download.report";
			var strJson = JSON.stringify($("#"+this.tagId).data(GRID_JSON_DATA));
			var strColumn = this.option.pdfColumn.trim();
			var strLabel = this.option.pdfLabel.trim();
			var strTitle = this.option.pdfTitle;
			var formHtml = [];

			formHtml.push("<form id='jsonPdfForm' target='_blank' method='post' action='"+url+"' >");
			formHtml.push("<input type='text' name='jsonPdfData' value='"+strJson+"' /> ");
			formHtml.push("<input type='text' name='jsonPdfColumn' value='"+strColumn+"' /> ");
			formHtml.push("<input type='text' name='jsonPdfLabel' value='"+strLabel+"' /> ");
			formHtml.push("<input type='text' name='jsonPdfTitle' value='"+strTitle+"' /> ");
			formHtml.push("</form>");

			$("body").append(formHtml.join(""));
			$("#jsonPdfForm").submit().remove();

		},
		rowData : function(idx){
			var $selecter = $("#"+this.tagId);

			$selecter.filter("[jqgrid='true']").each(function(){
				idx = idx -1;
			});

			return  $("#"+this.tagId).data(GRID_JSON_DATA)[idx];
		},
		rowColumn : function(idx, column){
			return  $("#"+this.tagId).data(GRID_JSON_DATA)[idx][column];
		},
		rowEdit : function(idx){
			var $gridId = $("#"+this.tagId);
			var jsonData = getRowData(this.tagId, idx);
			var datePickerYn = false;

			$gridId.children().eq(idx).find("[data-input]").each(function(){
				var $obj = $(this);
				var inputType   = $obj.data("input");
				var columnName  = $obj.data("column");
				var inputCss    = $obj.data("class");
				var datePicker  = $obj.data("datepicker");
				var columnValue = jsonData[columnName];
				var inputTag = [];
				if(inputType=="text"){
					inputTag.push("<input ");
					inputTag.push("type='"+inputType+"' ");
					inputTag.push("name='"+columnName+"' ");
					inputTag.push("value='"+columnValue+"' ");
					inputTag.push("style=\"width:100%;\" ");
					inputTag.push("class='"+inputCss+"' ");
					if(datePicker == true){
						datePickerYn = true;
						inputTag.push("data-datepicker=\"true\" ");
					}
					inputTag.push("/>");
					$obj.html(inputTag.join(""));
				}
				//var fn = window[$obj.data("bind")];
				//fn($obj.find("select"), columnValue);


			});

			if(datePickerYn){
				initjqDatePicker();	// datePicker 이벤트 처리
			}
		},
		rowSave : function(idx){
			var $gridId = $("#"+this.tagId);
			var jsonData = getRowData(this.tagId, idx);
			var param = new Map();

			$gridId.children().eq(idx).find("[type='text'], select").each(function(i){
				param.put($(this).attr("name"), $(this).val());

				$(this).parent().text($(this).val());
				jsonData[$(this).attr("name")] = $(this).val();
			});
			$gridId.children().eq(idx).addClass("info");	//변경된로우 표시
			$gridId.data(GRID_JSON_DATA)[idx] = jsonData;	//그리드 JSON 값 수정
			return param;
		},
		rowUp : function(idx){
			if(idx == 0){
				alert("가장 위에 줄입니다.");
				return false;
			}
			var $gridId = $("#"+this.tagId);
			var jsonData01 = getRowData(this.tagId, idx); //위로 이동할 ROW
			var jsonData02 = getRowData(this.tagId, idx-1); //아래로 내려갈 ROW

			$gridId.data(GRID_JSON_DATA)[idx-1] = jsonData01; //위그리드에 데이터 SET
			$gridId.data(GRID_JSON_DATA)[idx] = jsonData02; //아래그리드에 데이터 SET
			jsonGridBind(this.tagId, $gridId.data(GRID_JSON_DATA));

		},
		rowDown : function(idx){
			var $gridId = $("#"+this.tagId);

			if(idx == $gridId.data(GRID_JSON_DATA).length-1){
				alert("가장 아래 줄입니다.");
				return false;
			}

			var jsonData01 = getRowData(this.tagId, idx); //아래로 이동할 ROW
			var jsonData02 = getRowData(this.tagId, idx+1); //위로로 올라갈 ROW

			$gridId.data(GRID_JSON_DATA)[idx+1] = jsonData01; //아래그리드에 데이터 SET
			$gridId.data(GRID_JSON_DATA)[idx] = jsonData02; //위그리드에 데이터 SET
			jsonGridBind(this.tagId, $gridId.data(GRID_JSON_DATA));
		},
		rowDelete : function(inputType, name){
			if(inputType == "radio" || inputType == "checkbox"){

				var arrMoveData = [];
				var $selecter = $("#"+this.tagId);

				$selecter.find("[name='"+name+"']:"+inputType).each(function(i){
					if(!this.checked){
						arrMoveData.push($selecter.data(GRID_JSON_DATA)[i]);
					}
				});
				jsonGridBind(this.tagId, arrMoveData);

			}else{
				return false;
			}

		},
		rowAdd : function(jsonData){
			var arrJson = [];
			arrJson.push(jsonData);
			jsonGridBindAppend(this.tagId, arrJson);
		},
		rowMove : function(idx, gridObject){
			gridObject.rowAdd($("#"+this.tagId).data(GRID_JSON_DATA)[idx]);
		},
		validation : function(){
			var $gridId = $("#"+this.tagId);
			var regExpNumber = /^[0-9]*$/;
			var regExpEng    = /^[a-zA-Z]+$/;
			var regExpTel    = /^(0(2|3[1-3]|4[1-4]|5[1-5]|6[1-4]))-(\d{3,4})-(\d{4})$/;
			var	regExpCell   = /^(?:(010-\d{4})|(01[1|6|7|8|9]-\d{3,4}))-(\d{4})$/;
			var regExpEmail  = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
			var regExpLang   = /^[a-zA-Z0-9]+$/;
			var regExpUrl    = /^((http(s?))\:\/\/)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
			//var regExpDate   = /^[A-za-z]/g;
			var returnValue = true;

			$gridId.find("[data-required]").each(function(){
				var $formObj	= $(this);
				var formValue	= $formObj.text();
				var requirdList	= [];
				var requiredOption = $formObj.data("required");

				requirdList = requiredOption.split(" ");
				var reqCount = requirdList.length;

				$formObj.removeClass("danger");

				for(var i=0; i<reqCount; i++){
					if(requirdList[i] == "requird"){

						if("" == formValue.trim()){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}

					}else if(requirdList[i] == "number"){
						if(!regExpNumber.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i] == "eng"){
						if(!regExpEng.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i] == "lang&number"){
						if(!regExpLang.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							break;
						}
					}else if(requirdList[i] == "tel"){
						if(!regExpTel.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i] == "cellphone"){
						if(!regExpCell.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i] == "email"){
						if(!regExpEmail.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i] == "url"){

						if(!regExpUrl.test(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}

					}else if(requirdList[i].indexOf("minlength") > -1){
						var optionSize = requirdList[i].split(":")[1];
						if(formValue.length < optionSize && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i].indexOf("dateFormat") > -1){
						//var formatType = requirdList[i].split(":")[1];
						//checkCount++;
						//break;
					}else if(requirdList[i].indexOf("min") > -1){
						var minNumber = requirdList[i].split(":")[1];
						if(parseInt(minNumber) > parseInt(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}else if(requirdList[i].indexOf("max") > -1){
						var maxNumber = requirdList[i].split(":")[1];
						if(parseInt(maxNumber) < parseInt(formValue) && formValue!=""){
							$formObj.addClass("danger");
							returnValue = false;
							break;
						}
					}

				}


			});

			return returnValue;

		},
		hidden : function(columnName){
			var $gridId = $("#"+this.tagId);
			var idx = $gridId.parent().find("[data-column='"+columnName+"']").index();

			$gridId.children().each(function(){
				$(this).children().eq(idx).hide();
			});
			$gridId.parent().find("thead").children().children().eq(idx).hide();
		},
		show : function(columnName){
			var $gridId = $("#"+this.tagId);
			var idx = $gridId.parent().find("[data-column='"+columnName+"']").index();

			$gridId.children().each(function(){
				$(this).children().eq(idx).show();
			});
			$gridId.parent().find("thead").children().children().eq(idx).show();
		},
		getJsonData : function(){
			return $("#"+this.tagId).data(GRID_JSON_DATA);
		},
	};


	/* 콤보박스 바인드 기능 NEW 버전 */
	var ComboBind = function(tagId){
		this.tagId = tagId; //셀렉트박스의 id 속성
		this.param = {}; // 컨트롤러쪽으로 보낼 파라메터
		this.url   = "/defualtCodeList.do"; //기본으로 설정된 콘트롤러 주소
		this.option = {
			inputName : '', // 셀렉트박스의 name 속성
			valueKey : 'CODE_VAL', //셀렉트 박스의 value 키값
			textKey : 'CODE_NAME', //셀렉트박스의 text 키값
			defaultValue : '전체', //셀렉트박스에 보여줄 기본 값
			defaultConfig : true, //셀렉트박스의 기본값 설정 유무
			selectValue : '' //셀렉트박스에 데이터바인딩 후 선택될
		};
		this.filter = [];
		this.jsonData = {};
		this.data = [];
		this.callbackFunc = null;

	};

	ComboBind.prototype = {
			controller : function(url){
				this.url = url;
			},
			setComboName : function(inputName){
				this.option["inputName"] = inputName;
			},
			setDefualt : function(defaultConfig){;
				this.option["defaultConfig"] = defaultConfig;
			},
			setValueKey : function(valKey){;
				this.option["valueKey"] = valKey;
			},
			setTextKey : function(txtKey){
				this.option["textKey"] = txtKey;
			},
			setDefaultVal : function(defaultValue){
				this.option["defaultValue"] = defaultValue;
			},
			setParam : function(param){
				this.param = param;
			},
			selected : function(selectValue){
				this.option["selectValue"] = selectValue;
			},
			setFilter : function(filter){
				this.filter = filter;
			},
			setJsonData : function(data){
				this.jsonData = data;
			},
			setData : function(data){
				this.data = data;
			},
			setCallbackFunc : function(callbackFuncName){
				this.callbackFunc = callbackFuncName;
			},
			onSuccess:function(json){
				var _tagId  = this.tagId;
				var _url    = this.url;
				var _param  = this.param;
				var _option = this.option;
				var _filter = this.filter;
				var _callbackFunc = this.callbackFunc;
				var combo = this;
				
		    	combo.setJsonData(json.resultList);

		    	var arrHtml = [];
		    	//셀렉트박스의 기본값 설정
		    	if(_option["defaultConfig"]){
		    		arrHtml.push("<option value=\"\">"+_option["defaultValue"]+"</option>");
		    	}
		    	//셀렉트박스 내용 설정
		    	for(var i=0; i<json.resultList.length; i++){
		    		arrHtml.push("<option value='"+json.resultList[i][_option["valueKey"]]+"' >" /*id='"+json.resultList[i][_option["valueKey"]]+"'*/
		    				     +json.resultList[i][_option["textKey"]]+"</option>");
//		    		arrHtml.push(json.resultList[i][_option["textKey"]]);
//		    		arrHtml.push("</option>");
		    	}
		    	combo.setData(arrHtml);


		    	// id or name으로 셀렉트박스 데이터 바인딩
		    	if(_tagId){
		    		if(_option["defaultConfig"]){
		    			$("#"+_tagId).html(arrHtml.join("")).val(_option["selectValue"]);
		    		}else{
			    		if(_option["selectValue"]){
			    			$("#"+_tagId).html(arrHtml.join("")).val(_option["selectValue"]);
			    		}else{
			    			$("#"+_tagId).html(arrHtml.join("")).val(json.resultList[0][_option["valueKey"]]);
			    		}
		    		}
		    	}else{
		    		$("select[name='"+_option["inputName"]+"']").html(arrHtml.join("")).val(_option["selectValue"]);
		    	}

		    	if(_filter.length>0){
		    		for(var i=0; i<_filter.length; i++){
		    			$("#"+_tagId + " option[value=" + _filter[i] + "]").remove();
		    		}
		    	}

		    	if(_callbackFunc != null){
		    		eval(_callbackFunc + "()");
		    	}
		    
			},
			bind : function(){
				var _tagId  = this.tagId;
				var _url    = this.url;
				var _param  = this.param;
				var _option = this.option;
				var _filter = this.filter;
				var _callbackFunc = this.callbackFunc;
				var combo = this;

				$.ajax({
					type: "get",
					url: _url,
					data: _param,
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					error : function( jqXHR, textStatus, errorThrown ) {
			    		//alert( jqXHR.responseText );
			    		console.log("ajax error statusText : " + jqXHR.statusText);
			    		console.log("ajax error responseText : " + jqXHR.responseText);
			    		console.log("ajax error readyState : " + jqXHR.readyState);
			    		console.log("ajax error textStatus : " + textStatus);
			    		console.log("ajax error errorThrown : " + errorThrown);
			    	},
				    success: function (json) {
				    	combo.onSuccess(json);
				    }
				});
			}
	};

	// 그리드id, 파라메터, 그리드 옵션, ajax처리후 콜백함수
	function sendGridAjax(gridId, param, option, callbackFunction, notFoundMsg){

		if(isNaN(param.CurPage)){
			param.CurPage = 1;
		}
		$.ajax({
			type: "get",
			url: option.url,
			data: param,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			beforeSend: function (xhr) {
				var token = localStorage.getItem("epsav_token");
				if(token !== null)
					xhr.setRequestHeader("Authorization",token);
				//xhr.setRequestHeader(  $("meta[name='_csrf_header']").attr("content"), $('meta[name="_csrf"]').attr('content') );
			},
			error : function( jqXHR, textStatus, errorThrown ) {
	    		//alert( jqXHR.responseText );
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
			},
			complete : function(xhr){
				var token = xhr.getResponseHeader("extened-time-token");
				console.log(token);
				if(token !== null)
				xhr.setRequestHeader("Authorization",token);	
			},
		    success: function (json) {
				if(json.resultList.length > 0){
					if(option.scrollSupport){
						jsonGridBindAppend(gridId, json.resultList);
					}else{
						jsonGridBind(gridId, json.resultList);
					}

					if(option.pagingSupport){
						jsonPagingBind(option.pagingDispId, json[JSON_COUNT_DATA], option.currentPage, param[PARAM_ROWCOUNT]);
						$("#"+gridId+"Info").text("총 "+json[JSON_COUNT_DATA] +"건"+" 현재 "+option.currentPage+" 페이지");
					}else{
						$("#"+gridId+"Info").text("총 "+json.resultList.length +"건");
					}

					if(option.headerFixSupport){
						gridWidthSync(gridId);
					}

					gridDataSort();	//헤더클릭시 정렬기능 이벤트 처리
				}else{
					if(notFoundMsg != ''){
						alert(notFoundMsg);
					}
					$("#"+gridId).filter("[jqgrid='true']").each(function(){
						$("#"+gridId).jqGrid("clearGridData", true);
						jsonGridBind(gridId, json.resultList);
					});

					$("#"+gridId).filter("[data-listbind='true']").each(function(){
						$("#"+gridId).empty();
					});

					if(option.scrollSupport){
						alert("더 이상 데이터가 없습니다.");
					}else{
						//$("#"+option.pagingDispId).html("");
						gridEmptyDisplay(gridId);
					}
				}

				if(callbackFunction!=undefined){
					callbackFunction(json);
				}
		    }
		});

	}

	// jquery.form.js 을 사용한 비동기 파일업로드 처리 기능
	function sendFormAjax(formId, sendUrl, successFunction, failFunction){
		var $formObj = $("#"+formId);
		$formObj.ajaxForm({
			type: "post",
			url: sendUrl,
			dataType: "json",
			uploadProgress: function(event, position, total, percentComplete){
				//$("<br/><span>position : "+position+" / total : "+total+" / percentComplete : "+percentComplete+"</span>").appendTo("body");
		    },
			beforeSubmit:function() {
				displayLoading(true);
		    },

		    error : function( jqXHR, textStatus, errorThrown ) {
		        if(failFunction){
		        	console.log("ajax error statusText : " + jqXHR.statusText);
		    		console.log("ajax error responseText : " + jqXHR.responseText);
		    		console.log("ajax error readyState : " + jqXHR.readyState);
		    		console.log("ajax error textStatus : " + textStatus);
		    		console.log("ajax error errorThrown : " + errorThrown);
		        	//eval(failFunction+"(jqXHR,textStatus,errorThrown)");
		        }else{
					//alert(JSON.stringify(a));
					//alert('오류가 발생했습니다. 다시 시도해 주십시요.');
		        }
		        displayLoading(false);
		    },
		    success: function (data) {
	    		if(successFunction){
		    		eval(successFunction+"(data)");
		    	}

		    	displayLoading(false);
		    }
		});
	}

	//json Ajax send
	function sendJsonAjax(sendUrl, param, successFunction){
		$.ajax({
			type: "post",
			url: sendUrl,
			data: param["map"],
			dataType: "json",
			error : function( jqXHR, textStatus, errorThrown ) {
	    		//alert( jqXHR.responseText );
	    		console.log("ajax error status : " + jqXHR.status);
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    	},
		    success: function (json) {
	    		if(successFunction != null){
		    		eval(successFunction+"(json)");
		    	}
		    }
		});
	}

	//json Ajax send
	function sendJsonAjaxSetCombo(sendUrl, param, comboData, code, nm){
		$.ajax({
			type: "post",
			url: sendUrl,
			data: param["map"],
			dataType: "json",
			error : function( jqXHR, textStatus, errorThrown ) {
	    		//alert( jqXHR.responseText );
	    		console.log("ajax error status : " + jqXHR.status);
	    		console.log("ajax error statusText : " + jqXHR.statusText);
	    		console.log("ajax error responseText : " + jqXHR.responseText);
	    		console.log("ajax error readyState : " + jqXHR.readyState);
	    		console.log("ajax error textStatus : " + textStatus);
	    		console.log("ajax error errorThrown : " + errorThrown);
	    	},
		    success: function (json) {

		    	$.each(json.resultList, function () {
					//console.log(this.comnCode);
					//console.log(this.comnNm);
					eval(comboData)[eval("this." + code)] = eval("this." + nm);
				});
		    }
		});
	}

	//html ajax get
	function getAjaxHtml(htmlUrl, tagId){
		$.ajax({
			type: "post",
			async: false,
			url: htmlUrl,
			dataType: "html",
		    success: function(html) {
				if(tagId!=null){
					$("#"+tagId).html(html);
				}else{
					$("body").append(html);
				}
		    }
		});
	}

	/* iframe으로 html 파일을 갖고와 화면에 레이어로 보여준다. */
	function getIframeHtml(pageUrl, tagId){
		var iframeId = tagId + "_iFrame";
		var $layer = $("#"+tagId);
		$layer.html("<div class=\"fr btn glyphicon glyphicon-remove\" onclick=\"$('#"+tagId+"').fadeOut('500');\"></div>");
		//$layer.html("<div class=\"fr btn\" onclick=\"$('#"+tagId+"').fadeOut('500');\"></div>");
		$layer.append("<iframe id=\""+iframeId+"\" style=\"border:none\"></iframe>");
		//$layer.append("<iframe id=\""+iframeId+"\" ></iframe>");

		var $iframe = $("#"+iframeId);
		$iframe.attr("src", pageUrl);
		$iframe.attr("width", "100%");
		$iframe.attr("height", "470");

		var winWid = $(window).width();
		var winHig = $(window).height();
		var layWid = $layer.width();
		var layHig = $layer.height();

		$layer.draggable({handel:"p"});	//레이어 이동 기능
		$layer.resizable({
			maxHeight: winHig,
			maxWidth: winWid,
			minHeight: layHig,
			minWidth: layWid
		});

		$layer.fadeIn("500").css({
			"position":"absolute",
			"top" : (winHig-layHig)/2,
			"left": (winWid-layWid)/2
		});

	}

	function displayLoading(type){
		if(type){
			$.blockUI({ message: 'Waiting..' });
		}else{
			$.unblockUI();
		}
	}

	// json Grid 구현
	function jsonGridBind(gridId, data){
		var $selecter = $("#"+gridId);

		$selecter.data(GRID_JSON_DATA, data);	//json값을 그리드의 id.data에 저장한다.

		var gridRowHtml = $.data(document, gridId); //setGridConfig 함수에서 저장된 ROW 태그

		var arrTagInfo = [];
		var dataLength = data.length;

		for(var i=0; i<dataLength; i++){
			$("#"+gridId).jqGrid('addRowData',i+1,data[i]);
			//console.log("data[i] : " + JSON.stringify(data[i]));
		}

		$selecter.filter("[jqgrid='true']").each(function(){
			$("#"+gridId).jqGrid('clearGridData');
			$("#"+gridId).jqGrid('setGridParam', { datatype: 'local', data: data }).trigger('reloadGrid');
		});

		$selecter.filter("[data-listbind='true']").each(function(){

			$selecter.empty();
			for ( var i = 0; i < dataLength; i++) {
				var tmpHtml = gridRowHtml;
				for (var prop in data[i]) {
					tmpHtml = tmpHtml.split(COL_LEFT_TAG + prop + COL_RIGHT_TAG).join(data[i][prop]);
					//console.log(tmpHtml);
				}

				var startIdx = tmpHtml.indexOf(COL_LEFT_TAG + COL_NAME);
				var endIdx = tmpHtml.indexOf(COL_RIGHT_TAG) + 1;
				if(startIdx > -1){

					while(startIdx != -1){
						var replaceTxt = tmpHtml.substring(startIdx, endIdx);
						tmpHtml = tmpHtml.replace(replaceTxt,"");

						startIdx = tmpHtml.indexOf(COL_LEFT_TAG + COL_NAME);
					}
				}
				//console.log(tmpHtml);
				arrTagInfo.push(tmpHtml);
			}
			$selecter.html(arrTagInfo.join(""));

			$selecter.filter("[trColorChange='gridCgOpdyListRowColorChange']").each(function(){
				gridCgOpdyListRowColorChange();
			});

			$selecter.filter("[trColorChange='gridCasltListRowColorChange']").each(function(){
				gridCasltListRowColorChange();
			});
		});
	}

	// json Grid 구현
	function jsonGridPopBind(parentObj, gridId, data){
		var pDocument = parentObj.document;
		var $selecter = $("#"+gridId, pDocument);

		eval("parentObj.parent." + parentObj.name + "." + "setGridJsonData")(gridId, data);

		var gridRowHtml = $.data(pDocument, gridId); //setGridConfig 함수에서 저장된 ROW 태그

		var arrTagInfo = [];
		var dataLength = data.length;

		for(var i=0; i<dataLength; i++){
			$("#"+gridId, pDocument).jqGrid('addRowData',i+1,data[i]);
			console.log("data[i] : " + JSON.stringify(data[i]));
		}

		$selecter.filter("[jqgrid='true']").each(function(){
			//$("#"+gridId, pDocument).jqGrid('clearGridData');
			//$("#"+gridId, pDocument).jqGrid('setGridParam', { datatype: 'local', data: data }).trigger('reloadGrid');

			eval("parentObj.parent." + parentObj.name + "." + "clearGrid")(gridId, data);

		});

		$selecter.filter("[data-listbind='true']").each(function(){

			$selecter.empty();
			for ( var i = 0; i < dataLength; i++) {
				var tmpHtml = gridRowHtml;
				for (var prop in data[i]) {
					tmpHtml = tmpHtml.split(COL_LEFT_TAG + prop + COL_RIGHT_TAG).join(data[i][prop]);
					//console.log(tmpHtml);
				}

				var startIdx = tmpHtml.indexOf(COL_LEFT_TAG + COL_NAME);
				var endIdx = tmpHtml.indexOf(COL_RIGHT_TAG) + 1;
				if(startIdx > -1){

					while(startIdx != -1){
						var replaceTxt = tmpHtml.substring(startIdx, endIdx);
						tmpHtml = tmpHtml.replace(replaceTxt,"");

						startIdx = tmpHtml.indexOf(COL_LEFT_TAG + COL_NAME);
					}
				}
				//console.log(tmpHtml);
				arrTagInfo.push(tmpHtml);
			}
			$selecter.html(arrTagInfo.join(""));

			$selecter.filter("[trColorChange='gridCgOpdyListRowColorChange']").each(function(){
				gridCgOpdyListRowColorChange();
			});

			$selecter.filter("[trColorChange='gridCasltListRowColorChange']").each(function(){
				gridCasltListRowColorChange();
			});
		});
	}

	// json Grid Append 구현
	function jsonGridBindAppend(gridId, data){
		var $selecter = $("#"+gridId);
		var gridTag = $.data(document, gridId); //setGridConfig 함수에서 저장된 ROW 태그
		var arrTagInfo = [];
		var dataLenth = data.length;

		if($selecter.data(GRID_JSON_DATA) == undefined){
			$selecter.data(GRID_JSON_DATA, data);	//json값을 그리드의 id.data에 저장한다.
		}else{
			$.merge($selecter.data(GRID_JSON_DATA), data); // 기존의 json값과 새로운 json값 병합
		}

		for ( var i = 0; i < dataLenth; i++) {
			var tmpHtml = gridTag;
			for (var prop in data[i]) {
				tmpHtml = tmpHtml.split(COL_LEFT_TAG + COL_NAME + prop.toUpperCase() + COL_RIGHT_TAG).join(data[i][prop]);
			}

			var startIdx = tmpHtml.indexOf(COL_LEFT_TAG + COL_NAME);
			var endIdx = tmpHtml.indexOf(COL_RIGHT_TAG) + 1;
			if(startIdx > -1){

				while(startIdx != -1){
					var replaceTxt = tmpHtml.substring(startIdx, endIdx);
					tmpHtml = tmpHtml.replace(replaceTxt,"");

					startIdx = tmpHtml.indexOf(COL_LEFT_TAG + COL_NAME);
				}
			}

			arrTagInfo.push(tmpHtml);
		}
		$selecter.append(arrTagInfo.join(""));
	}

	// json 그리드의 페이징 처리
	function jsonPagingBind(tagId, rowCount, nowPage, viewRow){
		var pagingNumCnt = 4;	// 보여줄 페이지의 수 (n페이지씩 보여줌)
		var lastPage = Math.ceil(rowCount/viewRow);	//마지막페이지
		var pageIndex = Math.ceil(nowPage/pagingNumCnt);	//페이지 시작 위치
		var beginIndex = (pageIndex == 1)?1:(pageIndex-1) * pagingNumCnt + 1; //페이지 이전,현재,다음 위치
		var arrHtml = [];

		arrHtml.push("<ul  class=\"pagination\">");
		arrHtml.push("<li><a href=\"#1\" data-pageNo=\"1\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>");
		if(beginIndex>1){
			arrHtml.push("<li><a href=\"#"+(beginIndex-1)+"\" data-pageNo='"+(beginIndex-1)+"' >Prev</a></li>");
		}
		for(var i = beginIndex; i < beginIndex + pagingNumCnt; i++){
			if(i<=lastPage){
				arrHtml.push("<li><a href=\"#"+i+"\" data-pageNo="+i+" >"+i+"</a></li>");
			}
		}
		if(pageIndex != Math.ceil(lastPage/pagingNumCnt)){
			arrHtml.push("<li><a href=\"#"+(beginIndex+pagingNumCnt)+"\" data-pageNo='"+(beginIndex+pagingNumCnt)+"' >Next</a></li>");
		}
		arrHtml.push("<li><a href=\"#"+lastPage+"\" data-pageNo='"+lastPage+"' aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li>");
		arrHtml.push("</ul>");

		$("#"+tagId).html(arrHtml.join("")).find("li").each(function(){
			if($(this).text()==nowPage ){
				$(this).addClass("active");
			}
		});
	}

	// 그리드에 데이터가 없을때 보여줄 처리
	function gridEmptyDisplay(tagId){

		var html = $.parseHTML($.data(document, tagId)),
		    nodeNames = [],
		    emptyTag = "";

		$.each( html, function( i, el ) {
			nodeNames[i] = el.nodeName;
		});

		if("#text"==nodeNames[0]){
			if("TR" == nodeNames[1]){
				emptyTag = "<tr class='ui-widget-content jqgrow ui-row-ltr'><td colspan='20' style='text-align:center;'>"+NO_DATA_MESSGE+"</td></tr>";
			}else{
				emptyTag = "<tr class='ui-widget-content jqgrow ui-row-ltr'><td colspan='20' style='text-align:center;'>"+NO_DATA_MESSGE+"</td></tr>";
			}
		}else{
			if("TR" == nodeNames[0]){
				emptyTag = "<tr class='ui-widget-content jqgrow ui-row-ltr'><td colspan='20' style='text-align:center;'>"+NO_DATA_MESSGE+"</td></tr>";
			}else{
				emptyTag = "<tr class='ui-widget-content jqgrow ui-row-ltr'><td colspan='20' style='text-align:center;'>"+NO_DATA_MESSGE+"</td></tr>";
			}
		}

		//$("#"+tagId).removeData().html(emptyTag);

		$("#"+tagId).find(".jqgfirstrow").after(emptyTag);

	}

//		그리드 헤더 고정시 컬럼 width 동기화 하기 위한 기능
	function gridWidthSync(tagId){
		var widths = [];
		/*
		$("#"+tagId+"> tr:eq(0)").children().each( function(i, element) {
			widths[i] = $(element).width();
		});
		$("#"+tagId).parent().parent().prev().find("thead > tr:eq(0)").children().each( function(i, element) {
			$(element).css("width", widths[i] + "px");
		});
		*/

		$("#"+tagId).parent().parent().prev().find("thead > tr:eq(0)").children().each( function(i, element) {
			widths[i] = $(element).width();
		});

		$("#"+tagId+"> tr:eq(0)").children().each( function(i, element) {
			$(element).css("width", widths[i] + "px");
		});

	}

	//  그리드 헤더 고정 처리(헤더테이블, 바디테이블)분리
	function gridHeaderFixed(tagId, height){
		var $tagId = $("#"+tagId);
		var gridWidth = $tagId.parent().css("width");
		var tableCss = $tagId.parent().attr("class");

		$tagId.unwrap();
		$tagId.prev().wrap("<table class=\""+tableCss+"\" style=\"margin-bottom:0px;\"></table>");
		$tagId.wrap("<div><table class=\""+tableCss+"\"></table></div>");
		$tagId.parent().css("width", gridWidth);
		$tagId.parent().parent().css("height", height);
		$tagId.parent().parent().css("overflow-y", "scroll");
	}


//		그리드 내용 정렬 기능
	function gridDataSort(){

		var b_sort = true;	//오름,내림 기억 플래그
		var $header = $("[data-headersort]");

		$header.off("click").on("click" ,function(e){
			var gridId = this.getAttribute("data-headersort");
			var jsonData = $("#"+gridId).data(GRID_JSON_DATA);
			var columnKey = e.target.getAttribute("data-column");

			if(b_sort){
				jsonData.sort(function(a,b) {
				    if (a[columnKey] < b[columnKey]){
				    	return 1;
				    }
				    if(a[columnKey] > b[columnKey]){
				    	return -1;
				    }
				    return 0;
				});
				b_sort = false;
			}else{
				jsonData.sort(function(a,b) {
				    if (a[columnKey] < b[columnKey]){
				    	return -1;
				    }
				    if(a[columnKey] > b[columnKey]){
				    	return 1;
				    }
				    return 0;
				});

				b_sort = true;
			}

			jsonGridBind(gridId, jsonData);

		}).css("cursor","pointer");
	}

	/* 그리드의 데이터 이동시 사용한다. */
	function rowDataMove(fromGridId, toGridId){
		var arrMoveData = [];
		var $selecter = $("#"+fromGridId);

		$selecter.find(":checkbox").each(function(i){
			if(this.checked){
				arrMoveData.push($selecter.data(GRID_JSON_DATA)[i]);
			}
		});
		//console.log(JSON.stringify(arrMoveData));
		jsonGridBind(toGridId, arrMoveData);
	}

	/* 그리드의 데이터 추가시 사용한다. */
	function rowDataAdd(fromGridId, toGridId, uniqueId){

		console.log(JSON.stringify($("#"+toGridId)));

		var arrMoveData = $("#"+toGridId).data(GRID_JSON_DATA);
		console.log(arrMoveData);

		var $selecter = $("#"+fromGridId);

		$selecter.find(":checkbox").each(function(i){
			var sameCnt = 0;

			if(this.checked){
				for(var j in arrMoveData){
					if($selecter.data(GRID_JSON_DATA)[i][uniqueId] == arrMoveData[j][uniqueId]){
						sameCnt++;
						continue;
					}
				}
				if(sameCnt == 0){
					arrMoveData.push($selecter.data(GRID_JSON_DATA)[i]);
				}
			}
		});

		//console.log(JSON.stringify(arrMoveData));
		jsonGridBind(toGridId, arrMoveData);
	}


	/* 그리드의 데이터 추가시 사용한다. */
	function rowDataPopAdd(fromGridId, toGridId, parentObj, selIdxes, uniqueId){
		var arrMoveData = eval("parentObj.parent." + parentObj.name + "." + "listBind.getJsonData()");
		var $selecter = $("#"+fromGridId);

		//console.log(JSON.stringify($("#"+fromGridId)));

		var totRows = $selecter.jqGrid('getGridParam', 'records');
		var grdData = $selecter.jqGrid('getGridParam', 'data');
		var indexes = $selecter.jqGrid('getGridParam', '_index');
		var selIdx = selIdxes.split(",");

		for(var i=0; i<selIdx.length; i++)
		{
			var sameCnt = 0;
			if(selIdx[i] == ""){
				continue;
			}
			var idx = selIdx[i]-1;
			var choseRowData = grdData[idx];
			console.log("common choseRowData : " + JSON.stringify(choseRowData));

			for(var j in arrMoveData){
				if(grdData[idx][uniqueId] == arrMoveData[j][uniqueId]){
					console.log(grdData[idx][uniqueId] + " VS " + arrMoveData[j][uniqueId]);
					sameCnt++;
					continue;
				}
			}
			if(sameCnt == 0){
				arrMoveData.push(grdData[idx]);
			}
		}

		//console.log("arrMoveData : " + JSON.stringify(arrMoveData));
		jsonGridPopBind(parentObj, toGridId, arrMoveData);
	}

//		그리드 내용 삭제
	function rowRemove(gridId){
		var arrMoveData = [];
		var $selecter = $("#"+gridId);

		$selecter.find(":checkbox").each(function(i){
			if(!this.checked){
				arrMoveData.push($selecter.data(GRID_JSON_DATA)[i]);
			}
		});
		//console.log(JSON.stringify(arrMoveData));
		jsonGridBind(gridId, arrMoveData);
	}

//		그리드 다건 json 리턴
	function getRowsData(gridId){
		var arrMoveData = [];
		var $selecter = $("#"+gridId);

		$selecter.find(":checkbox").each(function(i){
			if(this.checked){
				arrMoveData.push($selecter.data(GRID_JSON_DATA)[i]);
			}
		});

		return arrMoveData;
	}

//		그리드 단건 json 리턴
	function getRowData(gridId, idx){
		return $("#"+gridId).data(GRID_JSON_DATA)[idx];
	}

	// json의 KEY값과 html 태그의 ID값이 일치하면 매핑해준다.
	function jsonAutoMapping(json, areaId){
		var $selecter = null;

		if(areaId != ""){
			$selecter = $("#"+areaId);
		}else{
			$selecter = $("body");
		}

		for(var prop in json){
			var $element = $selecter.find("[id='"+prop+"']");
			var _TagName = $element.prop("tagName");

			//alert(_TagName);

			if(_TagName == "INPUT"){
				var _Type = $element.attr("type");
				if(_Type == "text" || _Type == "hidden" || _Type == "password" || _Type == "date" || _Type == "time"){
					$element.val(tagChange(json[prop]));
				}else if(_Type == "radio"){
					var _Name = $element.attr("name");
					$selecter.find("[name='"+_Name+"'][value='"+json[prop]+"']").prop("checked", true);
				}else if(_Type == "checkbox"){
					// 맞나? 다시 재확인해야함
					$selecter.find("[id='"+prop+"'][value='"+json[prop]+"']").prop("checked", true);
				}

			}else if(_TagName == "SELECT"){
				$element.val(json[prop]);
			}else if(_TagName == "TEXTAREA"){
				$element.val(tagChange(json[prop]));
			}else{
				$element.text(json[prop]);
			}
		}


	}

	// 특정 범위의 input 폼들의 초기화 처리
	function initForm(areaId){
		var $selecter = null;

		if(areaId != ""){
			$selecter = $("#"+areaId);
		}else{
			$selecter = $("body");
		}

		$selecter.find("input, select, textarea").each(function(){
			var $formObject = $(this);
			var formTag = $formObject.prop("tagName");

			if(formTag == "INPUT"){
				var formType = $formObject.attr("type");
				if(formType == "text" || formType == "password" || formType == "hidden" || formType == "file"){
					$formObject.val("");
				}else if(formType == "checkbox"){
					$formObject.prop("checked", false);
				}else if(formType == "radio"){
					$formObject.prop("checked", false);
				}
			}else if(formTag == "SELECT"){
				$formObject.val("");
			}else if(formTag == "TEXTAREA"){
				$formObject.val("");
			}
		});

	}

	//특정 범위의 input 폼들의 수정 시 그리드 반영 처리
	function formChangeSet(areaId, programId){
		var $selecter = null;

		if(areaId != ""){
			$selecter = $("#"+areaId);
		}else{
			$selecter = $("body");
		}

		$selecter.find("input, select, textarea").each(function(){
			var $formObject = $(this);
			var formTag = $formObject.prop("tagName");

			if(formTag == "INPUT"){
				var formType = $formObject.attr("type");
				if(formType == "text" || formType == "password" || formType == "hidden" || formType == "file"
					|| formType == "checkbox" || formType == "radio"){
					if($formObject.attr("id") != undefined){
						$("#" + $formObject.attr("id")).on("change", function(e) { eval(programId).setGridValue();} );
					}else{
						$("input:radio[name='" + $formObject.attr("name") + "']").on("change", function(e) { eval(programId).setGridValue();} );
					}
				}
			}else if(formTag == "SELECT" || formTag == "TEXTAREA"){
				if($formObject.attr("id") != undefined){
					$("#" + $formObject.attr("id")).on("change", function(e) { eval(programId).setGridValue();} );
				}
			}
		});
	}

	//특정 범위의 input 폼들의 비활성화 처리
	function inputFormCtrl(areaId, programId, openTF){
		var $selecter = null;

		if(areaId != ""){
			$selecter = $("#"+areaId);
		}else{
			$selecter = $("body");
		}

		$selecter.find("input, select, textarea").each(function(){
			var $formObject = $(this);
			var formTag = $formObject.prop("tagName");

			if(formTag == "INPUT"){
				var formType = $formObject.attr("type");
				if(formType == "text" || formType == "password" || formType == "hidden" || formType == "file"
					|| formType == "checkbox" || formType == "radio"){
					if($formObject.attr("id") != undefined){
						$("#" + $formObject.attr("id")).attr("disabled", openTF);
					}else{
						$("input:radio[name='" + $formObject.attr("name") + "']").attr("disabled", openTF);
					}
				}
			}else if(formTag == "SELECT" || formTag == "TEXTAREA"){
				if($formObject.attr("id") != undefined){
					$("#" + $formObject.attr("id")).attr("disabled", openTF);
				}
			}
		});
	}

	//특정 범위의 input 폼들의 읽기전용 처리
	function inputFormReadOnlyCtrl(areaId, programId, openTF){
		var $selecter = null;

		if(areaId != ""){
			$selecter = $("#"+areaId);
		}else{
			$selecter = $("body");
		}

		$selecter.find("input, select, textarea").each(function(){
			var $formObject = $(this);
			var formTag = $formObject.prop("tagName");

			if(formTag == "INPUT"){
				var formType = $formObject.attr("type");
				if(formType == "text" || formType == "password" || formType == "hidden" || formType == "file"
					|| formType == "checkbox" || formType == "radio"){
					if($formObject.attr("id") != undefined){
						$("#" + $formObject.attr("id")).attr("readonly", openTF);
					}else{
						$("input:radio[name='" + $formObject.attr("name") + "']").attr("disabled", openTF);
					}
				}
			}else if(formTag == "SELECT" || formTag == "TEXTAREA"){
				if($formObject.attr("id") != undefined){
					$("#" + $formObject.attr("id")).attr("disabled", openTF);
				}
			}
		});
	}


	// 특정 범위의 input 폼들의 ID와 VALUE값으로 json값의 형태로 리턴해준다.
	function setAreaParamData(param, areaId){
		var $area;
		console.log(areaId);
		if(areaId){
			$area = $('#'+areaId);
		}else{
			$area = $('body');
		}

		$area.find(":text,:password").each(function(){
			var obj = this;
			var value = obj.value;
			var id = changeIdName(obj.getAttribute("id"));
			
			if($("#"+obj.id).filter('.num').length > 0){
				var rgx1 = /\D/g;
			    value = value.replace(rgx1,"");
			    param.put(id, value);
			}else{
				param.put(id, value);
			}
		});

		$area.find("[type='hidden']").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			param.put(id, obj.value);
		});

		$area.find("[type='date']").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			param.put(id, obj.value);
		});

		$area.find("[type='time']").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			param.put(id, obj.value);
		});

		$area.find(":checkbox").each(function(){
			var obj = this;
			if(obj.checked == true){
				var id = changeIdName(obj.getAttribute("id"));
				param.put(id, obj.value);
			}
		});
		$area.find(":radio").each(function(){
			var obj = this;
			if(obj.checked == true){
				var id = changeIdName(obj.getAttribute("name"));
				param.put(id, obj.value);
			}
		});
		$area.find("select").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			param.put(id, obj.value);
		});
		$area.find("textarea").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			param.put(id, obj.value);	// \n 특수기호 처리해야함

		});

		//alert(JSON.stringify(param));
		return param;
	}

	// 특정 범위의 input 폼들의 ID와 VALUE값으로 json값의 형태로 리턴해준다. 값이 공백이 아닌 것만
	function setAreaParamDataWithoutEmpty(param, areaId){
		var $area;
		if(areaId){
			$area = $('#'+areaId);
		}else{
			$area = $('body');
		}

		$area.find(":text,:password").each(function(){
			var obj = this;
			var value = obj.value;
			var id = changeIdName(obj.getAttribute("id"));
			if($("#"+obj.id).filter('.num').length > 0){
				var rgx1 = /\D/g;
			    value = value.replace(rgx1,"");
			    if(value != ""){
			    	param.put(id, value);
			    }
			}else{
				if(value != ""){
			    	param.put(id, value);
			    }
			}
		});

		$area.find("[type='hidden']").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			if(obj.value != ""){
				param.put(id, obj.value);
		    }
		});

		$area.find("[type='date']").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			if(obj.value != ""){
				param.put(id, obj.value);
		    }
		});

		$area.find("[type='time']").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			if(obj.value != ""){
				param.put(id, obj.value);
		    }
		});

		$area.find(":checkbox").each(function(){
			var obj = this;
			if(obj.checked == true){
				var id = changeIdName(obj.getAttribute("id"));
				if(obj.value != ""){
					param.put(id, obj.value);
			    }
			}
		});
		$area.find(":radio").each(function(){
			var obj = this;
			if(obj.checked == true){
				var id = changeIdName(obj.getAttribute("name"));
				if(obj.value != ""){
					param.put(id, obj.value);
			    }
			}
		});
		$area.find("select").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			if(obj.value != ""){
				param.put(id, obj.value);
		    }
		});
		$area.find("textarea").each(function(){
			var obj = this;
			var id = changeIdName(obj.getAttribute("id"));
			if(obj.value != ""){
				param.put(id, obj.value);
		    }	// \n 특수기호 처리해야함

		});

		//alert(JSON.stringify(param));
		return param;
	}

	//조회 내역 필드 id 변경
	function changeIdName(id){

		var id = id.replace("search", "");

		var str = id.substr(0,1);
		str = str.toLowerCase();
		id = str + id.substr(1);

		return id;
	}
	
	//세자리 콤마 출력
	function makeComma(num){
		var len, point, str;
		str = "";
		if(num != null && num != undefined){
			num = num + "";
			
			//소수점 처리
			var tPoint = num.split(".");
			num = tPoint[0];
			
			point = num.length % 3;
			len = num.length;
	
			str = num.substring(0, point);
	
			while(point < len){
				if(str != "") str += ",";
				str += num.substring(point, point += 3);
			}
			
			if(tPoint[1] != null || tPoint[1] != undefined)
				str = str+"."+tPoint[1];
		}
		
		return str;


	}

	$(function(){
		  $('#popup__wrap').hide();
		  $('#popup__wrap4').hide()
		  $('#popup__wrap5').hide()
		  
		  $('#popup__wrap .popup_close').on('click',function(){
			  $('#popup__wrap').hide();
		  });  
		  
		  $('#popup__wrap4 .popup_close').on('click',function(){
			  $('#popup__wrap4').hide();
		  });  
		  
		  $('#popup__wrap5 .popup_close').on('click',function(){
			  $('#popup__wrap5').hide();
		  });  
		  
		  $('.popup__bottom .close').on('click',function(){
			  $('#popup__wrap').hide();
			  $('#popup__wrap4').hide();
			  $('#popup__wrap5').hide();
		  });
		  
		  
		  $('#view_popup').on('click',function(){
		    $('#popup__wrap').fadeIn();
		  });
		    
		  $('#view_roi').on('click',function(){
		    $('#popup__wrap').fadeIn();
		  });

		  // 채널목록 그리드
		  $('.btn__add').on('click',function(){
		    $('#popup__wrap').fadeIn();
		  });

		  // 채널 그룹 관리 수정,삭제
		  $('.box__list--hover').hide();
		  $('.infotbl').hover(function () {
		      // over
		      $('.box__list--hover').show();
		    }, function () {
		      // out
		      $('.box__list--hover').hide();
		    }
		  );
		  
		  /*
		  $('#synchro').on('click',function(){
			    $('#popup__wrap').fadeIn();
		   });
		  
*/		  
		  
		  // 좌측 사이드 패널
		  
		  var panelOpen = true;
		  $('.left__btn--close').click(function (e) { 
		    e.preventDefault();
		    if (panelOpen) {
		      $(this).addClass('open');
		      $('.left').stop(true,true).animate({'left':'10px'},500,function(){        
		        $('.center').addClass('leftnone_center');
		        panelOpen=false;
		      });      
		    } else {      
		      $(this).removeClass('open');
		      $('.left').stop(true,true).animate({'left':'-595px'},500,function(){        
		        $('.center').removeClass('leftnone_center');
		        panelOpen=true;
		      });
		    }
		  });
		  var rpanelOpen = true;
		  $('.right__btn--close').click(function (e) { 
		    e.preventDefault();
		    if (rpanelOpen) {
		      $(this).addClass('open');
		      $('.right').stop(true,true).animate({'right':'-455px'},500,function(){
		        $('.center').addClass('rightnone_center');
		        rpanelOpen=false;        
		      });      
		    } else {      
		      $(this).removeClass('open');
		      $('.right').stop(true,true).animate({'right':'10px'},500,function(){
		        $('.center').removeClass('rightnone_center');
		        rpanelOpen=true;
		      });
		    }
		  });
		  
		  
		});

     var alertDiv = "";
	 
//	 
//	 initmessagePop();