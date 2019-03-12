/**
 * 人员注册管理JavaScript
 *
 *（目前使用协议表中的数据作为展示）
 */

$(function() {
	getDataTables();
});


//显示我申请的代理
function getDataTables() { 
	$('#listApply').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/order/MyAgentListData",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "agmt_id",
                          "sTitle": "用户ID",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	agmtId = data;
                        	  	return data;
                          }
                      },{
                          "mDataProp": "works_name",
                          "sTitle": "申请角色",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_nm",
                          "sTitle": "角色名称",
                          "sClass": "center"
                      },{
                          "mDataProp": "works_cate",
                          "sTitle": "作品类型",
                          "sClass": "center"
                      },,{
                    	  "mDataProp": "info_isvalid_flg",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return '<a class="btn btn-success" style="margin-right:5%;">同意</a>'+
                    		  		 '<a class="btn btn-danger">拒绝</a>'
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
