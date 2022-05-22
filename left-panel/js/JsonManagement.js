function isNull(value){
	var _chkStr = value + "";
	if(_chkStr === '' || _chkStr === null || _chkStr === 'null'){
       return true;
	}
	else
	{
	   return false;
	}
};

function isUndefined(value){
	if(typeof(value)===undefined || typeof(value)==='null' || typeof(value)==='undefined'){
		
	
		return true;
	}else{
		return false;
	}
}


function nvl(A, B){
	if(isNull(A) || isUndefined(A)){
		return B;
	}else
	{
		return A;		
	}
}

function nvl2(A, B, C){
	if(isNull(A) || isUndefined(A)){
		return B;
	}else
	{
		return C;	
	}
}


// JSON 객체를 정렬하는 함수
function JsonGetSortOrder(prop, asc) {
    return function(a, b, opt) {
        if (a[prop] > b[prop]) {
        	if(asc)
        		return 1;
        	else
        		return -1;
        } else if (a[prop] < b[prop]) {
        	if(asc)
        		return -1;
        	else
        		return 1;
        }
        return 0;
    }
};

// JSON 객체에서 복합키 정보로 JSON ROW를 가져오는 함수
function JsonGetObjects(jobjs, keys, vals) {
    var objects = [];

    var bIn = false;
    if(keys.length === vals.length){
    	for(var i = 0; i < jobjs.length; i++){
    		bIn = true;
    		for(var j = 0; j < keys.length; j++){
    			if(jobjs[i][keys[j]] !== vals[j]) 
    				bIn = false; 
    		};
    		if(bIn) objects.push(jobjs[i]);
    	}
    }
   return objects;
};

// JSON 객체에서 복합키 정보로 JSON ROW를 가져오는 함수
function JsonGetArrayByKey(jobjs, key) {
    var objects = [];
	for(var i = 0; i < jobjs.length; i++)
		objects.push(jobjs[i][key]);
   return objects;
};

// JSON 객체에서 특정 키의 정보를 지우는 함수
function JsonGetIntersect(jobj, keys, action) {
    var bIn = false;
    $.each(jobj, function(k, v) {
		bIn = false;
    	for(var i = 0; i < keys.length; i++){
    		if(keys[i] === k)
    			bIn = true;
		}
		if(action === 'I')
			if(!bIn)
    			delete jobj[k];
		if(action === 'E')
			if(bIn)
				delete jobj[k];
	   });
   return jobj;
};
// MAP 객체에서 특정 키의 정보를 지우는 함수
function MapGetIntersect(mapData, keys, cmpKey, action) {
    var bIn = false;
    $.each(mapData, function(k, v) {
		bIn = false;
    	for(var i = 0; i < keys.length; i++){
    		if(keys[i] === v[cmpKey])
    			bIn = true;
    	}
		if(action === 'I')
			if(!bIn)
    			delete mapData[k];
		if(action === 'E')
			if(bIn)
				delete mapData[k];
   });
   return mapData;
};


function buidSearchLeftFrm(areaId, title, model){
	var hobj =$('#'+areaId);
	var lihtml = '<h3>' +title + '</h3>';
	var valuetag = null;
	var valuetype = null;
	var valuename = null;
	var defaultValue = null;
	var valueid = null;
	$.each(model, function(index, jobj){
		valuetag = jobj['formTag'];
		defaultValue =nvl(jobj['value'],"");
		if(valuetag !== null)
		{
			switch(valuetag){
				case 'INPUT' : 
					lihtml += '<div class="inputarea">';
					valuename = jobj['colname'];
					if(valuename !== null)
						lihtml += '<span class="label">' + valuename + '</span>';
					valuetype = jobj['formType'];
					if(valuetype !== null){
						switch(valuetype){
							case 'text' :
								lihtml += '<div class="inputarea__text">';
								valueid = jobj['name'];
								if(valueid !== null){
									lihtml += '<input type="text" title="' + valuename + '" name="' + valueid + '" id="' + valueid + '" class="ipt_text" value="'+defaultValue+'"></input>';
								}
								lihtml += '</div>';
								break;
							default :
								break;
						}
					}
					lihtml += '</div>';	
					break;
				case 'SELECT' :
					lihtml += '<div class="inputarea">';
					valuename = jobj['colname'];
					if(valuename !== null)
						lihtml += '<span class="label">' + valuename + '</span>';
					valuetype = jobj['formType'];
					if(valuetype !== null){
						lihtml += '<div class="inputarea__select">';
						valueid = jobj['name'];
						if(valueid !== null){
							lihtml += '<select title="항목선택" name="' + valueid + '" id="' + valueid + '" class="ipt_text"></select>';
						}
						lihtml += '</div>';
					}
					lihtml += '</div>';	
					break;
				default :
					break;
			}
			
		}
	});
	lihtml += '<div class="btnarea"><a href="#" class="btn__big--orange" id="searchBtn">조회</a></div>';	
	$('#'+areaId).html(lihtml).trigger("create");
	//$('#'+areaId).append(lihtml).trigger("create");
};
