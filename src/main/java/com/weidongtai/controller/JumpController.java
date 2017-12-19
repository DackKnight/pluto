package com.weidongtai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

/**
 * Created by Dark on 17/12/14.
 */
@Controller
public class JumpController {

    @RequestMapping(value = "/",method = RequestMethod.GET)
    public String hello() {
        return "index";
    }

    @RequestMapping(value = "/login",method = RequestMethod.GET)
    public String login() { return "login"; }

    @RequestMapping(value = "/registration",method = RequestMethod.GET)
    public String registration() { return "registration"; }
}
