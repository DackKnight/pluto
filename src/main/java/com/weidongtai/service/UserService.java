package com.weidongtai.service;

/**
 * Created by Dark on 17/12/19.
 */
public interface UserService {

    public Boolean checkUsername(String username);

    public String sendVerificationCode(String phone) throws Exception;
}
