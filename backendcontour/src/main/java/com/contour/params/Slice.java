package com.contour.params;

import java.sql.Time;

public class Slice {
    Integer sliceId;
    Integer patId;
    String patPath;
    Integer ctId;
    Integer delineatemode ;
    Time createtime;

    public Integer getSliceId() {
        return sliceId;
    }

    public void setSliceId(Integer sliceId) {
        this.sliceId = sliceId;
    }

    public Integer getPatId() {
        return patId;
    }

    public void setPatId(Integer patId) {
        this.patId = patId;
    }

    public Integer getCtId() {
        return ctId;
    }

    public void setCtId(Integer ctId) {
        this.ctId = ctId;
    }

    public Integer getDelineatemode() {
        return delineatemode;
    }

    public void setDelineatemode(Integer delineatemode) {
        this.delineatemode = delineatemode;
    }

    public Time getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Time createtime) {
        this.createtime = createtime;
    }

    public String getPatPath() {
        return patPath;
    }

    public void setPatPath(String patPath) {
        this.patPath = patPath;
    }

    @Override
    public String toString() {
        return "Slice{" +
                "sliceId=" + sliceId +
                ", patId=" + patId +
                ", patPath='" + patPath +
                ", ctId=" + ctId +
                ", delineatemode=" + delineatemode +
                ", createtime=" + createtime +
                '}';
    }
}
