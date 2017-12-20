package com.weidongtai.mapper;

import com.weidongtai.domain.User;
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

}
