package com.weidongtai.controller;

import com.weidongtai.domain.User;
import com.weidongtai.service.UserService;
import com.weidongtai.utils.servlet.CookiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
    @RequestMapping(value = "/checkUsername")
    public String check(String username) {
        Boolean bool = userService.checkUsername(username);
        return bool.toString();
    }

    // 用户注册保存
    @RequestMapping(value = "/register",method = RequestMethod.POST)
    public String register(User user) {
        userService.saveUser(user);
        return "SUCCESS";
    }

    // 用户登录
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public String login(User user, String autologin, HttpServletResponse response, HttpServletRequest request) {
        if ("true".equals(autologin)){
            CookiesUtil.setCookie(response,"cookie_user",user.getUsername()+"-"+user.getPassword(),24*3600*7);
        }
        Boolean notUser = userService.login(user);
        return notUser.toString();
    }

    // 手机号验证
    @RequestMapping(value = "/checkPhone")
    public String checkPhone(String phone) {
        Boolean result = userService.checkPhone(phone);
        return result.toString();
    }
}
