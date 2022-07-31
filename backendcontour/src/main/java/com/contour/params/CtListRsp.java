package com.contour.params;

import java.util.List;

public class CtListRsp {
    String msg;
    List<Ct> ct;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<Ct> getCt() {
        return ct;
    }

    public void setCt(List<Ct> ct) {
        this.ct = ct;
    }
}
