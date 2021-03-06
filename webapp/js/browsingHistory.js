/*
 * 浏览记录的JS
 */

$(function() {
	getDataTables();
});

function getDataTables() {
	$('#borwsingExample').dataTable({
		"bServerSide": true,  //开启服务器端数据导入
		"sAjaxSource": "/drp/showBrowsingInfo",
        "sServerMethod": "POST",
        "bPaginate" : true,  //显示（应用）分页器
        "bLengthChange": true,
        
        "aoColumns": [
                      {
                          "mDataProp": "works_name",
                          "sTitle": "作品名称",
                          "sWidth": "300px",
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
                          "mDataProp": "works_pageviews",
                          "sTitle": "浏览量",
                          "sClass": "center"
                      },{
                          "mDataProp": "browsing_time",
                          "sTitle": "浏览时间",
                          "sClass": "center"
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
