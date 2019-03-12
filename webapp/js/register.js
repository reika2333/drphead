$(function() {
	/*
	 *判断注册表单输入的内容是否合法
	 */
	$("#loginBtn").click(function() {
		var userName = $("#userNameInput").val();
		var password = $("#passwordInput").val();
		var confirmPassword = $("#passwordReInput").val();
		var phoneNum = $("#phoneNumInput").val();
		var eMail = $("#eMailInput").val();
		var _data = {
				'usr_nm' : userName,
				'usr_pwd' : password,
				'usr_phone' : phoneNum,
				'usr_email'	: eMail
		};
		if(!userName.trim()) {
			alert("请填写用户名");
			return false;
		} else if (!password) {
			alert("请设置密码");
			return false;
		} else if (!confirmPassword) {
			alert("请确认密码");
			return false;
		} else if (!phoneNum.trim()) {
			alert("请填写手机号码");
			return false;
		} else if (!eMail.trim()) {
			alert("请填写邮箱");
			return false;
		} else {
			if(!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(userName))) {
				alert("用户名由6-18字母和数字组成");
				return false;
			} else if(!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(password))) {
				alert("密码长度必须由6-18位字母和数字组成");
				return false;
			} else if(!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(confirmPassword))) {
				alert("确认密码长度必须由6-18位字母和数字组成");
				return false;
			} else if(password != confirmPassword) {
				alert("两次输入的密码不一样");
				return false;
			} else if(!(/^1[34578]\d{9}$/.test(phoneNum))) {
				alert("请输入正确的手机号码格式");
				return false;
			} else if(!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(eMail))) {
				alert("请输入正确的邮箱格式");
				return false;
			}else if(!$("#agreeProtocol").is(":checked")) {
				alert("请同意《数字版权保护平台协议》");
				return false;
			} else {
				//判断用户名是否存在
				$.ajax({
					async :false,
					 url : '/drp/validUserIsExist',
	                 type : 'POST',
	                 dataType : 'json',
	                 contentType : "application/json;charest=utf-8",
	                 data : JSON.stringify(_data),
	                 success : function (retValue) {
	                     if (retValue.result == 1) {
	                    	 alert("用户名已存在！");
	                    	 return false;
	                     } else {
	                    	 alert("注册成功！");
	                    	 location.href = "/drp/";
	                     }
	                 }
				});
			}
		}
	});
});