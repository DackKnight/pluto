package com.weidongtai.domain;

import java.util.Date;

/**
 * Created by Dark on 17/12/19.
 */
public class User {

    private String id;
    private String username;
    private String password;
    private String mobilephone;
    private Date registration;
    private String sex;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
    }

    public Date getRegistration() {
        return registration;
    }

    public void setRregistration(Date date) {
        this.registration = date;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", mobilephone='" + mobilephone + '\'' +
                ", registration=" + registration +
                ", sex='" + sex + '\'' +
                '}';
    }
}
