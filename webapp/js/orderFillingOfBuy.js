/*! 
 * 普通用户订单填写页面js
 */

$(function() {
	// 设置全局变量接收第一次ajax传输成功后获得的作者id
	authorId = ""; 
	agmtId = "";
	singleFee = "";
	
	// 填入作品编号、信息
	putWorksId();
	
	// 通过作品购买时间来计算购买总价
	$("#worksTimeInput").on("change",function() {
		value = singleFee * $(this).val();
		$("#worksFeeInput").val(value + "元");
	});

	// 往协议表插入数据（普通用户购买）
	$("body").on("click", "#orderSubmitBtn", function() {
		var worksId = $("#worksIdInput").val();
		var worksFee = $("#worksFeeInput").val();
		var protocolTime = $("#worksTimeInput").val();

		var _data = {
			'partb_id' : authorId,
			'works_id' : worksId,
			'protocol_deadline' : protocolTime,
			'auth_fee' : value,
			'protocol_type' : 2,
			'role_id': 1    // 新添加，后台需要插入数据
		};

		if(protocolTime == null || protocolTime == ''){
			alert("购买时间不能为空！");
			return false;
		}else{
			$.ajax({
				async : false,
				url : '/drp/order/insertImpowerProtocolContent',
				type : 'POST',
				dataType : 'json',
				contentType : "application/json;charest=utf-8",
				data : JSON.stringify(_data),
				success : function(retValue) {
					agmtId = retValue.agmt_id;
				}
			});
		}
		location.href="/drp/protocol/protocolImpower.html?usr_id=" + authorId + "&agmt_id=" + agmtId+"&role_id=1";
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
			$("#worksNameInput").val(retValue.works_name);
			$("#worksIdInput").val(retValue.works_id);
			$("#worksSingleFeeInput").val(retValue.works_hdgt+"/月");
			$("#worksFormatInput").val(retValue.works_format);
			$("#worksCateInput").val(retValue.works_cate);
			$("#worksMemoInput").val(retValue.works_memo);
			// 获取作者id
			authorId = retValue.usr_id;
			singleFee = retValue.works_hdgt;
		}
	});
}
