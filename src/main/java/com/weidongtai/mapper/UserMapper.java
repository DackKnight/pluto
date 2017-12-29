package com.weidongtai.mapper;

import com.weidongtai.domain.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;

/**
 * Created by Dark on 17/12/14.
 */
@Mapper
@CacheConfig(cacheNames = "users")
public interface UserMapper {

    // #{name}:参数占位符
    @Select("select * from user where username = #{name}")
    @Cacheable
    public User checkUsername(String name);

    // 保存用户
    @Insert("insert into user(username,password,mobilephone,registration) values (#{username},#{password},#{mobilephone},#{registration})")
    public void save(User user);

    // 用户登录
    @Select("select * from user where password = #{password} and (username = #{username} or mobilephone = #{username})")
    @Cacheable
    public User login(User user);

    // 手机号验证
    @Select("select * from user where mobilephone = #{phone}")
    @Cacheable
    public User checkPhone(String phone);
}
