var ClassDefaultListView = {
	listBind: null,
	searchParam: null,
	lstData: [],
	selIdx: null,
	urlList : '',
	onCompleteDataList : null,
	onRowClick : null,
	onRowDlClick : null,
	/****** 주화면 초기화 메소드 ******/
	superinit: function (colnames, colmodel) {
		/******  ******/
		var self = this;
//		eval(programId).listBind = new ListBind("gridList", false);
		self.listBind = new ListBind("gridList", false);

		panelOpen = true;
		$('.left__btn--close').click(function (e) {
			e.preventDefault();
			if (panelOpen) {
				$(this).addClass('open');
				$('.left').stop(true, true).animate({ 'left': '-265px' }, 500, function () {
					$('.center').addClass('leftnone_center');
					panelOpen = false;
				});
			} else {
				$(this).removeClass('open');
				$('.left').stop(true, true).animate({ 'left': '10px' }, 500, function () {
					$('.center').removeClass('leftnone_center');
					panelOpen = true;
				});
			}
		});

		/****** JQGRID 정의        ******/
		$("#gridList").jqGrid({
			//로컬그리드이용
			datatype: "json",
			//그리드 높이
			//height         :'182',
			height: '475',

			//컬럼명들
			autowidth: true,
			shrinkToFit: true,
			multiselect: false,
			rownumbers: false,

			rownumWidth: 40,
			rowNum: 40,
			//그리드타이틀
			caption: "",
			pager: "",
			viewrecords: true,
			hidegrid: true,

			colNames	:colnames,

			//컬럼모델
			colModel	:colmodel,
	
			loadComplete: function (data) {
			},
			onCellSelect: function (rowid, iCol) {
				self.selIdx = rowid;
				if(self.onRowClick !== null )
					self.onRowClick(rowid, iCol); 
			},
			ondblClickRow: function (rowid, iRow, iCol, e) {
				e.preventDefault();
				if(self.onRowDlClick !== null )
					self.onRowDlClick(rowid, iRow, iCol, e);
			},
		});

	},
	defCallback: function (data) {
		var self = (new Function('return ' + programId))();
		var allRowsInGrid = $('#gridList').jqGrid('getGridParam', 'records');
		self.lstData = $.extend(true, {}, data.resultList);
		paging.makePage(data);
		var totalPage = Math.ceil((data.dataCnt * 1)/ (data.params.scope * 1)); // 그리드 데이터 전체의 페이지 수
		var curPage = Math.ceil((data.resultList[0].no * 1)/ (data.params.scope * 1)); // 현재 페이지
		$("#girdCount").html(data.dataCnt); // 전체건수
		$("#curPage").html(curPage); // 현재 페이지	
		$("#allRow").html(totalPage); // 전체 페이지 수
		 
	},
	getDataList: function (area) {
		var self = this;
		/******  ******/	
//		$('#gridList').jqGrid('clearGridData');
		self.searchParam = new Map();	//파라메터 변수
		setAreaParamData(self.searchParam, "divSearch");
			
		self.listBind.controller(self.urlList);	//컨트롤러 url (페이징처리용)
		self.listBind.setCallBack(this.defCallback);
		
		self.listBind.setParam(self.searchParam);	//컨트롤러로 넘길 조회 파라메터
		self.listBind.sendAjax();	                        //컨트롤러 호출
		self.reset(self);
		
	},
	reset: function (self) {
		self.selIdx = null;
		
	}
};