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
			if(retValue.info_isvalid_flg==0){
				// 表示还未签署协议
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#download").addClass("disabled").removeAttr("onclick");
			
				
				$("#protocol").attr("onclick","toProtocolImpower()");
			}else if(retValue.info_isvalid_flg==1){
				// 表示已签署协议
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol").html("已完成").css("color","green");
				$("#protocol").html("查看协议");
				$("#sPaied").html("待付款");
				$("#paied").removeClass("disabled");
				$("#download").addClass("disabled").removeAttr("onclick");
				$("#Protocol").html("查看协议").attr("href","drp/protocol/protocolImpower.html");
			
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
				$("#Protocol").html("查看协议").attr("href","drp/protocol/protocolImpower.html");
				$("#download").addClass("disabled").removeAttr("onclick");
			}else if(retValue.info_isvalid_flg==5){
				// 表示买家已经付款
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#iProtocol").removeClass("bg-gray").addClass("bg-blue");
				$("#iPaied").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol").html("已完成").css("color","green");
		
				$("#Protocol").html("查看协议").attr("href","drp/protocol/protocolImpower.html");
				$("#sPaied").html("已付款").css("color","green");
				$("#paied").addClass("disabled");
				$("#sReceive").html("等待卖家确认收款");
				$("#talkWith").removeClass("disabled");
				$("#download").addClass("disabled").removeAttr("onclick");
			}else if(etValue.info_isvalid_flg==6){
				// 表示卖家已经确认收款
				$("#iOrder").removeClass("bg-gray").addClass("bg-blue");
				$("#iProtocol").removeClass("bg-gray").addClass("bg-blue");
				$("#iPaied").removeClass("bg-gray").addClass("bg-blue");
				$("#iReceive").removeClass("bg-gray").addClass("bg-blue");
				$("#sProtocol").html("已完成").css("color","green");
				$("#protocol").html("查看协议");
				$("#sPaied").html("已付款").css("color","green");
				$("#paied").addClass("disabled");
				$("#ensureStatu").html("卖家已确认收款").css("color","green");
				$("#talkWith").removeClass("disabled");
				$("#downloadStatu").html("");
				$("#download").removeClass("disabled").attr("onclick","downloadKey()");
				$("#download").removeClass("disabled").attr("onclick","downloadKey()");
				$("#Protocol").html("查看协议").attr("href","drp/protocol/protocolImpower.html");
				
				
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




//下载密钥
function downloadKey(){
	var _data = {
			"agmt_id": agmtId,
	};
	$.ajax({
		async : false,
		url : '/drp/order/downloadDeskey',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(data) {
			
		    var blob = new Blob([data.deskey], {type: "text/plain;charset=utf-8"});
		    saveAs(blob, "theCopyDesKey.txt");
			
			}
		}
	);
}


//下载文件
function downloadFile(){
	var _data = {
			"agmt_id": agmtId,
	};
	$.ajax({
		async : false,
		url : '/drp/order/downloadFile',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(data) {

			  var $a = document.createElement('a');
	            var src="http://"+data.works_store_src;
	            
	            $a.setAttribute("href", src);
	            $a.setAttribute("download", "");


	            var evObj = document.createEvent('MouseEvents');
	            evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
	            $a.dispatchEvent(evObj);
			
		}
	});
}









//已付款
function paied(){
	alert("确定您已付款吗？");
	var _data = {
			"agmt_id": agmtId,
			"info_isvalid_flg": 5
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
				window.location.reload();
			}
		}
	});
}
// 跳转签署协议页面  添加role_id  20180913
function toProtocolImpower(){
	window.location.href='/drp/protocol/protocolImpower.html?agmt_id='+agmtId+"&role_id=1";
}

