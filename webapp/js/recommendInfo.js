/**
 * 推荐信息的JS
 */

$(function() {
	//getDataTables();
	$(".condition").on("click",function(){
		alert($(this).val());
		var _data = {
			condition:	$(this).val()
		}
	})
	var works_mame = getQueryString("works_name");
	works_mame = decodeURI(decodeURI(works_mame));
	$.ajax({
		async :false,
		 url : '/drp/showRecommendInfo',
         type : 'POST',
         dataType : 'json',
         contentType : "application/json;charest=utf-8",
         data : JSON.stringify({"msg":works_mame}),
         success : function (retValue) {
        	 console.log(retValue.dataone)
        	 var htmlStr = template("test", {
        		 works_detail: retValue.dataone
        	 })
        $("#temp").html(htmlStr);
         }
	});
	
});

/**
 * 用获取的usr_nm传给作者主页页面
 * @param obj a标签对象
 */
function authortheme(obj) {
	var thisObj = $(obj);
	location.href = "/drp/authortheme?usr_nm=" + thisObj.attr("value");
}

/**
 * 用获取的works_id传给推荐信息页面
 * @param obj a标签对象
 */

function worksDetails(obj) {
	var thisObj = $(obj);
	location.href = "/drp/recommendWorksDetails?works_id=" + thisObj.attr("value");
}
/**
 * 用获取的作品id传给代理订单填写页面
 * @param obj a标签对象
 */
function orderFillingOfAgent(obj) {
	var thisObj = $(obj);
	location.href = "/drp/order/orderFillingOfAgent?works_id=" + thisObj.attr("value");
}
/**
 * 用获取的作品id传给购买订单填写页面
 * @param obj a标签对象
 */
function orderFillingOfBuy(obj) {
	var thisObj = $(obj);
	location.href = "/drp/order/orderFillingOfBuy?works_id=" + thisObj.attr("value");
}

function getDataTables() {
	var works_mame = getQueryString("works_name");
	works_mame = decodeURI(decodeURI(works_mame));
	$('#recommendInfo').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/showRecommendInfo?works_name="+works_mame+"",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        "scrollX": 500,
        
        "aoColumns": [
                      {
                          "mDataProp": "works_name",
                          "sTitle": "作品名称",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_nm",
                          "sTitle": "作者姓名",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	return '<a value="'+data+'" href="javascript:void(0);" onclick="authortheme(this);"></a>';
                          }
                      },{
                          "mDataProp": "works_cate",
                          "sTitle": "作品类型",
                          "sClass": "center"
                      },{
                          "mDataProp": "works_spec",
                          "sTitle": "作品大小",
                          "sClass": "center"
                      },{
                          "mDataProp": "works_hdgt",
                          "sTitle": "费用",
                          "sClass": "center"
                      },{
                          "mDataProp": "works_pageviews",
                          "sTitle": "浏览量",
                          "sClass": "center"
                      },{
                    	  "mDataProp": "works_id",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  if(roleIdArray.indexOf("3") > -1){
                    			  return    '<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="orderFillingOfAgent(this);">代理</a>' + 
          			  						'<a class="btn btn-success" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="orderFillingOfBuy(this);">购买</a>' + 
          			  						'<a class="btn btn-default" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="worksDetails(this);">查看详情</a>';
                    		  }else{
                    			  return 	'<a class="btn btn-success" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="orderFillingOfBuy(this);">购买</a>' + 
			  							'<a class="btn btn-default" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="worksDetails(this);">查看详情</a>';
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

/*
 * js获取url指定参数值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}