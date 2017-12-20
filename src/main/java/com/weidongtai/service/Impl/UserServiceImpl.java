package com.weidongtai.service.Impl;

import com.weidongtai.domain.User;
import com.weidongtai.mapper.UserMapper;
import com.weidongtai.service.UserService;
import com.weidongtai.utils.netease.MobileMessageSend;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

/**
 * Created by Dark on 17/12/19.
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Boolean checkUsername(String username) {
        User user = userMapper.checkUsername(username);
        if(user!=null){
            return false;
        }
        return true;
    }

    @Override
    public String sendVerificationCode(String phone) throws Exception {
        System.out.println(phone);
       String str =  MobileMessageSend.sendMsg(phone);
        if("success".equals(str)){
            return "success";
        }else{
            return "error";
        }
    }
}
