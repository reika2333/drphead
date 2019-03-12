
$(function () {
	/*
	* 登录验证 提交表单
	*/
	function sub(){
		var userName = $("#userNameInput").val();
		var password = $("#passwordInput").val();
		var _data = {
				'usr_nm' : userName,
				'usr_pwd' : password
		};
		if(userName == null || userName ==''){
			alert("用户ID不能为空！");
			return false;
		}else if(password == null || password == ''){
			alert("用户密码不能为空！");
			return false;
		}else{
			$.ajax({
				async:false,
				url: '/drp/loginSubmit',
							type: 'POST',
							dataType: 'json',
							contentType: "application/json;charest=utf-8",
							data: JSON.stringify(_data),
							success: function (data) {
										if(data.usr_nm==null){
												alert("用户ID或者密码错误");
												return false;
										}
									if(data.usr_nm!=null && data.usr_pub_key==null){
										window.location.href="/drp/generateKey?usr_id="+data.usr_id;
									}else {
											//登录
											location.href="/drp/";
									} 
							}
			});
		}
	}
	/*
	 * 绑定登录按钮
	 */
	$("#loginBtn").click(function(){
		sub();
	});
	/*
	*  绑定回车提交事件
	*/
 $('#passwordInput').keypress(function(e){
	 if(e.keyCode == 13){
		 sub();
	 }
 })
})