/**
 * 角色申请页面js
 * 
 */

$(function(){
	
	
	$("#applySubmit").click(function() {
		//获取角色类型
		var roleType = $("#charactorSelect").val();
		var _data = {
				'role_id' : roleType
		};
		$.ajax({
			async :false,
			 url : '/drp/applyChangeRole',
             type : 'POST',
             dataType : 'json',
             contentType : "application/json;charest=utf-8",
             data : JSON.stringify(_data),
             success : function (retValue) {
                 if (retValue.result == 1) {
                	 alert("申请成功，请等待审核！");
                	 location.href = "/drp/";
                 } else {
                	 alert("您已经拥有该身份！");
                 }
             }
		});
	});
});