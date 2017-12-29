package com.weidongtai.service;

import com.weidongtai.domain.User;

/**
 * Created by Dark on 17/12/19.
 */
public interface UserService {

    public Boolean checkUsername(String username);

    public String sendVerificationCode(String phone) throws Exception;

    public Boolean codeCheck(String phone,String coed) throws Exception;

    public void saveUser(User user);

    public User login(User user);

    public Boolean checkPhone(String phone);
}
