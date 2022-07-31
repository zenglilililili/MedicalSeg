package com.contour.params;

import java.util.List;

public class DelineateRsp {
    String msg;
    Integer maxPage;
    List<Contour> contourInfo;

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Integer getMaxPage() {
        return maxPage;
    }

    public void setMaxPage(Integer maxPage) {
        this.maxPage = maxPage;
    }

    public List<Contour> getContourInfo() {
        return contourInfo;
    }

    public void setContourInfo(List<Contour> contourInfo) {
        this.contourInfo = contourInfo;
    }
}
