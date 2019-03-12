/**
 * 加载左菜单栏
 *
 */

$(function() {
	var conTent = $("#leftMenu").html();
	if (conTent == "") {
		loadMenu();
	}
});

function loadMenu() {
	$.ajax({
		async : false,
		type : "POST",
		dataType : "json",
		url : "/drp/loadMenu",
		success : function (returnValue) {
			console.log(returnValue.src.length);
			var result = returnValue.src;
			var flag = $("#leftMenu");
			for (var i = 0 ; i < result.length ; i++) {
				var temp = '<li class="${'+result[i].src_menu_flag+'}">'+
								'<a href="'+result[i].src_url+'">'+ 
									'<i class="fa fa-dashboard"></i>'+
									'<span>'+result[i].src_name+'</span>'+
									'<span class="pull-right-container">'+ 
										'<i class="fa  pull-right"></i>'+
									'</span>'+
								'</a>'+
							'</li>';
				$(flag).append(temp);
			}
			roleIdArray = new Array();
			if(returnValue.roleId1 !== null){
				roleIdArray.push(returnValue.roleId1);
			}
			if(returnValue.roleId2 !== null){
				roleIdArray.push(returnValue.roleId2);
			}
			if(returnValue.roleId3 !== null){
				roleIdArray.push(returnValue.roleId3);
			}
			if(returnValue.roleId4 !== null){
				roleIdArray.push(returnValue.roleId4);
			}
			
		}
	});
}