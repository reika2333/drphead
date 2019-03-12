/**人员基本资料
*
* @Author  CDL
* @Date 2018/5/22
*/

$(function() {

	loadUserInfo();
	/*
	 * 判断表单输入的格式是否合法,合法则提交更改到数据库
	 */
	$("#inputInformation").click(function() {
		
		var realName = $("#inputRealName").val();
		var certificateNumber = $("#inputCertificateNumber").val();
		var certificateType = $("#inputCertificateType").val();
		var phoneNumber = $("#inputPhoneNumber").val();
		var address = $("#inputAddress").val();
		var gender = $("#gender").val();
		var level = $("#inputLevel").val();
		var _data = {
				"usr_nicknm" : realName,
				"usr_cert_num" : certificateNumber,
				"usr_cert_cate" : certificateType,
				"usr_phone" : phoneNumber,
				"usr_addr" : address,
				"usr_gender" : gender,
				"usr_qlfy" : level
		};
		
		if (!$.trim(realName)) {
			alert("真实姓名不能为空！");
			return false;
		} else if (!$.trim(certificateNumber)) {
			alert("证件号码不能为空！");
			return false;
		} else if (!$.trim(phoneNumber)) {
			alert("电话号码不能为空！");
			return false;
		} else if (!$.trim(address)) {
			alert("常用地址不能为空！");
			return false;
		} else if (!$.trim(level)) {
			alert("资质等级不能为空！");
			return false;
		} else {
			if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(certificateNumber))) {
				alert("证件号码格式不正确！");
				return false;
			} else if (!(/^1[34578]\d{9}$/.test(phoneNumber))) {
				alert("电话号码格式不正确！");
				return false;
			} else {
				$.ajax({
					async :false,
	    			url : '/drp/updateUserInfo',
	                type : 'POST',
	                dataType : 'json',
	                contentType: "application/json;charest=utf-8",
                    data : JSON.stringify(_data),
	                success : function (retValue) {
	                	if (retValue.result == 1) {
	                		alert("修改成功！");
	                		location.href = "/drp/detailedInformation"
	                	} else {
	                		alert("修改失败！");
	                		location.href = "/drp/detailedInformation"
	                	}
	                }
				});
			}
		}
	});
});
	
	/*
	 * 判断邮箱界面的格式是否正确
	 */
$(function() {
	
	$("#confirm").click(function() {

		var newEmail = $("#inputNewEmail").val();
		var verificationCode = $("#inputVerificationCode").val();
		var _data = {
			"validCode"	: verificationCode,
			"newEmail" : newEmail
		};
		
		if (!$.trim(newEmail)) {
			alert("邮箱不能为空！");
			return false;
		} else if (!$.trim(verificationCode)) {
			alert("验证码不能为空");
			return false;
		} else {
			if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(newEmail))) {
				alert("邮箱格式不正确！");
				return false;
			}
			$.ajax({
    			async :false,
    			url : '/drp/subModifiedEmail',
                type : 'POST',
                dataType : 'json',
                data : _data,
                success : function (retValue) {
                	if (retValue.result == 1) {
                		alert("修改成功！");
                		location.href = "/drp/detailedInformation"
                	} else {
                		alert("验证码错误！");
                		location.href = "/drp/modifyEmail"
                	}
                }
            });
		}
	});
});

	/*
	 * 判断密码界面的格式是否正确
	 */
