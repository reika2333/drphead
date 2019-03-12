/**
 * 邀请代理JavaScript
 *
 */

$(function() {
	// 得到worksId
	worksId = getQueryString("works_id");
	// 加载作品名称
	showWorksName();
	// 加载代理商列表
	getDataTables();
});

//加载作品名称
function showWorksName(){
	var _data = {
			"works_id": worksId
	}
	$.ajax({
		async :false,
		 url : '/drp/works/worksDetails',
         type : 'POST',
         dataType : 'json',
         data : _data,
         success : function (retValue) {
             $("h1").html('《'+retValue.works_name+'》的订单 <small>我的作品</small>');
             $("h3").html('《'+retValue.works_name+'》');
         }
	});
}

// 加载代理商列表
function getDataTables() { 
	$('#listAgent').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/order/agentList",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "usr_id",
                          "sTitle": "代理商ID",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_nm",
                          "sTitle": "代理商名称",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_nm",
                          "sTitle": "资质等级",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "usr_id",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return    '<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="visit(this);">邀请代理</a>';
                    	  }
                      }
                      ],
                      
          "oLanguage": {                          //汉化
              "sLengthMenu": "每页显示 _MENU_ 条记录",
              "sInfo": "从第 _START_ 到第 _END_ 条数据; 共 _TOTAL_ 条记录",
              "sZeroRecords": "没有检索到数据",
              "sInfoEmpty": "没有数据",
              "sInfoFiltered": "",
              "sProcessing": "正在加载数据...",
              "oPaginate": {
                  "sFirst": "首页",
                  "sPrevious": "前页",
                  "sNext": "后页",
                  "sLast": "尾页"
              }
          }
	});
}
// 跳转填写邀请代理页面
function visit(obj){
	var thisObj = $(obj);
	location.href="/drp/order/orderFillingOfVisit?works_id="+worksId+"&usr_id="+thisObj.attr("value");
}

//解析url
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
