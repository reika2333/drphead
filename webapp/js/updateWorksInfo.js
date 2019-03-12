$(function(){
	
	loadWorksInfo();
	var isFree = $('input[name="isFree"]:checked').val();
	
	/*
	 * 单选框控制预估费用的输入框
	 */
	
	$(".isFree").click(function() {
		
		isFree = $('input[name="isFree"]:checked').val();
		if(!isFree.trim()) {
			$("#estimatedCostInput").val("");
			$("#estimatedCostInput").attr("disabled",false);
		} else {
			$("#estimatedCostInput").val("0");
			$("#estimatedCostInput").attr("disabled",true);
		}
	});
});
/**
 * 点击修改按钮跳转修改页面
 */
$(function() {
	$("#updateWorksInfoBtn").click(function() {
		window.location.href="updateWorksInfo.html";
	});
});

/*
 * js获取url指定参数值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

/*
 * 加载作品信息
 */
function loadWorksInfo() {
	
	var works_id = getQueryString("works_id");
	var _data = {
			"works_id" : works_id
	};
	// 获取作品基本资料数据
	$.ajax({
		async :false,
		 url : '/drp/works/worksLists',
        type : 'POST',
        dataType : 'json',
        data : _data,
        success : function (retValue) {
        	$('#inputWorksName').val(retValue.works_name);
        	$('#inputWorksMemo').val(retValue.works_memo);
        	$('#isFree').val(retValue.works_ischrg);
        	$('#estimatedCostInput').val(retValue.works_hdgt);
        	$('#inputWorksLvl').val(retValue.works_secr_lvl);
        }
	});
}


/*
 * 判断表单输入的格式是否合法,合法则提交更改到数据库
 */
$("#inputInformation").click(function() {
	var works_id = getQueryString("works_id");
	
	var worksName = $("#inputWorksName").val();
	var worksMemo = $("#inputWorksMemo").val();
	var isFree = $("#isFree").val();
	var estimatedCostInput = $("#estimatedCostInput").val();
	var worksLvl = $("#inputWorksLvl").val();
	var _data = {
			"works_name" : worksName,
			"works_memo" : worksMemo,
			"works_ischrg" : isFree,
			"works_hdgt" : estimatedCostInput,
			"works_secr_lvl" : worksLvl,
			"works_id" : works_id
	};
	
	if (!$.trim(worksName)) {
		alert("作品名称不能为空！");
		return false;
	} else if (!$.trim(worksMemo)) {
		alert("作品大小不能为空！");
		return false;
	} else if (!$.trim(estimatedCostInput)) {
		alert("预估费用不能为空！");
		return false;
	} else if (!$.trim(worksLvl)) {
		alert("资质等级不能为空！");
		return false;
	} else {
			$.ajax({
				async :false,
    			url : '/drp/works/updateWorksDetails',
                type : 'POST',
                dataType : 'json',
                data : _data,
                success : function (retValue) {
                	if (retValue.result == 1) {
                		alert("修改成功！");
                	} else {
                		alert("修改失败！");
                	}
                }
			});
		}
	
});

