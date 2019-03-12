/**
 * 代理协议的JavaScript
 */
$(function(){
	// 设置全局变量isAble
	isValid = 0;
	// 通过url获取协议id
	agmtId = getQueryString("agmt_id");
	// 通过url获取role_id
	roleId = getQueryString("role_id");  //添加 20180912
	// 向后台传输agmtid,得到甲乙方名字
	inputUsrName();
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
		// 判断role_id,跳转到不同的页面 20180912
		if(roleId==2 && session!==usrId){
			// 作者查看收到申请代理状态
			location.href = "/drp/order/orderStatuOfAgentByAuthor?agmt_id=" + agmtId;
		}else if(roleId==2 && session==usrId){
			// 作者查看邀请的代理状态
			location.href = "/drp/order/orderStatuOfMyVisit.html?agmt_id=" + agmtId;
		}else if(roleId==3 && session==usrId){
			// 代理商查看交易状态
			location.href = "/drp/order/orderStatuOfAgent.html?agmt_id=" + agmtId;
		}else if(roleId==3 && session!==usrId){
			// 代理商查看交易状态
			location.href = "/drp/order/orderStatuOfAgent.html?agmt_id=" + agmtId;
		}
	});
})

// 解析url得到user_id
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

// 传协议id得到甲乙方
function inputUsrName(){
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
			session = retValue.session;
			usrId = retValue.usr_id;
		}
	});
}
