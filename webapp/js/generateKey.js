
//$(function(){
//	$("#download").click(){
//		//下载加解密程序
//	    var $a = document.createElement('a');
//	    var src="http://192.168.156.66/fastdfs/group1/M00/02/01/wKicZ1uzDsWAaP_TAEPqDVQCJW0283.rar";
//	    $a.setAttribute("href", src);
//	    $a.setAttribute("download", "");
//
//
//	    var evObj = document.createEvent('MouseEvents');
//	    evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
//	    $a.dispatchEvent(evObj);
//	}
//});

        function download() {
            var $a = document.createElement('a');
            var src="http://192.168.156.66/fastdfs/group2/M00/02/01/wKicalu5sN2ADieqALSfvFjWys0272.rar";
            $a.setAttribute("href", src);
            $a.setAttribute("download", "");


            var evObj = document.createEvent('MouseEvents');
            evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
            $a.dispatchEvent(evObj);
        };

$(function(){
	// ajax请求得到文件地址
	$.ajax({
		async : false,
		url : '/drp/downloads/',
		type : 'POST',
		dataType : 'json',
		data : _data,
		success : function(retValue) {
			add = retValue.add;
		}
	});
	// 添加download属性
	$("#download").attr("download","");
});

