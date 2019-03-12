
/**
 * 显示推荐作品详情
 */

$(function() {
	showWorksDetails();
});

/*
 * 通过我的作品传过来的works_id获取作品信息
 */
function showWorksDetails() {
	var worksId = getQueryString("works_id");
	//alert(worksId);
	var _data = {
			"works_id" : worksId
	};
	$.ajax({
	async : false,
	url : '/drp/showRecommendWorksDetails',
    type : 'POST',
    dataType : 'json',
    data : _data,
    success : function (retValue) {
    	$('#showData').html('<br><p>作品名称：' + retValue.works_name + '</p>'
    			+ '<p>作者姓名：' + retValue.usr_nm + '</p>'
    			+ '<p>作品类型：' + retValue.works_cate + '</p>'
    			+ '<p>作品格式：' + retValue.works_format + '</p>'
    			+ '<p>作品大小：' + retValue.works_spec + '</p>'
    			+ '<p>作品主题：' + retValue.works_theme + '</p>'
    			+ '<div class="row"><div class="col-sm-2" style="width:90px; padding-right:0">作品摘要：</div><div class="col-sm-10" style="padding-left:0">' + retValue.works_memo + '</div></div>'
    			+ '<p>作品费用：' + retValue.works_hdgt + '</p>'
    			+ '<p>作品注册时间：' + retValue.works_rgst_tm + '</p>'
    			+ '<p>作品发布时间：' + retValue.works_issu_tm + '</p>'
    			+ '<p>作品浏览量：' + retValue.works_pageviews + '</p>'
    			+ '<p>作品安全等级：' + retValue.works_secr_lvl + '</p>');
    }
});
}

/*
 * js获取url指定参数值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}