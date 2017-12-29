package com.weidongtai.service.Impl;

import com.weidongtai.domain.User;
import com.weidongtai.mapper.UserMapper;
import com.weidongtai.service.UserService;
import com.weidongtai.utils.netease.MobileMessageCheck;
import com.weidongtai.utils.netease.MobileMessageSend;
import com.weidongtai.utils.number.MD5;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

/**
 * Created by Dark on 17/12/19.
 */
@Service
@Transactional
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
       String str =  MobileMessageSend.sendMsg(phone);
        if("success".equals(str)){
            return "success";
        }else{
            return "error";
        }
    }

    @Override
    public Boolean codeCheck(String phone, String coed) throws Exception {
        String str = MobileMessageCheck.checkMsg(phone,coed);
        if("success".equals(str)){
            return true;
        }
        return false;
    }

    @Override
    public void saveUser(User user) {
        String password = user.getPassword();
        user.setPassword(MD5.sign(password,"N7KLTf4T","UTF-8"));
        user.setRregistration(new Date());
        userMapper.save(user);
    }

    @Override
    public User login(User user) {
        String password = user.getPassword();
        user.setPassword(MD5.sign(password,"N7KLTf4T","UTF-8"));
        User notUser = userMapper.login(user);
        if(notUser != null){
            return notUser;
        }
        return null;
    }

    @Override
    public Boolean checkPhone(String phone) {
        User user = userMapper.checkPhone(phone);
        if(user != null){
            return false;
        }
        return true;
    }
}
