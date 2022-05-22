/*=============================   Program description   ================================*
 * Program Group : cmmn
 * Program ID    : cmmn
 * Program Desc  : 공통
 * Author        : 강효정
 * Create Date   : 2018.03.27
 * Change History
 *======================================================================================*
 * Change Date / Name / Desc
 *======================================================================================*
 * 2018.03.27 / 강효정 / js 분리
 *======================================================================================*/

/****** 주화면 클래스 ******/
var contextPath = ""; //window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
var cmmn = {
		/****** timeZone 메소드 ******/
		timeZone : function () {
			var Now = new Date();
			var NowTime = Now.getFullYear();
			NowTime += '년 ' + (Now.getMonth() + 1) ;
			NowTime += '월 ' + Now.getDate();
			NowTime += '일 ' + Now.getHours();
			NowTime += '시 ' + Now.getMinutes();
			NowTime += '분 ' + Now.getSeconds();
			NowTime += '초'
			$('#timezone').text(NowTime);
		},
		/****** timeZone 메소드 ******/
		hptime : function () {
			var Now = new Date();
			var NowTime = '현재시각 <span>' + Now.getHours();
			NowTime += ' : ' + Now.getMinutes();
			NowTime += ' : ' + Now.getSeconds();
			NowTime += '</span>';
			$('.time').html(NowTime);
		},
		/****** setDatePicker 메소드 ******/
		setDatePicker : function () {
			datePicker("startDate");
			datePicker("endDate");
			datePickerFuc("startDate","endDate");
			$("#startDate").attr("readonly" , true);
			$("#endDate").attr("readonly" , true);
			
			datePicker("pStartDate");
			datePicker("pEndDate");
			datePickerFuc("pStartDate","pEndDate");
			$("#pStartDate").attr("readonly" , true);
			$("#pEndDate").attr("readonly" , true);
		},
		/****** UIcollection 메소드 ******/
		UIcollection : function () {
			$("#searchBtn").click(function(){
				search();
			});
		},
		validEmail : function(email) {
		    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		    return re.test(email);
		},
		validCellPhone : function(phoneNumber) {
		    var re = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
		    return re.test(phoneNumber);
		},
		/****** setContextPath 메소드 ******/
		setContextPath : function(ctxPath) {
			contextPath = ctxPath;
		},
		jusoPopup : function() {
			var pop = window.open("/popup/jusoPopup.do","pop","width=570,height=420, scrollbars=yes, resizable=yes");
		},
		jusoCallBack : function(roadFullAddr,roadAddrPart1,addrDetail,roadAddrPart2,engAddr, jibunAddr, zipNo, admCd, rnMgtSn, bdMgtSn,detBdNmList,bdNm,bdKdcd,siNm,sggNm,emdNm,liNm,rn,udrtYn,buldMnnm,buldSlno,mtYn,lnbrMnnm,lnbrSlno,emdNo, flag) {
			if(flag == "siteList" ){
				$('#zipCode').val(zipNo);
				$('#sAddr').val(roadAddrPart1);
				$('#sAddr2').val(addrDetail);
			}else{
				$('#zipCode').val(zipNo);
				$('#mAddr').val(roadAddrPart1);
				$('#mAddr2').val(addrDetail);
			}

			eval(programId).setGridValue();
		}
	};

