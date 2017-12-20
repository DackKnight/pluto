package com.weidongtai.controller;

import com.weidongtai.domain.User;
import com.weidongtai.service.UserService;
import com.weidongtai.utils.netease.MobileMessageSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

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

    // 校验用户名是否存在
    @RequestMapping("/checkusername")
    public String check(String username){
        Boolean bool = userService.checkUsername(username);
        return bool.toString();
    }

    @RequestMapping("/register")
    public String register(User user){
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        return "SUCCESS";
    }
}
