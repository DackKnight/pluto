package com.weidongtai.controller;

import com.weidongtai.domain.User;
import com.weidongtai.service.UserService;
import com.weidongtai.utils.number.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


/**
 * Created by Dark on 17/12/19.
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // 发送验证码
    @RequestMapping(value = "/sms")
    public String sendVerificationCode(String phone) throws Exception {
        String result = userService.sendVerificationCode(phone);
        return result;
    }

    // 校验验证码
    @RequestMapping(value = "/codeCheck")
    public String codeCheck(String phone,String code) throws Exception {
        Boolean result = userService.codeCheck(phone,code);
        return result.toString();
    }

    // 校验用户名是否存在
    @RequestMapping("/checkusername")
    public String check(String username){
        Boolean bool = userService.checkUsername(username);
        return bool.toString();
    }

    // 用户注册保存
    @RequestMapping("/register")
    public String register(User user){
        userService.saveUser(user);
        return "SUCCESS";
    }

    // 用户登录
    @RequestMapping("/login")
    public String login(User user){
        Boolean notUser = userService.login(user);
        return notUser.toString();
    }

    // 手机号验证
    @RequestMapping("/checkPhone")
    public String checkPhone(String phone){
        Boolean result = userService.checkPhone(phone);
        return result.toString();
    }
}
