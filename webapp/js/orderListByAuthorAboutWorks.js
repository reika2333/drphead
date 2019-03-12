/**
 * 我的作品-订单列表JavaScript
 *
 *	have:
 *		works_id
 *		protocol_type
 *	need:
 *		作品名称 -> works_name
 *		协议id -> agmt_id
 *		甲方名称 ->parta_id->usr_nm(人员表)
 *		购买期限 -> protocol_deadline
 *		总价 -> auth_fee
 *		协议状态 -> info_isvalid_flg
 */

/**
 * 读取本地文件，并上传密钥
 */

function uploadKey(obj){
	
	var thisObj = $(obj);
	var agmt_id=thisObj.attr("value");

	var reader = new FileReader();
	var key=document.getElementById("key").files[0];
	reader.readAsText(key);
    reader.onload=function(f){
    	
    	var str=this.result;
			var _data = {
				'agmt_id'  :agmt_id,
				'deskey':str
			}

	
			$.ajax({
				async :false,
				 url : '/drp/order/uploadkey',
		         type : 'POST',
		         dataType : 'json',
		         contentType:"application/json",
		         data : JSON.stringify(_data),
		         success : function (data) {
		        	 
		        	 alert(data);
		             if(1==data.result){
		            	 alert("密钥上传成功")
		             }
		         }
			});
			
			
			
		}
    }
  
	









$(function() {
	// works_id (全局)
	worksId = getQueryString("works_id");
	// 加载作品名称
	showWorksName();
	// 加载列表
	getDataTables();
});

/**
 * 下载用户公钥
 */

function downloadUserPK(obj){

	
	var thisObj = $(obj);
	var UserPK =thisObj.attr("value");
    var blob = new Blob([UserPK], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "UserPK.txt");
	
	
	
}





function worksDetails(obj) {
	var thisObj = $(obj);
	location.href = "/drp/works/showWorksDetails?works_id=" + thisObj.attr("value");
}
// 加载作品名称
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

// 加载作品的订单列表
function getDataTables() { 
	var _data = {
			"works_id": worksId,
			
	}
	$('#orderList').dataTable({
		"ajax":{
			"url": "/drp/order/getWorksOrderList",
			"type": 'POST',
			"data": _data,
		},
		"bServerSide": true,  //开启服务器端数据导入
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
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
                          "sTitle": "买家",
                          "sClass": "center"
                      },{
                          "mDataProp": "auth_fee",
                          "sTitle": "总价",
                          "sClass": "center"
                      },{
                          "mDataProp": "protocol_deadline",
                          "sTitle": "购买期限",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "info_isvalid_flg",
                    	  "sTitle": "状态",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  // 1 表示已经签署协议  4 表示对方取消了订单 5 已付款 6 已收款
                    		  if(data==1){
                    			  return '<a  href="/drp/order/orderStatuOfBuyByAuthor?agmt_id='+agmtId+'">买家还未付款</a>'
                    		  }else if(data==5){
                    			  return '<a  href="/drp/order/orderStatuOfBuyByAuthor?agmt_id='+agmtId+'">买家已付款</a>'
                    		  }else if(data==6){
                    			  return '<a style="color:green" href="/drp/order/orderStatuOfBuyByAuthor?agmt_id='+agmtId+'">已确认收款</a>'
                    		  }else if(data==4){
                    			  return '<a style="color:gray" href="/drp/order/orderStatuOfBuyByAuthor?agmt_id='+agmtId+'">买家已取消订单</a>'
                    		  }
                    	  }
                      },{
                    	  "mDataProp": "UserPK",
                    	  "sTitle": "操作1",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  
                    		  
                    		  return    '<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="downloadUserPK(this);">下载用户公钥</a>'; 
                    	  }
                      }
                      ,{
                    	  "mDataProp": "agmt_id",
                    	  "sTitle": "操作2",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  
                    		  
                    		  return    '<div class="form-group"><button   class="btn btn-primary" type="submit"   style="margin-right:2%;"  class="col-sm-4 control-label" for="key"  value="'+data+'" href="javascript:void(0);"  onclick="uploadKey(this);" >密钥上传：</button><input style="center" type="file" id="key" name="key"></div>';
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



//解析url
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}
