/*
 *跳转到推荐信息界面 
 */
$(function() {
	$("#searchInfo").click(function() {
		var works_name = $.trim($("#recommendedInfoInput").val());
		works_name = encodeURI(encodeURI(works_name));
		location.href = "/drp/recommendInfo?works_name=" + works_name;
	});
});