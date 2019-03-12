/*! 
 * 代理商订单填写页面js
 */

$(function() {
	// 设置全局变量接收第一次ajax传输成功后获得的作者id
	authorId = ""; 
	agmtId = "";
	
	// 向后台传输作品编号
	putWorksId();
	
	// 分成计算
	$("#agentPatioInput").on("change",function() {
		var value = 10 - $(this).val();
		$("#autherPatioInput").val(value + "成");
	});

	// 往协议表插入数据
	$("body").on("click", "#orderSubmitBtn", function() {
		var worksId = $("#worksIdInput").val();
		var worksFee = $("#worksFeeInput").val();
		var protocolTime = $("#agentTimeInput").val();
		var agentPatio = $("#agentPatioInput").val();
		var autherPatio = $("#autherPatioInput").val();

		var _data = {
			'parta_id' : authorId,
			'works_id' : worksId,
			'protocol_deadline' : protocolTime,
			'auth_fee' : worksFee,
			'parta_patio' : agentPatio + "成",
			'partb_patio' : autherPatio,
			'protocol_type' : 1,
			'role_id': 3   //添加 20180912
		};

		$.ajax({
			async : false,
			url : '/drp/order/insertProtocolContent',
			type : 'POST',
			dataType : 'json',
			contentType : "application/json;charest=utf-8",
			data : JSON.stringify(_data),
			success : function(retValue) {
				agmtId = retValue.agmt_id;
			}
		});
		// 添加role_id=3  20180912
		location.href="/drp/protocol/protocolAgent.html?usr_id=" + authorId + "&agmt_id=" + agmtId+"&role_id=3";
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

// 填入作品编号、信息
function putWorksId() {
	var id = getQueryString("works_id");
	var _data = {
		'works_id' : id,
	};
	// 向后台传输works_id
	$.ajax({
		async : false,
		url : '/drp/order/findWorksInfo',
		type : 'POST',
		dataType : 'json',
		data : _data,
		// 后台返回的retvalue再
		success : function(retValue) { // 获取来自作品表的信息
			// 修改作品信息
			$("#worksFeeInput").val(retValue.works_hdgt);
			$("#worksNameInput").val(retValue.works_name);
			$("#worksIdInput").val(retValue.works_id);
			// 获取作者id
			authorId = retValue.usr_id;
		}
	});
}
