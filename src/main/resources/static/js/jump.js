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
        $("#nameOk").attr("style","display:none");
        $("#nameOccupied").attr("style","display:none");
        if(username != "" && username.size != 0 && username != null){
            $.ajax({
                url: "/user/checkusername",
                type: "POST",
                data: {"username":username},
                success: function (data) {
                    if(data == "false"){
                        $("#username_are").removeClass("success").addClass("error");
                        $("#nameOk").attr("style","display:none");
                        $("#nameOccupied").removeAttr("style");
                    }else {
                        $("#username_are").removeClass("error").addClass("success");
                        $("#nameOccupied").attr("style","display:none");
                        $("#nameOk").removeAttr("style");
                    }
                }
            });
        }else {
            $("#username_are").removeClass("success").removeClass("error");
        }
    });
    // 两次密码校验
    $("#inputconfirmPassword").on("blur",checkPassword);

    // 两次密码校验
    function checkPassword() {
        var password = $("#inputPassword").val();
        var inputconfirmPassword = $("#inputconfirmPassword").val();
        $("#firmPasswordOk").attr("style","display:none");
        $("#firmPasswordOccupied").attr("style","display:none");
        if(inputconfirmPassword != "" && inputconfirmPassword.size != 0 && inputconfirmPassword != null){
            if(password == inputconfirmPassword){
                $("#firmPasswordClass").removeClass("error").addClass("success");
                $("#firmPasswordOccupied").attr("style","display:none");
                $("#firmPasswordOk").removeAttr("style");
            } else {
                $("#firmPasswordClass").removeClass("success").addClass("error");
                $("#firmPasswordOk").attr("style","display:none");
                $("#firmPasswordOccupied").removeAttr("style");
            }
        }else {
            $("#firmPasswordClass").removeClass("success").removeClass("error");
        }
    }
    // 发送验证码
    $("#validation").on("click",function (e) {
        e.preventDefault();
        var phone = $("#inputPhone").val();
        var regex = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if(phone != "" && phone.size != 0 && phone != null){
            if(!regex.test(phone)){
                alert("手机号格式错误！请重新输入");
                $("#phoneClass").removeClass("success").addClass("error");
            }else {
                $.ajax({
                    url: "/user/checkPhone",
                    type: "POST",
                    data: {"phone":phone},
                    success: function (data) {
                        if(data == "true"){
                            $.ajax({
                                url: "/user/sms",
                                type: "POST",
                                data: {"phone":phone},
                                success: function (data) {
                                    if(data == "success"){
                                        alert("短信发送成功")
                                        $("#phoneClass").removeClass("error").addClass("success");
                                    }else {
                                        alert("短信发送失败")
                                        $("#phoneClass").removeClass("success").addClass("error");
                                    }
                                }
                            });
                        }else {
                            alert("手机号已被注册");
                            $("#phoneClass").removeClass("success").addClass("error");
                        }
                    }
                });
            }
        }else {
            $("#phoneClass").removeClass("success").removeClass("error");
        }
    });
    // 验证码校验
    $("#inputValidation").on("blur",function (e) {
        var phone = $("#inputPhone").val();
        var pthonevalidation = $("#inputValidation").val();
        $("#codeOk").attr("style","display:none");
        $("#codeOccupied").attr("style","display:none");
        var sendate = {"phone":phone,"code":pthonevalidation};
        if(pthonevalidation != "" && pthonevalidation.size != 0 && pthonevalidation != null){
            $.ajax({
                url: "/user/codeCheck",
                type: "POST",
                data: sendate,
                success: function (data) {
                    if(data == "true"){
                        $("#codeClass").removeClass("error").addClass("success");
                        $("#codeOccupied").attr("style","display:none");
                        $("#codeOk").removeAttr("style");
                    }else {
                        $("#codeClass").removeClass("success").addClass("error");
                        $("#codeOk").attr("style","display:none");
                        $("#codeOccupied").removeAttr("style");
                    }
                }
            });
        }else {
            $("#codeClass").removeClass("success").removeClass("error");
        }
    });
    // 登录校验
    $("#sign").on("click",function (e) {
        e.preventDefault();
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();
        var sendate = {"username":username,"password":password};
        if((username != "" && username.size !=0 && username != null) && (password != "" && password.size !=0 && password != null)){
            $.ajax({
                url: "/user/login",
                type: "POST",
                data: sendate,
                success: function (data) {
                    if(data == "true"){
                        alert("登录成功")
                        // window.location.href = "";
                    }else {
                        alert("登录失败 用户名或密码错误")
                    }
                }
            });
        }
    });
    // 密码强度校验
    $("#inputPassword").on("blur",function () {
        var password = $("#inputPassword").val();
        var inputconfirmPassword = $("#inputconfirmPassword").val();
        var patrn=/^(\w){6,20}$/;
        var check = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
        $("#passwordOk").attr("style","display:none");
        $("#passwordOccupied").attr("style","display:none");
        $("#passwordOccupied2").attr("style","display:none");
        if(password != "" && password.size != 0 && password !=null){
            if(!patrn.test(password)){
                $("#passwordClass").removeClass("success").addClass("error");
                $("#passwordOk").attr("style","display:none");
                $("#passwordOccupied2").attr("style","display:none");
                $("#passwordOccupied").removeAttr("style");
            }else if(!check.test(password)){
                $("#passwordClass").removeClass("success").addClass("error");
                $("#passwordOk").attr("style","display:none");
                $("#passwordOccupied").attr("style","display:none");
                $("#passwordOccupied2").removeAttr("style");
            }else {
                $("#passwordClass").removeClass("error").addClass("success");
                $("#passwordOccupied").attr("style","display:none");
                $("#passwordOccupied2").attr("style","display:none");
                $("#passwordOk").removeAttr("style");
            }
        }else {
            $("#passwordClass").removeClass("success").removeClass("error");
        }
        if(inputconfirmPassword != "" && inputconfirmPassword.size != 0 && inputconfirmPassword != null){
            checkPassword();
        }
    });
    // 注册提交
    $("#regist").on("click",function (e) {
        e.preventDefault();
        var username_are = $("#username_are").attr("class");
        var phoneClass = $("#phoneClass").attr("class");
        var codeClass= $("#codeClass").attr("class");
        var passwordClass = $("#passwordClass").attr("class");
        var firmPasswordClass = $("#firmPasswordClass").attr("class");
        if(username_are.indexOf("error") > 0 || phoneClass.indexOf("error") > 0
            || codeClass.indexOf("error") > 0 || passwordClass.indexOf("error") > 0
            || firmPasswordClass.indexOf("error") > 0){
            return;
        }
        var username = $("#inputUsername").val();
        var password = $("#inputPassword").val();
        var userphone = $("#inputPhone").val();
        var sendata = {"username":username,"password":password,"mobilephone":userphone}
        $.ajax({
            url: "/user/register",
            type: "POST",
            data: sendata,
            success: function (data) {
                if(data == "SUCCESS"){
                    window.location.href = "/login";
                }
            }
        });
    });
});