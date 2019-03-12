/**
 * 角色申请管理JavaScript
 *
 */

$(function() {
	getDataTables();
});


//显示角色申请
function getDataTables() { 
	$('#list').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/admin/charManageList",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "usr_id",
                          "sTitle": "用户ID",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_nm",
                          "sTitle": "用户名",
                          "sClass": "center",
                      },{
                          "mDataProp": "role_id",
                          "sTitle": "申请角色",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	 if(data==2){
                        	  		 return "作者";
                        	  	 }else if(data==3){
                        	  		 return "代理商";
                        	  	 }
                          }
                      },{
                          "mDataProp": "create_date",
                          "sTitle": "申请时间",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "usr2role_id",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return '<button class="btn btn-success" style="margin-right:5%;" value="'+data+'" href="javascript:void(0);" onclick="agree(this)">同意</button>'+
                    		  		 '<button class="btn btn-danger" style="margin-right:5%;" value="'+data+'" href="javascript:void(0);" onclick="disAgree(this)">拒绝</button>'
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
			"usr2role_id": $(obj).attr("value"),
			"data_isvalid_flg": 1
	};
	$.ajax({
		async : false,
		url : '/drp/admin/pass',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(retValue) {
			if(retValue.result==1){
				alert("已通过改角色审核");
				window.location.reload();
			}
		}
	});
}
//不通过审核
function disAgree(obj){
	alert("可以触发");
	var _data = {
			"usr2role_id": $(obj).attr("value"),
			"data_isvalid_flg": 2
	};
	$.ajax({
		async : false,
		url : '/drp/admin/pass',
		type : 'POST',
		dataType : 'json',
		contentType : "application/json;charest=utf-8",
		data : JSON.stringify(_data),
		success : function(retValue) {
			if(retValue.result==1){
				alert("已拒绝该角色审核");
				window.location.reload();
			}
		}
	});
}
