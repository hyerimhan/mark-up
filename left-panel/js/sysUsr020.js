/*=============================   Program description   ================================*
 * Program Group : 사용자관리
 * Program ID    : SysUsr010
 * Program Desc  : 사용자 관리 목록
 * Author        : 이중철
 * Create Date   : 2019.07.20
 * Change History
 *======================================================================================*
 * Change Date / Name / Desc
 *======================================================================================*
 * 2019.07.20 / 이중철 / 최초등록
 *======================================================================================*/


var programId = 'SysUsr020';
var programNm = '사용자 관리';


/****** 주화면 클래스 ******/
var SysUsr020 = {
	modelList: [
		{ name: 'no', colname: '순번', datatype: "number", key: false, required: false, width: 40, align: 'center' },
		{ name: 'userId', colname: '아이디', datatype: "string", key: false, required: true, strlen: 20, minlen: 6, width: 80, hidden: false, align: 'center' },
		{ name: 'korNm', colname: '성명(한글)', datatype: "string", key: false, required: false, strlen: 100, width: 80, hidden: false, align: 'center' },
		{ name: 'priTelNum', colname: '개인전화번호', datatype: "string", key: false, required: false, strlen: 20, width: 140, hidden: false, align: 'center' },
		{ name: 'idx', colname: '기본키', datatype: "number", key: true, required: true, hidden: true }
	],

	/****** 주화면 초기화 메소드 ******/
	init: function () {
		var self = this;
//		self.urlList = '/epsav/api/rest/sys/usr/sysUsr010';
		////////////////////// 좌측 검색창 //////////////////////////////////
//		buidSearchLeftFrm('leftSearchArea', programNm, self.modelSearch);
		$("#searchBtn").click(function () {
			
//			eval(programId).getDataList();
			self.getDataList();
		});
		////////////////////// 중앙 리스트창 //////////////////////////////////
		self.superinit(JsonGetArrayByKey(self.modelList, 'colname'), self.modelList);
		self.listBind.callbackFunction = self.callbackGridList;

		////////////////////// 신규저장창 //////////////////////////////////
//		self.frm.init();

	}
//	,
//	frm:
//	{
//		duplIdYn : true,
//		model: [
//			{ name: 'userId', colname: '아이디', datatype: "string", key: false, required: true, strlen: 20, minlen: 6 },
//			{ name: 'korNm', colname: '성명(한글)', datatype: "string", key: false, required: true, strlen: 100 },
//			{ name: 'engNm', colname: '성명(영어)', datatype: "string", key: false, required: false, strlen: 100 },
//			{ name: 'passwd', colname: '비밀번호', datatype: "string", key: false, required: true, strlen: 20, minlen: 6 },
//			{ name: 'vfpasswd', colname: '비밀번호', datatype: "string", key: false, required: true, strlen: 20, minlen: 6 },
//			{ name: 'priTelNum', colname: '개인 연락처', datatype: "string", key: false, required: false, strlen: 20, minlen: 9 },
//			{ name: 'bizTelNum', colname: '직장 연락처', datatype: "string", key: false, required: false, strlen: 20, minlen: 9 },
//			{ name: 'emailAddr', colname: '이메일', datatype: "string", key: false, required: false, strlen: 100, minlen: 9 },
//			{ name: 'intCd', colname: '회사명', datatype: "string", key: false, required: false, strlen: 20 },
//			{ name: 'deptCd', colname: '부서명', datatype: "string", key: false, required: false, strlen: 20 },
//			{ name: 'idx', colname: '기본키', datatype: "number", key: true, required: true },
//		],
//		init: function () {
//			var self = this;
//			////////////////////// 신규저장 //////////////////////////////////
//			/* 이벤트 바인딩 */
//			eval(programId).onRowDlClick = eval(programId).frm.onListRowDlClick;
//
//			$("#frmNewAndUpdate #chkDuplId").bind("click", function () {
//				self.onDuplicateKeyCheck();
//			});
//			
//			$("#btnNew").bind("click", function () {
//				self.onBtnClickNewData();
//			});
//
//			$("#btnClose").bind("click", function () {
//				self.onBtnClickClose();
//			});
//			$("#btn__submit").bind("click", function () {
//				self.onBtnClickSubmit();
//			});
//
//			$("#btn__cancle").bind("click", function () {
//				self.onBtnClickCancle();
//			});
//
//		},
//		onBtnClickSubmit: function () {
//			var self = this;
//			var idx = $("#frmNewAndUpdate #idx").val();
//			var model = {};
//			var param = {};
//			$.extend(true, model, eval(programId).frm.model);
//			if (idx.length > 0)
//				binsert = false;
//			else
//				binsert = true;
//			if (binsert)
//				model = MapGetIntersect(model, ['idx'], 'name', 'E');
//			else
//				model = MapGetIntersect(model, ['passwd', 'vfpasswd', 'userId'], 'name', 'E');
//			
//			var rtn = {};
//			rtn = $("#frmNewAndUpdate").ValidateAreaDataByMap(model, '', 'name');
//
//			if (rtn) {
//				param = $("#frmNewAndUpdate").BindAreaDataToJson(model, '', 'name');
//				if (binsert)
//					if(!self.duplIdYn)
//						AjaxRest.post('/epsav/api/rest/sys/usr/sysUsr010', JSON.stringify(param), [eval(programId).frm.onSuccessAjax], [eval(programId).frm.onFailAjax]);
//					else
//					alert('ID 중복체크를 선택하세요.');	
//				else
//					AjaxRest.put('/epsav/api/rest/sys/usr/sysUsr010/' + idx, JSON.stringify(param), [eval(programId).frm.onSuccessAjax], [eval(programId).frm.onFailAjax]);
//			}else{
//				alert(rtn['msg']);
//			}
//
//		},
//		onSuccessAjax : function(data) {			
//			if(data.Result === 'success'){
//			eval(programId).frm.onBtnClickClose();
//			eval(programId).getDataList();
//			}else{
//				alert('작업에 실패하였습니다.');
//			}
//		},
//		onFailAjax : function(data) {			
//			alert( "오류가 발생 하였습니다." );
//		},
//		onBtnClickClose: function () {
//			$('#frmNewAndUpdate #userId').prop('disabled', true);
//			$('#popup__wrap').hide();
//		},
//
//		onBtnClickNewData: function () {
//			$("#frmNewAndUpdate").ClearAreaDataByMap(eval(programId).frm.model, '', 'name');
//			eval(programId).frm.duplIdYn = true;			
//			$("#chkDuplId").show();
//			$(".passwdGroup").show();
//			$('#frmNewAndUpdate #userId').prop('disabled', false);
//			$("#btn__submit").prop('disabled', true);
//			$('#popup__wrap').show();
//		},
//		onDuplicateKeyCheck: function () {
//			var model = {};
//			var param = {};
//			$.extend(true, model, eval(programId).frm.model);
//			model = MapGetIntersect(model, ['userId'], 'name', 'I');
//			var rtn = {};
//			rtn = $("#frmNewAndUpdate").ValidateAreaDataByMap(model, '', 'name');
//			if (rtn) {
//				param = $("#frmNewAndUpdate").BindAreaDataToJson(model, '', 'name');
//				AjaxRest.get('/epsav/api/rest/sys/usr/sysUsr010/' + param.userId + '/userId' , '', [
//					function(data){
//						$("#frmNewAndUpdate #userId").focus();
//						if(data.Result > 0){
//							eval(programId).frm.duplIdYn = true; 
//							$("#btn__submit").prop('disabled', true);
//							alert('중복된 아이디가 있습니다.');
//						}
//						else
//						{
//							eval(programId).frm.duplIdYn = false;
//							$("#btn__submit").prop('disabled', false);
//							alert("해당 아이디는 사용이 가능합니다.");
//						}
//					}], [eval(programId).frm.onFailAjax]);
//			}else{
//				alert(rtn['msg']);
//			}
//	
//
//		},
//		onListRowDlClick: function (rowid, iRow, iCol, e) {
//			var rowdata = eval(programId).lstData[rowid - 1];
//			$("#chkDuplId").hide();
//			$(".passwdGroup").hide();
//			$("#frmNewAndUpdate").ClearAreaDataByMap(eval(programId).frm.model, '', 'name');
//			$("#frmNewAndUpdate").BindJsonToAreaData(rowdata, '');
//			$('#popup__wrap').show();
//		},
//		onBtnClickCancle: function () {
//			$('#popup__wrap').hide();
//		}
//	}

}

$.extend(true, SysUsr020, ClassDefaultListView);


$(document).ready(function () {
//	$("#top").renderBaseTop(programNm);
	$("#centerListView").renderBaseJqList(programNm);
	$.ajaxSetup({ async: false });
	resizeJqGridWidth('gridList', 'List', $('#List').width(), true);
	paging.init("divSearch", "paginate");
	SysUsr020.init();
	$("leftSearchArea").hide();
	$.ajaxSetup({ async: true });
});
$(window).on('load', function () {
});
