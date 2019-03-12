/**
 * 我的作品JavaScript
 *
 */

$(function() {
	getDataTables();
});
/**
 * 下载作品密钥
 */


function downloadKey(obj) {
	var thisObj = $(obj);
	var key =thisObj.attr("value");
    var blob = new Blob([key], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "DesKey.txt");
	
}




///**
// * 下载用户公钥
// */
//
//
//function downloadUserPublicKey(obj) {
//	var thisObj = $(obj);
//	var key =thisObj.attr("value");
//    var blob = new Blob([key], {type: "text/plain;charset=utf-8"});
//    saveAs(blob, "UserPublicKey.txt");
//	
//}







/**
 * 用获取的作品id传给作品详情页面
 * @param obj a标签对象
 */

function worksDetails(obj) {
	var thisObj = $(obj);
	location.href = "/drp/works/showWorksDetails?works_id=" + thisObj.attr("value");
}

/**
 * 用获取的作品id传给作品代理列表页面
 * @param obj a标签对象
 */
function orderListOfAgentByAuthor(obj) {
	var thisObj = $(obj);
	location.href = "/drp/order/orderListOfAgentByAuthor?works_id=" + thisObj.attr("value");
}

/**
 * 用获取的作品id传给作品购买订单列表页面
 * @param obj a标签对象
 */
function orderListByAuthorAboutWorks(obj) {
	var thisObj = $(obj);
	location.href = "/drp/order/orderListByAuthorAboutWorks?works_id=" + thisObj.attr("value");
}


function getDataTables() { 
	$('#example').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/works/worksListData",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
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
                          "mDataProp": "works_spec",
                          "sTitle": "作品大小",
                          "sClass": "center"
                      },{
                          "mDataProp": "works_isvalid_flg",
                          "sTitle": "状态",
                          "sClass": "center",
                          "mRender": function(data, type, full) {
                        	  	if(data==1){
                        	  		return '<div style="color:green">审核通过</div>'
                        	  	}else if(data==2){
                        	  		return '<div style="color:red">审核未通过</div>'
                        	  	}else if(data==0){
                        	  		return '<div style="color:blue">审核中</div>'
                        	  	}
                          }
                      },{
                    	  "mDataProp": "works_id",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return    '<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="orderListOfAgentByAuthor(this);">代理</a>' + 
                    		  			'<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="orderListByAuthorAboutWorks(this);">订单</a>' +
//                    		  			'<a class="btn btn-success" type="button" style="margin-right:2%;" value="'+data+'">下载</a>' + 
      			  					'<a class="btn btn-default" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="worksDetails(this);">详情</a>';
                    	  }
                      }
                      ,{
                    	  "mDataProp": "works_sym_key",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return    '<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="downloadKey(this);">下载密钥</a>'; 
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
