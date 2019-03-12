/**
 * 授权协议的JavaScript
 */
$(function(){
	// 设置全局变量isAble
	isValid = 0;
	// 通过url获取协议id
	agmtId = getQueryString("agmt_id");
	// 通过url获取role_id   20180913
	roleId = getQueryString("role_id");
	// 向后台传输usrid,得到甲乙方名字
	putUsrName();
	// 控制选择同意多选框
	$("#agreeBtn").on("click",function(val){
		if($(this).is(':checked') !== false){
			$("#completeBtn").removeClass("disabled");
		}
	});
	// 点击提交后传协议id到后台(为了更新协议表中isable的值)
	$("body").on("click","#completeBtn",function(){
		// 传输协议id
		var _data = {
				'agmt_id': agmtId
		};
		$.ajax({
			async : false,
			url : '/drp/order/getInfoIsvalidFlg',
			type : 'POST',
			dataType : 'json',
			data : _data,
			success : function(retValue) {
				if(retValue.result==1){
					alert("提交成功！");
				}
			}
		});
		// 判断role_id，跳转到不同页面   20180913
		if(roleId==1){
			// 跳转到普通用户交易状态页面
			location.href = "/drp/order/orderStatuOfBuy?agmt_id=" + agmtId;
		}else if(roleId==2){
			// 跳转到作者交易状态页面
			location.href = "/drp/order/orderStatuOfBuyByAuthor?agmt_id=" + agmtId;
		}
		
	});
})

// 解析url得到user_id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function putUsrName(){
	agmtId = getQueryString("agmt_id");
	var _data = {
			"agmt_id": agmtId,
	};
	$.ajax({
		async : false,
		url : '/drp/protocol/getProtocolContentNameByAgmtId',
		type : 'POST',
		dataType : 'json',
		data : _data,
		success : function(retValue) {
			$("#partaName").html("甲方：" + retValue.usra_name);
			$("#partbName").html("乙方：" + retValue.usrb_name);
		}
	});
}
