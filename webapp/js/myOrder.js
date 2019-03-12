/**
 * 我的作品JavaScript
 *
 */

$(function() {
	getDataTables();
});

function getDataTables() { 
	$('#listBuy').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/order/MyOrderListData",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "agmt_id",
                          "sTitle": "订单编号",
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
                          "mDataProp": "part_a",
                          "sTitle": "买方",
                          "sClass": "center"
                      },{
                          "mDataProp": "part_b",
                          "sTitle": "卖方",
                          "sClass": "center"
                      },{
                          "mDataProp": "protocol_deadline",
                          "sTitle": "购买期限",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	return data+"个月"
                          }
                      },{
                          "mDataProp": "info_isvalid_flg",
                          "sTitle": "状态",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	if(data==1){
                        	  		return '<a style="color:red" href="/drp/order/orderStatuOfBuy?agmt_id='+agmtId+'">待付款</a>'
                        	  	}else if(data==0){
                        	  		return '<a style="color:red" href="/drp/order/orderStatuOfBuy?agmt_id='+agmtId+'">还未签署协议</a>'
                        	  	}else if(data==4){
                        	  		return '<a style="color:gray" href="/drp/order/orderStatuOfBuy?agmt_id='+agmtId+'">订单已取消</a>'
                        	  	}else if(data==5){
                        	  		return '<a href="/drp/order/orderStatuOfBuy?agmt_id='+agmtId+'">等待卖家确认收款</a>'
                        	  	}else if(data==6){
                        	  		return '<a href="/drp/order/orderStatuOfBuy?agmt_id='+agmtId+'">下载</a>'
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
