var AjaxRest = {
	FBaseURL : '',
	init : function(baseurl){
		var self = this;
		self.FBaseURL = baseurl;
	},
	get : function(uri, param, success_callbacks, fail_callbacks, complete_callbacks){
		var self = AjaxRest;
		$.ajax({
		     type: "get",
		     url: uri,
		     data: $.extend(param,{"APIKEY":outerParam.APIKEY, "USERID":outerParam.USERID}),
		     contentType: "application/json; charset=utf-8",
		     dataType: "json",
		     timeout: 20000,
 	         beforeSend : function(xhr){
 	        	 xhr.setRequestHeader("APIKEY",outerParam.APIKEY);
	        	 xhr.setRequestHeader("USERID",outerParam.USERID);
	         },
		     error: function(xhr, status, errorThrown){
		    		console.log("ajax error statusText : " + xhr.statusText);
		    		console.log("ajax error responseText : " + xhr.responseText);
		    		console.log("ajax error readyState : " + xhr.readyState);
		    		console.log("ajax error textStatus : " + status);
		    		console.log("ajax error errorThrown : " + errorThrown);
			    	 for(var i=0;i<fail_callbacks.length; i++)
			    		 fail_callbacks[i]();		    	 
		     },  
		     success: function(json){
		    	 for(var i=0;i<success_callbacks.length; i++)
		    		 success_callbacks[i](json);
		     },
		     complete : function(xhr){
		    	 
		    	 for(var i=0;i<complete_callbacks.length; i++)
		    		 complete_callbacks[i](xhr);
		    	 
		    	 self.getTokeHeader(xhr); 
		     }
		  })
	},
	put : function(uri, param, success_callbacks, fail_callbacks){
		var self = AjaxRest;
//		let apiKeyUrl = new URLSearchParams({"APIKEY":outerParam.APIKEY, "USERID":outerParam.USERID}).toString();
//		console.log(apiKeyUrl);
		$.ajax({
		     type: "put",
		     url: uri,
		     data: JSON.stringify(param),
		     contentType: "application/json; charset=utf-8",
		     dataType: "json",
		     timeout: 5000,
	         beforeSend : function(xhr){
	        	 xhr.setRequestHeader("APIKEY",outerParam.APIKEY);
	        	 xhr.setRequestHeader("USERID",outerParam.USERID);
	        	 self.setTokeHeader(xhr);
		         },
		     error: function(xhr, status, errorThrown){
	    		console.log("ajax error statusText : " + xhr.statusText);
	    		console.log("ajax error responseText : " + xhr.responseText);
	    		console.log("ajax error readyState : " + xhr.readyState);
	    		console.log("ajax error textStatus : " + status);
	    		console.log("ajax error errorThrown : " + errorThrown);
		    	 for(var i=0;i<fail_callbacks.length; i++)
		    		 fail_callbacks[i]();		    	 
		     },  
		     success: function(json){
		    	 for(var i=0;i<success_callbacks.length; i++)
		    		 success_callbacks[i](json);
		     },
		     complete : function(xhr){
		    	 self.getTokeHeader(xhr); 
		     }
		  })
	},
	del : function(uri, param, success_callbacks, fail_callbacks){
		var self = AjaxRest;
		$.ajax({
		     type: "delete",
		     url: uri,
		     data: param,
		     contentType: "application/json; charset=utf-8",
		     dataType: "json",
		     timeout: 5000,
	         beforeSend : function(xhr){
	        	 xhr.setRequestHeader("APIKEY",outerParam.APIKEY);
	        	 xhr.setRequestHeader("USERID",outerParam.USERID);
	        	 self.setTokeHeader(xhr);
		         },
		     error: function(xhr, status){
		    	 for(var i=0;i<fail_callbacks.length; i++)
		    		 fail_callbacks[i]();		    	 
		     },  
		     success: function(json){
		    	 for(var i=0;i<success_callbacks.length; i++)
		    		 success_callbacks[i](json);
		     },
		     complete : function(xhr){
		    	 self.getTokeHeader(xhr); 
		     }
		  })
	},
	post : function(uri, param, success_callbacks, fail_callbacks){
		var self = AjaxRest;
		$.ajax({
		     type: "post",
		     url: uri,
		     data: $.extend(param,{"APIKEY":outerParam.APIKEY, "USERID":outerParam.USERID}),
		     contentType: "application/json; charset=utf-8",
		     dataType: "json",
		     timeout: 5000,
	         beforeSend : function(xhr){
	        	 xhr.setRequestHeader("APIKEY",outerParam.APIKEY);
	        	 xhr.setRequestHeader("USERID",outerParam.USERID);
	        	 self.setTokeHeader(xhr);
		         },
		     error: function(xhr, status){
		    	 for(var i=0;i<fail_callbacks.length; i++)
		    		 fail_callbacks[i]();		    	 
		     },  
		     success: function(json){
		    	 for(var i=0;i<success_callbacks.length; i++)
		    		 success_callbacks[i](json);
		     },
		     complete : function(xhr){
		    	 self.getTokeHeader(xhr); 
		     }
		  })
	},
	setTokeHeader : function(xhr){		
     	var token = localStorage.getItem("epsav_token");
     	if(token !== null)
     		xhr.setRequestHeader("Authorization",token);		
	},
	getTokeHeader : function(xhr){
     	var token = xhr.getResponseHeader("extened-time-token");
     	if(token !== null){
     		console.info(token);
     		localStorage.setItem("epsav_token", token);
     	}
     				
	}
	
};
