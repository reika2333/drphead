/**
 * 代理商申请代理的交易状态页面js
 */
$(function(){
	// 向后台传输协议id，加载页面相关信息
	getStatuInfo();
	
});
//解析url
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
// 向后台传输协议id，加载页面相关信息
function getStatuInfo(){
	// 通过url获得协议id
	agmtId = getQueryString("agmt_id");
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
			$("#orderDetail").html("<p>作品名称：《"+ retValue.works_name +
									" 》<br /> 作者："+ retValue.usr_nm +
									"<br /> 代理时限:"+ retValue.protocol_deadline +
									"  <br /> 代理商收费比例："+ retValue.partb_patio +
									"</p>");
			// 判断协议状态并修改
			if(retValue.info_isvalid_flg==0){
				// 表示我还未签署  20180912
				$("#protocol").html("立即签署").attr("href","/drp/protocol/protocolAgent.html?agmt_id="+agmtId+"&role_id=3");
			}else if(retValue.info_isvalid_flg==1){
				// 表示我已签署 对方还未签署
				$("#iProtocol-1").removeClass("bg-gray").addClass("bg-blue");
				$("#Protocol-1").html("已签署").css("color","green");
				$("#talkWith").removeClass("disabled");
				$("#protocol").html("查看协议").attr("href","/drp/protocol/checkProtocol.html?agmt_id="+agmtId+"&role_id=3");
			}else if(retValue.info_isvalid_flg==2){
				// 我已签署
				$("#iProtocol-1").removeClass("bg-gray").addClass("bg-blue");
				$("#Protocol-1").html("已签署").css("color","green");
				$("#talkWith").removeClass("disabled");
				// 对方已签署
				$("#iProtocol-2").removeClass("bg-gray").addClass("bg-blue");
				$("#Protocol-2").html("作者已签署协议").css("color","green");
				// 协议已达成
				$("#iSuccess").removeClass("bg-gray").addClass("bg-blue");
				$("#success").html("代理协议已达成").css("color","green");
				$("#cancel").removeClass("disabled");
				$("#iCompleted").removeClass("bg-gray").addClass("bg-blue");
				
				
				
				// 不能取消申请
				$("#cancelOrder").addClass("disabled");
			}else if(retValue.info_isvalid_flg==4){
				// 表示我已取消订单
				$("#iOrderFilling").html("订单已取消").css("color","gray");
				$("#Protocol-1").css("color","gray");
				$("#Protocol-2").html("未完成").css("color","gray");
				$("#success").html("未完成").css("color","gray");
				$("#talkWith").removeClass("disabled");
				$("#cancelOrder").addClass("disabled");
				$("#changeOrder").addClass("disabled");
			}
		}
	});
}

// 取消订单
function cancelOrder(){
	alert("订单取消后不能恢复，确定取消订单吗？");
	var _data = {
			"agmt_id": agmtId,
			"info_isvalid_flg": 4
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
				alert("订单取消成功！");
				window.location.reload();
			}
		}
	});
}












