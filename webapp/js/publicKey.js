/**
 * 公钥管理页面js
 * 
 */

$(function() {
	getDataTables();
});

function getDataTables() { 
	$('#example').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/getPublicKey",                      /***/
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "usr_nm",
                          "sTitle": "作者/代理商姓名",
                          "sClass": "center"
                      },{
                          "mDataProp": "usr_id",
                          "sTitle": "作者/代理商id",
                          "sClass": "center"
                      }
                      ,{
                    	  "mDataProp": "download_key",
                    	  "sTitle": "操作",
                    	  "sClass": "center",
                    	  "mRender": function(data, type, full) {
                    		  return    '<a class="btn btn-primary" type="button" style="margin-right:2%;" value="'+data+'" href="javascript:void(0);" onclick="downloadKey(this);">下载公钥</a>'; 
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

function downloadKey(obj) {
	var thisObj = $(obj);
	var key =thisObj.attr("value");
    var blob = new Blob([key], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "DesKey.txt");
}
