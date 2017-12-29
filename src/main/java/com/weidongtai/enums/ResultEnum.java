package com.weidongtai.enums;

/**
 * Created by Dark on 17/12/26.
 */
public enum ResultEnum {
    UNKONW_ERROR(-1,"unknown error"),
    SUCCESS(0,"SUCCESS"),
    ;

    private Integer code;

    private String msg;

    ResultEnum(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
