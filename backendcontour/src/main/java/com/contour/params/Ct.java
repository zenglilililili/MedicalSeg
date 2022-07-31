package com.contour.params;

import java.sql.Time;

public class Ct {
    Integer id;
    Integer patId;
    String name;
    Integer ctcounts;
    String ctdelineate;
    Integer delineatemode ;
    boolean doccheck;
    Integer period;
    Time createtime;

    @Override
    public String toString() {
        return "Ct{" +
                "id=" + id +
                ", patId=" + patId +
                ", name='" + name + '\'' +
                ", ctcounts=" + ctcounts +
                ", ctdelineate='" + ctdelineate + '\'' +
                ", delineatemode=" + delineatemode +
                ", doccheck=" + doccheck +
                ", period=" + period +
                ", createtime=" + createtime +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPatId() {
        return patId;
    }

    public void setPatId(Integer patId) {
        this.patId = patId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getCtcounts() {
        return ctcounts;
    }

    public void setCtcounts(Integer ctcounts) {
        this.ctcounts = ctcounts;
    }

    public String getCtdelineate() {
        return ctdelineate;
    }

    public void setCtdelineate(String ctdelineate) {
        this.ctdelineate = ctdelineate;
    }

    public Integer getDelineatemode() {
        return delineatemode;
    }

    public void setDelineatemode(Integer delineatemode) {
        this.delineatemode = delineatemode;
    }

    public boolean isDoccheck() {
        return doccheck;
    }

    public void setDoccheck(boolean doccheck) {
        this.doccheck = doccheck;
    }

    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }

    public Time getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Time createtime) {
        this.createtime = createtime;
    }
}
