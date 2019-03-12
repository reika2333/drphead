/**
 * 普通用户购买商品的交易状态页面js
 */
$(function(){
	// 通过url获得协议id
	agmtId = getQueryString("agmt_id");
	// 向后台传输协议id，加载页面相关信息
	getStatuInfo();
})

// 向后台传输协议id，加载页面相关信息
function getStatuInfo(){
	// 传id到后台，查询数据库其他信息
	var _data = {
			'agmt_id': agmtId
	}
	$.ajax({
		async : false,
		url : '/drp/order/getProtocolDetailsByAgmtId',
		type : 'POST',
		dataType : 'json',
		data : _data,
		success : function(retValue) { 
			// 填入订单基本内容
			$("#orderDetails").html("<p>作品名称：《"+ retValue.works_name +
									"》<br /> 购买时限:&nbsp&nbsp"+ retValue.protocol_deadline +
									"个月</p>");
			// 判断状态并修改
			if(retValue.info_isvalid_flg==1){
				// 表示已签署协议
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#iProtocol").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol").html("已完成").css("color","green");
				$("#protocol").html("查看协议");
				$("#sPaied").html("待付款");
				$("#paied").removeClass("disabled");
			}else if(retValue.info_isvalid_flg==4){
				// 表示已取消订单
				$("#sOrder").html("订单已取消").css("color","gray");
				$("#sProtocol").css("color","gray");
				$("#sPaied").css("color","gray");
				$("#sReceive").css("color","gray");
				$("#downloadStatu").css("color","gray");
				$("#protocol").addClass("disabled");
				$("#paied").addClass("disabled").removeAttr("onclick");
				$("#orderChange").addClass("disabled");
				$("#orderCancel").html("已取消").addClass("disabled").removeAttr("onclick");
			}else if(retValue.info_isvalid_flg==5){
				// 表示买家已经付款
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#iProtocol").removeClass("bg-gray").addClass("bg-blue");
				$("#iPaied").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol").html("已完成").css("color","green");
				$("#protocol").html("查看协议");
				$("#sPaied").html("买家已付款").css("color","green");
				$("#sReceive").html("未完成");
				$("#talkWith").removeClass("disabled");
				$("#received").removeClass("disabled").attr("onclick","received()");
			}else if(retValue.info_isvalid_flg==6){
				// 表示卖家已经确认收款
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#iProtocol").removeClass("bg-gray").addClass("bg-blue");
				$("#iPaied").removeClass("bg-gray").addClass("bg-blue");
				$("#iReceive").removeClass("bg-gray").addClass("bg-blue");
				$("#iCompleted").removeClass("bg-gray").addClass("bg-blue");
				$("#over").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol").html("已完成").css("color","green");
				$("#sReceive").html("已完成").css("color","green");
				$("#protocol").html("查看协议");
				$("#sPaied").html("已付款").css("color","green");
				$("#paied").addClass("disabled");
				$("#ensureStatu").html("卖家已确认收款").css("color","green");
				$("#talkWith").removeClass("disabled");
				$("#sCompleted").html("已完成").css("color","green");
				$("#completed").html("交易完成！买家可在购买期限内任意下载此作品。").css("color","green");
			}
		}
	});
}

//解析url
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
// 确认收款
function received(){
	alert("确认收到款后交易将完成，确定您已收到款吗？");
	var _data = {
			"agmt_id": agmtId,
			"info_isvalid_flg": 6
	};
	$.ajax({
		async : false,
		url : '/drp/order/updateInfoisValidFlg',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(retValue) {
			if(retValue.result==1){
				alert("确认收款成功！");
				window.location.reload();
			}
		}
	});
}


