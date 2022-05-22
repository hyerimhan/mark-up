var paging = {
		recordCountPerPage : 10, //page 당 record 
		pageSize : 10, //page갯수
		pageDisplayDiv : null ,
		init : function(layerId  , pageDisplayDiv) {
			paging.makePageObj(layerId  , pageDisplayDiv);
//			paging.makePage();
		},
		makePageObj : function(layerId  , pageDisplayDiv){
			paging.pageDisplayDiv = pageDisplayDiv;
			//layerId  가 없다면 기본으로 셋팅
			if(layerId == null){
				layerId = "divSearch";
			}
			//레이어가 존제하는가??
			if($("#"+layerId).attr('id') == undefined ){
					//없으면 생성 레이어 아이디를  이용하여 검색용 div 생성
					var $div = $('<div />').appendTo('body');
					$div.attr('id', layerId);
			}
			//페이징 레이어가 존제하는가??
			if($("#"+paging.pageDisplayDiv).attr('id') == undefined ){
				//없으면 생성 레이어 아이디를  이용하여 검색용 div 생성
				var $div = $('<div />').appendTo('body');
				$div.attr('id', layerId);
		}
			var objDiv =$("#"+layerId);
			if($("#startNum").attr('id') == undefined ){
				$("<input></input>").attr({type:"hidden", id:"startNum", name:"startNum", value:0}).appendTo(objDiv);
			}
			if($("#curPage").attr('id') == undefined ){
				$("<input></input>").attr({type:"hidden", id:"curPage", name:"curPage", value:0}).appendTo(objDiv);
			}
			if($("#scope").attr('id') == undefined ){
				$("<input></input>").attr({type:"hidden", id:"scope", name:"scope", value: paging.recordCountPerPage}).appendTo(objDiv);
			}
			
		}
		,
		makePage : function(data){
			var totalRecordCount = 1;
			var currentPageNo = 1;
			var recordCountPerPage =$("#scope").val();
			paging.recordCountPerPage = $("#scope").val();
			var pageSize = paging.pageSize;
			if(data.dataCnt != undefined){
				totalRecordCount = data.dataCnt;
			}
			currentPageNo = $("#curPage").val();
			if(currentPageNo < 1){
				currentPageNo = 1;
			}
			var totalPageCount = 0;
			totalPageCount = Math.floor((totalRecordCount-1)/recordCountPerPage) + 1;
			var firstPageNoOnPageList =  0;
			firstPageNoOnPageList = (Math.floor((currentPageNo-1)/pageSize))*pageSize + 1; //페이지 리스트의 첫 페이지 번호
			var lastPageNoOnPageList =0;
			lastPageNoOnPageList =  firstPageNoOnPageList+pageSize-1;  //페이지 리스트의 마지막 페이지 번호	no
			if (lastPageNoOnPageList>totalPageCount){
				lastPageNoOnPageList=totalPageCount;
				}
			//var lastRecordIndex	 = lastRecordIndex = currentPageNo * recordCountPerPage; //페이징 SQL의 조건절에 사용되는 마지막 rownum	no
			var strhtml = "<ul>";
			strhtml = strhtml+ '<li><a href="#" onClick ="paging.goPage(\'1\')" class="pagenation__btn"><i class="icon-leftarrow"></i><i class="icon-leftarrow"></i><span class="blind"처음</span></a></li>';
			var ppNo = 0;
			if(firstPageNoOnPageList > pageSize ){
				ppNo = firstPageNoOnPageList- pageSize;
			}else{
				ppNo = 1;
			}
			if(lastPageNoOnPageList+pageSize < (totalPageCount) ){
				pNNo = firstPageNoOnPageList+ pageSize;
			}else{
				pNNo = totalPageCount;
			}
			strhtml = strhtml+ '<li><a href="#" onClick ="paging.goPage(\''+ppNo+'\')" class="pagenation__btn"><i class="icon-leftarrow"></i><span class="blind">이전</span></a></a></li>';
			for(idx = firstPageNoOnPageList ; idx <= lastPageNoOnPageList ; idx ++){
				strhtml = strhtml+ '<li><a  onClick ="paging.goPage(\''+idx+'\')" '; 
				if(idx ==currentPageNo) { 
					strhtml = strhtml+ 'class="pagenation__btn--current"';
					} 
				strhtml = strhtml+ ' >'+idx+'</a></li>';
			}
			strhtml = strhtml+ '<li><a href="#" onClick ="paging.goPage(\''+pNNo+'\')" class="pagenation__btn"><i class="icon-rightarrow"></i><span class="blind">다음</span></a></a></li>';
			strhtml = strhtml+ '<li><a href="#" onClick ="paging.goPage(\''+totalPageCount+'\')" class="pagenation__btn--next"><i class="icon-rightarrow"></i><i class="icon-rightarrow"></i><span class="blind">마지막</span></a></li>';
			strhtml = strhtml+ '</ul>';
			$("#"+paging.pageDisplayDiv).html(strhtml);
		} ,
		
		goPage : function(page){
			var firstRecordIndex =  (page - 1) * paging.recordCountPerPage; //페이징 SQL의 조건절에 사용되는 시작 rownum	no	
			$("#startNum").val(firstRecordIndex);
			$("#curPage").val(page);
			var self = (new Function('return ' + programId))();
			self.getDataList();
		}
		
		   
		
		
}