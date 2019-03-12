/*! 
 * 邀请代理订单填写页面js
 */

$(function() {
	// 设置全局变量接收第一次ajax传输成功后获得的作者id
	authorId = ""; 
	agmtId = "";
	agentId = getQueryString("usr_id");
	
	// 向后台传输作品编号、代理商编号，加载出代理商信息和作品信息
	putWorksId();
	
	// 分成计算
	$("#autherPatioInput").on("change",function() {
		var value = 10 - $(this).val();
		$("#agentPatioInput").val(value + "成");
	});

	// 往协议表插入数据
	$("body").on("click", "#orderSubmitBtn", function() {
		var worksId = $("#worksIdInput").val();
		var worksFee = $("#worksFeeInput").val();
		var protocolTime = $("#agentTimeInput").val();
		var agentPatio = $("#agentPatioInput").val();
		var autherPatio = $("#autherPatioInput").val();

		var _data = {
			//usr_id 是session
			//parta_id 是session
			'partb_id' : agentId,
			'works_id' : worksId,
			'protocol_deadline' : protocolTime,
			'auth_fee' : worksFee,
			'parta_patio' : agentPatio,
			'partb_patio' : autherPatio,
			'protocol_type' : 1,
			'role_id': 2   //添加 20180912
		};

		$.ajax({
			async : false,
			url : '/drp/order/insertApplyProtocolContent',
			type : 'POST',
			dataType : 'json',
			contentType : "application/json;charest=utf-8",
			data : JSON.stringify(_data),
			success : function(retValue) {
				agmtId = retValue.agmt_id;
			}
		});
		// 添加role_id=3  20180912
		location.href="/drp/protocol/protocolAgent.html?usr_id=" + authorId + "&agmt_id=" + agmtId+"&role_id=2";
	});

});

// 解析url得到works_id
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

// 填入作品编号、信息、代理商信息
function putWorksId() {
	id = getQueryString("works_id");
	var _data = {
		'works_id' : id,
		'usr_id': agentId 
	};
	// 向后台传输works_id
	$.ajax({
		async : false,
		url : '/drp/order/findWorksAgentInfo',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
        data : JSON.stringify(_data),
		// 后台返回的retvalue再
		success : function(retValue) { // 获取来自作品表的信息
			// 修改作品信息
			$("#worksFeeInput").val(retValue.works_hdgt);
			$("#worksNameInput").val(retValue.works_name);
			$("#worksIdInput").val(id);
			// 修改代理商信息
			$("#agentName").val(retValue.usr_nm);
			$("#agentId").val(agentId);
			// 获取作者id
			authorId = retValue.usr_id;
		}
	});
}
