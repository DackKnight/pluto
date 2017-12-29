package com.weidongtai.exception;

import com.weidongtai.enums.ResultEnum;

/**
 * Created by Dark on 17/12/26.
 */
public class UserException extends RuntimeException {

    private Integer code;

    public UserException(ResultEnum resultEnum) {
        super(resultEnum.getMsg());
        this.code = resultEnum.getCode();
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }
}
