/**
 * Created by Dark on 17/12/19.
 */
$(function () {
    // 首页登录跳转
    $("#login").on("click",function () {
        $.ajax({
            url: "/checklogin",
            type: "POST",
            // beforeSend: function (xhr) {
            //     xhr.setRequestHeader('Authorization', 'Basic cGxvdXQ6bMTM=');
            // },
        success: function (data) {
                if(data == "true"){
                    window.location.href = "/home";
                }else {
                    window.location.href = "/login";
                }
            }
        });
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
        $("#checkUsernameIsNot").attr("style","display:none");
        if(username != "" && username.length != 0 && username != null){
            $.ajax({
                url: "/user/checkUsername",
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
        $("#checkFirmPasswordIsNot").attr("style","display:none");
        if(inputconfirmPassword != "" && inputconfirmPassword.length != 0 && inputconfirmPassword != null){
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
        if(phone != "" && phone.length != 0 && phone != null) {
            $("#phoneClass").removeClass("success").addClass("error");
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
                                        countdown(e);
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
        e.preventDefault()
        var phone = $("#inputPhone").val();
        var pthonevalidation = $("#inputValidation").val();
        $("#codeOk").attr("style","display:none");
        $("#codeOccupied").attr("style","display:none");
        $("#checkCodeIsNot").attr("style","display:none");
        var sendate = {"phone":phone,"code":pthonevalidation};
        if(pthonevalidation != "" && pthonevalidation.length != 0 && pthonevalidation != null){
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
        var username = $("#inputUsername_login").val();
        var password = $("#inputPassword_login").val();
        // var autologin = $("#autologin")[0].checked;
        var user = [username,password];
        for (var x = 0;x<user.length;x++){
            if (user[x] == ""){
                switch (x){
                    case 0:
                        $("#inputUse").addClass("error");
                        e.preventDefault();
                        break;
                    case 1:
                        $("#inputPass").addClass("error");
                        e.preventDefault();
                        break;
                }
                return;
            }
        }
        // var sendate = {"username":username,"password":password,"autologin":autologin};
        // $.ajax({
        //     url: "/user/login",
        //     type: "POST",
        //     data: sendate,
        //     success: function (data) {
        //         if(data == "true"){
        //             // alert("登录成功")
        //             window.location.href = "/home";
        //         }else {
        //             alert("登录失败 用户名或密码错误")
        //         }
        //     }
        // });
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
        $("#checkPasswordIsNot").attr("style","display:none");
        if(password != "" && password.length != 0 && password !=null){
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
        if(inputconfirmPassword != ""){
            checkPassword();
        }
    });
    // 注册提交
    $("#regist").on("click",function (e) {
        e.preventDefault();
        var checkUsernameIsNot = $("#inputUsername").val();
        var checkPasswordIsNot = $("#inputPassword").val();
        var checkPhoneIsNot = $("#inputPhone").val();
        var checkCodeIsNot = $("#inputValidation").val();
        var checkFirmPasswordIsNot = $("#inputconfirmPassword").val();
        var submitAttributeArray = new Array(checkUsernameIsNot,checkPasswordIsNot,checkPhoneIsNot,checkCodeIsNot,checkFirmPasswordIsNot);
        for(var x = 0; x < submitAttributeArray.length; x++){
            if(submitAttributeArray[x] == ""){
                switch (x){
                    case 0:
                        $("#checkUsernameIsNot").attr("style","display:block");
                        $("#username_are").removeClass("success").addClass("error");
                        break;
                    case 1:
                        $("#checkPasswordIsNot").attr("style","display:block");
                        $("#passwordClass").removeClass("success").addClass("error");
                        break;
                    case 2:
                        // $("#checkPhoneIsNot").attr("style","display:block");
                        $("#phoneClass").removeClass("success").addClass("error");
                        break;
                    case 3:
                        $("#checkCodeIsNot").attr("style","display:block");
                        $("#codeClass").removeClass("success").addClass("error");
                        break;
                    case 4:
                        $("#checkFirmPasswordIsNot").attr("style","display:block");
                        $("#firmPasswordClass").removeClass("success").addClass("error");
                        break;
                }
                return;
            }
        }
        // -------------------------------------------
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
    $("#inputUsername_login").on("blur",function () {
        $("#inputUse").removeClass("error");
    });
    $("#inputPassword_login").on("blur",function () {
        $("#inputPass").removeClass("error");
    });

    // 发送验证码倒计时
    function countdown(e) {
        $(e.target).attr("disabled","disabled");
        var content = e.target.innerHTML;
        var index = 10 ;
        e.target.innerHTML  = index;
        var time = setInterval(function(){
            index--;
            e.target.innerHTML = index;
            if(index<=0) {
                e.target.innerHTML = content;
                $(e.target).removeAttr("disabled");
                clearInterval(time);
            }
        },1000)
    }

});