$(function() {
	
	$("#confirmPassword").click(function() {
		
		var oldPassword = $("#inputOldPassword").val();
		var newPassword = $("#inputNewPassword").val();
		var confirmPassword = $("#inputConfirmPassword").val();
		var verificationCode = $("#inputVerificationCode").val();
		var _data = {
			"newPwd" : newPassword,
			"validCode" : verificationCode
		};
		
		if (!$.trim(oldPassword)) {
			alert("密码不能为空！");
			return false;
		} else if (!$.trim(newPassword)) {
			alert("新密码不能为空！");
			return false;
		} else if (!$.trim(confirmPassword)) {
			alert("确认密码不能为空！");
			return false;
		} else if (!$.trim(verificationCode)) {
			alert("验证码不能为空！");
			return false;
		} else {
			if(!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(newPassword))) {
				alert("新密码长度必须由6-18位字母和数字组成");
				return false;
			} else if(!(/^(?![^a-zA-Z]+$)(?!\D+$)/.test(confirmPassword))) {
				alert("确认密码长度必须由6-18位字母和数字组成");
				return false;
			} else if(newPassword != confirmPassword) {
				alert("两次输入的密码不一样");
				return false;
			} else {
				$.ajax({
					async :false,
        			url : '/drp/subModifiedPwd',
                    type : 'POST',
                    dataType : 'json',
                    data : _data,
                    success : function (retValue) {
                    	if (retValue.result == 1) {
                    		alert("修改密码成功！");
                    		location.href = "/drp/detailedInformation"
                    	} else {
                    		alert("您输入的验证码不正确，请重新输入！");
                    		location.href = "/drp/modifyPassword";
                    	}
                    }
				});
			}
		}
	});
	
});

	/*
	 * 加载用户信息
	 */

	function loadUserInfo() {
		// 获取用户基本资料数据
		$.ajax({
			async :false,
			 url : '/drp/showUserBasicInfo',
            type : 'POST',
            dataType : 'json',
            success : function (retValue) {
                //alert(retValue.usr_id);
            	$('#inputRealName').val(retValue.usr_nicknm);
            	$('#inputEmail').val(retValue.usr_email);
            	$('#inputPassword').val(retValue.usr_pwd);
            	$('#inputCertificateType').val(retValue.usr_cert_cate);
            	$('#inputCertificateNumber').val(retValue.usr_cert_num);
            	$('#inputPhoneNumber').val(retValue.usr_phone);
            	$('#gender').val(retValue.usr_gender);
            	$('#inputAddress').val(retValue.usr_addr);
            	$('#inputLevel').val(retValue.usr_qlfy);
            }
		});
	}
	
	/*
	 *验证邮箱是否存在，若不存在就发送邮件，若存在就不发送
	 */
	
	function validEmailIsExist() {
		var newEmail = $("#inputNewEmail").val();
		var _data = {
			"newEmail" : newEmail	
		};
		if (!$.trim(newEmail)) {
			alert("邮箱不能为空！");
			return false;
		} else if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(newEmail))) {
			alert("邮箱格式不正确！");
			return false;
		}
		
		$.ajax({
			async :false,
			url : '/drp/validEmailIsExist',
            type : 'POST',
            dataType : 'json',
            data : _data,
            success : function (retValue){
            	if (retValue.result == 0) {
            		alert("该邮箱已使用，请重新设置！");
            	} else {
            		$("#inputNewEmail").attr("disabled", true);
            		$.ajax({
            			async :false,
            			url : '/drp/sendValidCode',
                        type : 'POST',
                        dataType : 'json',
                        data : _data,
                        success : function () {
                        	alert("验证码发送成功！");
                        }
                    });
            	}
            }
		});
	}
	
	/*
	 * 修改密码，发送验证码
	 */
	
	function getValidCode() {
		
		var oldPassword = $("#inputOldPassword").val();
		var _data = {
			"oldPwd" : 	oldPassword
		};
		
		if (!$.trim(oldPassword)) {
			alert("密码不能为空！");
			return false;
		} else {
			$.ajax({
				async :false,
				url : '/drp/sendModifyPwdValidCode',
	            type : 'POST',
	            dataType : 'json',
	            data : _data,
	            success : function (retValue) {
	            	if (retValue.result == 1) {
	            		alert("验证码发送成功！");
	            		$("#inputOldPassword").attr("disabled", true);
	            	} else {
	            		alert("您输入的旧密码有误")
	            		location.href = "/drp/modifyPassword";
	            	}
	            }
	        });
		}
	}
