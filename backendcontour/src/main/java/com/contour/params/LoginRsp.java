package com.contour.params;

import lombok.Data;

@Data
public class LoginRsp {
    private String msg;
    private String id;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
