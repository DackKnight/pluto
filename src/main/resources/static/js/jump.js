/**
 * Created by Dark on 17/12/19.
 */
$(function () {
    // 首页登录跳转
    $("#login").on("click",function () {
        window.location.href = "/login";
    });
    // 首页注册跳转
    $("#registration").on("click",function () {
        window.location.href = "/registration";
    });
    // 用户名异步校验是否存在
    $("#inputUsername").on("blur",function () {
        var username = $("#inputUsername").val();
        if(username != "" && username.size != 0 && username != null){
            $.ajax({
                url: "/user/checkusername",
                type: "POST",
                data: {"username":username},
                success: function (data) {
                    if(data == "false"){
                        $("#username_are").removeClass("success").addClass("error");
                    }else {
                        $("#username_are").removeClass("error").addClass("success");
                    }
                }
            });
        }
    });
    // 两次密码校验
    $("#inputconfirmPassword").on("blur",function () {
        var password = $("#inputPassword").val();
        var inputconfirmPassword = $("#inputconfirmPassword").val();
        if(password == inputconfirmPassword){

        } else {

        }
    });
    // 发送验证码
    $("#validation").on("click",function (e) {
        e.preventDefault();
        var phone = $("#inputPhone").val();
        $.ajax({
            url: "/user/sms",
            type: "POST",
            data: {"phone":phone},
            success: function (data) {
                if(data == "success"){
                    alert("短信发送成功")
                }else {

                }
            }
        });
    });
    // 注册提交
    $("#regist").on("click",function (e) {
        e.preventDefault();
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();
        var inputconfirmPassword = $("#inputconfirmPassword").val();
        var sendata = {"username":username,"password":password,"inputconfirmPassword":inputconfirmPassword}
        $.ajax({
            url: "/user/register",
            type: "POST",
            data: sendata,
            success: function (data) {
                if(data == "SUCCESS"){
                    window.location.href = "";
                }
            }
        });
    });
});