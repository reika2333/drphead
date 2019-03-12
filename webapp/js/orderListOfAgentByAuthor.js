/**
 * 我的作品-代理列表JavaScript
 *
 */

$(function() {
	// 得到works_id
	worksId = getQueryString("works_id");
	// 加载作品名称
	showWorksName();
	// 加载列表
	getDataTables();
	//跳转邀请代理页面
	$("#toVisit").click(function(){
		location.href="/drp/order/agentVisit?works_id="+worksId;
	});
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
             $("h1").html('《'+retValue.works_name+'》代理详情 <small>我的作品</small>');
         }
	});
}

//显示我邀请的代理
//需要添加role_id=2
function getDataTables() { 
	var _data = {
			"works_id": worksId
	}
	$('#listFormMe').dataTable({
		"ajax":{
			"url": "/drp/order/getAgentListFromMeByWorksId",
			"type": 'POST',
			"data": _data
		},
		"bServerSide": true,  //开启服务器端数据导入
        "sServerMethod": "POST",
        "bPaginate" : true,  //翻页功能
//        "bLengthChange": true,
        "iDisplayLength": 5,
        
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
                          "mDataProp": "usr_nm",
                          "sTitle": "代理商",
                          "sClass": "center"
                      },{
                          "mDataProp": "protocol_deadline",
                          "sTitle": "代理期限",
                          "sClass": "center"
                      },{
                          "mDataProp": "parta_patio",
                          "sTitle": "作者分成",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "info_isvalid_flg",
                    	  "sTitle": "状态",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  if(data==1){
                    			  return '<a style="display:inline" href="/drp/order/orderStatuOfMyVisit?agmt_id='+agmtId+'">等待代理商处理</a>'
                    		  }else if(data==2){
                    			  return '<a style="display:inline;color:green;" href="/drp/order/orderStatuOfMyVisit?agmt_id='+agmtId+'">代理商已接受</a>'
                    		  }else if(data==3){
                    			  return '<a style="display:inline;color:red;" href="/drp/order/orderStatuOfMyVisit?agmt_id='+agmtId+'">代理商已拒绝</a>'
                    		  }else if(data==0){
                    			  return '<a style="display:inline;color:red;" href="/drp/order/orderStatuOfMyVisit?agmt_id='+agmtId+'">还未签署协议</a>'
                    		  }else if(data==4){
                    			  return '<a style="display:inline;color:gray;" href="/drp/order/orderStatuOfMyVisit?agmt_id='+agmtId+'">订单已取消</a>'
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
	//需要添加role_id=3
	$('#listFormAgent').dataTable({
		"ajax":{
			"url": "/drp/order/getAgentListFromAgentByWorksId",
			"type": 'POST',
			"data": _data
		},
		"bServerSide": true,  //开启服务器端数据导入
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
//        "bLengthChange": true,
        "iDisplayLength": 5,
        
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
                          "mDataProp": "usr_nm",
                          "sTitle": "代理商",
                          "sClass": "center"
                      },{
                          "mDataProp": "protocol_deadline",
                          "sTitle": "代理期限",
                          "sClass": "center"
                      },{
                          "mDataProp": "parta_patio",
                          "sTitle": "作者分成",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "info_isvalid_flg",
                    	  "sTitle": "状态",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  if(data==1){
                    			  return '<a style="display:inline" href="/drp/order/orderStatuOfAgentByAuthor?agmt_id='+agmtId+'">待处理</a>'
                    		  }else if(data==2){
                    			  return '<a style="display:inline;color:green;" href="/drp/order/orderStatuOfAgentByAuthor?agmt_id='+agmtId+'">已通过</a>'
                    		  }else if(data==3){
                    			  return '<a style="display:inline;color:red;" href="/drp/order/orderStatuOfAgentByAuthor?agmt_id='+agmtId+'">已拒绝</a>'
                    		  }else if(data==4){
                    			  return '<a style="display:inline;color:gray;" href="/drp/order/orderStatuOfAgentByAuthor?agmt_id='+agmtId+'">代理商已取消</a>'
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

/**
 * 用获取的协议id传给代理协议页面
 * @param obj a标签对象
 */
function agreeAgent(obj) {
	var thisObj = $(obj);
	location.href = "/drp/protocol/protocolAgent?agmt_id=" + thisObj.attr("value");
}

/**
 * 用获取的协议id传给作品代理列表页面
 * @param obj a标签对象
 */
function refuseAgent(obj) {
	var thisObj = $(obj);
	var agmtId = thisObj.attr("value")
	// 拒绝后传协议id让isvalid减一
	var _data = {
			'agmt_id':agmtId,
			'info_isvalid_flg': 3,
	}
	$.ajax({
		async : false,
		url : '/drp/order/updateInfoisValidFlg',
		type : 'POST',
		dataType : 'json',
		data : JSON.stringify(_data),
		contentType: "application/json;charest=utf-8",
		success : function(retValue) {
			if(retValue.result==1){
				window.location.reload();
			}
		}
	});
}

/**
 * 用获取的协议id传给作代理订单详情页面
 * @param obj a标签对象
 */
function agentDetails(obj) {
	var thisObj = $(obj);
	location.href = "/drp/order/agentOrderDetails?agmt_id=" + thisObj.attr("value");
}

// 跳转邀请代理-代理商列表页面  20180913
function toVisit(){
	location.href = "/drp/order/agentVisit?works_id="+worksId;
}



//解析url得到works_id
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
