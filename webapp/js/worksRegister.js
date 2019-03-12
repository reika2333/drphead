/*! works app.js
* ================
* Main JS application file for uploading of works. This file
* should be included in pages of workRegister.html. 
*
* @Author  CDL
* @Date 2018/5/6
*/




$(function() {
	
	var isFree = $('input[name="isFree"]:checked').val();
	var str;

	
	
	
	
	/*
	 * 单选框控制预估费用的输入框
	 */
	
	$(".isFree").click(function() {
		
		isFree = $('input[name="isFree"]:checked').val();
		if(!isFree.trim()) {
			$("#estimatedCostInput").val("");
			$("#estimatedCostInput").attr("disabled",false);
		} else {
			$("#estimatedCostInput").val("0");
			$("#estimatedCostInput").attr("disabled",true);
		}
	});
	
	/*
	 * 判断表单输入的格式是否合法
	 */
	
	$("#loginBtn").click(function() {
		var reader = new FileReader();
		var key=document.getElementById("key").files[0];
		var fileSize = $("#file").val().length;
		var workName = $("#workNameInput").val();
		var workType = $("#workTypeInput").val();
		var workStyle = $("#workStyleInput").val();
		var workSize = $("#workSizeInput").val();
		var workIntroduction = $("#workIntroductionInput").val();
		var estimatedCost = $("#estimatedCostInput").val();
		reader.readAsText(key);
	    reader.onload=function(f){
	    	
	    	var str=this.result;
	    	alert(isFree);
	    	if (!fileSize) {
				alert("请选要上传的作品！");
				return false;
			} else if (!$.trim(workName)) {
				alert("请填写作品名称！");
				return false;
			} else if(!$.trim(workType)) {
				alert("请填写作品类型！");
				return false;
			} else if(!$.trim(workStyle)) {
				alert("请填写作品格式！");
				return false;
			} else if(!$.trim(workSize)) {
				alert("请填写作品大小！");
				return false;
			} else if (!$.trim(workIntroduction)) {
				alert("请填写简介！");
				return false;
			} else if (!$.trim(estimatedCost)) {
				alert("请输入预估费用！");
				return false;
			} else {
				var _data = {
					'works_name' : workName,
					'works_cate' : workType,
					'works_format' : workStyle,
					'works_spec' : workSize,
					'works_memo' : workIntroduction,
					'works_ischrg' : isFree,
					'works_hdgt' : estimatedCost,
					'works_sym_key':str
				};
				var worksUploadUrl = "/drp/works/worksUpload";
				$.ajaxFileUpload({
					url : worksUploadUrl,
					secureuri : false,
					fileElementId : "file",
					dataType : "json",
					data : _data,
					success : function (returnValue) {
						if (returnValue.result == 1) {
							alert("上传成功！")
							location.href = "/drp/works/worksRegister"
						}
					},
					error : function () {
						alert("上传文件请求失败！")
					}
				});
				
			}
        };
      
			

		
		
		
		
		
	});
	
	/*
	 * 自动读取文件参数
	 */
	$("#file").change(function() {
		
		var file = $(this).val();
		$("#workSizeInput").val("");
		if (file) {
			// 验证是否有文件上传，有文件上传才计算文件大小
			var fileSize = $(this)[0].files[0].size;
			// 限制上传文件大小不超过20M
			if (fileSize > 20*1024*1024) {
				alert("您上传的文件大小不得超过20M");
				return false;
			} else {
				$("#workSizeInput").val((fileSize/1024).toFixed(2)+"KB");
			}
		}
		var fileName = file.substring(file.lastIndexOf("\\") + 1, file.lastIndexOf("."));
		var fileStyle = file.substring(file.lastIndexOf(".") + 1);
		$("#workNameInput").val("");
		$("#workNameInput").val(fileName);
		$("#workStyleInput").val("");
		$("#workStyleInput").val(fileStyle);
		$("#workTypeInput").val("");
		// 上传了文件才判断文件类型，没有上传文件就不判断
		if (file) {
			if(fileStyle.localeCompare("avi") == 0 || fileStyle.localeCompare("wma") == 0 || fileStyle.localeCompare("wav") == 0
					|| fileStyle.localeCompare("asf") == 0 || fileStyle.localeCompare("aac") == 0
					|| fileStyle.localeCompare("m4r") == 0 || fileStyle.localeCompare("ogg") == 0
					|| fileStyle.localeCompare("mp3") == 0 || fileStyle.localeCompare("mp4") == 0) {
				$("#workTypeInput").val("音频");
			} else if (fileStyle.localeCompare("txt") == 0 || fileStyle.localeCompare("doc") == 0 || fileStyle.localeCompare("docx") == 0
					|| fileStyle.localeCompare("xlsx") == 0 || fileStyle.localeCompare("pptx") == 0
					|| fileStyle.localeCompare("pdf") == 0 || fileStyle.localeCompare("caj") == 0
					|| fileStyle.localeCompare("kdh") == 0 || fileStyle.localeCompare("nh") == 0
					|| fileStyle.localeCompare("word") == 0) {
				$("#workTypeInput").val("文本");
			} else if (fileStyle.localeCompare("bmp") == 0 || fileStyle.localeCompare("gif") == 0 || fileStyle.localeCompare("jpeg") == 0
					|| fileStyle.localeCompare("jpg") == 0 || fileStyle.localeCompare("tiff") == 0
					|| fileStyle.localeCompare("png") == 0) {
				$("#workTypeInput").val("图片");
			} else {
				$("#workTypeInput").val("其它");
			}
		} else {
			$("#workTypeInput").val("");
		}
	});
});