package com.weidongtai.utils.netease;

/**
 * 发送验证码
 * 网易云信地址：http://dev.netease.im/
 * @author Administrator
 *
 */
public class SendMsg {
    public static void main(String[] args) {
        String mobileNumber = "18503242660";//接收验证码的手机号码
        try {
            String str = MobileMessageSend.sendMsg(mobileNumber);
            if("success".equals(str)){
                System.out.println("发送成功！");
            }else{
                System.out.println("发送失败！");
            }
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
        }
    }
}