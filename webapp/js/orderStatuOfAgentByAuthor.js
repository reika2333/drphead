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
			if(retValue.info_isvalid_flg==1){
				// 表示对方已签署 我还未签署
				$("#iProtocol-1").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol-1").html("代理商已签署").css("color","green");
				$("#protocol-2").removeClass("disabled").attr("onclick","toProtocolAgent()");
				$("#refuse").removeClass("disabled").attr("onclick","refuseAgent()");
				
			}else if(retValue.info_isvalid_flg==2){
				// 代理商已签署
				$("#iProtocol-1").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol-1").html("代理商已签署").css("color","green");
				$("#talkWith").removeClass("disabled");
				// 我已签署
				$("#iProtocol-2").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol-2").html("我已签署协议").css("color","green");
				// 协议已达成
				$("#iSuccess").removeClass("bg-gray").addClass("bg-blue");
				$("#success").html("代理协议已达成").css("color","green");
				$("#cancel").removeClass("disabled");
				$("#iCompleted").removeClass("bg-gray").addClass("bg-blue");
				$("#Protocol-1").html("查看协议").attr("href","/drp/protocol/checkProtocol.html?agmt_id="+agmtId+"&role_id=3");
			}else if(retValue.info_isvalid_flg==3){
				// 我已拒绝代理
				$("#iOrder").removeClass("bg-blue").addClass("bg-gray");
				$("#sOrder").css("color","gray");
				$("#sProtocol-1").html("").css("color","green");
				$("#Protocol-1").addClass("disabled");
				$("#talkWith").removeClass("disabled");
				// 我已签署
				$("#sProtocol-2").html("我已拒绝此代理").css("color","gray");
				// 协议已达成
				$("#success").html("代理协议未达成").css("color","gray");
			}else if(retValue.info_isvalid_flg==4){
				// 表示代理商已取消订单
				$("#iOrder").removeClass("bg-blue").addClass("bg-gray");
				$("#sOrder").html("代理商已取消代理订单").css("color","gray");
				$("#Protocol-1").addClass("disabled")
				$("#sProtocol-1").html("");
				$("#sProtocol-2").html("");
				$("#success").html("");
			}
		}
	});
}
// 跳转签署协议页面  添加role_id=2  20180912
function toProtocolAgent(){
	window.location.href="/drp/protocol/protocolAgent.html?agmt_id="+agmtId+"&role_id=2";
}
//拒绝代理
function refuseAgent(){
	alert("拒绝代理后不能恢复，确定拒绝吗？");
	var _data = {
			"agmt_id": agmtId,
			"info_isvalid_flg": 3
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
				alert("已拒绝代理商的申请！");
				window.location.reload();
			}
		}
	});
}













