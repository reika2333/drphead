/**
 * 我的代理JavaScript
 *
 * 收到的代理邀请：usr_id != session ,  protocol_type = 1 ， partb_id = session ，info_isvalid_flg != 0
 */

$(function() {
	getDataTables();
});

/**
 * 用获取的协议id传给代理申请状态页面
 * @param obj a标签对象
 */

function orderStatuOfAgent(this1) {
	var Row = $(this1).parents('tr')[0];//通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
    var Data = $("#example").dataTable().fnGetData(Row);//得到这一行的json数据  
    var cjname= aData.cjname;//得到车间名称  
	location.href = "/drp/order/orderStatuOfAgent?agmt_id=" + cjname;
}

//显示我邀请的代理
function getDataTables() { 
	$('#listApply').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/order/MyAgentListData",
        "sServerMethod": "POST",
        "bPaginate" : true,  
//        "bLengthChange": true,  //显示（应用）分页器
        
        "aoColumns": [
                      {
                          "mDataProp": "agmt_id",
                          "sTitle": "协议ID",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	agmtId = data;
                        	  	return data;
                          }
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
                          "mDataProp": "partb_patio",
                          "sTitle": "代理商分成",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "info_isvalid_flg",
                    	  "sTitle": "状态",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  if(data==1){
                    			  return '<a style="display:inline" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">等待作者处理申请</a>'
                    		  }else if(data==2){
                    			  return '<a style="display:inline;color:green;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">作者已通过</a>'
                    		  }else if(data==3){
                    			  return '<a style="display:inline;color:red;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">作者已拒绝</a>'
                    		  }else if(data==0){
                    			  return '<a style="display:inline;color:red;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">还未签署协议</a>'
                    		  }else if(data==4){
                    			  return '<a style="display:inline;color:gray;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">订单已取消</a>'
                    		  }
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
	// 显示我收到的代理
	$('#listReceived').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/order/receiveAgentListData",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
//        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "agmt_id",
                          "sTitle": "协议ID",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	agmtId = data;
                        	  	return data;
                          }
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
                          "mDataProp": "partb_patio",
                          "sTitle": "代理商分成",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "info_isvalid_flg",
                    	  "sTitle": "状态",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  if(data==1){
                    			  return '<a style="display:inline" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">待处理</a>'
                    		  }else if(data==2){
                    			  return '<a style="display:inline;color:green;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">已通过</a>'
                    		  }else if(data==3){
                    			  return '<a style="display:inline;color:red;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">已拒绝</a>'
                    		  }else if(data==4){
                    			  return '<a style="display:inline;color:gray;" href="/drp/order/orderStatuOfAgent?agmt_id='+agmtId+'">作者已取消邀请</a>'
                    		  }
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
