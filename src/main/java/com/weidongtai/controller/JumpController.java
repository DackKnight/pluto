package com.weidongtai.controller;

import com.weidongtai.domain.User;
import com.weidongtai.service.UserService;
import com.weidongtai.utils.servlet.CookiesUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by Dark on 17/12/14.
 */
@Controller
public class JumpController {

    @Autowired
    private UserService userService;

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String hello() {
        return "index";
    }

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String login() { return "login"; }

    @RequestMapping(value = "/registration",method = RequestMethod.GET)
    public String registration() { return "registration"; }

    @RequestMapping(value = "/checklogin",method = RequestMethod.POST)
    @ResponseBody
    public String checklogin(HttpServletRequest request){
        Cookie cookie_user = CookiesUtil.getCookieByName(request, "cookie_user");
        if(cookie_user != null && !cookie_user.equals("")) {
            String user_value = cookie_user.getValue();
            String[] users = user_value.split("-");
            User user = new User();
            user.setUsername(users[0]);
            user.setPassword(users[1]);
            Boolean results = userService.login(user);
            return results.toString();
        }
        return "";
    }
}
