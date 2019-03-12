/**
 * 作品注册管理JavaScript
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
		"sAjaxSource": "/drp/admin/worksManageList",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "works_id",
                          "sTitle": "作品ID",
                          "sClass": "center",
                      },{
                          "mDataProp": "works_name",
                          "sTitle": "作品名称",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_nm",
                          "sTitle": "作者姓名",
                          "sClass": "center"
                      },{
                          "mDataProp": "works_cate",
                          "sTitle": "作品类型",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "works_id",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return '<a class="btn btn-success" style="margin-right:3%;" value="'+data+'" href="javascript:void(0);" onclick="agree(this)">同意</a>'+
                    		  		 '<a class="btn btn-danger" value="'+data+'" href="javascript:void(0);" onclick="disAgree(this)">拒绝</a>'
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

//通过审核
function agree(obj){
	var _data = {
			"works_id": $(obj).attr("value"),
			"works_isvalid_flg": 1
	};
	$.ajax({
		async : false,
		url : '/drp/admin/worksPass',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(retValue) {
			if(retValue.result==1){
				alert("已通过改作品审核");
				window.location.reload();
			}
		}
	});
}

//不通过审核
function disAgree(obj){
	var _data = {
			"works_id": $(obj).attr("value"),
			"works_isvalid_flg": 2
	};
	$.ajax({
		async : false,
		url : '/drp/admin/worksPass',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(retValue) {
			if(retValue.result==1){
				alert("已拒绝该作品审核");
				window.location.reload();
			}
		}
	});
}
