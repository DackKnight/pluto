package com.weidongtai.mapper;

import com.weidongtai.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

/**
 * Created by Dark on 17/12/14.
 */
@Mapper
public interface UserMapper {

    // #{name}:参数占位符
    @Select("select * from user where username = #{name}")
    public User checkUsername(String name);

    // 保存用户
    @Insert("insert into user(username,password,mobilephone,registration) values (#{username},#{password},#{mobilephone},#{registration})")
    public void save(User user);

    // 用户登录
    @Select("select * from user where password = #{password} and (username = #{username} or mobilephone = #{username})")
    public User login(User user);
}
